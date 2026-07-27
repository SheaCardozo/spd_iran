# Parliamentary political priors

## Purpose

This is the source-safe version of a political “vibe” for members whose exact
party, caucus, allegiance, or voting record is incomplete. The formal term is
**political prior**: a deliberately weak expectation derived from the
composition of a chamber, method of entry, dated political phase, and any
sourced personal background.

A prior is useful for simulation and player comprehension. It is **not** a
historical claim about how an identified person thought or voted. The
member-level evidence remains in
[`SIXTEENTH_MAJLES_LEDGER.md`](SIXTEENTH_MAJLES_LEDGER.md) and
[`PARLIAMENTARY_CONTROL.md`](PARLIAMENTARY_CONTROL.md).

## Four evidence states

| State | Meaning | Permitted presentation |
| --- | --- | --- |
| **Documented** | Official act or a named alignment established by specialist scholarship (`A` or `B` in the ledgers) | State the dated fact and its qualification. |
| **Reported** | A dated contemporary observer or interested primary record (`C`) | “Reported,” “estimated,” or “identified by,” with source and date visible. |
| **Heuristic** | An inherited chamber, appointment-route, or political-phase prior (`H`) | “Likely,” “establishment-leaning,” “issue-dependent,” or another visibly probabilistic phrase. |
| **Unresolved** | No defensible personal classification (`D`) | Say “unknown”; never silently upgrade the prior to fact. |

`H` is not a lower grade of citation. It is a different type of information.
It must be stored separately from historical evidence and replaced, rather
than “confirmed,” when member-level evidence becomes available.

## A vibe is not one left–right coordinate

Each profile can combine independent signals:

| Signal | Illustrative values |
| --- | --- |
| Political milieu | landed or provincial notable; bazaar-linked; clerical; professional or technocratic; press; tribal; military; court or senior bureaucracy |
| Constitutional center of gravity | responsible ministry and Majles; court and royal prerogative; conditional or unresolved |
| Relationship to the incumbent government | reliable; conditional; opposed; wavering; unresolved |
| Issue behavior | oil sovereignty; confidence; special powers; court powers; quorum and attendance |
| Organization | declared party or movement |
| Dated caucus | Homeland, National Movement, Freedom, Salvation of the Movement, or another named parliamentary group |

These signals may conflict without error. A conservative senator could support
nationalization; an original National Front deputy could oppose Mossadegh's
special powers; a Shah-appointed senator could be anti-Pahlavi; and an
anti-government deputy could support a constitutional report on another date.

## Inherited priors for unresolved members

The following defaults give every unresolved row a usable but weak profile.
They are aggregate inheritance rules, not person-specific findings.

### Coverage after inheritance

| Chamber or route | Personal political information | Rows receiving only an inherited prior |
| --- | ---: | ---: |
| Sixteenth Majles | 22 of 131 returned places | 109 returned places; the five unfilled places receive no member profile |
| Seventeenth Majles | 52 of 80 returned people | 28 people |
| First Senate, Shah-appointed half | 11 of 30 places | 19 places |
| First Senate, elected half | 16 of 30 places | 14 places |

This produces a legible profile for every occupant without increasing the
number of historically classified individuals. Replacement occupants inherit
the prior appropriate to their own date and entry route.

### Sixteenth Majles

| Phase | Inherited prior |
| --- | --- |
| Opening, February 1950 | **Elite/notable chamber; weak establishment or royalist lean; low discipline; personal allegiance unknown.** The royalists were the largest aggregate grouping, but approximately forty independents and a separate southern-conservative network prevent assignment of an unclassified member to that majority. |
| Nationalization, March–April 1951 | **Oil-sovereignty support likely; wider politics still unknown.** The unanimous standing votes among those present justify an issue prior, not National Front membership. |
| Mossadegh government, May–October 1951 | **Issue-dependent and susceptible to public pressure.** Named opposition existed, but even conservative figures could cooperate tactically with the National Front. |

Player-facing shorthand for an otherwise unknown member:
**“Establishment-leaning notable; oil vote probably favorable; personal
allegiance unknown.”**

### Seventeenth Majles

| Phase | Inherited prior |
| --- | --- |
| Election and opening, 1952 | **Local or provincial notable; conditional rather than disciplined; weak conservative social prior; government allegiance unknown.** Forty-nine of the accepted deputies were landlords, while the initial government coalition contained diverse party, clerical, tribal, and nonparty elements. |
| Immediately after 30 Tir | **Temporarily favorable to Mossadegh on confidence under intense public pressure.** This is a chamber-phase behavioral prior, not ideological conversion. |
| Early 1953 | **Swing or attendance risk unless individually classified.** The best estimates divide the chamber into a reliable government core, waverers, and several kinds of potential opposition, but do not name every member. |
| Quorum crisis, spring–summer 1953 | **Presence may matter more than preference.** An unknown member can be unavailable, absent, or strategically withdrawn without being assigned a permanent faction. |

Player-facing shorthand:
**“Provincial notable; likely issue-dependent; court–government allegiance
unclear.”**

### First Senate: Shah-appointed half

| Phase | Inherited prior |
| --- | --- |
| Opening, 1950 | **Palace-selected establishment figure; institutionally conservative; weak royalist prior; individual allegiance unknown.** Appointment is an entry route, not proof of a vote. |
| Nationalization | **Likely to accept oil sovereignty once the cross-chamber coalition is overwhelming.** |
| July 1952 before 30 Tir | **Strong chamber-level resistance to Mossadegh.** Do not infer that every non-affirmative senator belonged to one opposition faction. |
| After 30 Tir | **Likely temporary accommodation under public and lower-house pressure.** |

Player-facing shorthand:
**“Royal appointee; probably establishment-conservative; loyalty not
guaranteed.”**

### First Senate: elected half

| Phase | Inherited prior |
| --- | --- |
| Opening, 1950 | **Old-guard or notable conservative prior; weaker direct palace inference than an appointed place; personal allegiance unknown.** Indirect election did not make this a mass-democratic party bloc. |
| Nationalization and later crises | Use the same chamber-level issue and confidence priors as the appointed half, while preserving the weaker palace connection. |

Player-facing shorthand:
**“Indirectly elected notable; probably conservative and issue-dependent;
palace alignment unclear.”**

## Composition rule

For any member and date:

```text
displayed_vibe =
  strongest dated member evidence
  + compatible sourced political background
  + explicitly inherited phase prior
  + uncertainty label
```

Precedence is:

```text
documented dated act
> documented dated caucus or allegiance
> reported dated alignment
> sourced background
> inherited heuristic prior
> unresolved
```

A stronger record overrides only the same dimension. For example, evidence
that a senator supported nationalization does not erase a conservative
background or establish support for Mossadegh on confidence.

## Safe and unsafe outputs

| Safe | Unsafe |
| --- | --- |
| “Royal appointee; establishment-leaning; personal vote unknown.” | “Royalist senator” solely because the Shah appointed him. |
| “Provincial notable; reported with the government after 30 Tir.” | “National Front deputy” because of one confidence vote. |
| “Original National Front; dissident by 1953.” | One permanent loyalty score for the whole term. |
| “Likely favorable on oil; uncertain on special powers.” | Deriving every policy position from a single ideology tag. |
| “Unknown; chamber prior only.” | Filling an empty row from title, surname, constituency, occupation, or landholding. |

## Simulation and interface rules

1. Store the heuristic separately as `inherited_prior`; never write it into
   `declared_party`, `dated_caucus`, `dated_alignment`, or `votes`.
2. Preserve the prior's scope: chamber, appointment route, and date range.
3. Let each major question—oil, confidence, special powers, Crown authority,
   quorum—have its own behavioral expectation.
4. Use qualitative player-facing phrases. Do not publish invented percentages.
5. A dossier or tooltip must distinguish “documented,” “reported,”
   “estimated,” and “unknown.”
6. New evidence replaces the inherited prior on the relevant dimension and
   leaves unrelated dimensions intact.
7. The uncolored and accessible presentation must communicate uncertainty
   without relying on hue.

## Dynamic SPD comparison

Dynamic SPD maps hidden continuous values to readable phrases in
`source/qdisplays/loyalty.qdisplay.dry`,
`source/qdisplays/confidence.qdisplay.dry`, and
`source/qdisplays/strength.qdisplay.dry`. It also derives exact party support
and seats in `source/scenes/election_algorithm.scene.dry`.

This project retains the qualitative wording layer. It diverges by attaching
an evidence state and scope to every phrase, and by using several
question-specific priors rather than one universal loyalty value. The
divergence is necessary because Iranian parliamentary allegiance was
individual, dated, coalition-based, and often visible only through attendance
or one issue.

## Source calibration

The aggregate priors are calibrated only to the evidence assembled in
[`PARLIAMENTARY_CONTROL.md`](PARLIAMENTARY_CONTROL.md):

- `MAJ-S1`, pp. 265–67 and 318–20;
- `MAJ-S2`, pp. 250–80;
- `MAJ-S3`, pp. 89–117;
- the official rosters `SUP-051` through `SUP-053`;
- the official Sixteenth-Majles proceedings in `SUP-007`; and
- dated FRUS estimates discussed in the control ledger.

No new claim about an individual member is created by this model.
