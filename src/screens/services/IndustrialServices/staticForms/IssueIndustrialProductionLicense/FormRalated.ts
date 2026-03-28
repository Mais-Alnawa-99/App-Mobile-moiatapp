import * as Yup from 'yup';

const englishRegex = /^[a-zA-Z0-9 #*()+.,\"\\/&':-]+$/;
const arabicRegex = /^[\u0600-\u06FF0-9 #*()+.,\"\\/&':-]+$/;
const emiratesIdRegex = /^784-[0-9]{4}-[0-9]{7}-[0-9]{1}$/;
const numberRegex = /^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/;
const sharePercentRegex = /^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/;

const conditionCheck = parent => {
  const {LegalEntity, DoYouHaveManager} = parent;
  return (
    (LegalEntity?.isManager === 'Y' &&
      LegalEntity?.showDoYouHaveManager === 'N') ||
    (LegalEntity?.showDoYouHaveManager === 'Y' && DoYouHaveManager?.value) ||
    Object.keys(LegalEntity || {}).length === 0
  );
};

export const FormSchema = t =>
  Yup.object().shape({
    Emirate: Yup.object()
      .required(t('Required'))
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      ),
    LocalAuthority: Yup.object()
      .required(t('Required'))
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      ), //'الجهة المرخصة مطلوبة'),
    LocalIndustrialLicenseNumber: Yup.string().required(
      'رقم الرخصة الصناعية مطلوب',
    ),
    LocalIndustrialLicenseIssueDate: Yup.date()
      .typeError(t('Required'))
      .required(t('Required')),
    LocalIndustrialLicenseExpiryDate: Yup.date()
      .typeError(t('Required'))
      .required(t('Required')),
    TradeNameEn: Yup.string()
      .matches(/^[a-zA-Z0-9 .,&'\-]+$/, t('OnlyEnglishAllowed'))
      .max(512)
      .required(t('Required')),

    TradeNameAr: Yup.string()
      .matches(/^[\u0600-\u06FF0-9 .،&'\-]+$/, t('OnlyArabicAllowed'))
      .max(512)
      .required(t('Required')),

    FactoryEmail: Yup.string()
      .matches(/^[\w.\-]+@([\w\-]+\.)+[\w\-]{2,}$/, t('EmailFormatInvalid'))
      .required(t('EmailRequired')),

    LegalEntity: Yup.object()
      .test(
        'is-not-empty',
        t('LegalEntityRequired'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('LegalEntityRequired')),

    DoYouHaveManager: Yup.object().when(
      ['LegalEntity'],
      (legalEntity, schema) => {
        if (legalEntity?.showDoYouHaveManager === 'Y') {
          return schema
            .test(
              'is-not-empty',
              t('IL.DoYouHaveManagerRequired'),
              value => value && Object.keys(value).length > 0,
            )
            .required(t('IL.DoYouHaveManagerRequired'));
        }
        return schema.notRequired();
      },
    ),

    FactoryCity: Yup.object()
      .required(t('Required'))
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      ),
    Area: Yup.object()
      .required(t('Required'))
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      ),
    Address: Yup.string().required(t('AddressRequired')),

    FactoryArea: Yup.string()
      .matches(/^\d+(\.\d+)?$/, t('NumericOnly'))
      .required(t('FactoryAreaRequired')),

    PhoneNumber: Yup.string()
      .matches(
        /^(?:\+971|00971|0)?(?:50|52|54|56|58|2|3|4|6|7|9)-?\d{7}$/,
        t('PhonePatternInvalid'),
      )
      .required(t('PhoneNumberRequired')),

    FactoryLocatorOnline: Yup.string().required(t('MapLocationRequired')),

    TotalCapitalInvestment: Yup.string()
      .matches(/^\d+(\.\d+)?$/, t('NumericOnly'))
      .required(t('CapitalRequired')),
    CopyLocalIndustrialLicense: Yup.array()
      .min(1, t('AtLeastOneAttachment'))
      .of(
        Yup.object({
          base64: Yup.string().required(t('Base64Required')),
        }),
      )
      .required(t('AttachmentsRequired')),

    FactoryManagerName: Yup.string().test({
      name: 'conditional-required',
      test(value, ctx) {
        if (conditionCheck(ctx.parent)) {
          return !!value && value.trim() !== '';
        }
        return true;
      },
      message: t('ValidationRequired'),
    }),
    Nationality: Yup.mixed().test({
      name: 'conditional-required-object',
      test(value, ctx) {
        if (conditionCheck(ctx.parent)) {
          // Check value is an object and has at least one own property key
          return (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            Object.keys(value).length > 0
          );
        }
        return true;
      },
      message: t('Required'),
    }),

    MobileNumber: Yup.string().test({
      name: 'conditional-mobile-validation',
      message: t('ValidationRequired'),
      test(value, ctx) {
        if (conditionCheck(ctx.parent)) {
          return !!value && /^05[0-9]-?\d{7}$/.test(value);
        }
        return true;
      },
    }),

    EmailAddress: Yup.string().test({
      name: 'conditional-email-validation',
      message: t('ValidationRequired'),
      test(value, ctx) {
        if (conditionCheck(ctx.parent)) {
          return !!value && /^[\w.\-]+@([\w\-]+\.)+[\w\-]{2,}$/.test(value);
        }
        return true;
      },
    }),

    ManagerGender: Yup.mixed().test({
      name: 'conditional-gender-validation',
      message: t('Required'),
      test(value, ctx) {
        if (conditionCheck(ctx.parent)) {
          return (
            value && typeof value === 'object' && Object.keys(value).length > 0
          );
        }
        return true;
      },
    }),

    ManagerIdentificationExpirationDate: Yup.string().test({
      name: 'conditional-expiration-date-validation',
      message: t('ValidationRequired'),
      test(value, ctx) {
        if (conditionCheck(ctx.parent)) {
          return !!value && value.trim() !== '';
        }
        return true;
      },
    }),

    ManagerIdentificationNumber: Yup.string().test({
      name: 'conditional-manager-id-validation',
      message: t('ValidationRequired'),
      test(value, ctx) {
        if (conditionCheck(ctx.parent)) {
          return !!value && value.trim() !== '';
        }
        return true;
      },
    }),

    ManagerIdentificationCopy: Yup.array()
      .test({
        name: 'conditional-attachment-validation',
        message: t('AtLeastOneAttachment'),
        test(value, ctx) {
          if (conditionCheck(ctx.parent)) {
            return Array.isArray(value) && value.length > 0;
          }
          return true;
        },
      })
      .of(
        Yup.object({
          base64: Yup.string().required(t('Base64Required')),
        }),
      ),
    Activities: Yup.array()
      .min(1, t('AtLeastOneItem'))
      .required(t('AtLeastOneItem')),
    Employees: Yup.array()
      .min(1, t('AtLeastOneItem'))
      .required(t('AtLeastOneItem')),
    numberofEmployeesLocal: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),

    numberofEmployeesGCC: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),

    numberofEmployeesForeign: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    Owners: Yup.array()
      .test(
        'owners-required-condition',
        t('AtLeastOneItem'),
        function (Owners) {
          const {LegalEntity, DoYouHaveManager} = this.parent;
          const condition =
            (LegalEntity?.isOwner === 'Y' &&
              LegalEntity?.showDoYouHaveManager === 'N') ||
            (LegalEntity?.showDoYouHaveManager === 'Y' &&
              !DoYouHaveManager?.value) ||
            Object.keys(LegalEntity || {}).length === 0;

          if (condition) {
            return Array.isArray(Owners) && Owners.length >= 1;
          }
          return true;
        },
      )
      .test(
        'owners-contribution-sum',
        t('IL.ContributionMustBe100'),
        function (Owners) {
          const {LegalEntity, DoYouHaveManager} = this.parent;
          const condition =
            (LegalEntity?.isOwner === 'Y' &&
              LegalEntity?.showDoYouHaveManager === 'N') ||
            (LegalEntity?.showDoYouHaveManager === 'Y' &&
              !DoYouHaveManager?.value) ||
            Object.keys(LegalEntity || {}).length === 0;

          if (condition && Array.isArray(Owners) && Owners.length > 0) {
            const total = Owners.reduce(
              (sum, owner) => sum + (Number(owner.CompanyPercentage || owner.PersonPercentage) || 0),
              0,
            );
     
            return total == 100;
          }
          return true;
        },
      ),
    Products: Yup.array()
      .min(1, t('AtLeastOneItem'))
      .required(t('AtLeastOneItem')),
    Machines: Yup.array()
      .min(1, t('AtLeastOneItem'))
      .required(t('AtLeastOneItem')),
    monthlyElectricityConsumptioninKWH: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),

    monthlyElectricityConsumptionChargesinAED: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),

    monthlyWaterConsumptionGallon: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),

    monthlyWaterConsumptionChargesinAED: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    RawMaterials: Yup.array()
      .min(1, t('AtLeastOneItem'))
      .required(t('AtLeastOneItem')),
    annualSales: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    finishedGoodsOpeningStock: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    finishedGoodsClosingStock: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    netProfit: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    wagesandSalaries: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    valueofBuildings: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    depreciationofBuilding: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    valueofMachinery: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    depreciationofMachinery: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    buildingRent: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    rentOfWarehousesForTheFactory: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    rentOfLaborAccommodation: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    valueofLongtermLoans: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    interestPaidofLongterms: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    administrationandGeneralExpenses: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
    patentCost: Yup.string()
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, t('Required'))
      .required(t('Required')),
  });

export const initialValues = {
  Emirate: {},
  LocalAuthority: {},
  LocalIndustrialLicenseNumber: '',
  LocalIndustrialLicenseIssueDate: '',
  LocalIndustrialLicenseExpiryDate: '',
  TradeNameEn: '',
  TradeNameAr: '',
  FactoryEmail: '',
  LegalEntity: {},
  FactoryCity: {},
  Area: {},
  Address: '',
  FactoryWebsite: '',
  FactoryArea: '',
  PhoneNumber: '',
  FactoryLocatorOnline: '',
  TotalCapitalInvestment: '',
  Latitude: '',
  Longitude: '',
  CopyLocalIndustrialLicense: [],
  MemorandumofAssociation: [],
  FactoryManagerName: '',
  Nationality: {},
  MobileNumber: '',
  EmailAddress: '',
  ManagerGender: {},
  ManagerIdentificationExpirationDate:'',
  ManagerIdentificationNumber: '',
  ManagerIdentificationCopy: [],
  annualSales: '',
  numberofEmployeesLocal: '0',
  numberofEmployeesGCC: '0',
  numberofEmployeesForeign: '0',
  totalNumberofEmployees: '0',
  finishedGoodsOpeningStock: '',
  finishedGoodsClosingStock: '',
  netProfit: '',
  wagesandSalaries: '',
  valueofBuildings: '',
  depreciationofBuilding: '',
  valueofMachinery: '',
  depreciationofMachinery: '',
  buildingRent: '',
  rentOfWarehousesForTheFactory: '',
  rentOfLaborAccommodation: '',
  valueofLongtermLoans: '',
  interestPaidofLongterms: '',
  administrationandGeneralExpenses: '',
  patentCost: '',
  Products: [],
  RawMaterials: [],
  ForeignMaterialsCost: [],
  LocalMaterialsCost: [],
  monthlyElectricityConsumptioninKWH: '',
  monthlyElectricityConsumptionChargesinAED: '',
  monthlyWaterConsumptionGallon: '',
  monthlyWaterConsumptionChargesinAED: '',
  monthlyGasConsumptionMMBTU: '',
  monthlyGasConsumptionChargesinAED: '',
  Machines: [],
  DoYouHaveManager: {},
  Owners: [],
  Employees: [],
  Activities: [],
  TotalProductionCost: '0',
  FromMoec: [],
};
