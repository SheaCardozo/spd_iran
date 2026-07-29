# Parliamentary membership and control, 1950–1953

## Purpose

This is the working reconstruction of the Sixteenth Majles, the Seventeenth
Majles, and the First Senate during the oil-nationalization crisis. It is
designed to answer five questions that a modern party-seat chart would
collapse:

1. Who was returned for each constituency or Senate place?
2. Which returns became usable seats after credentials, duplicate returns,
   office-holding, death, resignation, and nonattendance?
3. What was a member's documented political tendency at a particular date?
4. Which caucus, if any, did that member then join?
5. Who attended and voted on the particular question?

The evidence supports increasingly exact membership lists. It does **not**
support projecting every member onto one fixed ideological spectrum for the
whole term. “Landlord,” “royal appointee,” “National Front candidate,”
“Kashani follower,” “government supporter,” and “yes on nationalization” are
different attributes.

Each member classification therefore preserves up to five independent
dimensions:

| Dimension | Example | What it does not prove |
| --- | --- | --- |
| Declared organization | Iran Party, Toilers' Party, Society of Muslim Warriors | Permanent loyalty to a coalition leader |
| Constitutional or ideological tendency | constitutional nationalist, social democrat, clerical nationalist, conservative | Conduct on a particular bill |
| Institutional allegiance | pro-court, pro-government, anti-Pahlavi | A complete political philosophy |
| Dated caucus | National Movement, Freedom, Kashani-associated group | The same membership before or after that date |
| Observed behavior | committee membership, confidence vote, resignation, walkout | Party or ideological identity |

“Unresolved” is itself a usable classification state. It is preferable to
turning a title, clerical status, landholding, Senate appointment, or
constituency into a fictional allegiance.

## Source and confidence rules

The membership baseline is the Iranian parliament's retrospective official
roster, *Asami-ye Namayandegan-e Majles-e Showra-ye Melli ... va
Namayandegan-e Majles-e Sena* (Majles Press, 1977), archived as
[`SUP-051`](AVAILABLE_SOURCES.md#sup-051) through
[`SUP-053`](AVAILABLE_SOURCES.md#sup-053). The period proceedings in
[`SUP-007`](AVAILABLE_SOURCES.md#sup-007) control credentials, attendance,
offices, caucus announcements, and divisions. Ervand Abrahamian's
*Iran Between Two Revolutions*, pp. 250–80, and *Oil Crisis in Iran*,
pp. 79–117, provide the strongest current synthesis of social composition,
political alignments, and changing control. Fakhreddin Azimi's constitutional
histories supply the wider institutional interpretation.

Contemporary US and British reports are used as dated observations, not as
neutral party registers. Their categories were created for diplomatic or
covert-operational purposes, sometimes contain arithmetic errors, and often
describe likely conduct rather than declared affiliation. The monarchist
Mashruteh website is used only to discover or check transcriptions against
the underlying official scans; its editorial narrative is not evidence.

The selected Harvard oral histories in
[`SUP-061`](AVAILABLE_SOURCES.md#sup-061) and Ahmad Zirakzadeh's memoir in
[`SUP-071`](AVAILABLE_SOURCES.md#sup-071) are now locally available, but their
acquisition has not raised any classification below to a higher confidence
grade. A remembered affiliation, meeting, or vote enters this ledger only
after its exact interview or printed-page context is checked and compared
with contemporary chamber and party records. OCR text is a finding aid, not
the citation object.

Confidence labels used below:

- **A — official:** official roster, credential decision, chamber office, or
  recorded division.
- **B — strong synthesis:** named alignment established by specialist
  scholarship from proceedings, party records, and archives.
- **C — dated observer estimate:** contemporary diplomatic or intelligence
  categorization, always retaining its date and institutional bias.
- **D — unresolved:** plausible identification or tendency not yet verified
  to a claim-level source. It must not be rendered as fact.

### Current classification coverage

| Chamber | Complete membership baseline | Entries with some defensible individual political information | What remains unresolved |
| --- | ---: | ---: | --- |
| Sixteenth Majles | 136 authorized places / 131 eventual returns | 22 places | Most members of the aggregate royalist majority, independent group, and southern-conservative network are not named by the current synthesis. |
| Seventeenth Majles | 81 return entries / 80 unique people | 52 people | Twenty-eight returned people still lack an individual classification, while several classified members have only a later rather than opening alignment. |
| First Senate | 60 places, with replacements recorded | 27 places | Thirty-three places remain wholly unresolved; several of the 27 preserve only political background or institutional milieu rather than a personal vote. |

Coverage is not an estimate of faction strength. For example, the Sixteenth
Majles can have a well-supported aggregate royalist majority while most
individual royalists remain unnamed.

### Political priors for unresolved members

Every unresolved member can still receive a deliberately weak, inherited
political “vibe” for simulation and player explanation. The
[`parliamentary political-prior model`](PARLIAMENTARY_VIBE_MODEL.md) assigns
chamber-, appointment-route-, and phase-level language such as
“establishment-leaning notable,” “issue-dependent provincial notable,” or
“royal appointee; loyalty not guaranteed.” These are heuristic defaults, not
new member classifications. They remain in a separate `inherited_prior` field
and never fill an undocumented party, caucus, allegiance, or vote.

## Why the denominators disagree

“How many deputies were in the Seventeenth Majles?” has several correct
answers because the sources count different legal and practical things.

| Count | What is being counted | Consequence |
| ---: | --- | --- |
| 136 | Authorized Majles seats | The constitutional full chamber; 57 or more places were never completed. |
| 81 constituency returns | Entries in the 1977 official period roster | Includes Mozaffar Baghai twice, for Tehran and Kerman. |
| 80 returned individuals | The 81 roster entries with Baghai counted once | A people count, not necessarily the operative chamber. |
| 79 elected or accepted credentials | The denominator most often used by Abrahamian and contemporary analyses | The normal research baseline for the incomplete chamber. The remaining one-person discrepancy with the official roster still needs a session-by-session credential audit. |
| 77 usable members in Abrahamian's opening reconstruction | Seventy-nine minus Ayatollah Kashani, who did not attend, and Hossein Fatemi, barred after accepting the Foreign Ministry | Explains why “returned” was not the same as “available to sit.” |
| 69 in Tehran by April 1953 | Remaining members after deaths, resignations, and travel | The live denominator behind a 46-member debate threshold and 52-member voting threshold. |
| 23 non-resigners after the July resignations | British post-coup retrospective count | The remnant on which coup planners and the later government tried to construct legal continuity. |

The CIA itself was inconsistent. Its April 1953 estimate said the Majles
“numbers 79,” then divided it into 30 alleged Mossadegh loyalists, four
waverers, and **46** potential opponents—an impossible total of 80. The
potential opposition was listed as ten in the Freedom faction, eight Kashani
followers, eighteen other opposition deputies, and ten pro-Shah deputies.
Abrahamian's reconstruction corrects the potential-opposition total to 45 and
describes it as ten royalists, seventeen “free floaters,” eight Kashani
followers, and ten National Front defectors. Both are observer taxonomies,
not official caucus totals
([FRUS, Iran, doc. 192, pp. 531–32](https://history.state.gov/historicaldocuments/frus1951-54Iran/d192);
`MAJ-S3`, p. 100).

TPAJAX planning later used an 80-member model: 52 to open debate, 60 to vote,
and 41 to pass a motion. That arithmetic describes the planners' proposed
legalistic operation, not a clean correction to the official record
([FRUS, Iran, doc. 239](https://history.state.gov/historicaldocuments/frus1951-54Iran/d239)).

## The Sixteenth Majles

The complete constituency and legal-status reconstruction now lives in the
[`Sixteenth Majles ledger`](SIXTEENTH_MAJLES_LEDGER.md). It records all 136
authorized places, 131 completed returns, the five distinct unfilled places,
the Shadlu replacement, later seat losses, the chamber boards, the first
credential waves, and a conservative political classification. This section
explains what those records mean for control.

### Social and political baseline

The retrospective roster eventually records 131 returned places for the
Sixteenth Majles. That is Abrahamian's denominator for the chamber's social
profile, not the number of credentials usable when the term opened in
February 1950. Approximately 85 percent were landlords, wealthy merchants, or
senior civil servants. This is a social profile, not a voting bloc.
Abrahamian reconstructs four broad parliamentary groupings:

| Group at the opening of the term | Approximate strength or character |
| --- | --- |
| Royalist majority | The largest group; the court had recovered substantial influence over the election and the government. |
| Independent notables | Roughly forty, including Abol Qasem Amini, Khosrow Qashqai, and Nasser Zolfaqari. |
| Pro-British southern conservatives | Magnates with especially strong connections in Khuzestan, Fars, and the Gulf districts. |
| National Front | Eight deputies, initially a tiny opposition delegation. |

The First Senate, which opened at the same time, reinforced the royalist
institutional advantage. Yet neither “royalist” nor “pro-British” predicted
every vote. Public mobilization and the legitimacy of oil nationalization
eventually induced conservative deputies and senators to support measures
they might otherwise have opposed (`MAJ-S2`, pp. 260–67; `MAJ-S3`, pp. 8–9).

### Returns were not yet votes

The retrospective roster's 131 is an eventual return count. In session 2 on
18 February 1950 the chamber approved 98 credentials. Sessions 3, 5, 6, 7,
and 8 added nine. The two Kashan/Natanz credentials, including National Front
deputy Allahyar Saleh, passed on 18 May; all eleven Tehran credentials,
including the other seven members of the reconstructed National Front cohort,
passed on 1 June. Petros Abkar's southern-Armenian credential passed only in
October. The full named crosswalk is in the
[`credential ledger`](SIXTEENTH_MAJLES_LEDGER.md#credential-waves-already-verified).

This changes how early control should be described. The National Front had
eight returned deputies in the historical reconstruction, but it did not
necessarily have eight usable votes in February. Nor did the “royalist
majority” mean one disciplined government whip. Credentials, attendance,
office acceptance, death, committee assignment, the question before the
house, and public pressure all changed the operative denominator.

### The eight National Front deputies

| Deputy | Constituency in Abrahamian's reconstruction | Initial tendency | Confidence and qualification |
| --- | --- | --- | --- |
| Mohammad Mossadegh | Tehran | Constitutional nationalist; National Front chair | **B.** Became prime minister in April 1951. |
| Seyyed Abol-Hassan Haerizadeh | Tehran | Bazaar-connected constitutional opposition; early National Front | **B.** Broke with Mossadegh during the Seventeenth Majles. |
| Hossein Makki | Tehran | Bazaar-connected nationalist and popular historian; early National Front | **B.** Broke with Mossadegh during the Seventeenth Majles. |
| Mahmoud Nariman | Tehran | Secular constitutional nationalist; senior civil servant | **B.** Remained in Mossadegh's governing circle. |
| Ali Shayegan | Tehran | Secular constitutional nationalist; law professor | **B.** Remained a close legal adviser to Mossadegh. |
| Abdol-Qadir Azad | Sabzevar in Abrahamian's account | National Front press and political organizer | **B/D.** The 1977 official roster places him among the Tehran returns. This constituency discrepancy remains open. |
| Mozaffar Baghai | Kerman | Toilers' Party; nationalist coalition figure | **B.** Later split with both Khalil Maleki and Mossadegh. |
| Allahyar Saleh | Kashan | Iran Party constitutionalist | **B.** Served in Mossadegh's political and diplomatic circle. |

The constituency discrepancy for Azad is a warning against copying a single
secondary list into code. The official Sixteenth-Majles scan lists Azad in
Tehran, while Abrahamian places him in Sabzevar. The official roster's
footnote resolves the apparent Baghai duplication more clearly: Baghai was
also returned for Kerman, but is listed under Tehran and no separate second
Kerman member was seated. The remaining credential proceeding should still
be checked before the exact choice date becomes a simulation event.

### How eight deputies became decisive

The National Front never possessed a party majority in the Sixteenth Majles.
Its leverage came from:

- highly visible parliamentary speeches and committee work;
- an urban and bazaar mobilization outside the chamber;
- the ability to turn oil sovereignty into an issue on which conservative
  deputies feared opposing public opinion;
- the special oil committee, where Mossadegh could construct a majority
  wider than his caucus; and
- the court majority's inability to find a premier who could settle the oil
  dispute while retaining public legitimacy.

The oil-nationalization coalition was therefore much larger than the National
Front delegation. In April 1951 the conservative majority itself offered the
premiership to Mossadegh. A contemporary report put his nomination at 79 of
99 deputies present. That was a government-formation and oil-policy
coalition—not a conversion of seventy-nine deputies into National Front
members.

### Dated Sixteenth-Majles control

| Date or phase | Legal or voting layer | Best supported interpretation |
| --- | --- | --- |
| 18 February 1950 | 98 credentials approved in session 2 | The operating chamber began well below the eventual 131 returns. |
| 22 February–12 March 1950 | Nine more credentials mapped in sessions 3, 5, 6, 7, and 8 | Legal membership accumulated in waves while the permanent board and committees formed. |
| 18 May 1950 | Allahyar Saleh and Mohammad-Kazem Saleh-Sheibani approved | One of the National Front eight became usable only months into the term. |
| 1 June 1950 | All eleven Tehran credentials approved | The other seven members of the reconstructed National Front cohort became credentialed together with Jamal Emami and three other Tehran returns. |
| 12 October 1950 | Petros Abkar approved | At least one communal constituency remained unresolved deep into the term. |
| December 1950–March 1951 | Special oil committee and nationalization campaign | The Front converted committee position, speeches, and public pressure into an issue coalition far beyond eight deputies. |
| 15 March 1951 | Nationalization principle accepted unanimously by all present in a standing vote; no number printed | A cross-bloc sovereignty vote; it cannot be read back as party affiliation. |
| 27 April 1951 | Implementation bill approved unanimously by all present after article-by-article standing votes; no number printed | A second cross-bloc decision with a different legal object and denominator. |
| 28 April 1951 | Mossadegh reportedly 79 of 99 present in the inclination ballot | The conservative chamber selected the opposition leader to execute the policy it had embraced. |

The member-level return, status, office, and vote audit is maintained in
[`SIXTEENTH_MAJLES_LEDGER.md`](SIXTEENTH_MAJLES_LEDGER.md).

## The Seventeenth Majles

### What the election initially produced

Voting began on 23 December 1951. By 28 March 1952, a US estimate counted
about sixty completed returns:

| March 1952 US estimate | Deputies |
| --- | ---: |
| Active supporters of the National Front leadership | about 25 |
| Definitely opposed | about 15 |
| Uncommitted or issue-dependent | about 20 |

It identified twelve hard-core government returns from Tehran and eight from
Tabriz. It also predicted about fifteen personal followers for Kashani and
warned that provincial notables would often support the government on oil
while opposing it on other questions. The report already saw rivalry between
Mossadegh- and Kashani-sponsored candidates
([FRUS, Iran, doc. 67, paras. 6–7](https://history.state.gov/historicaldocuments/frus1951-54Iran/d67)).

When voting stopped, Abrahamian's social count found 49 landlords among the
79 elected. Thirty deputies belonged to or closely identified with the
National Front. That group included:

- Karim Sanjabi and Ahmad Zirakzadeh of the Iran Party;
- Mozaffar Baghai of the Toilers' Party;
- Ayatollah Abol-Qasem Kashani and Shams al-Din Qanatabadi of the Society of
  Muslim Warriors;
- nonparty supporters including Ali Shayegan, Ahmad Razavi, Mahmoud Nariman,
  Hossein Makki, and Abol-Hassan Haerizadeh; and
- Khosrow and a second Qashqai deputy, whom Abrahamian identifies as
  Mohammad Nasser Qashqai.

Its occupational profile included four lawyers, four engineers, three
journalists, three university professors, one historian, and ten members of
the ulama. These categories show how heterogeneous the initial government
coalition was; they do not imply a common social program (`MAJ-S2`,
pp. 269–70).

There is a name-and-chamber discrepancy inside that last identification. The
official Seventeenth-Majles roster returns **Mohammad Hossein Qashqai** for
Abadeh and Khosrow Qashqai for Firuzabad, while its First-Senate roster places
**Mohammad Nasser Qashqai** among the Shah's appointees. Until the credential
proceedings are checked, the safe proposition is that two Qashqai deputies
joined the initial parliamentary coalition and Nasser sat in the Senate—not
that Nasser also held a Majles seat.

### Official roster of returned people

The following is a normalized working transcription of the official 1977
roster. Persian is retained where it helps catch transliteration errors. It
records a return, **not** a permanent ideology. “Initial tendency” appears
only where the current evidence supports one; blank cases remain genuinely
unclassified.

Every name and constituency in the first two columns is from `SUP-052`.
Initial National Front membership and the coalition's social composition use
`MAJ-S2`, pp. 269–70. Opening alignments and the chair contest use `MAJ-S3`,
pp. 96–103; later government, Freedom, Kashani, royalist, and dissident
descriptions use `MAJ-S3`, pp. 100–17. CIA-derived April 1953 classifications
use [FRUS doc. 192, pp. 531–35](https://history.state.gov/historicaldocuments/frus1951-54Iran/d192).
The Salvation of the Movement membership and named opposition to the
Committee of Eight report use `MAJ-S1`, pp. 318–20 and the latter's cited
14 March 1953 *Bakhtar-e Emruz* report.
The 18 August 1953 *Bakhtar-e Emruz* photograph and caption in `SUP-031`,
issue 1174, p. 1, directly identify six deputies leaving a National Movement
caucus meeting. These locators control the corresponding **B** and **C**
labels in the table; an unresolved row carries no inferred occupation or
ideology.

| Constituency | Returned member | Documented political classification |
| --- | --- | --- |
| Abadeh | Mohammad Hossein Qashqai (محمدحسین قشقائی) | Qashqai; pro-Mossadegh largely through anti-Pahlavi alignment (**B**) |
| Ardabil | Fazl-Ali Hoda (فضل‌علی هدی) | Opposed the Committee of Eight report in March 1953; broader ideology and caucus unresolved (**B**) |
| Ahar / Arasbaran | Ali-Akbar Emami-Ahari (علی‌اکبر امامی اهری) | Unresolved |
| Iranshahr / Fahraj / Baluchistan | Ebrahim Rigi, “Morad” (ابراهیم ریگی) | National Movement caucus by 18 August 1953 (**C**) |
| Bojnord | Nasrollah Shadlu (نصرالله شادلو) | Unresolved |
| Bandar Pahlavi | Abu al-Makarem Mo'tamed-Damavandi (ابوالمکارم معتمد دماوندی) | Unresolved |
| Bandar Abbas | Mostafa Mosbahzadeh (مصطفی مصباح‌زاده) | Unresolved |
| Bushehr | Mirza Ahmad Khan Akhgar (میرزا احمدخان اخگر) | Joined the government side after 30 Tir in one later list (**C**) |
| Bushehr | Ahmad Faramarzi (احمد فرامرزی) | Unresolved; do not confuse with Abdol-Rahman Faramarzi |
| Bijar and Garrus | Abdol-Hossein Oreng, Sheikh al-Molk (عبدالحسین اورنگ) | Conservative notable; senior temporary speaker (**B**) |
| Birjand / Qa'enat | Mirza Mohammad-Ali Khan Monsef (محمدعلی منصف) | Unresolved |
| Tabriz | Seyyed Mohammad-Ali Angaji (سیدمحمدعلی انگجی) | Clerical/Kashani-associated opening tendency (**C**) |
| Tabriz | Seyyed Javad Khalkhali (سیدجواد خلخالی) | Clerical/Kashani-associated opening tendency (**C**) |
| Tabriz | Seyyed Morteza Shabestari (سیدمرتضی شبستری) | Clerical/Kashani-associated opening tendency (**C**) |
| Tabriz | Javad Ganjei (جواد گنجه‌ای) | Initial government tendency; Committee of Eight (**B**) |
| Tabriz | Seyyed Abdol-Hossein Mojtahedi (سیدعبدالحسین مجتهدی) | Clerical/Kashani-associated opening tendency (**C**) |
| Tabriz | Ali-Asghar Modarres (علی‌اصغر مدرس) | Clerical/Kashani-associated opening tendency (**C**) |
| Tabriz | Abol-Hossein Maleki (ابوالحسین ملکی) | Initial tendency unresolved |
| Tabriz | Seyyed Ebrahim Milani (سیدابراهیم میلانی) | Clerical/Kashani-associated opening tendency (**C**) |
| Tabriz | Ahmad Bahadori (احمد بهادری) | Opposed the Committee of Eight report in March 1953; opening tendency and caucus unresolved (**B**) |
| Tehran | Seyyed Hossein Makki (سیدحسین مکی) | National Front nationalist; later dissident (**B**) |
| Tehran | Ayatollah Seyyed Abol-Qasem Kashani (آیت‌الله سیدابوالقاسم کاشانی) | Clerical-nationalist coalition leader; later opposition (**B**) |
| Tehran | Hossein Fatemi (حسین فاطمی) | National Front social-democratic nationalist; could not sit after taking the Foreign Ministry (**A/B**) |
| Tehran | Hossein-Ali Rashed (حسینعلی راشد) | Cleric and broadcaster; precise caucus alignment unresolved |
| Tehran | Seyyed Mahmoud Nariman (سیدمحمود نریمان) | Close secular National Front supporter (**B**) |
| Tehran | Yusef Moshar (یوسف مشار) | Initial government tendency in later caucus lists (**C**) |
| Tehran | Seyyed Ali Shayegan (سیدعلی شایگان) | Close secular National Front adviser (**B**) |
| Tehran | Ahmad Zirakzadeh (احمد زیرک‌زاده) | Iran Party; pro-Mossadegh constitutional left (**B**) |
| Tehran | Kazem Hasibi (کاظم حسیبی) | Iran Party engineer and oil specialist; the web transcription “Habibi” is an error (**A/B**) |
| Tehran | Seyyed Abol-Hassan Haerizadeh (سیدابوالحسن حائری‌زاده) | National Front founder; later Freedom-faction opposition leader (**B**) |
| Tehran / Kerman | Mozaffar Baghai (مظفر بقائی) | Toilers' Party; accepted Kerman and left the Tehran seat; later opposition (**A/B**) |
| Tehran | Ali Zohari (علی زهری) | Toilers' Party associate; later opposition (**B**) |
| Jahrom | Hesam al-Din Vakilpur (حسام‌الدین وکیل‌پور) | Unresolved |
| Jiroft | Mohammad-Ebrahim Shapouri (محمدابراهیم شاپوری) | Later government-aligned list (**C**) |
| Khorramabad / Luristan | Fathollah Khan Pursartip, Sagvand (فتح‌الله پورسرتیپ) | Unresolved |
| Khorramabad / Luristan | Seyyed Abdol-Karim Faqihi-Shirazi (عبدالکریم فقیهی شیرازی) | Opposed the Committee of Eight report in March 1953; broader ideology and caucus unresolved (**B**) |
| Khalkhal | Hamdollah Zaka'i (حمدالله ذکائی) | Unresolved |
| Khoy / Maku / Salmas | Asghar Parsa (اصغر پارسا) | Later government caucus spokesman in one reconstruction (**C**) |
| Khoy / Maku / Salmas | Mir Majid Mousavi (میرمجید موسوی) | Unresolved |
| Damavand | Seyyed Baqer Jalali-Mousavi (سیدباقر جلالی موسوی) | Later government-aligned list; National Movement caucus by 18 August 1953 (**C**) |
| Rezaieh | Mohsen Afshar-Sadeqi (محسن افشار صادقی) | Opposed the Committee of Eight report in March 1953; broader ideology and caucus unresolved (**B**) |
| Rafsanjan | Bahram Majdzadeh (بهرام مجدزاده) | Committee of Eight; FRUS/Abrahamian sometimes render the given name “Bahman” (**A/D**) |
| Zanjan | Mohammad-Hassan Amir-Afshari (محمدحسن امیرافشاری) | Unresolved |
| Zanjan | Mohammad Zolfaqari (محمد ذوالفقاری) | Royalist tribal notable (**B**) |
| Zanjan | Nasser Zolfaqari (ناصر ذوالفقاری) | Royalist tribal notable, though supportive on oil and 30 Tir commemoration (**B**) |
| Sarab / Garmerud / Mianeh | Hossein Fakher (حسین فاخر) | Unresolved |
| Semnan / Damghan | Javad Ameri (جواد عامری) | Unresolved |
| Sirjan | Ahmad Nazerzadeh-Kermani (احمد ناظرزاده کرمانی) | Unresolved |
| Shahroud | Seyyed Shams al-Din Qanatabadi (سیدشمس‌الدین قنات‌آبادی) | Society of Muslim Warriors; Kashani follower; later opposition (**B**) |
| Shahreza | Gholamreza Kian (غلامرضا کیان) | Unresolved |
| Shahriar | Baha al-Din Kahbod (بهاءالدین کهبد) | Unresolved |
| Talesh / Gorganrud | Haj Aqa Reza Rafi (رضا رفیع) | Committee of Eight; establishment notable, issue-dependent (**B**) |
| Tun / Tabas / Ferdows | Seyyed Mahmoud Najafi (سیدمحمود نجفی) | National Movement caucus by 18 August 1953 (**C**) |
| Fuman | Mohammad-Ali Dadvar (محمدعلی دادور) | Unresolved |
| Firuzabad / Khamseh tribes | Khosrow Qashqai (خسرو قشقائی) | Pro-Mossadegh, strongly anti-Pahlavi tribal leader (**B**) |
| Qazvin | Seyyed Mehdi Zia-Haj Seyyed Javadi (سیدمهدی ضیاء حاج‌سیدجوادی) | Later government-aligned list; National Movement caucus by 18 August 1953 (**C**) |
| Qazvin | Seyyed Ahmad Safa'i (سیداحمد صفائی) | Later government-aligned list (**C**) |
| Qom | Abolfazl Towlit (ابوالفضل تولیت) | Unresolved |
| Kashmar | Mehdi Showkati (مهدی شوکتی) | Unresolved |
| Kerman | Seyyed Ahmad Razavi (سیداحمد رضوی) | Initial nonparty National Front supporter (**B**) |
| Kermanshah | Mohammad-Reza Eqbal, Al-Aqa (محمدرضا اقبال آل‌آقا) | Later government-aligned list; National Movement caucus by 18 August 1953 (**C**) |
| Kermanshah | Karim Sanjabi (کریم سنجابی) | Iran Party; constitutional nationalist; Committee of Eight (**B**) |
| Kermanshah | Fakhr al-Din Farzaneh (فخرالدین فرزانه) | Later government-aligned list (**C**) |
| Kermanshah | Nad-Ali Karimi (نادعلی کریمی) | Salvation of the Movement caucus with Baghai, Zohari, and Qanatabadi by early March 1953 (**B**) |
| Gorgan | Khalil Falsafi (خلیل فلسفی) | National Movement caucus by 18 August 1953 (**C**) |
| Golpayegan / Khansar | Abdullah Moazemi (عبدالله معظمی) | Iran Party; pro-government constitutionalist and later speaker (**B**) |
| Lahijan / Langarud | Shams al-Din Elmi-Gharavi (شمس‌الدین علمی غروی) | Unresolved |
| Khomein / Mahallat | Shahab Khosravani (شهاب خسروانی) | Unresolved |
| Maragheh | Fath-Ali Afshar (فتحعلی افشار) | Unresolved |
| Maragheh | Ahmad Hamidiyeh (احمد حمیدیه) | Opposed the Committee of Eight report in March 1953; broader ideology and caucus unresolved (**B**) |
| Meshgin Shahr | Seyyed Mehdi Mir-Ashrafi (سیدمهدی میراشرافی) | Rightist editor and royalist (**B**) |
| Malayer and associated districts | Hashem Malek-Madani (هاشم ملک‌مدنی) | Pro-British/conservative notable in specialist accounts (**B**) |
| Malayer | Hadi Mossadeqi (هادی مصدقی) | Unresolved; surname does not establish alignment |
| Mahabad | Seyyed Hassan Emami, Tehran Imam Jom'eh (سیدحسن امامی) | Royalist; elected from a district with which he had no local connection; opening speaker (**B**) |
| Najafabad | Hassan Shahidi (حسن شهیدی) | Unresolved |
| Nishapur | Hassan Nabavi (حسن نبوی) | Unresolved |
| Varamin | Abdol-Rahman Faramarzi (عبدالرحمن فرامرزی) | Royalist/rightist press figure (**B**) |
| Yazd | Seyyed Mahmoud Jalili (سیدمحمود جلیلی) | Unresolved |
| Yazd | Reza Sarrafzadeh (رضا صراف‌زاده) | Unresolved |
| Yazd | Sheikh Hadi Taheri (شیخ هادی طاهری) | Veteran pro-British conservative in specialist accounts (**B**) |

This table deliberately leaves many entries unresolved. Occupation,
landholding, clerical title, provincial constituency, or appointment method
cannot by themselves establish ideology.

### Opening control: credentials and the speakership

Credentials hearings featured accusations of military intimidation, packed
supervisory committees, ballot-box switching, multiple and underage voting,
and the organized delivery of tribal voters. Abrahamian reports that the
preliminary struggle ended when 79 credentials had been accepted. Kashani
treated attendance as beneath his dignity; Fatemi became constitutionally
ineligible after accepting executive office.

The first speakership ballot on 29 June 1952 exposed a divided government
side:

| Candidate | First ballot | Second ballot |
| --- | ---: | ---: |
| Hassan Emami, royalist | 33 | 39 |
| Ali Shayegan, government | 16 | withdrew |
| Abdullah Moazemi, government/Iran Party | 17 | 35 |

Emami's victory did not prove a durable opposition majority. It proved that
the government's votes could be split and that chamber offices were
independent contests (`MAJ-S3`, pp. 100–02).

On 5 July, when a new parliament required the incumbent to seek a renewed
vote of inclination, Mossadegh received 52 of 64 Majles votes but only 14 of
45 in the Senate. The Shah and foreign diplomats were simultaneously
exploring Ahmad Qavam as a successor. This was a real warning that formal
confidence on the oil issue coexisted with an organized effort to replace the
government.

### 30 Tir changed the coalition

After Qavam's appointment and the 30 Tir uprising, the parliamentary
arithmetic swung sharply:

| Post-uprising vote | Result |
| --- | ---: |
| Majles vote of inclination for Mossadegh | 61 affirmative out of 64 votes cast |
| Senate vote of inclination for Mossadegh | 33 affirmative out of 41 votes cast |
| Late-January 1953 Majles confidence vote | 59 of 61 |

These numbers are issue- and moment-specific. Deputies who supported
Mossadegh immediately after a lethal uprising did not thereby become members
of a disciplined government party. A contemporary Associated Press account
instead compared the same 61 affirmative Majles votes with 76 deputies then
seated. That is a membership denominator, not a conflicting vote total; the
scholarly synthesis's 64 is the number of votes cast
([AP, 22 July 1952](https://www.mohammadmossadegh.com/news/ap-associated-press/iran-s-parliament-re-elects-mossadegh-premier/)).

The initial government group of about thirty called itself the Homeland
Caucus (*Fraksiun-e Vatan*). After some independents joined, it became the
National Movement Caucus (*Fraksiun-e Nahzat-e Melli*). Roughly forty
opponents gathered in smaller personal caucuses called Freedom, Iran,
Alliance, Unity (two separately named formations), State, Confederate, and
Save the Movement. The Freedom caucus, led by Haerizadeh, brought former
National Front figures together with royalists such as Mir-Ashrafi,
Faramarzi, and the Zolfaqari brothers (`MAJ-S3`, p. 108).

The label “Iran caucus” must not be silently equated with the Iran Party.
One is a parliamentary label in Abrahamian's list; the other was a formal
party strongly supportive of Mossadegh.

### Fracture of the National Front

The governing coalition contained secular constitutionalists, socialists,
religious-nationalist organizers, bazaar politicians, Qashqai leaders, and
anti-court notables. Its later breakup cannot be described as a simple shift
from left to right.

| Figure or network | Opening relationship | Later relationship |
| --- | --- | --- |
| Iran Party deputies | Constitutional-left core of the National Front | Remained strongly pro-Mossadegh. |
| Khalil Maleki's Third Force | Left wing of the National Front / Toilers' milieu | Split from Baghai and remained pro-Mossadegh. |
| Mozaffar Baghai and Toilers' loyalists | Founding National Front component | Opposed the extension of plenary powers and Mossadegh's methods; CIA estimated no more than three faithful Majles followers by April 1953. |
| Kashani and Qanatabadi | Clerical-nationalist mass and parliamentary allies | Opposed extended special powers and moved toward a pro-Shah anti-Mossadegh coalition. |
| Makki and Haerizadeh | Founding nationalist lieutenants | Became leading parliamentary dissidents. |
| Qashqai deputies | Joined the government caucus | Continued support mainly because of deep hostility to the Pahlavi dynasty, while maintaining contacts across political lines. |
| Royalists | Opposed Mossadegh's control of government | Could nevertheless vote for oil nationalization, recognize 30 Tir as a national uprising, or support a particular constitutional report. |

After the February 1953 crisis, the Majles elected an eight-member committee
to clarify the Crown–government relationship: Hossein Makki, Javad Ganjei,
Abol-Hassan Haerizadeh, Bahram/Bahman Majdzadeh, Abdullah Moazemi, Mozaffar
Baghai, Reza Rafi, and Karim Sanjabi. Six had long records of criticizing
Pahlavi violations of the constitution. The committee concluded that the
monarch was inviolable and therefore not responsible, ministers were
responsible to the Majles, and royal decrees required ministerial
countersignature. Several members who had moved into opposition then tried to
block or retreat from the report. Ideological pedigree therefore did not
determine the tactical vote.

### From majority control to quorum control

By April 1953, deaths, resignations, and travel had reduced the number in
Tehran to 69. On Abrahamian's reading, 46 were needed to begin debate and 52
to take a vote. The opposition could therefore stop business by walking out,
retreating into committees, or leaving Tehran—sometimes for Qom. The
obstruction continued intermittently for more than forty days from April into
August, while the government said it had 180 bills awaiting consideration.

The June/July US Embassy assessment concluded that the government had only
28 secure votes, ten short of the 38 it believed necessary for stable
legislation. A separate report described Mossadegh as relying on a faithful
minority's ability to leave and break quorum if he could not obtain “one-half
plus one.” These were estimates of operational control, not formal membership
([FRUS, Iran, doc. 233, paras. 1–3](https://history.state.gov/historicaldocuments/frus1951-54Iran/d233);
`MAJ-S3`, pp. 108–15).

On 15 July, 52 deputies announced their resignations: 29 from the National
Movement Caucus and 23 others. The number soon rose to 56. Opponents argued
that a resignation did not take legal effect until the Majles itself
ratified it; coup planners adopted that argument in hopes that the Shah could
summon the nominal chamber. This is why the final contest was not simply
“government 56, opposition 23.” It was a dispute over whether absent
resigners remained legal members, who could excuse absences, and whether any
quorum-capable chamber survived.

## The First Senate

### Constitutional and social structure

The Senate first convened in February 1950. It contained thirty senators
appointed by the Shah and thirty chosen through an indirect, two-stage
election. Eligibility was restricted to senior political, administrative,
military, clerical, landowning, and commercial notables. Its six-year term
and the Shah's power to appoint half the chamber made it an intended
counterweight to the Majles.

The comparison to the House of Lords is useful only at the level of a
conservative upper chamber. Half the Iranian Senate was elected, it was a new
institution rather than an ancient one disciplined by settled conventions,
and its relationship to Majles primacy remained contested.

The chamber was socially an exclusive club of elderly notables, former
ministers and governors, titled families, and retired generals. This made it
structurally conservative. It did not make all royal appointees automatic
royalist votes: Baqer Kazemi later served Mossadegh; Mohammad Nasser Qashqai
was strongly anti-Pahlavi; and Senate president Hassan Taqizadeh warned the
British against trying to remove the prime minister.

### Complete opening roster

The 1977 official list distinguishes appointment from election and records
several replacements. A replacement is listed after an arrow.

#### Thirty appointed senators

| Place | Senator | Documented political classification |
| --- | --- | --- |
| Tehran | Nasrollah Saba | Unresolved |
| Tehran | Dr Qasem Qasemzadeh | Unresolved |
| Tehran | Maj-Gen Azizollah Zarghami | Retired military-establishment cohort; personal voting alignment unresolved (**B/D**) |
| Tehran | Lt-Gen Mohammad Nakhjavan | Retired military-establishment cohort; personal voting alignment unresolved (**B/D**) |
| Tehran | Lt-Gen Ahmad Amir-Ahmadi | Retired military-establishment cohort; personal voting alignment unresolved (**B/D**) |
| Tehran | Ali Haqnevis | Unresolved |
| Tehran | Nasrollah Khalatbari | Unresolved |
| Tehran | Anushirvan Sepahbodi | Unresolved |
| Tehran | Dr Mahmoud Hesabi → Ali Dashti after Hesabi accepted government office | Hesabi vacated for government office; replacement Dashti became a prominent anti-Mossadegh and privately pro-British voice (**A/B**) |
| Tehran | Dr Amir A'lam | Unresolved |
| Tehran | Sadeq Sadeq | Unresolved |
| Tehran | Abdol-Mehdi Tabataba'i | Unresolved |
| Tehran | Dr Sadeq Rezazadeh-Shafaq | Iran Party founder and constitutional-nationalist intellectual; warned against class conflict in the Senate in April 1951, but a stable Senate caucus allegiance remains unresolved (**B**) |
| Tehran | Seyyed Baqer Kazemi | Royal appointee who became Mossadegh's foreign minister; pro-government by that appointment (**A/B**) |
| Tehran | Seyyed Javad Emami, Zahir al-Islam | Urged the British Embassy to press the Shah to act against Mossadegh in 1951; broader ideological position and individual votes unresolved (**B**) |
| Isfahan | Seyyed Kazem Jalili | Unresolved |
| Ahvaz | Mohammad-Ali Nezam-Mafi | Unresolved |
| Tabriz | Abolfath Valatabar | Unresolved |
| Tabriz | Mostafa Adl → Ali Hay'at after Adl's death | Unresolved |
| Rasht | Isa Sorush | Unresolved |
| Rezaieh | Mohammad Sa'ed-Maraghe'i → Seyyed Mehdi Farrukh after Sa'ed accepted government office | Farrukh supported the Shah by the chamber's opening in Abrahamian's reconstruction (**B**) |
| Sari | Dr Esmail Sang | Unresolved |
| Shiraz | Lt-Gen Amanollah Jahanbani | Retired military-establishment cohort; personal voting alignment unresolved (**B/D**) |
| Shiraz | Mohammad Nasser Qashqai | Strongly anti-Pahlavi and consistently pro-Mossadegh despite royal appointment (**B/C**) |
| Kerman | Mohammad-Mehdi Nahvi | Unresolved |
| Kermanshah | Ali Divanbeigi | Unresolved |
| Qazvin | Ali Moqaddam | Unresolved |
| Mashhad | Hassan Masoudi-Khorasani | Unresolved |
| Mashhad | Badi' al-Zaman Foruzanfar | Unresolved |
| Hamadan | Maj-Gen Fazlollah Zahedi; left the seat upon becoming interior minister in April 1951 | Pro-Shah retired general; later organized to replace Mossadegh and became the coup government's candidate (**A/B/C**) |

#### Thirty elected senators

| Place | Senator | Documented political classification |
| --- | --- | --- |
| Tehran | Dr Ahmad Matin-Daftari | Veteran royalist at the chamber's opening, but joined Mossadegh's October 1951 UN delegation as a Senate representative (**B**) |
| Tehran | Dr Isa Sadiq | Unresolved |
| Tehran | Mohammad Soruri | Unresolved |
| Tehran | Seyyed Hassan Taqizadeh | Constitutional veteran who supported the Shah at the chamber's opening, then supported nationalization and rejected British pressure to remove Mossadegh in September 1951 (**B/C**) |
| Tehran | Javad Bushehri → Abolfazl Lesani after Bushehri resigned | Bushehri was an old-guard commercial intermediary in British reporting; Lesani unresolved (**C/D**) |
| Tehran | Abol-Qasem Najm | Elder establishment notable who had worked closely with Reza Shah; precise 1950 allegiance unresolved (**B/D**) |
| Tehran | Abdol-Hossein Nikpur | Commercial notable maintaining British and Qavam contacts; later anti-government operational tendency (**C**) |
| Tehran | Hossein-Ali Kamal-Hedayat | Conservative and explicitly anti-government in a dated report (**C**) |
| Tehran | Abbas Masoudi | Former critic who supported the Shah by the Senate's opening (**B**) |
| Tehran | Ebrahim Khajeh-Nouri | Zahedi associate and unusually open pro-British figure in British reporting (**B/C**) |
| Tehran | Hassan Naqavi | Unresolved |
| Tehran | Dr Saeed Malek | Unresolved |
| Tehran | Dr Mehdi Malekzadeh | Constitutional historian who supported the Shah by the chamber's opening but criticized the Senate's titled old-guard character (**B**) |
| Tehran | Ebrahim Hakimi | Constitutional veteran who supported the Shah by the chamber's opening (**B**) |
| Tehran | Asadollah Yamin-Esfandiyari | Veteran royalist/establishment politician in the opening reconstruction (**B**) |
| Isfahan | Mehdi Moshir-Fatemi | Unresolved |
| Ahvaz | Amir-Hossein Ilkhan-Zafar | Titled Bakhtiari notable with Reza-Shah-era service; 1950 allegiance unresolved (**B/D**) |
| Tabriz | Asadollah Mamagani | Unresolved |
| Tabriz | Dr Qasem Ahari | Unresolved |
| Rasht | Hossein Sami'i | Unresolved |
| Rezaieh | Javad Emami-Kho'i | Unresolved |
| Sari | Hossein Dadgar | Former Justice Party anti-communist and constitutional politician; precise 1950 allegiance unresolved (**B/D**) |
| Shiraz | Ebrahim Qavam | Old-guard Fars magnate; precise Senate allegiance unresolved (**B/D**) |
| Shiraz | Mohammad-Mehdi Namazi | Veteran leader of the pro-British southern parliamentary network and major importer of British goods (**B**) |
| Kerman | Ataollah Rouhi | Unresolved |
| Kermanshah | Farajollah Asef | Unresolved |
| Qazvin | Ebrahim Afkhami | Unresolved |
| Mashhad | Seyyed Mohammad Tadayyon → Sultan Ahmad Rad after Tadayyon's death | Unresolved |
| Mashhad | Seyyed Ali Moayyed-Sabti | Unresolved |
| Hamadan | Morteza-Qoli Bayat, Saham al-Soltan | Elder establishment notable with Reza-Shah-era service; joined Mossadegh's October 1951 UN delegation as a Senate representative, while his precise caucus and votes remain unresolved (**B**) |

### Named Senate tendencies that can be supported

The complete roster above now carries every defensible individual
classification and an explicit `Unresolved` state for the rest. These are
individual, dated profiles—not a sixty-seat faction chart. The opening
royalist/conservative reconstruction uses `MAJ-S2`, pp. 260–67. The chamber's
old-guard social composition, retired-general cohort, named intermediaries,
and later Senate-government conflict use `MAJ-S3`, pp. 89–91 and 96–117.
Javad Emami's anti-government Embassy contact uses `MAJ-S1`, p. 266.
Taqizadeh's nationalization position and warning to Britain use `MAJ-S3`,
pp. 8–9. Matin-Daftari and Morteza-Qoli Bayat's October 1951 delegation role
uses `MAJ-S5`, p. 258. The April 1953 description of Amayoun and Zahedi's
claimed support is [FRUS doc. 192,
pp. 533–35](https://history.state.gov/historicaldocuments/frus1951-54Iran/d192).
Private British contacts remain claims about the named meeting, not a general
ideological registry.

| Senator or network | Evidence-supported tendency |
| --- | --- |
| Hassan Taqizadeh | Constitutional veteran and Senate president. Abrahamian places him among earlier critics who supported the Shah by 1950; he nevertheless supported nationalization and warned the British in September 1951 that seeking Mossadegh's removal was improper intervention. |
| Ahmad Matin-Daftari | Veteran royalist in the opening alignment reconstructed by Abrahamian, but also a Senate representative in Mossadegh's October 1951 UN delegation. |
| Ebrahim Hakimi, Mehdi Malekzadeh, Mehdi Farrukh, Abbas Masoudi | Earlier differences with the Shah had given way to support for him by the Senate's opening in Abrahamian's reconstruction. Individual later votes still require checking. |
| Fazlollah Zahedi | Shah-appointed retired general; later organized to replace Mossadegh and became the coup's prime-ministerial candidate. |
| Ahmad Amir-Ahmadi, Amanollah Jahanbani, Mohammad Nakhjavan, Azizollah Zarghami | Retired-general cohort associated with the Senate's conservative and royal institutional character; do not infer identical votes without proceedings. |
| Baqer Kazemi | Royal appointee who later became Mossadegh's foreign minister; a decisive example of why appointment does not equal permanent royalist alignment. |
| Mohammad Nasser Qashqai | Royal appointee but strongly anti-Pahlavi and aligned with Mossadegh. |
| Ali Dashti | Appointed replacement; urged British force against Abadan in a private discussion and became a prominent anti-Mossadegh voice. |
| Seyyed Javad Emami | Royal appointee who urged the British Embassy to press the Shah to act against Mossadegh; that private contact does not establish every Senate vote. |
| Ebrahim Khajeh-Nouri | Elected senator, Zahedi associate, and unusually open pro-British figure in British reporting. |
| Abdol-Hossein Nikpur | Elected commercial notable who maintained contacts with the British and Qavam. |
| Hossein-Ali Kamal-Hedayat | Conservative senator; recorded threatening to oppose any bill from the existing government. |
| Mehdi Farrukh | Conservative royalist, but capable of defending individual Mossadegh ministers from accusations of communism. |
| Morteza-Qoli Bayat | Elder establishment notable and Mossadegh relative who joined the October 1951 UN delegation as a Senate representative; that assignment does not establish all his later votes. |
| “Amayoun/Amiyun” network | CIA described a conservative association of former high officials and senators with British and Masonic “overtones,” claimed by Zahedi as support. This is a hostile operational description, not a formal complete caucus register. |

### Dated Senate control

| Date or phase | Recorded behavior | Interpretation |
| --- | --- | --- |
| March 1951 | The Senate approved nationalization after the Majles. | Nationalization crossed the chamber's conservative structural alignment. |
| September 1951 | Taqizadeh rejected British encouragement of a change of government. | The Senate presidency was not simply an embassy or palace instrument. |
| March 1952 | The Senate seriously considered calling for Mossadegh's resignation but did not act without the Shah's support. | Opposition existed, but royal coordination remained necessary. |
| 5 July 1952 | Mossadegh received only 14 of 45 votes in the renewed vote of inclination; contemporary reporting also records many blank ballots. | The strongest documented pre–30 Tir institutional resistance. The non-affirmative senators were not necessarily one faction. |
| After 30 Tir | Mossadegh received 33 affirmative votes out of 41 cast. | Public crisis and the Majles result transformed upper-house behavior. |
| August 1952 | The Senate approved the six-month special-powers bill provisionally by 26–4, while seeking limits and review. | Conservative scrutiny coexisted with post-uprising acquiescence. Exact proceeding locator: First Senate session 192, 20 Mordad 1331, still to be fully acquired. |
| Autumn 1952 | The Majles reduced the Senate term from six years to two, effectively closing the chamber. | A struggle over democratic legitimacy and bicameral power, not an ordinary adjournment. |

No stable Senate faction count should be published until the complete
proceedings are available. The full roster now makes a member-by-member
division ledger possible as records are acquired.

## Dated control ledger

| Date or phase | Government's effective position | Mechanism of control |
| --- | --- | --- |
| February 1950 | National Front: 8 in the eventual 131-return Sixteenth-Majles roster; only 98 credentials were approved in session 2 | Opposition speeches, street legitimacy, and committees rather than votes alone |
| March–April 1951 | Oil nationalization commands overwhelming cross-bloc support | Issue coalition under public pressure |
| 28 April 1951 | Mossadegh reportedly receives 79 of 99 in the Majles nomination meeting | Vote of inclination tied to implementing nationalization |
| February–March 1952 election returns | About 25 hard-core government, 15 definite opposition, 20 conditional among first ~60, in a US estimate | Staggered election still changing the chamber |
| 29 June–early July 1952 | Government side loses speakership 39–35 after splitting on first ballot | Internal coordination failure |
| 5 July 1952 | Mossadegh 52/64 Majles, 14/45 Senate | Majles confidence but serious bicameral resistance |
| 16–21 July 1952 | Mossadegh resigns; Qavam selected; 30 Tir uprising defeats replacement | Crown, chamber maneuver, and street veto collide |
| 22 July 1952 | Mossadegh 61/64 Majles votes cast and 33/41 Senate votes cast; contemporary reporting counted 76 Majles deputies seated | Immediate post-uprising supermajority |
| August 1952 | Six-month special powers obtained | Broad emergency issue coalition |
| Late January 1953 | Twelve-month extension and 59/61 confidence | Last overwhelming recorded confidence snapshot |
| February–March 1953 | National Front splits; Committee of Eight initially favors responsible-ministry interpretation | Constitutional issue coalition, then defections |
| April 1953 | CIA: 30 loyal, 4 waverers, purported 46 potential opposition; only 69 members in Tehran in Abrahamian's reconstruction | Nominal opposition potential plus quorum veto |
| April–July 1953 | Government estimated at 28 secure votes; opposition repeatedly walks out | Attendance becomes more important than nominal affiliation |
| 15 July 1953 onward | 52, later 56, announce resignations; opposition disputes their legal effect | Competing theories of resignation, quorum, and legal continuity |
| August 1953 | Referendum and dissolution claim eliminate a functioning parliamentary route | Political conflict moves from parliamentary legitimacy toward decree and force |

## What a future simulation may safely represent

Each member record should eventually carry independent fields for:

```text
member_id
name_fa
name_latin
constituency_or_senate_place
return_date
credential_status
seat_status
appointment_method
social_position
declared_party
dated_institutional_alignment[]
dated_caucus[]
dated_tendency[]
attendance[]
votes[]
source_locators[]
confidence[]
inherited_prior {
  scope
  start_date
  end_date
  signals[]
  evidence_state: heuristic
}
```

The player-facing summary may show:

- formal seats returned;
- usable credentialed members;
- a dated reliable government core;
- a larger issue coalition for the current question;
- opposition potential;
- debate and voting quorums; and
- named pivotal deputies whose behavior is uncertain.

It must not present “landlords,” “royal appointees,” or the National Front's
original slate as permanent voting parties.

## Outstanding work

1. Reconcile the 81 official Seventeenth-Majles constituency returns, 80
   unique people, 79 accepted credentials, and 77 usable members through the
   credential proceedings.
2. Complete the Sixteenth session-2 98-name credential crosswalk and the
   remaining ten exact credential-session locators; then perform the equivalent
   Seventeenth audit.
3. Extend the six-member late National Movement primary-source identification
   into full dated membership of the Homeland, National Movement, Freedom,
   Iran, Alliance, both Unity, State, Confederate, Save the Movement, and
   Islamic caucuses.
4. Build roll calls for government formation, nationalization, special
   powers, the Committee of Eight, the Senate term, and dissolution.
5. Acquire the exact First Senate sessions mapped in
   [`FIRST_SENATE_SOURCE_ACQUISITION.md`](FIRST_SENATE_SOURCE_ACQUISITION.md)
   when member-level attendance, speeches, amendments, or votes are needed;
   then join verified divisions to the `SUP-053` roster. Chamber-level
   behavior can use the bounded substitute stack meanwhile.
6. Verify every Latin transliteration against the official scans and
   specialist biographical references before names become data identifiers.

## Principal locators

| Claim family | Source |
| --- | --- |
| Sixteenth Majles composition and National Front eight | `MAJ-S2`, pp. 250–67 |
| Named late-term Sixteenth opposition, intermediaries, and tactical crossover | `MAJ-S1`, pp. 265–67 |
| Complete Sixteenth return roster, vacancies, replacements, and boards | `SUP-051`, pp. 1–11; [`SIXTEENTH_MAJLES_LEDGER.md`](SIXTEENTH_MAJLES_LEDGER.md) |
| Sixteenth credential waves presently mapped | `SUP-007`, sessions 2, 3, 5, 6, 7, 8, 25, 30, and 69 |
| Tudeh ban and absence of a legal communist parliamentary caucus | `MAJ-S15`, pp. 161–75 |
| Seventeenth election, social composition, initial 30, and fracture | `MAJ-S2`, pp. 269–80; `MAJ-S3`, pp. 86–117 |
| Salvation of the Movement caucus and named Committee-of-Eight-report opponents | `MAJ-S1`, pp. 318–20 |
| Six late National Movement caucus members | `SUP-031`, *Bakhtar-e Emruz*, no. 1174, 27 Mordad 1332 / 18 August 1953, p. 1 photograph and caption |
| Official Sixteenth, Seventeenth, and First-Senate rosters | `SUP-051`, `SUP-052`, `SUP-053` |
| Named First-Senate political backgrounds and intermediaries | `MAJ-S2`, pp. 260–67; `MAJ-S3`, pp. 89–91 and 96–117 |
| Matin-Daftari and Bayat as October 1951 Senate delegation representatives | `MAJ-S5`, p. 258 |
| Early Seventeenth election estimate | [FRUS, Iran, doc. 67, paras. 6–7](https://history.state.gov/historicaldocuments/frus1951-54Iran/d67) |
| April 1953 CIA Majles and political-group estimate | [FRUS, Iran, doc. 192, pp. 531–35](https://history.state.gov/historicaldocuments/frus1951-54Iran/d192) |
| Committee of Eight and wavering majority | [FRUS, Iran, doc. 193](https://history.state.gov/historicaldocuments/frus1951-54Iran/d193) |
| July 1953 legalistic quorum model | [FRUS, Iran, doc. 239](https://history.state.gov/historicaldocuments/frus1951-54Iran/d239) |
| Late government support and public-position estimate | [FRUS, Iran, doc. 233](https://history.state.gov/historicaldocuments/frus1951-54Iran/d233) |
| First Senate proceedings still missing | `IR-P4` in `BIBLIOGRAPHY.md` and [`FIRST_SENATE_SOURCE_ACQUISITION.md`](FIRST_SENATE_SOURCE_ACQUISITION.md) |
