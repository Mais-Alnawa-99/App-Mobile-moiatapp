export default [
  {
    id: 'b6f219d0-f864-4a21-b034-23e4841e09fa',
    relatedServiceId: 11,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'تسجيل مادة للإعفاء الجمركي',
    startButton: {
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/ar/NewRawMaterial',
      screen: 'CustomsExemptionRegistration',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكنك تقديم طلب تسجيل مواد أولية، آلات ومعدات ومواد خام، ومواد نصف مصنّعة أو كاملة الصنع، ومواد تعبئة وتغليف في حال كانت المنشأة الصناعية حاصلة على تصريح إنتاج صناعي فعّال. حيث ستتيح لك هذه الخدمة إمكانية التقديم على خدمة طلب الموافقة على إعفاء الآلات، والمعدات، والمواد الأولية من الرسوم الجمركية وذلك للاستفادة من الإعفاءات الجمركية.​',

    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)​',
            url: 'https://sso.moiat.gov.ae/',
            screem: '',
          },
          {text: '  تقديم طلب تسجيل مادة للإعفاء الجمركي ​'},
          {text: 'إرفاق المرفقات المطلوبة'},
          {text: 'دفع رسوم الطلب'},
          {text: 'استقبال مفتش الوزارة​'},
          {text: 'استلام نسخة رقمية من تسجيل مادة للإعفاء الجمركي'},
        ],

        Requirements: [
          'الفواتير المصدّقة وتتضمن الـ (H.S Code) للمواد المطلوب استيرادها​',

          'بوليصة الشحن',
          'قائمة المواد',
          'شهادة المنشأ',
        ],

        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع فلتر',
        },
        filesList: [
          {
            title: 'استمارة تقديم',
            name: 'Request Registration of Industrial Input for Customs Duty Exemption',
            size: '204 KB',
            type: 'application/pdf',
          },
          {
            name: 'UserManual - Request Registration of Industrial Input for Customs Duty Exemption',
            size: '691 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: '100 درهم عن كل رقم منسق جمركي\n100 درهم تفتيش​',
      aed100: 'AED 100',
      hscodeRequestFee: 'رسوم عن كل طلب رقم منسق',
      aed0: 'AED 0',
      note: 'ملاحظة رسوم الخدمة',
    },

    serviceTime: '3 أيام عمل',
    package: 'الباقة',
    dutyExempotionPachage: [
      {
        documentText: 'باقة الاعفاء الجمركي',
        url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/dutyexceptionpakcages.ashx',
        screen: '',
      },
    ],
    Tags: {
      documentText: 'خدمة متصلة بالجمارك',
      url: '',
      screen: 'Services',
    },
    faq: {
      name: 'الأسئلة الشائعة',
      question: 'ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
      proceduresTitle: 'إجراءات الخدمة',
      requirementsTitle: 'المتطلبات',
      procedures: [
        'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
        'تقديم طلب للحصول على طلب تسجيل مادة للإعفاء الجمركي (moiat.gov.ae)',
        'دفع الرسوم',
        'دراسة الطلب من قبل الموظف المختص',
        'في حال الموافقة تضاف المادة والكمية في رصيد المصنع',
        'في حال رفض الطلب لا تضاف المادة ولا الكمية في رصيد المصنع',
        'تحويل الطلب للتفتيش في حال وجود آلات أو معدات و في حال وجود كميات كبيرة في المواد الأولية',
        'دفع رسوم التفتيش',
        'زيارة المنشأة وكتابة التقرير',
        'تضاف المواد في حال الموافقة على تقرير التفتيش',
        'يرفض الطلب في حال عدم الموافقة',
        'في حال الخطأ في بيانات الطلب يتحمل المتعامل المسؤولية ولا يمكن استرجاع المبلغ المدفوع',
      ],
      requirements: [
        'رخصة الإنتاج الصناعي',
        'الفواتير المصدقة (التصديق هي خدمة مرتبطة بوزارة الخارجية والتعاون الدولي (MOFAIC))',
        'بوليصة الشحن',
        'قائمة التعبئة',
        'شهادة المنشأ',
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
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
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
        value: 'لا يوجد',
      },
    },
    tutorialVideo: {
      url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
    },
    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'الخدمات ذات الصلة',
      services: [
        {
          title:
            'طلب إعفاء مدخلات الصناعة من الرسوم الجمركية (آلات، معدات ومواد أولية)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'طلب زيادة كمية لمادة مسجلة للإعفاء الجمركي',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title: 'إصدار شهادة الأفضلية السعرية',
          url: 'https://moiat.gov.ae/services/issue-preferential-price-certificate',
        },
        {
          title: 'شهادة القيمة المضافة طبقاً لقواعد المنشأ العربية',
          url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
        },
        {
          title: 'إلغاء رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'تعديل بيانات رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  {
    id: '3d569f56-f2de-450c-b873-d5906fc837ad',
    relatedServiceId: 12,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'زيادة كمية لمادة مسجلة للإعفاء الجمركي',
    startButton: {
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/ar/MaterialQuantityIncrease',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب زيادة الكمية بالكيلوجرام للمواد الأولية المسجّلة مسبقاً  (مواد خام ومواد نصف مصنعة وكاملة التصنيع ومواد التعبئة والتغليف) ليتم إضافة الكمية إلى رصيدك بغرض التقدم على طلب الموافقة على الإعفاء من الرسوم الجمركية المفروضة.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب زيادة كمية لمادة مسجّلة للإعفاء الجمركي'},
          {text: 'إرفاق المرفقات المطلوبة'},
          {text: 'دفع رسوم الطلب'},
          {text: 'دفع رسوم التفتيش'},
          {text: 'استقبال المفتش'},
          {
            text: 'استلام موافقة الوزارة على زيادة وزن المادة المسجّلة في رصيد المصنع',
          },
        ],
      },
      {
        Requirements: ['قائمة التعبئة', 'بوليصة الشحن', 'شهادة المنشأ'],
      },
      {
        id: 3,
        label: 'ملفات',

        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع فلتر',
        },
        filesList: [
          {
            title: 'استمارة تقديم',
            name: 'Request Quantity Increase for a Registered Industrial Input',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/request-quantity-increase-for-a-registered-industrial-input.ashx',
            size: '204 KB',
            type: 'application/pdf',
          },
          {
            name: 'UserManual - Request Registration of Industrial Input for Customs Duty Exemption',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---request-quantity-increase-for-a-registered-industrial-input.ashx',
            size: '691 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: '50 درهم​'}, {value: '100 درهم تفتيش​'}],
    },
    serviceTime: '3 أيام عمل',
    package: 'الباقة',
    dutyExempotionPachage: [
      {
        documentText: 'باقة الاعفاء الجمركي',
        url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/dutyexceptionpakcages.ashx',
        screen: '',
      },
    ],
    Tags: {
      documentText: 'خدمة متصلة بالجمارك',
      url: '',
      screen: 'Services',
    },
    faq: {
      name: 'الأسئلة الشائعة',
      items: [
        {
          question: 'ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على طلب زيادة كمية لمادة مسجلة للإعفاء الجمركي (moiat.gov.ae)',
            'دفع الرسوم',
            'دراسة الطلب من قبل الموظف المختص',
            'في حال الموافقة من قبل الجمارك يتم خصم الكمية من رصيد المصنع',
            'يرفض الطلب في حال عدم الموافقة',
            'تحويل الطلب للتفتيش في حال التاكد من المواد المطلوب اضافتها .',
            'دفع رسوم التفتيش',
            'زيارة المنشأة وكتابة التقرير',
            'تضاف المواد في حال الموافقة على تقرير التفتيش',
            // 'يرفض الطلب في حال عدم الموافقة',
            // 'في حال الخطأ في بيانات الطلب يتحمل المتعامل المسؤولية ولا يمكن استرجاع المبلغ المدفوع',
          ],
          requirements: [
            'رخصة الإنتاج الصناعي',
            'الفواتير المصدقة (التصديق هي خدمة مرتبطة بوزارة الخارجية والتعاون الدولي (MOFAIC))',
            'بوليصة الشحن',
            'قائمة التعبئة',
            'شهادة المنشأ',
          ],
        },
        {
          question: 'معلومات عن الفواتير و قيمها',
          answers: 'يتم تحويله للفريق المعني',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
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
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
        value: 'لا يوجد',
      },
    },
    tutorialVideo: {
      url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
    },
    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'الخدمات ذات الصلة',
      services: [
        {
          title:
            'طلب إعفاء مدخلات الصناعة من الرسوم الجمركية (آلات، معدات ومواد أولية)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'طلب تسجيل مادة للإعفاء الجمركي',
          url: 'https://moiat.gov.ae/services/request-registration-of-industrial-input-for-customs-duty-exemption',
        },
        {
          title: 'إصدار شهادة الأفضلية السعرية',
          url: 'https://moiat.gov.ae/services/issue-preferential-price-certificate',
        },
        {
          title: 'شهادة القيمة المضافة طبقاً لقواعد المنشأ العربية',
          url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
        },
        {
          title: 'إلغاء رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'تعديل بيانات رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  // {
  //   id: 'e9cab842-e6b3-4d85-86d2-aa7f5aca194d',
  //   relatedServiceId: false,
  //   type: 'il',
  //   // Category_Id: '0a7acf8b-0383-4942-bca7-a086eac3c29c',
  //   title: 'تعديل بيانات شهادة الموافقة المبدئية',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/en/InitialLicenseModification',
  //   },
  //   description:
  //     'تسمح هذه الخدمة للمنشأة بتحديث وتعديل بيانات شهادة الموافقة المبدئية الموجودة في السجل الصناعي',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'تقديم طلب الحصول على تعديل بيانات شهادة الموافقة المبدئية',
  //         },
  //         {text: 'دراسة الطلب من قبل الموظف المختص'},
  //         {
  //           text: 'الموافقة على التعديل في حالة توافق البيانات ومرفقات الطلب',
  //         },
  //         {
  //           text: 'رفض الطلب إذا كانت البيانات ومرفقات الطلب غير متوافقة',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'موافقة مبدئية أو رخصة صناعية مبدئية من إحدى دوائر الترخيص المحلية',
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
  //     serviceFees: 'مجانية',
  //     freeRenewal: 'Free Renewal',
  //     aed0: 'AED 0',
  //     note: 'ملاحظة رسوم الخدمة',
  //   },

  //   serviceTime: '3 أيام عمل',
  //   package: 'Package',

  //   Tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'س) كيف تتم طريقة التقديم؟',
  //         proceduresTitle: 'ج) إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         procedures: [
  //           'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
  //           'تقديم طلب للحصول على تعديل بيانات شهادة الموافقة المبدئية (moiat.gov.ae)',
  //           'دراسة الطلب من قبل الموظف المختص',
  //           'الموافقة على التعديل في حال توافق البيانات ومرفقات الطلب',
  //           'إذا كانت البيانات ومرفقات الطلب غير متوافقة مع المتطلبات يتم رفض الطلب',
  //         ],
  //         requirements: [
  //           'موافقة مبدئية أو رخصة صناعية مبدئية من إحدى دوائر الترخيص المحلية',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'فئة الخدمة',
  //       value: 'خدمات التراخيص الصناعية',
  //     },
  //     serviceSubCategory: {
  //       label: 'فئة الخدمة الفرعية',
  //       value: 'شهادة الموافقة المبدئية',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'المؤسسات الصناعية\nالجهات الحكومية​',
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
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
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
  //       value: ['جهات التراخيص المحلية ( دوائر التنمية الإقتصادية )'],
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
  //   title: 'تجديد شهادة الموافقة المبدئية',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/ar/InitialLicenseRenewal',
  //   },
  //   description:
  //     'تجديد شهادة الموافقة المبدئية لمدة عام واحد إضافي للقيام بإستكمال إنشاء المصنع وجلب الآلات والمعدات والبدء بالإنتاج التجريبي.',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       note: 'تنويه: سيتم احتساب 100 درهم عن كل شهرتأخير، بحد أقصى 1000 درهم',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'تقديم طلب للحصول على تجديد شهادة الموافقة المبدئية',
  //         },
  //         {text: 'دفع الرسوم ( الرسوم غير مستردة)'},
  //         {
  //           text: 'دراسة الطلب من قبل الموظف المختص',
  //         },
  //         {
  //           text: 'إصدار شهادة الموافقة المبدئية أو إحالة الطلب للتفتيش',
  //         },
  //         {
  //           text: 'في حالة الإحالة إلى التفتيش يتم احتساب 100 درهم رسوم للتفتيش',
  //         },
  //         {
  //           text: 'قيام المفتش بزيارة المنشأة وكتابة تقرير التفتيش',
  //         },
  //         {
  //           text: 'دراسة تقرير التفتيش من قبل الموظف المختص',
  //         },
  //         {
  //           text: 'إصدار شهادة تجديد الموافقة المبدئية في حالة الموافقة على تقرير التفتيش',
  //         },
  //         {
  //           text: 'رفض الطلب في حال عدم الموافقة على تقرير التفتيش',
  //         },
  //         {
  //           text: '',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'موافقة مبدئية أو رخصة صناعية مبدئية من إحدى دوائر الترخيص المحلية.',
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
  //             'دليـل الخدمـات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة - الطبعة الإنجليزية',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //           name: 'serviceguide2022eng',
  //           size: '1219 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title:
  //             'دليـل الخدمـات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
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
  //     feeNote:
  //       'في حالة الإحالة إلى التفتيش يتم احتساب 100 درهم رسوم للتفتيش. غرامات التأخير 100 درهم شهرياً بحد اقصى 1000 درهم.',
  //     price: 'AED 0',
  //     note: 'ملاحظة رسوم الخدمة',
  //   },

  //   serviceTime: '3 أيام عمل',
  //   package: 'الباقة',

  //   Tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'س) ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         answers: [
  //           'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
  //           'تقديم طلب للحصول على تجديد شهادة الموافقة المبدئية (moiat.gov.ae)',
  //           'دراسة الطلب من قبل الموظف المختص',
  //           'إصدار شهادة الموافقة المبدئية أو إحالة الطلب للتفتيش',
  //           'في حال الإحالة إلى التفتيش يتم احتساب 100 درهم رسوم للتفتيش',
  //           'قيام المفتش بزيارة المنشأة وكتابة تقرير التفتيش',
  //           'دراسة تقرير التفتيش من قبل الموظف المختص',
  //           'إصدار شهادة تجديد الموافقة المبدئية في حال الموافقة على تقرير التفتيش',
  //           'تنويه: سيتم احتساب 100 درهم عن كل شهر تأخير، بحد أقصى 1000 درهم',
  //         ],
  //         requirements: [
  //           'موافقة مبدئية أو رخصة صناعية مبدئية من إحدى دوائر الترخيص المحلية',
  //         ],
  //       },
  //       {
  //         question: 'س) متى يتم تحويل الطلب للتفتيش؟',
  //         answers: ['ج)  في حال طلب المصنع استيراد الآلات'],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'خدمات التراخيص الصناعية',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'شهادة الموافقة المبدئية',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Companies',
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
  //         'جهات التراخيص المحلية',
  //         'دوائر التنمية الاقتصادية',
  //         'وزارة الموارد البشرية والتوطين',
  //         'الهيئة الاتحادية للهوية والجنسية',
  //         'الجمارك وأمن المنافذ',
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
  //   title: 'إصدار شهادة الموافقة المبدئية',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/ar/InitialIndustrialLicense?addFactory=True',
  //   },
  //   description:
  //     'هذه الشهادة بمثابة تصريح عدم ممانعة من الوزارة لقيام مالك المشروع الصناعي باستكمال الإجراءات المتعلقة بالموافقات من الدوائر المعنية والبدء في إنشاء المصنع وتوصيل الطاقة الكهربائية وجلب الآلات والمعدات والبدء بالإنتاج التجريبي',
  //   sections: [
  //     {
  //       label: 'Service Procedures',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'تقديم طلب الحصول على شهادة موافقة مبدئية',
  //         },
  //         {text: 'دفع الرسوم ( الرسوم غير مستردة)'},
  //         {
  //           text: 'دراسة الطلب من قبل الموظف المختص',
  //         },
  //         {
  //           text: 'إصدار شهادة الموافقة المبدئية أو إحالة الطلب للتفتيش',
  //         },
  //         {
  //           text: 'في حال الموافقة سيتم إصدار شهادة الموافقة المبدئية أو لن يتم إصدار الشهادة في حال رفض الطلب',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Requirements',
  //       Requirements: [
  //         'شهادة موافقة مبدئية او رخصة صناعية من الجهات المحلية.',
  //         'الوثائق التعريفية لجميع الملاك (مثال: الهوية الإماراتية، جواز السفر ، الرخصة التجارية)',
  //         'لا يقل إجمالي عدد الموظفين عن 10 موظفين.',
  //         'لا يقل إجمالي رأس مال المصنع عن 250 ألف درهم.',
  //         'الموافقة على التعهد بالالتزام بكافة القوانين واللوائح المعمول بها في الدولة وأن ينفذ أحكامها المتعلقة بالأمن الصناعي والصحة العامة والمحافظة على البيئة.',
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
  //           title: 'استمارة تقديم',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-initial-approval-service.ashx',
  //           name: 'Issue Initial Approval Service',
  //           size: '221 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'دليل المستخدم - عربي',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/user-guide---ar---issue-initial-approval-certificate.ashx',
  //           name: 'User Guide - AR - Issue Initial Approval Certificate',
  //           size: '712 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'دليل المستخدم - انجليزي',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---issue-initial-approval-certificate.ashx',
  //           name: 'UserManual - Issue Initial Approval Certificate',
  //           size: '680 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees: '1000 درهم',
  //     price: '1000 درهم',
  //     note: 'ملاحظة رسوم الخدمة',
  //   },

  //   serviceTime: 'يوم عمل',
  //   package: 'الباقة',

  //   Tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'س) ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         answers: [
  //           'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
  //           'تقديم طلب للحصول على تجديد شهادة الموافقة المبدئية (moiat.gov.ae)',
  //           'دفع الرسوم (الرسوم غير مستردة).',
  //           'دراسة الطلب من قبل الموظف المختص.',
  //           'في حال الموافقة سيتم إصدار شهادة الموافقة المبدئية أو لن يتم إصدار الشهادة في حال رفض الطلب.',
  //         ],
  //         requirements: [
  //           'شهادة الموافقة المبدئية من سلطة الترخيص المحلية (على سبيل المثال: الدوائر الاقتصادية).',
  //           'الوثائق التعريفية لجميع الملاك (مثال: الهوية الإماراتية، جواز السفر ، الرخصة التجارية).',
  //           'ألا يقل إجمالي عدد الموظفين عن 10 موظفين.',
  //           'ألا يقل إجمالي رأس مال المصنع عن 250 ألف درهم.',
  //           'التعهد بالالتزام بكافة القوانين واللوائح المعمول بها في الدولة المتعلقة بالأمن الصناعي والصحة العامة والمحافظة على البيئة.',
  //         ],
  //       },
  //       {
  //         question: 'س) هل يتم تجديد الرخصة؟ وكيف؟',
  //         answers: [
  //           'ج) نعم، يتم تجديد الموافقة المبدئية من خلال الموقع الإلكتروني سنوياً ( منصة الخدمات )',
  //         ],
  //       },
  //       {
  //         question:
  //           'س) هل يمكن استيراد معدات وآلات من الخارج للمصنع عند الحصول على الشهادة (قبل استخراج رخصة الإنتاج الصناعي؟ )',
  //         answers: ['ج) نعم بعد تركيب الآلات والمعدات وتقييم المفتش'],
  //       },
  //       {
  //         question: 'س) ما فترة صلاحية الشهادة؟',
  //         answers: ['ج) سنة واحدة'],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'Service Overview',
  //     serviceCategory: {
  //       label: 'Service Category',
  //       value: 'خدمات التراخيص الصناعية',
  //     },
  //     serviceSubCategory: {
  //       label: 'Service Sub-Category',
  //       value: 'شهادة الموافقة المبدئية',
  //     },
  //     serviceType: {
  //       label: 'Service Type',
  //       value: 'Transactional',
  //     },
  //     targetAudience: {
  //       label: 'Target Audience',
  //       value: 'Companies',
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
  //         'العمل اللائق ونمو الاقتصاد',
  //         'الصناعة والابتكار والهياكل الأساسية',
  //         'الصناعة والابتكار والهياكل الأسياسية',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'Interconnection of the service',
  //       value: [
  //         'دوائر التنمية الإقتصادية',
  //         'وزارة الموارد البشرية والتوطين',
  //         'الهيئة الاتحادية للهوية والجنسية',
  //         'الجمارك وأمن المنافذ',
  //         'دوائر الجمارك المحلية',
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
  //   title: 'إلغاء شهادة الموافقة المبدئية',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/ar/InitialLicenseCancellation',
  //   },
  //   description: 'تسمح هذه الخدمة للمنشأة بإلغاء شهادة الموافقة المبدئية',
  //   sections: [
  //     {
  //       label: 'إجراءات الخدمة',
  //       note: 'تنويه: إذا كانت الشهادة غير سارية المفعول سيتم احتساب 100 درهم عن كل شهر تأخير، بحد أقصى 1000 درهم.',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'تقديم طلب الحصول على إلغاء شهادة الموافقة المبدئية',
  //         },
  //         {
  //           text: 'استلام طلب الخدمة والتدقيق عليه',
  //         },
  //         {
  //           text: 'في حال الموافقة على الطلب يتم اصدار رسالة الإلغاء',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'المتطلبات',
  //       Requirements: ['رسالة رسمية من المنشأة بالإلغاء'],
  //     },
  //     {
  //       label: 'الملفات',
  //       filesSection: {
  //         fileName: 'اسم الملف',
  //         fileSize: 'حجم الملف',
  //         fileType: 'نوع الملف',
  //       },
  //       filesList: [
  //         {
  //           title: 'دليل المستخدم - إلغاء شهادة الموافقة المبدئية',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---cancel-initial-approval-certificate.ashx',
  //           name: 'UserManual - Cancel Initial Approval Certificate',
  //           size: '556 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees: 'مجانية - غرامات التأخير 100 درهم شهرياً بحد اقصى 1000 درهم',
  //     note: 'ملاحظة: تتحمل الجهة جميع التكاليف والمصروفات المترتبة على تعديل نشاط الاعتماد، بالإضافة إلى مصاريف السفر، النقل، إقامة المقيم أو أي مصاريف إضافية أخرى',
  //   },
  //   serviceTime: 'يويمن عمل',
  //   package: 'الباقة',

  //   Tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'س) كيف تتم طريقة التقديم؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         answers: [
  //           'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae).',
  //           'تقديم طلب للحصول على إلغاء شهادة الموافقة المبدئية (moiat.gov.ae).',
  //           'استلام طلب الخدمة والتدقيق عليه.',
  //           'في حال الموافقة على الطلب يتم إصدار رسالة الإلغاء.',
  //           'تنويه: إذا كانت الشهادة غير سارية المفعول سيتم احتساب 100 درهم عن كل شهر تأخير، بحد أقصى 1000 درهم.',
  //         ],
  //         requirements: ['رسالة رسمية من المنشأة بالإلغاء للموافقة المبدئية.'],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'نظرة عامة على الخدمة',
  //     serviceCategory: {
  //       label: 'فئة الخدمة',
  //       value: 'خدمات التراخيص الصناعية',
  //     },
  //     serviceSubCategory: {
  //       label: 'الفئة الفرعية للخدمة',
  //       value: 'شهادة الموافقة المبدئية',
  //     },
  //     serviceType: {
  //       label: 'نوع الخدمة',
  //       value: 'إجرائية',
  //     },
  //     targetAudience: {
  //       label: 'الجمهور المستهدف',
  //       value: 'الشركات',
  //     },
  //     qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
  //   },
  //   generalDocument: {
  //     title: 'المستندات العامة',
  //     description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'تحميل',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'معلومات الخدمة',
  //     availability: {
  //       label: 'التوفر',
  //       value: 'متاحة 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'قنوات الدفع',
  //       values: ['ماستر كارد', 'فيزا'],
  //     },
  //     serviceChannels: {
  //       label: 'قنوات الخدمة',
  //       browser: 'متصفح الويب',
  //       web: 'المنصة الرقمية لخدمات الوزارة',
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
  //       label: 'الأهداف المستدامة',
  //       values: [
  //         'العمل اللائق ونمو الاقتصاد',
  //         'الصناعة والابتكار والهياكل الأساسية',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'ترابط الخدمة',
  //       value: ['جهات التراخيص المحلية ( دوائر التنمية الإقتصادية )'],
  //     },
  //   },
  // },
  // {
  //   id: '9991b96b-e3fd-4b7b-afd9-3eb34134920e',
  //   title: 'تعديل بيانات تصريح إنتاج صناعي',
  //   Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
  //   relatedServiceId: 21,
  //   type: 'il',
  //   startButton: {
  //     url: 'https://il.moiat.gov.ae/ar/IndustrialLicenseModification',
  //   },
  //   description: 'هي تعديل بيانات المصنع في السجل الصناعي للوزارة',
  //   sections: [
  //     {
  //       label: 'إجراءات الخدمة',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'تقديم طلب للحصول على تعديل بيانات رخصة إنتاج صناعي',
  //         },
  //         {
  //           text: 'دراسة الطلب والتدقيق على البيانات والمرفقات التالية: الاسم التجاري، الكيان القانوني، تغيير الملاك، تغيير بيانات مالية، تغيير سجل المواد الخام، تغيير سجل المنتجات، تغيير بيانات التواصل، رأس المال والعمال',
  //         },
  //         {
  //           text: 'دفع الرسوم',
  //         },
  //         {
  //           text: 'الموافقة على الطلب في حال صحة البيانات والمرفقات',
  //         },
  //         {
  //           text: 'تحويل الطلب في حال تعديل البيانات أو المرفقات التالية: تغيير النشاط، تغيير الموقع للتفتيش.',
  //         },
  //         {
  //           text: 'دفع رسوم الطلب والتفتيش',
  //         },
  //         {
  //           text: 'اجراء التفتيش على المنشأة للتأكد من مطابقتها لشروط الترخيص الصناعي.',
  //         },
  //         {
  //           text: 'الموافقة على التعديل في حال صحة البيانات والمرفقات',
  //         },
  //         {
  //           text: 'رفض الطلب في حال عدم صحة البيانات والمرفقات',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'المتطلبات',
  //       Requirements: [
  //         'إرفاق الوثائق التي يرغب المتعامل بالتعديل عليها.',
  //         '(الاسم التجاري، الكيان القانوني، تغيير الملاك، رأس المال) يتم توفير:',
  //         '- صورة من الرخصة المحلية سارية المفعول',
  //         '- صورة من عقد الشراكة المعدّل.',
  //         '- صورة من خلاص القيد للمواطن وجواز السفر والإقامة لغير المواطن',
  //         '(تغيير بيانات مالية، تغيير سجل المواد الخام، تغيير سجل المنتجات، تغيير عنوان المصنع)، لا يتم ارفاق أية مستندات.',
  //         '(تغيير موقع، تغيير نشاط) يتم توفير:',
  //         '- صورة من الرخصة المحلية.',
  //         '- تحديد الموقع (على الخارطة)',
  //         '- تقرير التفتيش',
  //         '- (العمالة) يتم توفير (كشف العمال من وزارة الموارد البشرية والتوطين).',
  //         '- وجود التعديل في شهادة الترخيص المحلي.',
  //       ],
  //     },
  //     {
  //       label: 'الملفات',
  //       filesSection: {
  //         fileName: 'اسم الملف',
  //         fileSize: 'حجم الملف',
  //         fileType: 'نوع الملف',
  //       },
  //       filesList: [
  //         {
  //           title: 'استمارة تقديم',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/modify-industrial-production-license.ashx',
  //           name: 'Modify Industrial Production License',
  //           size: '321 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'دليل المستخدم - تعديل بيانات رخصة إنتاج صناعي',
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
  //       'درهم 100 رسوم التفتيش\nغرامات التأخير 100 درهم شهرياً بحد أقصى 1000 درهم\nدرهم 250 تعديل الرخصة\nغرامات التأخير 100 درهم شهرياً بحد أقصى 1000 درهم',
  //     note: 'ملاحظة: تتحمل الجهة جميع التكاليف والمصروفات المترتبة على تعديل نشاط الاعتماد، بالإضافة إلى مصاريف السفر، النقل، إقامة المقيم أو أي مصاريف إضافية أخرى',
  //   },
  //   serviceTime: '3 أيام عمل',
  //   package: 'الباقة',

  //   Tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'س) ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         answers: [
  //           'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae).',
  //           'تقديم طلب للحصول على تعديل بيانات رخصة إنتاج صناعي (moiat.gov.ae).',
  //           'دراسة الطلب والتدقيق على البيانات والمرفقات التالية: الاسم التجاري، الكيان القانوني، تغيير الملاك، تغيير بيانات مالية، تغيير سجل المواد الخام، تغيير سجل المنتجات، تغيير بيانات التواصل، رأس المال والعمال.',
  //           'دفع الرسوم.',
  //           'الموافقة على الطلب في حال صحة البيانات والمرفقات.',
  //           'تحويل الطلب في حال تعديل البيانات أو المرفقات التالية: تغيير النشاط، تغيير الموقع للتفتيش.',
  //           'دفع رسوم الطلب والتفتيش.',
  //           'إجراء التفتيش على المنشأة للتأكد من مطابقتها لشروط الترخيص الصناعي.',
  //           'الموافقة على التعديل في حال صحة البيانات والمرفقات.',
  //           'رفض الطلب في حال عدم صحة البيانات والمرفقات.',
  //         ],
  //         requirements: [
  //           'إرفاق الوثائق التي يرغب المتعامل بالتعديل عليها.',
  //           '(الاسم التجاري، الكيان القانوني، تغيير الملاك، رأس المال) يتم توفير: - صورة من الرخصة المحلية سارية المفعول - صورة من عقد الشراكة المعدّل. - صورة من خلاص القيد للمواطن وجواز السفر والإقامة لغير المواطن.',
  //           '(تغيير بيانات مالية، تغيير سجل المواد الخام، تغيير سجل المنتجات، تغيير عنوان المصنع)، لا يتم ارفاق أية مستندات.',
  //           '(تغيير موقع، تغيير نشاط) يتم توفير: - صورة من الرخصة المحلية. - تحديد الموقع (على الخارطة) - تقرير التفتيش - (العمالة) يتم توفير (كشف العمال من وزارة الموارد البشرية والتوطين). - وجود التعديل في شهادة الترخيص المحلي.',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'نظرة عامة على الخدمة',
  //     serviceCategory: {
  //       label: 'فئة الخدمة',
  //       value: 'خدمات التراخيص الصناعية',
  //     },
  //     serviceSubCategory: {
  //       label: 'الفئة الفرعية للخدمة',
  //       value: 'تعديل بيانات رخصة صناعية',
  //     },
  //     serviceType: {
  //       label: 'نوع الخدمة',
  //       value: 'إجرائية',
  //     },
  //     targetAudience: {
  //       label: 'الجمهور المستهدف',
  //       value: 'الشركات',
  //     },
  //     qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
  //   },
  //   generalDocument: {
  //     title: 'المستندات العامة',
  //     description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
  //     size: 'KB 1219 KB',
  //     button: [
  //       {
  //         title: 'تحميل',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'معلومات الخدمة',
  //     availability: {
  //       label: 'التوفر',
  //       value: 'متاحة 24 * 7',
  //     },
  //     paymentChannels: {
  //       label: 'قنوات الدفع',
  //       values: ['ماستر كارد', 'فيزا'],
  //     },
  //     serviceChannels: {
  //       label: 'قنوات الخدمة',
  //       browser: 'متصفح الويب',
  //       web: 'المنصة الرقمية لخدمات الوزارة',
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
  //       label: 'الأهداف المستدامة',
  //       values: [
  //         'العمل اللائق ونمو الاقتصاد',
  //         'الصناعة والابتكار والهياكل الأساسية',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'ترابط الخدمة',
  //       value: ['جهات التراخيص المحلية'],
  //     },
  //   },
  //   tutorialVideo: {
  //     title: 'الفيديو التعليمي للتقديم على الخدمة',
  //     url: 'https://youtu.be/pfKXrFJ3laE',
  //   },
  // },
  {
    id: 'a2af409c-d022-497f-8578-ba93802f3acd',
    relatedServiceId: 1052,
    Category_Id: 'd5685023-9f9c-450a-a9c3-415af1c6c144',
    title: 'توسيع مجال العلامات الوطنية للمطابقة',
    startButton: {
      url: 'https://services-stag.moiat.gov.ae/eservices/scope-expansion-of-the-emirates-quality-mark?lang=ar',
    },
    description:
      'تتيح هذه الخدمة إضافة منتجات للتراخيص الصادرة للعلامات الوطنية للمطابقة ضمن فترة صلاحيتها. ​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب توسيع مجال العلامات الوطنية للمطابقة'},
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'التقييم الميداني'},
          {text: 'دفع الرسوم'},
          {text: 'استلام نسخة رقمية من رخصة استخدام العلامات الوطنية للمطابقة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'تقرير اختبار من مختبر معتمد بحسب مواصفة مقبولة لدى الوزارة',
          'استيفاء المنشأة / المنتجات للمعايير المطلوبة بحسب نوع العلامة (وثيقة مطابقة للمنتج، أو تقرير زيارة ميدانية)',
        ],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title: 'ملفات الجودة',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'استمارة تقديم',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/scope-expansion-of-the-emirates-quality-mark.ashx',
            name: 'Scope Expansion of the Emirates Quality Mark',
            size: '224 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل المستخدم',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/eqm-expansion-user-manual.ashx',
            name: 'EQM Expansion User Manual',
            size: '962 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: '250 درهم',

    serviceTime: '5 أيام عمل',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني إضافة علامة الجودة الاماراتية إلى منتجاتي الجديدة؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على توسيع مجال علامة الجودة الإماراتية (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: [
            'علامة الجودة الإماراتية سارية المفعول وصادرة من الوزارة.',
            'الوثائق الفنية الخاصة بالمنتجات الجديدة',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'العلامات الوطنية للمطابقة',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'الشركات',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['ترخيص استخدام علامة الجودة الإماراتية'],
      },
    },
  },
  {
    id: '19284b01-8a08-4000-9fe6-26053f43e0f5',
    title: 'إصدار  رخصة استخدام العلامات الوطنية للمطابقة​',
    Category_Id: 'd5685023-9f9c-450a-a9c3-415af1c6c144',
    relatedServiceId: 9,
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-license-to-use-the-emirates-quality-mark?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب إصدار ترخيص باستخدام العلامات الوطنية  للمطابقة تؤكد مطابقة المنتجات والتزام المنشآت بالاشتراطات المحددة في  أنظمة وتشريعات العلامة البيئية. حيث تشمل هذه الخدمة العديد من العلامات مثل علامة الجودة الإماراتية، العلامة الوطنية للحلال، العلامة البيئية، علامة صنع في الإمارات.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {
            text: 'تقديم طلب للحصول على رخصة استخدام العلامات الوطنية للمطابقة (إرفاق رابط الخدمة على الموقع)',
          },
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'التقييم الميداني'},
          {text: 'دفع الرسوم'},
          {text: 'استلام نسخة رقمية من رخصة استخدام العلامات الوطنية للمطابقة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'تقرير اختبار من مختبر معتمد بحسب مواصفة مقبولة لدى الوزارة',
          'استيفاء المنشأة / المنتجات للمعايير المطلوبة بحسب نوع العلامة (وثيقة مطابقة للمنتج، أو تقرير زيارة ميدانية)',
        ],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title: 'ملفات الجودة',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'استمارة تقديم',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-license-to-use-the-emirates-quality-mark.ashx',
            name: 'Issue License to use the Emirates Quality Mark',
            size: '239 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل المستخدم',
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
        {value: '2500 درهم عن كل يوم وعن كل مقيم​'},
        {
          value:
            'إجراء التقييم الفني للحصول على ترخيص العلامات الوطنية للمطابقة:',
        },
        {
          value:
            '2000 درهم : إصدار شهادة الترخيص باستخدام العلامات الوطنية للمطابقة، لمدة ثلاث سنوات من الوزارة أو من جهة تقييم مطابقة معينة​',
        },
        {value: '670 درهم : رسوم شهادة المطابقة​'},
      ],
    },
    serviceTime: 'خدمة فورية - 6 أيام عمل​',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question: 'كيف يمكنني الحصول على علامة الجودة الاماراتية؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على اصدار ترخيص لاستخدام علامة الجودة الإماراتية (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: [
            'رخصة صناعية/ تجارية سارية المفعول في الدولة أو إقرار بالمسؤولية للمصانع خارج الدولة',
            'تقرير اختبار من مختبر معتمد بحسب مواصفة مقبولة لدى الوزارة',
            'زيارة ميدانية للمصنع',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'العلامات الوطنية للمطابقة',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية​\nشركات التوريد والتوزيع​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  {
    id: 'ec6ebea5-7fef-4dfe-bda7-be2dbbd8b1b6',
    relatedServiceId: 1027,
    Category_Id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
    title:
      'إصدار شهادة المطابقة الإماراتية للمنتجات غير الخاضعة للّوائح الفنية​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-conformity-certificate-for-unregulated-products?lang=ar',
    },
    description:
      'من خلال هذه الخدمة، يمكنك التقدم بطلب شهادة المطابقة الإماراتية للمنتجات غير الخاضعة للوائح الفنية. تتيح هذه الخدمة بناءً على رغبة المتعامل الحصول على شهادة المطابقة الإماراتية للمنتجات الغير خاضعة للوائح الفنية الإلزامية​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب  للحصول على شهادة المطابقة الإماراتية للمنتجات غير الخاضعة للّوائح الفنية',
          },
          {
            text: 'إرفاق الوثائق المطلوبة',
          },
          {
            text: 'التقييم الميداني (عند الحاجة)​',
          },
          {
            text: 'دفع الرسوم',
          },
          {
            text: 'استلام نسخة رقمية من شهادة المطابقة الإماراتية للمنتج​',
          },
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول',
          'تقرير اختبار عن المنتج صادر من مختبر معتمد',
          'إقرار وتعهد باستمرار المطابقة على المنتج​',
          'الوثائق الفنية للمنتج ​',
        ],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title:
              'قائمة بمتطلبات جميع التشريعات والأنظمة الرقابية الخاصة بالمنتجات',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/cad-regulated-sheet.ashx',
            name: 'CAD Regulated Sheet',
            size: '262 KB',
            type: 'application/pdf',
          },
          {
            title: 'ملفات الجودة',
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
            '600 درهم: تقديم طلب لتسجيل المنتجات والخدمات في نظام تقويم المطابقة الإماراتي',
        },
        {
          value: '620 درهم: المراجعة الفنية للوثائق لكل شهادة مطابقة',
        },
        {
          value: '500 درهم: إصدار شهادة المطابقة من الوزارة',
        },
        {
          value:
            '2,500 درهم: إجراء التقييم الفني للمنشآت لتسجيلها في نظام تقويم المطابقة الإماراتي (لكل يوم عمل/مقيم فني)',
        },
      ],
    },

    serviceTime: '6 أيام عمل',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني الحصول على شهادة المطابقة في حال كان منتجي غير خاضع للوائح الفنية؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار شهادات المطابقة للمنتجات غير الخاضعة للوائح الفنية (ECAS) (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول',
            'تقرير اختبار عن المنتج صادر من مختبر معتمد',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'المنتجات الغير الخاضعة للوائح الفنية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nشركات التوريد والتوزيع',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  {
    id: 'ec6ebea5-7fef-4d2e-bda7-b22dbbd8b1b6',
    relatedServiceId: 8,
    Category_Id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
    title: 'إصدار شهادة المطابقة الإماراتية للمنتجات الخاضعة للّوائح الفنية​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-conformity-certificate-for-unregulated-products?lang=ar',
    },
    description:
      'من خلال هذه الخدمة، يمكنك التقدم بطلب شهادة المطابقة الإماراتية للمنتجات الخاضعة للّوائح الفنية ( الملزمة بالقرارات التنظيمية الصادرة من وزارة الصناعة والتكنولوجيا المتقدمة) والتي تؤكد مطابقة المنتجات للمواصفات القياسية المعتمدة في الدولة. وبالتالي تسهل وتعزز عملية دخول وتداول المنتج إلى أسواق الدولة. ​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب للحصول على شهادة المطابقة الإماراتية للمنتجات الخاضعة للّوائح الفنية',
          },
          {
            text: 'إرفاق الوثائق المطلوبة',
          },
          {
            text: 'التقييم الميداني (عند الحاجة)',
          },
          {
            text: 'دفع الرسوم',
          },
          {
            text: 'استلام نسخة رقمية من شهادة المطابقة الإماراتية للمنتج',
          },
        ],
      },
      {
        Requirements: [
          'رخصة تجارية سارية المفعول',
          'تقرير اختبار عن المنتج صادر من مختبر معتمد',
          'إقرار وتعهد باستمرار المطابقة عن المنتج',
          'الوثائق الفنية للمنتج',
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value:
            '600 درهم: تقديم طلب لتسجيل المنتجات والخدمات في نظام تقويم المطابقة الإماراتي',
        },
        {
          value: '620 درهم: المراجعة الفنية للوثائق لكل شهادة مطابقة',
        },
        {
          value: '500 درهم: إصدار شهادة المطابقة من الوزارة',
        },
        {
          value:
            '2,500 درهم: إجراء التقييم الفني للمنشآت لتسجيلها في نظام تقويم المطابقة الإماراتي (لكل يوم عمل/مقيم فني)',
        },
      ],
    },

    serviceTime: ' 2 يوم عمل​',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني الحصول على شهادة المطابقة في حال كان منتجي غير خاضع للوائح الفنية؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار شهادات المطابقة للمنتجات غير الخاضعة للوائح الفنية (ECAS) (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول',
            'تقرير اختبار عن المنتج صادر من مختبر معتمد',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'المنتجات الغير الخاضعة للوائح الفنية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nشركات التوريد والتوزيع',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  {
    id: 'f93e4d52-19e0-4b46-aca3-f7e61dd3b4b6',
    relatedServiceId: 1053,
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    title: 'إصدار بيان حالة منتج للمركبات الواردة المستعملة​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-label-card-for-used-imported-vehicles?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب بيان حالة منتج للمركبات الواردة المستعملة تفيد بإمكانية تسجيلها في النظام المروري والاستخدام في الدولة. ​​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {
            text: '  تقديم طلب للحصول على إصدار بيان حالة منتج للمركبات الواردة المستعملة​',
          },
          {text: 'دفع الرسوم'},
          {text: 'استلام نسخة رقمية من بيان منتج للمركبات الواردة المستعملة'},
        ],
      },
      // {
      //   label: 'المتطلبات',
      //   Requirements: [
      //     'بطاقة بيان منتج للتحقق من المركبات المستعملة المستوردة',
      //   ],
      // },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title: 'بطاقة بيان منتج للتحقق من المركبات الواردة المستعملة',
            url: '',
            name: 'بطاقة بيان منتج',
            size: '',
            type: '',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'رسوم إصدار بيان حالة منتج 200 درهم​',
      price: '200 درهم',
      note: '',
    },
    serviceTime: 'خدمة فورية',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني الحصول على بيان حالة منتج للمركبات المستعملة المستوردة؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار بيان حالة منتج للتحقق من المركبات الواردة المستعملة (moiat.gov.ae)',
            'دفع الرسوم',
          ],
          requirements: [
            'بطاقة بيان منتج للتحقق من المركبات المستعملة المستوردة',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'المركبات',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات​\nالأفراد​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['إصدار بطاقة بيان منتج للتحقق من المركبات الواردة المستعملة'],
      },
    },
  },
  {
    id: '7a158d3d-6e40-40b8-9850-2bd44c6aa995',
    relatedServiceId: 1053,
    title: 'إصدار بطاقة بيان منتج للمركبات الواردة المستعملة​',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-label-card-for-used-imported-vehicles?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب بطاقة بيان منتج للمركبات الواردة المستعملة تبين (خلوها  تعرَضها)  لقائمة من الأضرار التي تؤثر على سلامتها، حيث تساهم في تأكد الفرد من صحة وسلامة المركبة قبل شراءها.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب إصدار بطاقة بيان منتج للمركبات الواردة المستعملة'},
          {text: 'دفع الرسوم'},
          {text: 'استلام نسخة رقمية من بيان منتج للمركبات الواردة المستعملة'},
        ],
      },
      // {
      //   label: 'المتطلبات',
      //   Requirements: ['الرقم التعريفي الخاص بالمركبة'],
      // },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title: 'دليل الخدمة',
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
        '1 درهم\nلكل بطاقة بيان (7 بطاقات لكل مركبة وتكون مدموجة في بطاقة واحدة)​',
      price: '7 دراهم',
      note: '',
    },
    serviceTime: 'خدمة فورية',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني الحصول على بطاقة بيان حالة منتج للمركبات المستعملة المستوردة؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار بطاقة بيان منتج للتحقق من المركبات الواردة المستعملة (moiat.gov.ae)',
            'دفع الرسوم',
          ],
          requirements: ['الرقم التعريفي الخاص بالمركبة'],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'المنتجات الخاضعة و غير الخاضعة للوائح الفنية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات\nالأفراد​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  {
    id: '4fd998b6-9bd4-44f3-a1ac-a5743e166014',
    relatedServiceId: 12,
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    title: 'إصدار بطاقة بيان منتج لإطارات المركبات',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-a-product-label-card?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب بطاقة بيان منتج لإطارات المركبات والتي يتم تثبيتها على إطارات المركبات لتمكين المتعاملين والجهات الرقابية في الدولة من التأكد من مطابقة المنتج للمواصفات والمعايير وتتبع مكان المنتج في الأسواق من خلال نظام(RFID) ، بما يعزز معايير الأمن والسلامة في المجتمع وعلى المتعامل.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
          },
          {
            text: 'تقديم طلب بطاقة بيان منتج لإطارات المركبات',
          },
          {
            text: 'دفع الرسوم',
          },
          {
            text: 'استلام نسخة رقمية من البطاقات',
          },
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول',
          'شهادة مطابقة',
          'رسالة تخويل من المصنع بحق توزيع المنتج في الدولة',
        ],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title: 'ملفات الجودة',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'دليل مستخدم RFID',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/rfid-user-manual.ashx',
            name: 'RFID User Manual',
            size: '828 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: '1 درهم لكل بطاقة بيان',
      price: '1 درهم',
      note: '',
    },
    serviceTime: 'خدمة فورية',
    package: 'الباقة',

    Tags: {},
    faq: {items: []}, // لا يوجد أسئلة شائعة مذكورة
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'الإطارات الخليجية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nشركات التوريد والتوزيع\nالأفراد​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['تصديق صورة طبق الأصل من شهادة مطابقة خليجية'],
      },
    },
  },
  {
    id: 'd706a181-f3b2-4a8b-bcad-f9d3c84266f6',
    relatedServiceId: 10,
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    title: 'إصدار بيان حالة منتج للطائرات بدون طيار​',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-status-statement-for-drones?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب بيان حالة منتج للمنتجات والأنظمة للطائرات والمركبات الجوية بدون طيار لمطابقة هذه المنتجات بالمواصفات المحددة كالارتفاع المسموح والمسافة وترددات الراديو. ستتيح لك هذه الخدمة التقديم على خدمة طلب بطاقة بيان منتج لتثبيتها بالطائرات أو المركبات بدون طيار للتعرف عليها أو تتبعها في أسواق أو أجواء الدولة. بما يضمن امن وسلامة المتعامل​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب بيان حالة منتج للطائرات بدون طيار'},
          {text: 'إرفاق المرفقات المطلوبة'},
          {text: 'دفع رسوم الطلب'},
          {text: 'استلام نسخة رقمية من بيان حالة المنتج'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'للمحترفين:\n- رخصة تجارية / صناعية سارية المفعول (مع نشاط متعلق بالمنتج).\n- الهوية الإماراتية لمقدم الطلب.\n- معلومات الخصائص الفنية للمنتج.\n- نسخة من دليل المستخدم للمنتج.\n- صورة للمنتج.\n- الرقم التسلسلي المصنعي للمنتج.\n- إقرار بالمواصفات بحسب قرار مجلس الادارة رقم (22) لسنة 2019.\n- تصريح أمني من الهيئة العامة للطيران المدني.\n- الاشتراك في المنشورات الإلكترونية الخاصة بالهيئة العامة للطيران المدني.',
          'للموردين:\n- رخصة تجارية / صناعية سارية المفعول (مع نشاط متعلق بالمنتج).\n- موافقة هيئة تنظيم الاتصالات.\n- شهادة اختبار من هيئة تنظيم الاتصالات.\n- نسخة من دليل المستخدم للمنتج.\n- صورة للمنتج.\n- إقرار بالمواصفات بحسب قرار مجلس الادارة رقم (22) لسنة 2019.',
          'للأفراد:\n- صورة عن الهوية الإماراتية (جواز السفر لغير المقيمين).\n- معلومات الخصائص الفنية للمنتج.\n- نسخة من دليل المستخدم للمنتج.\n- صورة للمنتج.\n- صورة الرقم التسلسلي للمنتج.',
          `للمصنعين:
-  رخصة صناعية سارية المفعول ( مع نشاط متعلق بالمنتج )
-  شهادة المطابقة الإماراتية
-  معلومات الخصائص الفنية للمنتج .
-  نسخة من دليل المستخدم للمنتج .
-  أربع صورة للمنتج (من الأمام والأعلى والجانب والرقم التسلسلي).
-  موافقة هيئة تنظيم الاتصالات.`,
        ],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title: 'دليل مستخدم الطائرة بدون طيار LoC',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/drone-loc-user-manual.ashx',
            name: 'Drone LoC User Manual',
            size: '1090 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل المستخدم لنقل الطائرة بدون طيار إلى المشتري',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/drone-to-buyer-transfer-user-manual.ashx',
            name: 'Drone To Buyer Transfer User Manual',
            size: '373 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل المستخدم لنقل الطائرات بدون طيار إلى نقاط البيع',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/drone-to-pos-transfer-user-manual.ashx',
            name: 'Drone To POS Transfer User Manual',
            size: '380 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل المستخدم لنقل الطائرات بدون طيار إلى البائع',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/drone-to-seller-transfer-user-manual.ashx',
            name: 'Drone To Seller Transfer User Manual',
            size: '369 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: '200 درهم',
      price: '200 درهم',
      note: '',
    },
    serviceTime: '5 أيام عمل',
    package: 'باقة الدرون (PDF)',

    Tags: {},
    faq: {
      items: [
        {
          question: 'كيف يمكنني الحصول على بيان حالة منتج للطائرات بدون طيار؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار بيان حالة منتج لتسجيل المنتجات والأنظمة للطائرات والمركبات الجوية بدون طيار (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: [
            'متطلبات المحترفين كما هو مذكور',
            'متطلبات الموردين كما هو مذكور',
            'متطلبات الأفراد كما هو مذكور',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'المنتجات الخاضعة و غير الخاضعة للوائح الفنية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nشركات التوريد والتوزيع\nالأفراد​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'الباقة',
      description: 'باقة الدرون (PDF)',
      size: 'N/A',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/dronepackages.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  {
    id: 'd334638a-e3c6-49ae-b52f-04928357e8d3',
    title: 'إصدار بطاقات كفاءة الأداء',
    relatedServiceId: 'link',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.esma.gov.ae/app/ProductEfficiencyCard/?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب بطاقات توضّح كفاءة استهلاك الطاقة للأجهزة الكهربائية، أو كفاءة الأداء البيئي للأدوات المرشّدة للمياه والدهانات لمنتجات حاصلة على شهادات المطابقة الإماراتية أو العلامة الوطنية للمطابقة.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب بطاقة كفاءة الأداء للمنتجات'},
          {text: 'دفع الرسوم'},
          {text: 'استلام نسخة رقمية من البطاقات'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: ['شهادة مطابقة'],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title: 'دليل الخدمة',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual-ar---issue-a-product-efficiency-card.ashx',
            name: 'UserManual AR - Issue a Product Efficiency Card',
            size: '591 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل المستخدم لإصدار العلامة الخضراء',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/green-label-issuance-user-manual.ashx',
            name: 'Green Label Issuance User Manual',
            size: '660 KB',
            type: 'application/pdf',
          },
          {
            title: 'ملفات الجودة',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'استمارة تقديم - Issue a Product Efficiency Card',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-a-product-efficiency-card.ashx',
            name: 'Issue a Product Efficiency Card',
            size: '198 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل الخدمة - Energy Efficiency Labels User Manual',
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
            'بحسب عدد النجوم  (1-5-7-10)درهم حسب تصنيف النجوم لشهادة المطابقة',
        },
        {
          value: 'بطاقة كفاءة استهلاك الطاقة لمستوى (1) نجمة: 10 درهم/بطاقة',
        },
        {
          value: 'بطاقة كفاءة استهلاك الطاقة لمستوى (2) نجمة: 7 درهم/بطاقة',
        },
        {
          value: 'بطاقة كفاءة استهلاك الطاقة لمستوى (3) نجمة: 5 درهم/بطاقة',
        },
        {
          value: 'بطاقة كفاءة استهلاك الطاقة لمستوى (4) نجمة: 1 درهم/بطاقة',
        },
        {
          value: 'بطاقة كفاءة استهلاك الطاقة لمستوى (5) نجمة: مجاناً',
        },
      ],
    },

    serviceTime: 'خدمة فورية',
    package: 'الباقة',

    Tags: {},
    faq: {items: []},
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'بطاقات الكفاءة',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nشركات التوريد والتوزيع',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
    tutorialVideo: {
      title: 'فيديو توضيحي لتقديم الخدمة',
      url: 'https://youtu.be/JbcsDKaVL8w',
    },
  },
  {
    id: 'e477000f-f585-4d72-bc8e-d84a08624cc1',
    relatedServiceId: 1054,
    title: 'إصدار بيان حالة منتج للإفساح عن شحنة جمركية',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-status-statement-for-customs-shipment?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب بيان حالة منتج للإفساح عن شحنة جمركية لمنتجات خاضعة للّوائح الإلزامية وغير حاصلة على شهادة مطابقة إماراتية من المنافذ الحدودية للدولة، على ألا يتم تداولها في أسواق الدولة لحين الحصول على شهادة مطابقة إماراتية أو إعادة تصديرها خارج الدولة خلال فترة ستة أشهر.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {
            text: 'تقديم طلب للحصول على إصدار بيان حالة منتج للإفساح عن شحنة جمركية',
          },
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'استلام نسخة رقمية من بيان حالة منتج للإفساح عن شحنة جمركية'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'صورة من الرخصة التجارية / الصناعية سارية المفعول للشركات',
          'أو صورة من بطاقة الهوية للأفراد',
          'صورة بحد أدنى من إحدى المستندات التالية: بيان جمركي / فاتورة / كشف معاينة / قائمة المنتجات',
          'صورة عن المنتج (إن وجدت)',
        ],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title:
              'استمارة تقديم - Issue Product Status Statement for Customs Shipment',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-product-status-statement-for-customs-shipment.ashx',
            name: 'Issue Product Status Statement for Customs Shipment',
            size: '213 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل الخدمة - النسخة العربية',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual-ar---issue-product-status-statement-for-customs-shipment.ashx',
            name: 'UserManual AR - Issue Product Status Statement for Customs Shipment',
            size: '556 KB',
            type: 'application/pdf',
          },
          {
            title: 'دليل الخدمة - النسخة الإنجليزية',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/customs-shipment-user-manual.ashx',
            name: 'Customs Shipment User Manual',
            size: '607 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: '200 درهم رسوم إصدار بيان حالة منتج لكل شحنة',
      price: '200 درهم',
      note: '',
    },
    serviceTime: 'خدمة فورية',
    package: 'باقة الإفصاح عن شحنة جمركية (PDF)',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني الحصول على موافقة الوزارة للإفساح عن شحنة جمركية؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على بيان حالة منتج للإفساح عن شحنة جمركية (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: [
            'صورة من الرخصة التجارية/ الصناعية سارية المفعول للشركات',
            'صورة من الهوية الإماراتية للأفراد',
            'صورة من إحدى المستندات (بيان جمركي / فاتورة / كشف معاينة / قائمة المنتجات)',
            'صورة عن المنتج (إن وجدت)',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'المنتجات الخاضعة و غير الخاضعة للوائح الفنية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات, أفراد',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'الباقة',
      description: 'باقة الإفصاح عن شحنة جمركية (PDF)',
      size: 'N/A',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/customspackages.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  {
    id: '7a11bf6d-2f3d-4a38-9073-a5a8b8538163',
    title: 'تصديق صورة طبق الأصل من شهادة مطابقة خليجية',
    Category_Id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
    relatedServiceId: 1057,
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/attestation-of-conformity-certificate-issued-by-gcc-standardization-organization?lang=ar',
    },
    description:
      'من خلال هذه الخدمة، يمكنك التقدم بطلب تصديق صورة طبق الأصل لشهادة المطابقة الصادرة عن هيئة التقييس الخليجية لاستيراد المنتجات الخاضعة للوائح الفنية الخليجية. ​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب  للحصول على تصديق صورة طبق الأصل من شهادة مطابقة خليجية​',
          },
          {
            text: 'إرفاق الوثائق المطلوبة',
          },
          {
            text: 'دفع الرسوم',
          },
          {
            text: 'استلام نسخة رقمية من صورة طبق الأصل من شهادة مطابقة خليجية مصدقة​',
          },
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: ['رخصة تجارية سارية المفعول', 'شهادة مطابقة خليجية'],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [
          {
            title: 'ملفات الجودة',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
            name: 'QualityDocuments',
            size: '9617 KB',
            type: 'application/x-zip-compressed',
          },
          {
            title: 'دليل المستخدم - شهادة مطابقة خليجية (الإطارات)',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/gso-tire-user-manual.ashx',
            name: 'GSO Tire User Manual',
            size: '652 KB',
            type: 'application/pdf',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: '50 درهم لكل صورة طبق الأصل عن شهادة مطابقة خليجية',
      price: '50 درهم',
      note: '',
    },
    serviceTime: 'خدمة فورية',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني الحصول على تصديق لشهادة المطابقة الخليجية للإطارات؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على تصديق صورة طبق الأصل من شهادة مطابقة خليجية (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: ['رخصة تجارية سارية المفعول', 'شهادة مطابقة خليجية'],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'الإطارات الخليجية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات التوريد والتوزيع​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'المستندات العامة',
      description: 'دليل الخدمات الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
      size: 'KB 1219 KB',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022eng.ashx',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  {
    id: '0c8b4abd-49ea-4e81-a10a-98d227a665ad',
    relatedServiceId: 1017,
    title: 'إصدار بطاقة بيان منتج للطائرات بدون طيار​',
    Category_Id: 'db59caa7-fe90-4a79-b347-fd6063eeeaf5',
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/issue-product-label-card-for-drones?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب بطاقة بيان منتج للطائرات بدون طيار والتي يتم تثبيتها بالطائرات والمركبات بدون طيار والتعرف عليها أو تتبعها في أسواق أو أجواء الدولة. بما يعزز معايير الأمن والسلامة في المجتمع وعلى المتعامل.',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: ' تسجيل الدخول على المنصة الرقمية لخدمات الوزارة (moiat.gov.ae) ​',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: '  تقديم طلب بيان حالة منتج للطائرات بدون طيار​',
          },
          {
            text: 'دفع الرسوم',
          },
          {
            text: 'استلام نسخة رقمية من البطاقات​',
          },
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: ['بيان حالة منتج للطائرات بدون طيار'],
      },
      {
        label: 'الملفات',
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع الملف',
        },
        filesList: [],
      },
    ],
    serviceFees: {
      serviceFees:
        '1 درهم لكل بطاقة بيان منتج خاص بالمنتجات والأنظمة للطائرات والمركبات الجوية بدون طيار',
      price: '1 درهم',
      note: '',
    },
    serviceTime: 'خدمة فورية',
    package: 'باقة الدرون',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني الحصول على بطاقة بيان حالة منتج للطائرات بدون طيار؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار بطاقة بيان منتج لتسجيل المنتجات والأنظمة للطائرات والمركبات الجوية بدون طيار (moiat.gov.ae)',
            'دفع الرسوم',
            'الحصول على البطاقات',
          ],
          requirements: [
            'بيان حالة منتج للمنتجات والأنظمة للطائرات والمركبات الجوية بدون طيار',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المطابقة',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'الطائرات بدون طيار',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nشركات التوريد والتوزيع\nالأفراد​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    generalDocument: {
      title: 'الباقة',
      description: 'باقة الدرون',
      size: 'N/A',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/services',
        },
      ],
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24 / 7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  // {
  //   id: 'e9f88132-a5e0-4bda-b01b-920835eb008b',
  //   relatedServiceId: 8,
  //   title: 'إصدار شهادات المطابقة للمنتجات حسب متطلبات الصحة والسلامة',
  //   Category_Id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
  //   startButton: {
  //     url: 'https://eservices.moiat.gov.ae/eservices/issue-conformity-certificates-for-regulated-products?lang=ar',
  //   },
  //   description:
  //     'تسجيل وإصدار شهادة مطابقة حسب برنامج تقييم المطابقة الإماراتي (إيكاس ECAS) تؤكد مطابقتها للمتطلبات الفنية.',
  //   sections: [
  //     {
  //       label: 'إجراءات الخدمة',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'تقديم طلب للحصول على إصدار شهادات المطابقة للمنتجات حسب متطلبات الصحة والسلامة',
  //         },
  //         {
  //           text: 'إرفاق الوثائق المطلوبة',
  //         },
  //         {
  //           text: 'دفع الرسوم',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'المتطلبات',
  //       Requirements: [
  //         'رخصة تجارية سارية المفعول',
  //         'تقرير اختبار عن المنتج صادر من مختبر معتمد',
  //       ],
  //     },
  //     {
  //       label: 'الملفات',
  //       filesSection: {
  //         fileName: 'اسم الملف',
  //         fileSize: 'حجم الملف',
  //         fileType: 'نوع الملف',
  //       },
  //       filesList: [
  //         {
  //           title: 'دليل مستخدم GMark',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/gmark-user-manual.ashx',
  //           name: 'GMark User Manual',
  //           size: '920 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'ملفات الجودة',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/qualitydocuments.ashx',
  //           name: 'QualityDocuments',
  //           size: '9617 KB',
  //           type: 'application/x-zip-compressed',
  //         },
  //         {
  //           title: 'استمارة تقديم - إصدار شهادات المطابقة (ECAS)',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-conformity-certificates---ecas.ashx',
  //           name: 'Issue Conformity Certificates - ECAS',
  //           size: '223 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'دليل مستخدم ورشة المركبات',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/vehicle-workshop-user-manual.ashx',
  //           name: 'Vehicle Workshop User Manual',
  //           size: '550 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title: 'دليل خدمة ECAS',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/ecas-user-manual.ashx',
  //           name: 'ECAS User Manual',
  //           size: '642 KB',
  //           type: 'application/pdf',
  //         },
  //         {
  //           title:
  //             'قائمة بمتطلبات جميع التشريعات والأنظمة الرقابية الخاصة بالمنتجات',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/cad-regulated-sheet.ashx',
  //           name: 'CAD Regulated Sheet',
  //           size: '262 KB',
  //           type: 'application/pdf',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     Fees: [
  //       {
  //         value:
  //           '600 درهم  : تقديم طلب لتسجيل المنتجات والخدمات في نظام تقويم المطابقة الإماراتي​​',
  //       },
  //       {
  //         value: '620 درهم : المراجعة الفنية للوثائق لكل شهادة مطابقة​​​',
  //       },
  //       {
  //         value: '500 درهم : إصدار شهادة المطابقة من الوزارة​​',
  //       },
  //       {
  //         value:
  //           '2,500 : درهم يوم عمل/ مقيم فني. (في حال تم إجراء التقييم الفني)​​',
  //       },
  //     ],
  //   },

  //   serviceTime: 'يوم ونصف عمل',
  //   package: 'الباقة',

  //   Tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question: 'كيف يمكنني الحصول على شهادة المطابقة لمنتجي؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         answers: [
  //           'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
  //           'تقديم طلب للحصول على إصدار شهادة المطابقة للمنتجات حسب متطلبات الصحة والسلامة (ECAS) (moiat.gov.ae)',
  //           'إرفاق الوثائق المطلوبة',
  //           'دفع الرسوم',
  //         ],
  //         requirements: [
  //           'رخصة تجارية سارية المفعول',
  //           'تقرير اختبار عن المنتج صادر من مختبر معتمد',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'نظرة عامة على الخدمة',
  //     serviceCategory: {
  //       label: 'فئة الخدمة',
  //       value: 'خدمات المطابقة',
  //     },
  //     serviceSubCategory: {
  //       label: 'الفئة الفرعية للخدمة',
  //       value: 'المنتجات الخاضعة للوائح الفنية',
  //     },
  //     serviceType: {
  //       label: 'نوع الخدمة',
  //       value: 'إجرائية',
  //     },
  //     targetAudience: {
  //       label: 'الجمهور المستهدف',
  //       value: 'المؤسسات الصناعية\nالجهات الحكومية​',
  //     },
  //     qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
  //   },
  //   generalDocument: {
  //     title: 'الباقة',
  //     description: 'دليل الخدمات الرقمية للوزارة',
  //     size: 'N/A',
  //     button: [
  //       {
  //         title: 'تحميل',
  //         url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022ar.ashx',
  //       },
  //     ],
  //   },
  //   serviceInfo: {
  //     title: 'معلومات الخدمة',
  //     availability: {
  //       label: 'توفر الخدمة',
  //       value: 'مفتوح 24 / 7',
  //     },
  //     paymentChannels: {
  //       label: 'قنوات الدفع',
  //       values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
  //     },
  //     serviceChannels: {
  //       label: 'قنوات الخدمة',
  //       browser: 'متصفح الويب',
  //       web: 'المنصة الرقمية لخدمات الوزارة',
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
  //       label: 'أهداف التنمية المستدامة',
  //       values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
  //     },
  //     serviceLinks: {
  //       label: 'ترابط الخدمة',
  //       value: ['لا يوجد'],
  //     },
  //   },
  //   tutorialVideo: {
  //     title: 'الفيديو التوضيحي لتقديم الخدمة',
  //     url: 'https://youtu.be/T_DhcPnIDB8',
  //   },
  // },
  {
    id: '04abd58d-5d71-45c3-8463-9f2a8d1787f3',
    relatedServiceId: 1069,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'تجديد اعتماد جهة تقييم المطابقة',
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
      url: 'https://eservices.moiat.gov.ae/eservices/renew-accreditation-of-conformity-assessment-bodies?lang=ar',
    },
    description: `من خلال هذه الخدمة يمكنك التقدم بطلب تجديد اعتماد جهة تقييم المطابقة وفقاً للمواصفات القياسية الدولية ومتطلبات نظام الاعتماد الوطني الإماراتي.​

  تقدم خدمات الاعتماد في البرامج التالية:​

-  اعتماد مختبرات الفحص حسب المواصفة القياسية الدولية ISO/IEC 17025 .​

-  اعتماد مختبرات المعايرة حسب المواصفة القياسية الدولية ISO/IEC 17025. ​

اعتماد جهات التفتيش وفقاً للمواصفة القياسية الدولية ISO/IEC 17020  ​

اعتماد جهات منح شهادات المطابقة للعمليات، والمنتجات،  والخدمات وفقاً للمواصفة القياسية الدولية ISO/IEC 17065.​

اعتماد جهات منح شهادات المطابقة للحلال حسب المواصفات القياسية ذات العلاقة UAE. S GSO 2055-2, OIC/SMIIC 2​

اعتماد في مجال المختبرات الطبية حسب المواصفة القياسية الدولية ISO 15189.​`,
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'التقدم بطلب للحصول على خدمة تجديد اعتماد جهة تقييم المطابقة'},
          {
            text: 'إرفاق الوثائق المطلوبة وتعبئة الوثائق والموافقة على الشروط والأحكام، والسياسات المرتبطة بالاعتماد، وإرفاق نسخة موقعة من الاتفاقية بين نظام الاعتماد الوطني الإماراتي (الوزارة) ومقدم الطلب',
          },
          {text: 'سداد رسوم الطلب'},
          {text: 'تخطيط التقييم الميداني لأول مرة'},
          {text: 'سداد رسوم التقييم الميداني'},
          {text: 'إغلاق حالات عدم المطابقة (إن وجدت) للزيارة الميدانية'},
          {text: 'سداد الرسوم والتكاليف الإضافية (إن وجدت)'},
          {
            text: 'استلام شهادة ومجال اعتماد جهات تقييم المطابقة صادرة عن الوزارة',
          },
          {
            text: 'يمكن الرجوع الى الدليل الإرشادي EG 03 حول عملية ومتطلبات الاعتماد والمتوفرة على موقع الوزارة الإلكتروني',
          },
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول',
          'شهادة تسجيل سارية المفعول صادرة عن الوزارة (تستثنى المختبرات الطبية وجهات تقييم المطابقة الأجنبية)',
          'تقديم طلب تجديد الاعتماد والوثائق المطلوبة قبل 4 أشهر على الأقل من تاريخ انتهاء شهادة الاعتماد',
          'دفع الرسوم في الوقت المحدد',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: '1,000 درهم رسوم تقديم طلب​'},
        {value: '2,000 درهم رسوم تقديم طلب مستعجل​'},
        {
          value:
            '2,500 درهم رسوم مراجعة أو تقييم كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)​',
        },
        {
          value:
            '5,000 درهم رسوم مراجعة أو تقييم مستعجل كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)​',
        },
        {
          value:
            '3,000 درهم رسوم تقييم جهة تقييم المطابقة (ميداني/ عن بعد) (عن كل مقيم/ عن كل يوم)​',
        },
        {value: '12,000 درهم رسوم تجديد الاعتماد (لمدة 3 سنوات)​'},
        {
          value:
            '1,000 درهم رسوم تعديل أي من الأنشطة أو البيانات الواردة في شهادة/مجال اعتماد جهة تقييم مطابقة (إن لزم)​',
        },
        {
          value:
            'تتحمل الجهة كافة التكاليف والنفقات المترتبة على عمليات التقييم وتقييم المتابعة اللاحقة، بالإضافة الى نفقات سفر وتنقل وإقامة المقيم من خارج او داخل الدولة ، بالإضافة الى أي تكاليف تطلبها عملية التقييم.​',
        },
      ],
    },
    serviceTime: '90 يوم عمل',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question: 'كيفية تجديد اعتماد جهات تقييم المطابقة وماهي المتطلبات؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'لتفاصيل إجراءات تقديم تجديد خدمة الاعتماد، يمكن الاطلاع على بطاقة الخدمة عبر الرابط الإلكتروني.',
            'كما يمكن الاطلاع على الدليل الإرشادي ENAS EG 03 حول عملية ومتطلبات الاعتماد من موقع الوزارة الإلكتروني.',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول',
            'شهادة تسجيل سارية المفعول صادرة عن الوزارة (تستثنى المختبرات الطبية وجهات تقييم المطابقة الأجنبية)',
            'تقديم طلب تجديد الاعتماد والوثائق المطلوبة قبل 4 أشهر على الأقل من تاريخ انتهاء شهادة الاعتماد',
            'دفع الرسوم في الوقت المحدد',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الاعتماد الوطني',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'الاعتماد',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value:
          'شركات\nالجهات الحكومية\nمثال: جهات تقييم المطابقة: مختبرات الفحص والمعايرة , جهات التفتيش , جهات منح شهادات المطابقة للمنتجات , المختبرات الطبية , جهات منح شهادات الحلال​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'ساعات العمل الرسمية',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة تسجيل جهات تقييم المطابقة',
          'خدمة تعيين جهات تقييم المطابقة',
        ],
      },
    },
  },
  {
    id: '04abd58d-5d71-45c3-8463-9f2a8d1787f2',
    relatedServiceId: 1067,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'إضافة نشاط/ مجال اعتماد لجهة تقييم المطابقة​',
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
      url: 'https://eservices.moiat.gov.ae/eservices/renew-accreditation-of-conformity-assessment-bodies?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب إضافة نشاط/ مجال اعتماد لجهة تقييم المطابقة المعتمدة.\n\nتقدم خدمات الاعتماد في البرامج التالية:\n\n- اعتماد مختبرات الفحص حسب المواصفة القياسية الدولية ISO/IEC 17025.\n\n- اعتماد مختبرات المعايرة حسب المواصفة القياسية الدولية ISO/IEC 17025.\n\n- اعتماد جهات التفتيش وفقاً للمواصفة القياسية الدولية ISO/IEC 17020.\n\n- اعتماد جهات منح شهادات المطابقة للعمليات، والمنتجات، والخدمات وفقاً للمواصفة القياسية الدولية ISO/IEC 17065.\n\n- اعتماد جهات منح شهادات المطابقة للحلال حسب المواصفات القياسية ذات العلاقة UAE.S GSO 2055-2, OIC/SMIIC 2.\n\n- اعتماد في مجال المختبرات الطبية حسب المواصفة القياسية الدولية ISO 15189.',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب إضافة نشاط/ مجال اعتماد لجهة تقييم المطابقة',
          },
          {
            text: 'إرفاق الوثائق المطلوبة وتعبئة الوثائق والموافقة على الشروط والأحكام والسياسات المرتبطة بالاعتماد، وإرفاق نسخة موقعة من الاتفاقية بين نظام الاعتماد الوطني الإماراتي (الوزارة) ومقدم الطلب',
          },
          {
            text: 'سداد رسوم الطلب',
          },
          {
            text: 'تخطيط التقييم الميداني لأول مرة',
          },
          {
            text: 'سداد رسوم التقييم الميداني',
          },
          {
            text: 'إغلاق حالات عدم المطابقة (إن وجدت) للزيارة الميدانية',
          },
          {
            text: 'سداد الرسوم والتكاليف الإضافية (إن وجدت)',
          },
          {
            text: 'استلام مجال اعتماد جهات تقييم المطابقة محدث ويتضمن المجال الجديد',
          },
          {
            text: 'يمكن الرجوع إلى الدليل الإرشادي EG 03 حول عملية ومتطلبات الاعتماد والمتوفرة على موقع الوزارة الإلكتروني',
          },
        ],
      },
      {
        Requirements: [
          'رخصة تجارية سارية المفعول',
          'شهادة تسجيل سارية المفعول صادرة عن الوزارة (تستثنى جهات تقييم المطابقة المسجلة خارج الدولة والمختبرات الطبية)',
          'نظام إدارة الجودة والوثائق الفنية ذات العلاقة ببرنامج الاعتماد والمحددة في الطلب',
          'نموذج موقع من الاتفاقية بين نظام الاعتماد الوطني ومقدم الطلب',
        ],
      },
    ],

    serviceFees: {Fees:[
      {value: '1,000 درهم رسوم تقديم طلب​'},
      {value: '2,000 درهم رسوم تقديم طلب مستعجل​'},
      {
        value:
          '2,500 درهم رسوم مراجعة أو تقييم كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)​',
      },
      {
        value:
          '5,000 درهم رسوم مراجعة أو تقييم مستعجل كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)​',
      },
      {
        value:
          '3,000 درهم رسوم تقييم جهة تقييم المطابقة (ميداني/ عن بعد) (عن كل مقيم/ عن كل يوم)​',
      },
      {value: '12,000 درهم رسوم تجديد الاعتماد (لمدة 3 سنوات)​'},
      {
        value:
          '1,000 درهم رسوم تعديل أي من الأنشطة أو البيانات الواردة في شهادة/مجال اعتماد جهة تقييم مطابقة (إن لزم)​',
      },
      {
        value:
          'تتحمل الجهة كافة التكاليف والنفقات المترتبة على عمليات التقييم وتقييم المتابعة اللاحقة، بالإضافة الى نفقات سفر وتنقل وإقامة المقيم من خارج او داخل الدولة ، بالإضافة الى أي تكاليف تطلبها عملية التقييم.​',
      },
    ]},
    serviceTime: '90 يوم عمل',
    package: 'الباقة',

    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الاعتماد الوطني',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'الاعتماد',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value:
          'شركات\nالجهات الحكومية\nمثال: جهات تقييم المطابقة: مختبرات الفحص والمعايرة , جهات التفتيش , جهات منح شهادات المطابقة للمنتجات , المختبرات الطبية , جهات منح شهادات الحلال​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'ساعات العمل الرسمية',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة تسجيل جهات تقييم المطابقة',
          'خدمة تعيين جهات تقييم المطابقة',
        ],
      },
    },
  },
  {
    id: '04abd58d-5d71-4567-8463-9f2a8d1787f2',
    relatedServiceId: 1067,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'تعديل شهادة/ مجال اعتماد جهة تقييم المطابقة​',
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
      url: 'https://eservices.moiat.gov.ae/eservices/renew-accreditation-of-conformity-assessment-bodies?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب تعديل أي من الأنشطة أو البيانات الواردة في شهادة/ مجال اعتماد جهة تقييم المطابقة سارية المفعول بعد تقديم كافة الأدلة والوثائق المطلوبة لتعديل الشهادة/المجال:\n\n- في حال رغبة الجهة المعتمدة في تعديل أي نشاط في مجال الاعتماد.\n\n- في حال رغبة الجهة المعتمدة بتغيير الرخصة التجارية، بما في ذلك اسم الجهة وملكية الجهة.\n\n- في حال تغيير موقع جهة تقييم المطابقة المعتمدة.\n\n- في حال رغبة جهة تقييم المطابقة المعتمدة بإيقاف جزئي أو كلي لمجالات الاعتماد المعتمدة، أو إلغاء كلي، أو جزئي، أو التقليل في المجالات المعتمدة.',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'التقدم بطلب للحصول على خدمة طلب تعديل شهادة/ مجال اعتماد جهة تقييم المطابقة',
          },
          {
            text: 'إرفاق الوثائق المطلوبة وتعبئة الوثائق والموافقة على الشروط والأحكام والسياسات المرتبطة بالاعتماد، وإرفاق نسخة موقعة من الاتفاقية بين نظام الاعتماد الوطني الإماراتي (الوزارة) ومقدم الطلب',
          },
          {
            text: 'سداد رسوم الطلب',
          },
          {
            text: 'إغلاق حالات عدم المطابقة (إن وجدت) من عملية مراجعة الوثائق (إذا تم التنفيذ ويعتمد على نوع التعديل المطلوب)',
          },
          {
            text: 'تخطيط التقييم الميداني لأول مرة (إذا تم التنفيذ ويعتمد على التعديل المطلوب)',
          },
          {
            text: 'سداد رسوم التقييم الميداني (إذا تم التنفيذ ويعتمد على التعديل المطلوب)',
          },
          {
            text: 'إغلاق حالات عدم المطابقة (إن وجدت) للزيارة الميدانية (إذا تم التنفيذ ويعتمد على التعديل المطلوب)',
          },
          {
            text: 'سداد الرسوم والتكاليف الإضافية (إن وجدت)',
          },
          {
            text: 'استلام شهادة/مجال اعتماد جهات تقييم المطابقة محدثة إلكترونياً',
          },
          {
            text: 'يمكن الرجوع إلى الدليل الإرشادي EG 03 حول عملية ومتطلبات الاعتماد والمتوفرة على موقع الوزارة الإلكتروني',
          },
        ],
      },
      {
        Requirements: [
          'رخصة تجارية سارية المفعول أو قانون الإنشاء للجهات الحكومية',
          'شهادة تسجيل سارية المفعول صادرة عن الوزارة (تستثنى جهات تقييم المطابقة الأجنبية والمختبرات الطبية)',
          'نظام إدارة الجودة والوثائق الفنية ذات العلاقة ببرنامج الاعتماد وتعبئة النماذج المحددة في الطلب',
          'نموذج موقع من الاتفاقية بين نظام الاعتماد الوطني الإماراتي ومقدم الطلب',
          'أي وثيقة أخرى دليل على التعديل المطلوب',
        ],
      },
    ],

    serviceFees: {
      Fees: [
        {value: '1,000 درهم رسوم تقديم طلب​'},
        {value: '2,000 درهم رسوم تقديم طلب مستعجل​'},
        {
          value:
            '2,500 درهم رسوم مراجعة أو تقييم كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)​',
        },
        {
          value:
            '5,000 درهم رسوم مراجعة أو تقييم مستعجل كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)​',
        },
        {
          value:
            '3,000 درهم رسوم تقييم جهة تقييم المطابقة (ميداني/ عن بعد) (عن كل مقيم/ عن كل يوم)​',
        },
        {value: '12,000 درهم رسوم تجديد الاعتماد (لمدة 3 سنوات)​'},
        {
          value:
            '1,000 درهم رسوم تعديل أي من الأنشطة أو البيانات الواردة في شهادة/مجال اعتماد جهة تقييم مطابقة (إن لزم)​',
        },
        {
          value:
            'تتحمل الجهة كافة التكاليف والنفقات المترتبة على عمليات التقييم وتقييم المتابعة اللاحقة، بالإضافة الى نفقات سفر وتنقل وإقامة المقيم من خارج او داخل الدولة ، بالإضافة الى أي تكاليف تطلبها عملية التقييم.​',
        },
      ],
    },
    serviceTime: '90 يوم عمل',
    package: 'الباقة',

    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الاعتماد الوطني',
      },
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'الاعتماد',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'إجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value:
          'شركات\nالجهات الحكومية\nمثال: جهات تقييم المطابقة: مختبرات الفحص والمعايرة , جهات التفتيش , جهات منح شهادات المطابقة للمنتجات , المختبرات الطبية , جهات منح شهادات الحلال​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'ساعات العمل الرسمية',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة فيزا', 'بطاقة ماستر كارد'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة تسجيل جهات تقييم المطابقة',
          'خدمة تعيين جهات تقييم المطابقة',
        ],
      },
    },
  },
  // {
  //   id: '8bfe5cea-56cd-4c05-9be0-9538d8e0f130',
  //   relatedServiceId: 1068,
  //   title: 'تعديل نشاط في شهادة اعتماد جهات تقييم المطابقة',
  //   Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
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
  //     url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-accreditation-certificate-of-conformity-assessment-bodies-certificate?lang=ar',
  //   },
  //   description:
  //     'إجراء يتم بموجبه تعديل على نشاط في شهادة/ مجال الاعتماد سارية المفعول والصادرة من إدارة الاعتماد الوطني بعد تقديم جهة تقييم المطابقة كافة الأدلة لتعديل الشهادة/المجال. يشمل الحالات مثل تعديل النشاط، تغيير الرخصة التجارية أو الملكية، تغيير الموقع، أو إيقاف/إلغاء/تقليل مجالات الاعتماد.',
  //   sections: [
  //     {
  //       label: 'إجراءات الخدمة',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'تقديم الطلب للحصول على تعديل نشاط في شهادة اعتماد جهات تقييم المطابقة',
  //         },
  //         {text: 'إرفاق كافة الوثائق المطلوبة والنماذج المحددة في نموذج الطلب'},
  //         {
  //           text: 'الموافقة على الشروط والأحكام والسياسات المرتبطة بالاعتماد وإرفاق نسخة موقعة من الاتفاقية مع نظام الاعتماد الوطني الإماراتي (الوزارة)',
  //         },
  //         {text: 'مراجعة الطلب والوثائق من قبل الموظف المختص'},
  //         {text: 'دفع الرسوم'},
  //         {text: 'تخطيط التقييم الميداني (إن لزم)'},
  //         {text: 'تنفيذ التقييم الميداني (إن لزم)'},
  //         {text: 'إغلاق حالات عدم المطابقة (إن وجدت)'},
  //         {
  //           text: 'إصدار قرار التعديل على شهادة/مجال الاعتماد والحصول على الشهادة/المجال المعدل',
  //         },
  //         {text: 'الإعلان عن مجال الاعتماد المعدل على موقع الوزارة'},
  //       ],
  //     },
  //     {
  //       label: 'المتطلبات',
  //       Requirements: [
  //         'تقديم طلب تعديل على شهادة/مجال الاعتماد',
  //         'إرفاق كافة الوثائق المطلوبة',
  //         'سداد الرسوم',
  //         'تقديم الوثائق الإضافية المطلوبة بعد المراجعة (إن لزم)',
  //         'تنفيذ زيارة ميدانية (إن لزم)',
  //         'إغلاق حالات عدم المطابقة (إن وجدت)',
  //         'تشمل أنواع التعديلات: تغيير الكيان القانوني (الملكية/الاسم/الرخصة التجارية)، تغيير الموقع، تعديل النشاط أو مجال الاعتماد، تعليق/إلغاء النشاط أو المجال، أو أي تغيير يؤثر على كفاءة الجهة المعتمدة',
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees:
  //       '1000 درهم – رسوم تقديم طلب\n2000 درهم – رسوم تقديم طلب مستعجل\n1000 درهم – رسوم تعديل أي من الأنشطة أو البيانات في شهادة/مجال الاعتماد\n2500 درهم – رسوم مراجعة أو تقييم كتيب ووثائق الجودة (عن كل عملية تقييم/مراجعة) - إن لزم\n5000 درهم – رسوم مراجعة أو تقييم مستعجل كتيب ووثائق الجودة (عن كل عملية تقييم/مراجعة) - إن لزم\n3000 درهم – رسوم تقييم جهة تقييم المطابقة (ميداني/عن بعد) (عن كل مقيم/عن كل يوم) - إن لزم',
  //     price: 'متغير',
  //     note: 'تتحمل الجهة كافة التكاليف والنفقات المترتبة على تعديل النشاط بما في ذلك سفر وتنقل وإقامة المقيم أو أية مصروفات إضافية.',
  //   },
  //   serviceTime: '5 أيام عمل',
  //   package: 'الباقة',

  //   Tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question:
  //           'كيفية تعديل نشاط في شهادة اعتماد جهات تقييم المطابقة وماهي المتطلبات؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         answers: [
  //           'تقديم طلب تعديل على شهادة/مجال الاعتماد عبر منصة الوزارة',
  //           'إرفاق الوثائق المطلوبة',
  //           'سداد الرسوم',
  //           'مراجعة الطلب والوثائق',
  //           'تقديم الوثائق الإضافية بعد المراجعة (إن لزم)',
  //           'تنفيذ التقييم الميداني (إن لزم)',
  //           'إغلاق حالات عدم المطابقة (إن وجدت)',
  //           'الحصول على الشهادة/المجال المعدل',
  //         ],
  //         requirements: [
  //           'رخصة تجارية سارية المفعول',
  //           'طلب تعديل مكتمل مع الوثائق الداعمة',
  //           'أنواع التعديلات: تغيير الكيان القانوني، تغيير الموقع، تعديل النشاط/مجال الاعتماد، تعليق/إلغاء النشاط، أو تغييرات في الكوادر أو الأنشطة المؤثرة على الكفاءة',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'نظرة عامة على الخدمة',
  //     serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الاعتماد الوطني'},
  //     serviceSubCategory: {label: 'الفئة الفرعية', value: 'الإعتماد'},
  //     serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
  //     targetAudience: {
  //       label: 'الجمهور المستهدف',
  //       value:
  //         'مختبرات الفحص والمعايرة، جهات التفتيش، جهات منح شهادات المطابقة للمنتجات، المختبرات الطبية، جهات منح شهادات الحلال',
  //     },
  //     qrCaption: 'افتح بطاقة الخدمة على الهاتف المتحرك أو الجهاز اللوحي.',
  //   },
  //   serviceInfo: {
  //     title: 'معلومات الخدمة',
  //     availability: {label: 'التوافر', value: 'ساعات العمل الرسمية'},
  //     paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستر كارد']},
  //     serviceChannels: {
  //       label: 'قنوات الخدمة',
  //       browser: 'متصفح الإنترنت',
  //       web: 'المنصة الرقمية لخدمات الوزارة',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'جوجل بلاي',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'آبل ستور',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'أهداف التنمية المستدامة',
  //       values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
  //     },
  //     serviceLinks: {
  //       label: 'ترابط الخدمة',
  //       value: [
  //         'خدمة تسجيل جهات تقييم المطابقة',
  //         'خدمة تعيين جهات تقييم المطابقة',
  //       ],
  //     },
  //   },
  // },
  // {
  //   id: '8179b70d-d021-4dcb-bd8a-1403e3167fe3',
  //   relatedServiceId: 1067,
  //   title: 'توسيع مجال اعتماد جهات تقييم المطابقة',
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
  //     url: 'https://eservices.moiat.gov.ae/eservices/scope-expansion-of-accreditation-of-conformity-assessment-bodies?lang=ar',
  //   },
  //   description:
  //     'إجراء يُمنح بموجبه اعترافاً رسمياً بتوسيع مجال اعتماد جهة تقييم المطابقة، من خلال إضافة حقول جديدة في وثيقة مجال الاعتماد لجهة تقييم المطابقة المعتمدة مسبقاً.',
  //   sections: [
  //     {
  //       label: 'إجراءات الخدمة',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {text: 'التقديم على الخدمة لتوسيع مجال اعتماد جهات تقييم المطابقة'},
  //         {text: 'إرفاق كافة الوثائق المطلوبة والنماذج المحددة في نموذج الطلب'},
  //         {
  //           text: 'الموافقة على الشروط والأحكام والسياسات المرتبطة بالاعتماد وإرفاق نسخة موقعة من الاتفاقية مع نظام الاعتماد الوطني الإماراتي',
  //         },
  //         {text: 'دفع الرسوم'},
  //         {text: 'تخطيط التقييم الميداني'},
  //         {text: 'تنفيذ التقييم الميداني'},
  //         {text: 'إغلاق حالات عدم المطابقة (إن وجدت)'},
  //         {text: 'سداد الرسوم والتكاليف المترتبة'},
  //         {text: 'إصدار قرار توسيع مجال الاعتماد'},
  //         {text: 'الحصول على مجال الاعتماد المحدّث'},
  //         {text: 'الإعلان عن مجال الاعتماد المحدّث على موقع الوزارة'},
  //       ],
  //     },
  //     {
  //       label: 'المتطلبات',
  //       Requirements: [
  //         'رخصة تجارية سارية المفعول',
  //         'شهادة تسجيل سارية المفعول صادرة عن الوزارة (باستثناء المختبرات الطبية وجهات تقييم المطابقة الأجنبية)',
  //         'تقديم طلب الاعتماد والوثائق المطلوبة قبل شهرين على الأقل من موعد التقييم في الموقع',
  //         'دفع الرسوم في الوقت المحدد',
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees:
  //       '1000 درهم – رسوم تقديم طلب\n2000 درهم – رسوم تقديم طلب مستعجل\n1000 درهم – رسوم تعديل أي من الأنشطة أو البيانات في شهادة/ مجال الاعتماد\n2500 درهم – رسوم مراجعة أو تقييم كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)\n5000 درهم – رسوم مراجعة أو تقييم مستعجل كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)\n3000 درهم – رسوم تقييم جهة تقييم المطابقة (ميداني/ عن بعد، عن كل مقيم/ يوم)',
  //     price: 'متغير',
  //     note: 'تتحمل الجهة كافة التكاليف والنفقات المترتبة على عمليات التقييم أو التعديل، بما في ذلك سفر وتنقل وإقامة المقيمين أو أي مصروفات إضافية.',
  //   },
  //   serviceTime: '90 أيام عمل',
  //   package: 'الباقة',

  //   Tags: {},
  //   faq: {
  //     items: [
  //       {
  //         question:
  //           'كيفية توسيع مجال اعتماد جهات تقييم المطابقة وماهي المتطلبات؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         answers: [
  //           'تقديم طلب عبر موقع الوزارة مرفقاً بالوثائق المطلوبة',
  //           'دفع الرسوم',
  //           'تنفيذ عملية التقييم',
  //           'إغلاق حالات عدم المطابقة (إن وجدت)',
  //           'إصدار قرار التوسيع',
  //           'يمكن الرجوع إلى الدليل الإرشادي ENAS EG 03 لمزيد من التفاصيل حول الإجراءات والمتطلبات',
  //         ],
  //         requirements: [
  //           'رخصة تجارية سارية المفعول',
  //           'شهادة تسجيل سارية المفعول صادرة عن الوزارة',
  //           'تقديم الطلب والوثائق المطلوبة قبل شهرين من التقييم',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'نظرة عامة على الخدمة',
  //     serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الاعتماد الوطني'},
  //     serviceSubCategory: {label: 'الفئة الفرعية', value: 'الاعتماد'},
  //     serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
  //     targetAudience: {
  //       label: 'الجمهور المستهدف',
  //    value: 'المؤسسات الصناعية​\nشركات التوريد والتوزيع​',
  //     },
  //     qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
  //   },
  //   serviceInfo: {
  //     title: 'معلومات الخدمة',
  //     availability: {label: 'التوفر', value: 'خلال ساعات العمل الرسمية'},
  //     paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
  //     serviceChannels: {
  //       label: 'قنوات الخدمة',
  //       browser: 'المتصفح الإلكتروني',
  //       web: 'منصة الخدمات الرقمية للوزارة',
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
  //       label: 'أهداف التنمية المستدامة',
  //       values: ['الصحة الجيدة والرفاه', 'العمل اللائق ونمو الاقتصاد'],
  //     },
  //     serviceLinks: {
  //       label: 'ترابط الخدمة',
  //       value: [
  //         'خدمة تسجيل جهات تقييم المطابقة',
  //         'خدمة تعيين جهات تقييم المطابقة',
  //       ],
  //     },
  //   },
  // },
  {
    id: 'b18384b7-283b-47f6-b4ee-e29a11e4f3ce',
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    relatedServiceId: 1049,
    title: 'تعديل شهادة تعيين جهة تقييم المطابقة',
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
      url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-notification-certificate-of-conformity-assessment-bodies-certificate?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب تعديل في شهادة تعيين جهة تقييم المطابقة سارية المفعول بعد تقديم كافة الأدلة والوثائق المطلوبة.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب تعديل شهادة تعيين جهة تقييم المطابقة'},
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'استلام شهادة تعيين جهات تقييم المطابقة محدثة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول في دولة الإمارات العربية المتحدة',
          'شهادة اعتماد سارية المفعول صادرة عن أجهزة اعتماد وطنية للمجال المقدم',
          'دليل الجودة والإجراءات، بما في ذلك إجراءات التقييم وإجراءات أنظمة تقييم المطابقة',
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'رسوم الطلب 1,000 درهم عن كل مرة​'}],
    },
    serviceTime: '5 أيام عمل',
    package: 'الباقة',

    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيفية تعديل نشاط في شهادة تعيين جهات تقييم مطابقة وماهي المتطلبات؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae).',
            'تقديم طلب للحصول على تعديل نشاط في شهادة تعيين جهات تقييم مطابقة.',
            'إرفاق الوثائق المطلوبة.',
            'دفع الرسوم.',
            'الحصول على الشهادة.',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول في دولة الإمارات العربية المتحدة.',
            'شهادة تسجيل سارية المفعول.',
            'شهادة اعتماد سارية المفعول صادرة عن نظام الاعتماد الوطني ENAS أو أي جهة اعتماد مقبولة لدى الوزارة.',
            'دليل الجودة والإجراءات، بما في ذلك إجراءات التقييم وإجراءات أنظمة تقييم المطابقة.',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الاعتماد الوطني'},
      serviceSubCategory: {label: 'الفئة الفرعية', value: 'التعيين'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات\nالجهات الحكومية\n(جهات تقييم المطابقة المعتمدة)​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'التوفر', value: 'خلال ساعات العمل الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'المتصفح الإلكتروني',
        web: 'منصة الخدمات الرقمية للوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق ونمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة تسجيل جهات تقييم المطابقة',
          'خدمة اعتماد جهات تقييم المطابقة',
        ],
      },
    },
  },
  {
    id: '5bc3ecec-6eba-436a-95e7-ea3434f9c209',
    relatedServiceId: 1066,
    title: 'تعديل في شهادة تسجيل جهة منح شهادات الحلال​',
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
      url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-registration-of-halal-certification-bodies-certificate?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب تعديل في شهادة تسجيل جهة منح شهادات الحلال بعد تقديم الجهة كافة الأدلة المطلوبة.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {
            text: 'تقديم طلب تعديل أي من الأنشطة أو البيانات في شهادة تسجيل جهة منح شهادات الحلال',
          },
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'استلام شهادة تسجيل جهات منح شهادات الحلال محدثة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول أو ما يعادلها',
          'شهادة اعتماد سارية المفعول',
          'مجال شهادة الاعتماد من جهة اعتماد مقبولة لدى الوزارة',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'رسوم الطلب 500 درهم عن كل مرة​'},
        {value: '1000 درهم عن كل مجال تسجيل​'},
      ],
    },
    serviceTime: '10 أيام عمل',
    package: 'الباقة',
    tags: 'الوسوم',
    Tags: {},
    faq: {
      items: [
        {
          question: 'كيفية تسجيل جهات منح شهادات الحلال وماهي المتطلبات ؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae).',
            'تقديم طلب للحصول على تعديل نشاط في شهادة تسجيل جهات منح شهادات الحلال (moiat.gov.ae).',
            'إرفاق الوثائق المطلوبة.',
            'مراجعة الطلب.',
            'دفع الرسوم.',
            'استصدار الشهادة.',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول أو ما يعادلها.',
            'شهادة اعتماد سارية المفعول مع مجال شهادة الاعتماد من جهة اعتماد مقبولة لدى الوزارة.',
            'شهادة تسجيل سارية من قبل الوزارة.',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الإعتماد الوطني'},
      serviceSubCategory: {label: 'الفئة الفرعية للخدمة', value: 'الحلال'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​\n(جهات منح شهادات الحلال)',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال ساعات العمل الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'المتصفح الإلكتروني',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {label: 'ترابط الخدمة', value: []},
    },
  },
  {
    id: '4b93822c-767e-4922-822a-55a86bf59b52',
    relatedServiceId: 1025,
    title: 'إصدار شهادة تسجيل جهة منح شهادات الحلال',
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
      url: 'https://eservices.moiat.gov.ae/eservices/registration-of-halal-certification-bodies?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب إصدار شهادة تسجيل جهة منح شهادات الحلال حيث يمنح بموجبها اعترافاً رسمياً من الوزارة بقبول شهادات الحلال الصادرة عن جهات منح شهادات الحلال المسجلة وذلك وفقاً لقرار مجلس الوزراء رقم 10 لسنة 2014، بشأن النظام الإماراتي للرقابة على المنتجات الحلال.   ',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب إصدار شهادة تسجيل جهة منح شهادات الحلال'},
          {text: 'إرفاق الوثاق المطلوبة'},
          {text: 'دفع الرسوم الأولية'},
          {
            text: 'التواصل مع جهة الاعتماد التي تم اختيارها للحصول على الاعتماد',
          },
          {text: 'إرفاق شهادة الاعتماد'},
          {text: 'دفع رسوم شهادة تسجيل جهة منح شهادات الحلال'},
          {text: 'استلام شهادة تسجيل جهات منح شهادات الحلال'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول أو ما يعادلها',
          'شهادة اعتماد سارية المفعول',
          'مجال شهادة الاعتماد من جهة اعتماد مقبولة لدى الوزارة',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'تقديم طلب تسجيل 1,000 درهم​'},
        {value: '1,000 درهم عن كل مجال تسجيل​'},
      ],
    },
    serviceTime: '10 أيام عمل',
    package: 'الباقة',
    tags: 'الوسوم',
    Tags: {},
    faq: {
      items: [
        {
          question: 'كيفية تسجيل جهات منح شهادات الحلال وماهي المتطلبات ؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae).',
            'تقديم طلب للحصول على تسجيل جهات منح شهادات الحلال (moiat.gov.ae).',
            'إرفاق الوثائق المطلوبة.',
            'مراجعة الطلب.',
            'دفع الرسوم.',
            'استصدار الشهادة.',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول أو ما يعادلها.',
            'شهادة اعتماد سارية المفعول مع مجال شهادة الاعتماد من جهة اعتماد مقبولة لدى الوزارة.',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الإعتماد الوطني'},
      serviceSubCategory: {label: 'الفئة الفرعية للخدمة', value: 'الحلال'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​\n(جهات منح شهادات الحلال)',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف أو الجهاز اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال ساعات العمل الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'المتصفح الإلكتروني',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['اعتماد وتعيين هيئات تقييم المطابقة'],
      },
    },
  },
  {
    id: '532cc003-56a9-481f-b748-8abe92f1b458',
    relatedServiceId: 1013,
    title:
      'إصدار شهادة تسجيل مشاغل صيانة وإصلاح ومعايرة أدوات القياس القانونية',
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
      url: 'https://eservices.moiat.gov.ae/eservices/registration-of-maintenance-repair-and-calibration-of-legal-measuring-instruments-workshop?lang=ar',
    },
    description:
      'تسجيل مشاغل صيانة وإصلاح وتركيب ومعايرة أدوات القياس القانونية تؤكد مطابقتها للمتطلبات الفنية الواردة في قرار مجلس الإدارة رقم 51 لسنة 2015.',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'التقديم على خدمة إصدار شهادة تسجيل مشاغل صيانة وإصلاح ومعايرة أدوات القياس القانونية',
          },
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'مراجعة الوثائق'},
          {text: 'الزيارة الميدانية'},
          {text: 'الحصول على الشهادة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية / صناعية سارية المفعول',
          'شهادات المعايرة للمعايير المرجعية',
          'إجراءات حفظ وتداول المعايير المرجعية',
          'الإجراءات الفنية والنماذج المستخدمة لعمليات الصيانة لأدوات القياس',
          'نموذج الصيانة والمعايرة',
          'مخطط التشغيل',
          'خارطة الموقع',
          'وجود الأشخاص المؤهلين',
          'البنية التحتية والوسائل الفنية اللازمة لممارسة النشاط بكل كفاءة ودقة',
          'معايير القياس المناسبة لممارسة النشاط',
          'نظام إدارة جودة يضمن توثيق أعمال التركيب والصيانة والإصلاح ويسهل الرجوع إليه',
          'توفير قائمة أسعار للمتعاملين مطبوعة بشكل واضح ومعلنة',
          'توفير علامة أو اختام مميزة خاصة بالمشغل توافق عليها الوزارة توضع على كل أداة قياس تم التعامل معها',
        ],
      },
    ],
    serviceFees: {
      serviceFees: '3000 درهم',
      price: '3000 درهم',
    },
    serviceTime: '8 أيام عمل',
    package: 'الباقة',
    tags: 'الكلمات الدلالية',
    Tags: {},
    faq: {
      items: [
        {
          question:
            'كيف يمكنني الحصول على شهادة تسجيل مشاغل صيانة وإصلاح ومعايرة أدوات القياس القانونية؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة.',
            'التقديم على خدمة إصدار شهادة تسجيل مشاغل صيانة وإصلاح ومعايرة أدوات القياس القانونية.',
            'إرفاق الوثائق المطلوبة.',
            'دفع الرسوم.',
            'مراجعة الوثائق.',
            'إجراء الزيارة الميدانية.',
            'الحصول على الشهادة.',
          ],
          requirements: [
            'رخصة تجارية / صناعية سارية المفعول',
            'شهادات المعايرة للمعايير المرجعية',
            'الإجراءات الفنية والنماذج المستخدمة للصيانة والمعايرة',
            'البنية التحتية والوسائل الفنية اللازمة',
            'نظام إدارة جودة معتمد',
            'قائمة أسعار معلنة وختم معتمد من الوزارة',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الإعتماد الوطني'},
      serviceSubCategory: {label: 'فئة الخدمة الفرعية', value: 'المقاييس'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال أوقات الدوام الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['لا يوجد'],
      },
    },
  },
  {
    id: '8deb1492-f0e0-45fe-bf9a-3a39bd32c7d6',
    relatedServiceId: 1026,
    title: 'تجديد شهادة تسجيل جهة منح شهادات الحلال​',
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
      url: 'https://eservices.moiat.gov.ae/eservices/renewal-of-registration-of-halal-certification-bodies?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب تجديد شهادة تسجيل جهة منح شهادات الحلال وفقا لقرار مجلس الوزراء رقم 10 لسنة 2014 بشأن النظام الإماراتي للرقابة على المنتجات الحلال. ​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب تجديد شهادة تسجيل جهة منح شهادات الحلال'},
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'استلام شهادة تسجيل جهات منح شهادات الحلال مجددة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول أو ما يعادلها',
          'شهادة اعتماد سارية المفعول',
          'مجال شهادة الاعتماد من جهة اعتماد مقبولة لدى الوزارة',
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'تقديم طلب تجديد التسجيل 800 درهم​'}],
    },
    serviceTime: '10 أيام عمل',
    package: 'الباقة',
    tags: 'الكلمات الدلالية',
    Tags: {},
    faq: {
      items: [
        {
          question: 'كيفية تجديد شهادة جهات منح شهادات الحلال وماهي المتطلبات؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على تجديد تسجيل جهات منح شهادات الحلال',
            'إرفاق الوثائق المطلوبة',
            'مراجعة الطلب',
            'دفع الرسوم',
            'إصدار الشهادة',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول أو ما يعادلها',
            'شهادة اعتماد سارية المفعول مع مجال شهادة الاعتماد من جهة اعتماد مقبولة لدى الوزارة',
            'شهادة تسجيل سارية من قبل الوزارة',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الإعتماد الوطني'},
      serviceSubCategory: {label: 'فئة الخدمة الفرعية', value: 'الحلال'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​\n(جهات منح شهادات الحلال)',
      },
      qrCaption: 'افتح بطاقة الخدمة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال أوقات الدوام الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الويب',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['اعتماد وتعيين هيئات تقييم المطابقة'],
      },
    },
  },
  {
    id: '2291f0ff-fecb-4a4a-8217-c900bdaace98',
    relatedServiceId: 1048,
    title: 'اعتماد جهة تقييم المطابقة',
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
      url: 'https://eservices.moiat.gov.ae/eservices/accreditation-of-conformity-assessment-bodies?lang=ar',
    },
    description: `من خلال هذه الخدمة يمكنك الحصول على اعتراف رسمي بحيادية وكفاءة جهة تقييم المطابقة وفق المواصفة القياسية الدولية ومتطلبات نظام الاعتماد الوطني الإماراتي للقيام بأنشطة محددة في وثيقة مجال الاعتماد.​

 تقدم خدمات الاعتماد في البرامج التالية:​

-  اعتماد مختبرات الفحص حسب المواصفة القياسية الدولية ISO/IEC 17025 .​

-  اعتماد مختبرات المعايرة حسب المواصفة القياسية الدولية ISO/IEC 17025. ​

اعتماد جهات التفتيش وفقاً للمواصفة القياسية الدولية ISO/IEC 17020  ​

اعتماد جهات منح شهادات المطابقة للعمليات، والمنتجات،  والخدمات وفقاً للمواصفة القياسية الدولية ISO/IEC 17065.​

اعتماد جهات منح شهادات المطابقة للحلال حسب المواصفات القياسية ذات العلاقة UAE. S GSO 2055-2, OIC/SMIIC 2​

اعتماد في مجال المختبرات الطبية حسب المواصفة القياسية الدولية ISO 15189.​`,
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'التقدم بطلب للحصول على خدمة اعتماد جهة تقييم المطابقة'},
          {text: 'إرفاق الوثائق المطلوبة وتعبئة الوثائق'},
          {
            text: 'الموافقة على الشروط والأحكام، والسياسات المرتبطة بالاعتماد، وإرفاق نسخة موقعة من الاتفاقية بين نظام الاعتماد الوطني الإماراتي (الوزارة) ومقدم الطلب',
          },
          {text: 'سداد رسوم الطلب'},
          {
            text: 'استلام تقرير التقييم المكتبي وإغلاق حالات عدم المطابقة (إن وجدت)',
          },
          {text: 'المشاركة في تخطيط التقييم الميداني'},
          {text: 'سداد رسوم التقييم الميداني'},
          {
            text: 'استلام تقرير التقييم الميداني وإغلاق حالات عدم المطابقة (إن وجدت) للزيارة الميدانية',
          },
          {text: 'سداد الرسوم والتكاليف الإضافية (إن وجدت)'},
          {
            text: 'استلام شهادة ومجال اعتماد جهات تقييم المطابقة، والحصول على رمز الاعتماد مع الرقم التعريفي لجهة تقييم المطابقة المعتمدة',
          },
          {
            text: 'الالتزام بتنفيذ عمليات تقييم المتابعة اللاحقة حسب الخطة/ سنوياً',
          },
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول',
          'شهادة تسجيل سارية صادرة عن الوزارة (باستثناء المختبرات الطبية وجهات التقييم الأجنبية)',
          'نظام إدارة الجودة والوثائق الفنية ذات العلاقة ببرنامج الاعتماد',
          'النماذج المستوفاة لبرنامج الاعتماد',
          'اتفاقية موقعة بين نظام الاعتماد الوطني (الوزارة) ومقدم الطلب',
          'سداد الرسوم في الوقت المحدد',
        ],
      },
    ],
    documents: [
      {
        label: 'شروط وأحكام نظام الاعتماد الوطني',
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
        {value: '1,000 درهم رسوم تقديم طلب​'},
        {
          value:
            '2,500 درهم رسوم مراجعة أو تقييم كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)​',
        },
        {
          value:
            '3,000 درهم رسوم تقييم جهة تقييم المطابقة (ميداني/ عن بعد) (عن كل مقيم/ عن كل يوم)​',
        },
        {
          value:
            '18,000 درهم رسوم منح الاعتماد لجهة تقييم المطابقة لمدة (3) سنوات​',
        },
        {value: 'المستعجل (غير مفعلة بعد):​'},
        {value: '2,000 درهم رسوم تقديم طلب مستعجل​'},
        {
          value:
            '5,000 درهم رسوم مراجعة أو تقييم مستعجل كتيب ووثائق الجودة (عن كل عملية تقييم/ مراجعة)​',
        },
        {
          value:
            'تتحمل الجهة كافة التكاليف والنفقات المترتبة على عمليات التقييم وتقييم المتابعة اللاحقة، بالإضافة الى نفقات سفر وتنقل وإقامة المقيم من خارج او داخل الدولة ، بالإضافة الى أي تكاليف تطلبها عملية التقييم.​',
        },
      ],
    },

    serviceTime: '135 أيام عمل',
    package: 'الباقة',

    faq: {
      items: [
        {
          question: 'كيفية اعتماد جهات تقييم المطابقة وماهي المتطلبات؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'تقديم الطلب عبر موقع الوزارة',
            'إرفاق كافة الوثائق المطلوبة (رخصة تجارية، شهادة تسجيل، نظام إدارة الجودة والإجراءات)',
            'سداد الرسوم',
            'مراجعة الوثائق والتقييم',
            'زيارة أولية (إن لزم)',
            'تقييم كامل',
            'إغلاق حالات عدم المطابقة (إن وجدت)',
            'إصدار شهادة الاعتماد ومجال الاعتماد (صالحة 3 سنوات)',
            'تنفيذ تقييمات متابعة سنوية',
          ],
          requirements: [
            'رخصة تجارية سارية',
            'شهادة تسجيل سارية من الوزارة (باستثناء المختبرات الطبية والجهات الأجنبية)',
            'نظام إدارة الجودة والإجراءات',
            'اتفاقية موقعة مع ENAS',
            'سداد الرسوم',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الإعتماد الوطني'},
      serviceSubCategory: {label: 'الفئة الفرعية', value: 'الإعتماد'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value:
          'شركات\nالجهات الحكومية\nمثال: جهات تقييم المطابقة: مختبرات الفحص والمعايرة , جهات التفتيش , جهات منح شهادات المطابقة للمنتجات , المختبرات الطبية , جهات منح شهادات الحلال​',
      },
      qrCaption: 'افتح بطاقة الخدمة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'أوقات توفر الخدمة',
        value: 'خلال أوقات الدوام الرسمي',
      },
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستر كارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'متصفح الإنترنت',
        web: 'منصة الخدمات الرقمية - وزارة الصناعة والتكنولوجيا المتقدمة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة تسجيل جهات تقييم المطابقة',
          'خدمة تعيين جهات تقييم المطابقة',
        ],
      },
    },
  },
  {
    id: '17cb33b7-479b-4c65-8de6-ed60fddc5041',
    relatedServiceId: 3,
    title: 'إصدار شهادة تسجيل جهة تقييم المطابقة​',
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
      url: 'https://eservices.moiat.gov.ae/eservices/registration-of-conformity-assessment-bodies?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب إصدار شهادة تسجيل جهة تقييم المطابقة والتي يسمح بموجبها مزاولة نشاط تقييم المطابقة وذلك بعد تلبية الجهة لمجموعة من المتطلبات الفنية.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {
            text: 'تقديم طلب الحصول على خدمة إصدار شهادة تسجيل جهة تقييم المطابقة',
          },
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'تأكيد موعد التقييم'},
          {text: 'إرفاق الوثائق المطلوبة والأدلة'},
          {text: 'استقبال المقيّم'},
          {text: 'إغلاق حالات عدم المطابقة (إن وجدت)'},
          {text: 'استلام شهادة تسجيل جهات تقييم المطابقة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول في دولة الإمارات العربية المتحدة',
          'دليل الجودة والوثائق ذات العلاقة',
          'شهادة ومجال الاعتماد (إن وجد)​',
          'القائمة التفقدية لمتطلبات التسجيل والأدلة الداعمة (بعد الموافقة على الطلب ودفع الرسوم)​',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'تقديم طلب تسجيل 1000 درهم عن كل طلب​'},
        {value: 'تسجيل نشاط تقييم المطابقة لمدة سنه 1000 درهم عن كل تسجيل​'},
        {value: 'القيام بعملية التقييم 3000 درهم عن كل مقيم عن كل يوم​'},
      ],
    },

    serviceTime: '30 يوم عمل',
    faq: {
      items: [
        {
          question: 'كيفية تسجيل جهات تقييم المطابقة وماهي المتطلبات؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة',
            'تقديم طلب تسجيل',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
            'مراجعة الوثائق',
            'القيام بالزيارة الميدانية',
            'الحصول على الشهادة',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول',
            'دليل الجودة والوثائق ذات العلاقة',
            'الحصول على الاعتماد خلال سنة من تاريخ شهادة التسجيل إذا كانت الجهة تزاول أنشطة إلزامية',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الإعتماد الوطني'},
      serviceSubCategory: {label: 'الفئة الفرعية', value: 'التسجيل'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'أوقات توفر الخدمة',
        value: 'خلال أوقات الدوام الرسمي',
      },
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستر كارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'متصفح الإنترنت',
        web: 'منصة الخدمات الرقمية - وزارة الصناعة والتكنولوجيا المتقدمة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة اعتماد جهات تقييم المطابقة',
          'خدمة تعيين جهات تقييم المطابقة',
        ],
      },
    },
  },
  {
    id: '52150bdb-35ab-48cc-9d70-fc5945015815',
    relatedServiceId: 1022,
    title: 'تجديد شهادة تسجيل جهة تقييم المطابقة',
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
      url: 'https://eservices.moiat.gov.ae/eservices/renewal-of-registration-of-conformity-assessment-bodies?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم طلب تجديد شهادة تسجيل جهة تقييم المطابقة الصادرة عن الوزارة لجهة تقييم المطابقة والتي يسمح بموجبها بمتابعة مزاولة نشاط تقييم المطابقة وذلك بعد تلبية الجهة لمجموعة من المتطلبات الفنية.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب تجديد شهادة تسجيل جهة تقييم المطابقة'},
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'تأكيد موعد التقييم في حال كانت الجهة غير حاصلة على الاعتماد'},
          {
            text: 'إرفاق الوثائق المطلوبة والأدلة في حال كانت الجهة غير حاصلة على الاعتماد',
          },
          {text: 'استقبال المقيّم في حال كانت الجهة غير حاصلة على الاعتماد'},
          {text: 'إغلاق حالات عدم المطابقة (إن وجدت)'},
          {text: 'استلام شهادة تسجيل جهات تقييم المطابقة مجددة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة تجارية سارية المفعول في دولة الإمارات العربية المتحدة',
          'دليل الجودة والوثائق ذات العلاقة',
          'شهادة ومجال الاعتماد (إن وجد)​',
          'القائمة التفقدية لمتطلبات التسجيل والأدلة الداعمة (بعد الموافقة على الطلب ودفع الرسوم)​',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'تقديم طلب تسجيل 1000 درهم عن كل طلب​'},
        {value: 'تجديد التسجيل 800 درهم عن كل مره​'},
        {value: 'القيام بعملية التقييم 3000 درهم عن كل مقيم عن كل يوم​'},
      ],
    },
    serviceTime: '30 يوم عمل ',
    faq: {
      items: [
        {
          question: 'كيفية تجديد تسجيل جهات تقييم المطابقة وماهي المتطلبات؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة',
            'تقديم طلب لتجديد التسجيل',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
            'إجراء الزيارة الميدانية',
            'الحصول على الشهادة',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول',
            'دليل الجودة والوثائق ذات العلاقة',
            'شهادة تسجيل سارية المفعول',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الاعتماد الوطني'},
      serviceSubCategory: {label: 'الفئة الفرعية للخدمة', value: 'التسجيل'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات\nالجهات الحكومية​',
      },
      qrCaption: 'افتح هذه البطاقة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال ساعات العمل الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'المتصفح الإلكتروني',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة اعتماد جهات تقييم المطابقة',
          'خدمة تعيين جهات تقييم المطابقة',
        ],
      },
    },
  },
  {
    id: '5fe0c1da-e3b2-4073-8146-352cb4deccf9',
    relatedServiceId: 1023,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'تعديل شهادة تسجيل جهة تقييم المطابقة​',
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
      url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-registration-certificate-of-conformity-assessment-bodies-certificate?lang=ar',
    },
    description:
      ' من خلال هذه الخدمة يمكنك التقدم بطلب تعديل أي من الأنشطة أو البيانات في شهادة تسجيل جهة تقييم المطابقة الصادرة عن الوزارة بعد تقديم جهة تقييم المطابقة كافة الأدلة لتعديل الشهادة.​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {text: 'تقديم طلب تعديل شهادة تسجيل جهة تقييم المطابقة'},
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'استلام شهادة تسجيل جهات تقييم المطابقة محدثة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
`رخصة تجارية سارية في دولة الإمارات العربية المتحدة للجهات الخاصة أو قانون الإنشاء للجهات الحكومية ​

دليل الجودة والوثائق ذات العلاقة​

شهادة تسجيل سارية​`
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'رسوم الطلب 500 درهم عن كل مرة​'}],
    },
    serviceTime: '5 أيام عمل',
    faq: {
      items: [
        {
          question: 'كيفية تعديل نشاط في شهادة تسجيل جهة تقييم مطابقة؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على تعديل نشاط في شهادة تسجيل جهة تقييم مطابقة (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
            'الحصول على الشهادة',
          ],
          requirements: [
            'رخصة تجارية سارية المفعول في دولة الإمارات العربية المتحدة',
            'شهادة تسجيل سارية المفعول',
            'دليل الجودة والوثائق ذات العلاقة',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الاعتماد الوطني'},
      serviceSubCategory: {label: 'الفئة الفرعية للخدمة', value: 'التسجيل'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات\nالجهات الحكومية​',
      },
      qrCaption: 'افتح هذه البطاقة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال ساعات العمل الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'المتصفح',
        web: 'المنصة الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة اعتماد جهات تقييم المطابقة',
          'خدمة تعيين جهات تقييم المطابقة',
        ],
      },
    },
  },
  {
    id: '5fe0c1da-e3b2-4563-8146-352cb4deccf9',
    relatedServiceId: 1030,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'إصدار شهادة تعيين تقييم المطابقة​',
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
      url: 'https://eservices.moiat.gov.ae/eservices/amendment-on-the-registration-certificate-of-conformity-assessment-bodies-certificate?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب إصدار شهادة تعيين جهة تقييم المطابقة، للموافقة على جهة تقييم المطابقة وفقاً  للمتطلبات واللوائح الفنية الصادرة عن الوزارة. وبموجب هذه الشهادة سيُصرَّح لجهة تقييم المطابقة المعتمدة بإصدار شهادات المطابقة وشارات وعلامات المطابقة الوطنية نيابة عن الوزارة وفقاً لمتطلبات قرار مجلس الوزراء رقم 35 لعام 2015​​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'التقدم بطلب تعيين جهات تقييم المطابقة',
          },
          {
            text: 'تعبئة بيانات الطلب وإرفاق الوثائق المطلوبة',
          },
          {
            text: 'الموافقة على الشروط والأحكام',
          },
          {
            text: 'دفع رسوم الخدمة',
          },
          {
            text: 'الحصول على شهادة إلكترونية معتمدة',
          },
        ],
      },
      {
        Requirements: [
          'رخصة تجارية سارية في دولة الإمارات العربية المتحدة',
          'شهادة تسجيل صادرة من الوزارة سارية المفعول',
          'شهادة اعتماد سارية صادرة عن جهات اعتماد وطنية للمجال الذي تقدمه جهة تقييم المطابقة',
          'وثيقة تغطية تأمين رسمية ضد المسؤولية يكون فيها الحد الأدنى للتغطية مبلغ 3,000,000 درهم (ثلاثة ملايين درهم) صادرة عن إحدى شركات التأمين العاملة في الدولة',
          'التقرير المالي للجهة شامل أنشطة تقييم المطابقة',
          'كتيب وثائق الجودة والوثائق المستخدمة لقوائم التحقق',
          'قائمة الجهات المعتمدة لدى مقدم الطلب للتعاقد في الباطن مع وصف لمجال التعاقد',
          'قائمة بأسماء جميع الموظفين (عقود دائمة وغير دائمة، عقود خارجية) مع وثيقة واجبات ومسؤوليات الموظفين العاملين في مجال التعيين المقدم مع الطلب',
        ],
      },
    ],

    serviceFees: {
      Fees: [{value: `طلب تعيين جهة تقييم المطابقة: 1000 درهم عن كل طلب​

إصدار شهادة تعيين جهة تقييم مطابقة: 15,000 درهم​

مراجعة كتيب وثائق الجودة: 2,500 درهم عن كل عملية تقييم​`}],
    },
    serviceTime: '15 يوم عمل',

    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الاعتماد الوطني'},
      serviceSubCategory: {label: 'الفئة الفرعية للخدمة', value: 'التسجيل'},
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات\nالجهات الحكومية​',
      },
      qrCaption: 'افتح هذه البطاقة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال ساعات العمل الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'المتصفح',
        web: 'المنصة الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: [
          'خدمة اعتماد جهات تقييم المطابقة',
          'خدمة تعيين جهات تقييم المطابقة',
        ],
      },
    },
  },
  {
    id: '4f1dbda2-016a-4562-bda7-bdc26a81dec9',
    relatedServiceId: 2,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'إصدار شهادة عدم ممانعة لترخيص جهات تقييم المطابقة',
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
      url: 'https://eservices.moiat.gov.ae/eservices/issue-a-non-objection-certificate?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب إصدار شهادة عدم ممانعة عن الوزارة لجهات تقييم المطابقة بهدف استكمال إصدار الرخصة التجارية. ​',
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية للوزارة',
            url: 'https://sso.moiat.gov.ae/',
          },
          {text: 'تقديم طلب للحصول على إصدار شهادة عدم ممانعة'},
          {text: 'إرفاق الوثائق المطلوبة'},
          {text: 'دفع الرسوم'},
          {text: 'استلام شهادة عدم ممانعة لترخيص جهات تقييم المطابقة'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          ' تعهد إلكتروني بالحصول على شهادة تسجيل خلال ستة أشهر من صدور شهادة عدم الممانعة​',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {value: 'رسوم شهادة عدم الممانعة 300 درهم​​'},
        {
          value: 'تقديم طلب تسجيل 1000 درهم عن كل طلب​​',
        },
        {
          value: 'تسجيل نشاط تقييم المطابقة لمدة سنه 1000 درهم عن كل تسجيل​​',
        },
        {
          value: 'القيام بعملية التقييم 3000 درهم عن كل مقيم عن كل يوم​​',
        },
      ],
    },
    serviceTime: 'فوري',
    faq: {
      items: [
        {
          question: 'كيفية إصدار شهادة عدم ممانعة؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار شهادة عدم ممانعة (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: [
            'تعهد إلكتروني بالحصول على شهادة تسجيل خلال ستة أشهر من صدور شهادة عدم الممانعة',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الاعتماد الوطني'},
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'التسجيل المبدئي',
      },
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات, الجهات الحكومية',
      },
      qrCaption: 'افتح هذه البطاقة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال ساعات العمل الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'المتصفح',
        web: 'المنصة الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['خدمة تسجيل جهات تقييم المطابقة'],
      },
    },
  },
  {
    id: '4f1dbda2-016a-4567-bda7-bdc26a81dec9',
    relatedServiceId: 2,
    Category_Id: 'cb061eb9-819c-4125-aa12-b6d8be3aaf91',
    title: 'تمديد صلاحية شهادة عدم ممانعة لترخيص جهات تقييم المطابقة​',
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
      url: 'https://eservices.moiat.gov.ae/eservices/issue-a-non-objection-certificate?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب تمديد صلاحية شهادة عدم ممانعة  لترخيص جهات تقييم المطابقة بهدف استكمال الجهة لمتطلبات تسجيل جهات تقييم المطابقة.​​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب تمديد صلاحية شهادة عدم ممانعة لترخيص جهات تقييم المطابقة',
          },
          {
            text: 'إرفاق الوثائق المطلوبة',
          },
          {
            text: 'استلام شهادة عدم ممانعة لترخيص جهات تقييم المطابقة',
          },
        ],
      },
      {
        Requirements: [
          'رسالة من الإدارة العليا للجهة لطلب تمديد مدة شهادة عدم الممانعة',
          'شهادة عدم ممانعة سارية',
        ],
      },
    ],

    serviceTime: '3 أيام عمل​',
    faq: {
      items: [
        {
          question: 'كيفية إصدار شهادة عدم ممانعة؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار شهادة عدم ممانعة (moiat.gov.ae)',
            'إرفاق الوثائق المطلوبة',
            'دفع الرسوم',
          ],
          requirements: [
            'تعهد إلكتروني بالحصول على شهادة تسجيل خلال ستة أشهر من صدور شهادة عدم الممانعة',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الاعتماد الوطني'},
      serviceSubCategory: {
        label: 'الفئة الفرعية للخدمة',
        value: 'التسجيل المبدئي',
      },
      serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات, الجهات الحكومية',
      },
      qrCaption: 'افتح هذه البطاقة على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: 'خلال ساعات العمل الرسمية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات تقديم الخدمة',
        browser: 'المتصفح',
        web: 'المنصة الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'جوجل بلاي',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'آبل ستور',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['خدمة تسجيل جهات تقييم المطابقة'],
      },
    },
  },
  // {
  //   id: 'fa284c5e-8c7a-3333-a2b1-bcf13ca89373',
  //   relatedServiceId: 1030,
  //   title: 'تعيين جهات تقييم المطابقة',
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
  //     url: 'https://eservices.moiat.gov.ae/eservices/notification-of-conformity-assessment-bodies?lang=ar',
  //   },
  //   description:
  //     'خدمة التعيين هي عملية الموافقة على جهة تقييم المطابقة وفقًا للمتطلبات واللوائح الفنية الصادرة عن الوزارة، والتي سيُصرَّح لها بإصدار شهادات وشارات المطابقة نيابة عن الوزارة وفقًا لمتطلبات قرار مجلس الوزراء رقم 35 لعام 2015.',
  //   sections: [
  //     {
  //       label: 'إجراءات الخدمة',
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //         },
  //         {text: 'التقديم على الخدمة تعيين جهات تقييم المطابقة'},
  //         {text: 'إرفاق الوثائق المطلوبة'},
  //         {text: 'دفع الرسوم'},
  //         {text: 'مراجعة الوثائق'},
  //         {text: 'القيام بعملية التقييم'},
  //         {text: 'الحصول على الشهادة'},
  //       ],
  //     },
  //     {
  //       label: 'المتطلبات',
  //       Requirements: [
  //         'رخصة تجارية سارية المفعول في دولة الامارات العربية المتحدة',
  //         'توفير مركز سعادة للمتعاملين حسب متطلبات نظام النجوم العالمي',
  //         'توقيع الاتفاقية بين الوزارة ومقدم الطلب من قبل الإدارة العليا',
  //         'شهادة تسجيل صادرة من الوزارة سارية المفعول',
  //         'شهادة اعتماد سارية المفعول صادرة عن ENAS أو أي جهة اعتماد مقبولة لدى الوزارة للمجال المقدم',
  //         'دليل الجودة والإجراءات، بما في ذلك إجراءات التقييم وإجراءات أنظمة تقييم المطابقة',
  //         'سياسة الاستقلالية وعدم التحيز معتمدة من الإدارة العليا',
  //         'وصف استقلالية جهة تقييم المطابقة عن السلطة المعنية (خصوصاً إذا كانت الجهة المتقدمة هيئة عامة)',
  //         'وثيقة تأمين ضد المسؤولية بقيمة لا تقل عن 3,000,000 درهم صادرة عن شركة تأمين داخل الدولة',
  //         'قائمة بأسماء الموظفين مع وثيقة الواجبات والمسؤوليات',
  //         'وصف قدرات جهات التفتيش وجهات منح الشهادات للأنظمة المعتمدة',
  //         'وثائق تثبت الكفاءات الأساسية الكافية لتقييم واختيار والتحقق من الجهات المتعاقد معها بالباطن',
  //         'قائمة بالجهات المعتمدة للتعاقد بالباطن مع وصف مجال التعاقد',
  //         'الوثائق المستخدمة لقوائم التحقق',
  //         'تفاصيل كافة الأنشطة المرخصة والمنفذة في الإمارات غير مذكورة في المجال المقدم',
  //         'تفاصيل المختبرات المعتمدة ومرافق الفحص المملوكة للجهة',
  //         'وثيقة التعامل بعدالة ومساواة مع المتعاملين معتمدة من الإدارة العليا',
  //         'مصفوفة ومعايير المؤهلات',
  //       ],
  //     },
  //     {
  //       label: 'أدلة المستخدم',
  //       links: [
  //         {
  //           text: 'دليل المستخدم - عربي',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/user-guide---ar---notification-of-cab.ashx',
  //         },
  //         {
  //           text: 'دليل المستخدم - إنجليزي',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/user-guide---en---notification-of-cab.ashx',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: {
  //     serviceFees: 'الإجمالي 21,500 - 24,500 درهم',
  //     price:
  //       '1000 درهم (طلب) + 2500 درهم (تقييم كتيب الجودة) + 3000 درهم (تقييم لكل مقيم/يوم) + 15000 درهم (إصدار شهادة التعيين)',
  //   },
  //   serviceTime: '50 يوم عمل',
  //   faq: {
  //     items: [
  //       {
  //         question: 'كيفية تعيين جهات تقييم المطابقة وماهي المتطلبات؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         answers: [
  //           'الدخول إلى المنصة الرقمية لخدمات الوزارة',
  //           'تقديم طلب تعيين جهات تقييم المطابقة',
  //           'إرفاق الوثائق المطلوبة',
  //           'دفع الرسوم',
  //           'مراجعة الوثائق',
  //           'إجراء الزيارة الميدانية',
  //           'الحصول على الشهادة',
  //         ],
  //         requirements: [
  //           'رخصة تجارية سارية المفعول',
  //           'توفير مركز سعادة للمتعاملين',
  //           'توقيع الاتفاقية مع الوزارة',
  //           'شهادة تسجيل سارية المفعول',
  //           'شهادة اعتماد سارية المفعول صادرة عن ENAS أو جهة معتمدة',
  //           'دليل الجودة والإجراءات',
  //           'سياسة الاستقلالية وعدم التحيز',
  //           'وثيقة تأمين ضد المسؤولية (3,000,000 درهم)',
  //           'قائمة الموظفين مع وثيقة المسؤوليات',
  //           'وصف قدرات التفتيش ومنح الشهادات',
  //           'وثائق الكفاءات الأساسية',
  //           'قائمة الجهات المتعاقد معها بالباطن',
  //           'قوائم التحقق',
  //           'تفاصيل الأنشطة المرخصة الأخرى',
  //           'تفاصيل المختبرات ومرافق الفحص',
  //           'سياسة المساواة والعدالة مع المتعاملين',
  //           'مصفوفة ومعايير المؤهلات',
  //         ],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'نظرة عامة على الخدمة',
  //     serviceCategory: {label: 'فئة الخدمة', value: 'خدمات الإعتماد الوطني'},
  //     serviceSubCategory: {label: 'فئة الخدمة الفرعية', value: 'التعيين'},
  //     serviceType: {label: 'نوع الخدمة', value: 'إجرائية'},
  //     targetAudience: {
  //       label: 'الجمهور المستهدف',
  //       value: 'المؤسسات الصناعية\nالجهات الحكومية​',
  //     },
  //     qrCaption: 'افتح بطاقة الخدمة هذه على هاتفك أو جهازك اللوحي.',
  //   },
  //   serviceInfo: {
  //     title: 'معلومات الخدمة',
  //     availability: {label: 'توفر الخدمة', value: 'خلال أوقات العمل الرسمية'},
  //     paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
  //     serviceChannels: {
  //       label: 'قنوات الخدمة',
  //       browser: 'المتصفح',
  //       web: 'المنصة الرقمية لوزارة الصناعة والتكنولوجيا المتقدمة',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'جوجل بلاي',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'آبل ستور',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'أهداف التنمية المستدامة',
  //       values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصادي'],
  //     },
  //     serviceLinks: {
  //       label: 'ترابط الخدمة',
  //       value: [
  //         'خدمة تسجيل جهات تقييم المطابقة',
  //         'خدمة اعتماد جهات تقييم المطابقة',
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
    title: 'شراء مواصفة قياسية إماراتية​',
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
    startButton: {
      url: 'https://eservices.moiat.gov.ae/eservices/selling-standards?lang=ar',
    },
    description:
      'من خلال هذه الخدمة يمكنك التقدم  بطلب شراء على  المواصفات القياسية الإماراتية، بهدف الاطلاع على أحدث المواصفات والمتطلبات لتعزيز تنافسية المنتجات الوطنية والالتزام بمتطلبات الصحة والسلامة للمنتجات من خلال تطبيق هذه المواصفات. ​',
    userManual: {
      url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/purchase-standards-user-manual.ashx',
      title: 'دليل شراء المواصفات',
    },
    sections: [
      {
        label: 'إجراءات الخدمة',
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae) ​',
            url: 'https://sso.moiat.gov.ae/',
          },
          {text: 'تقديم طلب الحصول على المواصفات القياسية الإماراتية​'},
          {text: ' تحديد المواصفات المطلوبة وإضافتها  إلى عربة التسوق​'},
          {text: 'إضافة المواصفة المحددة إلى عربة التسوق'},
          {text: 'دفع الرسوم'},
          {text: 'تنزيل المواصفة المطلوبة بصيغة PDF'},
        ],
      },
      {
        label: 'أدلة المستخدم',
        links: [
          {
            text: 'دليل شراء المواصفات',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/purchase-standards-user-manual.ashx',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: 'بحسب عدد صفحات المواصفة ​',
    },
    serviceTime: 'خدمة فورية',
    faq: {
      items: [
        {
          question: 'كيفية شراء مواصفة قياسية؟',
          proceduresTitle: 'إجراءات الخدمة',
          answers: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة',
            'تقديم طلب للحصول على بيع المواصفات القياسية',
            'تحديد المواصفات المطلوبة',
            'إضافة المواصفة المحددة إلى عربة التسوق',
            'دفع الرسوم',
            'تنزيل المواصفة المطلوبة بصيغة PDF',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {label: 'فئة الخدمة', value: 'خدمات المواصفات'},
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'المواصفات القياسية',
      },
      serviceType: {label: 'نوع الخدمة', value: 'تجارية / إجرائية'},
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات، أفراد,الجهات  الحكومية',
      },
      qrCaption: 'افتح بطاقة الخدمة هذه على هاتفك أو جهازك اللوحي.',
    },
    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {label: 'توفر الخدمة', value: '24/7 خدمة فورية'},
      paymentChannels: {label: 'قنوات الدفع', values: ['فيزا', 'ماستركارد']},
      serviceChannels: {
        label: 'قنوات الخدمة',
        browser: 'متصفح الإنترنت',
        web: 'المنصة الرقمية لخدمات الوزارة',
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
        label: 'أهداف التنمية المستدامة',
        values: ['الصحة الجيدة والرفاه', 'العمل اللائق والنمو الاقتصاد'],
      },
      serviceLinks: {
        label: 'ترابط الخدمة',
        value: ['تسجيل جهات تقييم المطابقة'],
      },
    },
  },
  {
    id: 'a0606a66-0d58-45e4-97fc-6524fc71dce0',
    relatedServiceId: 17,
    Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
    type: 'il',
    title: 'وقف/ إلغاء تصريح إنتاج صناعي',
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
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/ar/IndustrialLicenseCancellation',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب وقف تصريح إنتاج صناعي لفترة مؤقتة بعد بيان أسباب الوقف، وذلك في حال حدوث تغيرات أو تعديلات على المنشأة تؤدي إلى وقف أحقية المنشأة من التمتع بمزايا تصريح الإنتاج الصناعي لفترة مؤقتة.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة  (moiat.gov.ae)',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب وقف تصريح إنتاج صناعي​',
          },
          {text: 'إرفاق المرفقات المطلوبة'},
          {
            text: 'دفع الرسوم',
          },
          {
            text: 'استلام تأكيد إيقاف تصريح الإنتاج الصناعي​',
          },
        ],
      },
      {
        Requirements: [
          'خطاب رسمي من المنشأة الصناعية فيه بيان أسباب طلب الوقف​',
        ],
      },
      {
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع فلتر',
        },
        filesList: [
          {
            name: 'UserManual - Cancel industrial production license',
            size: '570 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---cancel-industrial-production-license.ashx',
          },
        ],
      },
    ],
    serviceFees: '0 درهم​',
    FeesAmount: 'مجانية',

    aed0: 'AED 0',
    note: 'ملاحظة رسوم الخدمة',

    serviceTime: 'يومي عمل',
    packageTitle: 'الباقة',
    none: 'لا يوجد',

    faq: {
      name: 'الأسئلة الشائعة',
      items: [
        {
          question: 'س) ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          procedures: [
            'ج) عن طريق الموقع الالكتروني و إرفاق رسالة رسمية من المنشأة بالإلغاء وصورة من الرخصة الصادرة من الجهة المحلية',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
    },

    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
      },
    },

    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },

    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  {
    id: 'a0606a66-0d58-45e4-97fc-6543fc71dce0',
    relatedServiceId: false,
    Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
    type: 'il',
    title: 'إعادة تفعيل تصريح إنتاج صناعي​',
    generalDocument: {
      title: 'المستندات العامة',
      description:
        'من خلال هذه الخدمة يمكن للمنشأة الصناعية إعادة تفعيل تصريح إنتاج صناعي بناءً على طلب مالك المنشأة الصناعية لرفع الوقف عن المنشأة الصناعية نتيجة تصحيح أو إزالة المسببات التي أدت إلى وقف التصريح.​',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/ar/IndustrialLicenseCancellation',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكن للمنشأة الصناعية إعادة تفعيل تصريح إنتاج صناعي بناءً على طلب مالك المنشأة الصناعية لرفع الوقف عن المنشأة الصناعية نتيجة تصحيح أو إزالة المسببات التي أدت إلى وقف التصريح.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae) ​',
            url: 'https://moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب إعادة تفعيل تصريح إنتاج صناعي',
          },
          {
            text: 'إرفاق المرفقات المطلوبة',
          },
          {
            text: 'دفع رسوم الطلب',
          },
          {
            text: 'دفع رسوم التفتيش',
          },
          {
            text: 'استقبال المفتش',
          },
          {
            text: 'استلام تصريح إنتاج صناعي معاد تفعيله',
          },
        ],
      },
      {
        Requirements: [
          'خطاب رسمي من المنشأة الصناعية فيه بيان أسباب طلب التفعيل',
        ],
      },
    ],

    serviceFees: '0 درهم​',
    FeesAmount: 'مجانية',

    aed0: 'AED 0',
    note: 'ملاحظة رسوم الخدمة',

    serviceTime: 'يومي عمل',
    packageTitle: 'الباقة',
    none: 'لا يوجد',

    faq: {
      name: 'الأسئلة الشائعة',
      items: [
        {
          question: 'س) ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          procedures: [
            'ج) عن طريق الموقع الالكتروني و إرفاق رسالة رسمية من المنشأة بالإلغاء وصورة من الرخصة الصادرة من الجهة المحلية',
          ],
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
    },

    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
      },
    },

    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },

    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  {
    id: '53d94393-4c32-46be-a9d5-a5c57515df31',
    relatedServiceId: 13,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'الموافقة على إعفاء آلات، معدات، ومواد أولية من الرسوم الجمركية',
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
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/ar/NewRawMaterial',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب الموافقة على إعفاء الآلات، والمعدات، أو المواد الأولية المسجلة مسبقاً في نظام الوزارة من الرسوم الجمركية.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae) ​',
            url: 'https://sso.moiat.gov.ae/',
            screem: '',
          },
          {
            text: ' تقديم طلب الموافقة على إعفاء آلات، معدات,، ومواد أولية من الرسوم الجمركية​',
          },
          {
            text: ' ارفاق فاتورة مصدقة من وزارة الخارجية أو التصديق من خلال موقع وزارة الصناعة والتكنولوجيا المتقدمة.​',
          },
          {text: 'دفع الرسوم'},
          {
            text: 'استلام موافقة رقمية من الوزارة على إعفاء الآلات، المعدات والمواد من الرسوم الجمركية​',
          },
        ],
      },
      {
        Requirements: [
          'الفواتير المصدّقة وتتضمن الـ (H.S Code) للمواد المطلوب استيرادها​',
          'بوليصة الشحن',
          'قائمة المواد​',
          'شهادة المنشأ',
        ],
      },
      {
        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع فلتر',
        },
        filesList: [
          {
            title: 'استمارة تقديم',
            name: 'Request Customs Duty Exemption for Industrial Inputs',
            size: '212 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/request-customs-duty-exemption-for-industrial-inputs.ashx',
          },
          {
            name: 'UserManual - Request Registration of Industrial Input for Customs Duty Exemption',
            size: '691 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---request-customs-duty-exemption-for-industrial-inputs.ashx',
          },
        ],
      },
    ],
    serviceFees: {
      serviceFees: ' 50 درهم عن كل طلب رقم منسق جمركي (HS Code) ​',
      aed100: 'AED 100',
      hscodeRequestFee: 'رسوم عن كل طلب رقم منسق',
      aed0: 'AED 0',
      note: 'ملاحظة رسوم الخدمة',
    },

    serviceTime: 'يوم عمل​',
    package: 'الباقة',
    dutyExempotionPachage: [
      {
        documentText: 'باقة الاعفاء الجمركي',
        url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/dutyexceptionpakcages.ashx',
        screen: '',
      },
    ],
    Tags: {
      documentText: 'خدمة متصلة بالجمارك',
      url: '',
      screen: 'Services',
    },
    faq: {
      name: 'الأسئلة الشائعة',
      items: [
        {
          question: 'ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على طلب تسجيل مادة للإعفاء الجمركي (moiat.gov.ae)',
            'دفع الرسوم',
            'دراسة الطلب من قبل الموظف المختص',
            'في حال الموافقة تضاف المادة والكمية في رصيد المصنع',
            'في حال رفض الطلب لا تضاف المادة ولا الكمية في رصيد المصنع',
            'تحويل الطلب للتفتيش في حال وجود آلات أو معدات و في حال وجود كميات كبيرة في المواد الأولية',
            'دفع رسوم التفتيش',
            'زيارة المنشأة وكتابة التقرير',
            'تضاف المواد في حال الموافقة على تقرير التفتيش',
            'يرفض الطلب في حال عدم الموافقة',
            'في حال الخطأ في بيانات الطلب يتحمل المتعامل المسؤولية ولا يمكن استرجاع المبلغ المدفوع',
          ],
          requirements: [
            'رخصة الإنتاج الصناعي',
            'الفواتير المصدقة (التصديق هي خدمة مرتبطة بوزارة الخارجية والتعاون الدولي (MOFAIC))',
            'بوليصة الشحن',
            'قائمة التعبئة',
            'شهادة المنشأ',
          ],
        },
        {
          question: 'كيفية إضافة HS code غير موجود في النظام',
          answers: 'يتم تحويله إلى الفريق المعني',
        },
        {
          question: 'هل يمكن الحصول على الخدمة بدون رخصة إنتاج صناعي',
          answers: 'ل',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
    },

    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
        value: 'سلطات الجمارك المحلية',
      },
    },
    tutorialVideo: {
      url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
    },
    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'الخدمات ذات الصلة',
      services: [
        {
          title: 'طلب زيادة كمية لمادة مسجلة للإعفاء الجمركي',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title: 'طلب زيادة كمية لمادة مسجلة للإعفاء الجمركي',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title: 'إصدار شهادة الأفضلية السعرية',
          url: 'https://moiat.gov.ae/services/issue-preferential-price-certificate',
        },
        {
          title: 'شهادة القيمة المضافة طبقاً لقواعد المنشأ العربية',
          url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
        },
        {
          title: 'إلغاء رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'تعديل بيانات رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  {
    id: '24f7abf8-c668-4c4d-b9ae-96451085093a',
    relatedServiceId: 25,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'الموافقة على إعفاء جمركي- المسار السريع',
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
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/ar/NewRawMaterial',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'هي خدمة تمكن المتعامل من التقديم على طلب إعفاء جمركي فوري في حال كانت الزيادة المطلوبة لا تتجاوز 30% من الكمية المسجلة مسبقاً من مواد مدخلات الإنتاج للعمليات الصناعية وفق المدة الزمنية المحددة.​',
    note: 'ملاحظة: الخدمة تمكن المتعامل من تصديق الفواتير من وزارة الخارجية وفق عملية الربط الرقمي التي تم إنجازها مع خدمات الوزارة دون الحاجة لزيارة موقع خدمات وزارة الخارجية',
    sections: [
      {
        serviceProcedures: [
          'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة: - SSO (moiat.gov.ae)​',
          'تقديم طلب إعفاء جمركي – المسار السريع',
          ,
          'تحميل الوثائق المطلوبة',
          'دفع الرسوم',
          'التقديم على خدمة الإعفاء الجمركي لسلطة الجمارك المحلية المعنية',
          'الموافقة أو رفض الإعفاء بناءً على تقرير موظفي سلطات الجمارك المحلية.',
        ],
        note: 'ملاحظة: في حال كانت الزيادة المطلوبة تتجاوز 30% من الكمية المسجلة مسبقاً لن يتمكن المتعامل من التقديم على الخدمة وسيتم توجيهه إلى خدمة طلب زيادة كمية لمادة مسجلة',
      },
      {
        Requirements: ['قائمة التعبئة', 'بوليصة الشحن', 'شهادة المنشأ'],
        note: 'ملاحظة: * متطلب إلزامي',
      },
      {
        id: 3,
        label: 'ملفات',

        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع فلتر',
        },
        filesList: [
          {
            title: 'استمارة تقديم',
            name: 'Request Customs Duty Exemption for Industrial Inputs',
            size: '212 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/request-customs-duty-exemption-for-industrial-inputs.ashx',
          },
          {
            name: 'UserManual - Request Registration of Industrial Input for Customs Duty Exemption',
            size: '691 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---request-customs-duty-exemption-for-industrial-inputs.ashx',
          },
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {
          value:
            'رسم زيادة كمية لمدخل إنتاج صناعي مسجل برمز النظام المنسق  : 50 درهم​',
        },
        {
          value:
            'رسم الإعفاء من الرسوم الجمركية لكل طلب بحسب رمز النظام المنسق : 50 درهم​',
        },
        {
          value:
            'رسم تصديق الوثائق (وفق رسوم وزارة الخارجية) في حال لم تكن مصدقة: 150رهم​ ',
        },
      ],
    },

    serviceTime: 'فورية',
    provisionTimes: 'اوقات تقديم الخدمة',
    packageTitle: 'الباقة',
    package: [
      'باقة الاعفاء الجمركي',
      'خدمة طلب زيادة كمية لمادة مسجّلة للإعفاء الجمركي (MoIAT)',
      'خدمة طلب إعفاء مواد وآلات من الرسوم الجمركية (MoIAT)',
      'تصديق الوثائق (MoF)',
      'سلطات الجمارك المحلية',
    ],

    faq: {
      name: 'الأسئلة الشائعة',
      items: [
        {
          question: 'ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على طلب إعفاء مدخلات الصناعة من الرسوم الجمركية (آلات، معدات و مواد أولية) (moiat.gov.ae)',
            'دفع الرسوم',
            // 'دراسة الطلب من قبل الموظف المختص',
            // 'في حال الموافقة تضاف المادة والكمية في رصيد المصنع',
            // 'في حال رفض الطلب لا تضاف المادة ولا الكمية في رصيد المصنع',
            // 'تحويل الطلب للتفتيش في حال وجود آلات أو معدات و في حال وجود كميات كبيرة في المواد الأولية',
            // 'دفع رسوم التفتيش',
            // 'زيارة المنشأة وكتابة التقرير',
            // 'تضاف المواد في حال الموافقة على تقرير التفتيش',
            // 'يرفض الطلب في حال عدم الموافقة',
            // 'في حال الخطأ في بيانات الطلب يتحمل المتعامل المسؤولية ولا يمكن استرجاع المبلغ المدفوع',
          ],
          requirements: [
            'رخصة الإنتاج الصناعي أو الموافقة المبدئية للآلات',
            'بوليصة الشحن',
            'قائمة التعبئة',
            'شهادة المنشأ',
            'الفاتورة (يجب أن تكون الفاتورة مصدقة من وزارة الخارجية والتعاون الدولي أو يستطيع المتعامل التصديق مباشرةً من خلال إجراءات الخدمة ( التصديق هي خدمة مرتبطة بوزارة الخارجية والتعاون الدولي (MOFAIC)',
          ],
        },
        {
          question: 'كيفية إضافة HS code غير موجود في النظام',
          answers: 'يتم تحويله إلى الفريق المعني',
        },
        {
          question: 'هل يمكن الحصول على الخدمة بدون رخصة إنتاج صناعي',
          answers: 'ل',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
    },

    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
        value: [
          'إصدار شهادة سجل قيد صناعي',
          'إصدار /تجديد تصريح إنتاج صناعي',
          'طلب تسجيل مادة للإعفاء الجمركي',
          'تصديق الوثائق من وزارة الخارجية',
          'سلطات الجمارك المحلية',
        ],
      },
    },
    tutorialVideo: {
      url: 'https://www.youtube.com/embed/PIka5QidANk?autoplay=1',
    },
    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'الخدمات ذات الصلة',
      services: [
        {
          title: 'طلب زيادة كمية لمادة مسجلة للإعفاء الجمركي',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title: 'طلب زيادة كمية لمادة مسجلة للإعفاء الجمركي',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },
        {
          title: 'إصدار شهادة الأفضلية السعرية',
          url: 'https://moiat.gov.ae/services/issue-preferential-price-certificate',
        },
        {
          title: 'شهادة القيمة المضافة طبقاً لقواعد المنشأ العربية',
          url: 'https://moiat.gov.ae/services/issue-value-added-certificate',
        },
        {
          title: 'إلغاء رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'تعديل بيانات رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  {
    id: '24ba748e-6217-464f-b60e-9c450df28efa',
    relatedServiceId: 10,
    type: 'il',
    title: 'إصدار تصريح إنتاج صناعي​',
    Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
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
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/ar/IndustrialLicenseRegistration?addFactory=True',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب للحصول على تصريح الإنتاج الصناعي للمنشآت الصناعية التي تنطبق عليها شروط التصريح الصناعي. حيث يمكنك هذا التصريح من التقديم للحصول على إعفاءات من الرسوم الجمركية المفروضة على استيراد الآلات والمعدات وقطع غيارها وأي مواد أخرى تدخل في عملية التصنيع بشكل مباشر. كما يُمَكنك الحصول على مزايا وخدمات أخرى تقدمها الوزارة.',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب للحصول على إصدار رخصة إنتاج صناعي',
          },
          {text: 'إرفاق المرفقات المطلوبة'},
          {
            text: 'دفع رسوم التفتيش​',
          },
          {
            text: 'استقبال مفتش الوزارة',
          },
          {
            text: 'استلام نسخة رقمية من تصريح الإنتاج الصناعي​',
          },
        ],
      },
      {
        Requirements: [
          'رخصة صناعية محلية ',
          'عقد الشراكة',
          'عقد التأسيس',
          'الوثاق الثبوتية للمالك أو المدير حسب الشكل القانوني للمنشاة',
        ],
      },
      {
        id: 3,
        label: 'ملفات',

        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع فلتر',
        },
        filesList: [
          {
            title: 'استمارة تقديم',
            name: 'Issue Industrial Production License',
            size: '305 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-industrial-production-license.ashx',
          },
          {
            name: 'UserManual - Issue Industrial Production License',
            size: '757 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---issue-industrial-production-license.ashx',
          },
        ],
      },
    ],
    serviceFees: '0 درهم لتقديم الطلب​ \n 100 درهم للتفتيش ( إن لزم)​',
    FeesAmount: 'لا يوجد / مجانية - رسوم التفتيش 100 درهم.',
    aed0: 'AED 0',
    note: 'ملاحظة رسوم الخدمة',

    serviceTime: '5 أيام عمل',
    packageTitle: 'الباقة',
    none: 'لا يوجد',
    uaePass: {
      title: 'الختم الرقمي',
      items: [
        'تستخدم هذه الخدمة خاصية الختم الرقمي من الهوية الرقمية لضمان مصدر الوثيقة.',
        'قم بزيارة الرابط التالي لتتأكد من مصدر الوثيقة المختومة إلكترونياً: https://selfcare.uaepass.ae/',
      ],
    },
    moIATlBockchain: {
      title: 'بلوكشين وزارة الصناعة والتكنولوجيا المتقدمة',
      items: [
        'هذه الخدمة تستخدم تكنولوجيا البلوكشين التي تزيد من ثقة المتعامل في خدمات الوزارة.',
        'قم بمسح رمز الإستجابة السريع وحمل الوثيقة الرقمية إلى الموقع لتتحقق من صلاحية الوثيقة.',
      ],
    },

    faq: {
      name: 'الأسئلة الشائعة',
      items: [
        {
          question: 'س) ما هي متطلبات الخدمة وكيفية التقديم عليها',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار رخصة إنتاج صناعي (moiat.gov.ae)',
            'دراسة الطلب من قبل الموظف المختص',
            'دفع رسوم التفتيش في حال انطباق الشروط',
            'التفتيش على المنشأة وكتابة تقرير التفتيش',
            'إصدار الرخصة في حال الموافقة على تقرير التفتيش',
            'إصدار الرخصة في حال الموافقة على تقرير التفتيش',
          ],
          requirements: [
            'عقد تأسيس الشركة بما فيها شركات الشخص الواحد (باستثناء المؤسسات الفردية)',
            'لا يقل عدد الموظفين عن 10 موظفين',
            'لا يقل إجمالي رأس المال عن 250,000 درهم',
            'الحصول على رخصة صناعية من إحدى دوائر الترخيص المحلي',
          ],
        },
        {
          question: 'س) ما الفترة الزمنية لاستخراج الرخصة؟',
          answers: 'خلال 5 يوم عمل',
        },
        {
          question: 'س) كيفية إضافة نشاط غير موجود في الأنشطة على النظام؟',
          answers:
            'ج) توجيه المتعامل لإرسال بريد إلكتروني لفريق الدعم الفني في الوزارة',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
    },

    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
        value: ['جهات التراخيص المحلية'],
      },
    },
    tutorialVideo: {
      url: 'https://youtu.be/h-T9sat-9Sg',
    },
    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'الخدمات ذات الصلة',
      services: [
        {
          title: 'تجديد رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/renew-industrial-production-license',
        },
        {
          title: 'تعديل بيانات رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
        {
          title: 'إلغاء رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'تجديد شهادة الموافقة المبدئية',
          url: 'https://moiat.gov.ae/services/renew-initial-approval-certificate-unpublished',
        },
      ],
    },
    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  // {
  //   id: '6bea6add-a5c1-452b-84b2-1f8905d43a39',
  //   title: 'إصدار شهادة الأفضلية السعرية',

  //   relatedServiceId: false,
  //   Category_Id: 'd5685023-9f9c-450a-a9c3-415af1c6c144',
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
  //     title: 'ابدأ الخدمة',
  //     url: 'https://il.moiat.gov.ae/ar/PricePreference',
  //   },
  //   aboutService: 'حول هذه الخدمة',
  //   description:
  //     'يستفيد من هذه الخدمة المصانع الحاصلة على شهادة ترخيص صناعي ، حيث تعطي هذه الشهادة لمنتجات المصانع الوطنية الأولوية عند التقدم لمناقصات المشتريات في وزارة المالية أو دوائر المالية المحلية .',
  //   sections: [
  //     {
  //       serviceProcedures: [
  //         {
  //           text: 'إنشاء حساب أو تسجيل الدخول إلى المنصة الرقمية لخدمات الوزارة',
  //           url: 'https://sso.moiat.gov.ae/',
  //           screen: '',
  //         },
  //         {
  //           text: 'تقديم طلب للحصول على إصدار شهادة الأفضلية السعرية',
  //         },
  //         {text: 'استلام الشهادة'},
  //       ],
  //     },
  //     {
  //       Requirements: ['لا توجد'],
  //     },
  //     {
  //       id: 3,
  //       label: 'ملفات',

  //       filesSection: {
  //         fileName: 'اسم الملف',
  //         fileSize: 'حجم الملف',
  //         fileType: 'نوع فلتر',
  //       },
  //       filesList: [
  //         {
  //           name: 'UserManual - Issue of a price preference certificate',
  //           size: '553 KB',
  //           type: 'application/pdf',
  //           url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---issue-of-a-price-preference-certificate.ashx',
  //         },
  //       ],
  //     },
  //   ],
  //   serviceFees: 'رسوم الخدمة',
  //   FeesAmount: 'مجانية',

  //   aed0: 'AED 0',
  //   note: 'ملاحظة رسوم الخدمة',

  //   serviceTime: 'خدمة فورية',

  //   packageTitle: 'الباقة',
  //   none: 'لا يوجد',

  //   faq: {
  //     name: 'الأسئلة الشائعة',
  //     items: [
  //       {
  //         question: 'س) ما هي إجراءات الحصول على الخدمة؟',
  //         proceduresTitle: 'إجراءات الخدمة',
  //         requirementsTitle: 'المتطلبات',
  //         procedures: [
  //           'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
  //           'تقديم طلب للحصول على إصدار شهادة الأفضلية السعرية (moiat.gov.ae)',
  //           'دفع الرسوم',
  //           'استلام الشهادة',
  //         ],
  //         requirements: ['رخصة الإنتاج الصناعي'],
  //       },
  //     ],
  //   },
  //   serviceOverview: {
  //     title: 'نظرة عامة على الخدمة',
  //     serviceCategory: {
  //       label: 'فئة الخدمة',
  //       value: 'خدمات الترخيص الصناعي',
  //     },
  //     serviceSubCategory: {
  //       label: 'فئة الخدمة الفرعية',
  //       value: 'اجرائية',
  //     },
  //     serviceType: {
  //       label: 'نوع الخدمة',
  //       value: 'معاملات',
  //     },
  //     targetAudience: {
  //       label: 'الجمهور المستهدف',
  //       value: 'المؤسسات الصناعية\nالجهات الحكومية​',
  //     },
  //     qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
  //   },

  //   serviceInfo: {
  //     title: 'معلومات الخدمة',
  //     availability: {
  //       label: 'توفر الخدمة',
  //       value: 'مفتوح 24/7',
  //     },
  //     paymentChannels: {
  //       label: 'قنوات الدفع',
  //       values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
  //     },
  //     serviceChannels: {
  //       label: 'قنوات الخدمة',
  //       web: 'المنصة الرقمية لخدمات الوزارة',
  //       url: 'https://sso.moiat.gov.ae/',
  //     },
  //     mobileApp: {
  //       googleApp: {
  //         title: 'متجر قوقل',
  //         url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
  //       },
  //       appleApp: {
  //         title: 'متجر آبل',
  //         url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
  //       },
  //     },
  //     sdgGoals: {
  //       label: 'أهداف التنمية المستدامة',
  //       values: [
  //         'العمل اللائق ونمو الاقتصاد',
  //         'الصناعة والابتكار والهياكل الأساسية',
  //         'الصناعة والابتكار والهياكل الأساسية',
  //       ],
  //     },
  //     serviceLinks: {
  //       label: 'روابط الخدمة',
  //       value: ['لا يوجد'],
  //     },
  //   },

  //   serviceNotes: {
  //     title: 'ملاحظات خدمتك',
  //     contactCenter: {
  //       label: 'مركز الاتصال',
  //       value: '600565554',
  //     },
  //     customerCare: {
  //       label: 'البريد الإلكتروني',
  //       value: 'customercare@moiat.gov.ae',
  //     },
  //     technicalSupport: {
  //       label: 'الدعم الفني',
  //       value: 'support@moiat.gov.ae',
  //     },
  //   },

  //   moreInfo: {
  //     title: 'للمزيد من المعلومات',
  //     cards: [
  //       {
  //         title: 'المشاريع',
  //         action: 'قراءة المزيد',
  //         url: 'https://moiat.gov.ae/programs',
  //       },
  //       {
  //         title: 'أهداف التنمية المستدامة',
  //         action: 'قراءة المزيد',
  //         url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
  //       },
  //       {
  //         title: 'شركاؤنا',
  //         action: 'قراءة المزيد',
  //         url: 'https://moiat.gov.ae/about-us/partners',
  //       },
  //       {
  //         title: 'القوانين والتشريعات',
  //         action: 'قراءة المزيد',
  //         url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
  //       },
  //     ],
  //   },
  //   feedback: {
  //     question: 'هل وجدت هذا المحتوى مفيداً؟',
  //     hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
  //     yes: 'نعم',
  //     no: 'لا',
  //   },
  // },
  {
    id: 'b6998110-dc36-4969-9573-5aed61f2a3db',
    title: 'تجديد تصريح إنتاج صناعي',
    Category_Id: 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a',
    relatedServiceId: 19,
    type: 'il',
    generalDocument: {
      title: 'المستندات العامة',
      description:
        'من خلال هذه الخدمة يمكنك التقدم بطلب تجديد تصريح إنتاج صناعي منتهي الصلاحية.',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/ar/IndustrialLicenseRenewal',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب تجديد تصريح إنتاج صناعي منتهي الصلاحية.',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة     (moiat.gov.ae)',
            url: 'https://sso.moiat.gov.ae/',
            screen: '',
          },
          {
            text: 'تقديم طلب تجديد إنتاج صناعي​',
          },
          {text: 'إرفاق المرفقات المطلوبة ( في حال تعديل البيانات)​'},
          {
            text: 'دفع الرسوم',
          },
          {
            text: 'استلام نسخة رقمية من تصريح الإنتاج الصناعي المُجدد',
          },
        ],
      },
      {
        Requirements: ['رخصة صناعية محلية'],
      },
      {
        id: 3,
        label: 'ملفات',

        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع فلتر',
        },
        filesList: [
          {
            title: 'استمارة تقديم',
            name: 'Renew Industrial Production License',
            size: '319 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/renew-industrial-production-license.ashx',
          },
          {
            name: 'UserManual - Renew Industrial Production License',
            size: '870 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---renew-industrial-production-license.ashx',
          },
        ],
      },
    ],
    serviceFees: '500 درهم لتقديم الطلب \n100 درهم للتفتيش ( إن لزم)​',
    fee: '500 درهم',
    feeNote:
      'رسوم التفتيش100 درهم , رسوم عن كل شهر في حال تأخير التجديد 100 درهم ، بحد أقصى 1000 درهم',
    aed0: 'AED 0',
    note: 'ملاحظة رسوم الخدمة',

    serviceTime: '3 أيام عمل',

    packageTitle: 'الباقة',
    none: 'لا يوجد',
    uaePass: {
      title: 'الختم الرقمي',
      items: [
        'تستخدم هذه الخدمة خاصية الختم الرقمي من الهوية الرقمية لضمان مصدر الوثيقة.',
        'قم بزيارة الرابط التالي لتتأكد من مصدر الوثيقة المختومة إلكترونياً: https://selfcare.uaepass.ae/',
      ],
    },
    moIATlBockchain: {
      title: 'بلوكشين وزارة الصناعة والتكنولوجيا المتقدمة',
      items: [
        'هذه الخدمة تستخدم تكنولوجيا البلوكشين التي تزيد من ثقة المتعامل في خدمات الوزارة.',
        'قم بمسح رمز الإستجابة السريع وحمل الوثيقة الرقمية إلى الموقع لتتحقق من صلاحية الوثيقة.',
      ],
    },

    faq: {
      name: 'الأسئلة الشائعة',
      items: [
        {
          question: 'س) متطلبات الخدمة وكيفية التقديم عليها',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار رخصة إنتاج صناعي (moiat.gov.ae)',
            'دراسة الطلب من قبل الموظف المختص',
            'دفع رسوم التفتيش في حال انطباق الشروط',
            'التفتيش على المنشأة وكتابة تقرير التفتيش',
            'إصدار الرخصة في حال الموافقة على تقرير التفتيش',
            'إصدار الرخصة في حال الموافقة على تقرير التفتيش',
          ],
          requirements: [
            'صورة رخصة صناعية صادرة من الجهة المحلية المختصة سارية المفعول.',
          ],
        },
        {
          question: 'س) هل يخضع المصنع للتفتيش مرة أخرى عند التجديد؟',
          answers: 'ج) نعم، في حال تغيير الموقع أو النشاط',
        },
        {
          question: 'س) ما هي غرامات التأخير عن تجديد الرخصة؟',
          answers:
            'ج) 100 درهم عن كل شهر في حال تأخير التجديد، بحد أقصى 1000 درهم',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
    },

    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
        value: ['جهات التراخيص المحلية'],
      },
    },
    tutorialVideo: {
      url: 'https://youtu.be/gTY6AqP75Vc',
    },
    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'الخدمات ذات الصلة',
      services: [
        {
          title: 'إصدار رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/issue-industrial-production-license',
        },
        {
          title: 'تعديل بيانات رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
        {
          title:
            'طلب إعفاء مدخلات الصناعة من الرسوم الجمركية (آلات، معدات ومواد أولية)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'إلغاء رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  {
    id: 'cbcb2568-826c-4e53-aa96-45dc3adef9fc',
    relatedServiceId: 14,
    type: 'il',
    Category_Id: 'a0476a86-81d8-4964-9b81-b2093250774f',
    title: 'إصدار شهادة القيمة المضافة طبقا لقواعد المنشأ العربية',
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
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/En/ValueAdded',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب إصدار شهادة القيمة المضافة طبقا لقواعد المنشأ العربية. حيث يقوم النظام باحتساب القيمة المضافة (نسبة المكّون الوطني في المنتج النهائي) بناءً على البيانات المالية للمصنع، ويجب ألا تقل نسبة المكّون الوطني من إجمالي تكاليف الإنتاج عن 40 % وذلك لتتمكن من تسجيل المنشأة في نظام شهادات المنشأ بوزارة الاقتصاد لتصدير المنتجات إلى خارج الدولة والاستفادة من الإعفاءات الجمركية.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae)',
          },
          {
            text: 'تقديم طلب الحصول على شهادة القيمة المضافة طبقا لقواعد المنشأ العربية',
          },
          {text: 'إرفاق المرفقات المطلوبة'},
          {text: 'دفع رسوم الطلب'},
          {text: 'دفع رسوم التفتيش'},
          {text: 'استقبال المفتش'},
          {text: 'استلام شهادة القيمة المضافة طبقاً لقواعد المنشأ العربية'},
        ],
      },
      {
        Requirements: [
          'الموازنة المالية للمصنع عن السنة الفائتة معتمدة من مكتب تدقيق معتمد',
          'فواتير المواد الأولية',
        ],
      },
      {
        id: 3,
        label: 'ملفات',

        filesSection: {
          fileName: 'اسم الملف',
          fileSize: 'حجم الملف',
          fileType: 'نوع فلتر',
        },
        filesList: [
          {
            title: 'استمارة تقديم',
            name: 'Issue Value-Added Certificate',
            size: '266 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/issue-value-added-certificate.ashx',
          },
          {
            name: 'UserManual - Issue Value-Added Certificate',
            size: '702 KB',
            type: 'application/pdf',
            url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/usermanual---issue-value-added-certificate.ashx',
          },
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: '1,000 درهم​'}, {value: '100 درهم تفتيش​'}],
    },
    serviceTime: '5 أيام عمل',

    packageTitle: 'الباقة',
    none: 'لا يوجد',
    uaePass: {
      title: 'الختم الرقمي',
      items: [
        'تستخدم هذه الخدمة خاصية الختم الرقمي من الهوية الرقمية لضمان مصدر الوثيقة.',
        'قم بزيارة الرابط التالي لتتأكد من مصدر الوثيقة المختومة إلكترونياً: https://selfcare.uaepass.ae/',
      ],
    },
    moIATlBockchain: {
      title: 'بلوكشين وزارة الصناعة والتكنولوجيا المتقدمة',
      items: [
        'هذه الخدمة تستخدم تكنولوجيا البلوكشين التي تزيد من ثقة المتعامل في خدمات الوزارة.',
        'قم بمسح رمز الإستجابة السريع وحمل الوثيقة الرقمية إلى الموقع لتتحقق من صلاحية الوثيقة.',
      ],
    },

    faq: {
      name: 'الأسئلة الشائعة',
      items: [
        {
          question: 'ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على شهادة القيمة المضافة (moiat.gov.ae)',
            'دفع الرسوم',
            'دراسة الطلب من قبل الموظف المختص',
            'في حال الموافقة تضاف المادة والكمية في رصيد المصنع',
            'في حال رفض الطلب لا تضاف المادة ولا الكمية في رصيد المصنع',
            'تحويل الطلب للتفتيش في حال وجود آلات أو معدات و في حالة وجود كميات كبيرة في المواد الأولية',
            'دفع رسوم التفتيش',
            'زيارة المنشأة وكتابة التقرير',
            'تضاف المواد في حال الموافقة على تقرير التفتيش',
            'يرفض الطلب في حال عدم الموافقة',
            'في حال الخطأ في بيانات الطلب يتحمل المتعامل المسؤولية ولا يمكن استرجاع المبلغ المدفوع',
          ],
          requirements: [
            'البيانات المالية لآخر سنة مالية للمصنع تشمل: الميزانية العمومية قائمة الدخل تحليل تفصيلي لتكلفة المبيعات والمصروفات العمومية والإدارية. إرفاق فواتير المواد الخام التي تم شراؤها من مصانع محلية أو خليجية لنفس السنة',
          ],
        },
        {
          question: 'هل تعتبر رخصة الإنتاج الصناعي متطلب إلزامي أو أساسي  ',
          answers: 'نعم إلزامي وأساسي',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
      qrCaption: 'افتح بطاقة الخدمة على الهاتف المحمول أو الجهاز اللوحي.',
    },

    serviceInfo: {
      title: 'معلومات الخدمة',
      availability: {
        label: 'توفر الخدمة',
        value: 'مفتوح 24/7',
      },
      paymentChannels: {
        label: 'قنوات الدفع',
        values: ['بطاقة ماستر كارد', 'بطاقة فيزا'],
      },
      serviceChannels: {
        label: 'قنوات الخدمة',
        web: 'المنصة الرقمية لخدمات الوزارة',
        url: 'https://sso.moiat.gov.ae/',
      },
      mobileApp: {
        googleApp: {
          title: 'متجر قوقل',
          url: 'https://play.google.com/store/apps/details?id=ae.moiat.app',
        },
        appleApp: {
          title: 'متجر آبل',
          url: 'https://apps.apple.com/ae/app/moiat/id1578178231',
        },
      },
      sdgGoals: {
        label: 'أهداف التنمية المستدامة',
        values: [
          'العمل اللائق ونمو الاقتصاد',
          'الصناعة والابتكار والهياكل الأساسية',
          'الصناعة والابتكار والهياكل الأساسية',
        ],
      },
      serviceLinks: {
        label: 'روابط الخدمة',
        value: ['وزارة الإقتصاد'],
      },
    },
    tutorialVideo: {
      url: 'https://www.youtube.com/watch?v=dHTzvJ7clcw',
    },
    serviceNotes: {
      title: 'ملاحظات خدمتك',
      contactCenter: {
        label: 'مركز الاتصال',
        value: '600565554',
      },
      customerCare: {
        label: 'البريد الإلكتروني',
        value: 'customercare@moiat.gov.ae',
      },
      technicalSupport: {
        label: 'الدعم الفني',
        value: 'support@moiat.gov.ae',
      },
    },
    relatedServices: {
      title: 'الخدمات ذات الصلة',
      services: [
        {
          title:
            'طلب إعفاء مدخلات الصناعة من الرسوم الجمركية (آلات، معدات ومواد أولية)',
          url: 'https://moiat.gov.ae/services/request-customs-duty-exemption-for-industrial-inputs',
        },
        {
          title: 'طلب زيادة كمية لمادة مسجلة للإعفاء الجمركي',
          url: 'https://moiat.gov.ae/services/request-quantity-increase-for-a-registered-industrial-input',
        },

        {
          title: 'إلغاء رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/cancel-industrial-production-license',
        },
        {
          title: 'تعديل بيانات رخصة إنتاج صناعي',
          url: 'https://moiat.gov.ae/services/modify-industrial-production-license',
        },
      ],
    },
    moreInfo: {
      title: 'للمزيد من المعلومات',
      cards: [
        {
          title: 'المشاريع',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/programs',
        },
        {
          title: 'أهداف التنمية المستدامة',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/sustainability-development-goals',
        },
        {
          title: 'شركاؤنا',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/partners',
        },
        {
          title: 'القوانين والتشريعات',
          action: 'قراءة المزيد',
          url: 'https://moiat.gov.ae/about-us/laws-and-legislation',
        },
      ],
    },
    feedback: {
      question: 'هل وجدت هذا المحتوى مفيداً؟',
      hint: 'يمكنك مساعدتنا على التحسن من خلال تقديم تعليقاتك حول تجربتك.',
      yes: 'نعم',
      no: 'لا',
    },
  },
  {
    id: 'e0d3c660-9bbe-42cf-9f52-b0644e6e2db6',
    Category_Id: 'c7dbbc80-47b8-4f0d-acf1-ef0069153621',

    relatedServiceId: 1156,
    title: 'تقديم مقترح',
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
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/En/ValueAdded',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'توفر الوزارة للمتعاملين إمكانية تقديم مقترحات بخصوص خدماتها ومبادراتها وفعالياتها لتحسين وتطوير إجراءات العمل​​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'التسجيل باستخدام الهوية الرقمية "للقنوات الرقمية“ أو الاتصال على مركز الاتصال',
          },
          {
            text: 'تعبئة البيانات المطلوبة في طلب الحصول على الخدمة وإرفاق الوثائق الداعمة "إن وجدت"',
          },
          {text: 'دراسة المقترح من قبل فريق مختص في الوزارة'},
          {text: 'استلام الرد على المقترح من قبل الوزارة'},
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'مجاني'}],
    },
    serviceTime: '15 أيام عمل',

    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المتعاملين',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'تقديم مقترح',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'الأفراد, الشركات, الجهات الحكومية, المؤسسات غير الحكومية​',
      },
    },
  },
  {
    id: '1fcd10c9-f5dd-4a44-8108-b4d16d12bdf6',
    Category_Id: 'c7dbbc80-47b8-4f0d-acf1-ef0069153621',
    title: 'طلب استفسار ​',
    relatedServiceId: 1154,
    generalDocument: {
      title: 'المستندات العامة',
      description: 'طلب استفسار',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/En/ValueAdded',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'توفر الوزارة للمتعاملين إمكانية الاستفسار عن خدماتها، مبادراتها وفعالياتها،  بما في ذلك الاستعلام عن حالة الطلب للخدمات المقدمة مسبقاً، أو أية استفسارات أخرى لدى المتعاملين​​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'التسجيل باستخدام الهوية الرقمية "للقنوات الرقمية“ أو الاتصال على مركز الاتصال',
          },
          {
            text: 'تعبئة البيانات المطلوبة في طلب الحصول على الخدمة و إرفاق الوثائق الداعمة "إن وجدت"',
          },
          {text: 'استلام الرد على الاستفسار من قبل الوزارة'},
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'خدمة مجانية​'}],
    },
    serviceTime: 'يوم عمل​',

    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات الترخيص الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'طلب استفسار',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'الأفراد، الشركات، الجهات الحكومية، المؤسسات غير الحكومية​',
      },
    },
  },
  {
    id: 'cdd40863-6803-4527-b3c0-d00294ddab77',
    Category_Id: 'c7dbbc80-47b8-4f0d-acf1-ef0069153621',
    title: 'طلب دعم فني',

    relatedServiceId: 1122,
    generalDocument: {
      title: 'المستندات العامة',
      description: 'طلب استفسار',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/En/ValueAdded',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'توفر الوزارة للمتعاملين إمكانية طلب دعم فني عندما تواجه المتعامل أي من التحديات التقنية خلال محاولته الحصول على أي من خدماتها، وعدم تمكنه من إتمام إجراءات الحصول على الخدمة بسبب التحديات أو الأعطال التقنية.​​',
    sections: [
      {
        serviceProcedures: [
          {text: 'التسجيل باستخدام الهوية الرقمية أو الاتصال على مركز الاتصال'},
          {text: 'إرسال الطلبات إلى فريق الدعم الفني'},
          {text: 'مراجعة ودراسة الطلب من قبل الفريق التقني'},
          {text: 'استلام الرد على الطلبات من قبل الوزارة'},
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'خدمة مجانية​'}],
    },
    serviceTime: 'يوم عمل​',

    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المتعاملين',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'طلب دعم فني​​',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'اجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'الأفراد, الشركات, الجهات الحكومية, المؤسسات غير الحكومية​',
      },
    },
  },
  {
    id: 'cdd40863-6803-4527-4040-d00294ddab77',
    Category_Id: 'c7dbbc80-47b8-4f0d-acf1-ef0069153621',

    relatedServiceId: 1155,
    title: 'تقديم شكوى​',
    generalDocument: {
      title: 'المستندات العامة',
      description: 'طلب استفسار',
      size: 'KB 2204',
      button: [
        {
          title: 'تحميل',
          url: 'https://moiat.gov.ae/-/media/site/moiat/document/services-user-manual/serviceguide2022arb.ashx',
        },
      ],
    },
    startButton: {
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/En/ValueAdded',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'توفر الوزارة للمتعاملين إمكانية تقديم شكوى بخصوص أي من خدماتها وتعرّف الشكوى بأنها بيان مكتوب يقدم للوزارة من أحد الأطراف الخارجية المتعاملة معها ويعبر فيه عن عدم رضاه عن الإجراءات أو المعاملات التي يتقّدم بها للحصول على الخدمة أو عن أسلوب تقديمها ​​​',
    sections: [
      {
        serviceProcedures: [
          {text: 'التسجيل باستخدام الهوية الرقمية أو الاتصال على مركز الاتصال'},
          {text: 'تعبئة البيانات المطلوبة و إرفاق الوثائق الداعمة "إن وجدت"'},
          {text: 'دراسة الشكوى من قبل فريق مختص في الوزارة'},
          {text: 'استلام حل الشكوى وتقييم مدى رضا المتعامل عن الحل'},
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'خدمة مجانية​'}],
    },
    serviceTime: '5 أيام عمل ​',

    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المتعاملين',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'تقديم شكوى​',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'اجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'الأفراد, الشركات, الجهات الحكومية, المؤسسات غير الحكومية​',
      },
    },
  },
  {
    id: '83d7da27-27c2-4d52-ae84-caf2ddb710ef',
    relatedServiceId: 1145,
    title: 'إصدار سجل صناعي​',
    Category_Id: '3e8e68f3-536c-471b-a44b-64fc2ff5a236',
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
      title: 'ابدأ الخدمة',
      url: 'https://il.moiat.gov.ae/En/ValueAdded',
    },
    aboutService: 'حول هذه الخدمة',
    description:
      'من خلال هذه الخدمة يمكنك التقدم للحصول على إصدار سجل صناعي خاص بالمنشأة يحتوي على كافة البيانات التجارية والاقتصادية والصناعية الواردة في سلطات الترخيص ووزارة الاقتصاد، بالإضافة إلى البيانات التي يتم طلبها من وزارة الصناعة والتكنولوجيا المتقدمة. حيث سيمكنك هذا السجل من الحصول على العديد من الخدمات المُقدمة في الوزارة على سبيل المثال إعفاءات من الرسوم الجمركية المفروضة على استيراد الآلات والمعدات وفق شروط محددة.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
          },
          {text: 'تقديم طلب الحصول على سجل صناعي'},
          {text: 'إرفاق المستندات المطلوبة'},
          {text: 'استلام النسخة رقمية من السجل الصناعي'},
        ],
      },
      {
        Requirements: [
          'موافقة مبدئية أو رخصة صناعية من سلطة محلية',
          'هوية أو جواز المالك او المدير حسب نوع المنشأة',
        ],
      },
    ],
    serviceFees: {
      Fees: [{value: 'لا يوجد رسوم'}],
    },
    serviceTime: '3 أيام عمل',

    faq: {
      name: 'FAQ',
      items: [
        {
          question: 'ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار شهادة الموافقة المبدئية (moiat.gov.ae)',
            'دفع الرسوم (الرسوم غير مستردة)',
            'دراسة الطلب من قبل الموظف المختص',
            'في حال الموافقة سيتم إصدار شهادة الموافقة المبدئية أو لن يتم إصدار الشهادة في حال رفض الطلب',
          ],
          requirements: [
            'شهادة الموافقة المبدئية من سلطة الترخيص المحلية (على سبيل المثال: الدوائر الاقتصادية)',
            'الوثائق التعريفية لجميع الملاك (مثال: الهوية الإماراتية، جواز السفر ، الرخصة التجارية)',
            'ألا يقل إجمالي عدد الموظفين عن 10 موظفين',
            'ألا يقل إجمالي رأس مال المصنع عن 250 ألف درهم',
            'التعهد بالالتزام بكافة القوانين واللوائح المعمول بها في الدولة المتعلقة بالأمن الصناعي والصحة العامة والمحافظة على البيئة',
          ],
        },
        {
          question: 'هل يتم تجديد الرخصة؟ وكيف؟',
          answers:
            'نعم، يتم تجديد الموافقة المبدئية من خلال الموقع الإلكتروني سنوياً (منصة الخدمات)',
        },
        {
          question:
            'هل يمكن استيراد معدات وآلات من الخارج للمصنع عند الحصول على الشهادة (قبل استخراج رخصة الإنتاج الصناعي؟)',
          answers: 'نعم بعد تركيب الآلات والمعدات وتقييم المفتش',
        },
        {
          question: 'ما فترة صلاحية الشهادة؟',
          answers: 'سنة واحدة',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات السجل الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'اجرائية',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'معاملات',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
    },
  },
  {
    id: '3638f5b4-65e6-467f-9ebb-3dc967077db5',
    relatedServiceId: 1146,
    Category_Id: '3e8e68f3-536c-471b-a44b-64fc2ff5a236',
    title: 'تحديث بيانات السجل الصناعي​',
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

    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب تعديل أو تحديث بيانات السجل الصناعي الخاص بالمنشأة الصناعية، وذلك في حال وجود عدم اكتمال المعلومات الخاصة بالمنشأة مسبقاً، أو حدوث أي تغيير أو تعديل على بيانات المنشأة التجارية، الاقتصادية، الصناعية، أو البيانات التي يتم طلبها من وزارة الصناعة والتكنولوجيا المتقدمة.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: ' تسجيل الدخول على المنصة الرقمية لخدمات الوزارة    (moiat.gov.ae)',
          },
          {text: 'تقديم طلب تحديث بيانات سجل صناعي'},
          {text: 'إرفاق المرفقات المطلوبة'},
          {
            text: 'دفع رسوم التفتيش (تدفع فقط في حال تطلب الأمر عمل زيارة تفتيشية للمنشأة)',
          },
          {text: 'استقبال مفتش الوزارة'},
          {text: 'استلام النسخة رقمية من السجل الصناعي المُحدث'},
        ],
      },
      {
        Requirements: [
          'هوية أو جواز المالك أو المدير حسب نوع المنشأة (في حالة التعديل على وثائق المالك أو مدير المنشأة)\nمستندات دالة على تعديل البيانات المحدثة',
        ],
      },
    ],

    serviceFees: {
      Fees: [{value: '100 درهم رسوم تفتيش في حال تمت الزيارة ​'}],
    },
    serviceTime: '3 أيام عمل',

    faq: {
      name: 'FAQ',
      items: [
        {
          question: 'ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار شهادة الموافقة المبدئية (moiat.gov.ae)',
            'دفع الرسوم (الرسوم غير مستردة)',
            'دراسة الطلب من قبل الموظف المختص',
            'في حال الموافقة سيتم إصدار شهادة الموافقة المبدئية أو لن يتم إصدار الشهادة في حال رفض الطلب',
          ],
          requirements: [
            'شهادة الموافقة المبدئية من سلطة الترخيص المحلية (على سبيل المثال: الدوائر الاقتصادية)',
            'الوثائق التعريفية لجميع الملاك (مثال: الهوية الإماراتية، جواز السفر ، الرخصة التجارية)',
            'ألا يقل إجمالي عدد الموظفين عن 10 موظفين',
            'ألا يقل إجمالي رأس مال المصنع عن 250 ألف درهم',
            'التعهد بالالتزام بكافة القوانين واللوائح المعمول بها في الدولة المتعلقة بالأمن الصناعي والصحة العامة والمحافظة على البيئة',
          ],
        },
        {
          question: 'هل يتم تجديد الرخصة؟ وكيف؟',
          answers:
            'نعم، يتم تجديد الموافقة المبدئية من خلال الموقع الإلكتروني سنوياً (منصة الخدمات)',
        },
        {
          question:
            'هل يمكن استيراد معدات وآلات من الخارج للمصنع عند الحصول على الشهادة (قبل استخراج رخصة الإنتاج الصناعي؟)',
          answers: 'نعم بعد تركيب الآلات والمعدات وتقييم المفتش',
        },
        {
          question: 'ما فترة صلاحية الشهادة؟',
          answers: 'سنة واحدة',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات السجل الصناعي',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'تحديث بيانات السجل الصناعي',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'اجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية\nالجهات الحكومية​',
      },
    },
  },
  {
    id: '45a69587-3387-4f13-906f-17eef0cf491a',
    relatedServiceId: 'link',
    Category_Id: 'bb0a6053-9efc-4031-bfd7-67202c842604',
    title: 'تقييم مصنع',
    startButton: {
      url: 'https://itti.moiat.gov.ae/',
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

    description:
      'تمكن هذه الخدمة المتعامل من الحصول على تقرير تقييم مؤشر التحول التكنولوجي الصناعي لمصنعه، من خلال زيارة المصنع  ميدانية، حيث يحتوي التقرير على التوصيات التي تثري رحلة المصنع باتجاه تحقيق التحول التكنولوجي. حيث تعزز هذه الخدمة القدرة التنافسية للصناعة من خلال تبني التكنولوجيا من خلال توفير نظرة شاملة عن جاهزية تبني التكنولوجيا والتوصيات الأساسية للبدء بعملية التحول التكنولوجي والتوجه نحو الصناعة المستدامة.​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'تسجيل الدخول على المنصة الرقمية لخدمات الوزارة(moiat.gov.ae) ​',
          },
          {text: 'تقديم المصنع على المنصة الرقمية'},
          {text: 'التواصل بين الشركة والمقيم'},
          {text: 'دفع الرسوم'},
          {text: 'إجراء التقييم'},
          {text: 'إكمال التقرير وتحميله على المنصة الرقمية'},
          {text: 'استلام التقرير'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: ['رخصة اقتصادية سارية المفعول​'],
      },
    ],

    serviceFees: {
      Fees: [
        {
          value:
            'تتراوح الرسوم بين 0 إلى 20,000 درهم إماراتي لكل مقيِّم، اعتمادًا على المقيِّم وموقع الشركة الصناعية.​',
        },
      ],
    },
    serviceTime: '5-10 يوم عمل',

    faq: {
      name: 'FAQ',
      items: [
        {
          question: 'ما هي متطلبات الخدمة وكيفية التقديم عليها؟',
          proceduresTitle: 'إجراءات الخدمة',
          requirementsTitle: 'المتطلبات',
          procedures: [
            'الدخول إلى المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
            'تقديم طلب للحصول على إصدار شهادة الموافقة المبدئية (moiat.gov.ae)',
            'دفع الرسوم (الرسوم غير مستردة)',
            'دراسة الطلب من قبل الموظف المختص',
            'في حال الموافقة سيتم إصدار شهادة الموافقة المبدئية أو لن يتم إصدار الشهادة في حال رفض الطلب',
          ],
          requirements: [
            'شهادة الموافقة المبدئية من سلطة الترخيص المحلية (على سبيل المثال: الدوائر الاقتصادية)',
            'الوثائق التعريفية لجميع الملاك (مثال: الهوية الإماراتية، جواز السفر ، الرخصة التجارية)',
            'ألا يقل إجمالي عدد الموظفين عن 10 موظفين',
            'ألا يقل إجمالي رأس مال المصنع عن 250 ألف درهم',
            'التعهد بالالتزام بكافة القوانين واللوائح المعمول بها في الدولة المتعلقة بالأمن الصناعي والصحة العامة والمحافظة على البيئة',
          ],
        },
        {
          question: 'هل يتم تجديد الرخصة؟ وكيف؟',
          answers:
            'نعم، يتم تجديد الموافقة المبدئية من خلال الموقع الإلكتروني سنوياً (منصة الخدمات)',
        },
        {
          question:
            'هل يمكن استيراد معدات وآلات من الخارج للمصنع عند الحصول على الشهادة (قبل استخراج رخصة الإنتاج الصناعي؟)',
          answers: 'نعم بعد تركيب الآلات والمعدات وتقييم المفتش',
        },
        {
          question: 'ما فترة صلاحية الشهادة؟',
          answers: 'سنة واحدة',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات التحول التكنولوجي الصناعي​',
      },
      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'تقييم مصنع',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'اجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'المؤسسات الصناعية​',
      },
    },
  },
  {
    id: '9cb70d4a-a361-484c-9f45-4b31b9219a23',
    relatedServiceId: 'link',
    startButton: {
      url: 'https://icv.moiat.gov.ae/',
    },
    title: 'إصدار شهادة القيمة الوطنية المضافة',
    Category_Id: 'dc16af20-5124-47ed-937a-eb5f4122d1f8',
    description:
      'من خلال هذه الخدمة يمكنك التقدم بطلب للحصول على شهادة المحتوى الوطني (ICV) من خلال نظام الشهادات المخصص. والتي تعزز تحقيق الفوائد الاقتصادية للشركات الحاصلة على الشهادة، وذلك من خلال إعادة توجيه مصروفات المشتريات الحكومية والشركات الوطنية الرائدة إلى هذه الشركات لدعم الاقتصاد الوطني عبر قطاعي الصناعة والخدمات.​',
    serviceTime: '14 – 28 يوم عمل​',
    sections: [
      {
        serviceProcedures: [
          {
            text: 'إنشاء حساب أو تسجيل الدخول على المنصة الرقمية لخدمات الوزارة (moiat.gov.ae)',
          },
          {
            text: 'التقدم بطلب للحصول على خدمة طلب للحصول على شهادة المحتوى الوطني  (ICV)',
          },
          {text: ' اختيار شركات التدقيق​'},
          {text: 'دفع الرسوم لشركة التدقيق​'},
          {text: 'التدقيق الميدانية​'},
          {text: 'استلام شهادة المحتوى الوطني​'},
        ],
      },
      {
        label: 'المتطلبات',
        Requirements: [
          'رخصة اقتصادية سارية المفعول​',
          'البيانات المالية المدققة',
          'مستندات أخرى (يعتمد ذلك علىإصدار شهادة المحتوى الوطني​',
          'حجم الشركة​',
        ],
      },
    ],
    serviceFees: {
      Fees: [
        {
          value:
            'يعتمد على تفاصيل الشركة، ولكن يمكن أن يتراوح من 500 درهم إلى 10,000 درهم​​',
        },
      ],
    },
    serviceOverview: {
      title: 'نظرة عامة على الخدمة',
      serviceCategory: {
        label: 'فئة الخدمة',
        value: 'خدمات المحتوى الوطني​',
      },

      serviceSubCategory: {
        label: 'فئة الخدمة الفرعية',
        value: 'إصدار شهادة القيمة الوطنية المضافة',
      },
      serviceType: {
        label: 'نوع الخدمة',
        value: 'اجرائية',
      },
      targetAudience: {
        label: 'الجمهور المستهدف',
        value: 'شركات',
      },
    },
  },
];
