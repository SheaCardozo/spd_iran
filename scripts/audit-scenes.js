const fs = require('node:fs');
const engine = require('dendrynexus/lib/engine');

const FRAMEWORK_INTERNAL = new Set([
  'prevScene',
  'prevTopScene',
  'jumpScene',
  'backSpecialScene',
  'returnScene',
]);

const ENGINE_INTERNAL = new Set([
  'root',
  'root.start_game',
  'post_event',
  'post_event.events_choice',
  'return_card',
  'reactions',
  'advisor_roster.advisor_roster_editor',
  'advisor_roster.draft_remove_mossadegh',
  'advisor_roster.draft_add_mossadegh',
  'advisor_roster.draft_remove_saleh',
  'advisor_roster.draft_add_saleh',
  'advisor_roster.draft_remove_fatemi',
  'advisor_roster.draft_add_fatemi',
  'advisor_roster.draft_remove_makki',
  'advisor_roster.draft_add_makki',
  'advisor_roster.draft_remove_kashani',
  'advisor_roster.draft_add_kashani',
  'advisor_roster.draft_remove_maleki',
  'advisor_roster.draft_add_maleki',
  'advisor_roster.confirm_advisor_roster',
  'advisor_roster.advisor_roster_resume_events',
  'advisor_roster.cancel_advisor_roster',
  'campaign_spine.majles_vote_resolution',
  'campaign_spine.senate_vote_resolution',
]);

const DECK_CONTAINERS = new Set([
  'main.party_affairs',
  'main.public_campaign',
  'main.parliamentary_affairs',
]);

const OPENING_DECISIONS = new Set([
  'attempt_and_emergency',
  'attempt_and_emergency.emergency_measures',
  'attempt_and_emergency.constituent_assembly',
  'attempt_and_emergency.senate_election_preparations',
]);

const INFORMATION_SURFACES = new Set([
  'root.start_menu',
  'root.historical_primer',
  'root.about',
  'main',
  'status',
  'status.coalition',
  'status.support',
  'status.majles',
  'status.crown',
  'research_library',
  'research_library.current_situation',
  'research_library.government',
  'research_library.timeline',
  'research_library.coalition_people',
  'research_library.chambers',
  'research_library.oil',
  'research_library.events',
  'research_library.uncertainty',
  'research_library.bibliography',
  'campaign_ending',
  'campaign_spine.majles_nationalization_defeat',
  'campaign_spine.senate_passage',
  'campaign_spine.senate_nationalization_defeat',
]);

const SEMANTIC_TERM_RULES = [
  ['term-national-front', /\bNational Front\b/g],
  ['term-national-front', /\bFront\b/g],
  ['term-parliament', /\bMajles\b/g],
  ['term-senate', /\bSenate\b/g],
  ['term-constitutionalist', /\bIran Party\b/g],
  ['term-social-democratic', /\bToilers['’] Party\b/g],
  ['term-social-democratic', /\bThird Force\b/g],
  ['term-mossadegh', /\bMohammad Mossadegh\b/g],
  ['term-mossadegh', /\bMossadegh\b/g],
  ['term-nationalist-social-democratic', /\bHossein Fatemi\b/g],
  ['term-nationalist-social-democratic', /\bFatemi\b/g],
  ['term-constitutionalist', /\bAllahyar Saleh\b/g],
  ['term-constitutionalist', /\bSaleh\b/g],
  ['term-nationalist-social-democratic', /\bKhalil Maleki\b/g],
  ['term-nationalist-social-democratic', /\bMaleki\b/g],
  ['term-makki', /\bHossein Makki\b/g],
  ['term-makki', /\bMakki\b/g],
  ['term-religious', /\b(?:Ayatollah )?Abol-Qasem Kashani\b/g],
  ['term-religious', /\bKashani\b/g],
  ['term-royalist', /\bMohammad Reza Shah\b/g],
  ['term-royalist', /\bShah\b/g],
  ['term-royalist', /\bCourt\b/g],
  ['term-royalist', /\bCrown\b/g],
  ['term-left', /\bTudeh(?: Party)?\b/g],
  ['term-independent', /\b(?:Prime Minister )?(?:Haj )?Ali Razmara\b/g],
  ['term-independent', /\bRazmara\b/g],
  ['term-aioc', /\bAIOC\b/g],
  ['term-islamist', /\bFada['’]iyan-e Islam\b/g],
  ['term-islamist', /\bKhalil Tahmasabi\b/g],
  ['term-islamist', /\bTahmasabi\b/g],
  ['term-religious', /\breligious[- ]network(?:s)?\b/gi],
  ['term-national-front', /\bindependent nationalist(?:s)?\b/gi],
];
const SEMANTIC_TEXT_PATTERNS = SEMANTIC_TERM_RULES.map(([, pattern]) => pattern);

const COMPLETE_TERM_PATTERNS = [
  ['term-national-front', /\bNational\s+Front\b/g],
  ['term-constitutionalist', /\bIran\s+Party\b/g],
  ['term-social-democratic', /\bToilers['’]\s+Party\b/g],
  ['term-mossadegh', /\bMohammad\s+Mossadegh\b/g],
  ['term-nationalist-social-democratic', /\bHossein\s+Fatemi\b/g],
  ['term-constitutionalist', /\bAllahyar\s+Saleh\b/g],
  ['term-nationalist-social-democratic', /\bKhalil\s+Maleki\b/g],
  ['term-makki', /\bHossein\s+Makki\b/g],
  ['term-religious', /\bAyatollah\s+Abol-Qasem\s+Kashani\b/g],
  ['term-royalist', /\bMohammad\s+Reza\s+Shah\b/g],
  ['term-left', /\bTudeh\s+Party\b/g],
  ['term-independent', /\bPrime\s+Minister\s+Haj\s+Ali\s+Razmara\b/g],
];

function loadGame(path = 'out/game.json') {
  const json = fs.readFileSync(path, 'utf8');
  return new Promise((resolve, reject) => {
    engine.convertJSONToGame(json, (error, game) => {
      if (error) reject(error);
      else resolve(game);
    });
  });
}

function contentLength(scene) {
  if (Array.isArray(scene?.content)) return scene.content.length;
  if (Array.isArray(scene?.content?.content)) return scene.content.content.length;
  return scene?.content ? 1 : 0;
}

function flattenAuthoredText(value) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(flattenAuthoredText).join(' ');
  if (value && typeof value === 'object' && 'content' in value) {
    return flattenAuthoredText(value.content);
  }
  return '';
}

function authoredFields(scene) {
  const fields = [
    ['title', scene.title],
    ['subtitle', scene.subtitle],
    ['unavailable subtitle', scene.unavailableSubtitle],
    ['content', scene.content],
  ];
  for (const [index, option] of (scene.options || []).entries()) {
    fields.push(
      [`option ${index + 1} title`, option.title],
      [`option ${index + 1} subtitle`, option.subtitle],
    );
  }
  return fields
    .map(([label, value]) => [label, flattenAuthoredText(value)])
    .filter(([, value]) => value);
}

function unwrappedSemanticTerms(text) {
  const withoutCitationLinks = text.replace(
    /<a\b[^>]*>[\s\S]*?<\/a>/gi,
    '',
  );
  const withoutTermSpans = withoutCitationLinks.replace(
    /<span\s+class=["'][^"']*\bterm\b[^"']*["'][^>]*>[\s\S]*?<\/span>/gi,
    '',
  );
  const plainText = withoutTermSpans.replace(/<[^>]+>/g, '');
  const matches = new Set();
  for (const pattern of SEMANTIC_TEXT_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of plainText.matchAll(pattern)) matches.add(match[0]);
  }
  return [...matches];
}

function incompleteSemanticPhrases(text) {
  const withoutCitationLinks = text.replace(
    /<a\b[^>]*>[\s\S]*?<\/a>/gi,
    '',
  );
  const rendered = withoutCitationLinks.replace(/<[^>]+>/g, '');
  const failures = [];
  for (const [className, pattern] of COMPLETE_TERM_PATTERNS) {
    pattern.lastIndex = 0;
    const renderedCount = [...rendered.matchAll(pattern)].length;
    if (!renderedCount) continue;
    const classPattern = new RegExp(
      `<span\\s+class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/span>`,
      'gi',
    );
    let wrappedCount = 0;
    for (const span of withoutCitationLinks.matchAll(classPattern)) {
      pattern.lastIndex = 0;
      wrappedCount += [...span[1].replace(/<[^>]+>/g, '').matchAll(pattern)].length;
    }
    if (wrappedCount !== renderedCount) {
      failures.push(
        `${renderedCount - wrappedCount} incomplete ${className} phrase(s)`,
      );
    }
  }
  return failures;
}

function incorrectSemanticClasses(text) {
  const withoutCitationLinks = text.replace(
    /<a\b[^>]*>[\s\S]*?<\/a>/gi,
    '',
  );
  const rendered = withoutCitationLinks.replace(/<[^>]+>/g, '');
  const failures = [];
  for (const [className, pattern] of SEMANTIC_TERM_RULES) {
    pattern.lastIndex = 0;
    const renderedCount = [...rendered.matchAll(pattern)].length;
    if (!renderedCount) continue;
    const classPattern = new RegExp(
      `<span\\s+class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/span>`,
      'gi',
    );
    let wrappedCount = 0;
    for (const span of withoutCitationLinks.matchAll(classPattern)) {
      pattern.lastIndex = 0;
      wrappedCount += [...span[1].replace(/<[^>]+>/g, '').matchAll(pattern)].length;
    }
    if (wrappedCount !== renderedCount) {
      failures.push(`${pattern.source} requires ${className}`);
    }
  }
  return failures;
}

function mechanicalChoiceSubtitle(text) {
  const plainText = text.replace(/<[^>]+>/g, '').trim();
  return (
    /^(?:stronger|strengthen|build|greater|reduce|lower|improve|balanced)\b/i
      .test(plainText) ||
    /\b(?:constitutional legitimacy|public mandate|organizational reach|press capacity|parliamentary procedure legitimacy|oil-coalition support)\b/i
      .test(plainText) ||
    /^costs? \d+ resources?\b/i.test(plainText)
  );
}

function classifyScene(scene) {
  const id = scene.id;
  if (FRAMEWORK_INTERNAL.has(id)) return 'framework_internal';
  if (ENGINE_INTERNAL.has(id)) return 'engine_internal';
  if (DECK_CONTAINERS.has(id)) return 'deck_container';
  if (INFORMATION_SURFACES.has(id)) return 'information_surface';
  if (
    id === 'campaign_spine.committee_rejection_response' ||
    id === 'campaign_spine.majles_rejection_response'
  ) {
    return 'continuation_decision';
  }
  if (
    OPENING_DECISIONS.has(id) ||
    id === 'palace_protest' ||
    scene.tags?.includes('event') ||
    scene.isCard ||
    scene.isPinnedCard
  ) {
    return 'decision_menu';
  }
  if (scene.onArrival && contentLength(scene) > 0) {
    return 'visible_consequence';
  }
  if (
    contentLength(scene) > 0 &&
    scene.options?.length &&
    scene.title?.trim() &&
    scene.subtitle?.trim()
  ) {
    return 'visible_consequence';
  }
  return null;
}

function auditGame(game) {
  const rows = [];
  const failures = [];

  for (const scene of Object.values(game.scenes)) {
    const reviewClass = classifyScene(scene);
    rows.push({id: scene.id, reviewClass});

    if (!reviewClass) {
      failures.push(`${scene.id}: unclassified compiled scene`);
      continue;
    }

    if (!['engine_internal', 'framework_internal', 'deck_container'].includes(reviewClass)) {
      for (const [label, text] of authoredFields(scene)) {
        const terms = unwrappedSemanticTerms(text);
        if (terms.length) {
          failures.push(
            `${scene.id}: ${label} has unwrapped semantic term(s): ${terms.join(', ')}`,
          );
        }
        const incompletePhrases = incompleteSemanticPhrases(text);
        if (incompletePhrases.length) {
          failures.push(
            `${scene.id}: ${label} has ${incompletePhrases.join(', ')}`,
          );
        }
        const incorrectClasses = incorrectSemanticClasses(text);
        if (incorrectClasses.length) {
          failures.push(
            `${scene.id}: ${label} has incorrect semantic class(es): ${incorrectClasses.join(', ')}`,
          );
        }
      }
    }

    if (reviewClass === 'information_surface') {
      const minimum = scene.id === 'research_library' ? 1 : 2;
      if (contentLength(scene) < minimum) {
        failures.push(`${scene.id}: information surface lacks explanation`);
      }
      continue;
    }

    if (reviewClass === 'decision_menu') {
      const minimum = scene.isPinnedCard ? 2 : 3;
      if (contentLength(scene) < minimum) {
        failures.push(`${scene.id}: decision menu lacks developed setup`);
      }
      if (!scene.options?.length) {
        failures.push(`${scene.id}: decision menu has no choices`);
      }
      for (const option of scene.options || []) {
        const targetId = option.id.replace(/^@/, '');
        const target = game.scenes[targetId];
        if (!target) {
          failures.push(`${scene.id}: missing choice target ${targetId}`);
          continue;
        }
        if (
          target.onArrival &&
          classifyScene(target) === 'visible_consequence'
        ) {
          if (!target.title?.trim()) {
            failures.push(`${targetId}: substantive choice lacks action title`);
          }
          if (!target.subtitle?.trim()) {
            failures.push(`${targetId}: substantive choice lacks qualitative subtitle`);
          }
        }
      }
      continue;
    }

    if (reviewClass === 'continuation_decision') {
      if (
        !scene.title?.trim() ||
        !scene.subtitle?.trim() ||
        scene.options?.length < 2
      ) {
        failures.push(`${scene.id}: continuation decision lacks a described strategy menu`);
      }
      for (const option of scene.options || []) {
        const target = game.scenes[option.id.replace(/^@/, '')];
        if (!target?.title?.trim() || !target?.subtitle?.trim()) {
          failures.push(`${scene.id}: continuation strategy lacks a described target`);
        }
      }
      continue;
    }

    if (reviewClass === 'visible_consequence') {
      if (contentLength(scene) < 1) {
        failures.push(`${scene.id}: consequence has no visible result`);
      }
      if (scene.subtitle && mechanicalChoiceSubtitle(scene.subtitle)) {
        failures.push(
          `${scene.id}: choice subtitle uses mechanical optimization shorthand`,
        );
      }
      if (!scene.options?.length) {
        failures.push(`${scene.id}: consequence does not wait for acknowledgement`);
      }
      if (scene.goTo !== undefined) {
        failures.push(`${scene.id}: consequence skips result prose with go-to`);
      }
      continue;
    }

  }

  const duplicateIds = rows
    .map((row) => row.id)
    .filter((id, index, ids) => ids.indexOf(id) !== index);
  for (const id of duplicateIds) failures.push(`${id}: duplicate compiled ID`);

  return {rows, failures};
}

function formatSummary(result) {
  const counts = {};
  for (const row of result.rows) {
    counts[row.reviewClass || 'unclassified'] =
      (counts[row.reviewClass || 'unclassified'] || 0) + 1;
  }
  return {
    total: result.rows.length,
    counts,
    failures: result.failures,
  };
}

async function main() {
  const game = await loadGame(process.argv[2] || 'out/game.json');
  const result = auditGame(game);
  const summary = formatSummary(result);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  if (result.failures.length) process.exitCode = 1;
}

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
  });
}

module.exports = {
  auditGame,
  classifyScene,
  contentLength,
  formatSummary,
  authoredFields,
  incompleteSemanticPhrases,
  incorrectSemanticClasses,
  loadGame,
  mechanicalChoiceSubtitle,
  unwrappedSemanticTerms,
};
