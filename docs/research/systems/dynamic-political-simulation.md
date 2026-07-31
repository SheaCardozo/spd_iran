# Dynamic political simulation — system claim record

## Documented foundation

The National Front emerged from cooperation among parties, independent
constitutional politicians, newspapers, bazaar and religious networks, and a
small parliamentary group. Those participants did not become a single
disciplined party. The Sixteenth-Majles election was affected by
administrative interference and followed by credential decisions inside the
chamber. The Crown possessed constitutional, administrative, electoral, and
appointment powers, but its conduct changed with political circumstances.
The oil campaign moved from the supplemental agreement through commission and
chamber action rather than through one national-policy scalar.

## Sources

- `MAJ-S2`, Ervand Abrahamian, *Iran Between Two Revolutions*, chapter 5,
  especially pp. 249–267, for National Front formation, heterogeneous
  political networks, election conflict, and the public and parliamentary oil
  campaign.
- `MAJ-S13`, Homa Katouzian, *Musaddiq and the Struggle for Power in Iran*,
  chapter 3, printed pp. 118–153, for parliamentary restoration, elections,
  royal power, and weak party institutionalization.
- `MAJ-S14`, David S. Painter and Gregory Brew, *The Struggle for Iran*,
  chapter 1, especially pp. 21–38, for the supplemental agreement,
  parliamentary opposition, Razmara, and the March 1951 nationalization
  sequence.
- `SUP-007`, official Sixteenth-Majles proceedings, sessions 2, 25, 30, 102,
  and 128, for the opening chamber, successive credentials, rejection of the
  supplemental agreement, and the March 1951 parliamentary acts.
- `SUP-053`, official First-Senate roster tables, for the sixty places and the
  elected/appointed routes.

The project does not have an authoritative complete division list for the
counterfactual Majles and Senate votes. It therefore does not populate
historical vote fields or invent speeches, attendance, or party labels.

## Mechanical abstractions

All numerical qualities, monthly trends, project stages, Crown-pressure
formulae, place influence, oil commitments, and chamber thresholds are
transparent game-balance abstractions. They represent causal relationships
that the documented political structure makes relevant; they are not
retrospective measurements.

`post_event.scene.dry` derives aggregates from component and place scenario
state. Scenes may change a faction, resource, support audience, Crown
dimension, project, or place scenario field. They never overwrite historical
evidence. Crown conduct appears only in a sourced historical scene or a scene
explicitly labelled as counterfactual.

Nationalization may fail in the simulation. A Majles or Senate defeat is
identified in the prose as counterfactual because both chambers documented
approval in March 1951. The playable threshold is a majority of attending,
usable scenario records, not a claim about an unrecorded historical division.
The displayed supporting, conditional, and opposing counts are therefore a
complete partition of scenario positions among members expected to attend.
They explain the simulation's decision without being presented as a recovered
historical roll call. The scenario partition is frozen when the chamber acts:
subsequent Senate strategy can affect the upper chamber but cannot
retroactively alter the Majles result shown to the player.
