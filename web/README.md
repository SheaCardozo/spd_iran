# Browser overlay

DendryNexus generates a default browser shell in `out/html/`. The build then
copies this directory over that generated shell so UI customization is
reproducible and is not erased by the next build.

The layout, styling, sidebar behavior, and settings conventions are adapted
from the local Dynamic SPD reference:

- `/home/phroz/spd/dynamic_social_democracy/out/html/game.css`
- `/home/phroz/spd/dynamic_social_democracy/out/html/game.js`
- `/home/phroz/spd/dynamic_social_democracy/out/html/index.html`

Iran-specific labels and available status tabs live here. Game state and
historical content remain in `source/`.

`timeline.html`, `timeline.css`, and `timeline.js` provide the formatted
historical-primer shell. During each build, `scripts/build-timeline.js`
replaces the shell markers with content generated from
`docs/research/TIMELINE_PRIMER.md`; the Markdown remains the canonical text.
