const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

test('monthly briefings do not announce June credential decisions in May', () => {
  const main = read('source/scenes/main.scene.dry');
  const may = main.match(
    /\[\? if year = 1950 and month = 5:[\s\S]*?\?\]/,
  );

  assert.ok(may, 'missing the May 1950 briefing');
  assert.doesNotMatch(may[0], /1 June|passed on 1 June/i);
  assert.match(main, /year = 1950 and month = 6:[\s\S]*1 June/);
});

test('year-rollover income is announced before January anchor choices', () => {
  const spine = read('source/scenes/events/campaign_spine.scene.dry');

  assert.match(
    spine,
    /= January 1950[\s\S]{0,180}Annual subscriptions have brought/,
  );
  assert.match(
    spine,
    /= 11 January 1951[\s\S]{0,180}Annual subscriptions have brought/,
  );
});

test('lower-chamber actions leave the agenda after Majles passage', () => {
  for (const path of [
    'source/scenes/parliamentary_affairs/credential_petitions.scene.dry',
    'source/scenes/parliamentary_affairs/deputy_outreach.scene.dry',
    'source/scenes/parliamentary_affairs/oil_committee.scene.dry',
  ]) {
    assert.match(
      read(path),
      /view-if:.*nationalization_approved_majles = 0/,
      `${path} remains eligible after the Majles vote`,
    );
  }
});

test('player prose avoids research labels and incomplete-intelligence framing', () => {
  const paths = [
    'source/scenes/main.scene.dry',
    'source/scenes/campaign_ending.scene.dry',
    ...fs.readdirSync('source/scenes/party_affairs')
      .filter((name) => name.endsWith('.scene.dry'))
      .map((name) => `source/scenes/party_affairs/${name}`),
    ...fs.readdirSync('source/scenes/public_campaign')
      .filter((name) => name.endsWith('.scene.dry'))
      .map((name) => `source/scenes/public_campaign/${name}`),
    ...fs.readdirSync('source/scenes/parliamentary_affairs')
      .filter((name) => name.endsWith('.scene.dry'))
      .map((name) => `source/scenes/parliamentary_affairs/${name}`),
  ];
  const prose = paths.map(read).join('\n');

  assert.doesNotMatch(
    prose,
    /uncertainty register|contestable scenario records|latest recorded setback/i,
  );
  assert.doesNotMatch(
    read('source/scenes/party_affairs/political_correspondence.scene.dry'),
    /brings? .* into view|complete national coverage|surveying the country/i,
  );
});

test('persistent recurring work has diminishing or state-responsive yields', () => {
  for (const path of [
    'source/scenes/party_affairs/coalition_meeting.scene.dry',
    'source/scenes/party_affairs/fundraising.scene.dry',
    'source/scenes/party_affairs/membership_committees.scene.dry',
    'source/scenes/public_campaign/press.scene.dry',
    'source/scenes/parliamentary_affairs/electoral_committee.scene.dry',
    'source/scenes/parliamentary_affairs/credential_petitions.scene.dry',
    'source/scenes/parliamentary_affairs/oil_committee.scene.dry',
  ]) {
    assert.match(
      read(path),
      /\?\s*\d+\s*:\s*\d+|var repeated|var mature/,
      `${path} has no state-responsive yield`,
    );
  }
});

test('every paid choice states its exact resource cost while it is available', () => {
  const source = fs
    .readdirSync('source/scenes', {recursive: true, withFileTypes: true})
    .filter((entry) => entry.isFile() && entry.name.endsWith('.scene.dry'))
    .map((entry) => read(`${entry.parentPath}/${entry.name}`))
    .join('\n');
  const paidChoices = source.split(/\n(?=@)/).filter(
    (scene) => /choose-if: resources >= [12]/.test(scene) &&
      /resources -= [12]/.test(scene),
  );

  assert.ok(paidChoices.length >= 10);
  for (const scene of paidChoices) {
    const cost = scene.match(/resources -= ([12])/)[1];
    const subtitle = scene.match(/^subtitle:\s*(.+)$/m)?.[1] || '';
    assert.match(
      subtitle,
      cost === '1' ? /\b(one|1) resource\b/i : /\b(two|2) resources\b/i,
      `paid choice hides its ${cost}-resource cost: ${scene.slice(0, 80)}`,
    );
  }
});

test('the ending uses live chamber attendance names and never rewrites a resolved vote', () => {
  const ending = read('source/scenes/campaign_ending.scene.dry');
  const reducer = read('source/scenes/post_event.scene.dry');

  assert.doesNotMatch(ending, /nationalization_(majles|senate)_attending_members/);
  assert.match(ending, /\[\+ majles_attending_members \+\]/);
  assert.match(ending, /\[\+ senate_attending_members \+\]/);
  assert.match(reducer, /if \(!Q\.nationalization_majles_vote_resolved\)/);
  assert.match(reducer, /if \(!Q\.nationalization_senate_vote_resolved\)/);
  assert.doesNotMatch(
    ending,
    /majles_returns_recorded \+\] opposition-aligned returns/,
  );
});
