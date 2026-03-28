let services = {
  stageId: 51,
  applicationStageId: 51,
  stageName:
    '[{"value":"Fill Application","langId":1},{"value":"تعبئة البيانات","langId":2}]',
  serviceIcon: 'DRONE PSS',
  forms:
    '[{"formId":1044,"formNameKey":"DroneLOCProfessionalIndividual","formMode":1,"formOrder":2,"EntityId":22,"formName":[{"value":"Application Details","langId":1},{"value":"بيانات الطلب","langId":2}],"formSection":[{"formSectionOrder":1,"multipleRecords":"False","formSectionName":[{"value":" Drone Information","langId":1},{"value":"معلومات الطائرة بدون طيار","langId":2}],"formSectionFields":[{"formSectionFieldValue":"","entityFieldId":206,"formSectionFieldNameKey":"Drone with Camera","formSectionFieldName":"[{\\"value\\":\\"Drone with Camera\\",\\"langId\\":1},{\\"value\\":\\"طائرة بدون طيار مع كاميرا\\",\\"langId\\":2}]","formSectionFieldid":1286,"formSectionFieldOrder":1,"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":8,"formSectionFieldTypeName":"Boolean","canAdd":true},{"formSectionFieldValue":"","entityFieldId":1281,"Settings":"{\\"lookupTypeId\\":1030}","formSectionFieldNameKey":"ManufacturedAssembled","formSectionFieldName":"[{\\"value\\":\\"Manufactured\\\\/Assembled\\",\\"langId\\":1},{\\"value\\":\\"مصنع\\\\/مجمع\\",\\"langId\\":2}]","formSectionFieldid":6956,"formSectionFieldOrder":2,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":5,"formSectionFieldTypeName":"Options","canAdd":true},{"formSectionFieldValue":"","entityFieldId":1279,"formSectionFieldNameKey":"Manufactured Serial Number","formSectionFieldName":"[{\\"value\\":\\"Manufactured Serial Number\\",\\"langId\\":1},{\\"value\\":\\"رقم التصنيع التسلسلي\\",\\"langId\\":2}]","formSectionFieldid":6957,"formSectionFieldOrder":3,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"},{"constraintTypeId":4,"constraintName":"Visible By Value","Settings":"{\\"ControlBy\\":[1281],\\"Values\\":\\"\'1\'\\"}"}],"formSectionFieldSettings":"","fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":1,"formSectionFieldTypeName":"Text","canAdd":true},{"formSectionFieldValue":"","entityFieldId":3512,"Settings":"","formSectionFieldNameKey":"Drone Technical Specification","entityRelationships":[{"FromEntityId":1218,"ToEntityId":22,"parentRelationName":"DroneTechnicalSpecification","childRelationName":"Drone Loc","multipleChildRelationShip":"One to Many"}],"relationType":"Single","relationShipName":"DroneTechnicalSpecification","relationShipNameTranslation":"[{\\"value\\":\\"Drone Identification\\",\\"langId\\":1},{\\"value\\":\\"Drone Identification\\",\\"langId\\":2}]","relatedEntityFieldFilters":"[{\\"entityFieldId\\":3497,\\"entityFieldName\\":\\"Brand Name\\",\\"fieldTypeId\\":1,\\"entityFieldTranslation\\":[{\\"value\\":\\"Brand Name\\",\\"langId\\":1},{\\"value\\":\\"Brand Name\\",\\"langId\\":2}],\\"entityId\\":1218,\\"entityName\\":\\"Drone Technical Specifications\\",\\"entityTranslations\\":\\"[{\\\\\\"value\\\\\\":\\\\\\"Drone Technical Specifications\\\\\\",\\\\\\"langId\\\\\\":1},{\\\\\\"value\\\\\\":\\\\\\"Drone Technical Specifications\\\\\\",\\\\\\"langId\\\\\\":2}]\\",\\"settings\\":\\"{\\\\\\"equalOnly\\\\\\":true} \\",\\"searchEntityFieldId\\":3497},{\\"entityFieldId\\":3498,\\"entityFieldName\\":\\"Model Name\\",\\"fieldTypeId\\":1,\\"entityFieldTranslation\\":[{\\"value\\":\\"Model Name\\",\\"langId\\":1},{\\"value\\":\\"Model Name\\",\\"langId\\":2}],\\"entityId\\":1218,\\"entityName\\":\\"Drone Technical Specifications\\",\\"entityTranslations\\":\\"[{\\\\\\"value\\\\\\":\\\\\\"Drone Technical Specifications\\\\\\",\\\\\\"langId\\\\\\":1},{\\\\\\"value\\\\\\":\\\\\\"Drone Technical Specifications\\\\\\",\\\\\\"langId\\\\\\":2}]\\",\\"settings\\":\\"{\\\\\\"equalOnly\\\\\\":true} \\",\\"searchEntityFieldId\\":3498},{\\"entityFieldId\\":3821,\\"entityFieldName\\":\\"Product Name\\",\\"fieldTypeId\\":1,\\"entityFieldTranslation\\":[{\\"value\\":\\"Product Name\\",\\"langId\\":1},{\\"value\\":\\"Product Name\\",\\"langId\\":2}],\\"entityId\\":1218,\\"entityName\\":\\"Drone Technical Specifications\\",\\"entityTranslations\\":\\"[{\\\\\\"value\\\\\\":\\\\\\"Drone Technical Specifications\\\\\\",\\\\\\"langId\\\\\\":1},{\\\\\\"value\\\\\\":\\\\\\"Drone Technical Specifications\\\\\\",\\\\\\"langId\\\\\\":2}]\\",\\"settings\\":\\"{\\\\\\"equalOnly\\\\\\": true}\\",\\"searchEntityFieldId\\":3821}]","formSectionFieldName":"[{\\"value\\":\\"Drone Technical Specification\\",\\"langId\\":1},{\\"value\\":\\"Drone Technical Specification\\",\\"langId\\":2}]","formSectionFieldid":6958,"formSectionFieldOrder":4,"formSectionFieldSettings":"{\\n\\t\\"entityId\\": 1218,\\n\\t\\"returnAllRecord\\": true,\\n\\t\\"mappings\\":[\\n\\t\\t  {\\"fromId\\" :3520, \\"toId\\": 207},\\n\\t\\t  {\\"fromId\\" :3521, \\"toId\\": 210},\\n\\t\\t  {\\"fromId\\" :3522, \\"toId\\": 211},\\n\\t\\t  {\\"fromId\\" :3523, \\"toId\\": 215},\\n\\t\\t  {\\"fromId\\" :3497, \\"toId\\": 217},\\n\\t\\t  {\\"fromId\\" :3498, \\"toId\\": 218},\\n\\t\\t  {\\"fromId\\" :3499, \\"toId\\": 2718},\\n\\t\\t  {\\"fromId\\" :3500, \\"toId\\": 221},\\n\\t\\t  {\\"fromId\\" :3501, \\"toId\\": 222},\\n\\t\\t  {\\"fromId\\" :3502, \\"toId\\": 223},\\n\\t\\t  {\\"fromId\\" :3503, \\"toId\\": 224},\\n\\t\\t  {\\"fromId\\" :3504, \\"toId\\": 225},\\n\\t\\t  {\\"fromId\\" :3505, \\"toId\\": 226},\\n\\t\\t  {\\"fromId\\" :3506, \\"toId\\": 227},\\n\\t\\t  {\\"fromId\\" :3507, \\"toId\\": 228},\\n\\t\\t  {\\"fromId\\" :3508, \\"toId\\": 229},\\n\\t\\t  {\\"fromId\\" :3509, \\"toId\\": 231},\\n\\t\\t  {\\"fromId\\" :3510, \\"toId\\": 232},  \\t\\t\\n  \\t\\t  {\\"fromId\\" :3822, \\"toId\\": 214},\\n  \\t\\t  {\\"fromId\\" :4824, \\"toId\\": 212},\\n  \\t\\t  {\\"fromId\\" :4825, \\"toId\\": 213},\\n  \\t\\t  {\\"fromId\\" :4826, \\"toId\\": 209},\\n  \\t\\t  {\\"fromId\\" :4827, \\"toId\\": 208},\\n\\t\\t  {\\"fromId\\" :3821, \\"toId\\": 216}\\n\\t   ],\\n\\t\\"reusable\\": {\\n\\t\\t\\"inProgress\\": true,\\n\\t\\t\\"approved\\": true,\\n\\t\\t\\"rejected\\": true\\n\\t},\\n\\t\\"readFromEntityFieldFieltersLookups\\": false\\n}","fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":7,"formSectionFieldTypeName":"Relation","canAdd":true}]}]},{"formId":28,"formNameKey":"Technical Specifications","formMode":1,"formOrder":4,"EntityId":22,"formName":[{"value":"Technical Specifications","langId":1},{"value":"المواصفات الفنية","langId":2}],"formSection":[{"formSectionOrder":1,"multipleRecords":"False","formSectionName":[{"value":"Technical Specifications","langId":1},{"value":"المواصفات الفنية","langId":2}],"formSectionFields":[{"formSectionFieldValue":"","entityFieldId":220,"formSectionFieldNameKey":"Color","formSectionFieldName":"[{\\"value\\":\\"Color\\",\\"langId\\":1},{\\"value\\":\\"اللون\\",\\"langId\\":2}]","formSectionFieldid":290,"formSectionFieldOrder":1,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":1,"formSectionFieldTypeName":"Text","canAdd":true},{"formSectionFieldValue":"","entityFieldId":2718,"Settings":"","formSectionFieldNameKey":"Drone Weight","formSectionFieldName":"[{\\"value\\":\\"Drone Weight (g)\\",\\"langId\\":1},{\\"value\\":\\"الوزن (غرام)\\",\\"langId\\":2}]","formSectionFieldid":4708,"formSectionFieldOrder":2,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true},{"formSectionFieldValue":"","entityFieldId":221,"formSectionFieldNameKey":"Transmission Power (dBm)","formSectionFieldName":"[{\\"value\\":\\"Transmission Power (dBm)\\",\\"langId\\":1},{\\"value\\":\\"قوة الإرسال (dBm)\\",\\"langId\\":2}]","formSectionFieldid":291,"formSectionFieldOrder":3,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true},{"formSectionFieldValue":"","entityFieldId":222,"formSectionFieldNameKey":"Frequency (MHz)","formSectionFieldName":"[{\\"value\\":\\"Frequency (MHz)\\",\\"langId\\":1},{\\"value\\":\\"التردد (ميجا هرتز)\\",\\"langId\\":2}]","formSectionFieldid":292,"formSectionFieldOrder":4,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"},{"constraintTypeId":11,"constraintName":"Greater Than","Settings":"{\\"ControlBy\\":[],\\"Values\\":\\"1\\"}","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Trade license expiry date will be greater than Trade license issue date\\"},{\\"langId\\":2,\\"value\\":\\"تاريخ انتهاء الرخصة التجارية سيكون أكبر من تاريخ إصدار الرخصة التجارية\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true},{"formSectionFieldValue":"","entityFieldId":223,"formSectionFieldNameKey":"Max Height / Attitude (meter)","formSectionFieldName":"[{\\"value\\":\\"Max Height \\\\/ Attitude (meter)\\",\\"langId\\":1},{\\"value\\":\\"أقصى ارتفاع (متر)\\",\\"langId\\":2}]","formSectionFieldid":293,"formSectionFieldOrder":5,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true},{"formSectionFieldValue":"","entityFieldId":224,"formSectionFieldNameKey":"Max Speed (m/sec)","formSectionFieldName":"[{\\"value\\":\\"Max Speed (m\\\\/sec)\\",\\"langId\\":1},{\\"value\\":\\"أقصى سرعة ( متر\\\\/ثانيا)\\",\\"langId\\":2}]","formSectionFieldid":294,"formSectionFieldOrder":6,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true},{"formSectionFieldValue":"","entityFieldId":225,"formSectionFieldNameKey":"GPS or Similar Technology","formSectionFieldName":"[{\\"value\\":\\"GPS or Similar Technology\\",\\"langId\\":1},{\\"value\\":\\"نظام تحديد الموقع أو ما شابه\\",\\"langId\\":2}]","formSectionFieldid":295,"formSectionFieldOrder":7,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":8,"formSectionFieldTypeName":"Boolean","canAdd":true},{"formSectionFieldValue":"","entityFieldId":226,"formSectionFieldNameKey":"Geographic Limits System","formSectionFieldName":"[{\\"value\\":\\"Geographic Limits System\\",\\"langId\\":1},{\\"value\\":\\"نظام الحدود الجغرافية\\",\\"langId\\":2}]","formSectionFieldid":296,"formSectionFieldOrder":8,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":8,"formSectionFieldTypeName":"Boolean","canAdd":true},{"formSectionFieldValue":"","entityFieldId":227,"formSectionFieldNameKey":"Safe Fall Property","formSectionFieldName":"[{\\"value\\":\\"Safe Fall Property\\",\\"langId\\":1},{\\"value\\":\\"خاصية العودة أو الهبوط الآمن\\",\\"langId\\":2}]","formSectionFieldid":297,"formSectionFieldOrder":9,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":8,"formSectionFieldTypeName":"Boolean","canAdd":true},{"formSectionFieldValue":"","entityFieldId":228,"formSectionFieldNameKey":"Operational Range (meter)","formSectionFieldName":"[{\\"value\\":\\"Operational Range (meter)\\",\\"langId\\":1},{\\"value\\":\\"مدى التحكم (متر)\\",\\"langId\\":2}]","formSectionFieldid":298,"formSectionFieldOrder":10,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true},{"formSectionFieldValue":"","entityFieldId":229,"formSectionFieldNameKey":"Energy Source","formSectionFieldName":"[{\\"value\\":\\"Energy Source\\",\\"langId\\":1},{\\"value\\":\\"مصدر الطاقة\\",\\"langId\\":2}]","formSectionFieldid":299,"formSectionFieldOrder":11,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":1,"formSectionFieldTypeName":"Text","canAdd":true},{"formSectionFieldValue":"","entityFieldId":230,"formSectionFieldNameKey":"Payload (g)","formSectionFieldName":"[{\\"value\\":\\"Payload (g)\\",\\"langId\\":1},{\\"value\\":\\"الحمولة ( غرام)\\",\\"langId\\":2}]","formSectionFieldid":300,"formSectionFieldOrder":12,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true},{"formSectionFieldValue":"","entityFieldId":231,"formSectionFieldNameKey":"Max Section / Length (mm)","formSectionFieldName":"[{\\"value\\":\\"Max Section \\\\/ Length (mm)\\",\\"langId\\":1},{\\"value\\":\\"قطر الطائرة (ملم)\\",\\"langId\\":2}]","formSectionFieldid":301,"formSectionFieldOrder":13,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true},{"formSectionFieldValue":"","entityFieldId":232,"formSectionFieldNameKey":"No of Rotors","formSectionFieldName":"[{\\"value\\":\\"No of Rotors\\",\\"langId\\":1},{\\"value\\":\\"عدد المروحيات\\",\\"langId\\":2}]","formSectionFieldid":302,"formSectionFieldOrder":14,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":2,"formSectionFieldTypeName":"Number","canAdd":true}]}]},{"formId":1046,"formNameKey":"ManufacturerIndividual","formMode":1,"formOrder":5,"EntityId":22,"formName":[{"value":"Manufacturer","langId":1},{"value":"المصنع","langId":2}],"formSection":[{"formSectionOrder":1,"multipleRecords":"False","formSectionName":[{"value":"Manufacturer","langId":1},{"value":"المصنع","langId":2}],"formSectionFields":[{"formSectionFieldValue":"","entityFieldId":207,"formSectionFieldNameKey":"Manufacturer","formSectionFieldName":"[{\\"value\\":\\"Manufacturer\\",\\"langId\\":1},{\\"value\\":\\"المصنع\\",\\"langId\\":2}]","formSectionFieldid":1300,"formSectionFieldOrder":1,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":1,"formSectionFieldTypeName":"Text","canAdd":true},{"formSectionFieldValue":"","entityFieldId":210,"Settings":"{\\"lookupTypeId\\":1}","formSectionFieldNameKey":"Manufacturer Country","formSectionFieldName":"[{\\"value\\":\\"Manufacturer Country\\",\\"langId\\":1},{\\"value\\":\\"بلد التصنيع\\",\\"langId\\":2}]","formSectionFieldid":1301,"formSectionFieldOrder":2,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":5,"formSectionFieldTypeName":"Options","canAdd":true},{"formSectionFieldValue":"","entityFieldId":211,"Settings":"{\\"lookupTypeId\\":2}","formSectionFieldNameKey":"ManufacturerCity","formSectionFieldName":"[{\\"value\\":\\"Manufacturer City\\",\\"langId\\":1},{\\"value\\":\\"مدينة المصنع\\",\\"langId\\":2}]","formSectionFieldid":1302,"formSectionFieldOrder":3,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"},{"constraintTypeId":3,"constraintName":"Cascading Load","Settings":"{\\"Cascaded\\":\\"210\\"}"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":5,"formSectionFieldTypeName":"Options","canAdd":true},{"formSectionFieldValue":"1","entityFieldId":219,"Settings":"{\\"lookupTypeId\\":19}","formSectionFieldNameKey":"Drone Classification","formSectionFieldName":"[{\\"value\\":\\"Drone Classification\\",\\"langId\\":1},{\\"value\\":\\"تصنيف الطائرة بدون طيار\\",\\"langId\\":2}]","formSectionFieldid":1312,"formSectionFieldOrder":4,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":2,"showOnMainForm":"Hide","fieldTypeId":5,"formSectionFieldTypeName":"Options","canAdd":true},{"formSectionFieldValue":"","entityFieldId":214,"formSectionFieldNameKey":"Phone No","formSectionFieldName":"[{\\"value\\":\\"Phone No\\",\\"langId\\":1},{\\"value\\":\\"رقم الهاتف\\",\\"langId\\":2}]","formSectionFieldid":1305,"formSectionFieldOrder":5,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"formSectionFieldSettings":"","fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":1,"formSectionFieldTypeName":"Text","canAdd":true},{"formSectionFieldValue":"","entityFieldId":215,"Settings":"{\\"lookupTypeId\\":1}","formSectionFieldNameKey":"Country of Origin","formSectionFieldName":"[{\\"value\\":\\"Country of Origin\\",\\"langId\\":1},{\\"value\\":\\"بلد المنشأ\\",\\"langId\\":2}]","formSectionFieldid":1306,"formSectionFieldOrder":6,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":5,"formSectionFieldTypeName":"Options","canAdd":true},{"formSectionFieldValue":"","entityFieldId":216,"formSectionFieldNameKey":"Product Name","formSectionFieldName":"[{\\"value\\":\\"Product Name\\",\\"langId\\":1},{\\"value\\":\\"اسم المنتج\\",\\"langId\\":2}]","formSectionFieldid":1307,"formSectionFieldOrder":7,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"formSectionFieldSettings":"","fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":1,"formSectionFieldTypeName":"Text","canAdd":true},{"formSectionFieldValue":"","entityFieldId":5363,"Settings":"","formSectionFieldNameKey":"Other Brand Name","formSectionFieldName":"[{\\"value\\":\\"Other Brand Name\\",\\"langId\\":1},{\\"value\\":\\"Other Brand Name\\",\\"langId\\":2}]","formSectionFieldid":8370,"formSectionFieldOrder":8,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"},{"constraintTypeId":4,"constraintName":"Visible By Value","Settings":"{\\"ControlBy\\":[217],\\"Values\\":\\"\'14\'\\"}"}],"formSectionFieldSettings":"","fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":1,"formSectionFieldTypeName":"Text","canAdd":true},{"formSectionFieldValue":"","entityFieldId":217,"Settings":"{\\"lookupTypeId\\":2310}","formSectionFieldNameKey":"Brand Name","formSectionFieldName":"[{\\"value\\":\\"Brand Name\\",\\"langId\\":1},{\\"value\\":\\"اسم العلامة التجارية\\",\\"langId\\":2}]","formSectionFieldid":1310,"formSectionFieldOrder":9,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":5,"formSectionFieldTypeName":"Options","canAdd":true},{"formSectionFieldValue":"","entityFieldId":218,"Settings":"{\\"lookupTypeId\\":2312}","formSectionFieldNameKey":"Model Name","formSectionFieldName":"[{\\"value\\":\\"Model Name\\",\\"langId\\":1},{\\"value\\":\\"الطراز\\",\\"langId\\":2}]","formSectionFieldid":1311,"formSectionFieldOrder":10,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"},{"constraintTypeId":3,"constraintName":"Cascading Load","Settings":"{\\"Cascaded\\":[217]}"}],"formSectionFieldSettings":"","fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":5,"formSectionFieldTypeName":"Options","canAdd":true},{"formSectionFieldValue":"","entityFieldId":5336,"Settings":"","formSectionFieldNameKey":"Other Model Name","formSectionFieldName":"[{\\"value\\":\\"Other Model Name\\",\\"langId\\":1},{\\"value\\":\\"الطراز\\",\\"langId\\":2}]","formSectionFieldid":8318,"formSectionFieldOrder":11,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"},{"constraintTypeId":4,"constraintName":"Visible By Value","Settings":"{\\"ControlBy\\":[218],\\"Values\\":\\"\'71\'\\"}"}],"formSectionFieldSettings":"","fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":1,"formSectionFieldTypeName":"Text","canAdd":true}]}]},{"formId":4231,"formNameKey":"Service Fees","formMode":2,"formOrder":6,"EntityId":22,"formName":[{"value":"Service Fees","langId":1},{"value":"رسوم الخدمة","langId":2}],"formSection":[{"formSectionOrder":1,"multipleRecords":"False","formSectionName":[{"value":"Service Fees","langId":1},{"value":"رسوم الخدمة","langId":2}],"formSectionFields":[{"formSectionFieldValue":"","entityFieldId":2683,"Settings":"","formSectionFieldNameKey":"Payments","formSectionFieldName":"[{\\"value\\":\\"Payments\\",\\"langId\\":1},{\\"value\\":\\"Payments\\",\\"langId\\":2}]","formSectionFieldid":4637,"formSectionFieldOrder":1,"constraints":[{"constraintTypeId":1,"constraintName":"Required","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]"}],"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":17,"formSectionFieldTypeName":"Payments","canAdd":true}]}]},{"formId":4232,"formNameKey":"Terms & Conditions","formMode":1,"formOrder":6,"EntityId":22,"formName":[{"value":"Terms & Conditions","langId":1},{"value":"الشروط والأحكام","langId":2}],"formSection":[{"formSectionOrder":1,"multipleRecords":"False","formSectionName":[{"value":"Term and Conditions","langId":1},{"value":"Term and Conditions","langId":2}],"formSectionFields":[{"formSectionFieldValue":"","entityFieldId":2719,"Settings":"","formSectionFieldNameKey":"Drone No Use Info","formSectionFieldName":"[{\\"value\\":\\"<div class=\\\\\\"input-group col-md-9 m-lg\\\\\\"><span class=\\\\\\"txterror ng-binding ng-scope\\\\\\">You can apply for LOC but you are not allowed to operate in UAE.<\\\\/span><\\\\/div>\\",\\"langId\\":1},{\\"value\\":\\"<div class=\\\\\\"input-group col-md-9 m-lg\\\\\\"><span class=\\\\\\"txterror ng-binding ng-scope\\\\\\">You can apply for LOC but you are not allowed to operate in UAE.<\\\\/span><\\\\/div>\\",\\"langId\\":2}]","formSectionFieldid":4709,"formSectionFieldOrder":1,"formSectionFieldSettings":"{\\"hideForProfileServices\\": [1020,1021] }","fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":14,"formSectionFieldTypeName":"Warning","canAdd":true},{"formSectionFieldValue":"","entityFieldId":2685,"Settings":"","formSectionFieldNameKey":"Terms & Conditions","formSectionFieldName":"[{\\"value\\":\\"<ul class=\\\\\\"termCond ng-scope\\\\\\">\\\\n<li class=\\\\\\"ng-binding\\\\\\"><span style=\\\\\\"font-size: 14pt;\\\\\\">This is a legally enforceable agreement. The terms and conditions below state the responsibilities of the applicant\\\\/client expecting to be certified under the Emirates Conformity Assessment \\\\/Emirates Quality Mark Scheme\\\\/any other certification schemes (such as GMark and IECEE) and the responsibilities of MOIAT. This shall be read, understood, and accepted by the applicant as an initial step for product certification.<\\\\/span><\\\\/li>\\\\n<li class=\\\\\\"ng-binding\\\\\\"><span style=\\\\\\"font-size: 14pt;\\\\\\">The application shall be completely filled up with accurate information.<\\\\/span><\\\\/li>\\\\n<li class=\\\\\\"ng-binding\\\\\\"><span style=\\\\\\"font-size: 14pt;\\\\\\">The application shall be signed by Top management or authorized person in the client organization as mentioned in the application.<\\\\/span><\\\\/li>\\\\n<li class=\\\\\\"ng-binding\\\\\\"><span style=\\\\\\"font-size: 14pt;\\\\\\">The client should pay the exact amount as stated in the cost bill, Fees payed will not be refundable.<\\\\/span><\\\\/li>\\\\n<\\\\/ul>\\\\n<h3><strong><span class=\\\\\\"ng-binding\\\\\\">Certificate Agreement<\\\\/span><\\\\/strong><\\\\/h3>\\",\\"langId\\":1},{\\"value\\":\\"<ul class=\\\\\\"termCond ng-scope\\\\\\">\\\\n<li class=\\\\\\"ng-binding\\\\\\"><span style=\\\\\\"font-size: 14pt;\\\\\\">This is a legally enforceable agreement. The terms and conditions below state the responsibilities of the applicant\\\\/client expecting to be certified under the Emirates Conformity Assessment \\\\/Emirates Quality Mark Scheme\\\\/any other certification schemes (such as GMark and IECEE) and the responsibilities of MOIAT. This shall be read, understood, and accepted by the applicant as an initial step for product certification.<\\\\/span><\\\\/li>\\\\n<li class=\\\\\\"ng-binding\\\\\\"><span style=\\\\\\"font-size: 14pt;\\\\\\">The application shall be completely filled up with accurate information.<\\\\/span><\\\\/li>\\\\n<li class=\\\\\\"ng-binding\\\\\\"><span style=\\\\\\"font-size: 14pt;\\\\\\">The application shall be signed by Top management or authorized person in the client organization as mentioned in the application.<\\\\/span><\\\\/li>\\\\n<li class=\\\\\\"ng-binding\\\\\\"><span style=\\\\\\"font-size: 14pt;\\\\\\">The client should pay the exact amount as stated in the cost bill, Fees payed will not be refundable.<\\\\/span><\\\\/li>\\\\n<\\\\/ul>\\\\n<h3><strong><span class=\\\\\\"ng-binding\\\\\\">Certificate Agreement<\\\\/span><\\\\/strong><\\\\/h3>\\",\\"langId\\":2}]","formSectionFieldid":4646,"formSectionFieldOrder":2,"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":11,"formSectionFieldTypeName":"TermsCondition","canAdd":true}]}]},{"formId":4229,"formNameKey":"Attachments Individual/Professional","formMode":1,"formOrder":9,"EntityId":22,"formName":[{"value":"Attachments","langId":1},{"value":"المرفقات","langId":2}],"formSection":[{"formSectionOrder":1,"multipleRecords":"False","formSectionName":[{"value":"Attachments","langId":1},{"value":"المرفقات","langId":2}],"FormSectionAttachments":[{"FormSectionAttachmentId":2320,"FormSectionAttachmentOrderNumber":3,"AttachmentId":1160,"Settings":"","AttachmentTypeId":12,"FieldModeId":1,"AttachmentFiles":[{"id":3675,"AttachmentId":1160,"FileName":"document01.pdf","Extension":".pdf","Size":54836,"MimeType":"application/pdf"},{"id":3677,"AttachmentId":1160,"FileName":"document01.pdf","Extension":".pdf","Size":54836,"MimeType":"application/pdf"}],"constraints":[{"constraintTypeId":1,"typeName":"Required","Settings":"","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]","attachmentLabels":"[{\\"value\\":\\"Field is required\\",\\"langId\\":1},{\\"value\\":\\"الحقل مطلوب\\",\\"langId\\":2}]"}],"attachmentName":[{"value":"Drone Instruction Manual","langId":1},{"value":"دليل الإرشادات","langId":2}]},{"FormSectionAttachmentId":2344,"FormSectionAttachmentOrderNumber":4,"AttachmentId":1172,"Settings":"","AttachmentTypeId":14,"FieldModeId":1,"constraints":[{"constraintTypeId":1,"typeName":"Required","Settings":"","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]","attachmentLabels":"[{\\"value\\":\\"Field is required\\",\\"langId\\":1},{\\"value\\":\\"الحقل مطلوب\\",\\"langId\\":2}]"}],"attachmentName":[{"value":"Device Serial Number Picture","langId":1},{"value":"Device Serial Number Picture","langId":2}]}]},{"formSectionOrder":2,"multipleRecords":"False","formSectionName":[{"value":"Device Pictures","langId":1},{"value":"Device Pictures","langId":2}],"formSectionFields":[{"formSectionFieldValue":"","entityFieldId":2717,"Settings":"","formSectionFieldNameKey":"Device Picture Information","formSectionFieldName":"[{\\"value\\":\\"<p>Please upload all the picture for drones for example, Front, Back, Bottom etc.<\\\\/p>\\",\\"langId\\":1},{\\"value\\":\\"<p>Please upload all the picture for drones for example, Front, Back, Bottom etc.<\\\\/p>\\",\\"langId\\":2}]","formSectionFieldid":4710,"formSectionFieldOrder":1,"fieldModeId":1,"showOnMainForm":"Hide","fieldTypeId":6,"formSectionFieldTypeName":"Information","canAdd":true}],"FormSectionAttachments":[{"FormSectionAttachmentId":2367,"FormSectionAttachmentOrderNumber":1,"AttachmentId":1177,"AttachmentTypeId":14,"FieldModeId":1,"constraints":[{"constraintTypeId":1,"typeName":"Required","Settings":"","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]","attachmentLabels":"[{\\"value\\":\\"Field is required\\",\\"langId\\":1},{\\"value\\":\\"الحقل مطلوب\\",\\"langId\\":2}]"}],"attachmentName":[{"value":"Drone Front Photo","langId":1},{"value":"Drone Front Photo","langId":2}],"FileTemplates":[{"id":14,"AttachmentId":1177,"FileName":"Front-View.png","Extension":"image/png","Size":6082,"MimeType":"files"}]},{"FormSectionAttachmentId":2369,"FormSectionAttachmentOrderNumber":3,"AttachmentId":1179,"AttachmentTypeId":14,"FieldModeId":1,"constraints":[{"constraintTypeId":1,"typeName":"Required","Settings":"","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]","attachmentLabels":"[{\\"value\\":\\"Field is required\\",\\"langId\\":1},{\\"value\\":\\"الحقل مطلوب\\",\\"langId\\":2}]"}],"attachmentName":[{"value":"Drone Top View","langId":1},{"value":"Drone Top View","langId":2}],"FileTemplates":[{"id":20,"AttachmentId":1179,"FileName":"Top-View.png","Extension":"image/png","Size":50242,"MimeType":"files"}]},{"FormSectionAttachmentId":2372,"FormSectionAttachmentOrderNumber":4,"AttachmentId":1180,"AttachmentTypeId":14,"FieldModeId":1,"constraints":[{"constraintTypeId":1,"typeName":"Required","Settings":"","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]","attachmentLabels":"[{\\"value\\":\\"Field is required\\",\\"langId\\":1},{\\"value\\":\\"الحقل مطلوب\\",\\"langId\\":2}]"}],"attachmentName":[{"value":"Drone Serial No","langId":1},{"value":"Drone Serial No","langId":2}],"FileTemplates":[{"id":21,"AttachmentId":1180,"FileName":"Serial-No.png","Extension":"image/png","Size":82245,"MimeType":"files"}]},{"FormSectionAttachmentId":2368,"FormSectionAttachmentOrderNumber":5,"AttachmentId":1178,"AttachmentTypeId":14,"FieldModeId":1,"AttachmentFiles":[{"id":3678,"AttachmentId":1178,"FileName":"document01.pdf","Extension":".pdf","Size":54836,"MimeType":"application/pdf"}],"constraints":[{"constraintTypeId":1,"typeName":"Required","Settings":"","textMessages":"[{\\"langId\\":1,\\"value\\":\\"Field is required\\"},{\\"langId\\":2,\\"value\\":\\"الحقل إلزامي\\"}]","attachmentLabels":"[{\\"value\\":\\"Field is required\\",\\"langId\\":1},{\\"value\\":\\"الحقل مطلوب\\",\\"langId\\":2}]"}],"attachmentName":[{"value":"Drone Side View","langId":1},{"value":"Drone Side View","langId":2}],"FileTemplates":[{"id":19,"AttachmentId":1178,"FileName":"Side-View.png","Extension":"image/png","Size":4469,"MimeType":"files"}]}]}]}]',
  serviceId: 10,
  serviceName:
    '[{"value":"Issue Product Status Statement for Drone","langId":1},{"value":"إصدار بيان حالة المنتج للطائرة بدون طيار","langId":2}]',
  requestedServiceId: 10,
  requestedServiceName:
    '[{"value":"Issue Product Status Statement for Drone","langId":1},{"value":"إصدار بيان حالة المنتج للطائرة بدون طيار","langId":2}]',
  isServiceProfile: 'false',
  actions:
    '[{"stageActionId":91,"stageOrder":1,"stageActionTypeName":"Save","stageActionTypeId":1,"StageActionName":"[{\\"value\\":\\"Save Draft\\",\\"langId\\":1},{\\"value\\":\\"حفظ مسودة\\",\\"langId\\":2}]","Settings":"","DestinationStages":"[{\\"DestinationStageId\\":51,\\"DestinationStageName\\":\\"Fill Application\\",\\"DestinationStageTranslations\\":[{\\"value\\":\\"Fill Application\\",\\"langId\\":1},{\\"value\\":\\"تعبئة البيانات\\",\\"langId\\":2}]}]","ValidateForm":false,"IsGeneralAction":false},{"stageActionId":2793,"stageOrder":4,"stageActionTypeName":"Pay","stageActionTypeId":3,"StageActionName":"[{\\"value\\":\\"Submit & Pay\\",\\"langId\\":1},{\\"value\\":\\"التقديم و الدفع\\",\\"langId\\":2}]","Settings":"{\\n    \\"HappinessMeter\\": true,\\n    \\"KhadamatiSequence\\": \\"[114,30,005,000]\\"\\n}","DestinationStages":"[{\\"DestinationStageId\\":2373,\\"DestinationStageName\\":\\"Conformity Engineer Review\\",\\"DestinationStageTranslations\\":[{\\"value\\":\\"Conformity Engineer Review\\",\\"langId\\":1},{\\"value\\":\\"مراجعة مهندس المطابقة\\",\\"langId\\":2}]}]","ValidateForm":true,"IsGeneralAction":false}]',
  happinessMeterKey: 'development',
  serviceSettings:
    '{\n\t"KhadamatiSequence": "114-30-005-000",\n\t"appNumber": "D{{:yy}}-{{:MM}}-{{:AppCounter}}",\n\t"appCounterPadding": "000000",\n\t"resetYearly": true,\n\t"viewActionUrls": [{\n\t\t"lang": "en",\n\t\t"url": "https://moiat.gov.ae/en/services/issue-product-status-statement-for-drones"\n\t}, {\n\t\t"lang": "ar",\n\t\t"url": "https://moiat.gov.ae/ar/services/issue-product-status-statement-for-drones"\n\t}],\n\t"MainSectorId": 3,\n\t"MainServiceId": 29,\n\t"TargetServiceTimeMinutes": 7200,\n\t"OldPrefix": "C9",\n\t"ServiceInstructions": [{\n\t\t"value": "Drones Professional Company",\n\t\t"langId": 1\n\t}, {\n\t\t"value": "Drones Professional Company",\n\t\t"langId": 2\n\t}]\n}',
  percentCompleted: 100,
  currentStatusId: 1,
  currentStatusName:
    '[{"value":"Pending","langId":1},{"value":"غير مكتمل","langId":2}]',
  profileEntityId: 1032,
};

export default services;

// // بعد تنفيذ الطلب
// handelExecuteResponse(response, stageActionId, stageActionTypeId, actionSettings, params) {
//   if (response && response?.executeActionResult?.status == 200) {
//     //if error list then show custom error pop up
//     if (response.executeActionResult?.errorsList) {
//       let customErros = response.executeActionResult.errorsList
//         ? (typeof (response.executeActionResult.errorsList) == "string" ? JSON.parse(response.executeActionResult.errorsList) : response.executeActionResult.errorsList)
//         : [];
//       this.showCustomError(customErros);
//       this.loader = false;
//     } else {
//       this.printContents = "";
//       //action setting for reload = actionSettings
//       let stageActionSetting = actionSettings ? JSON.parse(actionSettings) : "";
//       if (stageActionSetting && stageActionSetting?.reloadApplication == true) {
//         //Purchase standard then remove cartItems
//         if (params.serviceId == 1050) {
//           localStorage.removeItem('cartItems');
//           this.shoppingCartService.cartChange.next('');
//         }
//         if (this.path == 'new') {
//           this.loader = false;
//           this.applicationId = response.executeActionResult.applicationId;
//           this.router.navigate(['/application/view/' + response.executeActionResult.applicationId]);
//           return false;
//         } else {
//           this.loader = false;
//           // this.location.replaceState('/application/view/'+this.applicationId);
//           // this.router.navigate(['/application/view/' + this.applicationId]);
//           window.location.reload();
//         }
//       } else {
//         if (response?.executeActionResult?.currentAppStageExists == 'false') {
//           this.openInvalidStageMessage()
//         } else {
//           //purchase standard then remove cart items
//           if (params.serviceId == 1050) {
//             localStorage.removeItem('cartItems');
//             this.shoppingCartService.cartChange.next('');
//           }
//           this.showCustomError([]);
//           this.isButtonPress = true;
//           if (
//             stageActionTypeId != StageActionType.save &&
//             stageActionTypeId != StageActionType.pay && stageActionTypeId != StageActionType.notes && stageActionTypeId != StageActionType.sendEmail
//           ) {
//             this.service.notify(
//               'success',
//               this.successText,
//               response.successMessage
//             );
//             if (this.path == 'new') {
//               this.applicationId = response.executeActionResult.applicationId;
//               //this.router.navigate(['/application/view',+this.applicationId]);
//             }
//             //nevigate to result page
//             let appData = {
//               appId: this.applicationId,
//               actionId: stageActionId,
//               stageActionTypeId: stageActionTypeId,
//               stageActionSetting: actionSettings,
//               serviceSettings: this.applicationFormData.serviceSettings,
//               happinessMeterKey: this.applicationFormData.happinessMeterKey,
//               paymentRedirectURL: response.executeActionResult?.redirectURL,
//               applicationNumber: this.applicationFormData.applicationNumber,
//               appRefNumber: response.executeActionResult.applicationNumber
//             };
//             this.loader = false;
//             sessionStorage.setItem('appdata', JSON.stringify(appData));
//             //stage action download
//             if (stageActionTypeId == StageActionType.downloadAction) {
//               if (response.executeActionResult?.fileContents && response.executeActionResult?.fileName) {
//                 let fileBytesArray = Utils.base64ToArrayBuffer(response.executeActionResult?.fileContents);
//                 Utils.saveFile(response.executeActionResult?.fileName + ".xlsx", '', fileBytesArray);
//               } else {
//                 this.router.navigate(['/application/result']);
//               }
//             } else {
//               if (response.executeActionResult?.printContent) {
//                 this.printContents = response.executeActionResult.printContent;
//                 this.printContentModal = true;
//                 setTimeout(() => {
//                   this.printContentsData();
//                 }, 100);
//               } else {
//                 if (this.customApplicationForm) {
//                   //MITE ServiceId 1120
//                   if(this.customServiceId == CustomServicesConstant.MiteForumService){
//                     this.router.navigate(['/custom/mite-thankyou']);
//                   }else if(this.customServiceId == CustomServicesConstant.UAECTEForumService){
//                     this.router.navigate(['/custom/uaecte-forum-thankyou']);
//                   }
//                   else if(this.customServiceId == CustomServicesConstant.ICVDayService){
//                     this.router.navigate(['/custom/icv-day-thankyou']);
//                   }
//                   else{
//                     if(this.router.url.includes('customer-support')){
//                       this.router.navigate(['/custom/custom-support-thankyou']);
//                     }else{
//                       this.router.navigate(['/custom/il-census-thankyou']);
//                     }
//                   }
//                 } else {
//                   this.router.navigate(['/application/result']);
//                 }
//               }
//             }
//           } else if (stageActionTypeId == StageActionType.pay) {

//             //Check payment type action setting-> for redirect to custom payment page
//             let isPaymentLinkSetting = actionSettings ? JSON.parse(actionSettings) : "";
//             if(isPaymentLinkSetting && isPaymentLinkSetting?.GeneratePaymentLink){
//               this.loader = false;
//               this.router.navigate([
//                 '/custom/paymentlink',
//                 response?.executeActionResult?.orderNumber,
//               ]);
//             }else{
//               //=====For payment response======//
//               let messageError;
//               if (
//                 response?.executeActionResult?.message == 'New' ||
//                 response?.executeActionResult?.message == 'Failed'
//               ) {
//                 if (response?.executeActionResult?.errorID > 0) {
//                   this.loader = false;
//                   this.service.notify(
//                     'error',
//                     this.errorText,
//                     this.errorText +
//                     ':' + response?.executeActionResult.errorMessage + " " +
//                     response?.executeActionResult?.errorID
//                   );
//                 } else {
//                   this.loader = false;
//                   if (response?.executeActionResult?.redirectURL != null) {

//                     window.open(
//                       response?.executeActionResult?.redirectURL,
//                       '_self'
//                     );
//                   } else {
//                     this.loader = false;
//                     this.service.notify(
//                       'error',
//                       this.errorText,
//                       this.errorText +
//                       ':' +
//                       response?.executeActionResult?.errorID
//                     );
//                   }
//                 }
//               } else {
//                 this.loader = false;
//                 if (response?.executeActionResult?.message == 'Pending') {
//                   messageError = this.resources.find(
//                     (x) =>
//                       x.category.toLowerCase() == 'alerts' &&
//                       x.key.toLowerCase() == 'transactionpending'
//                   );
//                   this.service.notify(
//                     'error',
//                     this.errorText,
//                     messageError.value
//                   );
//                   // this.location.back();
//                 } else if (response?.executeActionResult?.message == 'Paid') {
//                   messageError = this.resources.find(
//                     (x) =>
//                       x.category.toLowerCase() == 'alerts' &&
//                       x.key.toLowerCase() == 'transactionpaid'
//                   );
//                   this.service.notify(
//                     'error',
//                     this.errorText,
//                     messageError.value
//                   );
//                   this.router.navigate([
//                     '/payment/receipt',
//                     response?.executeActionResult?.orderNumber,
//                   ]);
//                 } else {
//                   this.loader = false;
//                   this.service.notify(
//                     'error',
//                     this.errorText,
//                     this.errorText +
//                     ':' +
//                     response?.executeActionResult?.errorID
//                   );
//                 }
//               }
//             }
//           } else if (stageActionTypeId == StageActionType.sendEmail) {
//             this.loader = false;
//             this.service.notify(
//               'success',
//               this.successText,
//               response.successMessage
//             );
//           } else {
//             this.loader = false;
//             if (response.executeActionResult?.printContent) {
//               this.printContents = response.executeActionResult.printContent;
//               this.printContentModal = true;
//               setTimeout(() => {
//                 this.printContentsData();
//               }, 100);
//             } else {
//               if (this.path == 'new' || this.customApplicationForm) {
//                 this.showAppplicationNoModal = true;
//                 this.applicationId = response.executeActionResult.applicationId;
//                 this.newApplicationNumber = response.executeActionResult.applicationNumber;
//               }
//             }
//             this.service.notify(
//               'success',
//               this.successText,
//               response.successMessage
//             );
//           }
//         }
//       }
//     }
//   } else {
//     this.loader = false;
//     if (response.executeActionResult?.errorsList) {
//       let customErros = response.executeActionResult.errorsList
//         ? (typeof (response.executeActionResult.errorsList) == "string" ? JSON.parse(response.executeActionResult.errorsList) : response.executeActionResult.errorsList)
//         : [];
//       this.showCustomError(customErros);
//     }
//   }
// }
