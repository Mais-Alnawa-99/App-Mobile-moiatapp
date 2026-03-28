import * as Yup from 'yup';

const englishRegex = /^[a-zA-Z0-9 #*()+.,\"\\/&':-]+$/;
const arabicRegex = /^[\u0600-\u06FF0-9 #*()+.,\"\\/&':-]+$/;
const emiratesIdRegex = /^784-[0-9]{4}-[0-9]{7}-[0-9]{1}$/;
const numberRegex = /^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/;
const sharePercentRegex = /^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/;

export const OwnerPersonSchema = t =>
  Yup.object().shape({
    PersonName: Yup.string()
      .matches(englishRegex, t('OnlyEnglishAllowed'))
      .required(t('Required')),

    PersonNameArabic: Yup.string()
      .matches(arabicRegex, t('OnlyArabicAllowed'))
      .required(t('Required')),

    Nationality: Yup.string().required(t('Required')),

    PersonEmiratesID: Yup.string()
      .matches(emiratesIdRegex, t('EmiratesIDFormatError'))
      .required(t('Required')),

    PersonPercentage: Yup.string()
      .matches(sharePercentRegex, t('SharePercentageInvalid'))
      .required(t('Required')),

    PersonContributionAmount: Yup.string()
      .matches(numberRegex, t('InvalidNumber'))
      .required(t('Required')),

    OwnerGender: Yup.string().required(t('GenderRequired')),

    PersonEmiratesIdAttachment: Yup.mixed()
      .nullable()
      .when(['IsUAENational', 'OwnerTypeId', 'IsDraft'], {
        is: (isNational, type, draft) =>
          Number(isNational ?? -1) === 1 &&
          Number(type ?? -1) === 1 &&
          Number(draft ?? -1) === 0,
        then: schema => schema.required(t('EmiratesIDCopyRequired')),
        otherwise: schema => schema.notRequired(),
      }),

    PersonPassportAttachment: Yup.mixed()
      .nullable()
      .when(['IsUAENational', 'OwnerTypeId', 'IsDraft'], {
        is: (isNational, type, draft) =>
          Number(isNational ?? -1) === 1 &&
          Number(type ?? -1) === 1 &&
          Number(draft ?? -1) === 0,
        then: schema => schema.required(t('PassportCopyRequired')),
        otherwise: schema => schema.notRequired(),
      }),

    PersonVisaExpatsAttachment: Yup.mixed().nullable(),
  });
