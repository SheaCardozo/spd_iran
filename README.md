# The Last Majles

*The Last Majles* is a single-player historical political simulation about
Iran's constitutional and oil crises from 1949 to 1953. The player represents
the coordinating leadership of the National Front: a coalition trying to
secure representative government, establish Iranian control of the oil
industry, and preserve constitutional politics amid institutional rivalry,
economic pressure, coalition fracture, and covert intervention.

The project is in early implementation. The current build establishes an
SPD-style monthly card loop, shared political state, an initial status screen,
and the sourced October 1949 opening. Its action effects are prototype balance
values; it does not yet implement the historical campaign beyond that opening.

## Design commitments

- Historical claims and disputed interpretations are documented.
- Institutions and organized networks matter more than a national popularity
  score.
- Oil agreements model ownership, control, marketing, compensation, and
  finance separately.
- Political intelligence is incomplete, delayed, and attributable to sources.
- The August 1953 coup is modeled as a network of domestic and foreign actors,
  not a single progress meter.
- The project is single-player and is not designed around symmetric factions
  or multiplayer turns.

The full pre-production specification and bibliography are in
[`docs/GAME_DESIGN.md`](docs/GAME_DESIGN.md).
The current SPD-first implementation policy and source map are in
[`docs/IMPLEMENTATION.md`](docs/IMPLEMENTATION.md).
The project-wide political text-color convention for game scenes and the
historical primer is in
[`docs/COLOR_STYLE_GUIDE.md`](docs/COLOR_STYLE_GUIDE.md).
The maintained source and image-rights registries are in
[`docs/research/BIBLIOGRAPHY.md`](docs/research/BIBLIOGRAPHY.md) and
[`docs/research/ASSETS.md`](docs/research/ASSETS.md).
The ignored local archive at `docs/research/sources/` is divided into major and
supplemental evidence. Its tracked available-source catalog, source review, and
acquisition queue are in
[`docs/research/AVAILABLE_SOURCES.md`](docs/research/AVAILABLE_SOURCES.md),
[`docs/research/SOURCE_AUDIT.md`](docs/research/SOURCE_AUDIT.md) and
[`docs/research/UNAVAILABLE_SOURCES.md`](docs/research/UNAVAILABLE_SOURCES.md).
Every project change receives a dated system note under
[`docs/changelog/`](docs/changelog/README.md).

## Build

The game uses [DendryNexus](https://github.com/aucchen/dendrynexus).
Node.js and npm are required.

```sh
npm install
npm run build
```

The generated web build is written to `out/html/`. Open
`out/html/index.html` in a browser to run it locally.

For a normal local webpage with automatic rebuilding, run:

```sh
npm run play
```

Then open <http://127.0.0.1:8080>. Set `GAME_PORT` to use another port.
The formatted historical orientation is available at
<http://127.0.0.1:8080/timeline.html> and is generated from
[`docs/research/TIMELINE_PRIMER.md`](docs/research/TIMELINE_PRIMER.md) during
each build.

## Project layout

The implementation follows Dynamic SPD's domain-oriented Dendry layout:

| Path | Purpose |
| --- | --- |
| `source/scenes/events/` | Dated historical event scenes |
| `source/scenes/party_affairs/` | Recurring organizational action cards |
| `source/qdisplays/` | Reusable human-readable state displays |
| `web/` | Tracked SPD-style browser shell applied after every build |
| `assets/` | Rights-reviewed source assets copied into the web build |
| `docs/research/` | Source catalogs, event records, and the ignored local source archive |

Dynamic SPD keeps customized files directly in generated `out/html/`. This
project keeps the same browser behavior in `web/` because `out/` is disposable;
`npm run build` applies the overlay after DendryNexus generation.

## Current milestone

The first playable vertical slice will cover the formation of the National
Front through the passage of oil nationalization. Implementation begins close
to the structure of *Dynamic Social Democracy* and will diverge piecemeal where
Iran's institutions require it, with:

- the October 1949 palace protest as the campaign opening;
- a monthly briefing and decision loop;
- coalition and named-institution records;
- an initial oil-proposal model;
- sourced research notes for every implemented historical event.
