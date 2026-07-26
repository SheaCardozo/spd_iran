# The Last Majles: Iran, 1949–1953

## Historical simulation design and research specification

**Document status:** pre-production proposal  
**Intended engine:** the repository's Dendry-based narrative simulator  
**Campaign span:** October 1949 to August 1953, with a short prologue and conditional epilogues  
**Recommended player role:** the collective leadership of the National Front  
**Historical priority:** very high; uncertainty and disagreement are to be represented, not silently resolved

---

## Executive decision

Iran between 1949 and 1953 is an excellent setting for this style of political simulation, but it cannot be made accurate by replacing German parties and names in the existing model. Iran had a constitution, elections, a parliament, cabinets, political parties, a press, and mass political mobilization. It did **not** have a stable national party system, clean nationwide vote shares, a cabinet securely responsible to parliament, or a state whose coercive institutions answered consistently to the elected government.

The game should therefore be about **building and maintaining constitutional power in a divided sovereignty**. The player leads the National Front as a coalition, first in opposition and then, potentially, in government. Oil nationalization is the central policy struggle, but the deeper problem is whether popular sovereignty can be made durable when:

- the Shah and court retain contested constitutional powers and informal patronage;
- the Majles and Senate are shaped by local notables, landowners, electoral interference, and weak party discipline;
- the army is formally national but institutionally tied to the monarch and penetrated by rival networks;
- the National Front contains liberal constitutionalists, secular nationalists, social democrats, bazaar allies, religious-nationalist networks, and ambitious defectors;
- the Tudeh Party possesses real urban organization but is excluded, repressed, and tied politically to the Soviet camp;
- the British government and Anglo-Iranian Oil Company can impose severe economic and diplomatic pressure;
- the United States moves from mediation and limited support for Iranian nationalism toward covert regime change;
- organized crowds, newspapers, mosques, guilds, officers, and covert money can change the political situation faster than formal institutions can.

The campaign begins with the October 1949 palace protest against manipulation of elections to the Sixteenth Majles, the episode from which the National Front emerged. A short prologue covers the February 1949 attempt on the Shah, martial law, the banning of the Tudeh Party, preparations to constitute the Senate, and constitutional changes strengthening royal dissolution powers. The campaign normally ends in August 1953. When a constitutional settlement or survival path requires more time, an epilogue can project consequences into 1954 rather than pretending that the crisis was permanently settled on 20 August.

The design's thesis should be posed as a question, not supplied as an answer:

> Can national sovereignty be won without destroying the plural institutions and coalitions needed to make it democratic—and can constitutional politics survive when domestic rivals and foreign powers are willing to operate outside it?

The game must not reduce the coup to a single CIA button, but it must be equally firm that the British-designed and American-backed covert operation is a documented fact. Domestic agency, institutional weakness, and coalition fracture explain how intervention could work; they do not erase the intervention.

---

## 1. Design mandate

### 1.1 Player fantasy

The player is not an omniscient Mohammad Mossadegh and is not “Iran.” The player represents the **National Front leadership and its coordinating circle**. This creates three useful changes over a conventional head-of-government simulator:

1. The campaign can begin before Mossadegh becomes prime minister.
2. Internal allies have independent interests and may leave, split, obstruct, or act without permission.
3. Losing office peacefully can be a democratic success, while retaining office through repression or constitutional manipulation can be a political failure.

Mossadegh is the indispensable central character and, once prime minister, the player's main executive instrument. He is not a puppet. Some choices should be framed as advice, persuasion, coalition bargaining, or acceptance of a decision he has already made.

### 1.2 Design pillars

1. **Divided sovereignty.** Formal office never gives automatic control of the army, court, streets, Majles, Senate, oil installations, or provincial administration.
2. **Coalitions are organizations, not colored vote blocs.** An endorsement from Kashani, a bazaar closure, an Iran Party newspaper, and a Tudeh-led strike are different capabilities with different risks.
3. **Oil proposals have terms.** Ownership, operational control, marketing, compensation, interim finance, and legal recognition must be modeled separately.
4. **The economy has balance sheets and lags.** Oil production, oil exports, foreign exchange, state revenue, imports, prices, employment, and payroll are related but not interchangeable.
5. **Covert action is a network.** The coup is produced by authorization, money, propaganda, royal decrees, officers, police, street brokers, communications, and timing—not a visible progress meter.
6. **Knowledge is situated.** The player receives reports of differing reliability. Archival truth is reserved for the research overlay and retrospective ending, not handed to the historical actors in real time.
7. **Constitutional means matter.** The score evaluates how an outcome was reached, not merely whether oil remained nationalized or Mossadegh remained in office.

### 1.3 Explicit non-goals

- Do not simulate Iran as a Western European mass-party parliament.
- Do not assign every citizen to one mutually exclusive “class.”
- Do not treat “the clergy,” “the bazaar,” “the army,” or “the street” as unified actors.
- Do not turn the Tudeh Party into either a harmless liberal party or an inevitable Soviet takeover.
- Do not make the Shah a powerless ceremonial figure before 1953 or an absolute ruler throughout the whole period.
- Do not make every compromise historically possible merely because two numerical sliders meet.
- Do not imply that the player could know the full coup plan, the exact loyalty of every officer, or the provenance of every crowd.
- Do not use invented statistics with the presentation and precision of historical data.

### 1.4 Comparator and boundary: this is not *Social Democracy: Petrograd 1917*

*Social Democracy: Petrograd 1917* is an important comparator because it also uses DendryNexus to represent a weak provisional state, divided socialist organizations, mass unrest, rival claims to legitimacy, military disintegration, elections, and coups. It is a compact party-political crisis game, however, and its design goals are different from this project's goals. This comparison is based on the released game's [official page](https://red-autumn.itch.io/petrograd-1917) and the public [source repository](https://github.com/aucchen/petrograd_1917), inspected on 24 July 2026.

The inspected version begins in March 1917, advances by weeks, permits the player to choose the Mensheviks, Socialist-Revolutionaries, Kadets, or—after unlocking them—the Bolsheviks, and organizes actions into party, Provisional Government, and Petrograd Soviet card decks. Its source contains `current_player`, `n_players`, and player-to-party assignments as multiplayer scaffolding, although the local and online multiplayer menu options remain disabled and labeled `TODO` in the current [`root.scene.dry`](https://github.com/aucchen/petrograd_1917/blob/main/source/scenes/root.scene.dry). The Iran game should not inherit that anticipated turn-passing architecture.

| Dimension | *Petrograd 1917* | Required Iran design |
|---|---|---|
| Campaign purpose | Compact replayable crisis among competing parties | Long-form institutional and historical simulation |
| Player identity | One of four broadly symmetric playable parties | National Front coordinating leadership only |
| Time | Weekly turns over the revolutionary crisis | Monthly political time, weekly acute crises, daily August endgame |
| Main interaction | Draw and play from party, government, or Soviet decks | Read reports, deliberate, assign people, negotiate, and maintain multi-turn operations |
| Political information | Centralized status access to party resources, qualitative dissent/relationships, precise Soviet shares, and macroeconomic figures | Reports with provenance, confidence, delay, bias, and deliberately incomplete knowledge |
| Social support | National and Soviet support calculated by normalizing class-to-party values | Overlapping organizations and constituency-specific networks that do not sum into a clean national vote |
| Institutions | Parties access mirrored action categories; government and Soviet are shared action spaces | Every institution has a different legal relationship to the player and can refuse, delay, reinterpret, or leak an instruction |
| Elections | A national demographic algorithm produces vote shares and approximately proportional seats | Named constituencies, candidates, local notables, officials, interference, turnout, and disputed results |
| Coup/revolution | Thresholds, preparation values, and aggregated armed-strength comparisons resolve crises | A concealed network of specific officers, police nodes, street brokers, communications, royal action, and foreign support |
| Ending | Usually reaches the Constituent Assembly, revolution, coup, or military defeat and summarizes remaining conditions | Evaluates a four-year record and the constitutional, sovereign, social, and coercive legacy of the outcome |
| Multiplayer | Source contains multiplayer scaffolding and party symmetry, though the inspected public implementation disables it | Explicitly single-player; no hot-seat, network, or PvP balancing requirement |

The distinction is not simply “Iran is longer.” It changes the underlying model.

#### Binding differentiation rules

1. **Single-player only.** Do not budget for local or online multiplayer. No system should be simplified or made symmetric for hypothetical PvP fairness.
2. **No faction-selection screen.** The Shah, Tudeh Party, Fada'iyan-e Islam, Zahedi network, AIOC, Britain, and United States are autonomous actors, not alternate campaigns using the same actions with different modifiers.
3. **No mirrored party decks.** The National Front is not one colored party among equivalent colored parties. Its factions supply different newspapers, professional expertise, mosque or bazaar contacts, deputies, and organizers.
4. **No one-card-per-turn rhythm.** A turn should resemble a political office: review dossiers, hear contradictory advice, select priorities, delegate assignments, and then receive uneven results. Several ongoing projects persist between turns even when the player can initiate only a small number of new commitments.
5. **No omniscient status board.** The player may know the treasury's recorded balance while possessing only an estimate of a deputy's allegiance or an uncorroborated warning about an officer. Exact hidden-state values belong in testing tools, not the normal interface.
6. **No national popularity race.** There is no single support total whose maximization wins the campaign. A Tehran crowd, a Majles majority, oil-worker cooperation, rural administrative reach, and legitimacy abroad are not convertible units.
7. **No scalar crisis preparation.** Oil agreement, coup, republican transition, military control, and coalition rupture each require compatible components. A failed first coup can leave people, money, orders, and communications intact.
8. **No terminal election as democratic victory.** Holding an election or referendum does not end the story. The simulation must examine the institutions that produce it and whether its result can govern.
9. **No assumption that taking office conveys state control.** Cabinet participation should not simply unlock a government deck. Access to a ministry supplies particular records, appointments, and legal authorities while creating responsibility for failures the player may still be unable to prevent.
10. **No short-session density target.** The design target is approximately six to ten hours for a first complete campaign, with faster repeat runs and optional research reading. Content should be cut by act for an MVP, not compressed into a one-hour race through 1949–53.

#### What can still be learned from it

The comparison does identify techniques worth adapting: institution-specific action spaces, memorable advisers, internal factions that can split, the political cost of inaction, and a faster time scale during acute crises. *Petrograd* also shows that Dendry can hold a surprisingly dense political model. The Iran project should use those as interface and pacing lessons without copying its symmetric party structure, visible quantitative state, card-loop primacy, or terminal race.

---

## 2. Historical frame and central questions

### 2.1 Why begin in 1949?

Starting with Mossadegh's premiership in April 1951 would make oil nationalization look like a sudden personal project and conceal the constitutional crisis that made it possible. The events of 1949 establish the campaign's institutional grammar:

- On 4 February 1949, an attempt was made on the Shah's life.
- Martial law followed, the Tudeh Party was banned, and political space narrowed.
- A constituent assembly amended the constitution, including a new royal power to dissolve the Majles under Article 48.
- The constitutional changes enabled the long-dormant Senate to be constituted; it first convened in 1950, with half of its members appointed by the Shah.
- In October, opposition politicians and supporters protested electoral manipulation at the royal palace. The coalition that became the National Front emerged from this campaign for genuinely representative elections.

These events connect electoral integrity, royal power, anti-communism, and the creation of the National Front before oil dominates play. The authoritative baseline should be built from the contemporary diplomatic record and constitutional scholarship, especially [P2], [R1], and [R2].

### 2.2 What was constitutional government in practice?

The 1906–07 constitutional order was neither a sham nor a settled parliamentary democracy. The Majles mattered: it approved laws, brought down cabinets, served as a platform for opposition, and had to be persuaded or manipulated. The Shah appointed the prime minister, normally following an indication or vote of inclination in the Majles, and possessed powers whose extent remained contested. The Senate, court, army, cabinet, local officials, landowners, tribal leaders, and foreign legations all affected what a government could do.

The game must therefore avoid two retrospective myths:

- Mossadegh was not directly elected prime minister by a national popular vote.
- The Shah was not “installed” in 1953; he had reigned since 1941. The coup restored him from flight and transformed the balance of power in favor of a more authoritarian monarchy.

### 2.3 The campaign's historical questions

Every major system should illuminate at least one of these questions:

1. Could a weak constitutional state take control of an industry operated by a vastly more powerful foreign concessionaire?
2. Was an economically viable oil settlement compatible with effective Iranian control and recognition of nationalization?
3. Could the National Front institutionalize its popularity before its cross-ideological coalition fractured?
4. Could reform reach rural and working people without alienating property holders and notables on whom parliamentary power depended?
5. Could a civilian cabinet gain lawful control of the armed forces without producing a royalist counter-coalition?
6. Did emergency powers protect constitutional government or teach it to bypass plural institutions?
7. How did British and American decision-makers turn Iranian instability and fear of communism into a case for covert intervention?
8. Why did the failed coup attempt of 15–16 August not end the operation or secure the government?

---

## 3. Historical thesis and playable historiography

The simulation should not bake in one monocausal interpretation. It should make four major explanatory traditions testable while weighting documented evidence appropriately.

### 3.1 Intervention and imperial political economy

This interpretation emphasizes the AIOC's unequal concessionary position, Britain's refusal to accept effective Iranian control, the oil boycott and legal pressure, British covert action, and the eventual American decision to support TPAJAX. Ervand Abrahamian's recent oil study is the strongest broad statement of this approach [S3]. The declassified American record establishes high-level authorization, planning, propaganda and political action, contact with Iranian participants, royal decrees, and operational support [P1, P8, P9]. The game should treat those as facts, not as optional theories.

**What the game tests:** whether nationalization could survive British pressure without American support; whether a settlement could recognize actual control rather than nominal ownership; how much the coup network could achieve without domestic collaborators.

### 3.2 Institutional weakness and coalition fragmentation

Fakhreddin Azimi places the crisis in the longer struggle to establish democratic authority amid fragile parties, court intervention, patronage, and weak constitutional conventions [S1, S10]. Homa Katouzian similarly stresses Iran's unstable political order and the conflict surrounding Mossadegh [S6]. In this view, foreign power was decisive partly because Iranian constitutional and party institutions could not reliably aggregate or transfer authority.

**What the game tests:** whether the National Front can become an organization rather than a momentary alliance; whether electoral reform and civilian control can be achieved without relying on plebiscitary shortcuts; whether a lawful succession from Mossadegh is possible.

### 3.3 Cold War security, the Tudeh Party, and perceptions

The Tudeh Party was a substantial communist organization with trade-union, student, press, and clandestine military connections. It was also illegal after 1949, constrained by state repression, internally shaped by the Soviet relationship, and politically hostile to the National Front for much of the early period. Mark Gasiorowski and other scholars examine both its real capabilities and the way Western fears of communist advance affected the coup decision [S4, R7, S8, S11].

**What the game tests:** whether repression increases communist clandestinity; whether democratic inclusion or tactical coordination is feasible; whether exaggerated intelligence and visible street strength alter American policy even when an immediate seizure of power is unlikely.

### 3.4 Mossadegh's choices and domestic agency

Revisionist accounts give greater weight to Mossadegh's strategic errors, the referendum, dissolution of the Majles, religious and bazaar defections, army hostility, and the domestic character of the 19 August movement. Darioush Bayandor presents the clearest challenge to a CIA-centered account [S7], while Ali Rahnema reconstructs the final days from Iranian, British, and American evidence without reducing them to one actor [S5].

**What the game tests:** whether different legal or coalition choices avert isolation; whether a failed first coup can be followed by an internally driven second crisis; which domestic capacities remain after external support is varied.

### 3.5 Editorial position

“Multiple perspectives” must not become false equivalence. The design should follow these rules:

- **Documented:** Britain initiated covert planning; the Eisenhower administration authorized an American role; the operation used propaganda, political contacts, the Shah's farmans, military networks, and money; the first attempt failed; the government fell on 19 August; the United States rapidly extended substantial aid afterward [P1, P8, P9].
- **Historically disputed:** the precise origin, composition, and payment of particular crowds on 19 August; the causal weight of specific clerics; the constitutional validity of dismissal and referendum; the imminence of a Tudeh seizure; the acceptability of successive oil offers; and which actors converted the failed first attempt into the successful second movement.
- **Counterfactual:** what any settlement would have produced, how long a surviving Mossadegh government could have governed, or whether a later democratic transfer would have endured.

The model may vary disputed variables between runs. It may not randomize documented foreign authorization out of the historical scenario. A separate counterfactual toggle may ask what happens without TPAJAX, clearly labeled as such.

---

## 4. Player role, goals, and loss

### 4.1 The player as coalition secretariat

The player's persistent resources are:

- **Coalition cohesion:** willingness of National Front components to coordinate.
- **Constitutional legitimacy:** confidence among deputies, legal elites, press, and politically engaged citizens that the Front obeys rules it asks others to respect.
- **Public mandate:** perceived popular authority, varying by location and constituency.
- **Organizational reach:** offices, newspapers, professional networks, guild contacts, mosque contacts, labor organizers, and provincial allies.
- **Government capacity:** only available when in office; measures administrative compliance rather than abstract state power.
- **Political intelligence:** the quality and diversity of reports available to the leadership.
- **Mossadegh's authority and health:** related but not identical to coalition strength.

These should not all be visible as exact numbers. The normal interface uses qualitative ranges and trends. An accessibility/debug option may expose the underlying values.

### 4.2 Multidimensional success

End-of-campaign evaluation uses four independent legacies:

1. **Sovereignty:** Iranian control over oil policy and freedom from foreign dictation.
2. **Constitutionalism:** functioning representative institutions, lawful succession, judicial and press space, and civilian accountability.
3. **Social capacity:** ability to pay the state, cushion the oil shock, and improve the position of workers, tenants, and ordinary consumers.
4. **Peaceful legitimacy:** avoidance of coup government, political killing, mass repression, civil conflict, and permanent emergency rule.

A player who preserves full nationalization but destroys representative government has not achieved an unqualified victory. A player who negotiates compensation and later loses a fair confidence vote may produce a stronger democratic legacy than one who retains office by closing every institution.

### 4.3 Failure conditions

The campaign can end early through:

- arrest or suppression of the National Front before it gains durable parliamentary protection;
- royal or military government closing meaningful constitutional politics;
- state fiscal failure severe enough to break payroll and administrative compliance;
- violent fragmentation into competing armed centers;
- capture of the Front by one faction and collapse of the coalition;
- foreign-backed overthrow;
- a nominal player “victory” that becomes personal or plebiscitary rule.

Political defeat is not automatically game over. A Front in lawful opposition can continue and may preserve the system.

---

## 5. Campaign structure

The game uses monthly turns for most of the campaign. Certain crises switch to weekly turns. The final August 1953 sequence switches to daily turns because communications, deployments, rumors, and decisions changed within hours.

| Act | Historical span | Central problem | Gameplay shift |
|---|---|---|---|
| Prologue | February–October 1949 | Repression, royal constitutional change, electoral manipulation | Tutorials on institutions, uncertainty, and protest |
| I. The Front | October 1949–March 1951 | Build a coalition and contest the Sixteenth Majles | Opposition organizing, candidate protection, press, parliamentary bargaining |
| II. Nationalization | March–September 1951 | Convert a national demand into control of the oil industry | Cabinet formation, implementation, labor, AIOC withdrawal, negotiations |
| III. Abadan and the World | October 1951–July 1952 | Survive isolation, elections, and fiscal shock | UN/ICJ diplomacy, foreign exchange, Seventeenth Majles, World Bank talks |
| IV. Thirty Tir | July 1952–February 1953 | Convert restored authority into constitutional capacity | Emergency powers, War Ministry, reform, coalition fracture |
| V. Coup Season | March–August 1953 | Govern amid hidden networks and collapsing trust | Counterintelligence, referendum crisis, royal farmans, daily coup sequence |

### 5.1 Prologue: The shot at the university

The player observes, but does not control, the attempt on the Shah on 4 February 1949. The event teaches the difference between fact and interpretation: the attempt occurred; its wider responsibility was politically contested and used to justify repression. The player then advises opposition figures on how to respond to martial law, the Tudeh ban, the constituent assembly, the Senate, and the coming election.

The prologue ends with the palace protest or *bast* in October 1949. The initial playable choice is not “form the National Front: yes/no,” but what kind of Front to form:

- a narrow electoral and constitutional alliance;
- a broader nationalist movement centered on oil;
- a disciplined proto-party;
- a loose coordination committee preserving factional autonomy.

Each structure supplies different early capabilities and later liabilities.

### 5.2 Act I: The Front, October 1949–March 1951

Primary tasks:

- document and publicize interference in elections to the Sixteenth Majles;
- protect candidates and polling observers in selected constituencies;
- negotiate cooperation among Mossadegh, the Iran Party, Baghai, Makki, Kashani's networks, bazaar activists, and independent deputies;
- decide whether and how to approach excluded Tudeh constituencies without making a false coalition;
- respond to the assassination of Court Minister Abdolhossein Hazhir by a member of Fada'iyan-e Islam;
- oppose, amend, or exploit the Gass–Golshayan supplemental oil agreement;
- confront Prime Minister Haj Ali Razmara's opposition to nationalization;
- respond to Razmara's assassination by Khalil Tahmassebi without assigning unproven wider responsibility.

The act ends when the Majles and Senate approve the nationalization principle in March 1951. The player can reach that point with very different coalitions. A movement dependent on personal newspaper campaigns and religious mobilization may pass nationalization quickly but be especially vulnerable to later defections.

### 5.3 Act II: Nationalization, March–September 1951

Historical anchors:

- the nationalization principle passes the Majles on 15 March and the Senate on 20 March;
- the oil commission develops the implementation law;
- Mossadegh becomes prime minister at the end of April after parliamentary support and royal appointment;
- the implementation law takes effect on 1 May;
- Britain brings the dispute to the International Court of Justice;
- the AIOC and British government apply legal, financial, commercial, and naval pressure;
- Harriman and Stokes missions seek a settlement;
- British personnel leave Abadan as the operating crisis culminates.

The key play question is whether a nationalist opposition can become a competent administration. The player must staff the National Iranian Oil Company, manage relations with Iranian oil workers and British technicians, decide how to handle foreign employees, establish accounting and custody, and negotiate without conceding the substance of control.

The UI must never show a single “British compromise” slider. A proposal is a bundle:

| Dimension | Examples of possible terms |
|---|---|
| Legal ownership | explicit recognition, ambiguous formula, or practical arrangement without recognition |
| Operational control | NIOC management, foreign operating organization, neutral management, transitional board |
| Marketing | Iranian sales, former AIOC channels, international purchasing agency, buyer consortium |
| Compensation | assets only, concession rights, lost future profits, arbitration formula, lump sum |
| Interim finance | loan, advance purchase, escrow, aid, no bridge financing |
| Personnel | Iranian authority over technicians, foreign managerial control, phased transfer |
| Duration and review | permanent, fixed term, renewable, subject to arbitration or review |

The Harriman/Stokes and later proposals must be reconstructed as actual historical objects from the diplomatic record, not paraphrased as “reasonable” or “unreasonable” [P1, R3, S3].

### 5.4 Act III: Abadan and the world, October 1951–July 1952

The crisis internationalizes:

- Mossadegh presents Iran's case to the United Nations.
- Elections to the Seventeenth Majles take place amid disputes about interference and are halted after enough deputies have been elected for a quorum.
- The World Bank explores an interim operating arrangement and fails to secure agreement.
- The oil boycott sharply restricts exports and foreign-exchange earnings.
- The ICJ ultimately finds that it lacks jurisdiction in July 1952.
- Mossadegh resigns after the Shah refuses his demand to control the War Ministry; Ahmad Qavam becomes prime minister.
- Mass mobilization on 30 Tir 1331 / 21 July 1952 restores Mossadegh.

The game should treat the Seventeenth Majles election as a constituency process, not a national percentage. The player chooses where to invest scarce monitors, candidates, local alliances, newspaper attention, and legal challenges. Halting the election may prevent further manipulation but also leaves unelected constituencies unrepresented and creates a later legitimacy vulnerability.

Thirty Tir is not generated by one “call supporters” action. Bazaar closures, National Front declarations, Kashani's political network, guilds, Tudeh participation, local grievances, police behavior, and Qavam's threats interact. Mari Nukii's study is useful precisely because it treats bazaar action as possessing its own interests rather than merely obeying a great leader [S12].

### 5.5 Act IV: Thirty Tir, July 1952–February 1953

Mossadegh returns with extraordinary popular authority, the War Ministry portfolio, and expanded legislative powers. This is the campaign's most important false summit. The player appears strongest while the coalition begins to separate.

Core decisions:

- how to restructure appointments and command in the military;
- whether emergency legislative powers are narrow, time-limited, reviewable, and renewed;
- how to proceed with financial, electoral, judicial, and administrative reforms;
- whether land and village measures alter landlord control or merely redistribute some royal-estate proceeds;
- whether to tolerate opposition press and demonstrations;
- how to manage breakaways by Baghai, Makki, Kashani, and other former allies;
- how to interpret growing Tudeh activity;
- whether to accept, modify, or reject the joint Truman–Churchill proposal of August 1952;
- how to respond to British diplomatic rupture in October;
- how to evaluate the final Anglo-American proposal in February 1953;
- how to handle the attempted departure of the Shah and the confrontation of 28 February.

Emergency powers should provide real administrative speed. They should also lower the information carried by parliamentary debate, increase fear among opponents, and make foreign claims of authoritarian drift more plausible. The mechanic is not a morality meter; it changes how the political system processes conflict.

### 5.6 Act V: Coup season, March–August 1953

The final act begins before the player can prove a coup exists. Reports include:

- officer transfers and retirements;
- contact among royalists and opposition deputies;
- newspaper campaigns and planted stories;
- unexplained funds and street organizers;
- the kidnapping and murder of Tehran police chief Mahmoud Afshartus;
- religious and bazaar defections;
- American diplomatic pressure;
- Tudeh warnings, some accurate and some self-serving;
- the Shah's reluctance, contact with intermediaries, and plans to leave;
- the Majles dissolution referendum.

The referendum must be modeled as both a strategic answer to parliamentary obstruction and a profound constitutional risk. Separate voting arrangements for government and opposition and the decision to dissolve the Majles require explicit historical explanation. The game should not announce a definitive legal verdict where scholarship disagrees.

#### The August crisis

If the historical coup network remains viable, the game shifts to daily turns on 14 August.

- **14–15 August:** farmans, couriers, guard deployments, communications, and incomplete warnings.
- **Night of 15–16 August:** Colonel Nematollah Nassiri attempts to deliver the royal decree dismissing Mossadegh; the move fails and Nassiri is arrested.
- **16–18 August:** the Shah flees, first to Baghdad and then Rome. The government must decide what to broadcast, whom to arrest, whether to mobilize supporters, how to control the army, and whether to permit or restrain republican and Tudeh demonstrations.
- **19 August:** autonomous and coordinated royalist crowds, police and military nodes, radio, armored units, government loyalists, and rival street organizations interact district by district.

Failure of the first attempt does **not** set a coup meter to zero. Surviving officers, money, contacts, forged or authentic decrees, press networks, police loyalties, Zahedi's availability, and governmental hesitation remain in play. This is one of the design's most important corrections to conventional event-game logic [P1, P8, P9, S4, S5].

---

## 6. Actor and institution model

### 6.1 The National Front is a coalition

Each component has leaders, organizational channels, objectives, red lines, and a relationship with Mossadegh. The following is a starting roster, not a final prosopography:

| Component | Representative figures | Capabilities | Likely fault lines |
|---|---|---|---|
| Mossadegh's parliamentary circle | Mohammad Mossadegh, close independent deputies | prestige, constitutional argument, parliamentary initiative | personal leadership, health, weak permanent organization |
| Iran Party | Allahyar Saleh, Karim Sanjabi and colleagues | educated cadres, policy expertise, secular nationalist and social-democratic networks | small mass base, tension with religious allies |
| Party of the Iranian Nation | Dariush Forouhar and colleagues | militant nationalism, youth activity | ideological rigidity, competition with other nationalists |
| Toilers Party | Mozzafar Baghai; initially Khalil Maleki and associates | newspaper reach, street and activist contacts | Baghai's break with Mossadegh; Maleki's Third Force split |
| Religious-nationalist network | Ayatollah Abol-Qasem Kashani and political associates | mosque contacts, bazaar relationships, public religious authority | independent ambitions, social conservatism, later opposition |
| Independent nationalist deputies | Hossein Makki, Mozaffar Haerizadeh and others | parliamentary speeches, oil campaigning, personal followings | defection, patronage, rivalry |
| Bazaar and guild allies | merchants, guild heads, artisans, market activists | closures, finance, neighborhood coordination | prices, taxes, disorder, clerical and political divisions |

Fada'iyan-e Islam is **not** a National Front faction. It is an autonomous radical religious organization capable of pressure and assassination, sometimes sharing immediate enemies with nationalist figures [R9]. The game must never collapse it into Kashani's network or into “the clergy.”

Khalil Maleki's Third Force should emerge from a split rather than exist ahistorically from the beginning. Likewise, a later defection should have antecedents: frustration, ideological difference, personal rivalry, lost access, press escalation, and outside contact.

### 6.2 Other political organizations

#### Tudeh Party

Model the Tudeh through separate legal fronts and clandestine capacities:

- industrial labor and the oil region;
- urban unions and professional groups;
- student and youth organization;
- newspapers and front organizations;
- clandestine military contacts;
- relationship to Soviet policy;
- internal assessment of the National Front.

The party initially denounces the National Front as bourgeois and insufficiently anti-imperialist; tactical alignment becomes more plausible after Thirty Tir. It can mobilize beyond the player's control. Repression may reduce open activity while increasing the relative importance of clandestine organization. Rural reach should be limited and specifically researched rather than inferred from Marxist rhetoric [R7, S11].

#### Royalists and conservative politicians

This is a field rather than a party:

- the Shah and court;
- royal household figures and intermediaries;
- conservative deputies and senators;
- former premiers such as Qavam;
- Fazlollah Zahedi and associated officers/politicians;
- landowners, provincial notables, and patronage brokers;
- pro-British contacts;
- later American-backed covert contacts.

Their coordination should be contingent. A conservative deputy who opposes Mossadegh is not automatically enrolled in a coup.

#### Religious authorities

At minimum distinguish:

- Kashani's explicitly political network;
- Grand Ayatollah Hossein Borujerdi and a more quietist clerical center;
- local clerics with bazaar, neighborhood, or provincial relationships;
- Fada'iyan-e Islam;
- religious supporters of the National Front who do not follow Kashani automatically.

“Clerical support” as a single national statistic is prohibited.

### 6.3 State institutions

| Institution | What the game tracks |
|---|---|
| Majles | individual or grouped deputies, constituency, factional inclination, attendance, committee role, patronage, susceptibility to pressure |
| Senate | appointed/elected origin, court relationship, legislative delay or approval |
| Shah and court | formal decisions, confidence in government, fear, appetite for intervention, competing intermediaries |
| Cabinet | ministerial competence, loyalty, parliamentary vulnerability, administrative reach |
| Army | command appointments, unit location, royal tie, professional interest, personal networks, order compliance |
| Police and gendarmerie | separate chains of command, urban/rural reach, leadership loyalty |
| Judiciary | legality, prosecutions, independence, elite confidence |
| Provincial administration | governors, election officials, notables, security forces |
| Plan Organization and finance apparatus | budget information, development commitments, access to foreign exchange |
| NIOC | technical staff, production, storage, worker relations, contracting, marketing capacity |

The army must not be represented by a single loyalty number. The final crisis requires named or grouped nodes: General Staff, Tehran garrison, Imperial Guard, armored units, police stations, radio security, and selected provincial commands. The player rarely knows their true state.

### 6.4 Foreign actors

- **Britain:** distinguish the Attlee and Churchill governments, Foreign Office, embassy, MI6, Treasury, Admiralty, and AIOC. They often cooperate but do not possess identical preferences.
- **United States:** distinguish the Truman and Eisenhower administrations, State Department, embassy, CIA, oil-policy concerns, and congressional/public considerations. The transition in January 1953 is a major phase change, not a cosmetic leader swap.
- **Soviet Union:** diplomatic and geopolitical actor whose interests should not be treated as identical to every Tudeh action.
- **International bodies:** United Nations Security Council, International Court of Justice, and World Bank have distinct mandates and cannot simply impose settlements.
- **Oil market actors:** tanker owners, potential buyers, major oil companies, refiners, and courts in third countries make the boycott effective or porous.

Foreign actors take turns privately. The player sees diplomatic messages, public statements, market outcomes, leaks, and intelligence—not their decision trees.

---

## 7. Population, organization, and geography

### 7.1 Overlapping constituencies

The existing game's additive class-to-party vote calculation should be replaced. One person may simultaneously be a bazaar artisan, a mosque attendee, a tenant's relative, a nationalist newspaper reader, and a guild participant. The game therefore tracks constituencies as overlapping networks rather than as population slices that sum neatly to 100 percent.

Suggested constituencies:

- Tehran professionals, civil servants, lawyers, teachers, and students;
- bazaar merchants, guild leaders, artisans, and shopkeepers;
- industrial and oil workers;
- state employees and pensioners dependent on payroll;
- military officers, noncommissioned officers, conscripts, and veterans;
- provincial urban populations;
- rural peasants, sharecroppers, tenants, and village headmen;
- landlords, tribal leaders, and provincial notables;
- clerical students, mosque congregations, and religious charitable networks;
- women activists in party, professional, charitable, and press networks.

Each network has:

- **awareness** of the current issue;
- **alignment** among several actors, not just the player;
- **organization** capable of turning sympathy into action;
- **mobilization cost** and fatigue;
- **repression vulnerability**;
- **autonomy**, determining whether it follows elite calls or acts for its own interests;
- **local presence**, because national rhetoric does not imply provincial reach.

### 7.2 Geographic arenas

For a feasible first release:

1. **Tehran:** Majles, court, ministries, universities, central bazaar, press, radio, garrison, and decisive street politics.
2. **Khuzestan and Abadan:** oil installations, labor, British personnel, NIOC capacity, military and tribal context.
3. **Azerbaijan and Tabriz:** memory of the 1945–46 crisis, Tudeh/Firqah legacies, provincial politics.
4. **Isfahan:** industrial labor, commerce, religious and notable networks.
5. **Fars and the Qashqai sphere:** tribal, land, and central-state relationships.
6. **Caspian/northern provinces:** agriculture, Soviet proximity, and regional organization.

Other constituencies can remain abstracted but must not be treated as socially identical.

### 7.3 Elections

Elections are resolved constituency by constituency using:

- candidate reputation and local roots;
- support from notables, landlords, guilds, clerics, tribal leaders, and parties;
- governor and Interior Ministry behavior;
- security pressure;
- control of registration, polling, and count;
- press reach and observers;
- turnout/mobilization where evidence supports it;
- litigation, boycott, or nullification.

The result is a Majles ledger, not a fictional national vote share. The historical mode supplies documented winners and disputed contests as anchors while allowing player interventions at the margins [R2].

Women did not possess national parliamentary suffrage during this period, but women were politically active in organizations, demonstrations, journalism, professional life, suffrage campaigns, and the Tudeh sphere. They must appear as actors without anachronistically adding them to the electorate. Mossadegh's November 1952 municipal-election bill implied or extended women's participation in principle, while the proposed parliamentary election law did not; this distinction should become a sourced political event rather than a generic reform button [S13].

---

## 8. Core simulation systems

### 8.1 Turn loop

Each monthly turn has six stages:

1. **Briefing:** cabinet papers, coalition reports, press, economic accounts, diplomatic traffic, and rumors.
2. **Deliberation:** advisers interpret the same evidence differently and disclose their confidence.
3. **Allocation:** two major political actions plus limited organizational, administrative, or diplomatic assignments.
4. **External moves:** court, Majles actors, opposition, Tudeh, foreign governments, market actors, and covert networks act.
5. **Consequences:** immediate outcomes and delayed effects are applied.
6. **Public record:** newspapers, speeches, parliamentary proceedings, and public events reveal only part of what happened.

Weekly and daily crisis turns compress the same structure. They reduce the number of actions and increase communications delays and order-compliance checks.

### 8.2 Coalition system

Every faction has:

- policy preferences;
- organizational assets;
- public commitments;
- private red lines;
- trust in Mossadegh;
- trust in other factions;
- appetite for office and recognition;
- tolerance for Tudeh cooperation, royal compromise, and emergency power;
- probability of independent action.

The player cannot maximize cohesion merely by distributing offices. Concessions can undermine policy credibility, and public denunciations create commitments that are costly to reverse.

Coalition fracture is path-dependent. Baghai's later opposition, Kashani's break, or Makki's defection should be produced by accumulated choices plus historical pressures, not triggered automatically on a date. Historical mode strongly weights the documented path while preserving agency.

### 8.3 Parliamentary and constitutional system

The Majles engine tracks:

- confidence in the cabinet;
- votes on named bills;
- oil commission work;
- emergency powers and renewal;
- quorum and attendance;
- obstruction, interpellation, and immunity;
- legitimacy of election and dissolution;
- relationship to the Senate and Shah.

Legal actions have both an immediate **formal effect** and a longer **constitutional precedent**. A royal dissolution, government referendum, emergency decree, manipulated election, or politically convenient arrest changes how later actors interpret legitimate conduct.

### 8.4 Oil implementation and negotiation

Oil has three connected layers:

1. **Physical system:** wells, refinery, storage, technicians, maintenance, shipping.
2. **Commercial system:** buyers, tankers, insurance, pricing, legal title, refining and distribution networks.
3. **Political settlement:** sovereignty, compensation, management, duration, and recognition.

Nationalization transfers legal claims more easily than it creates customers or operating expertise. Conversely, low exports should not mean zero domestic production or instant state collapse. The game stores every major historical proposal in structured data and lets the research overlay compare the original terms and each side's objections.

No offer is assigned an authorial “fairness” score. Advisers assess it using declared criteria. A proposal may be financially favorable but politically ambiguous on control, or recognize nationalization while defining compensation in a way Iran fears could absorb future revenues.

### 8.5 Economy

Minimum state variables:

- oil production;
- oil exports and realized receipts;
- non-oil exports;
- foreign-exchange reserves by usable category;
- sterling access and convertibility restrictions;
- import licensing and import capacity;
- customs and domestic tax receipts;
- budget cash and deficit;
- note issuance/monetary expansion;
- government payroll reliability;
- urban employment, especially in Khuzestan;
- cost-of-living index or a carefully labeled proxy;
- selected essential-goods availability;
- development commitments and Plan Organization capacity;
- harvest/rural condition where sourced.

Policies include import compression, exchange-rate changes, export promotion, tax collection, bond drives, spending cuts, note issuance, arrears, social relief, and pursuit of loans or oil advances. Effects are lagged and distributional.

Patrick Clawson and Cyrus Sassanpour show that Iran endured an extraordinary foreign-exchange shock and adjusted through trade and financial measures; the period should not be narrated as an uninterrupted mechanical countdown to bankruptcy [S9]. At the same time, adaptation did not eliminate fiscal stress, lost oil employment, import constraints, or the political importance of reserves. The game should present ranges and source notes when historical economic series conflict.

The existing repository's Phillips-curve-like macro loop and fixed monthly modifiers should be replaced, not adapted.

### 8.6 Public order and mobilization

Crowds are events created by organizations and local conditions. A mobilization has:

- sponsors and channels;
- stated demand;
- assembly points and route;
- expected and actual composition;
- discipline;
- counter-mobilization;
- police and army posture;
- risk of infiltration, looting, or lethal escalation;
- political interpretation afterward.

A bazaar closure, oil strike, student march, mosque gathering, Tudeh procession, royalist crowd, and state-organized demonstration use different mechanics. Numbers reported by organizers, embassies, police, and newspapers should disagree.

Political violence requires named agency where known. Razmara was killed by Khalil Tahmassebi of Fada'iyan-e Islam; claims about wider authorization remain contested. Afshartus's kidnapping and murder likewise requires a claim map rather than a convenient omniscient scene.

### 8.7 Military and security

Civilian control is built through:

- ministerial authority;
- appointments and retirements;
- payroll and professional confidence;
- personal relationships;
- intelligence;
- command clarity;
- legal legitimacy;
- unit placement;
- communications.

Removing royalist officers may reduce one risk while creating a connected body of aggrieved, available conspirators. Rapid politicized promotion can weaken professionalism and make reports less trustworthy. Orders during a crisis are tested at each command node.

### 8.8 Covert-action network

The internal state may include:

- British and American authorization;
- joint planning and liaison;
- ability to communicate after British diplomatic expulsion;
- Shah commitment and valid farmans;
- availability and location of Zahedi;
- officer recruitment by node;
- police and gendarmerie contacts;
- parliamentary and press contacts;
- religious and bazaar intermediaries;
- street brokers and paid organizers;
- propaganda placement;
- cash and secure communications;
- operational security;
- fallback plans and autonomous initiative.

The player does not see this list. Instead, intelligence reports have provenance:

- direct government observation;
- police report;
- army source;
- Tudeh warning;
- friendly embassy assessment;
- hostile press allegation;
- intercepted or captured document;
- retrospective archival note available only after the campaign.

Each has confidence, age, possible motive, and corroboration. Accurate warnings can be discounted; planted warnings can provoke self-defeating repression.

### 8.9 International pressure and perception

Britain and the United States maintain separate policy debates. Their assessments include:

- chance of an oil settlement;
- confidence in Mossadegh;
- fear of instability or communist gain;
- cost of supporting Britain;
- risk to other concessions;
- domestic alliance and oil-company concerns;
- assessment of alternative Iranian governments;
- legal and reputational risk of overt or covert action.

Iranian actions affect these assessments, but they do not control them. The Eisenhower transition changes personnel, assumptions, and the availability of covert options. It must not make the coup inevitable on inauguration day.

### 8.10 Reform and social policy

Reform areas:

- electoral administration;
- civil service and corruption;
- judicial independence;
- municipal authority;
- taxation and customs;
- military accountability;
- village councils and landlord–tenant relations;
- labor rights and oil-worker relief;
- press law;
- women's civic and political rights.

Every reform needs a constituency, administrator, cost, legal vehicle, and opponent. A text decree without implementation capacity produces expectation and resistance without full benefit.

---

## 9. Information design and research overlay

### 9.1 Three layers of truth

Every consequential scene maintains:

1. **Actor knowledge:** what the player could plausibly know at that moment.
2. **Simulation state:** the hidden variables used to resolve events.
3. **Historical annotation:** what primary sources and scholarship later establish or dispute.

The historical annotation is never used to give the player anachronistic certainty during normal play.

### 9.2 Claim labels

Every historical assertion in content data receives one label:

- `documented`: supported by converging primary evidence or a primary institutional record;
- `reported`: a contemporary actor claimed it, but independent verification is incomplete;
- `disputed`: reputable accounts materially disagree;
- `inferred`: design inference connecting documented facts;
- `counterfactual`: a deliberately invented branch;
- `composite`: a disclosed synthesis used only when production constraints make a named historical character impractical.

No composite should be used for a decision-maker whose identity materially changes the history.

### 9.3 Research overlay

An optional panel accessible from each major event shows:

- a 100–200 word historical note;
- Gregorian and Solar Hijri date where significant;
- the event's claim labels;
- primary sources;
- major scholarly disagreements;
- exactly what the simulation changed;
- a “why this happened in your run” explanation that distinguishes game causality from historical causality.

This is the game's central educational feature. It also protects the main narrative from citation clutter.

---

## 10. Event architecture

### 10.1 Anchor policy

Historical mode divides events into:

- **fixed anchors:** events outside plausible player control, unless an earlier large counterfactual has made them impossible;
- **pressure anchors:** strongly likely events whose timing or details may change;
- **contingent outcomes:** results the player can materially alter;
- **interpretive scenes:** competing reports and retrospective evaluations.

Examples:

| Event | Date | Classification | Elasticity |
|---|---|---|---|
| Attempt on Shah | 4 Feb. 1949 | Fixed prologue anchor | responsibility remains disputed |
| Palace electoral protest and Front formation | Oct. 1949 | Campaign anchor | coalition form is playable |
| Hazhir assassination | 4 Nov. 1949 | Fixed anchor | political response is playable |
| Razmara assassination | 7 Mar. 1951 | Strong anchor | preventable only after a very large divergence |
| Nationalization principle | 15/20 Mar. 1951 | Pressure anchor | timing, margin, coalition, wording can vary |
| Mossadegh premiership | 28–29 Apr. 1951 | Pressure anchor | Majles support, Senate action, and royal appointment can fail or occur under different conditions |
| Implementation law | 1 May 1951 | Contingent details | governance terms and capacity vary |
| ICJ filing and provisional measures | May–July 1951 | External anchor | Iranian strategy varies |
| Abadan evacuation | late Sept.–Oct. 1951 | Pressure anchor | negotiated staffing path can alter it |
| UN appearance | Oct. 1951 | Player choice with strong incentive | speech and diplomacy vary |
| World Bank mission | Feb.–Mar. 1952 | Pressure anchor | proposal response is playable |
| Thirty Tir | 30 Tir 1331 / 21 July 1952 | Contingent crisis | actors, violence, and outcome vary |
| ICJ no-jurisdiction judgment | 22 July 1952 | External anchor if case persists | legal fact fixed |
| UK relations severed | Oct. 1952 | Contingent | may occur earlier, later, or not |
| Afshartus murder | Apr. 1953 | Pressure anchor | network and investigation can vary |
| Majles referendum | Aug. 1953 | Player-dependent | may be avoided or structured differently |
| First coup attempt | 15–16 Aug. 1953 | Network outcome | timing and success vary |
| Fall of government | 19 Aug. 1953 | Historical outcome, not fixed ending | must emerge from surviving capacities |

### 10.2 Content target

For a historically responsible full campaign:

- 45–60 major anchor or branching events;
- 100–140 smaller reports, debates, press items, and constituency events;
- 15–20 recurring advisers and political counterparts;
- 10–15 structured oil proposals and counterproposals;
- 8–10 endings;
- research notes for every major event and character;
- at least one primary and one scholarly source for each disputed high-impact scene.

An MVP should stop at September 1951 rather than build an under-researched coup. Recommended MVP scope: prologue plus Acts I–II, 35–45 total scenes, 10 advisers, the full oil-proposal schema, and two provisional endings.

---

## 11. Character and adviser design

The final roster needs a dedicated prosopographical review. Initial candidates:

- Mohammad Mossadegh — prime minister, coalition symbol, constitutional nationalist;
- Hossein Fatemi — journalist, organizer, foreign minister, increasingly republican voice;
- Allahyar Saleh — Iran Party figure and diplomat;
- Karim Sanjabi — Iran Party organizer and constitutional politician;
- Khalil Maleki — socialist intellectual and later Third Force leader;
- Mozzafar Baghai — activist, newspaper politician, future opponent;
- Hossein Makki — oil campaigner and later defector;
- Ayatollah Abol-Qasem Kashani — independent religious-nationalist power center;
- Dariush Forouhar — nationalist activist;
- Mehdi Bazargan — engineer and NIOC-related technical/administrative perspective;
- Gholam Hossein Sadighi — academic and ministerial perspective;
- General Mahmoud Baharmast and other military interlocutors, subject to detailed role verification;
- Mahmoud Afshartus — police chief whose security role and murder become central;
- Fazlollah Zahedi — former minister, general, and alternative premier;
- Shah Mohammad Reza Pahlavi — monarch and institutional rival, not a normal adviser;
- Loy Henderson — American ambassador and diplomatic counterpart;
- Averell Harriman, Richard Stokes, and World Bank representatives — mission-specific counterparts.

Each character entry must distinguish:

- office and date range;
- public position;
- private position where sourced;
- organizational base;
- relationship network;
- retrospective memoir claims;
- disputed allegations;
- dates and locations.

The player should hear incompatible advice. Advisers must not become authorial mouthpieces who always know the “correct” history.

---

## 12. Endings

1. **Constitutional settlement:** nationalization is recognized in substance, compensation is bounded, oil trade resumes, and the cabinet later submits to a credible Majles.
2. **Fragile constitutional survival:** the coup is defeated and government continues, but oil, fiscal, military, and succession questions remain unresolved. The epilogue evaluates rather than guarantees survival.
3. **Peaceful democratic turnover:** Mossadegh or a successor loses office lawfully; the Front remains organized and competitive; the army and court accept the transfer.
4. **Reformed constitutional monarchy:** a negotiated division of authority makes the Shah reign within enforceable limits, with accountable command and elections.
5. **Legitimate republic:** a republic emerges only through a broadly credible constitutional process. Street destruction of royal symbols alone cannot unlock it.
6. **Historical coup:** royal farmans, covert networks, domestic opponents, officers, police, street forces, and foreign support overthrow the government; Zahedi takes office and the Shah returns.
7. **Plebiscitary nationalist rule:** the player defeats opponents but empties parliament, press, courts, and coalition autonomy of substance.
8. **Military or royal government without the historical coup sequence:** constitutional politics closes through an earlier confrontation.
9. **Tudeh ascendancy or state fracture:** a rare branch requiring much greater communist capacity, governmental collapse, and failed counter-coalitions than the historical baseline. It must not serve as retrospective proof that the coup was necessary.
10. **Foreign intervention and civil conflict:** open coercion or violent fragmentation replaces the covert and constitutional struggle.

Every ending reports the four legacy scores and identifies which causal claims are simulated rather than known.

---

## 13. Historical accuracy protocol

### 13.1 Source hierarchy

Use sources in this order, while recognizing that provenance matters more than category alone:

1. Iranian laws, Majles proceedings, official statistics, party publications, speeches, newspapers, and archives;
2. institutional primary records: FRUS, British Cabinet and Foreign Office files, ICJ, UN, World Bank, and declassified intelligence documents;
3. critical editions and document collections;
4. peer-reviewed scholarship and major academic monographs;
5. specialist reference works such as *Encyclopaedia Iranica*;
6. memoirs and retrospective testimony, always checked against contemporary records;
7. general histories and journalism for orientation only.

The current bibliography is disproportionately Anglophone because of digital accessibility. Before narrative production, the project must add Persian-language primary material, Majles records, period newspapers across political positions, National Front and Tudeh publications, memoirs in critical use, and Iranian scholarship. This is a requirement, not an optional enhancement.

### 13.2 Accuracy red lines

- Separate the March 1951 nationalization principle from the May implementation law.
- Describe Mossadegh's selection through Majles support and royal appointment accurately.
- State that the Shah had reigned since 1941; describe 1953 as restoration and consolidation, not original installation.
- Distinguish Britain, AIOC, MI6, the US State Department, CIA, and the two American administrations.
- State the documented Anglo-American covert role without making every anti-Mossadegh actor a paid foreign agent.
- Do not call the British pressure simply a “blockade” in every context. Specify boycott, sterling restrictions, tanker/insurance pressure, legal action, naval presence, and sanctions as the relevant source supports.
- Do not describe every oil proposal as “50/50.” Record ownership, control, marketing, compensation, and duration.
- Do not represent the economy as instant collapse when exports ceased. Separate production, exports, revenue, reserves, imports, prices, and fiscal stress.
- Do not treat the Tudeh as equivalent to the Soviet state or assume an immediate takeover.
- Do not use “the clergy,” “the bazaar,” “the army,” or “the people” as singular causal agents.
- Attribute political killings at the highest level the evidence permits and label wider allegations as disputed.
- Treat the referendum and royal dismissal as constitutional disputes, not tutorial answers.
- Include rural Iran and landlord/notable power even though decisive narrated events concentrate in Tehran.
- Include women's political activity without inventing parliamentary suffrage.
- Use both 30 Tir 1331 / 21 July 1952 and 28 Mordad 1332 / 19 August 1953 for the two culturally central dates.

### 13.3 Names and transliteration

Use familiar English spellings in the main UI—“Mohammad Mossadegh,” “Majles,” “Tudeh,” “Kashani”—and maintain a searchable authority file containing Persian script, scholarly transliterations, common variants such as Mosaddeq/Musaddiq/Mossadegh, titles, and dates. Search and bibliography tools should resolve all variants.

### 13.4 Numbers

Every historical numeric variable must have:

- unit;
- date or period;
- geographic coverage;
- nominal/real status where relevant;
- source;
- confidence or range;
- transformation used by the simulation.

The interface should say “modeled estimate” when a value is reconstructed. False precision is worse than a qualitative state.

### 13.5 Review gates

1. **Claim audit:** every major scene's facts and quotations traced to sources.
2. **Iran specialist review:** at least one historian of modern Iran reviews chronology and institutions.
3. **Economic review:** the foreign-exchange and fiscal model checked separately.
4. **Persian-language review:** names, newspapers, speeches, dates, and source interpretation.
5. **Coup review:** map every claimed participant and action across at least two independent accounts where possible.
6. **Sensitivity review:** religion, communism, political violence, gender, and foreign intervention checked for stereotypes and teleology.

---

## 14. Technical plan for this repository

This section describes long-term design candidates. It does not authorize
immediate replacement of the working Dynamic SPD structure. Before each item is
implemented, apply the comparison gate in `docs/IMPLEMENTATION.md`: inspect the
corresponding Dynamic SPD implementation, record what it does, retain or adapt
it by default, and plan any major divergence with its system-wide consequences.

### 14.1 Reuse

The existing architecture already provides useful patterns:

- Dendry scene and event structure;
- regular turn processing;
- persistent adviser and assignment presentation;
- conditional scenes and alternate endings;
- institution-specific status and dossier panels;
- a faster crisis-time mode analogous to the current “Rubicon” structure.

The *Petrograd* source confirms that the engine can support separate institutional action spaces, weekly crisis time, internal party factions, military loyalties, and a large event library. This is evidence about engine capacity, not a mandate to inherit its party decks or political equations. Dendry should be treated as the delivery layer for a new Iran model.

### 14.2 Replace or substantially rewrite

- additive demographic-to-vote election algorithm;
- mutually exclusive social classes;
- card-draw or mirrored party-deck structure;
- multiplayer and player-to-party switching scaffolding;
- fixed macroeconomic monthly changes;
- Phillips-curve assumptions;
- unified party control and relation meters;
- visible scalar coup progress;
- exact omniscient faction, popularity, institutional, and foreign-policy information;
- terminal race to an election, coup, or revolutionary threshold;
- any assumption that being head of government means control of coercive institutions.

### 14.3 Proposed content/data layout

```text
source/
  scenes/
    iran/
      prologue/
      act_1_front/
      act_2_nationalization/
      act_3_abadan_world/
      act_4_thirty_tir/
      act_5_coup_season/
      endings/
  systems/
    iran_coalition.scene.dry
    iran_majles.scene.dry
    iran_economy.scene.dry
    iran_oil.scene.dry
    iran_security.scene.dry
    iran_foreign.scene.dry
    iran_research_overlay.scene.dry
research/
  iran_1949_1953/
    bibliography.yml
    claims.yml
    chronology.yml
    people.yml
    institutions.yml
    oil_proposals.yml
    economic_series.yml
    event_sources/
```

Example claim record:

```yaml
id: coup_first_attempt_nassiri_arrest
summary: Colonel Nematollah Nassiri was arrested while delivering a royal
  decree dismissing Mossadegh during the night of 15–16 August 1953.
status: documented
date_gregorian: 1953-08-16
date_solar_hijri: 1332-05-25
sources:
  - P1
  - P8
  - S4
actor_knowledge:
  national_front: rapid
  public: after_government_announcement
notes: Sources differ on precise timing and surrounding orders; preserve ranges.
```

Example oil-proposal record:

```yaml
id: world_bank_interim_1952
date_range: 1952-02/1952-03
recognizes_nationalization: ambiguous
operations: neutral_interim_management
marketing: bank_arranged_sales
compensation: deferred
interim_finance: sales_revenue
iranian_objections: []
british_objections: []
primary_sources:
  - P1
  - P5
research_status: requires_term_by_term_transcription
```

Do not fill objection arrays from memory. They are deliberately empty until researchers transcribe the record.

### 14.4 Milestones

**Milestone 0 — research infrastructure**

- authority files for people, institutions, dates, and names;
- source IDs and claim schema;
- campaign chronology;
- economic series inventory;
- term-by-term oil proposal comparison.

**Milestone 1 — opposition vertical slice**

- October 1949 to March 1951;
- coalition, election, press, and Majles systems;
- 12–15 major scenes;
- research overlay prototype.

**Milestone 2 — government and oil vertical slice**

- March to September 1951;
- NIOC implementation, economic accounts, foreign negotiation;
- proposal comparison interface;
- Abadan outcome.

**Milestone 3 — full constitutional campaign**

- Seventeenth Majles, World Bank, ICJ, Thirty Tir, emergency powers;
- coalition fracture and social reform.

**Milestone 4 — coup network**

- hidden network and intelligence provenance;
- daily August sequence;
- historical and counterfactual validation.

**Milestone 5 — historical review**

- external scholarly review;
- Persian-language source audit;
- balance and sensitivity tests;
- complete public bibliography and event notes.

### 14.5 Validation tests

- Historical-path autoplay reproduces the broad chronology without forcing every disputed detail.
- Removing US authorization sharply reduces but does not mathematically eliminate domestic overthrow risk.
- Removing domestic officer/street networks prevents a CIA “magic button” victory.
- A failed 15–16 August move leaves only historically plausible residual capacities.
- An oil agreement requires compatible terms, not merely sufficient bilateral relations.
- The economy can adjust for a time after lost oil revenue but accumulates realistic distributional and fiscal pressure.
- A lawful loss of office can score better on constitutional legacy than authoritarian survival.
- Tudeh strength responds to organization, repression, and political opportunity rather than a fixed Cold War timer.
- Rural constituencies affect elections and reform despite limited direct scene time.
- Player reports never reveal source certainty unavailable to the historical leadership.

---

## 15. Annotated bibliography

The bibliography is organized by function. “Primary” does not mean impartial: diplomatic, corporate, intelligence, party, and governmental records reflect the institutions that produced them.

This section is a discovery inventory, not evidence that every work has been
accessed or approved for every claim. Current trust decisions are maintained in
`docs/research/BIBLIOGRAPHY.md`, the full inventory audit is in
`docs/research/SOURCE_AUDIT.md`, and respected works awaiting accessible text
are in `docs/research/UNAVAILABLE_SOURCES.md`.

### A. Primary and institutional collections

**[P1] U.S. Department of State, Office of the Historian. [*Foreign Relations of the United States, 1951–1954, Iran, 1951–1954*, second edition (2018)](https://history.state.gov/historicaldocuments/frus1951-54IranEd2).**  
The indispensable American documentary collection for oil diplomacy, policy debate, TPAJAX planning, and the coup. The second edition restores material absent from the original published volume. Use individual documents, dates, senders, recipients, and editorial notes; do not cite “FRUS” generically. Particularly important are the [preface explaining the documentary history](https://history.state.gov/historicaldocuments/frus1951-54IranEd2/preface), [coup-planning documents](https://history.state.gov/historicaldocuments/frus1951-54IranEd2/d158), and [Eisenhower's diary acknowledgment](https://history.state.gov/historicaldocuments/frus1951-54IranEd2/d328). American reporting is evidence for American knowledge and action, not a neutral census of Iranian motives.

**[P2] U.S. Department of State, Office of the Historian. [FRUS 1949, “The Ambassador in Iran (Wiley) to the Secretary of State,” concerning the constituent assembly](https://history.state.gov/historicaldocuments/frus1949v06/d273).**  
Useful contemporary diplomatic evidence on the 1949 constitutional changes and the political atmosphere after the attempt on the Shah. Must be paired with Iranian constitutional sources and [R1].

**[P3] International Court of Justice. [*Anglo-Iranian Oil Co. (United Kingdom v. Iran)*, case page](https://www.icj-cij.org/case/16) and [judgment of 22 July 1952](https://www.icj-cij.org/node/103130).**  
Authoritative for pleadings, provisional measures, and the Court's conclusion that it lacked jurisdiction. The judgment was not an international ruling that nationalization itself was substantively lawful or unlawful; content must preserve that distinction.

**[P4] United Nations. [Security Council meetings and actions, 1951](https://www.un.org/depts/dhl/resguide/scact1951_table_en.html) and [559th meeting record](https://digitallibrary.un.org/record/629249/files/S_PV-559-EN.pdf).**  
Primary record for the international presentation of the dispute and Mossadegh's diplomacy. Speeches are evidence of arguments made, not proof of every factual assertion within them.

**[P5] World Bank Group Archives. [“The World Bank's Role as Mediator in the 1950s”](https://www.worldbank.org/en/archive/history/exhibits/The-World-Banks-Role-as-Mediator-in-the-1950s) and [Iran oil mediation folder list](https://thedocs.worldbank.org/en/doc/40bdc1d8c8ee51b3e095beab411decc8-0240022016/original/Archives-mediation-exhibit-Iran-oil-folder-list-2.pdf).**  
Starting point for reconstructing the 1952 interim-management proposal and each side's objections. Production research should consult the underlying files, not rely only on the exhibit narrative.

**[P6] United Kingdom Cabinet. [Cabinet conclusions, 2 July 1951, CAB 195/9](https://cdn.nationalarchives.gov.uk/documents/cab-195-9-1.pdf).**  
Primary evidence of British cabinet discussion, including consideration of force and the risks surrounding Abadan. Cabinet conclusions show policy deliberation, not necessarily implementation.

**[P7] UK Parliament, Hansard. [“Persian Oil Nationalisation Act (Publication),” 11 June 1951](https://hansard.parliament.uk/Commons/1951-06-11/debates/2d2aff15-233c-4b32-981c-7829c369d475/PersianOilNationalisaTionAct%28Publication%29).**  
Contemporary British parliamentary discussion and an English rendering/context for the Iranian law. Check any quoted legal text against an authoritative Persian version before publication.

**[P8] Central Intelligence Agency internal histories: Donald N. Wilber, [*Overthrow of Premier Mossadeq of Iran: November 1952–August 1953*](https://nsarchive2.gwu.edu/NSAEBB/ciacase/Clandestine%20Service%20History.pdf), March 1954; and Claud H. Corrigan, [*The Battle for Iran*](https://www.cia.gov/readingroom/docs/THE%20BATTLE%20FOR%20IRAN%5B15688467%5D.pdf), written in the mid-1970s.**  
Wilber was a principal operational planner and wrote within months of the coup; Corrigan was a later CIA History Staff author rather than an operation participant. Both are essential for the plan, organization, and the agency's own retrospective account. Both are institutionally interested and incomplete. Compare them with one another, [P1], Iranian evidence, and independent scholarship; never use either alone for disputed Iranian actions.

**[P9] National Security Archive. [“CIA Declassifies More of ‘Zendebad, Shah!’”](https://nsarchive.gwu.edu/briefing-book/iran/2018-02-12/cia-declassifies-more-zendebad-shah-internal-study-1953-iran-coup).**  
Curated access and analysis of declassified CIA internal material. Useful for comparing versions and omissions. The archive's editorial framing should be distinguished from the attached primary documents.

**[P10] Harry S. Truman Presidential Library. [Iran oil crisis research collection entry](https://www.trumanlibrary.gov/node/355893).**  
Guide to Truman-era documentation and mediation context. Use the underlying documents for event claims.

**[P11] Foreign, Commonwealth & Development Office Historians. [“What the Butler saw: Britain and the Abadan Crisis, 1950–51”](https://history.blog.gov.uk/2022/12/07/what-the-butler-saw-britain-and-the-abadan-crisis-1950-51/).**  
Official historical essay directing researchers to British records and the Butler report. Useful orientation to British governmental thinking; not a substitute for the cited files.

**Required Iranian primary-source expansion.**  
Before production, add Majles proceedings for the Sixteenth and Seventeenth Majles; the Persian text of the nationalization and implementation laws; government decrees and budget reports; *Bakhtar-e Emruz*, *Ettela'at*, *Keyhan*, *Mardom*, *Shahed*, and other period press across factions; National Front, Iran Party, Third Force, Kashani, and Tudeh publications; speeches and correspondence of Mossadegh; and Iranian memoir/document collections. Each source must record edition, editor, publication details, page number, and political provenance.

### B. Core scholarly works

**[S1] Fakhreddin Azimi. [*Iran: The Crisis of Democracy, 1941–1953*](https://katalog.ub.uni-heidelberg.de/titel/45114294). London/New York: I.B. Tauris, 1989.**  
The core political and institutional history for this design. Especially valuable for cabinets, parties, elections, parliament, court politics, and the erosion of democratic possibility. It should anchor the coalition and constitutional models.

**[S2] Ervand Abrahamian. [*Iran Between Two Revolutions*](https://www.jstor.org/stable/j.ctv1fkgcnz). Princeton: Princeton University Press, 1982.**  
Foundational social and class history of modern Iran. Use for party organization, Tudeh, labor, social bases, and the longer political background. Some categories and conclusions should be checked against later specialist work.

**[S3] Ervand Abrahamian. [*Oil Crisis in Iran: From Nationalism to Coup d'État*](https://www.cambridge.org/core/books/oil-crisis-in-iran/DA39D7FF328813BAF75C7698D00F5119). Cambridge: Cambridge University Press, 2021.**  
Major recent reinterpretation emphasizing control of oil, imperial political economy, and the inadequacy of describing the dispute as a simple compensation or 50/50 problem. Central to the negotiation model, but should be set against [S4]–[S7].

**[S4] Mark J. Gasiorowski and Malcolm Byrne, eds. [*Mohammad Mosaddeq and the 1953 Coup in Iran*](https://www.jstor.org/stable/j.ctt1j5d815). Syracuse: Syracuse University Press, 2004.**  
Multi-author collection spanning Iranian politics, British and American policy, intelligence, economics, and coup operations. Particularly useful because chapters can be compared rather than treated as a single-author verdict.

**[S5] Ali Rahnema. [*Behind the 1953 Coup in Iran: Thugs, Turncoats, Soldiers, and Spooks*](https://www.cambridge.org/core/books/behind-the-1953-coup-in-iran/70645DFA58568EABC10B12371A6F5C3D). Cambridge: Cambridge University Press, 2015.**
Detailed reconstruction of the actors and events from 15 to 19 August, based on Iranian, British, and American material. Essential for the daily crisis map and for avoiding a coup system that jumps directly from authorization to outcome.

**[S6] Homa Katouzian. [*Musaddiq and the Struggle for Power in Iran*](https://books.google.com/books/about/Musaddiq_and_the_Struggle_for_Power_in_I.html?id=mJfBAAAAIAAJ). London: I.B. Tauris, 1990; local revised paperback edition, 1999 (2009 reprint).**
Influential political interpretation of Mossadegh and Iran's unstable state–society order. Useful for leadership, constitutional behavior, and structural fragility; compare its broader theoretical framing with Azimi and later work.

**[S7] Darioush Bayandor. [*Iran and the CIA: The Fall of Mosaddeq Revisited*](https://obnb.uk/p15385035-iran-and-the-cia-the-fall-of-mosaddeq-revisited). Basingstoke: Palgrave Macmillan, 2010.**  
Revisionist account emphasizing domestic agency and questioning the causal reach of the CIA operation on 19 August. Include as a serious challenge and source of testable claims, not as the neutral default. Every divergence from the declassified operational record requires explicit adjudication.

**[S8] Arash Azizi. [“Communism, Cold War, and the 1953 Coup”](https://doi.org/10.1017/S0020743824000606). *International Journal of Middle East Studies* 56, no. 2 (2024): 295–299.**  
A recent state-of-the-field intervention arguing that the crisis is legible both as an anti-imperial struggle over sovereignty and as a Cold War confrontation shaped by Iranian and transnational communist actors. Useful for avoiding a false choice between those frames; follow its notes to the Gasiorowski, Abrahamian, Painter, and Brew works it compares.

### C. Focused systems research

**[S9] Patrick Clawson and Cyrus Sassanpour. [“Adjustment to a Foreign Exchange Shock: Iran, 1951–1953”](https://doi.org/10.1017/S0020743800031639). *International Journal of Middle East Studies* 19, no. 1 (1987): 1–22.**  
The essential corrective to a simplistic “no oil revenue equals immediate collapse” economy. It documents the scale of the oil and foreign-exchange shock and adjustment through imports, exchange, exports, reserves, and finance. Its aggregate estimates and institutional perspective should be checked against Iranian fiscal series and later work.

**[S10] Fakhreddin Azimi. [“On Shaky Ground: Concerning the Absence or Weakness of Political Parties in Iran”](https://doi.org/10.1080/00210869708701859). *Iranian Studies* 30, nos. 1–2 (1997): 53–75.**  
Directly relevant to the decision not to model this period as a stable party-electoral system. Use for organizational constraints and the relationship between transient coalitions and durable institutions.

**[S11] Siavush Randjbar-Daemi. [“The Tudeh Party of Iran and the Peasant Question, 1941–53”](https://research-repository.st-andrews.ac.uk/handle/10023/24619). *Middle Eastern Studies* 56, no. 6 (2020): 969–987.**  
Peer-reviewed study grounded in party publications and primary material. Essential for giving the Tudeh a researched rural strategy and real limits rather than projecting urban strength uniformly across Iran.

**[S12] Mari Nukii. [“The Bazaaris' Political Role during Mosadeq's Government”](https://doi.org/10.24498/ajames.18.1_159). *Annals of Japan Association for Middle East Studies* 18, no. 1 (2003): 159–185.**  
Valuable reconstruction of bazaar participation in Thirty Tir and an explicit argument for bazaar actors' autonomous interests. Supports a network-based mobilization model rather than a top-down “Kashani called the crowd” event.

**[S13] Firoozeh Kashani-Sabet. [“The Other Fight: Women's Suffrage and Iran's Oil Nationalization”](https://doi.org/10.1017/S0020743824000576). *International Journal of Middle East Studies* 56, no. 2 (2024): 270–279.**  
The key focused source for making women's suffrage and organization part of the campaign rather than a footnote. It connects women's publications and associations, Thirty Tir participation, the 1952 election-law debates, and exclusion from the 1953 referendum to the larger struggles over sovereignty and democracy. Its primary-source references should seed the Persian press research list.

### D. Specialist reference works

These are high-quality starting points, bibliographic guides, and checks on terminology. For major disputed scenes, follow their citations to primary and monographic sources.

**[R1] *Encyclopaedia Iranica*. [“Constitutional Revolution iii. The Constitution”](https://www.iranicaonline.org/articles/constitutional-revolution-iii/).**  
Baseline for the 1906–07 constitutional structure and subsequent amendments.

**[R2] *Encyclopaedia Iranica*. [“Elections”](https://www.iranicaonline.org/articles/elections/).**  
Overview of electoral law and practice, including the Pahlavi period. Crucial for avoiding invented national vote shares.

**[R3] *Encyclopaedia Iranica*. [“Oil Agreements in Iran”](https://www.iranicaonline.org/articles/oil-agreements-in-iran/).**  
Chronology and legal background to concessions, nationalization, and later settlements. Use as an index into agreement texts.

**[R4] *Encyclopaedia Iranica*. [“Economy ix. In the Pahlavi Period”](https://www.iranicaonline.org/articles/economy-ix/).**  
Long-run economic context and bibliography.

**[R5] *Encyclopaedia Iranica*. [“Fiscal System v. Pahlavi Period”](https://www.iranicaonline.org/articles/fiscal-system-v-pahlavi-period/).**  
Background for taxation, budgets, state finance, and development institutions.

**[R6] Mark J. Gasiorowski. *Encyclopaedia Iranica*. [“Coup d'État, 1953”](https://www.iranicaonline.org/articles/coup-detat-1953/).**  
Concise scholarly overview of the coup and major participants. Use for orientation and cross-checking the daily chronology.

**[R7] *Encyclopaedia Iranica*. [“Communism ii. In Persia from 1941 to 1953”](https://www.iranicaonline.org/articles/communism-ii/).**  
Baseline for Tudeh organization, politics, and repression; follow its bibliography for factional and regional detail.

**[R8] *Encyclopaedia Iranica*. [“Kāšāni, Abu'l-Qāsem”](https://www.iranicaonline.org/articles/kasani-abul-qasem/).**  
Biographical and political starting point for Kashani. His relations with the Front and alleged coup role require comparison with primary and specialist sources.

**[R9] *Encyclopaedia Iranica*. [“Fedāʾiān-e Eslām”](https://www.iranicaonline.org/articles/fedaian-e-esla/).**  
Essential for treating Fada'iyan-e Islam as a distinct organization and for sourcing its personnel and actions.

**[R10] *Encyclopaedia Iranica*. [“Chronology of Iranian History, Part 3”](https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/).**  
Chronology check only; major events should cite fuller sources.

**[R11] *Encyclopaedia Iranica*. [“Anglo-Persian Oil Company”](https://doi.org/10.1163/2330-4804_EIRO_COM_5455).**  
Corporate and concession background for the AIOC. Pair with company, Iranian, and British state records.

**[R12] *Encyclopaedia Iranica*. [“Chamber of Commerce, Industries and Mines”](https://www.iranicaonline.org/articles/chamber-of-commerce-industries-and-mines-of-persia-otaq-e-bazargani-wa-sanaye-wa-maaden-e-iran-also-call/).**  
Institutional background for commercial elites. It is not a substitute for focused research on the Tehran bazaar and guild networks.

---

## Appendix A. Minimum chronology for content production

| Date | Event |
|---|---|
| 4 Feb. 1949 | Attempt on Shah; martial law and political repression follow |
| May 1949 | Constituent assembly and constitutional changes, including amended dissolution power |
| 17 July 1949 | Gass–Golshayan Supplemental Agreement signed; submitted to the Majles on 19 July |
| Mid-Oct. 1949 | Palace protest over Sixteenth Majles elections; National Front forms |
| 3–4 Nov. 1949 | Court Minister Abdolhossein Hazhir is shot by Hossein Emami of Fada'iyan-e Islam and dies the following day |
| Feb. 1950 | The newly constituted Senate first convenes |
| 26 June 1950 | Haj Ali Razmara becomes prime minister |
| Dec. 1950 | Razmara withdraws the supplemental agreement bill from the Majles |
| 7 Mar. 1951 | Razmara assassinated |
| 15 and 20 Mar. 1951 | Majles and Senate approve oil nationalization principle |
| 28–29 Apr. 1951 | Majles names Mossadegh; Senate action and royal appointment follow |
| 1 May 1951 | Nationalization implementation law takes effect |
| 26 May 1951 | United Kingdom files ICJ case |
| 5 July 1951 | ICJ indicates provisional measures |
| Summer 1951 | Harriman and Stokes negotiations |
| Late Sept.–Oct. 1951 | Abadan operating crisis and departure of British staff |
| Oct. 1951 | Mossadegh presents Iranian case at the UN |
| Late 1951–early 1952 | Seventeenth Majles elections; process halted after quorum elected |
| Feb.–Mar. 1952 | World Bank mediation mission |
| 25 Apr. 1952 | Seventeenth Majles opens |
| 16 July 1952 | Mossadegh resigns over control of War Ministry; Qavam succeeds |
| 30 Tir 1331 / 21 July 1952 | Mass uprising restores Mossadegh |
| 22 July 1952 | ICJ finds no jurisdiction |
| Aug. 1952 | Joint Truman–Churchill proposal and Iranian response |
| Oct. 1952 | Iran breaks diplomatic relations with Britain |
| Jan. 1953 | Emergency powers extended |
| Feb. 1953 | Final Anglo-American proposal; crisis over Shah's proposed departure |
| Apr. 1953 | Police chief Mahmoud Afshartus kidnapped and murdered |
| Spring–summer 1953 | TPAJAX planning, authorization, political action, and recruitment |
| Early Aug. 1953 | Referendum on dissolving the Seventeenth Majles |
| 15–16 Aug. 1953 | First coup attempt fails; Nassiri arrested; Shah flees |
| 19 Aug. 1953 / 28 Mordad 1332 | Mossadegh government overthrown; Zahedi takes power |
| Sept. 1953 | United States announces major emergency aid |
| 1954 epilogue | Consortium settlement and consolidation of post-coup order |

Dates in the final content database must be verified event by event. The exact sequence of Mossadegh's nomination, Senate action, royal decree, assumption of duties, and cabinet confidence vote should be stored as separate events rather than compressed into one “election.”

---

## Appendix B. Research questions that must remain open until sourced

1. What exact constituency-level evidence is available for the Sixteenth and Seventeenth Majles elections?
2. What did each major oil proposal say, term by term, in its latest formal version?
3. Which NIOC managers and Iranian technicians should be named, and what authority did they exercise at each date?
4. What monthly fiscal, reserve, import, price, employment, and note-issue series can be responsibly reconstructed?
5. How did specific provincial governors, landlords, tribal leaders, and military commands affect elections and crisis politics?
6. How did women participate in each major organization, and what suffrage or municipal proposals were actually introduced?
7. Which Tudeh fronts operated openly after the 1949 ban, and what was the verified extent of its military network before August 1953?
8. What evidence supports each claim about Kashani, Behbahani, bazaar brokers, and paid crowds in August 1953?
9. Which parts of the 19 August movement were directly coordinated by TPAJAX personnel, which were facilitated indirectly, and which were autonomous?
10. What orders did the government issue between 16 and 19 August, through what chains, and where did compliance fail?

These are not holes to conceal with dramatic writing. They are the production research backlog.

---

## Final design principle

The historical path should be difficult to escape for historical reasons, not because the script cheats. A viable alternative requires the player to build capacities that the National Front historically lacked, accept costs it historically resisted, persuade actors it historically lost, and still face foreign powers whose choices are not under Iranian control.

If the finished game works, players will not leave believing that one brilliant oil offer, one more arrest, one larger demonstration, or one better speech could trivially have “solved” Iran. They should understand why the democratic opening was real, why oil sovereignty commanded such support, why the coalition was fragile, why the economy proved both more resilient and more constrained than polemic suggested, and how covert foreign intervention combined with domestic institutions and actors to end the experiment.
