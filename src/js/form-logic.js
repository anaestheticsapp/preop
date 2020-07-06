export const selectedByDefault = ['Sore throat', 'Sickness'];

export const form = [
  [
    { type: 'textarea', name: 'presentation', label: 'history', placeholder: 'Presentation... Anaesthetic history... Past medical history...' },
    { type: 'textarea', name: 'dh', label: 'drug history', datalist: true },
    { type: 'textarea', name: 'allergies' },
    { type: 'group', name: 'airway' },
    { type: 'textarea', name: 'discussions' },
  ],[
    { type: 'radio', name: 'frailty', label: 'frailty', options: ['1 Very fit', '2 well', '3 Managing well', '4 Vulnerable', '5 Mildly Frail', '6 Moderately frail', '7 Severely frail', '8 Very severely frail', '9 Terminal illness', 'N/a']},
    { type: 'group', name: 'observations' },
    { type: 'group', name: 'investigations' },
  ],[
    { type: 'checklists', name: 'risks' },
  ]
]
export const groups = {
  airway: [
    { type: 'radio', name: 'mallampati', label: 'Mallampati', options: ['Class 1', 'Class 2', 'Class 3', 'Class 4'] },
    { type: 'radio', name: 'calder', label: 'Calder', options: ['A', 'B', 'C'] },
    { type: 'radio', name: 'tmd', label: 'TMD', options: ['>6cm', '<6cm', 'n/a'] },
    { type: 'check', name: 'teeth', label: 'Teeth', header: true, options: ['No issues', 'Caps/crowns', 'Dentures'] },
    { type: 'textarea', name: 'airway comments' },
  ],
  observations: [
    { type: 'text', name: 'weight', placeholder: 'Weigth in kg' },
    { type: 'text', name: 'height', placeholder: 'Weigth in m' },
    { type: 'text', name: 'HR' },
    { type: 'text', name: 'BP' },
    { type: 'text', name: 'RR' },
    { type: 'text', name: 'SpO2' },
    { type: 'text', name: 'Temp' },
  ],
  investigations: [
    { type: 'date', name: 'covid test date' },
    { type: 'radio', name: 'covid', options: ['Positive', 'Negative', 'Pending', 'Not done'] },
    { type: 'date', name: 'blood result date' },
    { type: 'text', name: 'Hb' },
    { type: 'text', name: 'WBC' },
    { type: 'text', name: 'Plts' },
    { type: 'text', name: 'Na' },
    { type: 'text', name: 'K' },
    { type: 'text', name: 'Urea' },
    { type: 'text', name: 'Creat' },
    { type: 'text', name: 'PT' },
    { type: 'text', name: 'APTT' },
    { type: 'text', name: 'pH' },
    { type: 'text', name: 'BE' },
    { type: 'text', name: 'Lactate' },
    { type: 'text', name: 'ECG' },
    { type: 'text', name: 'ChestX' },
  ],
  risks: [
    ['Risks', 'Very common', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Extremely rare'],
    [
      ['GA (select all)'],
      ['Sore throat', 'Sickness', 'Shivering', 'Thirst', 'Temp memory loss'],
      ['Pain injection site', 'Minor lip tongue injury'],
      ['Minor nerve injury'],
      ['P. nerve damage (perm.)', 'Corneal abrasion', 'Dental requiring treatment', 'Anaphylaxis'],
      ['Anaesthetic awareness'],
      ['Vision loss', 'Death as direct', 'result of anaesthesia'],
    ],
    [
      ['Regional (select all)'],
      ['Low BP Sickness', 'Itching'],
      [],
      ['Headache', 'Respiratory depression'],
      ['High block', 'Temp nerve damage'],
      ['LA toxicity Infection', 'Perm. nerve damage'],
      [],
    ],
    [
      ['Lines (select all)'],
      [],
      [],
      ['Infection', 'Bleeding', 'Arrhythmia', 'Pneumothorax', 'thrombosis/embolu'],
      [],
      [],
      [],
    ]
  ]
};
