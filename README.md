# The Last Majles

*The Last Majles* is a single-player historical political simulation about
Iran's constitutional and oil crises from 1949 to 1953. The player represents
the coordinating leadership of the National Front: a coalition trying to
secure representative government, establish Iranian control of the oil
industry, and preserve constitutional politics amid institutional rivalry,
economic pressure, coalition fracture, and covert intervention.

The project is in pre-production. The current build is a small technical
foundation; it does not yet implement the campaign.

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

## Build

The game uses [DendryNexus](https://github.com/aucchen/dendrynexus).
Node.js and npm are required.

```sh
npm install
npm run build
```

The generated web build is written to `out/html/`. Open
`out/html/index.html` in a browser to run it locally.

## Current milestone

The first playable vertical slice will cover the formation of the National
Front through the passage of oil nationalization, with:

- the October 1949 palace protest as the campaign opening;
- a monthly briefing and decision loop;
- coalition and named-institution records;
- an initial oil-proposal model;
- sourced research notes for every implemented historical event.

