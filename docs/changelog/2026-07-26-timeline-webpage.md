# Formatted historical-primer webpage

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Added a responsive historical-primer webpage at `timeline.html` in the browser
build. The page is generated from `docs/research/TIMELINE_PRIMER.md` rather
than maintaining a second copy of the narrative.

The presentation adds:

- a period-image hero assembled from three rights-reviewed project assets;
- a sticky chapter navigator and active-section indication;
- a visual timeline treatment for the ten chronological chapters;
- Dynamic SPD-style colored terms whose meaning emerges through repeated use,
  without a persistent legend;
- styled actor lists, plain-language citations, interpretive sections, and
  source tables;
- reading progress, light and dark themes, print styles, and mobile layouts;
- a link from the game header to the primer and a return link to the game; and
- build validation for generated content, stable chapter IDs, and required
  assets.

## Reason

The Markdown primer is appropriate for research maintenance but is dense as a
first introduction to the campaign. The formatted page supplies hierarchy,
wayfinding, readable line lengths, and visual period context without forking
the historical text. Reader-facing citations name authors and titles rather
than exposing local archive IDs, filenames, bibliography tags, or other
references that require repository access to understand.

## Dynamic SPD comparison

- **Reference paths:** `out/html/index.html`, `out/html/game.css`,
  `out/html/game.js`, `source/scenes/main.scene.dry`, and
  `source/scenes/events/election_1928.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** presents its historical simulation in a narrow,
  serif-led paper panel with muted colors, compact header navigation, status
  sidebars, light/dark settings, and responsive fallbacks. Historical
  references live in the credits scene; the checkout has no long-form timeline
  webpage. Its colored personal names have no consistent span convention:
  ordinary prose usually leaves politicians neutral, sometimes colors only a
  surname, and occasionally colors a full name in exceptional achievement
  text.
- **Decision here:** retain the serif editorial voice, warm paper palette,
  restrained red accents, compact header navigation, theme preference, and
  responsive behavior. Adapt Dynamic SPD's inline colored-keyword convention
  into alignment-coded people, groups, parties, and institutions. Only country
  names and direct national adjectives use flag colors; foreign politicians
  and intelligence agencies remain neutral. Dynamic SPD distinguishes its
  inline social-democratic red (`#c00000`) from KPD communist red (`#700000`),
  while its election displays use the brighter SPD swatch `#E3000F`. This page
  adapts the inline-text pair for the Third Force and Tudeh respectively. The
  World Bank uses its familiar blue. The AIOC and TPAJAX use the exact brown
  assigned to the NSDAP in Dynamic SPD as an editorial joke documented here,
  not a historical classification. As in the reference implementation, the
  page does not provide a color key and instead lets recurring contextual use
  establish the convention. Dynamic SPD renders Zentrum in black and uses
  several greens for agrarian organizations; neither mapping is imported
  literally. Iran's light/dark greens instead distinguish pragmatic
  bazaar-clerical politics from dogmatic or revolutionary Islamism, a cleavage
  established in the Iran scholarship. Minor parties receive emphasis when
  they are narratively active, so Mellat-e Iran remains uncolored and unnamed
  in this overview rather than inheriting NSDAP brown solely from an
  ideological resemblance. Because the reference has no stable personal-name
  rule, this page formalizes its existing surname-only convention: honorifics
  and given names remain neutral, while the surname—or the distinctive title
  “Shah”—carries the actor's color. The narrow game panel becomes a wider long-form
  reading layout with a sticky contents rail and timeline chapters. The game
  interface remains unchanged except for one `Primer` link.
- **Divergence level:** local. The new page is a generated research companion,
  not a change to the Dendry runtime, turn loop, event routing, or state model.

## System fit

`scripts/build-timeline.js` transforms the canonical Markdown into semantic
HTML after the normal Dendry and browser-overlay build. `web/timeline.html` is
the page shell; `web/timeline.css` and `web/timeline.js` own its presentation
and progressive enhancements. The final output lives beside the game at
`out/html/timeline.html`, so `npm run play` serves both pages.

The generator implements only the Markdown structures used by the primer and
is covered by output assertions. It expands local source IDs into
human-readable authors and titles, suppresses internal-only cross-references,
and adds a short page-local explanation of evidentiary limits. The Markdown
remains the historical editing surface and its claim-level limits are
preserved in the generated page.

## Research and assets

The expanded actor guide names the secular constitutionalist cadre on the
basis of Abrahamian's account of National Front organization and fracture
(`MAJ-S2`, printed pp. 250–61 and 275–78). Source citations name the author,
title, and locator directly and resolve to the page's source guide; local
archive IDs remain only in the canonical research Markdown.

The color system is a reading aid, not a claim that every actor had a formal
brand. Mossadegh alone uses an editorial teal-to-gold blend: teal distinguishes
him within the nationalist field while parliamentary gold supplies his
constitutional motif. “National Front” uses solid teal as the name of the
coalition, and the Iran Party shares that solid teal as an organized secular
constituent. Sanjabi, Zirakzadeh, Shayegan, Nariman, and Saleh use solid
parliamentary gold as the secular constitutionalist cadre. Afshartus remains
neutral. Fatemi blends teal with dark red,
marking the radical/left nationalist position attributed to his wing of the
Front without identifying him with the Tudeh. Khalil Maleki, the Toilers'
Party, and the Third Force instead blend teal with Dynamic SPD's brighter
social-democratic red (`#c00000`). This is an ideological visual analogy for
Maleki's independent democratic-socialist current, not a claim of formal
equivalence to the German SPD. Baghai
returns to teal-to-blue: teal marks his National Front origin, while blue marks
the Toilers' constitutional-monarchist commitment and his later movement
toward the royal opposition. The social-democratic red belongs to the
Maleki/Third Force current rather than being imputed to Baghai personally; the
whole Toilers' Party receives it as a broad socialist organizational label
despite the internal fracture described in the prose.
Makki blends teal with the lighter religious green, cautiously marking his
traditional-bazaar, pro-clerical, and National Front right-wing associations
rather than membership in a clerical party. Kashani and his pragmatic,
bazaar-based religious coalition use that same lighter green. The Fada'iyan-e
Islam, its member Khalil Tahmasabi, and Khomeini's later movement use dark
green, distinguishing dogmatic or revolutionary Islamism from socially
conservative clerical politics. This follows Abrahamian's explicit contrast
between Kashani's Society of Muslim Warriors and the younger, violent,
fundamentalist Fada'iyan rather than deriving the categories from color alone
(`MAJ-S2`, printed pp. 259–61). The royal state uses blue, the Tudeh uses
Dynamic SPD's communist dark red (`#700000`), and parliamentary institutions
use gold.

Mellat-e Iran receives no color in the primer. Although its program was
ultranationalist, racialist, antisemitic, anticommunist, anticapitalist, and
anticlerical, Abrahamian records only a few hundred members—mostly Tehran
high-school students—and says it carried little weight in National Front
leadership (`MAJ-S2`, printed pp. 258–59). A later scene that makes the party
politically active can introduce a deliberately documented treatment; its
mere ideological extremity does not make it a recurring actor in this primer.
Independent political figures who do not belong to those alignments use
Dynamic SPD's Hindenburg grey (`#808080`); Qavam is currently the sole member
of that category.
Flag-order gradients identify country names, but not their politicians or
agencies. No authoritative evidence of an official National Front color in
1949–53 was found, so its blended treatment remains an editorial reading aid
rather than purported period branding; the modern Front's use of Iran's
tricolor is not back-projected. This is provisional because the coalition's
later factionalism may ultimately make any single persistent treatment
misleading. The World Bank uses its familiar institutional blue. AIOC
and TPAJAX use Dynamic SPD's NSDAP brown (`#7A3C00`) as transparent editorial
satire, not a historical classification. Royal Dutch Shell no longer receives
corporate red: only the national adjective “Dutch” uses the Netherlands'
red-white-blue flag order, leaving the organization itself neutral. Citations
and source names are deliberately excluded from all keyword coloring. Citation
links and links within the source guide also inherit the surrounding ink color
in normal, visited, and hover states; underlines and neutral background changes
convey interactivity without introducing a red that could be mistaken for
ideological coloring.

The individual assignments were checked against Abrahamian, *Iran Between Two
Revolutions*, pp. 252–57, 263–66, 275, and 278–80, and Azimi, *Iran: The
Crisis of Democracy*, pp. 304–05, 308, 318, and 322. Razmara was removed from
royal blue and placed in independent grey: the sources describe an
independent-minded, sometimes court-critical officer who drew closer to the
Shah, not a straightforward royal partisan. Zahedi remains blue because he
explicitly aligned the survival of the military with the monarchy and sided
with the Shah. Nassiri remains blue as commander of the Imperial Guard and the
officer entrusted with the royal dismissal decree. SAVAK remains blue as a
royal institution, not as a political figure.

The hero uses the existing ledgered assets:

- `assets/img/majlis_1940s.jpg`;
- `assets/img/shah_1949.jpg`; and
- `assets/img/makki_abadan_1951.jpg`.

Their provenance and rights records remain in `docs/research/ASSETS.md`. No new
asset was acquired or assigned a rights status.

## Validation

- Built the game and generated `out/html/timeline.html`.
- Verified 16 generated sections and 57 source citations.
- Verified that the built page contains no `MAJ-S` or `SUP-` archive tags,
  that all alignment and national-color families are present, and that source
  citations contain no colored terms.
- Verified all fragment links, including generated navigation and citation
  targets; found no missing targets or duplicate IDs.
- Served the build locally and received HTTP 200 responses for the primer,
  stylesheet, script, hero image, and game page.
- Checked desktop, tablet, mobile, dark-theme, and print rules by stylesheet
  inspection.
- Ran the complete project test suite.
- Ran `git diff --check`.
