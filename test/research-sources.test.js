const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const test = require('node:test');

const sourceRoot = 'docs/research/sources';
const katouzianOcr = {
  path:
    `${sourceRoot}/major/` +
    'MAJ-S6-katouzian-1999-musaddiq-struggle-power-ocr.pdf',
  hash: '5ae1b3e45f03113bfa89a03e49a43d5bdd2c2d4064ab05651ce9284de32ebcb5',
};
const supplementalOcr = [
  {
    id: 'SUP-002 OCR',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-002-mossadegh-khaterat-va-taalomat-ocr.pdf',
    hash: '4f7d370731f6e00bbf67296c62b94c1d5eddc43fece54e0d1f5bfb68679e441c',
  },
  {
    id: 'SUP-003 OCR',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-003-kuhestani-nejad-2000-iran-party-documents-1323-1332-ocr.pdf',
    hash: 'a16f8e38f69ed9de1af03b460d8b24d29d265ede01dd2ffc174a7afe64265310',
  },
  {
    id: 'SUP-004 OCR',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-004-katouzian-pishdad-2002-khalil-maleki-letters-ocr.pdf',
    hash: '13d36fa8add7d42a052ae44a6920ad3b31963d16d503ecd97e51d6dbbf0e6b73',
  },
  {
    id: 'SUP-005 OCR',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-005-sanjabi-1989-omidha-va-naomidiha-ocr.pdf',
    hash: 'b10f5c337ee53deee8f90191784e4c5c3e36c5c5289b80b625ca696b98b054ab',
  },
];
const electronicSources = [
  {
    id: 'MAJ-S2 EPUB',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S2-abrahamian-1982-iran-between-two-revolutions.epub',
    hash: '236dc3987a77eda82d175aecb36430105665638a617aa3b23cf0fc510dc2c15e',
  },
  {
    id: 'MAJ-S3 EPUB',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S3-abrahamian-2021-oil-crisis-in-iran.epub',
    hash: '921fff22e385cbff033eddc4779504289f317bd5fcc2fff843de44b11d801c57',
  },
  {
    id: 'MAJ-S12 EPUB',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S12-elm-1992-oil-power-principle.epub',
    hash: 'b8c3046b231c5c864db86a283881cc9d36a59f3ccd39f033be7c4a9ef9727b55',
  },
  {
    id: 'MAJ-S14 EPUB',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S14-painter-brew-2023-struggle-for-iran.epub',
    hash: '73b9f43999db6a450363d27ddad4c5439150dbd542899dab2c41cfaf161c6cba',
  },
  {
    id: 'SUP-016 EPUB',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-016-frus-1949-near-east-south-asia-africa-vol-6.epub',
    hash: 'd467b6eba9c53313735e238702444ad11b91b3b63c59c41a2f7c11bdf26fc0f6',
  },
];
const recentSourceFiles = [
  {
    id: 'MAJ-S16',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S16-katouzian-1981-political-economy-modern-iran.pdf',
    sidecar:
      `${sourceRoot}/major/` +
      'MAJ-S16-katouzian-1981-political-economy-modern-iran.md',
    hash: 'c5f9af1a51e9e46fd83a096ec5b1045457ff249cc5948b67facdca8aa4f7a4fb',
  },
  {
    id: 'MAJ-S17',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S17-bharier-1971-economic-development-iran.pdf',
    sidecar:
      `${sourceRoot}/major/` +
      'MAJ-S17-bharier-1971-economic-development-iran.md',
    hash: '6bae08bc32b743ce17191da36c3648b493c033d092b20c9c1423df93b419eda0',
  },
  {
    id: 'MAJ-S18',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S18-brew-2022-petroleum-progress-iran.pdf',
    sidecar:
      `${sourceRoot}/major/` +
      'MAJ-S18-brew-2022-petroleum-progress-iran.md',
    hash: '38df072dff3d8ad6c7004d6ec281227046818f6edb3bd4f83e994c98240f9832',
  },
  {
    id: 'SUP-054',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-054-british-library-ior-l-ps-12-1225-persian-situation-1949.pdf',
    sidecar:
      `${sourceRoot}/supplemental/` +
      'SUP-054-british-library-ior-l-ps-12-1225-persian-situation-1949.md',
    hash: '9301fdec3b0fba60e1c34f2b4e25ea7e31dce105594348a42f3d354e296d3cf9',
  },
  {
    id: 'SUP-055',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-055-ilo-1950-labour-conditions-oil-industry-iran.pdf',
    sidecar:
      `${sourceRoot}/supplemental/` +
      'SUP-055-ilo-1950-labour-conditions-oil-industry-iran.md',
    hash: '08217aa82252a109f9d2d3518d779be80c19f9f8b6d7bf6b84a9dd382ec6e4c7',
  },
  {
    id: 'SUP-056',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-056-ahmadi-nasab-sadeghi-2013-sixteenth-majles-nationalization.html',
    sidecar:
      `${sourceRoot}/supplemental/` +
      'SUP-056-ahmadi-nasab-sadeghi-2013-sixteenth-majles-nationalization.md',
    hash: 'a10f6edeaf6d877211fd64fcbaf2a6bcf6b1c03e7f4f4849d2c7e53e196c427a',
  },
  {
    id: 'SUP-059 print-order 172',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-059-majles-special-oil-commission-minutes-print-172.pdf',
    sidecar:
      `${sourceRoot}/supplemental/` +
      'SUP-059-majles-special-oil-commission-minutes.md',
    hash: 'ed794dd87ad51e3890e7aad106c11f128112418451e457eeda77e245db59c43b',
  },
  {
    id: 'SUP-059 print-order 300',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-059-majles-special-oil-commission-minutes-print-300.pdf',
    sidecar:
      `${sourceRoot}/supplemental/` +
      'SUP-059-majles-special-oil-commission-minutes.md',
    hash: '6db3ebeef1ecfee703a7f130d12c7b56b1d398579a6c0ddd9c3d3e22507bf985',
  },
  {
    id: 'SUP-060',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-060-randjbar-daemi-2024-radio-tehran-coup.html',
    sidecar:
      `${sourceRoot}/supplemental/` +
      'SUP-060-randjbar-daemi-2024-radio-tehran-coup.md',
    hash: 'a7d8ca87da6dcfcdc135d24caf7c9ae2e340e4f0da33b9170ca2ee42ac286266',
  },
];
const recentSourceCollections = [
  {
    id: 'SUP-057',
    directory: 'SUP-057-imf-ifs-selected-1950-1954',
    files: [
      [
        '1950-12-vol3-no12.pdf',
        '97612c1838fc8aea98dc3c7553a43fc8f65e9d311c1783ebb953260edd4f95e8',
      ],
      [
        '1950-12-vol3-no12.ocr.txt',
        'ed976eddb1604b2398541a74e73be3e403b46238eae353bd3b20a8d829760bc2',
      ],
      [
        '1951-12-vol4-no12.pdf',
        '9711c758c0d8bd265f0cb6ad09431334099b593ac80d50b7150ce4165473b0c9',
      ],
      [
        '1951-12-vol4-no12.ocr.txt',
        '385d6a0016a409837bce4f9116599f266341c76baf213e18a1b32eec3b78d034',
      ],
      [
        '1953-08-vol6-no8.pdf',
        '1219fe948d4574f8b4be9f3aadf85806fa2aa0403a1d99a1677755b3767ce6b4',
      ],
      [
        '1953-08-vol6-no8.ocr.txt',
        '47b1a25b7fa30bc785d7aa0a5df640212ff3452508fb1db8ef916a07a1627516',
      ],
      [
        '1954-12-vol7-no12.pdf',
        'a25398dfc28879630f2b34313e59d93beeb31282c5abe825b97752b74d86e618',
      ],
      [
        '1954-12-vol7-no12.ocr.txt',
        '6dcb414088978b01b70dae4a98259b1016b933a24f494d97f42652cb3272a156',
      ],
    ],
  },
  {
    id: 'SUP-058',
    directory: 'SUP-058-un-middle-east-economic-surveys-1950-1952',
    files: [
      [
        '1950-review-economic-conditions-middle-east.pdf',
        '77b4abaef72175d63c54150c0f3727d1e59a8700fd2044a40cdd544be964f117',
      ],
      [
        '1951-summary-recent-economic-developments-middle-east.pdf',
        '2d9a348a947eead594874daeff28c21632995f496d3802a49a1e8aa110a0a6ec',
      ],
      [
        '1952-review-economic-conditions-middle-east.pdf',
        'a3f8f9001b112c69d0d7b78cfeadc046e786e2722d11addd1358ae941b239bdf',
      ],
    ],
  },
];
const retainedSourceFiles = [
  {
    id: 'SUP-010 2017 first edition',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-010-frus-1952-1954-iran-2017-first-edition.pdf',
    hash: '697dc30450017402cafcbf54911fd3bc953cab78c2cb389395bd6a30802715d5',
  },
  {
    id: 'MAJ-S6 identified duplicate',
    path:
      `${sourceRoot}/major/duplicates/` +
      'MAJ-S6-katouzian-1999-musaddiq-struggle-power-duplicate.pdf',
    hash: '383b02f8ba25baf30448787c41d16881c2ffcf9a3d7b13fd09c6e6266eb800f1',
  },
  {
    id: 'MAJ-S8 1964 first edition',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S8-cottam-1964-nationalism-in-iran-first-edition.pdf',
    hash: '1bdc0a091bde52b83dd489803c7df79099df8ddacee00cc7438751115d451c15',
  },
  {
    id: 'MAJ-S9 OCR derivative',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S9-ladjevardi-1985-labor-unions-autocracy-ocr.pdf',
    hash: '24496fb1b1ad379616eb85c84fdea049a6be7b932f55a00f9f3fe7504b1178cb',
  },
  {
    id: 'MAJ-S9 OCR text',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S9-ladjevardi-1985-labor-unions-autocracy-ocr.txt',
    hash: '2ca655b4d217a219dd57d8c8feec646aba2ee765780c63c24393a3115eb9f5fc',
  },
  {
    id: 'SUP-006 OCR derivative',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-006-majles-16-laws-and-decisions-ocr.pdf',
    hash: '7ca088cb218a180ea2edbb5879bed1e64d6c78e6226d8788e1e6e970aa351700',
  },
  {
    id: 'SUP-006 OCR text',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-006-majles-16-laws-and-decisions-ocr.txt',
    hash: 'a6a2a9b4ded74e5c72dfe755b222bd14c0e469fc1d64c69bbc7eee379bea0921',
  },
  {
    id: 'SUP-021 official HTML',
    path:
      `${sourceRoot}/supplemental/` +
      'SUP-021-hansard-persian-oil-nationalisation-act-1951-06-11.html',
    hash: '8a2a961be0f915e80436063d27b98ba840cff4cd960e90bf8c61720a69fc3bfe',
  },
  {
    id: 'SUP-022 Wilber history',
    path:
      `${sourceRoot}/supplemental/SUP-022-cia-internal-histories/` +
      'wilber-1954-overthrow-premier-mossadeq.pdf',
    hash: 'c1238209dcdd788167386253ab23cb9dfce24bbba05c1edf664f9d23930034b4',
  },
  {
    id: 'SUP-022 Battle for Iran',
    path:
      `${sourceRoot}/supplemental/SUP-022-cia-internal-histories/` +
      'corrigan-1970s-battle-for-iran-2017-release.pdf',
    hash: '96f853c89c9b451784681ef5e2fe9f861e2e31aef5d010eaa7e966145ff5b125',
  },
];
const chaqueriSourceFiles = [
  ['volume-01.pdf', '2e33780155d6db3623ef5e26fbabddd90a0248911ac0a26bbdb01bb0aa183d0c'],
  ['volume-02.pdf', 'd6e6a74449cbe34c7d7ad2a06841e01cca4a48502788bf4c9a02543d71d974d5'],
  ['volume-03.pdf', '5339c42a0bbe23fec1966dfffdbea4d4b2582f452e584e1f7e4438741473bbf5'],
  ['volume-04.pdf', '8bc954695db4da0c47dc94725fa03369ebcd3320f52041d601bc8b244487844c'],
  ['volume-05.pdf', '27d7256cc03e1dc74b473b3311ae8f572a88d9191e8ce296a3f4b19730b846f3'],
  ['volume-06.pdf', '86ee1d0e158cc4d3a497d4f03204b78cfe10d3063d6ee5346239a284916546e1'],
  ['original-edition-scans/volume-03-original-scan.pdf', '1202141e5aef4761739da8048eb184e234a6c090d574f03cf2d201aa10e32ba0'],
  ['original-edition-scans/volume-08-original-scan.pdf', '44184921ee3e10226aa74b0afcb0e2bc50c01e4b779d6b1997d16c4574d1861c'],
  ['original-edition-scans/volume-19-original-scan.pdf', '9fe21f2287804ab43ad91bc50c94fe549db9c11449b19ee239ddfe055009ee65'],
  ['original-edition-scans/volume-20-original-scan.pdf', '2375b697e8850876881755ea4b46ca5890d3ab3d30c4dddd841173b29c7c9db1'],
];
const worldBankSourceFiles = [
  ['access-decision-ai2258-board-transcript.pdf', 'fba0e9f803a6b6dee1ff1f2c700ddcd9f461b5018534c608ec51449f1bf9d790'],
  ['access-decision-ai3487-hoar-memo.pdf', 'fded87d68d160bdabb0f60825c2c718791dec6892a5e78e296aa302e3faefa1c'],
  ['access-request-summary-ai9493-2024-11.pdf', '438a2ea59cccc04884a190f040b9d571e52a3becb17b2ac7cb2e7a63f11e60eb'],
  ['annual-report-1951-1952-iran-section.pdf', 'f3dc225eae2f92697d89cfbc8273cc8b355fcadc8f0d9c8e9fb8f35d2a3caebe'],
  ['folder-1806440-boushenri-origin-and-issues-official.pdf', 'a4c4b089b2ed035765e146cb4b72ead01c528bf052a7a24d8fd6d238a341c9f6'],
  ['folder-1806440-boushenri-origin-and-issues.pdf', '0ef99c3f366b086dd60b42fba3d8e7cfe1d74e52c94db987ded778d506f9318e'],
  ['oral-history-hector-prudhomme-1985-05-02.pdf', '8fa1c6c1dfec4508a824984ce148e9f0b18c887156e87c8d27941321a5379aa1'],
  ['oral-history-robert-garner-1961-07-19.pdf', '15f8385fe47dae383d5ea1a6562b6334a1b5449aae1c3324b68b39fbb5f9c50d'],
  ['press-release-285-review-of-negotiations-1952-04-03.pdf', 'ba831d2b8b080e41fc013a7b9d713d79df6400bcaea4dfba66bde3be6d5d79ad'],
];
const newspaperCollections = [
  {
    id: 'SUP-027',
    directory: 'SUP-027-mardom-tudeh-fourth-series-1328-1333',
    pdfCount: 103,
    manifestHash:
      'a49081dff72bb931a8eca3d517f9a44f73c0dd8d9f4f27f8749b8834ffefb22b',
  },
  {
    id: 'SUP-028',
    directory: 'SUP-028-niruye-sevom-piruz-mishavad-1331-1332',
    pdfCount: 248,
    manifestHash:
      '79aad98bee2cdc3f2d2ead7ad9c05d5b7aad6c28f8e398ed35000d747b795219',
  },
  {
    id: 'SUP-029',
    directory: 'SUP-029-mardom-e-iran-1331-1332',
    pdfCount: 50,
    manifestHash:
      '42ea7239dc20215bf52aed8c0291b9e25940df22f113781677c84ab6bdfd7847',
  },
  {
    id: 'SUP-030',
    directory: 'SUP-030-apadana-1330-1332',
    pdfCount: 40,
    manifestHash:
      '7c251e5cf90d9bcdfc8603279a62ea51193832c5b8c1b1767c34ecf81ab45d51',
  },
  {
    id: 'SUP-031',
    directory: 'SUP-031-bakhtar-emruz-1330-1332',
    pdfCount: 38,
    manifestHash:
      '96cc6c260a9317145d277be9edffe897b27aecb7ca4fed661963931f0968609c',
  },
];
const sources = [
  {
    id: 'MAJ-S1',
    relativePath: 'major/MAJ-S1-azimi-1989-crisis-of-democracy.pdf',
    hash: '997e891eb44601419d07f6ed4ff4fc4fc5be922b328088a41465801b146e1df6',
  },
  {
    id: 'MAJ-S2',
    relativePath: 'major/MAJ-S2-abrahamian-1982-iran-between-two-revolutions.pdf',
    hash: '0c640c960a90102d0f79296888dc0e2a657eb8adbcdfc9d1bcd350104700bcd6',
  },
  {
    id: 'MAJ-S3',
    relativePath: 'major/MAJ-S3-abrahamian-2021-oil-crisis-in-iran.pdf',
    hash: '3ed248c0fbfb277416d0a29c4e431b669bfd6a6571167a331efb013301c4aa88',
  },
  {
    id: 'MAJ-S4',
    relativePath: 'major/MAJ-S4-gasiorowski-byrne-2004-mosaddeq-coup.pdf',
    hash: '587674e69691c0492604f13af9a2da6d176166348863423c9bf5fe611c72e1ba',
  },
  {
    id: 'MAJ-S5',
    relativePath: 'major/MAJ-S5-rahnema-2015-behind-1953-coup.pdf',
    hash: '1f728dd622fdbafcedc761e5a5e46f24d5f4638fef811d9c53475b9e1dced649',
  },
  {
    id: 'MAJ-S6',
    relativePath: 'major/MAJ-S6-katouzian-1999-musaddiq-struggle-power.pdf',
    hash: 'e3fc4f9a205298b7587dd6f12ee7abf770dbb32b8575d68826a655490d67dd33',
  },
  {
    id: 'MAJ-S7',
    relativePath: 'major/MAJ-S7-bayandor-2010-iran-cia.pdf',
    hash: '446e3060036ed7fe947a8fdc467532e6e1ad8cfbb75bf3485cfcd00265ee8cef',
  },
  {
    id: 'MAJ-S13',
    relativePath: 'major/MAJ-S13-azimi-2008-quest-for-democracy.pdf',
    hash: '3acd9dc720662b1f79e82aee0a100c2b6543b151f0b5ff0bac07e1c0b8d95ddd',
  },
  {
    id: 'SUP-048',
    relativePath: 'supplemental/SUP-048-efimenco-1955-civilian-dictatorship.pdf',
    hash: '5d8a748725f5282f0bf98b63cbd776d067b5e66b9f573b62e55ddca4d2cc0193',
  },
  {
    id: 'SUP-001',
    relativePath:
      'supplemental/SUP-001-nukii-2012-protest-events-tehran-bazaar.pdf',
    hash: '9856dd235674899ceb9170cfd98371ac3b194668f3505631c3be4d26427bd860',
  },
  {
    id: 'SUP-002',
    relativePath:
      'supplemental/SUP-002-mossadegh-khaterat-va-taalomat.pdf',
    hash: 'a15cc28280c9de7dc9c78f9a9803ee5dab9587804746e12cfb32ffa379f6111b',
  },
  {
    id: 'SUP-003',
    relativePath:
      'supplemental/' +
      'SUP-003-kuhestani-nejad-2000-iran-party-documents-1323-1332.pdf',
    hash: 'e174f875322319e98659b4b35da0e3b0e2638e59b066a23cd8980c39613acecb',
  },
  {
    id: 'SUP-004',
    relativePath:
      'supplemental/' +
      'SUP-004-katouzian-pishdad-2002-khalil-maleki-letters.pdf',
    hash: '5f238d6b570d915b1636f6649840038069fb5a4d868ae4b5d4f46477797993e1',
  },
  {
    id: 'SUP-005',
    relativePath:
      'supplemental/SUP-005-sanjabi-1989-omidha-va-naomidiha.pdf',
    hash: '3bec8c102e18564c989262154058675214fd4a9fdedf9d21d6993de8265b3229',
  },
  {
    id: 'SUP-006',
    relativePath:
      'supplemental/SUP-006-majles-16-laws-and-decisions.pdf',
    hash: 'd1c7ff34491e526db19ab17fa9bfc68cc9d16b4f66689b266017747a98880d9e',
  },
  {
    id: 'MAJ-S8',
    relativePath:
      'major/MAJ-S8-cottam-1979-nationalism-in-iran-updated.pdf',
    hash: '3af3ab6b8a9eb5315c19bbe33b4a1ab3ae72edc6c62d7e09c7bd036dfcf4a61d',
  },
  {
    id: 'MAJ-S9',
    relativePath:
      'major/MAJ-S9-ladjevardi-1985-labor-unions-autocracy.pdf',
    hash: '212abcfca908943564346bbfe924cfec537fd7a61ab6144d04aa5518d0a54d06',
  },
  {
    id: 'MAJ-S10',
    relativePath:
      'major/MAJ-S10-movahed-1384-khab-e-ashofteh-naft-vol-2.pdf',
    hash: '114325b746d2f8be415920be417458584983dcec8bdb6b6748a35abdd845820c',
  },
  {
    id: 'SUP-010',
    relativePath:
      'supplemental/SUP-010-frus-1952-1954-iran-2018-second-edition.pdf',
    hash: '6871e2a3dc7d93fe894453624fd586949bf75636078f21d1c7b623cf26416dcf',
  },
  {
    id: 'MAJ-S11',
    relativePath:
      'major/MAJ-S11-bill-louis-1988-musaddiq-nationalism-oil.pdf',
    hash: '13303caafcda31f3ed1f4462a124dfdbe5214d92529cb74dd7cc419821704979',
  },
  {
    id: 'SUP-012',
    relativePath:
      'supplemental/SUP-012-azizi-2024-communism-cold-war-coup.pdf',
    hash: 'f88056903ea5645ea6626156e434514599dbcbdea4bb851abd269b208c0759d3',
  },
  {
    id: 'SUP-013',
    relativePath:
      'supplemental/SUP-013-randjbar-daemi-2020-tudeh-peasant-question.pdf',
    hash: '0d0f050ea24bbeaac210aec58002a41f6528754cd0e420c71af1414495b2189a',
  },
  {
    id: 'SUP-014',
    relativePath:
      'supplemental/SUP-014-nukii-2003-bazaaris-political-role.pdf',
    hash: '4eda82ba9e7a014f61b6e79bbaa4c901999a50ef04a073f73dd4891a6e25b37b',
  },
  {
    id: 'SUP-015',
    relativePath:
      'supplemental/SUP-015-kashani-sabet-2024-other-fight.pdf',
    hash: '215df2cf439b83383fdb7ca33ff1c2f084e7678d75f3e83ce534ba522520416d',
  },
  {
    id: 'SUP-017',
    relativePath:
      'supplemental/SUP-017-icj-1952-anglo-iranian-oil-judgment.pdf',
    hash: '75d2cc75ef2e00633aca77225d2438f53f5a5f4ad94856f01bb1dad04d4d27dd',
  },
  {
    id: 'SUP-018',
    relativePath:
      'supplemental/SUP-018-unsc-559th-meeting-1951-10-01.pdf',
    hash: '8f406857191378fa09fba5d4a9e1c3b9971aabe0721969a49802b0ad748e1838',
  },
  {
    id: 'SUP-019',
    relativePath:
      'supplemental/SUP-019-world-bank-iran-oil-mediation-inventory.pdf',
    hash: '62a43ef8945754e1d9487048eb342072a1639f82b71fa23b5d80044a55c22bc7',
  },
  {
    id: 'SUP-020',
    relativePath:
      'supplemental/SUP-020-uk-cabinet-conclusions-cab-195-9.pdf',
    hash: 'ebad9057bb45b0f9023dfa07ffde67609ff49dc607dd5f49d8720c301fbaa048',
  },
  {
    id: 'SUP-023',
    relativePath:
      'supplemental/' +
      'SUP-023-clawson-sassanpour-1987-foreign-exchange-shock.pdf',
    hash: '5356219df43970e1ed374a82fa40fbf626b5d7c31b02a66e8d4a65cb722b4f4b',
  },
  {
    id: 'SUP-024',
    relativePath:
      'supplemental/SUP-024-azimi-1997-on-shaky-ground.pdf',
    hash: '36b77a0ca81c3e6c01a38f52371ec7ac7e9f8039c3e54c6d7e67efc36a9c3c2b',
  },
  {
    id: 'SUP-040',
    relativePath:
      'supplemental/SUP-040-ibrd-1950-present-economic-situation-iran.pdf',
    hash: 'f4a3634c41aaa0ea3af19b2890185d5415f977041af29cc0257bd4cb6f96604a',
  },
  {
    id: 'SUP-041',
    relativePath:
      'supplemental/SUP-041-ibrd-1957-economic-development-iran.pdf',
    hash: '9861b790ac7c886f365623a52c932667fd29198d1a0defdc5ceb6370ceb94ec4',
  },
  {
    id: 'SUP-042',
    relativePath: 'supplemental/SUP-042-imf-areaer-1952.pdf',
    hash: 'fd6c05f65bfd3d14ea976ce267f7daa0b5dcc0868825fc9ec33778d0452250ca',
  },
  {
    id: 'SUP-043',
    relativePath: 'supplemental/SUP-043-imf-areaer-1953.pdf',
    hash: '28130311d2479dc16cfe14d23a8076aa9a4c17871f71c18812f433f34ca6a7bf',
  },
  {
    id: 'SUP-044',
    relativePath: 'supplemental/SUP-044-imf-areaer-1954.pdf',
    hash: '9f8d7af1c5c8bea86fc0f55b9ad6fe59c78270c6d9819862a87ed38fc80a0e23',
  },
  {
    id: 'SUP-045',
    relativePath: 'supplemental/SUP-045-imf-areaer-1955.pdf',
    hash: '267004ff08fe870f0e24263a0d4896a0215eeff2eb79fe790b164b01cd1cca0b',
  },
  {
    id: 'SUP-046',
    relativePath: 'supplemental/SUP-046-majles-1332-budget.pdf',
    hash: '77f5a4221ff3d27bb3b37f2653a92b7788cfa4e8edfeffcf8ba5a8b85cc3c2dc',
  },
  {
    id: 'SUP-047',
    relativePath:
      'supplemental/SUP-047-un-1957-middle-east-economic-developments.pdf',
    hash: 'f59f2643f6a2484ed7a9014d6b8c35e0e0748d975b9d7167dbb6cd0d82d92cd5',
  },
];

function sha256File(path) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(path);
    stream.on('error', reject);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

test('research source taxonomy and catalog cross-references are present', () => {
  const catalogIds = [
    ...sources.map((source) => source.id),
    ...electronicSources.map((source) => source.id.replace(/ EPUB$/, '')),
    ...recentSourceFiles.map((source) => source.id.match(/^(?:MAJ|SUP)-S?\d{2,3}/)[0]),
    ...recentSourceCollections.map((collection) => collection.id),
    'SUP-021',
    'SUP-022',
  ];
  for (const path of [
    'docs/research/AVAILABLE_SOURCES.md',
    'docs/research/BIBLIOGRAPHY.md',
    'docs/research/events/1949-10-palace-protest.md',
  ]) {
    const contents = fs.readFileSync(path, 'utf8');
    for (const id of new Set(catalogIds)) {
      if (path.includes('palace-protest') &&
          !['MAJ-S1', 'SUP-001'].includes(id)) continue;
      assert.match(contents, new RegExp(id));
    }
  }
});

test('economic source-family registry is synchronized', () => {
  const bibliography = fs.readFileSync(
    'docs/research/BIBLIOGRAPHY.md',
    'utf8',
  );
  const unavailable = fs.readFileSync(
    'docs/research/UNAVAILABLE_SOURCES.md',
    'utf8',
  );
  const available = fs.readFileSync(
    'docs/research/AVAILABLE_SOURCES.md',
    'utf8',
  );

  for (const id of [
    ...Array.from({ length: 23 }, (_, index) => `E${index + 1}`),
    'E2a',
    'E9a',
  ]) {
    assert.match(
      bibliography,
      new RegExp(`\\| ${id} \\|`),
      `${id} bibliography record`,
    );
  }

  for (const id of [
    'E1', 'E2', 'E2a', 'E3', 'E4', 'E5', 'E9', 'E13', 'E14', 'E15',
    'E16', 'E17', 'E19', 'E20', 'E21',
    'E22', 'E23',
  ]) {
    assert.match(unavailable, new RegExp(`\\b${id}\\b`), `${id} queue record`);
  }

  const activeEconomicQueue = unavailable.slice(
    unavailable.indexOf('## Economic records'),
    unavailable.indexOf('## Remaining scholarship'),
  );
  for (const id of ['E10', 'E11', 'E12', 'E18']) {
    assert.doesNotMatch(
      activeEconomicQueue,
      new RegExp(`\\[\\\`${id}\\\`\\]`),
      `acquired ${id} source must not remain an active economic target`,
    );
  }

  const residualDashboard = unavailable.slice(
    unavailable.indexOf('## Residual evidence dashboard'),
    unavailable.indexOf('## Parliament and elections'),
  );
  assert.ok(
    residualDashboard.indexOf('| First Senate |') <
      residualDashboard.indexOf('| Sixteenth Majles |'),
    'First Senate should precede Sixteenth-Majles evidence',
  );
  assert.ok(
    residualDashboard.indexOf('| Sixteenth Majles |') <
      residualDashboard.indexOf('| Iranian economy |'),
    'Sixteenth-Majles evidence should precede economic originals',
  );
  assert.doesNotMatch(
    unavailable,
    /## Resolved acquisitions/,
    'resolved acquisitions belong only in the available catalog and changelog',
  );

  for (let id = 40; id <= 47; id += 1) {
    assert.match(available, new RegExp(`SUP-0${id}`));
  }
  assert.match(available, /SUP-032`–`SUP-039` remain intentionally unassigned/);
  assert.ok(
    available.indexOf('### SUP-047') < available.indexOf('### SUP-048'),
    'supplemental records should remain in archive-ID order',
  );
  assert.ok(
    available.indexOf('### SUP-048') < available.indexOf('### SUP-049') &&
      available.indexOf('### SUP-049') < available.indexOf('### SUP-060'),
    'later supplemental records should remain in archive-ID order',
  );
  assert.ok(
    bibliography.indexOf('### SUP-011') <
      bibliography.indexOf('### SUP-027'),
    'primary-source trust records should remain in archive-ID order',
  );
});

test('multi-file primary collections are cross-referenced', () => {
  for (const path of [
    'docs/research/AVAILABLE_SOURCES.md',
    'docs/research/BIBLIOGRAPHY.md',
  ]) {
    const contents = fs.readFileSync(path, 'utf8');
    for (const id of [
      'SUP-007',
      'SUP-008',
      'SUP-009',
      'SUP-011',
      'SUP-022',
      'SUP-026',
      ...newspaperCollections.map((collection) => collection.id),
    ]) {
      assert.match(contents, new RegExp(id));
    }
  }
});

test('ignored local archive matches its catalog when present', async () => {
  if (!fs.existsSync(sourceRoot)) return;

  assert.ok(fs.statSync(`${sourceRoot}/major`).isDirectory());
  assert.ok(fs.statSync(`${sourceRoot}/supplemental`).isDirectory());

  for (const sourceRecord of sources) {
    const pdfPath = `${sourceRoot}/${sourceRecord.relativePath}`;
    const sidecarPath = pdfPath.replace(/\.pdf$/, '.md');
    const sidecar = fs.readFileSync(sidecarPath, 'utf8');
    assert.match(sidecar, new RegExp(sourceRecord.id));

    const source = fs.readFileSync(pdfPath);
    const actualHash =
      crypto.createHash('sha256').update(source).digest('hex');

    assert.equal(actualHash, sourceRecord.hash, sourceRecord.id);
  }

  const ocrDerivative = fs.readFileSync(katouzianOcr.path);
  const ocrHash =
    crypto.createHash('sha256').update(ocrDerivative).digest('hex');
  assert.equal(ocrHash, katouzianOcr.hash, 'MAJ-S6 OCR derivative');

  for (const derivative of supplementalOcr) {
    const actualHash = await sha256File(derivative.path);
    assert.equal(actualHash, derivative.hash, derivative.id);

    const sidecarPath = derivative.path.replace(/\.pdf$/, '.txt');
    assert.ok(fs.statSync(sidecarPath).size > 100_000, derivative.id);
  }

  for (const electronicSource of electronicSources) {
    const bytes = fs.readFileSync(electronicSource.path);
    const actualHash = crypto.createHash('sha256').update(bytes).digest('hex');
    assert.equal(actualHash, electronicSource.hash, electronicSource.id);
  }

  for (const recentSource of recentSourceFiles) {
    const actualHash = await sha256File(recentSource.path);
    assert.equal(actualHash, recentSource.hash, recentSource.id);

    const sidecar = fs.readFileSync(recentSource.sidecar, 'utf8');
    assert.match(
      sidecar,
      new RegExp(recentSource.id.match(/^(?:MAJ|SUP)-S?\d{2,3}/)[0]),
    );
  }

  for (const collection of recentSourceCollections) {
    const collectionRoot =
      `${sourceRoot}/supplemental/${collection.directory}`;
    const readme = fs.readFileSync(`${collectionRoot}/README.md`, 'utf8');
    assert.match(readme, new RegExp(collection.id));
    for (const [relativePath, expectedHash] of collection.files) {
      const actualHash = await sha256File(
        `${collectionRoot}/${relativePath}`,
      );
      assert.equal(actualHash, expectedHash, `${collection.id} ${relativePath}`);
    }
  }

  for (const retainedSource of retainedSourceFiles) {
    const bytes = fs.readFileSync(retainedSource.path);
    const actualHash = crypto.createHash('sha256').update(bytes).digest('hex');
    assert.equal(actualHash, retainedSource.hash, retainedSource.id);
  }

  const chaqueriRoot =
    `${sourceRoot}/supplemental/` +
    'SUP-011-chaqueri-historical-documents-volumes-1-6-2025';
  for (const [relativePath, expectedHash] of chaqueriSourceFiles) {
    const actualHash = await sha256File(`${chaqueriRoot}/${relativePath}`);
    assert.equal(actualHash, expectedHash, `SUP-011 ${relativePath}`);
  }

  const worldBankRoot =
    `${sourceRoot}/supplemental/` +
    'SUP-026-world-bank-oil-mediation-records';
  for (const [relativePath, expectedHash] of worldBankSourceFiles) {
    const actualHash = await sha256File(`${worldBankRoot}/${relativePath}`);
    assert.equal(actualHash, expectedHash, `SUP-026 ${relativePath}`);
  }

  for (const collection of newspaperCollections) {
    const collectionRoot =
      `${sourceRoot}/supplemental/${collection.directory}`;
    const pdfs = fs.readdirSync(collectionRoot)
      .filter((name) => name.endsWith('.pdf'));
    assert.equal(pdfs.length, collection.pdfCount, collection.id);

    const manifestPath = `${collectionRoot}/SHA256SUMS`;
    const actualHash = await sha256File(manifestPath);
    assert.equal(actualHash, collection.manifestHash, collection.id);

    const readme = fs.readFileSync(`${collectionRoot}/README.md`, 'utf8');
    assert.match(readme, new RegExp(collection.id));
    assert.equal(
      fs.readFileSync(manifestPath, 'utf8').trim().split('\n').length,
      collection.pdfCount,
      `${collection.id} manifest`,
    );
  }

  const shahedRoot =
    `${sourceRoot}/supplemental/` +
    'SUP-009-coup-week-partisan-press-1332-05';
  assert.equal(
    await sha256File(`${shahedRoot}/SHA256SUMS`),
    '11942a548c739d2e1364c498b0df4f181852cab4e389415cb8aac5afdc388949',
    'SUP-009 manifest',
  );
  for (const shahedFile of [
    'shahed-1332-05-20.pdf',
    'shahed-1332-05-22.pdf',
    'shahed-1332-05-24.pdf',
    'shahed-1332-05-25.pdf',
    'shahed-1332-05-26.pdf',
    'shahed-1332-05-27.pdf',
    'shahed-1332-05-28.pdf',
    'Shahed-1332-05-27-telegram-preview.jpg',
    'Shahed-1332-05-28-telegram-preview.jpg',
    'shahed-telegram-archive-3821-3840.html',
    'shahed-telegram-archive-3851-3871.html',
    'shahed-telegram-archive-3872-3892.html',
    'shahed-telegram-archive-3893-3913.html',
    'shahed-telegram-archive-3914-3934.html',
    'shahed-telegram-archive-3935-3955.html',
    'shahed-telegram-index-4746-4766.html',
  ]) {
    assert.ok(fs.existsSync(`${shahedRoot}/${shahedFile}`), shahedFile);
  }
});
