export default [
  {
    id: 'b6f219d0-f864-4a21-b034-23e4841e09fa',
    relatedServiceId: 11,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'Registration of Industrial Input for Customs Duty Exemption',
    startButton: {
      title: 'Start Service',
      screen: 'CustomsExemptionRegistration',
      url: 'https://il.moiat.gov.ae/en/NewRawMaterial',
    },
    aboutService: 'About this Service',
    description:
      'This service allows you to submit a registration request for raw materials, machinery, equipment, semi-finished or finished goods, and packaging materials, provided the industrial facility holds a valid industrial production license. It also enables you to apply for approval to exempt these items from customs duties, in order to benefit from customs exemptions.​',

    sections: [
      {
        serviceProcedures: [
          {
            text: 'Login or Register to the Ministry services digital platform',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to register a product for customs exemption',
          },
          {text: 'Attach all required documents'},
          {
            text: 'Pay the application fee',
          },
          {
            text: 'Meet the Ministry’s inspector',
          },
          {
            text: 'You will receive a digital copy of the product registration for customs exemption',
          },
        ],

        Requirements: [
          'Certified invoices including the HS Code for the materials to be imported',

          'Bill of Lading',
          'Materials list',
          'Certificate of origin',
        ],

        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/request-registration-of-industrial-input-for-customs-duty-exemption.ashx',
            name: 'Request Registration of Industrial Input for Customs Duty Exemption',
            size: '204 KB',
            type: 'application/pdf',
          },
          {
            name: 'UserManual - Request Registration of Industrial Input for Customs Duty Exemption',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---request-registration-of-industrial-input-for-customs-duty-exemption.ashx',
            size: '691 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],

    serviceFees: {
      serviceFees: 'AED 100 for each HS Code\nAED 100 for Inspection​',
      aed100: 'AED 100',
      hscodeRequestFee:
        '100 dirhams for each HS code. The inspection fee is 100 dirhams.',
      aed0: 'AED 0',
      note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',
    },

    serviceTime: '3 Working Days',
    package: 'Package',
    dutyExempotionPachage: [
      {
        documentText: 'Customs Exemption Package',
        url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/dutyexceptionpakcages.ashx',
        screen: '',
      },
    ],
    tags: {
      documentText: 'Connected to Customs Service',
      url: '',
      screen: 'Services',
    },
    faq: {
      name: 'FAQ',
      question:
        'How can i submit a request to register an item for customs exemption?',
      proceduresTitle: 'Service Procedures',
      requirementsTitle: 'Requirements',
      procedures: [
        'Login to the Ministry’s digital services platform',
        'Submit an application through the Ministry’s digital services platform',
        'Payment  the fees',
        'Application will be reviewed by relevant official',
        'In case of approval, the quantity will be added to the factory’s balance',
        'In case of rejection, the quantity will not be added to the factory’s balance',
        'Application will be referred to inspection if there is a need for checking the materials to be added',
        'Paying the inspection fees',
        'Visiting the facility and writing the technical report',
        'Materials will be added if the inspection report is approved',
      ],
      requirements: [
        'Industrial Production License',
        'Legalized/Attested Invoices [Legalization/Attestation is a service related to Ministry of Foreign Affairs and International Cooperation (MOFAIC)].',
        'Bill of lading',
        'Packing list',
        'Certificate of origin',
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24/7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: 'N/A',
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
    },
  },
  {
    id: '3d569f56-f2de-450c-b873-d5906fc837ad',
    relatedServiceId: 12,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title:
      'Increase the Quantity of a Industrial Input Registered for Customs Exemption',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/NewRawMaterial',
    },
    aboutService: 'About this Service',
    description:
      'This service allows you to request an increase in the quantity (in kilograms) of previously registered materials—including raw, semi-manufactured, fully manufactured, and packaging materials—to add to your balance for the purpose of applying for customs duty exemption.​',
    sections: [
      {
        serviceProcedures: [
          {text: 'Log in to MoIAT’s digital services platform (moiat.gov.ae)'},
          {
            text: 'Apply to increase the quantity of a registered material for customs exemption',
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the application fee'},
          {text: 'Pay the inspection fee'},
          {text: 'Receive the inspector'},
          {
            text: "Receive the Ministry's approval to increase the weight of the registered material in the factory's balance",
          },
        ],
      },
      {
        Requirements: [
          'Packing List',
          'Bill of Lading',
          'Certificate of Origin',
        ],
      },
      {
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/request-quantity-increase-for-a-registered-industrial-input.ashx',
            name: 'Request Quantity Increase for a Registered Industrial Input',
            size: '221 KB',
            type: 'application/pdf',
          },
          {
            title:
              'UserManual - Request Quantity Increase for a Registered Industrial Input',
            name: 'UserManual - Request Quantity Increase for a Registered Industrial Input',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---request-quantity-increase-for-a-registered-industrial-input.ashx',
            size: '668 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'AED 50 dirhams​'}, {value: 'AED 100 for Inspection​'}],
    },
    serviceTime: '3 Working Days',
    package: 'Package',
    dutyExempotionPachage: [
      {
        documentText: 'Customs Exemption Package',
        url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/dutyexceptionpakcages.ashx',
        screen: '',
      },
    ],
    tags: {
      documentText: 'Connected to Customs Service',
      url: '',
      screen: 'Services',
    },
    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'How can i apply for a quantity increase request regarding registered material?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          procedures: [
            'Login to the Ministry’s digital services platform',
            'Submit an application.',
            'Payment  the fees',
            'Application will be reviewed by relevant official',
            'In case of approval, the quantity will be added to the factory’s balance',
            'Application will be referred to inspection if there is a need to check the materials.',
            'Payment of inspection fees.',
            'Visiting the facility and writing of the report.',
            'Materials will be added if the inspection report is approved',
            'Application will be rejected if it is not approved.',
          ],
          requirements: [
            'Industrial Production License',
            'Legalized/Attested Invoices [Legalization/Attestation is a service related to Ministry of Foreign Affairs and International Cooperation (MOFAIC)].',
            'Bill of lading',
            'Packing list',
            'Certificate of origin',
          ],
        },
        {
          question: 'Information about invoices and their values',
          answers: 'Referred to the relevant team',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: 'N/A',
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
    },
  },

  // {
  //   id: 'e9cab842-e6b3-4d85-86d2-aa7f5aca194d',
  //   relatedServiceId: false,
  //   type: 'il',
  //   // Category_Id: '0a7acf8b-0383-4942-bca7-a086eac3c29c',
  //   title: 'Modify the initial approval certificate',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/en/InitialLicenseModification',
  //   },
  //   description:
  //     'This service allows the establishment to update and modify the information of the initial approval certificate.',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply to “Modify the initial approval certificate”',
  //         },
  //         {text: 'Application review by the designated employee'},
  //         {
  //           text: 'Approval of the modification if the data and attachments of the application are correct and compatible',
  //         },
  //         {
  //           text: 'Reject the application if the data and attachments of the application are inconsistent',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Initial Approval or Industrial License from a local licensing department (Mainland)',
  //       ],
  //     },
  //     {
  //       label: 'Files',

  //       filesSection: {
  //         fileName: 'File Name',
  //         fileSize: 'File Size',
  //         fileType: 'File Type',
  //       },
  //       filesList: [
  //         {
  //           title: ' UserManual - Modify the initial approval certificate',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/usermanual---modify-the-initial-approval-certificate.ashx',
  //           name: ' UserManual - Modify the initial approval certificate',
  //           size: '780 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees: 'AED 50',
  //     freeRenewal: 'Free Renewal',
  //     aed50: 'AED 50',
  //     hscodeRequestFee: 'For each HS code',
  //     aed0: 'AED 0',
  //     note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',
  //   },

  //   serviceTime: '3 Working Days',
  //   package: 'Package',

  //   tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'Q) What is the application process?',
  //         proceduresTitle: 'Service Procedures',
  //         requirementsTitle: 'Requirements',
  //         procedures: [
  //           "Apply through the Ministry's online e-services platform.",
  //           'Application is reviewed.',
  //           'Approval if data, attachments and application comply.',
  //           'Rejection if data, attachments and application do not comply.',
  //         ],
  //         requirements: [
  //           'Initial Approval or an Industrial License from a local licensing department.',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'Industrial Licensing Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Initial Approval Certificate',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   generalDocument: {
  //     title: 'General Documents',
  //     description:
  //       'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'Download',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Open 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['MasterCard', 'Visa'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Clean Water and Sanitation',
  //         'Decent Work and Economic Growth',
  //         'Industry, Innovation and Infrastructure',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: 'N/A',
  //     },
  //   },
  //   tutorialVideo: {
  //     title: 'Tutorial of applying for the service',
  //     url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
  //   },
  // },
  // {
  //   id: 'db3ac238-190d-4cf9-8ddf-e9d9de3c127f',
  //   relatedServiceId: false,
  //   type: 'il',
  //   // Category_Id: '0a7acf8b-0383-4942-bca7-a086eac3c29c',
  //   title: 'Renew Initial Approval Certificate',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/en/InitialLicenseRenewal',
  //   },
  //   description:
  //     'Renewal of the initial approval certificate for an additional year to complete the establishment of the factory and bring machinery, and equipment and start trial production.',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       note: 'Note: 100 dirhams will be charged for each month of delay, with a maximum of 1000 dirhams.',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply to “Renew the initial approval certificate”.',
  //         },
  //         {text: 'Payment of fees (non-refundable fees).'},
  //         {
  //           text: 'Application review by the designated employee.',
  //         },
  //         {
  //           text: 'Renewing the initial approval certificate or referring the application for inspection.',
  //         },
  //         {
  //           text: 'In the event of a referral for inspection, a fee of 100 dirhams will be charged for the inspection.',
  //         },
  //         {
  //           text: 'The inspector visits the facility and writes the inspection report.',
  //         },
  //         {
  //           text: 'Examination of the inspection report by the designated employee.',
  //         },
  //         {
  //           text: 'Renew the initial approval certificate in case of approval of the inspection report.',
  //         },
  //         {
  //           text: 'Reject the application if the inspection report is not approved.',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Initial approval or initial industrial license from one of the local licensing departments.',
  //       ],
  //     },
  //     {
  //       label: 'Files',

  //       filesSection: {
  //         fileName: 'File Name',
  //         fileSize: 'File Size',
  //         fileType: 'File Type',
  //       },
  //       filesList: [
  //         {
  //           title:
  //             'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //           name: 'serviceguide2022eng',
  //           size: '1219 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title:
  //             'Directory of digital services for the Ministry of Industry and Advanced Technology - Arabic Edition',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
  //           name: 'serviceguide2022arb',
  //           size: '2204 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees: 'Free Renewal',
  //     freeRenewal: 'Free Renewal',
  //     feeNote:
  //       'In the event of a referral for inspection, a fee of 100 dirhams will be charged for the inspection.Delay fines are 100 dirhams per month, with a maximum limit of 1000 dirhams',
  //     aed50: 'AED 50',
  //     hscodeRequestFee: 'For each HS code',
  //     price: 'AED 0',
  //     note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',
  //   },

  //   serviceTime: '3 Working Days',
  //   package: 'Package',

  //   tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question:
  //           'Q) What is the criteria for certification and how can I apply?',
  //         proceduresTitle: 'Service Procedures',
  //         requirementsTitle: 'Requirements',
  //         answers: [
  //           "Submit an application to renew your certificate through the Ministry's online e-services platform",
  //           'The application is reviewed by the relevant team',
  //           'If the application is successful, an initial approval certificate will be issued. The application may be referred for further inspection',
  //           'If inspection is required, the applicant will need to pay a AED 100 inspection fee',
  //           'The inspector will visit the facility and write an inspection report',
  //           'The relevant official will evaluate the inspection report',
  //           'If approved, an initial approval certificate will be issued',
  //           'Note: A penalty fee of AED 100 per month is payable in case of late renewal. A maximum of AED 1,000 will be collected.',
  //         ],
  //         requirements: [
  //           'Initial Approval or Initial Industrial License from a local licensing department',
  //         ],
  //       },
  //       {
  //         question:
  //           'Q) In what case will the application be referred for inspection?',
  //         answers: ['A) If the factory requests to import machinery.'],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'Industrial Licensing Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Initial Approval Certificate',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   generalDocument: {
  //     title: 'General Documents',
  //     description:
  //       'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'Download',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Open 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['MasterCard', 'Visa'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Clean Water and Sanitation',
  //         'Decent Work and Economic Growth',
  //         'Industry, Innovation and Infrastructure',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'Departments of economic development',
  //         'Ministry of Human Resources and Emiratisation',
  //         'Federal Authority for Identity and Nationality',
  //         'Customs and port authorities',
  //         'Local customs departments',
  //       ],
  //     },
  //   },
  //   tutorialVideo: {
  //     title: 'Tutorial of applying for the service',
  //     url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
  //   },
  // },
  // {
  //   id: '7b1987a7-0fa5-441e-a244-c2b23bebed97',
  //   relatedServiceId: false,
  //   type: 'il',
  //   // Category_Id: '0a7acf8b-0383-4942-bca7-a086eac3c29c',
  //   title: 'Issue Initial Approval Certificate',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/en/InitialIndustrialLicense?addFactory=True',
  //   },
  //   description:
  //     'This certificate serves as a no-objection declaration from the Ministry for the owner of the industrial project to complete the procedures related to the approvals from the concerned departments and start establishing the factory, connecting the electric power, bringing machinery and equipment, and starting experimental production.',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       note: 'Note: 100 dirhams will be charged for each month of delay, with a maximum of 1000 dirhams.',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply to “Issue initial approval certificate”',
  //         },
  //         {text: 'Payment of fees (Application fees are not refundable)'},
  //         {
  //           text: 'Application review by the designated employee',
  //         },
  //         {
  //           text: 'In case of approval, a certificate of initial approval will be issued, or the certificate will not be issued if the application is rejected.',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Initial approval certificate or industrial license from the local authorities.',
  //         'Identification documents for all owners (example: Emirates ID, passport, trade license).',
  //         'The total number of employees shall not be less than 10 employees.',
  //         'The total capital of the factory shall not be less than 250 thousand dirhams.',
  //         'Sing undertaking to comply with all applicable laws and regulations in the country and to implement their provisions related to industrial security, public health, and environmental preservation.',
  //       ],
  //     },
  //     {
  //       label: 'Files',

  //       filesSection: {
  //         fileName: 'File Name',
  //         fileSize: 'File Size',
  //         fileType: 'File Type',
  //       },
  //       filesList: [
  //         {
  //           title: 'Application Form ',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-initial-approval-service.ashx',
  //           name: 'Issue Initial Approval Service',
  //           size: '221 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'User Guide - Arabic',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/user-guide---ar---issue-initial-approval-certificate.ashx',
  //           name: 'User Guide - AR - Issue Initial Approval Certificate',
  //           size: '712 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'UserManual - Issue Initial Approval Certificate',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---issue-initial-approval-certificate.ashx',
  //           name: 'UserManual - Issue Initial Approval Certificate',
  //           size: '680 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees: 'AED 1,000',

  //     price: 'AED 0',
  //     note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',
  //   },

  //   serviceTime: '1 Working Days',
  //   package: 'Package',

  //   tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question:
  //           'Q) What is the criteria for certification and how can I apply?',
  //         proceduresTitle: 'Service Procedures',
  //         requirementsTitle: 'Requirements',
  //         answers: [
  //           "Login or register on the Ministry's online e-services platform.",
  //           'Submit an Issue Initial Approval Certificate application.',
  //           'Pay the application fee (fee is non-refundable).',
  //           'Application is reviewed by the Ministry.',
  //           'If the application is successful, an initial approval certificate will be issued.',
  //         ],
  //         requirements: [
  //           'Initial Approval Certificate from a local licensing authority (e.g. Departments of Economy).',
  //           'Identification documents of all owners (e.g. UAE ID, Passport, and Trade License).',
  //           'At least 10 employees within your organization.',
  //           'Total manufacturing facility capital of at least AED 250,000.',
  //           'You must abide by all laws and regulations in the country, including industrial security, public health and environmental conservation.',
  //         ],
  //       },
  //       {
  //         question: 'Q) Can the certificate be renewed? If so, how?',
  //         answers: [
  //           'A) Initial approval is renewed annually through the website (e-services platform)',
  //         ],
  //       },
  //       {
  //         question:
  //           'Q) Is it possible to import equipment and machinery to the factory when the certificate is obtained (before obtaining an industrial production license?)',
  //         answers: [
  //           'A) In this case, the application will be referred to the relevant team',
  //         ],
  //       },
  //       {
  //         question: 'Q) For how long is the certificate valid?',
  //         answers: ['A) 1 year'],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'Industrial Licensing Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Initial Approval Certificate',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   generalDocument: {
  //     title: 'General Documents',
  //     description:
  //       'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'Download',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Open 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['MasterCard', 'Visa'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Clean Water and Sanitation',
  //         'Decent Work and Economic Growth',
  //         'Industry, Innovation and Infrastructure',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'Departments of economic development.',
  //         'Ministry of Human Resources and Emiratisation',
  //         'Federal Authority for Identity and Nationality',
  //         'Customs and port authorities',
  //         'Local customs departments',
  //       ],
  //     },
  //   },
  //   tutorialVideo: {
  //     title: 'Tutorial of applying for the service',
  //     url: 'https://youtu.be/rlW44d4F0XQ',
  //   },
  // },
  // {
  //   id: '248e406f-766e-46ef-9e64-f2461ffe8bbb',
  //   relatedServiceId: false,
  //   type: 'il',
  //   // Category_Id: '0a7acf8b-0383-4942-bca7-a086eac3c29c',
  //   title: 'Cancel Initial Approval Certificate',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/en/InitialLicenseCancellation',
  //   },
  //   description:
  //     'This service allows the establishment to cancel the initial approval certificate.',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       note: 'Note: If the certificate is not valid, 100 dirhams will be charged for each month of delay, with a maximum of 1000 dirhams.',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply “Cancel initial approval certificate”',
  //         },
  //         {
  //           text: 'Application review by the designated employee',
  //         },
  //         {
  //           text: 'If the application is approved, a cancellation letter will be issued',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Official letter from the establishment to cancel the license',
  //       ],
  //     },
  //     {
  //       label: 'Files',
  //       filesSection: {
  //         fileName: 'File Name',
  //         fileSize: 'File Size',
  //         fileType: 'File Type',
  //       },
  //       filesList: [
  //         {
  //           title: 'UserManual - Cancel Initial Approval Certificate',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---cancel-initial-approval-certificate.ashx',
  //           name: 'UserManual - Cancel Initial Approval Certificate',
  //           size: '556 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees:
  //       'Free Renewal - Delay fines are 100 dirhams per month, with a maximum limit of 1000 dirhams',
  //     price: 'AED 0',
  //     note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',
  //   },
  //   serviceTime: '2 Working Days',
  //   package: 'Package',

  //   tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'Q) How can I cancel an Initial Approval Certificate?',
  //         proceduresTitle: 'Service Procedures',
  //         requirementsTitle: 'Requirements',
  //         answers: [
  //           'Apply for a cancellation through the Ministry’s online e-platform services.',
  //           'Request is reviewed.',
  //           'If the application is approved, a cancelation note will be issued.',
  //           'Note: If the certificate is expired, a penalty of AED 100 per month, up to a maximum of AED 1,000, will be collected.',
  //         ],
  //         requirements: [
  //           'An official cancelation request letter from the establishment.',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'Industrial Licensing Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Initial Approval Certificate',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   generalDocument: {
  //     title: 'General Documents',
  //     description:
  //       'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'Download',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Open 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['MasterCard', 'Visa'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Clean Water and Sanitation',
  //         'Decent Work and Economic Growth',
  //         'Industry, Innovation and Infrastructure',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'Local licensing authorities (departments of economic development)',
  //       ],
  //     },
  //   },
  // },
  // {
  //   id: '9991b96b-e3fd-4b7b-afd9-3eb34134920e',
  //   relatedServiceId: 21,
  //   type: 'il',
  //   Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
  //   title: 'Modify Industrial Production License',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/en/IndustrialLicenseModification',
  //   },
  //   description:
  //     "Is to amend the factory data in the Ministry's industrial register",
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       note: '',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply to “Modify industrial production license”',
  //         },
  //         {
  //           text: 'Reviewing the application details: trade name, legal entity, change of owners, change of financial data, change of raw materials record, change of products record, change of contact details, capital and workers',
  //         },
  //         {
  //           text: 'Payment of fees',
  //         },
  //         {
  //           text: 'The application shall be approved if the data and attachments are correct',
  //         },
  //         {
  //           text: 'In case of the following amendments: change of activity and site for inspection',
  //         },
  //         {
  //           text: 'Pay the application and inspection fees',
  //         },
  //         {
  //           text: 'Inspecting the establishment to ensure that it conforms to the conditions of the industrial license',
  //         },
  //         {
  //           text: 'Approval of the amendment if the data and attachments are correct',
  //         },
  //         {
  //           text: 'Reject the application if the data and attachments are incorrect',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Attach the documents that the customer wishes to amend.',
  //         '(Business name, legal entity, change of owners, capital) required documents are:',
  //         '- A copy of the valid local license.',
  //         '- A copy of the amended partnership contract.',
  //         '- A copy of the family book for the citizen and the passport and residence permits for the non-citizen.',
  //         '(Change of financial statements, change of raw materials record, change of products record, change of factory address), no documents are required.',
  //         '(Change of location, change of activity) required documents are:',
  //         '- A copy of the local license.',
  //         '- Location (on the map).',
  //         '- Inspection report.',
  //         '(Employment) official document from the Ministry of Human Resources and Emiratization stating the staff details of the establishment.',
  //         'Amended local license certificate that is matching the required amendment.',
  //       ],
  //     },
  //     {
  //       label: 'Files',
  //       filesSection: {
  //         fileName: 'File Name',
  //         fileSize: 'File Size',
  //         fileType: 'File Type',
  //       },
  //       filesList: [
  //         {
  //           title: 'Application Form',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/modify-industrial-production-license.ashx',
  //           name: 'Modify Industrial Production License',
  //           size: '321 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'UserManual - Modify Industrial Production License',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---modify-industrial-production-license.ashx',
  //           name: 'UserManual - Modify Industrial Production License',
  //           size: '871 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees:
  //       '100 AED Inspection Fees\nDelay fines are 100 dirhams per month, with a maximum limit of 1000 dirhams\n250 AED Modify Certificate Fees\nDelay fines are 100 dirhams per month, with a maximum limit of 1000 dirhams',
  //     price: 'AED 0',
  //     note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',
  //   },
  //   serviceTime: '3 Working Days',
  //   package: 'Package',

  //   tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question:
  //           'Q) What are the requirements for the service, and how can I apply for it?',
  //         proceduresTitle: 'Service Procedures',
  //         requirementsTitle: 'Requirements',
  //         answers: [
  //           "Login or register to the Ministry's e-services platform.",
  //           'Completing the application and inputting the following information: trade name, legal entity, ownership change, modification of financial statements, changing raw material record, changing product record, changing communication data, capital and employees.',
  //           'Payment of fees.',
  //           'Application is approved if the data and attachments are correct.',
  //           'Application is referred to inspection if there is a change of activity or location.',
  //           'Payment of application and inspection fees.',
  //           'Inspection of the facility to ensure that it complies with the conditions of the industrial license.',
  //           'Amendment is approved if data and attachments are correct.',
  //         ],
  //         requirements: [
  //           'Attach the documents you wish to amend (trade name, legal entity, ownership change, capital), while providing: - Copy of a valid local license - Copy of the amended partnership contract - Copy of family book for citizens, or passport and residence permit for non-citizens.',
  //           'For modification of financial statements, changing raw material record, changing product record, changing the factory’s address, no documents are required.',
  //           'For location change or activity change, the following documents are needed: - Copy of the local license - Map - Inspection report - Workers statement from the Ministry of Labor - Existence of the amendment in the local license certificate.',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'Industrial Licensing Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Modify Industrial License',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   generalDocument: {
  //     title: 'General Documents',
  //     description:
  //       'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'Download',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Open 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['MasterCard', 'Visa'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Clean Water and Sanitation',
  //         'Decent Work and Economic Growth',
  //         'Industry, Innovation and Infrastructure',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'Local licensing authorities (departments of economic development)',
  //       ],
  //     },
  //   },
  //   tutorialVideo: {
  //     title: 'Tutorial of applying for the service',
  //     url: 'https://youtu.be/pfKXrFJ3laE',
  //   },
  // },
  // {
  //   id: 'a2af409c-d022-497f-8578-ba93802f3acd',
  //   relatedServiceId: 1052,
  //   Category_Id: 'd5685023-9f9c-450a-a9c3-415af1c6c144',
  //   title: 'Issue License to Use National Conformity Marks',
  //   startButton: {
  //     url: 'https://eservices.moiat.gov.ae/eservices/issue-license-of-use-made-in-the-emirates-mark?lang=en',
  //   },
  //   description:
  //     'Issuance License of Made in the Emirates Mark According to the technical requirements of Cabinet Resolution No. 16 for the year 2023',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       serviceProcedures: [
  //         {
  //           text: "Login or Register to the digital platform for the Ministry's services",
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply for made in the Emirates mark service',
  //         },
  //         {
  //           text: 'Pay the fees',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Valid Industry production License issued by MOIAT',
  //         'Product conformity document (national conformity mark / certificate of conformity)',
  //         'Fees',
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees: 'AED 100',
  //     price: 'AED 100',
  //     note: 'Issue the License of use made in the Emirates mark for 3 years',
  //   },
  //   serviceTime: '6 Working Days',
  //   package: 'Package',

  //   tags: {},
  //   faq: {},
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'Conformity Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'National Conformity Marks',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'All UAE manufacturers',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   generalDocument: {
  //     title: 'General Documents',
  //     description:
  //       'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'Download',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Open 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['MasterCard', 'Visa'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Good Health And Well-Being',
  //         'Decent Work and Economic Growth',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'Issue Industrial Production License',
  //         'Issuance of license Certificate to use of National Conformity Marks',
  //         'Issue Certificate of Conformity (ECAS )',
  //         'Issue conformity certificate for non-regulated products',
  //       ],
  //     },
  //   },
  // },
  {
    id: 'a2af409c-d022-497f-8578-ba93802f3acd',
    relatedServiceId: 1052,
    Category_Id: 'd5685023-9f9c-450a-a9c3-415af1c6c144',
    title: 'Expand the Scope of National Marks for Conformity​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/scope-expansion-of-the-emirates-quality-mark?lang=en',
    },
    description:
      '​This service allows products to be added to licenses issued for national conformity marks within their validity period.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: 'Log in to MoIAT’s digital services platform (moiat.gov.ae)​',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to expand the scope of national conformity marks​',
          },
          {
            text: 'Attach all required documents​',
          },
          {
            text: 'Conduct a field assessment​​',
          },
          {
            text: 'Pay the applicable fees​​',
          },
          {
            text: 'You will receive a digital copy of the license to use national conformity marks​',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A test report from an accredited laboratory according to a specification approved by the Ministry. ',
          'The facility/product meets the required standards based on the type of mark (product conformity certificate or field visit report).​',
        ],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Quality Documents',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/scope-expansion-of-the-emirates-quality-mark.ashx',
            name: 'Scope Expansion of the Emirates Quality Mark',
            size: '224 KB',
            type: 'application/pdf',
          },
          {
            title: 'EQM Expansion User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/eqm-expansion-user-manual.ashx',
            name: 'EQM Expansion User Manual',
            size: '962 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'AED 250',
      price: 'AED 250',
      note: '',
    },
    serviceTime: '5 Working Days',
    package: 'Package',

    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I add the Emirates Quality Mark to my new products?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          answers: [
            'Login to the Ministry’s online e-services platform and apply',
            'Attach the required documents',
            'Payment of fees',
            'Review the document',
            'Facility field visit',
            'Certificate is obtained',
          ],
          requirements: ['Valid Emirates Quality Mark License'],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'National Conformity Marks',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Issuance of license Certificate to use National Conformity Marks',
        ],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://youtu.be/tyABE4hH0DE',
    },
  },
  {
    id: '19284b01-8a08-4000-9fe6-26053f43e0f5',
    relatedServiceId: 9,
    Category_Id: 'd5685023-9f9c-450a-a9c3-415af1c6c144',
    title: 'Issuance of license Certificate to use National Conformity Marks',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-license-to-use-the-emirates-quality-mark?lang=en',
    },
    description:
      'This service allows you to apply for a license to use national conformity marks, which certify that products and establishments comply with the requirements specified in eco-label regulations and related legislation. It covers several marks, including the Emirates Quality Mark, the National Halal Mark, the Eco-label, and the Made in the UAE mark.​​​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {text: 'Log in to MoIAT’s digital services platform (moiat.gov.ae)'},
          {
            text: 'Submit an application for a license to use national conformity marks(attach the service link on the website)​',
          },
          {text: 'Attach all required documents'},
          {text: 'Complete a field assessment​'},
          {text: 'Pay the applicable fees'},
          {
            text: 'You will receive a digital copy of the license to use national conformity marks',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A test report from an accredited laboratory according to a specification approved by the Ministry',
          'The facility/product meets the required standards based on the type of mark (product conformity certificate or field visit report)',
        ],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Quality Documents',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-license-to-use-the-emirates-quality-mark.ashx',
            name: 'Issue License to use the Emirates Quality Mark',
            size: '239 KB',
            type: 'application/pdf',
          },
          {
            title: 'User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/eqm-user-manual.ashx',
            name: 'EQM User Manual',
            size: '991 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'AED 2,500 per day and a resident'},
        {
          value:
            'Technical assessment to obtain a National Conformity Mark license:',
        },
        {
          value:
            'AED 2,000: Issuance of a three-year license certificate for the use of National Conformity Marks from the Ministry or a designated conformity assessment body',
        },
        {value: 'AED 670: Conformity certificate fee'},
      ],
    },
    serviceTime: 'Instant Service - 6 Working Days​',
    package: 'Package',

    tags: {},
    faq: {
      items: [
        {
          question: 'How can I obtain the Emirates Quality Mark?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login or register on the Ministry’s online e-services platform',
            'Apply for service',
            'Attach the required documents',
            'Payment of fees',
            'Review the document',
            'Facility field visit',
            'Certificate is obtained',
          ],
          requirements: [
            'Valid UAE Industry/Trade License (or declaration of accountability for factories outside the UAE)',
            'Test report from an accredited laboratory based on approved standards by the relevant authority',
            'Factory field visit',
            'Online declaration of conformity',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'National Conformity Marks',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value:
          'Industrial establishments​​\nSupply and Distribution Companies​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://youtu.be/tZrlcg5Yrw8',
    },
  },
  {
    id: 'ec6ebea5-7fef-4dfe-bda7-be2dbbd8b1b6',
    relatedServiceId: 1027,
    Category_Id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
    title:
      'Issue UAE Certificates of Conformity for Products not Subject to Technical Regulations​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-conformity-certificate-for-unregulated-products?lang=en',
    },
    description:
      '​This service allows you to apply for a UAE Certificate of Conformity for products that are not subject to technical regulations. Customers can obtain this certificate upon request.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: 'Login or Register to the Ministry services digital platform',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply for a UAE Certificate of Conformity for Products not Subject to Technical Regulations​',
          },
          {
            text: 'Attach the required documents',
          },
          {
            text: 'Conduct a field assessment (if needed)​',
          },
          {
            text: 'Pay the applicable fees​',
          },
          {
            text: "You will receive a digital copy of the product's UAE Certificate of Conformity​​",
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A valid commercial license​e',
          'A product test report issued by an accredited laboratory​',
          'A declaration and pledge of continued product conformity​​',
          'Technical documentation for the product​',
        ],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'List of technical requirements for regulated products',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/cad-regulated-sheet.ashx',
            name: 'CAD Regulated Sheet',
            size: '262 KB',
            type: 'application/pdf',
          },
          {
            title: 'Quality Documents',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {
          value:
            'AED 600: Apply to register products and services in the UAE Conformity Assessment System​',
        },
        {
          value:
            'AED 620: Technical review of documents for each conformity certificate​​',
        },
        {
          value:
            'AED 500: Issuance of a conformity certificate from the Ministry​​',
        },
        {
          value:
            'AED 2,500: One working day/technical assessor (if a technical assessment is conducted)​​',
        },
        {
          value:
            'Conducting a technical assessment of establishments for registration in the UAE Conformity Assessment System​​',
        },
      ],
    },

    serviceTime: '6 Working Days',
    package: 'Package',

    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I obtain a conformity certificate if my product is unregulated by the Ministry?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login or register on the Ministry’s online e-services platform',
            'Apply for service',
            'Attach the required documents',
            'Payment of fees',
            'Review the document',
            'Certificate is obtained',
          ],
          requirements: [
            'Copy of valid UAE Industry/Trade License for Businesses',
            'Test report from an accredited laboratory',
            'Online declaration of conformity continuity',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Non-Regulated Products',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial Establishments\nSupply and Distribution Companies​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://youtu.be/rS6DMhG8MWY',
    },
  },
  {
    id: 'ec6ebea5-7fef-4d2e-bda7-b22dbbd8b1b6',
    relatedServiceId: 8,
    Category_Id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
    title:
      'Issue UAE Certificates of Conformity for Products Subject to Technical Regulations​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-conformity-certificate-for-unregulated-products?lang=en',
    },
    description:
      'This service allows you to apply for a UAE Certificate of Conformity for products subject to technical regulations (as outlined by regulatory decisions issued by the Ministry of Industry and Advanced Technology), confirming that the products comply with the approved standard specifications in the country. This facilitates and streamlines the process of product entry and circulation in the country’s markets.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'Create an account or log in to MoIAT’s digital services platform',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply for a UAE Certificate of Conformity for products subject to technical regulations',
          },
          {
            text: 'Attach all required documents',
          },
          {
            text: 'Field assessment (if needed)',
          },
          {
            text: 'Pay fees',
          },
          {
            text: "You will receive a digital copy of the product's UAE Certificate of Conformity​",
          },
        ],
      },
      {
        Requirements: [
          'A valid commercial license',
          'A product test report issued by an accredited laboratory',
          'A declaration and pledge of continued product conformity',
          'Technical documentation for the product',
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value:
            'AED 600: Apply to register products and services in the UAE Conformity Assessment System​',
        },
        {
          value:
            'AED 620: Technical review of documents for each conformity certificate​​',
        },
        {
          value:
            'AED 500: Issuance of a conformity certificate from the Ministry​​',
        },
        {
          value:
            'AED 2,500: One working day/technical assessor (if a technical assessment is conducted)​​',
        },
        {
          value:
            'Conducting a technical assessment of establishments for registration in the UAE Conformity Assessment System​​',
        },
      ],
    },

    serviceTime: '2 Working Days',
    package: 'Package',

    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I obtain a conformity certificate if my product is unregulated by the Ministry?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login or register on the Ministry’s online e-services platform',
            'Apply for service',
            'Attach the required documents',
            'Payment of fees',
            'Review the document',
            'Certificate is obtained',
          ],
          requirements: [
            'Copy of valid UAE Industry/Trade License for Businesses',
            'Test report from an accredited laboratory',
            'Online declaration of conformity continuity',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Non-Regulated Products',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial Establishments\nSupply and Distribution Companies​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://youtu.be/rS6DMhG8MWY',
    },
  },
  {
    id: 'f93e4d52-19e0-4b46-aca3-f7e61dd3b4b6',
    relatedServiceId: 1053,
    title: 'Issue Product Status Statement for Used Imported Vehicles',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-label-card-for-used-imported-vehicles?lang=en',
    },
    description:
      'This service allows you to apply for a product status statement for imported used vehicles, confirming that they are eligible for registration in the traffic system and can be used in the country.​​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Create an account or log in to the ministry's digital services platform (moiat.gov.ae)",
          },
          {
            text: 'Apply to issue a product status statement for imported used vehicles​',
          },
          {text: 'Pay fees'},
          {
            text: 'You will receive a digital copy of the product statement for imported used vehicles',
          },
        ],
      },
      // {
      //   label: 'Requirements',
      //   Requirements: [
      //     'Copy of UAE ID',
      //     'Vehicle’s unified identification number',
      //   ],
      // },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title:
              'Product identification card to verify used imported vehicles',
            url: '',
            name: 'Product identification card',
            size: '',
            type: '',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'Product Status Statement issuance fee: AED 200​',
      price: 'AED 200',
      note: '',
    },
    serviceTime: 'Instant Service',
    package: 'Package',

    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I obtain a product status statement for imported used vehicles?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login or register to the Ministry’s online e-services platform and apply',
            'Attach the required documents',
            'Payment of fees',
            'Certificate is obtained',
          ],
          requirements: [
            'Copy of UAE ID',
            'Vehicle’s unified identification number',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Vehicles',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies\nIndividuals',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Issuing a product identification card to verify used imported vehicles',
        ],
      },
    },
  },
  {
    id: '7a158d3d-6e40-40b8-9850-2bd44c6aa995',
    relatedServiceId: 1053,
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    title: 'Issue product label cards for Used Imported Vehicles',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-label-card-for-used-imported-vehicles?lang=en',
    },
    description:
      'This service allows you to apply for a product label card for imported used vehicles, confirming that they are free from a list of damages that could affect their safety. This helps individuals ensure the vehicle’s safety and condition before purchasing.​​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Create an account or log in to the ministry's digital services platform(moiat.gov.ae)​",
          },
          {
            text: 'Apply to issue a product statement card for imported used vehicles​',
          },
          {text: 'Pay fees​'},
          {
            text: 'You will receive a digital copy of the product statement for importedused vehicles​',
          },
        ],
      },
      // {
      //   label: 'Requirements',
      //   Requirements: [
      //     'A copy of a valid commercial/industrial license for companies',
      //     'Or a copy of an ID card for individuals',
      //     'A copy of at least one of the following documents: customs declaration / invoice / inspection report / product list',
      //     'A photo of the product (if applicable)',
      //   ],
      // },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'User Guide',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/vpc-user-manual.ashx',
            name: 'VPC User Manual',
            size: '665 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees:
        'AED 1 for each Statement Card (7 cards per vehicle, combined in one card)​',
      price: '7 dirhams',
      note: '',
    },
    serviceTime: 'Instant Service',
    package: 'Package',

    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I obtain a product status card for imported used vehicles?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login to the Ministry’s online e-services platform and apply',
            'Attach the required documents',
            'Payment of fees',
            'Certificate is obtained',
          ],
          requirements: ['Product status statement for used vehicles'],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Products subject to and not subject to technical regulations',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies\nIndividuals​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
  },
  {
    id: '4fd998b6-9bd4-44f3-a1ac-a5743e166014',
    relatedServiceId: 12,
    title: 'Issue Product Label Card for Vehicle Tires​',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-a-product-label-card?lang=en',
    },
    description:
      'This service allows you to apply for a product label card for vehicle tires. The card is affixed to the tires to enable customers and regulatory authorities to verify that the product complies with national specifications and standards. It also allows the product to be tracked in the market through the RFID system, thereby enhancing safety and security for both the public and the customer.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Create an account or log in to the ministry's digital services platform (moiat.gov.ae)",
          },
          {
            text: 'Submit a request for a product information card for vehicle tires',
          },
          {text: 'Pay fees'},
          {text: 'You will receive a digital copy of the cards'},
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A valid trade license',
          'A Gulf Certificate of Conformity​',
          'A letter from the factory authorizing the distribution of the product in the country​',
        ],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Quality Documents',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'RFID User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/rfid-user-manual.ashx',
            name: 'RFID User Manual',
            size: '828 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'AED 1 For each Statement Card ​',
      price: 'AED 1',
      note: '',
    },
    serviceTime: 'Instant Service',
    package: 'Package',

    tags: {},
    faq: {items: []},
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'GSO Tires',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value:
          'Industrial Establishments\nSupply and Distribution Companies\nIndividuals​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Attestation of Conformity Certificate issued by GCC Standardization Organization (GSO)',
        ],
      },
    },
  },
  {
    id: 'd706a181-f3b2-4a8b-bcad-f9d3c84266f6',
    relatedServiceId: 10,
    title: 'Issue Product Status Statement for Drones',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-status-statement-for-drones?lang=en',
    },
    description:
      "This service allows you to apply for a product status statement for products and systems used in aircraft and unmanned aerial vehicles (UAVs) to ensure they meet specified requirements, such as permitted altitude, range, and radio frequencies. It also enables you to obtain a product status card, which can be attached to aircraft or UAVs for identification or tracking purposes within the country's markets or airspace. This helps ensure the safety and security of users and the public.​",
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Create an account or log in to the Ministry's digital services platform (moiat.gov.ae)",
          },
          {text: 'Submit a drone product status statement request'},
          {text: 'Attach all required documents'},
          {text: 'Pay the application fee'},
          {
            text: 'You will receive a digital copy of the product status statement',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'For professionals:\n- Valid commercial/industrial license (with activity related to the product).\n- Emirates ID of the applicant.\n- Product technical specification information.\n- Copy of the user guide for the product.\n- Picture of the product.\n- Product manufacturer serial number.\n- Acknowledgment of the specifications according to the Board of Directors Resolution No. (22) for the year 2019.\n- Security clearance from the General Authority of Civil Aviation.\n- Subscription to the electronic publications of the General Authority of Civil Aviation.',
          'For suppliers:\n- Valid commercial/industrial license (with activity related to the product).\n- Approval from the Telecommunications and Digital Government Regulatory Authority.\n- Product test certificate from the Telecommunications and Digital Government Regulatory Authority.\n- Copy of the product user manual.\n- Picture of the product.\n- Acknowledgment of the specifications according to the Board of Directors Resolution No. (22) for the year 2019.',
          'For individuals:\n- Copy of Emirates ID (passport for non-residents).\n- Product technical specification information.\n- Copy of the product user manual.\n- Picture of the product.\n- Copy of the product serial number.',
        ],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Drone LoC User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/drone-loc-user-manual.ashx',
            name: 'Drone LoC User Manual',
            size: '1090 KB',
            type: 'application/pdf',
          },
          {
            title: 'Drone To Buyer Transfer User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/drone-to-buyer-transfer-user-manual.ashx',
            name: 'Drone To Buyer Transfer User Manual',
            size: '373 KB',
            type: 'application/pdf',
          },
          {
            title: 'Drone To POS Transfer User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/drone-to-pos-transfer-user-manual.ashx',
            name: 'Drone To POS Transfer User Manual',
            size: '380 KB',
            type: 'application/pdf',
          },
          {
            title: 'Drone To Seller Transfer User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/drone-to-seller-transfer-user-manual.ashx',
            name: 'Drone To Seller Transfer User Manual',
            size: '369 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'AED 200',
    },
    serviceTime: '5 Working Days',
    package: 'Drone Package (PDF)',

    tags: {},
    faq: {
      items: [
        {
          question: 'How can I obtain a product status statement for drones?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login or register on the Ministry’s online e-services platform',
            'Apply',
            'Attach the required documents',
            'Payment of fees',
            'Certificate is obtained',
          ],
          requirements: [
            'Copy of Valid UAE Industry/Trade License (with activity related to the product)',
            'Approval from the Telecommunications and Digital Government Regulatory Authority',
            'Product test certificate from the Telecommunications and Digital Government Regulatory Authority',
            'Copy of the product user manual',
            'Product picture',
            'Declaration of features',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Products subject to and not subject to technical regulations',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value:
          'Industrial Establishments\nSupply and Distribution Companies\nIndividuals​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'Package',
      description: 'Drone Package (PDF) - Available only in Arabic',
      size: 'N/A',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/dronepackages.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
  },
  {
    id: 'd334638a-e3c6-49ae-b52f-04928357e8d3',
    relatedServiceId: 'link',
    title: 'Issue Product Efficiency Card​',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.esma.gov.ae/app/ProductEfficiencyCard/?lang=en',
    },
    description:
      'This service allows you to apply for labels that indicate the energy efficiency of electrical appliances or the environmental performance of water-saving appliances and paints, for products that have obtained a UAE Conformity Certificate or the National Conformity Mark.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: 'Create an account or log in to MoIAT’s digital services platform (moiat.gov.ae)',
          },
          {text: 'Submit a product performance card application'},
          {text: 'Pay fees'},
          {text: 'You will receive a digital copy of the cards'},
        ],
      },
      {
        label: 'Requirements',
        Requirements: ['UAE Certificate of Conformity​'],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'User Manual - AR - Issue a Product Efficiency Card',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual-ar---issue-a-product-efficiency-card.ashx',
            name: 'UserManual AR - Issue a Product Efficiency Card',
            size: '591 KB',
            type: 'application/pdf',
          },
          {
            title: 'Green Label Issuance User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/green-label-issuance-user-manual.ashx',
            name: 'Green Label Issuance User Manual',
            size: '660 KB',
            type: 'application/pdf',
          },
          {
            title: 'Quality Documents',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'Application Form - Issue a Product Efficiency Card',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-a-product-efficiency-card.ashx',
            name: 'Issue a Product Efficiency Card',
            size: '198 KB',
            type: 'application/pdf',
          },
          {
            title: 'Energy Efficiency Labels User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/energy-efficiency-labels-user-manual.ashx',
            name: 'Energy Efficiency Labels User Manual',
            size: '690 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {
          value:
            'According to the number of stars (1-5-7-10), dirhams according to the star classification of the conformity certificate',
        },
        {
          value:
            'According to the number of stars (1-5-7-10) ,dirhams according to the star classification of the conformity certificate​',
        },
        {value: 'Energy efficiency card for level (1) star: AED 10/card'},
        {value: 'Energy efficiency card for level (2) star: AED 7/card'},
        {value: 'Energy efficiency card for level (3) star: AED 5/card'},
        {value: 'Energy efficiency card for level (4) star: AED 1/card'},
        {value: 'Energy efficiency card for level (5) star: Free'},
      ],
    },
    serviceTime: 'Instant Service',
    package: 'Package',

    tags: {},
    faq: {items: []},
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Efficiency Labels',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial Establishments\nSupply and Distribution Companies​​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['None'],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://youtu.be/NX_LNn4mITU',
    },
  },
  {
    id: 'e477000f-f585-4d72-bc8e-d84a08624cc1',
    relatedServiceId: 1054,
    title: 'Issue Product Status Statement for Customs Shipment',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-status-statement-for-customs-shipment?lang=en',
    },
    description:
      'This service allows you to submit a request for a product status statement to clear a customs shipment of products subject to mandatory regulations that do not have a UAE Certificate of Conformity at the country’s border crossings. The products must not be traded in the domestic market until a UAE Certificate of Conformity is obtained or they are re-exported outside the country within six months.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: 'Create an account or log in to MoIAT’s digital services platform (moiat.gov.ae)​',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to issue a product status statement for customs clearance​',
          },
          {
            text: 'Attach the required documents',
          },
          {
            text: 'Pay the fees',
          },
          {
            text: 'You will receive a digital copy of the product status statement for customs clearance​',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A copy of the valid commercial/industrial license for companies',
          'Or a copy of an ID card for individuals​',
          'A copy of at least one of the following documents: customs declaration / invoice / inspection statement / product list',
          'A picture of the product (if any)',
        ],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title:
              'Application Form - Issue Product Status Statement for Customs Shipment',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-product-status-statement-for-customs-shipment.ashx',
            name: 'Issue Product Status Statement for Customs Shipment',
            size: '213 KB',
            type: 'application/pdf',
          },
          {
            title: 'User Manual - Arabic',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual-ar---issue-product-status-statement-for-customs-shipment.ashx',
            name: 'UserManual AR - Issue Product Status Statement for Customs Shipment',
            size: '556 KB',
            type: 'application/pdf',
          },
          {
            title: 'User Manual - English',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/customs-shipment-user-manual.ashx',
            name: 'Customs Shipment User Manual',
            size: '607 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees:
        'Product status statement issuance fee for each shipment is AED 200​',
      price: 'AED 200',
      note: '',
    },
    serviceTime: 'Instant Service',
    package: 'Custom Shipments Package (PDF) - Available only in Arabic',

    tags: {},
    faq: {
      items: [
        {
          question:
            "How can I obtain the Ministry's approval to release a shipment from customs?",
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login or register on the Ministry’s online e-services platform',
            'Apply for service',
            'Attach the required documents',
            'Payment of fees',
            'Certificate is obtained',
          ],
          requirements: [
            'Copy of valid UAE Industry/Trade License for Businesses',
            'Copy of UAE ID for individuals',
            'Copy of one of the following documents: customs declaration/invoice/product statement/product list',
            'Picture of the product (if available)',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Products subject to and not subject to technical regulations',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies, Individuals',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'Package',
      description: 'Custom Shipments Package (PDF) - Available only in Arabic',
      size: 'N/A',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/customspackages.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://youtu.be/K5U_Fda4hZ4',
    },
  },
  {
    id: '7a11bf6d-2f3d-4a38-9073-a5a8b8538163',
    relatedServiceId: 1057,
    title: 'Attestation of GSO Conformity Certificates',
    Category_Id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/attestation-of-conformity-certificate-issued-by-gcc-standardization-organization?lang=en',
    },
    description:
      'This service allows you to apply for certification of a true copy of the conformity certificate issued by the Gulf Standardization Organization (GSO) for importing products subject to Gulf technical regulations.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: 'Create an account or log in to MoIAT’s digital services platform (moiat.gov.ae)​',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to obtain a certified copy of a Gulf Certificate of Conformity​​',
          },
          {
            text: 'Attach the required documents',
          },
          {
            text: 'Pay the applicable fees​',
          },
          {
            text: 'You will receive a digital copy of a certified copy of a Gulf Certificate of Conformity​',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: ['A valid trade license', 'GSO conformity certificate'],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Quality Documents',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'User Manual - GSO Tire',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/gso-tire-user-manual.ashx',
            name: 'GSO Tire User Manual',
            size: '652 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'AED 50 for each copy of a Gulf Certificate of Conformity​',
      price: 'AED 50',
      note: '',
    },
    serviceTime: 'Instant Service',
    package: 'Package',

    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I obtain an attestation of conformity certificate issued by the GCC Standardization Organization?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Register to the Ministry’s online e-services platform',
            'Apply for service',
            'Attach the required documents',
            'Payment of fees',
            'Attested copy of the certificate is received',
          ],
          requirements: [
            'Copy of valid UAE Industry/Trade License for Businesses',
            'Certificate number',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'GSO Tires',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Supply and distribution companies​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
  },
  {
    id: '0c8b4abd-49ea-4e81-a10a-98d227a665ad',
    relatedServiceId: 1017,
    title: 'Issue Product Label Card for Drones',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-label-card-for-drones?lang=en',
    },
    description:
      'This service allows you to apply for a product label card for drones, which is attached to drones and unmanned aerial vehicles (UAVs) to enable their identification and tracking within the country’s markets or airspace. This contributes to enhancing safety and security standards for both the community and the end user.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Log in to the ministry's digital services platform (moiat.gov.ae)​",
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Submit a drone product status statement request​',
          },
          {
            text: 'Pay fees​',
          },
          {
            text: 'You will receive a digital copy of the cards​',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: ['Product Status Statement for Drones​'],
      },
      {
        label: 'Files',
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [],
      },
    ],
    serviceFees: {
      serviceFees:
        'AED 1​ Per product status card for products and systems used in aircraft and unmanned aerial vehicles (UAVs).​',
      price: 'AED 1',
      note: '',
    },
    serviceTime: 'Instant Service',
    package: 'Drone Package',
    tags: {},
    faq: {
      items: [
        {
          question: 'How can I obtain a product status card for drones?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login to the Ministry’s digital services platform',
            'Apply for service',
            'Payment of fees',
          ],
          requirements: [
            'Product status statement for drone products and systems',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Conformity Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Drones',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value:
          'Industrial Establishments\nSupply and Distribution Companies\nIndividuals​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'Package',
      description: 'Drone Package',
      size: 'N/A',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/services',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24 * 7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
  },
  // {
  //   id: 'e9f88132-a5e0-4bda-b01b-920835eb008b',
  //   relatedServiceId: 8,
  //   Category_Id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
  //   title: 'Issue Conformity Certificates for Regulated Products (ECAS)',
  //   startButton: {
  //     url: 'https://eservices.moiat.gov.ae/eservices/issue-conformity-certificates-for-regulated-products?lang=en',
  //   },
  //   description:
  //     'Registration and issuance of a conformity certificate according to the Emirates Conformity Assessment Program (ECAS) to confirm its conformity with the approved technical requirements.',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply to “Issuing conformity certificates for products according to health and safety requirements”',
  //         },
  //         {
  //           text: 'Attach the required documents',
  //         },
  //         {
  //           text: 'Payment of fees',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'A valid trade license',
  //         'A test report on the product issued by an accredited laboratory',
  //         'Copy of UAE ID for individuals',
  //         'Online declaration of conformity continuity',
  //       ],
  //     },
  //     {
  //       label: 'Files',
  //       filesSection: {
  //         fileName: 'File Name',
  //         fileSize: 'File Size',
  //         fileType: 'File Type',
  //       },
  //       filesList: [
  //         {
  //           title: 'GMark User Manual',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/gmark-user-manual.ashx',
  //           name: 'GMark User Manual',
  //           size: '920 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'Quality Documents',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
  //           name: 'QualityDocuments',
  //           size: '9617 KB',
  //           type: 'application/x-zip-compressed',
  //         },
  //         {
  //           title: 'Application Form - Issue Conformity Certificates (ECAS)',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-conformity-certificates---ecas.ashx',
  //           name: 'Issue Conformity Certificates - ECAS',
  //           size: '223 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'Vehicle Workshop User Manual',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/vehicle-workshop-user-manual.ashx',
  //           name: 'Vehicle Workshop User Manual',
  //           size: '550 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'ECAS User Manual',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/ecas-user-manual.ashx',
  //           name: 'ECAS User Manual',
  //           size: '642 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'CAD Regulated Sheet - Technical Requirements',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/cad-regulated-sheet.ashx',
  //           name: 'CAD Regulated Sheet',
  //           size: '262 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees:
  //       'AED 600 - Submitting a request to register products and services in the UAE Conformity Assessment System\nAED 620 - Technical review of documents for each conformity certificate\nAED 500 - Issuance of conformity certificate from the Ministry\nAED 2,500 per working day / technical assessor for technical evaluation (if conducted)',
  //     price: 'Varies',
  //     note: 'Fees vary depending on the process stage; technical evaluation incurs additional charges.',
  //   },
  //   serviceTime: '1.5 Working Days',
  //   package: 'Package',

  //   tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'How can I obtain a conformity certificate for my product?',
  //         proceduresTitle: 'Service Procedure',
  //         requirementsTitle: 'Requirements',
  //         answers: [
  //           'Register to the Ministry’s online e-services platform',
  //           'Apply for service',
  //           'Attach the required documents',
  //           'Payment of fees',
  //           'Documents review',
  //           'Certificate is obtained',
  //         ],
  //         requirements: [
  //           'Copy of valid UAE Industry/Trade License for Businesses',
  //           'Copy of UAE ID for individuals',
  //           'Test report from an accredited laboratory',
  //           'Online declaration of conformity continuity',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'Conformity Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Regulated Products',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   generalDocument: {
  //     title: 'General Documents',
  //     description:
  //       'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'Download',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Open 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['MasterCard', 'Visa'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Good Health And Well-Being',
  //         'Decent work and Economic Growth',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: ['N/A'],
  //     },
  //   },
  // },
  {
    id: '04abd58d-5d71-45c3-8463-9f2a8d1787f3',
    relatedServiceId: 1069,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'Renew a Conformity Assessment Bodies Accreditations',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/renew-accreditation-of-conformity-assessment-bodies?lang=en',
    },
    description:
      'Accreditation of testing laboratories according to the international standard ISO/IEC 17025 Accreditation of calibration laboratories according to the international ISO/IEC 17025 standards Accreditation of inspection bodies according to the international standard ISO/IEC 17020 Accreditation of bodies granting conformity certificates for processes, products, and services according to the international standard ISO/IEC 17065 Accreditation of bodies granting conformity certificates for halal according to the relevant UAE standards SGSO 2055-2, OIC/SMIIC 2 Accreditation in medical laboratories according to the international standard ISO 15189',
    sections: [
      {
        label: 'Accreditation Programs',
        Requirements: [
          'Valid commercial license or establishment law for government entities',
          'Valid registration certificate issued by MoIAT (excluding foreign conformity assessment bodies and medical laboratories)',
          'Quality management system and technical documents related to the accreditation program',
          'Completed forms specified in the application',
          'Signed agreement form between ENAS and the applicant',
        ],
      },
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Log in to the ministry's digital services platform (moiat.gov.ae)",
          },
          {
            text: 'Apply for the conformity assessment body accreditation renewal service',
          },
          {
            text: 'Attach all required documents, complete the documents, agree to the terms and conditions, and policies related to accreditation, and attach a signed copy of the agreement between the UAE National Accreditation System (the Ministry) and the applicant',
          },
          {text: 'Pay the application fee'},
          {text: 'Plan the first field assessment'},
          {text: 'Pay the field assessment fee'},
          {text: 'Closing non-conformity cases (if any) for the field visit'},
          {text: 'Paying additional fees and costs (if any)'},
          {
            text: 'Receiving the certificate and scope of accreditation for conformity assessment bodies issued by the Ministry',
          },
          {
            text: "Refer to Guideline EG 03 on the accreditation process and requirements, available on the Ministry's website",
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'Valid trade license',
          'Valid registration certificate issued by the Ministry (excluding foreign bodies and medical laboratories)',
          'Submit renewal application with all required documents at least 2 months before the evaluation date',
          'Pay fees on time',
        ],
      },
    ],

    serviceFees: [
      {value: 'AED 1,000 application fee​'},
      {value: 'AED 2,000 expedited application fee​'},
      {
        value:
          'AED 2,500 review or assessment fee for the quality manual and documents (per assessment/review)​',
      },
      {
        value:
          'AED 5,000 review or assessment fee for the quality manual and documents (per assessment/review)​',
      },
      {
        value:
          'AED 3,000 conformity assessment body assessment fee (field/remote) (per assessor/per day)​',
      },
      {value: 'AED 12,000 accreditation renewal fee (for 3 years)​'},
      {
        value:
          "AED 1,000 fee for amending any of the activities or data included in the conformity assessment body's accreditation certificate/field (if necessary)​",
      },
      {
        value:
          "The entity shall bear all costs and expenses incurred by the assessment and subsequent follow-up assessment processes, in addition to the assessor's travel, transportation, and accommodation expenses, whether inside or outside the country, and any costs required by the assessment process.​",
      },
    ],

    serviceTime: '90 Working Days',
    package: 'Package',
    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I renew the conformity assessment bodies’ accreditation and what are the requirements?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Submit an application through the Ministry’s website with the required documents',
            'Pay fees on time',
            'Evaluation process is conducted',
            'Non-conformities are resolved (if any)',
            'Renewal decision is issued',
            'You can refer to the EG 03 guidelines for detailed accreditation procedures',
          ],
          requirements: [
            'Valid trade license',
            'Valid registration certificate from MoIAT (except for medical labs and foreign bodies)',
            'Submission of application and required documents at least 2 months prior to on-site evaluation',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Accreditation',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value:
          'Companies\nGovernment agencies\nExample: Conformity assessment bodies: testing and calibration laboratories, inspection bodies, product conformity certification bodies, medical laboratories, halal certification bodies​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Business Hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'MasterCard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Registration of Conformity Assessment Bodies',
          'Notification of Conformity Assessment Bodies',
        ],
      },
    },
  },
  {
    id: '04abd58d-5d71-45c3-8463-9f2a8d1787f2',
    relatedServiceId: 1067,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title:
      'Add an Activity/Scope of Accreditation to a Conformity Assessment Body​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/renew-accreditation-of-conformity-assessment-bodies?lang=en',
    },
    description:
      'This service allows you to apply to add an activity/field of accreditation to an accredited conformity assessment body.\n\nAccreditation services are provided in the following programs:\n\n- Accreditation of testing laboratories according to the international standard ISO/IEC 17025.\n\n- Accreditation of calibration laboratories according to the international ISO/IEC 17025 standards.\n\n- Accreditation of inspection bodies according to the international ISO/IEC 17020 standard.\n\n- Accreditation of bodies granting conformity certificates for processes, products, and services according to the international standard ISO/IEC 17065.\n\n- Accreditation of bodies granting conformity certificates for halal according to the relevant standards (UAE GSO 2055-2, OIC/SMIIC 2).\n\n- Accreditation in the field of medical laboratories according to the international standard ISO 15189.',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'Log in to MoIAT’s digital services platform',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to add an accreditation activity/field to a conformity assessment body',
          },
          {
            text: 'Attach all required documents, complete the documents, agree to the terms and conditions and policies related to accreditation, and attach a signed copy of the agreement between the Emirates National Accreditation System (the Ministry) and the applicant',
          },
          {
            text: 'Pay the application fee',
          },
          {
            text: 'Plan the first field assessment',
          },
          {
            text: 'Pay the field assessment fee',
          },
          {
            text: 'Close non-conformity cases (if any) for the field visit',
          },
          {
            text: 'Pay additional fees and costs (if any)',
          },
          {
            text: 'Receive an updated field of accreditation for conformity assessment bodies, including the new field',
          },
          {
            text: 'Refer to Guideline EG 03 on the accreditation process and requirements, available on the Ministry’s website',
          },
        ],
      },
      {
        Requirements: [
          'A valid commercial license or establishment law for government entities',
          'A valid registration certificate issued by the Ministry (except for conformity assessment bodies registered outside the country and medical laboratories)',
          'The quality management system and technical documents related to the accreditation program, along with completed forms specified in the application',
          'A signed form of the agreement between the Emirates National Accreditation System and the applicant',
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {value: 'AED 1,000 application fee​'},
        {value: 'AED 2,000 expedited application fee​'},
        {
          value:
            'AED 2,500 review or assessment fee for the quality manual and documents (per assessment/review)​',
        },
        {
          value:
            'AED 5,000 review or assessment fee for the quality manual and documents (per assessment/review)​',
        },
        {
          value:
            'AED 3,000 conformity assessment body assessment fee (field/remote) (per assessor/per day)​',
        },
        {value: 'AED 12,000 accreditation renewal fee (for 3 years)​'},
        {
          value:
            "AED 1,000 fee for amending any of the activities or data included in the conformity assessment body's accreditation certificate/field (if necessary)​",
        },
        {
          value:
            "The entity shall bear all costs and expenses incurred by the assessment and subsequent follow-up assessment processes, in addition to the assessor's travel, transportation, and accommodation expenses, whether inside or outside the country, and any costs required by the assessment process.​",
        },
      ],
    },

    serviceTime: '90 Working Days',

    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Accreditation',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value:
          'Companies\nGovernment agencies\nExample: Conformity assessment bodies: testing and calibration laboratories, inspection bodies, product conformity certification bodies, medical laboratories, halal certification bodies​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Business Hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'MasterCard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Registration of Conformity Assessment Bodies',
          'Notification of Conformity Assessment Bodies',
        ],
      },
    },
  },
  {
    id: '04abd58d-5d71-4567-8463-9f2a8d1787f2',
    relatedServiceId: 1067,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title:
      'Amend Conformity Assessment Body Accreditation Certificates/Scopes​​​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/renew-accreditation-of-conformity-assessment-bodies?lang=en',
    },
    description:
      "This service allows you to submit a request to amend any of the activities or data included in a valid conformity assessment body's accreditation certificate/scope after submitting all required evidence and documents:\n\n- If the accredited body wishes to amend any activity within the accreditation scope.\n\n- If the accredited body wishes to change its commercial license, including the name and ownership of the body.\n\n- If the location of the accredited conformity assessment body changes.\n\n- If the accredited conformity assessment body wishes to wholly or partially suspend, cancel, or reduce the accredited scopes.",
    sections: [
      {
        serviceProcedures: [
          {
            text: "Log in to the ministry's digital services platform (moiat.gov.ae)​",
            url: 'https://sso.moiat.gov.ae/',
          },
          {
            text: "Apply to request an amendment to the conformity assessment body's accreditation certificate/scope​",
          },
          {
            text: 'Attach all required documents, complete them, agree to the terms and conditions, and attach a signed agreement with ENAS​',
          },
          {text: 'Pay the application fee​'},
          {
            text: 'Close non-conformity cases (if any) from the document review process (if applicable)​',
          },
          {text: 'Plan the first-time field assessment (if applicable)​'},
          {text: 'Pay the field assessment fee (if applicable)​'},
          {
            text: 'Close non-conformity cases (if any) for the field visit (if applicable)​',
          },
          {text: 'Pay additional fees and costs (if any)​'},
          {
            text: 'Receive the updated accreditation certificate/scope electronically​',
          },
          {
            text: "Refer to Guideline EG 03 on the accreditation process and requirements on the Ministry's website​",
          },
        ],
      },
      {
        Requirements: [
          'A valid trade license or establishment law for government entities',
          'A valid registration certificate issued by the Ministry (foreign conformity assessment bodies and medical laboratories are excluded)',
          'The quality management system and technical documents related to the accreditation program, along with completed forms specified in the application',
          'A signed copy of the agreement between the Emirates National Accreditation System and the applicant',
          'Any other document proving the requested amendment',
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {value: 'AED 1,000 application fee​'},
        {value: 'AED 2,000 expedited application fee​'},
        {
          value:
            'AED 2,500 review or assessment fee for the quality manual and documents (per assessment/review)​',
        },
        {
          value:
            'AED 5,000 review or assessment fee for the quality manual and documents (per assessment/review)​',
        },
        {
          value:
            'AED 3,000 conformity assessment body assessment fee (field/remote) (per assessor/per day)​',
        },
        {value: 'AED 12,000 accreditation renewal fee (for 3 years)​'},
        {
          value:
            "AED 1,000 fee for amending any of the activities or data included in the conformity assessment body's accreditation certificate/field (if necessary)​",
        },
        {
          value:
            "The entity shall bear all costs and expenses incurred by the assessment and subsequent follow-up assessment processes, in addition to the assessor's travel, transportation, and accommodation expenses, whether inside or outside the country, and any costs required by the assessment process.​",
        },
      ],
    },

    serviceTime: '90 Working Days',

    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Accreditation',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value:
          'Companies\nGovernment agencies\nExample: Conformity assessment bodies: testing and calibration laboratories, inspection bodies, product conformity certification bodies, medical laboratories, halal certification bodies​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Business Hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'MasterCard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Registration of Conformity Assessment Bodies',
          'Notification of Conformity Assessment Bodies',
        ],
      },
    },
  },
  // {
  //   id: '8bfe5cea-56cd-4c05-9be0-9538d8e0f130',
  //   relatedServiceId: 1068,
  //   Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
  //   title:
  //     'Amendment on the Accreditation Certificate of Conformity Assessment Bodies Certificate',
  //   generalDocument: {
  //     title: 'المستندات العامة',
  //     description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
  //     size: 'KB 2204',
  //     button: [
  //       {
  //         title: 'تحميل',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
  //       },
  //     ],
  //   },
  //   startButton: {
  //     url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-accreditation-certificate-of-conformity-assessment-bodies-certificate?lang=en',
  //   },
  //   description:
  //     'A procedure according to which an activity in the valid accreditation certificate/field is modified by the National Accreditation Department after the conformity assessment body submits all evidence to amend the certificate/field.',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply to “Amendment on the Accreditation Certificate of Conformity Assessment Bodies Certificate”',
  //         },
  //         {
  //           text: 'Attach all required documents and forms specified in the application form',
  //         },
  //         {
  //           text: 'Approve the terms, conditions, and policies related to accreditation and attach a signed agreement with the UAE National Accreditation System (ENAS)',
  //         },
  //         {
  //           text: 'Application review by the designated employee',
  //         },
  //         {
  //           text: 'Payment of fees',
  //         },
  //         {
  //           text: 'Planning and conducting a field assessment (if necessary)',
  //         },
  //         {
  //           text: 'Close cases of non-conformity (if any)',
  //         },
  //         {
  //           text: 'Issuance of amendment decision and obtaining the modified certificate/field',
  //         },
  //         {
  //           text: 'Announcing the modified accreditation field on the Ministry’s website',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Submit an application to amend the certificate/accreditation scope',
  //         'Submit the required documents',
  //         'Payment of fees',
  //         'Respond to requests for additional documents after review (if required)',
  //         'Field visit implementation (if required)',
  //         'Close non-conformity cases (if any)',
  //         'Types of amendments include: change of legal entity (ownership/name/license), location change, activity/scope amendment (suspension or withdrawal), change of personnel (technicians/inspectors), or any change affecting efficiency',
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees:
  //       'AED1000 – Application fees\nAED2000 – Urgent application\nAED1000 – Amendment of activities/data in accreditation certificate/field\nAED2500 – Review/evaluation of quality manual and documents (per process)\nAED5000 – Urgent review/evaluation of quality manual and documents (per process)\nAED3000 – Assessment of conformity assessment body (field/remote) (per assessor per day)',
  //     price: 'Variable',
  //     note: 'The entity shall bear all costs and expenses incurred in amending the accreditation activity, including travel, transportation, residence of the assessor, or any additional expenses.',
  //   },
  //   serviceTime: '5 Working Days',
  //   package: 'Package',
  //   tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question:
  //           'How can I amend the activity of a conformity assessment body’s accreditation certificate and what are the requirements?',
  //         proceduresTitle: 'Service Procedure',
  //         requirementsTitle: 'Requirements',
  //         answers: [
  //           'Submit application to amend the certificate/accreditation scope',
  //           'Attach required documents',
  //           'Pay fees',
  //           'Application and documents are reviewed',
  //           'Provide additional documents if requested',
  //           'Implement field visit if required',
  //           'Close non-conforming cases (if any)',
  //           'Receive amended accreditation certificate',
  //         ],
  //         requirements: [
  //           'Valid UAE trade license',
  //           'Completed application with supporting documents',
  //           'Types of amendments: legal entity changes, location change, accreditation activity scope amendment, suspension/withdrawal, changes in personnel, or other changes affecting efficiency',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'National Accreditation Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Accreditation',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value:
  //         'Testing and calibration laboratories, Inspection bodies, Conformity certification bodies, Medical laboratories, Halal certification bodies',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Business Hours',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['Visa', 'MasterCard'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Good Health And Well-Being',
  //         'Decent work and Economic Growth',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'Registration of Conformity Assessment Bodies',
  //         'Notification of Conformity Assessment Bodies',
  //       ],
  //     },
  //   },
  // },
  // {
  //   id: '8179b70d-d021-4dcb-bd8a-1403e3167fe3',
  //   relatedServiceId: 1067,
  //   title: 'Expand Accreditation Scope of Conformity Assessment Bodies',
  //   generalDocument: {
  //     title: 'المستندات العامة',
  //     description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
  //     size: 'KB 2204',
  //     button: [
  //       {
  //         title: 'تحميل',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
  //       },
  //     ],
  //   },
  //   startButton: {
  //     url: 'https://eservices.moiat.gov.ae/eservices/scope-expansion-of-accreditation-of-conformity-assessment-bodies?lang=en',
  //   },
  //   description:
  //     'A procedure by which official recognition is granted to expand the scope of accreditation of a conformity assessment body, by adding new fields in the accreditation scope document of a previously accredited conformity assessment body.',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply to “Scope Expansion of Accreditation of Conformity Assessment Bodies”',
  //         },
  //         {
  //           text: 'Attach all required documents and forms specified in the application form',
  //         },
  //         {
  //           text: 'Approve terms and conditions, and policies related to accreditation, and attach a signed copy of the agreement with the UAE National Accreditation System (MoIAT)',
  //         },
  //         {text: 'Payment of fees'},
  //         {text: 'Planning a field assessment'},
  //         {text: 'Carrying out the field assessment'},
  //         {text: 'Close cases of non-conformity (if any)'},
  //         {text: 'Payment of fees and costs incurred'},
  //         {
  //           text: 'Issuing the decision to expand the accreditation certificate/scope',
  //         },
  //         {text: 'Obtain the updated accreditation domain'},
  //         {
  //           text: 'Announcement of the accreditation scope modification on the Ministry’s website',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Valid Trade License',
  //         'Valid registration certificate issued by MoIAT (foreign conformity assessment bodies and medical laboratories are excluded)',
  //         'Submit the accreditation application and required documents at least 2 months before the date of submitting the on-site evaluation process',
  //         'Pay fees on time',
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees:
  //       'AED1000 – Application fee\nAED2000 – Urgent application fee\nAED1000 – Amendment of activities or data in the accreditation certificate/scope\nAED2500 – Review or evaluation of quality manual and documents (per evaluation/revision process, if necessary)\nAED5000 – Urgent review or evaluation of quality manual and documents (per evaluation/revision process, if necessary)\nAED3000 – Assessment of conformity assessment body (field/remote, per assessor/per day, if necessary)',
  //     price: 'Variable',
  //     note: 'The entity shall bear all costs and expenses incurred in amending the accreditation activity, including travel, accommodation, and any additional expenses for the assessor(s).',
  //   },
  //   serviceTime: '90 Working Days',
  //   package: 'Package',
  //   tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question:
  //           'How can I expand the scope of conformity assessment bodies’ accreditation and what are the requirements?',
  //         proceduresTitle: 'Service Procedure',
  //         requirementsTitle: 'Requirements',
  //         answers: [
  //           'Submit an application through the Ministry’s website with the following documents: Valid Trade License, Valid registration certificate from MoIAT (for entities operating in the UAE, except medical laboratories), Quality manual and procedures, and related documents',
  //           'Payment of fees',
  //           'Evaluation process',
  //           'Closing non-conforming cases (if any)',
  //           'Approval issued',
  //           'Refer to ENAS EG 03 guidelines for detailed accreditation procedures',
  //         ],
  //         requirements: [
  //           'Valid UAE Trade License',
  //           'Valid registration certificate issued by MoIAT (excludes foreign bodies and medical labs)',
  //           'Submit application and required documents 2 months before on-site evaluation',
  //           'Quality manual and procedures',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'National Accreditation Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Accreditation',
  //     },
  //     serviceType: {label: 'Service Type', value: 'Transactional'},
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'During official working hours',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['Visa', 'MasterCard'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Good Health And Well-Being',
  //         'Decent Work and Economic Growth',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'Registration of Conformity Assessment Bodies',
  //         'Notification of Conformity Assessment Bodies',
  //       ],
  //     },
  //   },
  // },
  {
    id: 'b18384b7-283b-47f6-b4ee-e29a11e4f3ce',
    relatedServiceId: 1049,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'Amend Conformity Assessment Body Notification Certificates',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-notification-certificate-of-conformity-assessment-bodies-certificate?lang=en',
    },
    description:
      'This service allows you to submit a request to amend a valid conformity assessment body notification certificate after submitting all required evidence and documents.​​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {text: 'Log in to MoIAT’s digital services platform (moiat.gov.ae)'},
          {
            text: 'Apply to amend the conformity assessment body appointment certificate',
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the applicable fees'},
          {
            text: 'Receive an updated conformity assessment body appointment certificate',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A valid trade license in the United Arab Emirates',
          'A valid accreditation certificate issued by national accreditation bodies for the field offered',
          'Quality manual and procedures, including assessment procedures and conformity assessment system procedures',
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'Application fee: AED 1,000 per application​'}],
    },
    serviceTime: '5 Working Days',
    package: 'Package',
    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I amend an activity in the conformity assessment bodies’ notification certificate, and what are the requirements?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          answers: [
            'Register on the Ministry’s website and apply.',
            'Payment of fees.',
            'Documents review.',
            'Updated certificate is obtained.',
          ],
          requirements: [
            'Valid Trade License.',
            'Valid registration certificate.',
            'Valid accreditation certificate.',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Notification',
      },
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value:
          'Companies\nGovernment Agencies\n(Accredited Conformity Assessment Bodies)​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'MasterCard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Registration of Conformity Assessment Bodies',
          'Notification of Conformity Assessment Bodies',
        ],
      },
    },
  },
  {
    id: '5bc3ecec-6eba-436a-95e7-ea3434f9c209',
    relatedServiceId: 1066,
    title: 'Amendment to a Halal Certification Body Certificate​',
    Category_Id: 'f1e75583-f056-4b92-8fe6-4694da763e1f',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-registration-of-halal-certification-bodies-certificate?lang=en',
    },
    description:
      'This service allows you to apply to amend the registration certificate of a halal certification body after the body has submitted all required evidence.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Log in to the ministry's digital services platform (moiat.gov.ae)",
          },
          {
            text: "Apply to amend any activities or data on the Halal Certification Authority's registration certificate",
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the applicable fees'},
          {
            text: 'Receive an updated Halal Certification Authority registration certificate',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A valid commercial license or equivalent',
          'A valid accreditation certificate',
          'The scope of the accreditation certificate from an accreditation body accepted by the Ministry',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'Application fee: AED 500 per application​'},
        {value: 'AED 1,000 per registration field​'},
      ],
    },
    serviceTime: '10 Working Days',
    package: 'Package',
    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I amend the registration of Halal Certification Bodies’ Certificate, and what are the requirements?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          answers: [
            'Sign into the digital platform for MoIAT (moiat.gov.ae).',
            'Apply to the service “Amendment on the Registration of Halal Certification Bodies Certificate”.',
            'Upload the required documents.',
            'Application review.',
            'Payment of fees.',
            'Issuance of the Certificate.',
          ],
          requirements: [
            'Valid Trade License or its equivalent.',
            'Valid Accreditation Certificate with the Scope from an approved Accreditation Body by the Ministry.',
            'Valid Registration Certificate.',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {label: 'Service Sub-Category', value: 'Halal'},
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies\nGovernment Agencies\n(Halal Certification Bodies)',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'MasterCard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {label: 'Interconnection of the service', value: []},
    },
  },
  {
    id: '4b93822c-767e-4922-822a-55a86bf59b52',
    relatedServiceId: 1025,
    title: 'Issue Halal Certification Body Certificates​',
    Category_Id: 'f1e75583-f056-4b92-8fe6-4694da763e1f',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/registration-of-halal-certification-bodies?lang=en',
    },
    description:
      'This service allows you to apply for a Halal Certification Authority Registration Certificate, which provides official recognition from the ministry for Halal certificates issued by registered Halal Certification Authorities. This is in accordance with Cabinet Resolution No. 10 of 2014 concerning the UAE Halal Products Control System.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Create an account or log in to the ministry's digital platform for services (moiat.gov.ae)",
          },
          {
            text: 'Apply to issue a Halal Certification Body Registration Certificate',
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the initial fees'},
          {text: 'Contact the accreditation body selected for accreditation'},
          {text: 'Attach the accreditation certificate'},
          {
            text: 'Pay the Halal Certification Body Registration Certificate Fee',
          },
          {
            text: 'Receive the Halal Certification Body Registration Certificate',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A valid commercial license or equivalent',
          'A valid accreditation certificate',
          'The scope of the accreditation certificate from an accreditation body accepted by the Ministry',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'Submit a registration application for AED 1,000​'},
        {value: 'AED 1,000 for each registration field​'},
      ],
    },

    serviceTime: '10 Working Days',
    package: 'Package',
    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I register halal certification body and what are the requirements?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Sign into the digital platform for MoIAT (moiat.gov.ae).',
            'Apply to the service “Registration of Halal Certification Bodies“.',
            'Upload the required Documents.',
            'Application review.',
            'Payment of fees.',
            'Issuance of the Certificate.',
          ],
          requirements: [
            'Valid Trade License or its equivalent.',
            'Valid Accreditation Certificate with the Scope from an approved Accreditation Body by the Ministry.',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {label: 'Service Sub-Category', value: 'Halal'},
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies\nGovernment Agencies\n(Halal Certification Bodies)​​',
      },
      qrCaption: 'Open the service card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Info',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'Mastercard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Accreditation of conformity assessment bodies and the appointment of conformity assessment bodies',
        ],
      },
    },
  },
  {
    id: '532cc003-56a9-481f-b748-8abe92f1b458',
    relatedServiceId: 1013,
    title:
      'Registration the shops which calibrating and maintaining the legal measuring instruments',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/registration-of-maintenance-repair-and-calibration-of-legal-measuring-instruments-workshop?lang=en',
    },
    description:
      "Issuance of a registration certificate for maintenance and calibration workshops for legal measurement instrument according to the technical requirements of Chairman of the Board's decision No. (15) for the year 2015.",
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Login or Register to the digital platform for the Ministry's services",
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply for Registration of Maintenance, Repair, and Calibration of Legal Measuring Instruments Workshop service',
          },
          {text: 'Upload the required documents'},
          {text: 'Payment of fees'},
          {text: 'Documents review'},
          {text: 'Onsite assessment'},
          {text: 'Receipt of the certificate'},
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'Valid trade / industrial license',
          'Calibration certificates for reference standards',
          'Procedures for handling the reference standards',
          'Technical procedures and forms used for maintenance of measuring instruments',
          'Maintenance and calibration form',
          'Operating Plan',
          'Site Map',
          'Qualification of staff',
          'Efficiency and accuracy of infrastructure and technical tools',
          'Appropriate measurement criteria for the activity',
          'Quality management system',
          'Provide a price list for customers printed clearly and publicly',
          'Provide a distinctive mark or seals for the operator approved by ESMA',
          'Electronic declaration',
          'Quality Manual and Procedures',
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'AED3000',
      price: 'AED3000',
    },
    serviceTime: '8 Working Days',
    package: 'Package',
    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I register a workshop for calibration and maintenance of legal measuring instruments?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login or Register to the Ministry services digital platform.',
            'Apply for the Registration of Maintenance, Repair, and Calibration of Legal Measuring Instruments Workshop service.',
            'Upload the required Documents.',
            'Payment of fees.',
            'Documents review.',
            'Onsite assessment.',
            'Certificate is issued.',
          ],
          requirements: [
            'Valid trade / industrial license',
            'Calibration certificates for reference standards',
            'Technical procedures and forms for maintenance',
            'Staff qualification and infrastructure readiness',
            'Quality management system',
            'Price list and operator seal approved by ESMA',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {label: 'Service Sub-Category', value: 'Metrology'},
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Info',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'Mastercard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['N/A'],
      },
    },
  },
  {
    id: '8deb1492-f0e0-45fe-bf9a-3a39bd32c7d6',
    relatedServiceId: 1026,
    title: 'Renew Halal Certification Body Certificates​',
    Category_Id: 'f1e75583-f056-4b92-8fe6-4694da763e1f',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/renewal-of-registration-of-halal-certification-bodies?lang=en',
    },
    description:
      'This service allows you to apply to renew the registration certificate of a halal certification body in accordance with Cabinet Resolution No. 10 of 2014 regarding the UAE system for controlling halal products.',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Log in to the Ministry's digital services platform (moiat.gov.ae)",
          },
          {
            text: "Apply to renew the Halal Certification Authority's registration certificate",
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the applicable fees'},
          {
            text: 'Receive a renewed Halal Certification Authority registration certificate',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A valid commercial license or equivalent',
          'A valid accreditation certificate',
          'The scope of the accreditation certificate from an accreditation body accepted by the Ministry',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'Submitting a registration renewal application: AED 800​'},
      ],
    },
    serviceTime: '10 Working Days',
    package: 'Package',
    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I renew the halal certification bodies’ certificate and what are the requirements?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          answers: [
            'Sign into the digital platform for MoIAT (moiat.gov.ae)',
            'Apply to the service “Renewal of Registration of Halal Certification Bodies“',
            'Upload the required Documents',
            'Application review',
            'Payment of fees',
            'Issuance of the Certificate',
          ],
          requirements: [
            'Valid Trade License or its equivalent',
            'Valid Accreditation Certificate with the Scope from an approved Accreditation Body by the Ministry',
            'Valid Registration Certificate',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {label: 'Service Sub-Category', value: 'Halal'},
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies\nGovernment Agencies\n(Halal Certification Bodies)',
      },
      qrCaption: 'Open the service card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'MasterCard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web browser',
        web: 'MoIAT Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Accreditation of conformity assessment bodies and the appointment of conformity assessment bodies',
        ],
      },
    },
  },
  {
    id: '2291f0ff-fecb-4a4a-8217-c900bdaace98',
    relatedServiceId: 1048,
    title: 'Accreditation of Conformity Assessment Bodies',
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/accreditation-of-conformity-assessment-bodies?lang=en',
    },
    description:
      'Accreditation of testing laboratories according to the international standard ISO/IEC 17025 Accreditation of calibration laboratories according to the international ISO/IEC 17025 standards Accreditation of inspection bodies according to the international standard ISO/IEC 17020 Accreditation of bodies granting conformity certification for processes, products, and services according to the international standard ISO/IEC 17065 Accreditation of bodies granting conformity certification for halal according to the relevant UAE standards SGSO 2055-2, OIC/SMIIC 2 Accreditation in medical laboratories according to the international standard ISO 15189',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Create an account or log in to the ministry's digital platform for services (moiat.gov.ae)​",
            url: 'https://sso.moiat.gov.ae/',
          },
          {
            text: 'Apply for the conformity assessment body accreditation service​',
          },
          {text: 'Attach all required documents and complete the application​'},
          {
            text: 'Agree to the terms and conditions and attach a signed copy of the agreement with the UAE National Accreditation System​',
          },
          {text: 'Pay the application fee​'},
          {
            text: 'Receive the office assessment report and close non-conformity cases (if any)​',
          },
          {text: 'Participate in planning the field assessment​'},
          {text: 'Pay the field assessment fee​'},
          {
            text: 'Receive the field assessment report and close non-conformity cases (if any)​',
          },
          {text: 'Pay additional fees and costs (if any)​'},
          {
            text: 'Receive the certificate and scope of accreditation, and obtain the accreditation code and identification number​',
          },
          {
            text: 'Commit to implementing subsequent follow-up assessments as planned/annually​',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'Valid commercial license or establishment law for government entities',
          'Valid registration certificate issued by MoIAT (excluding foreign conformity assessment bodies and medical laboratories)',
          'Quality management system and technical documents related to the accreditation program',
          'Completed forms specified in the application',
          'Signed agreement form between ENAS and the applicant',
        ],
      },
    ],
    documents: [
      {
        label: 'Agreement between ENAS & Applicant',
        files: [
          {
            fileName: 'ACF 10-02 Agreement between ENAS and an Applicant',
            fileSize: '328 KB',
            fileType: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/acf-10-02-agreement-between-enas-and-an-applicant.ashx',
          },
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'AED 1,000 application fee​'},
        {
          value:
            'AED 2,500 review or assessment fee for the quality manual and documents (per assessment/review)​',
        },
        {
          value:
            'AED 3,000 conformity assessment body assessment fee (field/remote) (per assessor/per day)​',
        },
        {
          value:
            'AED 18,000 accreditation fee for the conformity assessment body for 3 years​',
        },
        {value: 'Expedited (not yet activated):​'},
        {value: 'AED 2,000 urgent application fee​'},
        {
          value:
            'AED 5,000 review or assessment fee for the quality manual and documents (per assessment/review)​',
        },
        {
          value:
            "The entity shall bear all costs and expenses incurred by the assessment and subsequent follow-up assessment processes, including the assessor's travel, transportation, and accommodation expenses, whether inside or outside the country, and any costs required by the assessment process.​",
        },
      ],
    },

    serviceTime: '135 Working Days',
    package: 'Package',
    tags: {},
    faq: {
      items: [
        {
          question:
            'How can I accredit conformity assessment bodies and what are the requirements?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          answers: [
            'Apply through the Ministry’s website',
            'Submit all required documents (Valid Trade License, Registration Certificate, Quality Manual & related documents)',
            'Payment of fees',
            'Evaluation and review of documents',
            'Initial evaluation (if necessary)',
            'Full evaluation',
            'Closing non-conforming cases (if any)',
            'Certificate and accreditation scope issued (valid for 3 years)',
            'Implementation of subsequent annual follow-up evaluations',
          ],
          requirements: [
            'Valid Trade License',
            'Valid registration certificate from MoIAT (except medical laboratories/foreign bodies)',
            'Quality Manual and procedures',
            'Signed agreement with ENAS',
            'Payment of fees',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Accreditation',
      },
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value:
          'Companies\nGovernment agencies\nExample: Conformity assessment bodies: testing and calibration laboratories, inspection bodies, product conformity certification bodies, medical laboratories, halal certification bodies​',
      },
      qrCaption: 'Open the service card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'MasterCard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web browser',
        web: 'MoIAT Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health And Well-Being',
          'Decent work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Registration of Conformity Assessment Bodies',
          'Notification of Conformity Assessment Bodies',
        ],
      },
    },
  },
  {
    id: '17cb33b7-479b-4c65-8de6-ed60fddc5041',
    relatedServiceId: 3,
    title: 'Issue Conformity Assessment Bodies Registration Certificates',
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/registration-of-conformity-assessment-bodies?lang=en',
    },
    description:
      'This service allows you to apply for a conformity assessment body registration certificate, which allows the body to practice conformity assessment activities after meeting a set of technical requirements',
    sections: [
      {
        label: 'Service Procedure',
        serviceProcedures: [
          {
            text: 'Create an account or log in to MoIAT’s digital platform for services (moiat.gov.ae)',
          },
          {
            text: 'Apply to obtain a conformity assessment body registration certificate',
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the applicable fees'},
          {text: 'Confirm the assessment appointment'},
          {text: 'Attach all the necessary documents and evidence'},
          {text: 'Receive the assessor'},
          {text: 'Closing non-conformity cases (if any)'},
          {
            text: 'Receiving the conformity assessment body registration certificate',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'Valid UAE Trade License',
          'Quality manual and related documents',
          'Certification and scope of accreditation (if applicable).',
          'Registration requirements checklist and supporting evidence (afterapplication approval and fee payment).​',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {
          value:
            'Submit a registration application: AED 1,000 per application​',
        },
        {
          value:
            'Register a conformity assessment activity for one year: AED 1,000 per registration​',
        },
        {
          value:
            'Conduct the assessment process: AED 3,000 per assessor per day​',
        },
      ],
    },
    serviceTime: '30 Working Days',
    faq: {
      items: [
        {
          question:
            'How can I register Conformity Assessment Bodies and what are the requirements?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Login or register on the Ministry’s platform',
            'Submit an application for registration',
            'Attach the required documents',
            'Pay the fees',
            'Documents review',
            'Field visit',
            'Registration certificate is issued',
          ],
          requirements: [
            'Valid UAE Trade License',
            'Quality manual and related documents',
            'Accreditation within one year if entity operates in mandatory accreditation fields',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Registration',
      },
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies​\nGovernment Entities​',
      },
      qrCaption: 'Open this service card on your mobile or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'MasterCard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web browser',
        web: 'MoIAT Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health and Well-Being',
          'Decent Work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Accreditation of conformity assessment bodies',
          'Appointment of conformity assessment bodies',
        ],
      },
    },
  },
  {
    id: '52150bdb-35ab-48cc-9d70-fc5945015815',
    relatedServiceId: 1022,
    title: 'Renew Conformity Assessment Bodies Registration Certificates',
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/renewal-of-registration-of-conformity-assessment-bodies?lang=en',
    },
    description:
      'This service allows you to submit a request to renew the registration certificate issued by the Ministry to a conformity assessment body. The renewal permits the body to continue conducting conformity assessment activities, provided it meets the required technical standards.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {text: 'Log in to MoIAT’s digital services platform (moiat.gov.ae)'},
          {
            text: "Apply to renew the conformity assessment body's registration certificate",
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the applicable fees'},
          {
            text: 'Confirm the assessment appointment if the body is not accredited',
          },
          {
            text: 'Attach all required documents and evidence if the body is not accredited',
          },
          {text: 'Receive the assessor if the body is not accredited'},
          {text: 'Closing non-conformity cases (if any)'},
          {
            text: 'Receiving a renewed conformity assessment body registration certificate',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A valid UAE trade license for private entities or the establishment law for government entities',
          'Quality Guide and related documents linked to the Quality Guide',
          'Certification and scope of accreditation (if applicable)',
          'Registration requirements checklist and supporting evidence (after application approval and fee payment)',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {
          value:
            'Submit a registration application: AED 1,000 per application​',
        },
        {value: 'Renew registration: AED 800 per application​'},
        {
          value:
            'Complete the evaluation process: AED 3,000 per resident per day​',
        },
      ],
    },

    serviceTime: '30 Working Days',
    faq: {
      items: [
        {
          question:
            'How can I renew the registration of conformity assessment bodies and what are the requirements?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          answers: [
            'Submit an application through the Ministry’s website',
            'Attach the required documents',
            'Payment of fees',
            'Field visit to the conformity assessment body’s location',
            'Registration certificate is issued',
          ],
          requirements: [
            'Valid trade license',
            'Valid registration certificate',
            'Quality manual and related documents',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Registration',
      },
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies​\nGovernment Entities',
      },
      qrCaption: 'Open this card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'Mastercard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry’s Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health and Well-Being',
          'Decent Work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Accreditation of conformity assessment bodies',
          'Appointment of conformity assessment bodies',
        ],
      },
    },
  },
  {
    id: '5fe0c1da-e3b2-4073-8146-352cb4deccf9',
    relatedServiceId: 1023,
    title: 'Amend Conformity Assessment Bodies Registration Certificates',
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-registration-certificate-of-conformity-assessment-bodies-certificate?lang=en',
    },
    description:
      'This service allows you to submit a request to amend any of the activities or data in the conformity assessment body registration certificate issued by the ministry, after the conformity assessment body has submitted all the evidence to amend the certificate.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {text: 'Log in to MoIAT’s digital services platform (moiat.gov.ae)'},
          {
            text: "Apply to amend the conformity assessment body's registration certificate",
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the applicable fees'},
          {
            text: 'Receive an updated conformity assessment body registration certificate',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'A valid UAE trade license for private entities or the establishment law for government entities',
          'Quality guide and related documents',
          'Valid registration certificate',
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'AED 500 per application​'}],
    },
    serviceTime: '5 Working days',
    faq: {
      items: [
        {
          question:
            "How can I amend a conformity assessment body's activity in the registration certificate?",
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          answers: [
            'Apply through the Ministry’s website',
            'Payment of fees',
            'Documents review',
            'Renewed certificate is obtained',
          ],
          requirements: [
            'Valid Trade License',
            'Valid registration certificate',
            'Quality Manual and Related Documents',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Registration',
      },
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies​\nGovernment Entities​',
      },
      qrCaption: 'Open this card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'Mastercard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry’s Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health and Well-Being',
          'Decent Work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Accreditation of conformity assessment bodies',
          'Appointment of conformity assessment bodies',
        ],
      },
    },
  },
  {
    id: '5fe0c1da-e3b2-4563-8146-352cb4deccf9',
    relatedServiceId: 1023,
    title: 'Issue Conformity Assessment Notification Certificates​',
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-registration-certificate-of-conformity-assessment-bodies-certificate?lang=en',
    },
    description:
      "This service allows you to apply for a Conformity Assessment Body Notification Certificate, which approves the body per the ministry's  requirements and regulations. Under this certificate, the accredited body is authorized to issue conformity certificates, as well as national conformity marks and badges, on behalf of the ministry in accordance with Cabinet Resolution No. 35 of 2015.​​",
    sections: [
      {
        serviceProcedures: [
          {
            text: "Log in to the Ministry's digital platform for services",
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to appoint conformity assessment bodies',
          },
          {
            text: 'Complete the application and attach the required documents',
          },
          {
            text: 'Agree to the terms and conditions',
          },
          {
            text: 'Pay the service fees',
          },
          {
            text: 'Obtain an approved electronic certificate',
          },
        ],
      },
      {
        Requirements: [
          'A valid trade license in the United Arab Emirates',
          'A valid registration certificate issued by the Ministry',
          'A valid accreditation certificate issued by a national accreditation body for the field covered by the conformity assessment body',
          'An official liability insurance policy with a minimum coverage of AED 3,000,000 (three million dirhams), issued by an insurance company operating in the UAE',
          "The entity's financial report, including conformity assessment activities",
          'A copy of the quality documentation and the documents used for the checklists',
          "A list of the applicant's approved subcontracting entities, along with a description of the scope of the contract",
          'A list of all employees (permanent, non-permanent, and external contracts), along with a document outlining the duties and responsibilities of employees working in the field of the appointment submitted with the application',
        ],
      },
    ],

    serviceFees: {
      Fees: [{value: 'AED 500 per application​'}],
    },
    serviceTime: '15 Working days',

    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Registration',
      },
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies​\nGovernment Entities​',
      },
      qrCaption: 'Open this card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'Mastercard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry’s Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health and Well-Being',
          'Decent Work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Accreditation of conformity assessment bodies',
          'Appointment of conformity assessment bodies',
        ],
      },
    },
  },
  {
    id: '4f1dbda2-016a-4562-bda7-bdc26a81dec9',
    relatedServiceId: 2,
    title:
      'Issue No Objection Certificates (NOC) for Licensing Conformity Assessment Bodies',
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-a-non-objection-certificate?lang=en',
    },
    description:
      'This service allows you to apply for a no-objection certificate from the ministry to conformity assessment bodies to complete the issuance of a commercial license.​',
    sections: [
      {
        label: 'Service Procedure',
        serviceProcedures: [
          {
            text: 'Login or Register to the Ministry services digital platform',
            url: 'https://sso.moiat.gov.ae/',
          },
          {
            text: 'Apply to issue a No Objection Certificate (NOC) for licensing conformity assessment bodies',
          },
          {text: 'Attach the required documents'},
          {text: 'Payment of fees'},
          {
            text: 'Receive the No Objection Certificate for licensing conformity assessment bodies​',
          },
        ],
      },
      {
        label: 'Requirements',
        Requirements: [
          'Electronic pledge to obtain a registration certificate within six months of issuing the no objection certificate​',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'No Objection Certificate Fee: AED 300​'},
        {
          value:
            'Submitting a registration application: AED 1,000 per application​',
        },
        {
          value:
            'Registering a conformity assessment activity for one year: AED 1,000 per registration​',
        },
        {
          value:
            'Conducting the assessment process: AED 3,000 per assessor per day​​',
        },
      ],
    },
    serviceTime: 'Instant Service',
    faq: {
      items: [
        {
          question: 'How can I issue a Non Objection Certificate?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Register on the Ministry’s website and apply',
            'Payment of fees',
          ],
          requirements: [
            'A declaration to obtain a registration certificate within six months from the issuance of the Non Objection Certificate',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Pre-Registration',
      },
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies, Government Agencies​',
      },
      qrCaption: 'Open this service card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'Mastercard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Browser',
        web: 'Digital platform of the Ministry of Industry and Advanced Technology',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health and Well-Being',
          'Decent Work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['Registration of conformity assessment bodies'],
      },
    },
  },
  {
    id: '4f1dbda2-016a-4567-bda7-bdc26a81dec9',
    relatedServiceId: 2,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title:
      'Extend the Validity of NOCs for Licensing Conformity Assessment Bodies​​',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-a-non-objection-certificate?lang=en',
    },
    description:
      'This service allows you to apply to extend the validity of the No Objection Certificate for licensing conformity assessment bodies, with the aim of the entity fulfilling the requirements for registering conformity assessment bodies.​​',
    sections: [
      {
        serviceProcedures: [
          {
            text: "Log in to the Ministry's digital services platform",
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to extend the validity of the No Objection Certificate for licensing conformity assessment bodies',
          },
          {
            text: 'Attach all required documents',
          },
          {
            text: 'Receive the No Objection Certificate for licensing conformity assessment bodies',
          },
        ],
      },
      {
        Requirements: [
          "A letter from the entity's senior management requesting an extension of the No Objection Certificate",
          'A valid No Objection Certificate',
        ],
      },
    ],

    serviceTime: '3 Working Days​',
    faq: {
      items: [
        {
          question: 'How can I issue a Non Objection Certificate?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          answers: [
            'Register on the Ministry’s website and apply',
            'Payment of fees',
          ],
          requirements: [
            'A declaration to obtain a registration certificate within six months from the issuance of the Non Objection Certificate',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'National Accreditation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Pre-Registration',
      },
      serviceType: {label: 'Service Type', value: 'Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies, Government Agencies​',
      },
      qrCaption: 'Open this service card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Service Availability',
        value: 'During official working hours',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'Mastercard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Browser',
        web: 'Digital platform of the Ministry of Industry and Advanced Technology',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Development Goals',
        values: [
          'Good Health and Well-Being',
          'Decent Work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['Registration of conformity assessment bodies'],
      },
    },
  },
  // {
  //   id: 'fa284c5e-8c7a-3333-a2b1-bcf13ca89373',
  //   relatedServiceId: 1030,
  //   title: 'Notification of Conformity Assessment Bodies',
  //   generalDocument: {
  //     title: 'المستندات العامة',
  //     description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
  //     size: 'KB 2204',
  //     button: [
  //       {
  //         title: 'تحميل',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
  //       },
  //     ],
  //   },
  //   startButton: {
  //     url: 'https://eservices.moiat.gov.ae/eservices/notification-of-conformity-assessment-bodies?lang=en',
  //   },
  //   description:
  //     'The notification service is the process of approving a conformity assessment body following the technical requirements and regulations issued by the Ministry which will be authorized to issue conformity certificates and badges on behalf of the Ministry following the requirements of Cabinet Resolution No. 35 of 2015.',
  //   sections: [
  //     {
  //       label: 'Service Procedure',
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //         },
  //         {text: 'Apply to “Notification of Conformity Assessment Bodies”'},
  //         {
  //           text: 'Attach all required documents and forms specified in the application form',
  //         },
  //         {text: 'Payment of fees'},
  //         {text: 'Document review by the designated employee'},
  //         {text: 'Carry out evaluation process'},
  //         {text: 'Obtain the certificate'},
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'Valid UAE trade license',
  //         'Valid registration certificate issued by MoIAT',
  //         'Valid accreditation certificate issued through ENAS or any approved accreditation body in the relevant field',
  //         'Quality and procedures manual, including assessment procedures and conformity assessment systems',
  //         'Policy for Independence and Impartiality approved by top management',
  //         'Description on independence of the CAB from the authority (esp. if public entity)',
  //         'Professional Liability Insurance Coverage (AED 3,000,000 minimum)',
  //         'List of employees (permanent, non-permanent, external contracts) with duties and responsibilities',
  //         'Description of accredited inspection capabilities and certification system',
  //         'Documents proving competence in subcontractor assessment and validation',
  //         'List of accredited subcontractors with scope details',
  //         'Checklists used in assessments',
  //         'Details of other licensed activities in the UAE (outside scope)',
  //         'Details on owned accredited laboratories and testing facilities',
  //         'Non-discriminatory policy with clients signed by top management',
  //         'Qualification matrix/criteria',
  //       ],
  //     },
  //     {
  //       label: 'User Guides',
  //       links: [
  //         {
  //           text: 'User Guide - AR - Notification of CAB',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/user-guide---ar---notification-of-cab.ashx',
  //         },
  //         {
  //           text: 'User Guide - EN - Notification of CAB',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/user-guide---en---notification-of-cab.ashx',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees: '21,500 - 24,500 AED',
  //     price:
  //       '1000 AED (application) + 2500 AED (document review) + 3000 AED (assessment per assessor/day) + 15000 AED (certificate issuance)',
  //   },
  //   serviceTime: '50 Working Days',
  //   faq: {
  //     items: [
  //       {
  //         question:
  //           'How can I notify conformity assessment bodies and what are the requirements?',
  //         proceduresTitle: 'Service Procedure',
  //         requirementsTitle: 'Requirements',
  //         answers: [
  //           'Register on the Ministry’s online e-services platform',
  //           'Apply for service and attach required documents',
  //           'Pay fees',
  //           'Document review and evaluation process',
  //           'Final decision and certificate issuance',
  //         ],
  //         requirements: [
  //           'Valid trade license',
  //           'Valid registration certificate',
  //           'Valid accreditation certificate',
  //           'Quality manual and procedures',
  //           'Policy of independence and impartiality',
  //           'Professional liability insurance coverage',
  //           'List of employees with responsibilities',
  //           'Description of inspection/certification capabilities',
  //           'Competence documents for subcontractors',
  //           'List of accredited subcontractors with scope',
  //           'Checklists',
  //           'Other licensed activities details',
  //           'Accredited labs/testing facilities details',
  //           'Non-discrimination policy',
  //           'Qualification matrix/criteria',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'National Accreditation Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Notification',
  //     },
  //     serviceType: {label: 'Service Type', value: 'Transactional'},
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open this service card on your phone or tablet.',
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Service Availability',
  //       value: 'During official working hours',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['Visa', 'Mastercard'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Browser',
  //       web: 'Digital platform of the Ministry of Industry and Advanced Technology',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Development Goals',
  //       values: [
  //         'Good Health and Well-Being',
  //         'Decent Work and Economic Growth',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'Registration of Conformity Assessment Bodies',
  //         'Accreditation of Conformity Assessment Bodies',
  //       ],
  //     },
  //   },
  //   extraLinks: {
  //     video: 'https://youtu.be/dT3H-AXfDTs',
  //   },
  // },
  {
    id: 'fa284c5e-8c7a-4e5f-a2b1-bcf13ca89373',
    relatedServiceId: 1050,
    title: 'Buy UAE Standard Specifications​',
    Category_Id: '1768e3ba-55fd-4be9-8df2-2c4e808c70dc',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    userManual: {
      url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/purchase-standards-user-manual.ashx',
      title: 'Purchase Standards User Manual',
    },
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/selling-standards?lang=en',
    },
    description:
      'This service allows you to apply for the UAE standard specifications and view the latest specifications and requirements. It helps to enhance the competitiveness of national products and ensure compliance with health and safety standards through their implementation.​',
    sections: [
      {
        label: 'Service Procedures',
        serviceProcedures: [
          {
            text: "Create an account or log in to the ministry's digital platform for services (moiat.gov.ae)​",
            url: 'https://sso.moiat.gov.ae/',
          },
          {text: 'Apply to obtain the UAE standard specifications​'},
          {
            text: 'Select the required specifications and add them to the shopping cart​',
          },
          {text: 'Pay the applicable fees​'},
          {text: 'Download the specifications in PDF format​'},
        ],
      },
      {
        label: 'User Manuals',
        links: [
          {
            text: 'Purchase Standards User Manual',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/purchase-standards-user-manual.ashx',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'According to the number of pages of the specification',
    },
    serviceTime: 'Instant Service',
    faq: {
      items: [
        {
          question: 'How to sell standards?',
          proceduresTitle: 'Service Procedures',
          answers: [
            'Register on the Ministry’s online e-services platform and apply',
            'Define the required specifications',
            'Add the specification to the shopping cart',
            'Payment of fees',
            'Download specification as PDF',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {label: 'Service Category', value: 'Standards Services'},
      serviceSubCategory: {label: 'Service Sub-Category', value: 'Standards'},
      serviceType: {label: 'Service Type', value: 'Commercial / Transactional'},
      targetAudience: {
        label: 'Target Audience',
        value: 'Companies, Individuals ,Government Agencies​',
      },
      qrCaption: 'Open this service card on your phone or tablet.',
    },
    serviceInfo: {
      title: 'Service Info',
      availability: {
        label: 'Service Availability',
        value: '24/7 Instant Service',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['Visa', 'Mastercard'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'MoIAT Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple App Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Good Health And Well-Being',
          'Decent Work and Economic Growth',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['Registration of conformity assessment bodies'],
      },
    },
  },
  {
    id: 'a0606a66-0d58-45e4-97fc-6524fc71dce0',
    relatedServiceId: 17,
    type: 'il',
    Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
    title: 'Suspend/Cancel Industrial Production License',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/IndustrialLicenseCancellation',
    },
    aboutService: 'About this Service',
    description:
      'This service allows you to submit a request to temporarily suspend an industrial production permit by providing the reasons for the suspension. It applies when changes or modifications occur to the facility, resulting in the temporary suspension of its eligibility to receive the benefits of an industrial production license.',

    sections: [
      {
        serviceProcedures: [
          {
            text: "Log in to the ministry's digital services platform (moiat.gov.ae)​",
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to suspend an industrial production license',
          },

          {text: 'Attach all required documents​'},
          {text: 'Pay the applicable fees​'},
          {
            text: 'Receive confirmation of the suspension of the industrial production license​',
          },
        ],
      },
      {
        Requirements: [
          'An official letter from the industrial facility stating the reasons for requesting the suspension.',
        ],
      },
      {
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            name: 'UserManual - Cancel industrial production license',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---cancel-industrial-production-license.ashx',
            size: '570 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],

    serviceFees: 'AED 0',
    fee: 'Free',

    aed0: 'AED 0',
    note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',

    serviceTime: '2 Working Days',
    packageTitle: 'package',
    none: 'N/A',

    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'Q) What are the requirements for the service, and how can I apply',
          procedures: [
            'A) You can apply for cancellation through the website with an official letter from the facility, and a copy of the license issued by the local authority.',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24/7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Local licensing authorities (departments of economic development)',
        ],
      },
    },

    serviceNotes: {
      title: 'Your Service Feedback',
      contactCenter: {
        label: 'Call Center',
        value: '600565554',
      },
      customerCare: {
        label: 'Email',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'Technical Support',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'Related Services',
      services: [
        {
          title:
            'Request Customs Duty Exemption for Industrial Inputs (Machinery, Equipment, and Raw Materials)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'Request Quantity Increase for a Registered Industrial Input',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title:
            'Request Registration of Industrial Input for Customs Duty Exemption',
          url: 'https://moiat.gov.ae/services/request-registration-of-industrial-input-for-customs-duty-exemption',
        },
        {
          title: 'Value-Added Certificate',
          url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
        },
        {
          title: 'Cancel Industrial Production License',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'Modify Industrial Production License',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
        {
          title: 'Renew Industrial Production License',
          url: 'https://moiat.gov.ae/services/renew-industrial-production-license',
        },
        {
          title: 'Issue Industrial Production License',
          url: 'https://moiat.gov.ae/services/issue-industrial-production-license',
        },
        {
          title: 'Cancel Initial Approval Certificate',
          url: 'https://moiat.gov.ae/services/cancel-initial-approval-certificate',
        },
        {
          title: 'Modify the initial approval certificate',
          url: 'https://moiat.gov.ae/services/modify-initial-approval-certificate',
        },
        {
          title: 'Renew Initial Approval Certificate',
          url: 'https://moiat.gov.ae/services/renew-initial-approval-certificate-unpublished',
        },
        {
          title: 'Issue Initial Approval Certificate',
          url: 'https://moiat.gov.ae/services/issue-initial-approval-certificate',
        },
        {
          title: 'Fast Track Customs Exemption',
          url: 'https://moiat.gov.ae/services/fast-track-customs-exemption-request',
        },
      ],
    },
    moreInfo: {
      title: 'More information',
      cards: [
        {
          title: 'Programs',
          action: 'Read More',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'Sustainable Development Goals',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'Partners',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'Laws & Legislations',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'Did you find this content useful?',
      hint: 'You can help us improve by sharing your feedback about your experience.',
      yes: 'Yes',
      no: 'No',
    },
  },
  {
    id: 'a0606a66-0d58-45e4-97fc-6543fc71dce0',
    // relatedServiceId: 17,
    type: 'il',
    Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
    title: 'Reactivate Industrial Production License​​',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/IndustrialLicenseCancellation',
    },
    aboutService: 'About this Service',
    description:
      'Through this service, an industrial facility can reactivate its industrial production license upon the owner’s request to lift the suspension, following the correction or removal of the issues that led to the permit’s suspension.​',

    sections: [
      {
        serviceProcedures: [
          {
            text: 'Log in to MoIAT’s digital services platform',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to reactivate an industrial production license',
          },
          {
            text: 'Attach the required attachments',
          },
          {
            text: 'Pay the application fee',
          },
          {
            text: 'Pay the inspection fee',
          },
          {
            text: 'Meet the inspector',
          },
          {
            text: 'Receive the reactivated industrial production license',
          },
        ],
      },
      {
        Requirements: [
          'An official letter from the industrial facility with reasons for reactivation.',
        ],
      },
    ],

    serviceFees: 'AED 0',
    fee: 'Free',

    aed0: 'AED 0',
    note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',

    serviceTime: '2 Working Days',
    packageTitle: 'package',
    none: 'N/A',

    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'Q) What are the requirements for the service, and how can I apply',
          procedures: [
            'A) You can apply for cancellation through the website with an official letter from the facility, and a copy of the license issued by the local authority.',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24/7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Local licensing authorities (departments of economic development)',
        ],
      },
    },

    serviceNotes: {
      title: 'Your Service Feedback',
      contactCenter: {
        label: 'Call Center',
        value: '600565554',
      },
      customerCare: {
        label: 'Email',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'Technical Support',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'Related Services',
      services: [
        {
          title:
            'Request Customs Duty Exemption for Industrial Inputs (Machinery, Equipment, and Raw Materials)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'Request Quantity Increase for a Registered Industrial Input',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title:
            'Request Registration of Industrial Input for Customs Duty Exemption',
          url: 'https://moiat.gov.ae/services/request-registration-of-industrial-input-for-customs-duty-exemption',
        },
        {
          title: 'Value-Added Certificate',
          url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
        },
        {
          title: 'Cancel Industrial Production License',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'Modify Industrial Production License',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
        {
          title: 'Renew Industrial Production License',
          url: 'https://moiat.gov.ae/services/renew-industrial-production-license',
        },
        {
          title: 'Issue Industrial Production License',
          url: 'https://moiat.gov.ae/services/issue-industrial-production-license',
        },
        {
          title: 'Cancel Initial Approval Certificate',
          url: 'https://moiat.gov.ae/services/cancel-initial-approval-certificate',
        },
        {
          title: 'Modify the initial approval certificate',
          url: 'https://moiat.gov.ae/services/modify-initial-approval-certificate',
        },
        {
          title: 'Renew Initial Approval Certificate',
          url: 'https://moiat.gov.ae/services/renew-initial-approval-certificate-unpublished',
        },
        {
          title: 'Issue Initial Approval Certificate',
          url: 'https://moiat.gov.ae/services/issue-initial-approval-certificate',
        },
        {
          title: 'Fast Track Customs Exemption',
          url: 'https://moiat.gov.ae/services/fast-track-customs-exemption-request',
        },
      ],
    },
    moreInfo: {
      title: 'More information',
      cards: [
        {
          title: 'Programs',
          action: 'Read More',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'Sustainable Development Goals',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'Partners',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'Laws & Legislations',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'Did you find this content useful?',
      hint: 'You can help us improve by sharing your feedback about your experience.',
      yes: 'Yes',
      no: 'No',
    },
  },
  {
    id: '53d94393-4c32-46be-a9d5-a5c57515df31',
    relatedServiceId: 13,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'Approval for Exemption of Industrial Input from Customs Duties​',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/NewRawMaterial',
    },
    aboutService: 'About this Service',
    description:
      "This service allows you to apply for approval to exempt machinery, equipment, or raw materials previously registered in the ministry's system from customs duties.​",
    sections: [
      {
        serviceProcedures: [
          {
            text: 'Login or Register to the Ministry services digital platform',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Submit a request for approval to exempt machinery, equipment, and raw materials from customs duties',
          },
          {
            text: "Attach an invoice certified by the Ministry of Foreign Affairs or obtain certification through the Ministry of Industry and Advanced Technology's website.",
          },
          {
            text: 'Pay the applicable fees​',
          },
          {
            text: 'Receive digital approval from the Ministry to exempt machinery, equipment, and materials from customs duties',
          },
        ],
      },
      {
        Requirements: [
          'Certified invoices including the H.S. Code for the materials to be imported',

          'Bill of Lading​',
          'Materials list',
          'Certificate of origin',
        ],
      },
      {
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/request-customs-duty-exemption-for-industrial-inputs.ashx',
            name: 'Request Customs Duty Exemption for Industrial Inputs',
            size: '212 KB',
            type: 'application/pdf',
          },
          {
            name: 'UserManual - Request Customs Duty Exemption for Industrial Inputs',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---request-customs-duty-exemption-for-industrial-inputs.ashx',
            size: '690 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'AED 50 for HS Code​',
      aed100: 'AED 100',
      hscodeRequestFee: '100 dirhams for each HS code.',
      aed0: 'AED 0',
      note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',
    },

    serviceTime: '1 Working Days',
    package: 'Package',
    dutyExempotionPachage: [
      {
        documentText: 'Customs Exemption Package',
        url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/dutyexceptionpakcages.ashx',
        screen: '',
      },
    ],
    tags: [
      {documentText: 'Associated with Customs', url: '', screen: 'Services'},
      {documentText: 'Priority Service', url: '', screen: 'Services'},
    ],
    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'How can i apply for a quantity increase request regarding registered material?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          procedures: [
            'Login to the Ministry’s digital services platform',
            'Complete the Customs Exemption Request Form (ensure your invoices are attested before attaching)',
            'Payment  the fees',
            'Download a printed copy of the submitted application form or the payment receipt containing the application number starting with DX.',
            'Attach the downloaded application form or payment receipt to your customs declaration request (in the customs system) and mention the application number that begins with DX.',
            'A customs officer will check the application.',
            'If approved, the quantity will be deducted from the factory’s balance.',
          ],
          requirements: [
            'Industrial Production License',
            'Legalized/attested invoices (legalization/attestation is a service related to Ministry of Foreign Affairs and International Cooperation [MOFAIC]).',
            'Bill of lading',
            'Packing list',
            'Certificate of origin',
          ],
        },
        {
          question: 'Information about invoices and their values',
          answers: 'Referred to the relevant team',
        },
        {
          question:
            'Can I Obtain the service without an Industrial Production License',
          answers: 'No',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24/7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value:
          'Local licensing authorities (departments of economic development)',
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
    },
    serviceNotes: {
      title: 'Your Service Feedback',
      contactCenter: {
        label: 'Call Center',
        value: '600565554',
      },
      customerCare: {
        label: 'Email',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'Technical Support',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'Related Services',
      services: [
        {
          title:
            'Request Customs Duty Exemption for Industrial Inputs (Machinery, Equipment, and Raw Materials)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'Request Quantity Increase for a Registered Industrial Input',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title: 'Issue Preferential Price Certificate',
          url: 'https://moiat.gov.ae/services/issue-preferential-price-certificate',
        },
        {
          title: 'Value-Added Certificate',
          url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
        },
        {
          title: 'Cancel Industrial',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'Modify Industrial Production License',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'More information',
      cards: [
        {
          title: 'Programs',
          action: 'Read More',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'Sustainable Development Goals',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'Partners',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'Laws & Legislations',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'Did you find this content useful?',
      hint: 'You can help us improve by sharing your feedback about your experience.',
      yes: 'Yes',
      no: 'No',
    },
  },
  {
    id: '24f7abf8-c668-4c4d-b9ae-96451085093a',
    relatedServiceId: 25,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'Approval for Customs Exemption - Fast Track',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/NewRawMaterial',
    },
    aboutService: 'About this Service',
    description:
      'This service enables customers to apply for an instant customs exemption if the requested increase does not exceed 30% of the previously registered quantity of production input materials for industrial processes, within the specified period.​',
    note: 'Note: The service enables the customer to authenticate invoices from the Ministry of Foreign Affairs (MoF) via direct integrating with MoF services without needing to visit MoF services website.',
    sections: [
      {
        serviceProcedures: [
          {
            text: "Log in to the ministry's digital platform for services: -SSO (moiat.gov.ae)​",
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Submit a customs exemption request - Fast Track​',
          },
          {text: 'Upload required documents'},
          {text: 'Pay the applicable fees​'},
          {
            text: 'Apply for the customs exemption service to the relevant local customs authority',
          },
          {
            text: 'Approve or reject the exemption based on a report from the local customs authority staff.',
          },
        ],
      },
      {
        Requirements: [
          'Packing list',
          'Bill of lading',
          'Certificate of origin',
        ],
      },
      {
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/request-customs-duty-exemption-for-industrial-inputs.ashx',
            name: 'Request Customs Duty Exemption for Industrial Inputs',
            size: '212 KB',
            type: 'application/pdf',
          },
          {
            name: 'UserManual - Request Customs Duty Exemption for Industrial Inputs',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---request-customs-duty-exemption-for-industrial-inputs.ashx',
            size: '690 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value:
            'Quantity increase fee for an industrial production input registered with a Harmonized System Code (HS Code): AED 50 ​',
        },
        {
          value:
            'Customs duty exemption fee for each application according to the Harmonized System Code (HS Code): AED 50​',
        },
        {
          value:
            'Document certification fee (according to the Ministry of Foreign Affairs fees) if the document is not certified: AED 150​',
        },
      ],
    },

    serviceTime: 'Instant Service',
    provisionTimes: 'Service provision times',
    packageTitle: 'package',
    package: [
      'Request Quantity Increase for a Registered Industrial Input',
      'Request Customs Duty Exemption for Industrial Inputs (MoIAT)',
      'Document attestation (MoF)',
      'Local customs authorities',
    ],

    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'How can i apply for a quantity increase request regarding registered material?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          procedures: [
            'Completing the application and inputting the following information: trade name, legal entity, ownership change, modification of financial statements, changing raw material record, changing product record, changing communication data, capital and employees.',
            'Payment  the fees',
            'Application is approved if the data and attachments are correct.',
            'Application is referred to inspection if there is a change of activity or location.',
            'Payment of application and inspection fees.',
            'Inspection of the facility to ensure that it complies with the conditions of the industrial license.',
            'Amendment is approved if data and attachments are correct.',
          ],
          requirements: [
            'Attach the documents you wish to amend (trade name, legal entity, ownership change, capital), while providing: - Copy of a valid local license - Copy of the amended partnership contract - Copy of family book for citizens, or passport and residence permit for non-citizens.',
            'For modification of financial statements, changing raw material record, changing product record, changing the factory’s address, no documents are required.',
            "For location change or activity change, the following documents are needed: - Copy of the local license - Map - Inspection report - Workers' statement from the Ministry of Labor - Existence of the amendment in the local license certificate.",
          ],
        },
        {
          question: 'Information about invoices and their values',
          answers: 'Referred to the relevant team',
        },
        {
          question:
            'Can I Obtain the service without an Industrial Production License',
          answers: 'No',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24/7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Registration in Industrial registry record',
          'Issuing industrial production permit',
          'Register industrial input material for duty exemption',
          'Document attestation by MoFAIC.',
        ],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
    },
    serviceNotes: {
      title: 'Your Service Feedback',
      contactCenter: {
        label: 'Call Center',
        value: '600565554',
      },
      customerCare: {
        label: 'Email',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'Technical Support',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'Related Services',
      services: [
        {
          title:
            'Request Customs Duty Exemption for Industrial Inputs (Machinery, Equipment, and Raw Materials)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'Request Quantity Increase for a Registered Industrial Input',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title: 'Issue Preferential Price Certificate',
          url: 'https://moiat.gov.ae/services/issue-preferential-price-certificate',
        },
        {
          title: 'Value-Added Certificate',
          url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
        },
        {
          title: 'Cancel Industrial',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'Modify Industrial Production License',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'More information',
      cards: [
        {
          title: 'Programs',
          action: 'Read More',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'Sustainable Development Goals',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'Partners',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'Laws & Legislations',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'Did you find this content useful?',
      hint: 'You can help us improve by sharing your feedback about your experience.',
      yes: 'Yes',
      no: 'No',
    },
  },
  {
    id: '24ba748e-6217-464f-b60e-9c450df28efa',
    relatedServiceId: 10,
    type: 'il',
    title: 'Issue Industrial Production License',
    Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/IndustrialLicenseRegistration?addFactory=True',
    },
    aboutService: 'About this Service',
    description:
      'This service allows you to apply for an industrial production license for facilities that are subject to industrial licensing requirements. This permit enables you to apply for exemptions from customs duties on the import of machinery, equipment, spare parts, and other materials directly involved in the manufacturing process. You can also access additional benefits and services provided by the Ministry.',

    sections: [
      {
        serviceProcedures: [
          {
            text: 'Create an account or log in to MoIAT’s digital services platform (moiat.gov.ae)​',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply for an industrial production license​',
          },
          {text: 'Attach all required documents'},
          {
            text: 'Pay the application fee',
          },
          {
            text: 'Pay the inspection fee',
          },
          {
            text: "Meet the ministry's inspector",
          },
          {
            text: 'You will receive a digital copy of the industrial production license​',
          },
        ],
      },
      {
        Requirements: [
          'Local industrial license',
          'Partnership contract',
          'Incorporation contract',
          'Identifying documents of the owner or manager, depending on the legal form of the establishment​',
        ],
      },
      {
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-industrial-production-license.ashx',
            name: 'Issue Industrial Production License',
            size: '305 KB',
            type: 'application/pdf',
          },
          {
            title: 'User Manual',
            name: 'UserManual - Issue Industrial Production License',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---issue-industrial-production-license.ashx',
            size: '757 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],

    serviceFees: 'AED 0 for Application \n​AED 100 for Inspection',

    fee: 'Free - The inspection fee is 100 dirhams.',
    aed0: 'AED 0',
    note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',

    serviceTime: '5 Working Days',

    packageTitle: 'package',
    none: 'N/A',
    uaePass: {
      title: 'UAE Pass eSeal',
      items: [
        'This service uses UAE Pass eSeal to guarantee authenticity and origin of the document.',
        'Visit https://selfcare.uaepass.ae/ to verify a document authenticity.',
      ],
    },
    moIATlBockchain: {
      title: 'MoIAT Blockchain',
      items: [
        "This service uses MoIAT Blockchain to add an additional layer of the document's authenticity.",
        'Scan the QR Code on the document and upload the electronic copy to the webpage to validate against the MoIAT Blockchain.',
      ],
    },

    faq: {
      name: 'FAQ',
      items: [
        {
          question: 'What are the criteria for the license and how can i apply',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          procedures: [
            "Login or register on the Ministry's online e-services platform.",
            'The relevant team will review the application.',
            'Payment of the inspection fee if application is successful.',
            'Inspection of the facility, and writing of the inspection report.',
            'The license is issued if the inspection report is approved.',
          ],
          requirements: [
            'The company’s memorandum of association, including one-person companies (with the exception of personal companies).',
            'Total of no fewer than 10 employees.',
            'Total capital of no less than AED 250,000.',
            'Industrial license from a local licensing department.',
          ],
        },
        {
          question: 'How long does obtaining the license take?',
          answers: 'Within 15 business days',
        },
        {
          question:
            'How can i add an activity that is not included within the activites listed on the system ?',
          answers:
            'You can send an email to the Ministry’s technical support team',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24/7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Local licensing authorities (departments of economic development)',
        ],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://youtu.be/kSkjVN0dK3Q',
    },
    serviceNotes: {
      title: 'Your Service Feedback',
      contactCenter: {
        label: 'Call Center',
        value: '600565554',
      },
      customerCare: {
        label: 'Email',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'Technical Support',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'Related Services',
      services: [
        {
          title: 'Renew Industrial Production License',
          url: 'https://moiat.gov.ae/services/renew-industrial-production-license',
        },
        {
          title: 'Modify Industrial Production License',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
        {
          title: 'Cancel Industrial Production License',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'Renew Initial Approval Certificate',
          url: 'https://moiat.gov.ae/services/renew-initial-approval-certificate-unpublished',
        },
      ],
    },
    moreInfo: {
      title: 'More information',
      cards: [
        {
          title: 'Programs',
          action: 'Read More',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'Sustainable Development Goals',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'Partners',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'Laws & Legislations',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'Did you find this content useful?',
      hint: 'You can help us improve by sharing your feedback about your experience.',
      yes: 'Yes',
      no: 'No',
    },
  },
  // {
  //   id: '6bea6add-a5c1-452b-84b2-1f8905d43a39',
  //   relatedServiceId: false,
  //   type: 'il',
  //   Category_Id: 'd5685023-9f9c-450a-a9c3-415af1c6c144',
  //   title: 'Issue Preferential Price Certificate',
  //   startButton: {
  //     title: 'Start Service',
  //     url: 'https://il.moiat.gov.ae/en/PricePreference',
  //   },
  //   aboutService: 'About this Service',
  //   description:
  //     'This service benefits factories with an industrial license certificate, which gives priority to national factory products when applying for procurement tenders in the Ministry of Finance or local financial departments.',

  //   sections: [
  //     {
  //       serviceProcedures: [
  //         {
  //           text: 'Login or Register to the Ministry services digital platform',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'Apply to “Issue of a price preference certificate”',
  //         },
  //         {text: 'Receive the certificate'},
  //       ],
  //     },
  //     {
  //       Requirements: ['N/A'],
  //     },
  //     {
  //       filesSection: {
  //         fileName: 'File Name',
  //         fileSize: 'File Size',
  //         fileType: 'File Type',
  //       },
  //       filesList: [
  //         {
  //           name: 'UserManual - Issue of a price preference certificate',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---issue-of-a-price-preference-certificate.ashx',
  //           size: '533 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],

  //   serviceFees: 'Free',
  //   fee: 'Free',

  //   aed0: 'AED 0',
  //   note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',

  //   serviceTime: 'Instant Service',
  //   packageTitle: 'package',
  //   none: 'N/A',

  //   faq: {
  //     name: 'FAQ',
  //     items: [
  //       {
  //         question: 'Q) What are the procedures for obtaining the service?',
  //         proceduresTitle: 'Service Procedures',
  //         requirementsTitle: 'Requirements',
  //         procedures: [
  //           'Register to the Ministry’s online e-services platform',
  //           'Submit an application',
  //           'Payment of fees',
  //           'Certificate is received',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'Industrial Licensing Services',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'Customs Duty Exemption',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Industrial businesses\nGovernment Entities​',
  //     },
  //     qrCaption: 'Open the service card on mobile or tablet.',
  //   },
  //   generalDocument: {
  //     title: 'General Documents',
  //     description:
  //       'Directory of digital services for the Ministry of Industry and Advanced Technology',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'Download',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'Service Information',
  //     availability: {
  //       label: 'Availability',
  //       value: 'Open 24/7',
  //     },
  //     paymentChannels: {
  //       label: 'Payment Channels',
  //       values: ['MasterCard', 'Visa'],
  //     },
  //     serviceChannels: {
  //       label: 'Service Channels',
  //       browser: 'Web Browser',
  //       web: 'Ministry Digital Services Platform',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'Google Play',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'Apple Store',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'Sustainable Goals',
  //       values: [
  //         'Clean Water and Sanitation',
  //         'Decent Work and Economic Growth',
  //         'Industry, Innovation and Infrastructure',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: ['N/A'],
  //     },
  //   },

  //   serviceNotes: {
  //     title: 'Your Service Feedback',
  //     contactCenter: {
  //       label: 'Call Center',
  //       value: '600565554',
  //     },
  //     customerCare: {
  //       label: 'Email',
  //       value: 'customercare@moiat.gov.ae',
  //     },
  //     technicalSupport: {
  //       label: 'Technical Support',
  //       value: 'support@moiat.gov.ae',
  //     },
  //   },
  //   relatedServices: {
  //     title: 'Related Services',
  //     services: [
  //       {
  //         title:
  //           'Request Customs Duty Exemption for Industrial Inputs (Machinery, Equipment, and Raw Materials)',
  //         url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
  //       },
  //       {
  //         title: 'Request Quantity Increase for a Registered Industrial Input',
  //         url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
  //       },
  //       {
  //         title:
  //           'Request Registration of Industrial Input for Customs Duty Exemption',
  //         url: 'https://moiat.gov.ae/services/request-registration-of-industrial-input-for-customs-duty-exemption',
  //       },
  //       {
  //         title: 'Value-Added Certificate',
  //         url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
  //       },
  //       {
  //         title: 'Cancel Industrial Production License',
  //         url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
  //       },
  //       {
  //         title: 'Modify Industrial Production License',
  //         url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
  //       },
  //       {
  //         title: 'Renew Industrial Production License',
  //         url: 'https://moiat.gov.ae/services/renew-industrial-production-license',
  //       },
  //       {
  //         title: 'Issue Industrial Production License',
  //         url: 'https://moiat.gov.ae/services/issue-industrial-production-license',
  //       },
  //       {
  //         title: 'Cancel Initial Approval Certificate',
  //         url: 'https://moiat.gov.ae/services/cancel-initial-approval-certificate',
  //       },
  //       {
  //         title: 'Modify the initial approval certificate',
  //         url: 'https://moiat.gov.ae/services/modify-initial-approval-certificate',
  //       },
  //       {
  //         title: 'Renew Initial Approval Certificate',
  //         url: 'https://moiat.gov.ae/services/renew-initial-approval-certificate-unpublished',
  //       },
  //       {
  //         title: 'Issue Initial Approval Certificate',
  //         url: 'https://moiat.gov.ae/services/issue-initial-approval-certificate',
  //       },
  //       {
  //         title: 'Fast Track Customs Exemption',
  //         url: 'https://moiat.gov.ae/services/fast-track-customs-exemption-request',
  //       },
  //     ],
  //   },
  //   moreInfo: {
  //     title: 'More information',
  //     cards: [
  //       {
  //         title: 'Programs',
  //         action: 'Read More',
  //         url: 'https://moiat.gov.ae/programs',
  //       },
  //       {
  //         title: 'Sustainable Development Goals',
  //         action: 'Read More',
  //         url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
  //       },
  //       {
  //         title: 'Partners',
  //         action: 'Read More',
  //         url: 'https://moiat.gov.ae/about-us/partners',
  //       },
  //       {
  //         title: 'Laws & Legislations',
  //         action: 'Read More',
  //         url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
  //       },
  //     ],
  //   },
  //   feedback: {
  //     question: 'Did you find this content useful?',
  //     hint: 'You can help us improve by sharing your feedback about your experience.',
  //     yes: 'Yes',
  //     no: 'No',
  //   },
  // },
  {
    id: 'b6998110-dc36-4969-9573-5aed61f2a3db',
    relatedServiceId: 19,
    type: 'il',
    Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
    title: 'Renew Industrial Production License',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/IndustrialLicenseRenewal',
    },
    aboutService: 'About this Service',
    description:
      'This service allows you to apply to renew an expired industrial production license.',

    sections: [
      {
        serviceProcedures: [
          {
            text: 'Log in to MoIAT’s digital services platform (moiat.gov.ae)​',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'Apply to renew industrial production​',
          },
          {text: 'Attach all required documents (if data is modified)'},
          {
            text: 'Pay the applicable fees',
          },
          {
            text: 'You will receive a digital copy of the renewed industrial production license',
          },
        ],
      },
      {
        Requirements: ['Local Industrial License'],
      },
      {
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/renew-industrial-production-license.ashx',
            name: 'Renew Industrial Production License',
            size: '319 KB',
            type: 'application/pdf',
          },
          {
            title: 'User Manual',
            name: 'UserManual - Renew Industrial Production License',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---renew-industrial-production-license.ashx',
            size: '870 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],

    serviceFees:
      'AED 500 for Application \n AED 100 for Inspection (if needed)​',
    feeNote:
      'The inspection fee is 100 dirhams. Delay fines are 100 dirhams per month, with a maximum limit of 1000 dirhams',
    aed0: 'AED 0',
    note: 'Note: In addition, the entity shall bear all the costs and expenses incurred in amending the accreditation activity, in addition to the expenses of travel, transportation, the residence of the assessor, or any additional expenses',

    serviceTime: '3 Working Days',
    packageTitle: 'package',
    none: 'N/A',
    uaePass: {
      title: 'UAE Pass eSeal',
      items: [
        'This service uses UAE Pass eSeal to guarantee authenticity and origin of the document.',
        'Visit https://selfcare.uaepass.ae/ to verify a document authenticity.',
      ],
    },
    moIATlBockchain: {
      title: 'MoIAT Blockchain',
      items: [
        "This service uses MoIAT Blockchain to add an additional layer of the document's authenticity.",
        'Scan the QR Code on the document and upload the electronic copy to the webpage to validate against the MoIAT Blockchain.',
      ],
    },

    faq: {
      name: 'FAQ',
      items: [
        {
          question: 'Q) Requirements for the service and how to apply',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          procedures: [
            "Login or register on the Ministry's online e-services platform.",
            'The relevant team will review the application.',
            'Payment of the inspection fee if application is successful.',
            'Inspection of the facility, and writing of the inspection report.',
            'The license is issued if the inspection report is approved.',
          ],
          requirements: [
            'Copy of a valid industrial license issued by the relevant local authority',
          ],
        },
        {
          question:
            'Q) Will the factory be subject to an inspection again upon renewal??',
          answers: 'A) Only in case of location or activity change.',
        },
        {
          question: 'Q) How much are the fines for late license renewal?',
          answers: 'A) AED 100 per month up to a maximum of AED 1,000',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24/7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: [
          'Local licensing authorities (departments of economic development)',
        ],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://youtu.be/wqVTTGiTN9I',
    },
    serviceNotes: {
      title: 'Your Service Feedback',
      contactCenter: {
        label: 'Call Center',
        value: '600565554',
      },
      customerCare: {
        label: 'Email',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'Technical Support',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'Related Services',
      services: [
        {
          title: 'Issue Industrial Production License',
          url: 'https://moiat.gov.ae/services/issue-industrial-production-license',
        },
        {
          title: 'Modify Industrial Production License',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
        {
          title:
            'Request Customs Duty Exemption for Industrial Inputs (Machinery, Equipment, and Raw Materials)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'Cancel Industrial Production License',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'More information',
      cards: [
        {
          title: 'Programs',
          action: 'Read More',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'Sustainable Development Goals',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'Partners',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'Laws & Legislations',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'Did you find this content useful?',
      hint: 'You can help us improve by sharing your feedback about your experience.',
      yes: 'Yes',
      no: 'No',
    },
  },
  {
    id: 'cbcb2568-826c-4e53-aa96-45dc3adef9fc',
    relatedServiceId: 14,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'Issue Value-Added Certificate under the Arab Rules of Origin​',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/ValueAdded',
    },
    aboutService: 'About this Service',
    description:
      'This service allows you to apply for a Value-Added Certificate in accordance with the Arab Rules of Origin. The system calculates the value added—the percentage of national components in the final product—based on the factory’s financial data. The national component must represent at least 40% of the total production cost. Obtaining this certificate enables the facility to register in the Ministry of Economy’s Certificate of Origin system, allowing it to export products abroad and benefit from customs exemptions.​',

    sections: [
      {
        serviceProcedures: [
          {text: 'Log in to MoIAT’s digital services platform (moiat.gov.ae)'},
          {
            text: 'Apply for a value-added certificate in accordance with the Arab Rules of Origin',
          },
          {text: 'Attach all required documents'},
          {text: 'Pay the application fee'},
          {text: 'Pay the inspection fee'},
          {text: 'Receive the inspector'},
          {
            text: 'Receive the value-added certificate in accordance with the Arab Rules of Origin',
          },
        ],
      },
      {
        Requirements: [
          "The factory's financial budget for the previous year, certified by an accredited audit firm",
          'Raw material invoices',
        ],
      },
      {
        filesSection: {
          fileName: 'File Name',
          fileSize: 'File Size',
          fileType: 'File Type',
        },
        filesList: [
          {
            title: 'Application Form',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-value-added-certificate.ashx',
            name: 'Issue Value-Added Certificate',
            size: '266 KB',
            type: 'application/pdf',
          },
          {
            title: 'User Manual',
            name: 'UserManual - Issue Value-Added Certificate',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---issue-value-added-certificate.ashx',
            size: '690 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value: 'AED 1,000',
        },
        {
          value: 'AED 100 for Inspection',
        },
      ],
    },
    serviceTime: '5 Working Days',
    provisionTimes: 'Service provision times',
    packageTitle: 'package',
    none: 'N/A',
    uaePass: {
      title: 'UAE Pass eSeal',
      items: [
        'This service uses UAE Pass eSeal to guarantee authenticity and origin of the document.',
        'Visit https://selfcare.uaepass.ae/ to verify a document authenticity.',
      ],
    },
    moIATlBockchain: {
      title: 'MoIAT Blockchain',
      items: [
        "This service uses MoIAT Blockchain to add an additional layer of the document's authenticity.",
        'Scan the QR Code on the document and upload the electronic copy to the webpage to validate against the MoIAT Blockchain.',
      ],
    },

    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'How can i apply for a quantity increase request regarding registered material?',
          proceduresTitle: 'Service Procedures',
          requirementsTitle: 'Requirements',
          procedures: [
            'Login to the Ministry’s online e-services platform',
            'Submit an application',
            'Payment  the fees',
            'Application will be reviewed by relevant official',
            'Certificate is issued if approved',
          ],
          requirements: [
            'Financial statements for the factory’s last fiscal year, including: - Balance sheet - Income list - Detailed analysis that covers the cost of sales, along with general and administrative expenses',
            'Attach invoices for raw material purchased from local or GCC factories in the same year',
          ],
        },
        {
          question: 'Is an Industrial License mandatory',
          answers: 'Yes it is mandatory',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Licensing Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customs Duty Exemption',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial businesses\nGovernment Entities​',
      },
      qrCaption: 'Open the service card on mobile or tablet.',
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'Service Information',
      availability: {
        label: 'Availability',
        value: 'Open 24/7',
      },
      paymentChannels: {
        label: 'Payment Channels',
        values: ['MasterCard', 'Visa'],
      },
      serviceChannels: {
        label: 'Service Channels',
        browser: 'Web Browser',
        web: 'Ministry Digital Services Platform',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'Apple Store',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'Sustainable Goals',
        values: [
          'Clean Water and Sanitation',
          'Decent Work and Economic Growth',
          'Industry, Innovation and Infrastructure',
        ],
      },
      serviceLinks: {
        label: 'Interconnection of the service',
        value: ['Ministry of Economy'],
      },
    },
    tutorialVideo: {
      title: 'Tutorial of applying for the service',
      url: 'https://www.youtube.com/watch?v=MsObY9JmDFU',
    },
    serviceNotes: {
      title: 'Your Service Feedback',
      contactCenter: {
        label: 'Call Center',
        value: '600565554',
      },
      customerCare: {
        label: 'Email',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'Technical Support',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'Related Services',
      services: [
        {
          title:
            'Request Customs Duty Exemption for Industrial Inputs (Machinery, Equipment, and Raw Materials)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'Request Quantity Increase for a Registered Industrial Input',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title:
            'Request Registration of Industrial Input for Customs Duty Exemption',
          url: 'https://moiat.gov.ae/services/request-registration-of-industrial-input-for-customs-duty-exemption',
        },
        {
          title: 'Cancel Initial Approval Certificate',
          url: 'https://moiat.gov.ae/services/cancel-initial-approval-certificate',
        },
      ],
    },
    moreInfo: {
      title: 'More information',
      cards: [
        {
          title: 'Programs',
          action: 'Read More',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'Sustainable Development Goals',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'Partners',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'Laws & Legislations',
          action: 'Read More',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'Did you find this content useful?',
      hint: 'You can help us improve by sharing your feedback about your experience.',
      yes: 'Yes',
      no: 'No',
    },
  },
  {
    id: 'e0d3c660-9bbe-42cf-9f52-b0644e6e2db6',
    Category_Id: 'c7dbbc80-47b8-4f0d-acf1-ef0069153621',
    title: 'Submit a Suggestion',
    relatedServiceId: 1156,
    aboutService: 'About this Service',
    description:
      'The ministry allows customers to submit suggestions regarding its services, initiatives, and activities to improve and develop work procedures.​​',

    sections: [
      {
        serviceProcedures: [
          {
            text: 'Register using the digital identity for "Digital Channels" or contact the call centre',
          },
          {
            text: 'Fill in the required information in the service application and attach supporting documents (if any)',
          },
          {
            text: 'The proposal will be reviewed by a specialized team at the Ministry',
          },
          {text: "Receive the Ministry's response to the proposal"},
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value: 'Free of Charge​',
        },
      ],
    },
    serviceTime: '15 Working Days',
    provisionTimes: 'Service provision times',
    packageTitle: 'package',
    none: 'N/A',
    uaePass: {
      title: 'UAE Pass eSeal',
      items: [
        'This service uses UAE Pass eSeal to guarantee authenticity and origin of the document.',
        'Visit https://selfcare.uaepass.ae/ to verify a document authenticity.',
      ],
    },
    moIATlBockchain: {
      title: 'MoIAT Blockchain',
      items: [
        "This service uses MoIAT Blockchain to add an additional layer of the document's authenticity.",
        'Scan the QR Code on the document and upload the electronic copy to the webpage to validate against the MoIAT Blockchain.',
      ],
    },

    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Submit a Suggestion',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Customer Services',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        value:
          'Individuals, companies, Government Entities, Non-Governmental Organization​',
      },
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
  },
  {
    id: '1fcd10c9-f5dd-4a44-8108-b4d16d12bdf6',
    Category_Id: 'c7dbbc80-47b8-4f0d-acf1-ef0069153621',
    title: 'Send an Inquiry',

    relatedServiceId: 1154,
    aboutService: 'About this Service',
    description:
      'The ministry allows customers to inquire about its services, initiatives, and activities, including the status of requests for previously provided services or any other inquiries customers may have',

    sections: [
      {
        serviceProcedures: [
          {
            text: 'Register using the digital identity for "Digital Channels" or contact the call centre',
          },
          {
            text: 'Fill in the required information in the service application and attach supporting documents (if any)',
          },
          {text: 'Receive a response to your inquiry from the Ministry'},
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value: 'Free of Charge​',
        },
      ],
    },
    serviceTime: '1 Working Day',
    provisionTimes: 'Service provision times',
    packageTitle: 'package',
    none: 'N/A',
    uaePass: {
      title: 'UAE Pass eSeal',
      items: [
        'This service uses UAE Pass eSeal to guarantee authenticity and origin of the document.',
        'Visit https://selfcare.uaepass.ae/ to verify a document authenticity.',
      ],
    },
    moIATlBockchain: {
      title: 'MoIAT Blockchain',
      items: [
        "This service uses MoIAT Blockchain to add an additional layer of the document's authenticity.",
        'Scan the QR Code on the document and upload the electronic copy to the webpage to validate against the MoIAT Blockchain.',
      ],
    },

    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Customer Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Send an Inquiry',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        value:
          'Individuals, companies, Government Entities, Non-Governmental Organization​​',
      },
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
  },
  {
    id: 'cdd40863-6803-4527-b3c0-d00294ddab77',
    Category_Id: 'c7dbbc80-47b8-4f0d-acf1-ef0069153621',
    title: 'Technical Support Request​',

    relatedServiceId: 1122,
    aboutService: 'About this Service',
    description:
      'The ministry allows customers to request technical support when they encounter any technical challenges while attempting to obtain any of its services, or are unable to complete the service procedures due to technical challenges or malfunctions.​',

    sections: [
      {
        serviceProcedures: [
          {text: 'Register using your digital ID or contact the call centre'},
          {text: 'Submit requests to the technical support team'},
          {text: 'Review and study of the request by the technical team'},
          {text: 'Receive answers to the requests from the Ministry'},
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value: 'Free of Charge​',
        },
      ],
    },
    serviceTime: '1 Working Day',
    provisionTimes: 'Service provision times',
    packageTitle: 'package',
    none: 'N/A',

    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Customer Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Technical Support Request',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        value:
          'Individuals, companies, Government Entities, Non-Governmental Organization​​',
      },
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
  },
  {
    id: 'cdd40863-6803-4527-4040-d00294ddab77',
    Category_Id: 'c7dbbc80-47b8-4f0d-acf1-ef0069153621',
    title: '​File a Complaint​​',
    relatedServiceId: 1155,
    aboutService: 'About this Service',
    description:
      'The ministry allows its clients to file complaints regarding any of its services. A complaint is defined as a written statement submitted by an external party expressing dissatisfaction with the procedures, transactions, or manner in which a service was provided.​​',

    sections: [
      {
        serviceProcedures: [
          {text: 'Register using your digital ID or call the call centre'},
          {
            text: 'Fill out the required information and attach supporting documents (if any)',
          },
          {text: 'Review the complaint by a specialized team at the ministry'},
          {
            text: "Receive the complaint resolution and evaluate the customer's satisfaction with the resolution",
          },
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value: 'Free of Charge​',
        },
      ],
    },
    serviceTime: '5 Working Day',
    provisionTimes: 'Service provision times',
    packageTitle: 'package',
    none: 'N/A',

    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Customer Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'File a Complaint',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        value:
          'Individuals, companies, Government Entities, Non-Governmental Organization​',
      },
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
  },
  {
    id: '83d7da27-27c2-4d52-ae84-caf2ddb710ef',
    relatedServiceId: 1145,
    Category_Id: '3e8e68f3-536c-471b-a44b-64fc2ff5a236',
    title: 'Issue Industrial Registry',
    startButton: {
      title: 'Start Service',
      url: 'https://il.moiat.gov.ae/en/ValueAdded',
    },
    aboutService: 'About this Service',
    description:
      'This service allows you to apply for an industrial registry for your facility. This registry contains all commercial, economic, and industrial data provided by the licensing authorities and the Ministry of Economy, as well as additional information requested by the Ministry of Industry and Advanced Technology. Having this registry enables you to access a range of services offered by the ministry, such as exemptions from customs duties on the import of machinery and equipment, subject to specific conditions.​',

    sections: [
      {
        serviceProcedures: [
          {
            text: "Create an account or log in to the ministry's digital services platform (moiat.gov.ae)​",
          },
          {text: 'Submit an application for an industrial registry'},
          {text: 'Attach all required documents'},
          {
            text: 'You will receive a digital copy of the industrial registry certificate​',
          },
        ],
      },
      {
        Requirements: [
          'Initial approval or industrial license from a local authority',
          'ID card or passport of the owner or manager, depending on the type of facility',
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value: 'Free',
        },
      ],
    },
    serviceTime: '3 Working Days',

    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'What is the criteria for certification and how can I apply?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          procedures: [
            "Login or register on the Ministry's online e-services platform",
            'Submit an Issue Initial Approval Certificate application',
            'Pay the application fee (fee is non-refundable)',
            'Application is reviewed by the Ministry',
            'If the application is successful, an initial approval certificate will be issued',
          ],
          requirements: [
            'Initial Approval Certificate from a local licensing authority (e.g. Departments of Economy)',
            'Identification documents of all owners (e.g. UAE ID, Passport, and Trade License)',
            'At least 10 employees within your organization',
            'Total manufacturing facility capital of at least AED 250,000',
            'You must abide by all laws and regulations in the country, including industrial security, public health and environmental conservation',
          ],
        },
        {
          question: 'Can the certificate be renewed? If so, how?',
          answers:
            'Initial approval is renewed annually through the website (e-services platform)',
        },
        {
          question:
            'Is it possible to import equipment and machinery to the factory when the certificate is obtained (before obtaining an industrial production license)?',
          answers:
            'In this case, the application will be referred to the relevant team',
        },
        {
          question: 'For how long is the certificate valid?',
          answers: '1 year',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Registry Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Issue Industrial Registry',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial Businesses\nGovernment Entities​',
      },
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
  },
  {
    id: '3638f5b4-65e6-467f-9ebb-3dc967077db5',
    relatedServiceId: 1146,
    title: 'Update Industrial Registry Data',
    Category_Id: '3e8e68f3-536c-471b-a44b-64fc2ff5a236',
    description:
      'This service allows you to submit a request to amend or update the industrial registry data of an industrial facility. It applies if the previously recorded information is incomplete or if there have been any changes or amendments to the commercial, economic, or industrial data of the facility, or to the data requested by the Ministry of Industry and Advanced Technology.​',

    sections: [
      {
        serviceProcedures: [
          {
            text: 'Login or Register to MoIAT’s digital platform for services (moiat.gov.ae)',
          },
          {text: 'Apply to update industrial registry data'},
          {text: 'Attach the required attachments'},
          {
            text: 'Pay the inspection fee (paid only if an inspection visit to the facility is required)',
          },
          {text: "Meet the ministry's inspector"},
          {
            text: 'You will receive a digital copy of the updated industrial registry',
          },
        ],
      },
      {
        Requirements: [
          " ID card or passport of the owner or manager, depending on the type of facility (in the event of amendments to the owner or manager's documents)​",
          'Documents indicating the amendment to the updated data​',
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value: 'AED 100 inspection for each visit​',
        },
      ],
    },
    serviceTime: '3 Working Days',

    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'What is the criteria for certification and how can I apply?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          procedures: [
            "Login or register on the Ministry's online e-services platform",
            'Submit an Issue Initial Approval Certificate application',
            'Pay the application fee (fee is non-refundable)',
            'Application is reviewed by the Ministry',
            'If the application is successful, an initial approval certificate will be issued',
          ],
          requirements: [
            'Initial Approval Certificate from a local licensing authority (e.g. Departments of Economy)',
            'Identification documents of all owners (e.g. UAE ID, Passport, and Trade License)',
            'At least 10 employees within your organization',
            'Total manufacturing facility capital of at least AED 250,000',
            'You must abide by all laws and regulations in the country, including industrial security, public health and environmental conservation',
          ],
        },
        {
          question: 'Can the certificate be renewed? If so, how?',
          answers:
            'Initial approval is renewed annually through the website (e-services platform)',
        },
        {
          question:
            'Is it possible to import equipment and machinery to the factory when the certificate is obtained (before obtaining an industrial production license?)',
          answers:
            'In this case, the application will be referred to the relevant team',
        },
        {
          question: 'For how long is the certificate valid?',
          answers: '1 year',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Registry Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Update Industrial Registry Data',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial Businesses​\nGovernment Entities​',
      },
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
  },
  {
    id: '45a69587-3387-4f13-906f-17eef0cf491a',
    relatedServiceId: 'link',
    startButton: {
      url: 'https://itti.moiat.gov.ae/',
    },
    title: 'Factory Assessment',
    Category_Id: 'bb0a6053-9efc-4031-bfd7-67202c842604',
    description:
      'This service enables customers to obtain an Industrial Technology Transformation Index (ITTI) assessment report for their factory through a field visit. The report provides key recommendations to support the factory’s technological transformation journey. By offering a comprehensive overview of technology adoption readiness and actionable insights, this service helps enhance industrial competitiveness and promotes a shift toward a sustainable, technology-driven industry.​',

    sections: [
      {
        serviceProcedures: [
          {
            text: "Login or Register to the ministry's digital platform for services (moiat.gov.ae)",
          },
          {text: 'Submit your factory on the digital platform'},
          {text: 'Communicate between the company and the assessor'},
          {text: 'Pay fees'},
          {text: 'Conduct the assessment'},
          {text: 'Complete and upload the report to the digital platform'},
          {text: 'Receive the report'},
        ],
      },
      {
        Requirements: ['Valid economic license​​'],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value:
            'Fees range from AED 0 to AED 20,000 per assessor, depending on the assessor and the location of the industrial company​',
        },
      ],
    },
    serviceTime: '5 -10 Working Days',

    faq: {
      name: 'FAQ',
      items: [
        {
          question:
            'What is the criteria for certification and how can I apply?',
          proceduresTitle: 'Service Procedure',
          requirementsTitle: 'Requirements',
          procedures: [
            "Login or register on the Ministry's online e-services platform",
            'Submit an Issue Initial Approval Certificate application',
            'Pay the application fee (fee is non-refundable)',
            'Application is reviewed by the Ministry',
            'If the application is successful, an initial approval certificate will be issued',
          ],
          requirements: [
            'Initial Approval Certificate from a local licensing authority (e.g. Departments of Economy)',
            'Identification documents of all owners (e.g. UAE ID, Passport, and Trade License)',
            'At least 10 employees within your organization',
            'Total manufacturing facility capital of at least AED 250,000',
            'You must abide by all laws and regulations in the country, including industrial security, public health and environmental conservation',
          ],
        },
        {
          question: 'Can the certificate be renewed? If so, how?',
          answers:
            'Initial approval is renewed annually through the website (e-services platform)',
        },
        {
          question:
            'Is it possible to import equipment and machinery to the factory when the certificate is obtained (before obtaining an industrial production license?)',
          answers:
            'In this case, the application will be referred to the relevant team',
        },
        {
          question: 'For how long is the certificate valid?',
          answers: '1 year',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'Industrial Technology Transformation Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Factory Assessment',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial Establishments​',
      },
    },
    generalDocument: {
      title: 'General Documents',
      description:
        'Directory of digital services for the Ministry of Industry and Advanced Technology',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'Download',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
  },
  {
    id: '9cb70d4a-a361-484c-9f45-4b31b9219a23',
   relatedServiceId: 'link',
    startButton: {
      url: 'https://icv.moiat.gov.ae/',
    },
    title: 'Issuing an ICV certification​',
    Category_Id: 'dc16af20-5124-47ed-937a-eb5f4122d1f8',
    description:
      'This service allows you to apply for a National In-Country Value (ICV) Certificate through a dedicated certification system. The system aims to enhance the economic impact of certified companies by redirecting government procurement spending and encouraging leading national companies to engage with them, thereby supporting the national economy across the industrial and services sectors.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: "Create an account or log in to the Ministry's digital platform for services​",
            url: 'https://sso.moiat.gov.ae/',
          },
          {text: 'Apply for the ICV certificate service​'},
          {text: 'Select an audit firm​'},
          {text: 'Submit information to obtain the certificate​'},
          {text: 'Pay fees to the audit firm​'},
          {text: 'Field audit​'},
          {text: 'Receive the ICV Certificate​'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'Valid business license',
          'Audited financial statements',
          'Other documents depending on company size',
        ],
      },
    ],
    serviceTime: '14-28 Working Days',
    serviceFees: {
      Fees: [
        {
          value:
            'It depends on the company details,but it can range from AED 500 to AED 10,000.​​​',
        },
      ],
    },
    serviceOverview: {
      title: 'Service Overview',
      serviceCategory: {
        label: 'Service Category',
        value: 'ICV Services',
      },
      serviceSubCategory: {
        label: 'Service Sub-Category',
        value: 'Issuing an ICV certification',
      },
      serviceType: {
        label: 'Service Type',
        value: 'Transactional',
      },
      targetAudience: {
        label: 'Target Audience',
        value: 'Industrial Establishments​',
      },
    },
  },
];
