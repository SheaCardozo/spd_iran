# Political text-color style guide

This is the binding color standard for historical text in *The Last Majles*.
It applies to Dendry scenes, cards, status text, tooltips, dossiers, ending
text, and the historical primer.

Color is a secondary reading aid. Prose must remain intelligible with colored
text disabled, in grayscale, or to a reader who does not infer the convention.
Colors indicate recurring political alignment or institutional identity; they
do not substitute for explanation and are not claims that an actor used an
official historical brand.

## Authoring rules

1. Use the semantic CSS classes below. Do not introduce inline hexadecimal
   colors in scene prose.
2. Color an actor only when the alignment is historically supported and useful
   across repeated appearances. Ideological extremity alone does not make a
   minor actor important enough to color.
3. Color personal surnames only. Leave honorifics and given names neutral:
   `Ayatollah Abol-Qasem Kashani`, `Mohammad Mossadegh`, and `Ruhollah Khomeini`
   color only the final surname. For Mohammad Reza Shah and Reza Shah, color
   only the distinctive political title `Shah`.
4. Color the complete established name of a party, group, or institution.
   Do not color an ordinary word merely because it appears inside that name.
5. Country names and direct national adjectives may use flag-order treatments.
   Do not extend the country treatment to foreign politicians, intelligence
   services, companies, or authors.
6. Never color citations, source titles, author names, quotations solely
   because they contain a mapped word, or text whose meaning requires
   repository access.
7. Composite gradients denote a documented mixed position. Do not invent a
   blend merely to make every character visually unique.
8. Check light, dark, and disabled-color modes. Meaning must never depend on
   distinguishing two nearby hues.

## Core palette

The values below are the light-mode anchors. Dark mode uses brighter
accessibility variants while retaining the same relationships.

| Meaning | Class | Anchor | Current use |
| --- | --- | --- | --- |
| National Front field | `term-national-front` | teal `#2f766a` | National Front; Iran Party |
| Parliamentary constitutionalism | `term-parliament` | gold `#a87925` | Majles; Senate |
| Secular constitutionalist cadre | `term-constitutionalist` | gold `#a87925` | Sanjabi; Zirakzadeh; Shayegan; Nariman; Saleh |
| Monarchy or sourced pro-monarchy alignment | `term-royalist` | blue `#416a9b` | Shah; Zahedi; Nassiri; SAVAK |
| Communist current | `term-left` | dark red `#700000` | Tudeh |
| European-style social democracy | `term-social-democratic` | red `#c00000` | Used within the Maleki/Third Force blend |
| Pragmatic bazaar-clerical politics | `term-religious` | light green `#4f8448` | Kashani; Society of Muslim Warriors |
| Dogmatic or revolutionary Islamism | `term-islamist` | dark green `#24502f` | Fada'iyan-e Islam; Tahmasabi; Khomeini's movement |
| Independent political figure | `term-independent` | grey `#808080` | Qavam; Razmara |
| World Bank | `term-world-bank` | institutional blue `#0071bc` | World Bank |
| AIOC and TPAJAX | `term-aioc`, `term-tpajax` | brown `#7a3c00` | Deliberate editorial analogy documented below |

“Monarchy or sourced pro-monarchy alignment” is not a generic color for
soldiers, landowners, establishment officials, or foreign leaders. Confirm the
individual's relevant political alignment before applying it.

## Composite treatments

| Meaning | Class | Blend |
| --- | --- | --- |
| Mossadegh | `term-mossadegh` | National Front teal → parliamentary gold |
| Fatemi | `term-nationalist-left` | National Front teal → communist/Marxist dark red |
| Maleki, Third Force, Toilers' Party | `term-nationalist-social-democratic` | National Front teal → social-democratic red |
| Baghai | `term-baghai` | National Front teal → royalist blue |
| Makki | `term-makki` | National Front teal → pragmatic religious green |

The Toilers' Party treatment describes its broad socialist organizational
identity; the prose must still explain its internal Baghai–Maleki fracture.
Likewise, Fatemi's dark-red component marks radical-left nationalism and does
not make him a Tudeh member.

## Country treatments

Use `term term-country` plus the relevant country class:

- `country-iran`
- `country-uk`
- `country-us`
- `country-france`
- `country-netherlands`
- `country-saudi`
- `country-ussr`
- `country-israel`

Flag ordering is reserved for the country name or direct adjective. For
example, in “Royal Dutch Shell,” only `Dutch` receives the Netherlands
treatment. A foreign president remains neutral unless a separate,
Iran-relevant political alignment justifies a color.

## Historical basis

The National Front's organizational and ideological assignments principally
follow [`MAJ-S2`, chapter 5, especially printed pp. 250–61 and
275–78](research/AVAILABLE_SOURCES.md#maj-s2). Those pages distinguish the
modern and traditional middle-class wings, the Iran Party, Toilers' Party,
Maleki's Third Force, Baghai, Kashani's Society of Muslim Warriors, Fada'iyan-e
Islam, and the secular cadre that remained with Mossadegh. Fatemi's
radical-left nationalist treatment is also informed by [`MAJ-S1`, chapter 20,
especially printed pp. 304–05](research/AVAILABLE_SOURCES.md#maj-s1). The
primer's [source-locator map](research/TIMELINE_PRIMER.md#source-spine-and-locator-map)
tracks the broader institutional and chronological evidence.

These sources establish political characterization, not official party
colors. Teal and the composite gradients are editorial devices unless a later
source record explicitly establishes a period symbol.

## Dendry markup

Dendry scene text uses raw-HTML blocks around only the semantic term:

```text
Mohammad {!<span class="term term-mossadegh">!}Mossadegh{!</span>!}

the {!<span class="term term-parliament">!}Majles{!</span>!}

Ayatollah Abol-Qasem
{!<span class="term term-religious">!}Kashani{!</span>!}
```

Do not wrap the full personal name. Do not hardcode `style="color: …"`.

## Dynamic SPD relationship

Dynamic SPD establishes the useful general convention of recurrent ideological
color: SPD/social democracy uses `#c00000`, KPD/communism uses `#700000`,
royalist or national-conservative actors use blue, NSDAP/fascism uses
`#7A3C00`, and unaffiliated establishment figures such as Hindenburg use grey.
Its scene files normally hardcode these values inline, and its treatment of
personal full names versus surnames is inconsistent.

This project retains the repeated ideological associations but centralizes
them as semantic CSS classes, formalizes the surname-only rule, and derives
Iran-specific assignments from Iran scholarship. The AIOC and TPAJAX reuse
Dynamic SPD's fascist brown as a transparent editorial analogy, not as a claim
that a company or covert operation was literally a political party. Do not
extend that joke automatically to every imperial, authoritarian, or
ultranationalist actor.

## Adding or changing a treatment

Before changing the palette:

1. inspect the corresponding Dynamic SPD content and answer “what did they
   do?”;
2. establish the Iran-specific historical basis and precise source locator;
3. explain whether the treatment represents an official symbol, a familiar
   association, or an editorial analogy;
4. update both `web/game.css` and `web/timeline.css`;
5. update `scripts/build-timeline.js` if the primer should apply the term
   automatically;
6. add regression coverage, including disabled-color behavior; and
7. record the decision under `docs/changelog/`.

Major visual-semantic changes should be planned before content is converted
piecemeal.
