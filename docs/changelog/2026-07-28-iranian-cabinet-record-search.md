# Iranian cabinet-record search and partial intake

- **Date:** 2026-07-28
- **Status:** Implemented

## Summary

- Replaced the blanket “unavailable” status for Mossadegh cabinet records with
  a record-type-specific assessment.
- Acquired an official ICJ proceeding containing a certified translation of a
  23 July 1951 Council of Ministers minute extract, an official National
  Archives of Iran booklet of three oil-negotiation reports, and Mohammad
  Torkaman's edited collection of 553 Mossadegh letters.
- Acquired the separate ICJ case-file volume that prints the two certified
  23 July records themselves, establishing their creation and survival more
  directly than the oral proceeding alone, and the Court correspondence
  authenticating their deposit.
- Preserved discovery copies of the 1951 Prime Ministry submission-review
  regulation, a numbered 1952 Finance-to-cabinet oil-expense proposal chain,
  and the 2006 custody order. Marked the privately maintained legal carrier's
  limitations and retained official-carrier verification as a requirement.
- Traced the former Presidential Documents Center's Prime Ministry fond to
  its 2006 merger into the National Library and Archives of Iran, identified
  a bibliographically attested *Guide-List of Prime Ministry Documents*, and
  distinguished institutional holdings from the newly transferred Mossadegh
  family papers.
- Distinguished public legal outputs from deliberative records and narrowed
  the remaining acquisition target to an archival inventory, Persian
  originals and signatures, continuous minutes, agendas, underlying
  submissions, correspondence files, and original official carriers.
- Corrected two category assumptions: Iranian cabinet decisions have not been
  shown to use parliamentary-style minister-by-minister divisions, and
  political cabinet appointments should not be treated as ordinary
  civil-service personnel dossiers.
- Added a detailed search record with exact locators, archival identifiers,
  safe uses, and prohibited inferences.

## Reason

The earlier queue treated minutes, decrees, and correspondence as one
unresolved source family. Online evidence is uneven: public instruments and
selected correspondence are accessible, while collective deliberation is
fragmentary. Separating those layers prevents both overlooking usable primary
records and pretending that published outcomes reveal who argued for a
decision.

## Dynamic SPD comparison

Dynamic SPD's cabinet implementation in
`source/scenes/government_affairs/shuffle_cabinet.scene.dry` presents
ministry allocation as a structured party-political choice. Its recurring
advisers in `source/scenes/advisors/` express named actors through durable
state and mechanical effects.

The reference repository has no equivalent ignored primary-source archive,
per-item metadata sidecars, or available/unavailable cross-catalog in its
`source/` or project documentation. The Iran project retains the SPD cabinet
and adviser comparison at the implementation layer but deliberately diverges
by treating documentary intake and claim limits as release infrastructure.

The Iran project retains the need for ministries and advisers to have
persistent consequences, but the newly found evidence supports only public
acts and one narrow cabinet-decision sequence. It therefore still diverges
from a stable party-cabinet arithmetic and does not yet assign invented
private dialogue, votes, or actor bonuses. This is a research-boundary
refinement, not an architectural change.

## System fit

The acquired material can support sourced decision cards, legal reforms,
formal correspondence, and the July 1951 Harriman sequence. The narrowed
residual gap defines what must be acquired before implementing high-resolution
cabinet bargaining, minister-specific objections, attendance, or collective
votes.

## Research and assets

Eight relevant documentary files are preserved under ignored
`docs/research/sources/supplemental/` with metadata, provenance, access notes,
and SHA-256 checksums. The official ICJ and National Archives records control
their narrow documentary claims. The three Nezamat captures are discovery
copies pending verification against official carriers. Torkaman's edition
remains an edited, selected collection requiring item-level provenance
review. No visual asset was added.

## Validation

- Verified five PDFs and three HTML captures, recorded their extents, and
  checked the stored SHA-256 hashes.
- Located the cabinet extract at ICJ PDF pp. 44–45 / printed pp. 458–59.
- Located the filed cabinet records at ICJ PDF pp. 27–28 / printed
  pp. 697–98 and its deposit correspondence at PDF pp. 62–63 / printed
  pp. 760–61.
- Checked the Persian titles, dates, registration and proposal numbers, and
  operative provisions in all three legal-page captures.
- Cross-checked National Archives identifiers `1360810`, `1525493`, and
  `1363714` against the archival booklet.
- Ran repository documentation/source tests and `git diff --check`.
