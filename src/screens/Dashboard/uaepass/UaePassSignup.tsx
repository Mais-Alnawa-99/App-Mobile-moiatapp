// screens/CompleteProfile/UaePassSignup.tsx
import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, ScrollView, Alert, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';
import Header from '../../../component/Header';
import Loader from '../../../component/Loader';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import {useTranslation} from 'react-i18next';
import {isArabic} from '../../../locales';
import Input from '../../../component/input/Input';
import PageBg from '../../../component/PageBg';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Page from '../../../component/Page';
import {Buffer} from 'buffer';
import RNFetchBlob from 'rn-fetch-blob';
// ========== IDs الثابتة كما في CompleteProfile.cshtml ==========
const REG = {
  individual: '2046', // أفراد
  customsEmployee: '5136', // موظف الجمارك
  localAuthorityEmployee: '5137', // موظف سلطة محلية
  externalForm: '5139', // نماذج خارجية
  ilCensus: '5138', // استمارة الصناعة
  professional: '5135', // المحترفين
  government: '5140', // جهة حكومية
  organization: '2048', // شركة
};
const RESIDENCE = {
  nonResident: '2053',
};
const UAE_COUNTRY_ID = '824';
// مجموعة الأنواع الخاصة كما في الويب
const SPECIAL_SET = [
  REG.customsEmployee,
  REG.localAuthorityEmployee,
  REG.externalForm,
  REG.ilCensus,
];
// ===== Helpers =====
const mapOptions = (arr?: any[]) =>
  (arr || []).map(o => ({
    label: String(o?.text ?? o?.name ?? o?.label ?? o?.Name ?? o?.Label ?? ''),
    value: String(o?.value ?? o?.id ?? o?.Value ?? o?.Id ?? ''),
  }));
// منطق عرض/إخفاء الهوية الإماراتية والجواز + الإلزام (مطابق للويب)
function getIdentityVisibility(values: any) {
  const reg = String(values.registrationTypeId || '');
  const isSpecial = SPECIAL_SET.includes(reg);
  const isCustomsOrLocal =
    reg === REG.customsEmployee || reg === REG.localAuthorityEmployee;
  // هل حقل حالة الإقامة ظاهر فعليًا وفق منطق الويب؟
  const showResidence =
    reg === REG.individual
      ? !!values.isResidenceStatusVisible
      : isSpecial
      ? false
      : !!values.isResidenceStatusVisible;
  const resVal = String(values.residenceStatusId || '');
  const flags = {
    eVis: !!values.isEmiratesIdNumberVisible,
    eReq: !!values.isEmiratesIdNumberRequired,
    pVis: !!values.isPassportNumberVisible,
    pReq: !!values.isPassportNumberRequired,
  };
  let showEmiratesId = false;
  let reqEmiratesId = false;
  let showPassport = false;
  let reqPassport = false;
  if (!isSpecial) {
    // فروع (فردي / شركة / محترفين / جهة حكومية ...): اتّبع manageResidenceStatus
    if (showResidence) {
      if (resVal) {
        if (resVal === RESIDENCE.nonResident) {
          // غير مقيم => جواز فقط
          showPassport = flags.pVis;
          reqPassport = flags.pReq;
        } else {
          // مقيم => هوية فقط
          showEmiratesId = flags.eVis;
          reqEmiratesId = flags.eReq;
        }
      } else {
        // بدون اختيار => لا نعرض شيئًا
        showEmiratesId = false;
        reqEmiratesId = false;
        showPassport = false;
        reqPassport = false;
      }
    }
  } else {
    // الفروع الخاصة: أخفِ الجواز دائمًا
    showPassport = false;
    reqPassport = false;
    // استثناء الويب: customs/local مع ResidenceStatus فارغة => اعرض الهوية حسب flags
    if (isCustomsOrLocal) {
      showEmiratesId = flags.eVis;
      reqEmiratesId = flags.eReq;
    } else {
      showEmiratesId = false;
      reqEmiratesId = false;
    }
  }
  return {showEmiratesId, reqEmiratesId, showPassport, reqPassport};
}
const V = (flag: any) => flag !== false;
const getBase64FileSize = (base64: string): number => {
  // remove the base64 mime prefix if present (e.g. "data:application/pdf;base64,")
  let cleaned = base64?.split?.(',')?.pop?.() || base64;
  // calculate padding
  let padding = 0;
  if (cleaned?.endsWith?.('==')) padding = 2;
  else if (cleaned?.endsWith?.('=')) padding = 1;
  // calculate size
  const sizeInBytes = (cleaned?.length * 3) / 4 - padding;
  return sizeInBytes ?? 0;
};
// Save base64 to a temporary file
async function base64ToFile(base64: string, filename: string) {
  const path = !!filename && `${RNFetchBlob.fs.dirs.CacheDir}/${filename}`;
  try {
    // Write base64 to temporary file
    if (base64 && path) await RNFetchBlob.fs.writeFile(path, base64, 'base64');
    return path; // return file path
  } catch (err) {
    console.error('base64ToFile error:', err);
    return null;
  }
}
function formatEmiratesId(id: string) {
  // Ensure only digits
  const digits = id.replace(/\D/g, '');
  if (digits.length !== 15) {
    return id; // return as-is if not 15 digits
  }
  // Apply pattern 3-4-7-1
  return (
    digits.slice(0, 3) +
    '-' +
    digits.slice(3, 7) +
    '-' +
    digits.slice(7, 14) +
    '-' +
    digits.slice(14)
  );
}
type YmdOpts = {
  // 'local' يحافظ على اليوم المحلي | 'utc' يستخدم UTC (toISOString)
  mode?: 'local' | 'utc';
};
export function toYMD(
  input: Date | string | null | undefined,
  opts: YmdOpts = {},
) {
  const mode = opts.mode ?? 'local';
  if (!input) return undefined;
  const fmtLocal = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  // 1) Date object
  if (input instanceof Date) {
    return mode === 'utc' ? input.toISOString().slice(0, 10) : fmtLocal(input);
  }
  // 2) String cases
  const s = String(input).trim();
  // "YYYY-MM-DD" جاهز
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  // "YYYY-MM-DDTHH:mm:ss[.sss][Z|±HH:MM]”
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) {
    // إذا ما فيه منطقة زمنية، قص قبل T حتى ما يصير انزياح يوم
    if (!/[Zz]|[+-]\d{2}:\d{2}$/.test(s)) {
      return s.split('T')[0];
    }
    // فيه منطقة زمنية: خلِّ الحسم حسب mode
    const d = new Date(s);
    return mode === 'utc' ? d.toISOString().slice(0, 10) : fmtLocal(d);
  }
  // أي صيغة ثانية يحاول يفسرها Date
  const d = new Date(s);
  if (isNaN(d.getTime())) return undefined;
  return mode === 'utc' ? d.toISOString().slice(0, 10) : fmtLocal(d);
}
export const DEFAULT_AVATAR_FILE_NAME = '__DEFAULT_AVATAR__.png';
export const DEFAULT_AVATAR_PNG_BASE64 =
  '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';

const getFormData = async (obj: any) => {
  const formData = new FormData();
  if (obj?.registrationTypeId)
    formData.append('RegistrationTypeId', obj.registrationTypeId);
  if (obj?.email) formData.append('Email', obj.email);
  if (obj?.companyEmail) formData.append('CompanyEmail', obj.companyEmail);
  if (obj?.fullName) formData.append('FullName', obj.fullName);
  if (obj?.fullNameArabic)
    formData.append('FullNameArabic', obj.fullNameArabic);
  if (obj?.alternativeEmail || obj?.email)
    formData.append('AlternativeEmail', obj?.alternativeEmail || obj?.email);
  if (obj?.phoneNumber) formData.append('PhoneNumber', obj.phoneNumber);
  if (obj?.workPhone || obj?.phoneNumber)
    formData.append('WorkPhone', obj?.workPhone || obj?.phoneNumber);
  if (obj?.company) formData.append('Company', obj.company);
  if (obj?.designation) formData.append('Designation', obj.designation);
  // Dates (strip time)
  const dob = toYMD(obj?.dateOfBirth);
  if (dob) formData.append('DateOfBirth', dob);
  const eExp = toYMD(obj?.emiratesIDExpiryDate);
  if (eExp) formData.append('EmiratesIDExpiryDate', eExp);
  const pExp = toYMD(obj?.passportExpiryDate);
  if (pExp) formData.append('PassportExpiryDate', pExp);
  if (obj?.genderId) formData.append('GenderId', String(obj.genderId));
  if (obj?.countryId) formData.append('CountryId', String(obj.countryId));
  if (obj?.cityId) formData.append('CityId', String(obj.cityId));
  if (obj?.nationalityId)
    formData.append('NationalityId', String(obj.nationalityId));
  if (obj?.languageId) formData.append('LanguageId', String(obj.languageId));
  if (obj?.residenceStatusId)
    formData.append('ResidenceStatusId', String(obj.residenceStatusId));
  const emirateId = obj.emiratesIdNumber
    ? formatEmiratesId(obj.emiratesIdNumber)
    : null;
  if (obj?.emiratesIdNumber)
    formData.append('EmiratesIdNumber', formatEmiratesId(obj.emiratesIdNumber));
  if (obj?.passportNumber)
    formData.append('PassportNumber', obj.passportNumber);
  if (obj?.communicationChannelId)
    formData.append(
      'CommunicationChannelId',
      String(obj.communicationChannelId),
    );
  if (obj?.socialMediaId)
    formData.append('SocialMediaId', String(obj.socialMediaId));
  if (obj?.userTypeId) formData.append('UserTypeId', String(obj.userTypeId));
  if (obj?.avatar?.length > 0) {
    const avatarPath = await base64ToFile(
      obj?.avatar?.[0]?.base64,
      obj?.avatar?.[0]?.name,
    );
    if (avatarPath && avatarPath !== 'h') {
      formData.append('Avatar', {
        uri: 'file://' + avatarPath,
        type: obj?.avatar?.[0]?.type || 'image/png',
        name: obj?.avatar?.[0]?.name || 'default-avatar.png',
      });
    } else {
      console.error('Failed to create avatar file path');
    }
  }
  if (obj?.identificationCopy?.length > 0) {
    const copyPath = await base64ToFile(
      obj?.identificationCopy?.[0]?.base64,
      obj?.identificationCopy?.[0]?.name || 'IdentificationCopy.pdf',
    );
    if (copyPath && copyPath !== 'h') {
      formData.append('IdentificationCopy', {
        uri: 'file://' + copyPath,
        type: obj?.identificationCopy?.[0]?.type || 'application/pdf',
        name: obj?.identificationCopy?.[0]?.name || 'IdentificationCopy.pdf',
      });
    } else {
      console.error('Failed to create identification copy file path');
    }
  }
  if (obj?.question) formData.append('Question', obj.question);
  if (obj?.answer) formData.append('Answer', obj.answer);
  return formData;
};
function buildInitialValues({res, L, params}: any) {
  const init = {
    registrationTypeId: res.registrationTypeId ?? '',
    email: res.email ?? '',
    companyEmail: res.companyEmail ?? '',
    fullName: res.fullName ?? '',
    fullNameArabic: res.fullNameArabic ?? '',
    alternativeEmail: res.alternativeEmail ?? '',
    phoneNumber: res.phoneNumber ?? '',
    workPhone: res.workPhone ?? '',
    company: res.company ?? '',
    designation: res.designation ?? '',
    dateOfBirth: res.dateOfBirth ?? null,
    genderId:
      res.genderId && res.genderId != '1'
        ? res.genderId
        : params.userInfo?.gender === 'Male'
        ? 2049
        : 2050,
    countryId: res.countryId ?? '',
    cityId: res.cityId ?? '',
    nationalityId: res.nationalityId ?? '',
    languageId: res.languageId ?? '',
    residenceStatusId: res.residenceStatusId ?? '',
    createIndividualProfile: res.createIndividualProfile ?? false,
    emiratesIdNumber: res.emiratesIdNumber ?? '',
    emiratesIDExpiryDate: res.emiratesIDExpiryDate ?? null,
    passportNumber: res.passportNumber ?? '',
    passportExpiryDate: res.passportExpiryDate ?? null,
    communicationChannelId: res.communicationChannelId ?? '',
    socialMediaId: res.socialMediaId ?? '',
    userTypeId: res.userTypeId ?? '',
    avatar: !!res.avatarUrl
      ? [
          {
            name: `avatar.${
              res?.avatarUrl?.split?.(';base64,')?.[0]?.split('/')?.[1] || 'png'
            }`,
            type:
              res?.avatarUrl?.split?.(';base64,')?.[0]?.split?.('data:')?.[1] ||
              'image/png',
            isnew: true,
            base64: res?.avatarUrl?.split?.('base64,')?.[1] ?? '',
            size: getBase64FileSize(res?.avatarUrl?.split?.('base64,')?.[1]),
            uri: '',
          },
        ]
      : [
          (() => {
            const cleaned =
              DEFAULT_AVATAR_PNG_BASE64.split(',').pop() ||
              DEFAULT_AVATAR_PNG_BASE64;

            return {
              name: DEFAULT_AVATAR_FILE_NAME, // ✅ this is the key
              size: getBase64FileSize(cleaned),
              type: 'image/png',
              base64: cleaned,
              isnew: true,
              uri: '',
            };
          })(),
        ],
    identificationCopyUrl: res.identificationCopy ?? null,
    identificationCopy: !!res.identificationCopyUrl
      ? [
          {
            name:
              'IdentificationCopy.' +
              res?.identificationCopyUrl
                ?.split?.(';base64,')?.[0]
                ?.split?.('/')?.[1],
            type: res?.identificationCopyUrl
              ?.split(';base64,')?.[0]
              ?.split?.('data:')?.[1],
            isnew: true,
            base64: res?.identificationCopyUrl?.split?.('base64,')?.[1] ?? '',
            size: getBase64FileSize(
              res?.identificationCopyUrl?.split?.('base64,')?.[1],
            ),
          },
        ]
      : [],
    twoFactorEnabled: !res.twoFactorEnabled
      ? false
      : !!res.twoFactorEnabled && res.twoFactorEnabled == 'No'
      ? false
      : true,
    question: res.question ?? '',
    answer: res.answer ?? '',
    // toggle بريد الشركة فقط
    communicateOnCompanyEmailOnly: !!res.communicateOnCompanyEmailOnly,
    // ====== flags من الـ CSHTML ======
    isRegistrationTypeVisible: V(res.isRegistrationTypeVisible),
    isDateOfBirthRequired: !!res.isDateOfBirthRequired,
    isDateOfBirthVisible: V(res.isDateOfBirthVisible),
    isCompanyRequired: !!res.isCompanyRequired,
    isCompanyVisible: V(res.isCompanyVisible),
    isCompanyEmailRequired: !!res.isCompanyEmailRequired,
    isCompanyEmailVisible: V(res.isCompanyEmailVisible),
    isCountryRequired: !!res.isCountryRequired,
    isCountryVisible: V(res.isCountryVisible),
    isResidenceStatusRequired: !!res.isResidenceStatusRequired,
    isResidenceStatusVisible: V(res.isResidenceStatusVisible),
    isPassportNumberRequired: !!res.isPassportNumberRequired,
    isPassportNumberVisible: V(res.isPassportNumberVisible),
    isCommunicationChannelRequired: !!res.isCommunicationChannelRequired,
    isCommunicationChannelVisible: V(res.isCommunicationChannelVisible),
    isSocialMediaRequired: !!res.isSocialMediaRequired,
    isSocialMediaVisible: V(res.isSocialMediaVisible),
    isUserTypeRequired: !!res.isUserTypeRequired,
    isUserTypeVisible: V(res.isUserTypeVisible),
    isAvatarRequired: !!res.isAvatarRequired,
    isAvatarVisible: V(res.isAvatarVisible),
    isIdentificationCopyRequired: !!res.isIdentificationCopyRequired,
    isIdentificationCopyVisible: V(res.isIdentificationCopyVisible),
    isEmiratesIdNumberRequired: !!res.isEmiratesIdNumberRequired,
    isEmiratesIdNumberVisible: V(res.isEmiratesIdNumberVisible),
    isFullNameArabicVisible: V(res.isFullNameArabicVisible),
    isFullNameArabicRequired: !!res.isFullNameArabicRequired,
    isAlternativeEmailVisible: V(res.isAlternativeEmailVisible),
    isAlternativeEmailRequired: !!res.isAlternativeEmailRequired,
    isWorkPhoneVisible: V(res.isWorkPhoneVisible),
    isWorkPhoneRequired: !!res.isWorkPhoneRequired,
    isDesignationVisible: V(res.isDesignationVisible),
    isDesignationRequired: !!res.isDesignationRequired,
    isGenderVisible: V(res.isGenderVisible),
    isGenderRequired: !!res.isGenderRequired,
    isNationalityVisible: V(res.isNationalityVisible),
    isNationalityRequired: !!res.isNationalityRequired,
    isLanguageVisible: V(res.isLanguageVisible),
    isLanguageRequired: !!res.isLanguageRequired,
    isCityVisible: V(res.isCityVisible),
    isCityRequired: !!res.isCityRequired,
    isTwoFactorEnabledVisible: V(res.isTwoFactorEnabledVisible),
  };
  return init;
}
// thunks
import {
  GetCompleteProfile,
  saveProfile,
  getSsoToken,
  GetSSOLookupData,
} from '../../../redux/reducers/I-Services/thunk/sso';
import ILAttachmentUpload from '../../../component/attachment/ILAttachmentUpload';
import {completeProfile} from './CompleteProfileForm';
import {_openModal} from '../../services/Eservices/ServiceForm';
import NavigationService from '../../../navigation/NavigationService';
import {setUserILID} from '../../../redux/reducers/User/userILData';
import {setAuthenticated} from '../../../redux/reducers/General/securityAuth';
import {setAuthValues, setUserName} from '../../../redux/reducers/User/startup';
import {setSelectedService} from '../../../redux/reducers/Services/slice/selectedService';
import {setLoadingModal} from '../../../redux/reducers/General/loader';
export default function UaePassSignup(props: any): JSX.Element {
  const params = props.route?.params;
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {item} = useAppSelector(store => store.services.selectedService);
  const L = (k: string) => t(`CompleteProfile.${k}`);
  const hasFile = (v: any) =>
    Array.isArray(v) ? v.length > 0 : v != null && v !== '';
  const validationSchema = Yup.object().shape({
    // أساسية
    email: Yup.string().email('صيغة البريد غير صحيحة').required(t('Required')),
    fullName: Yup.string().required(t('Required')),
    phoneNumber: Yup.string().required(t('Required')),
    registrationTypeId: Yup.string().required(t('Required')),
    // بريد الشركة (إلزامي فقط إذا ظاهر + مفعّل "التواصل عبر بريد الشركة فقط")
    companyEmail: Yup.string()
      .nullable()
      .email('صيغة البريد غير صحيحة')
      .when(
        [
          'registrationTypeId',
          'isCompanyEmailVisible',
          'isCompanyEmailRequired',
          'communicateOnCompanyEmailOnly',
        ],
        (vals: any[], schema: any) => {
          const [reg, vis, req, companyOnly] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const individual = String(reg || '') === REG.individual;
          const mustShow = !individual && !special && !!vis;
          return mustShow && !!companyOnly && !!req
            ? schema.required(t('Required'))
            : schema;
        },
      ),
    // اسم عربي (إذا اللغة=2055 والفلاغات)
    fullNameArabic: Yup.string()
      .nullable()
      .when(
        ['languageId', 'isFullNameArabicVisible', 'isFullNameArabicRequired'],
        (vals: any[], schema: any) => {
          const [lang, vis, req] = vals || [];
          const isArabicLang = String(lang || '') === '2055';
          return isArabicLang && !!vis && !!req
            ? schema.required(t('Required'))
            : schema;
        },
      ),
    alternativeEmail: Yup.string()
      .nullable()
      .email('صيغة البريد غير صحيحة')
      .when(
        [
          'communicationChannelId',
          'isAlternativeEmailVisible',
          'isAlternativeEmailRequired',
          'communicateOnCompanyEmailOnly',
        ],
        (vals: any[], schema: any) => {
          const [ch, vis, req, companyOnly] = vals || [];
          const needAlt =
            String(ch || '') === '5141' && !!vis && !companyOnly && !!req;
          return needAlt ? schema.required(t('Required')) : schema;
        },
      ),
    workPhone: Yup.string()
      .nullable()
      .when(
        ['isWorkPhoneVisible', 'isWorkPhoneRequired'],
        (vals: any[], s: any) =>
          !!vals?.[0] && !!vals?.[1] ? s.required(t('Required')) : s,
      ),
    designation: Yup.string()
      .nullable()
      .when(
        ['isDesignationVisible', 'isDesignationRequired'],
        (vals: any[], s: any) =>
          !!vals?.[0] && !!vals?.[1] ? s.required(t('Required')) : s,
      ),
    // تاريخ الميلاد
    dateOfBirth: Yup.mixed()
      .nullable()
      .when(
        ['registrationTypeId', 'isDateOfBirthVisible', 'isDateOfBirthRequired'],
        (vals: any[], schema: any) => {
          const [reg, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          if (special) return schema; // مخفي بالويب
          return !!vis && !!req ? schema.required(t('Required')) : schema;
        },
      ),
    // الشركة
    company: Yup.string()
      .nullable()
      .when(
        ['registrationTypeId', 'isCompanyVisible', 'isCompanyRequired'],
        (vals: any[], schema: any) => {
          const [reg, vis, req] = vals || [];
          const individual = String(reg || '') === REG.individual;
          const special = SPECIAL_SET.includes(String(reg || ''));
          const mustShow = !individual && !special && !!vis;
          return mustShow && !!req ? schema.required(t('Required')) : schema;
        },
      ),
    // الدولة والمدينة
    countryId: Yup.string()
      .nullable()
      .when(
        ['registrationTypeId', 'isCountryVisible', 'isCountryRequired'],
        (vals: any[], schema: any) => {
          const [reg, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const mustShow = !special && !!vis;
          return mustShow && !!req ? schema.required(t('Required')) : schema;
        },
      ),
    cityId: Yup.string()
      .nullable()
      .when(
        ['registrationTypeId', 'countryId', 'isCityVisible', 'isCityRequired'],
        (vals: any[], schema: any) => {
          const [reg, country, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const inUAE = String(country || '') === UAE_COUNTRY_ID;
          const mustShow = !special && !!vis && inUAE;
          return mustShow && !!req ? schema.required(t('Required')) : schema;
        },
      ),
    // الجنسية / اللغة
    nationalityId: Yup.string()
      .nullable()
      .when(
        ['isNationalityVisible', 'isNationalityRequired'],
        (vals: any[], s: any) =>
          !!vals?.[0] && !!vals?.[1] ? s.required(t('Required')) : s,
      ),
    languageId: Yup.string()
      .nullable()
      .when(
        ['isLanguageVisible', 'isLanguageRequired'],
        (vals: any[], s: any) =>
          !!vals?.[0] && !!vals?.[1] ? s.required(t('Required')) : s,
      ),
    // حالة الإقامة
    residenceStatusId: Yup.string()
      .nullable()
      .when(
        [
          'registrationTypeId',
          'isResidenceStatusVisible',
          'isResidenceStatusRequired',
        ],
        (vals: any[], schema: any) => {
          const [reg, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const mustShow = !special && !!vis;
          return mustShow && !!req ? schema.required(t('Required')) : schema;
        },
      ),
    // الهوية الإماراتية (الرقم + تاريخ الانتهاء)
    emiratesIdNumber: Yup.string()
      .nullable()
      .test(
        'len15',
        'رقم الهوية يجب أن يكون 15 رقمًا',
        v => !v || String(v).replace(/\D+/g, '').length === 15,
      )
      .when(
        [
          'registrationTypeId',
          'residenceStatusId',
          'isResidenceStatusVisible',
          'isEmiratesIdNumberVisible',
          'isEmiratesIdNumberRequired',
        ],
        (vals: any[], schema: any) => {
          const [reg, resStat, resVis, eVis, eReq] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const isCustomsOrLocal =
            String(reg || '') === REG.customsEmployee ||
            String(reg || '') === REG.localAuthorityEmployee;
          // فروع خاصة:
          if (special) {
            // customs/local فقط مع ResidenceStatus فارغة => طبق flags
            if (isCustomsOrLocal && !resStat && !!eVis && !!eReq) {
              return schema.required(t('Required'));
            }
            return schema; // غير ذلك مخفي
          }
          // فروع غير خاصة + حالة الإقامة ظاهرة
          if (!!resVis) {
            if (!resStat) return schema; // غير مختارة => غير مطلوب
            if (String(resStat) !== RESIDENCE.nonResident) {
              // مقيم => الهوية فقط
              return !!eVis && !!eReq ? schema.required(t('Required')) : schema;
            }
          }
          return schema;
        },
      ),
    emiratesIDExpiryDate: Yup.mixed()
      .nullable()
      .when(
        [
          'registrationTypeId',
          'residenceStatusId',
          'isResidenceStatusVisible',
          'isEmiratesIdNumberVisible',
          'isEmiratesIdNumberRequired',
        ],
        (vals: any[], schema: any) => {
          const [reg, resStat, resVis, eVis, eReq] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const isCustomsOrLocal =
            String(reg || '') === REG.customsEmployee ||
            String(reg || '') === REG.localAuthorityEmployee;
          if (special) {
            if (isCustomsOrLocal && !resStat && !!eVis && !!eReq) {
              return schema.required(t('Required'));
            }
            return schema;
          }
          if (!!resVis) {
            if (!resStat) return schema;
            if (String(resStat) !== RESIDENCE.nonResident) {
              return !!eVis && !!eReq ? schema.required(t('Required')) : schema;
            }
          }
          return schema;
        },
      ),
    // الجواز (الرقم + تاريخ الانتهاء)
    passportNumber: Yup.string()
      .nullable()
      .when(
        [
          'registrationTypeId',
          'residenceStatusId',
          'isResidenceStatusVisible',
          'isPassportNumberVisible',
          'isPassportNumberRequired',
        ],
        (vals: any[], schema: any) => {
          const [reg, resStat, resVis, pVis, pReq] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          if (special) return schema; // مخفي في الفروع الخاصة
          if (!!resVis && String(resStat || '') === RESIDENCE.nonResident) {
            return !!pVis && !!pReq ? schema.required(t('Required')) : schema;
          }
          return schema;
        },
      ),
    passportExpiryDate: Yup.mixed()
      .nullable()
      .when(
        [
          'registrationTypeId',
          'residenceStatusId',
          'isResidenceStatusVisible',
          'isPassportNumberVisible',
          'isPassportNumberRequired',
        ],
        (vals: any[], schema: any) => {
          const [reg, resStat, resVis, pVis, pReq] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          if (special) return schema;
          if (!!resVis && String(resStat || '') === RESIDENCE.nonResident) {
            return !!pVis && !!pReq ? schema.required(t('Required')) : schema;
          }
          return schema;
        },
      ),
    // قنوات وسوشيال ونوع المستخدم
    communicationChannelId: Yup.string()
      .nullable()
      .when(
        [
          'registrationTypeId',
          'isCommunicationChannelVisible',
          'isCommunicationChannelRequired',
        ],
        (vals: any[], schema: any) => {
          const [reg, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const mustShow = !special && !!vis;
          return mustShow && !!req ? schema.required(t('Required')) : schema;
        },
      ),
    socialMediaId: Yup.string()
      .nullable()
      .when(
        ['registrationTypeId', 'isSocialMediaVisible', 'isSocialMediaRequired'],
        (vals: any[], schema: any) => {
          const [reg, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const mustShow = !special && !!vis;
          return mustShow && !!req ? schema.required(t('Required')) : schema;
        },
      ),
    userTypeId: Yup.string()
      .nullable()
      .when(
        ['registrationTypeId', 'isUserTypeVisible', 'isUserTypeRequired'],
        (vals: any[], schema: any) => {
          const [reg, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const mustShow = !special && !!vis;
          return mustShow && !!req ? schema.required(t('Required')) : schema;
        },
      ),
    // ملفات (حسب flags)
    avatar: Yup.mixed()
      .nullable()
      .when(
        ['registrationTypeId', 'isAvatarVisible', 'isAvatarRequired'],
        (vals: any[], s: any) => {
          const [reg, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          // منطق العرض: الفردي يتبع الفلاغات، الخاص = مخفي دومًا، غير ذلك يتبع الفلاغات
          const mustShow =
            String(reg || '') === REG.individual
              ? !!vis
              : special
              ? false
              : !!vis;
          const mustReq =
            String(reg || '') === REG.individual
              ? !!req
              : special
              ? false
              : !!req;
          return mustShow && mustReq
            ? s.test('has-file', t('Required'), hasFile)
            : s;
        },
      ),
    identificationCopy: Yup.mixed()
      .nullable()
      .when(
        [
          'registrationTypeId',
          'isIdentificationCopyVisible',
          'isIdentificationCopyRequired',
        ],
        (vals: any[], s: any) => {
          const [reg, vis, req] = vals || [];
          const special = SPECIAL_SET.includes(String(reg || ''));
          const mustShow =
            String(reg || '') === REG.individual
              ? !!vis
              : special
              ? false
              : !!vis;
          const mustReq =
            String(reg || '') === REG.individual
              ? !!req
              : special
              ? false
              : !!req;
          return mustShow && mustReq
            ? s.test('has-file', t('Required'), hasFile)
            : s;
        },
      ),
    // 2FA: إذا ظاهر ومفعّل = Yes
    question: Yup.string()
      .nullable()
      .when(
        ['isTwoFactorEnabledVisible', 'twoFactorEnabled'],
        (vals: any[], schema: any) => {
          const [vis, tf] = vals || [];
          return !!vis && String(tf || '') === 'Yes'
            ? schema.required(t('Required'))
            : schema;
        },
      ),
    answer: Yup.string()
      .nullable()
      .when(
        ['isTwoFactorEnabledVisible', 'twoFactorEnabled'],
        (vals: any[], schema: any) => {
          const [vis, tf] = vals || [];
          return !!vis && String(tf || '') === 'Yes'
            ? schema.required(t('Required'))
            : schema;
        },
      ),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setFormData] = useState<any>({});
  const [options, setOptions] = useState({
    registrationTypes: [] as any[],
    genders: [] as any[],
    countries: [] as any[],
    cities: [] as any[],
    nationalities: [] as any[],
    languages: [] as any[],
    residenceStatuses: [] as any[],
    communicationChannels: [] as any[],
    socialMedias: [] as any[],
    userTypes: [] as any[],
    questions: [] as any[],
  });
  const mapOptionsCities = (arr?: any[]) =>
    (arr || []).map(o => ({
      label: isArabic() ? o.NameArabic : o.Name,
      value: String(o?.Id),
    }));
  const _getSSOLookupData = (id: any) => {
    dispatch(
      GetSSOLookupData({
        body: {
          Category: 'Countries',
          id: id,
        },
      }),
    ).then(res => {
      if (res.payload.networkSuccess) {
        let cities = mapOptionsCities(res.payload?.result);
        setOptions(prev => ({...prev, cities}));
      }
    });
  };
  const signUpToken: any = useAppSelector(state => state.userToken);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        let token = '';
        let payload: any = {};
        const expiry = new Date(signUpToken.expiresIn);
        if (expiry < new Date()) {
          token = signUpToken.tokenData?.access_token;
        } else {
          const res1: any = await dispatch(getSsoToken(params?.userInfo));
          if (
            res1.meta.requestStatus === 'fulfilled' &&
            res1.payload.networkSuccess &&
            res1.payload?.access_token
          ) {
            token = res1.payload.access_token;
          } else {
            _openModal(
              dispatch,
              false,
              false,
              false,
              <Text h4 style={{color: colors.red}}>
                {t('IL.InternalServerError')}
              </Text>,
            );
            NavigationService.navigate('Home');
            return;
          }
        }
        if (token) {
          const res2: any = await dispatch(
            GetCompleteProfile({
              body: {
                ClientId: 'MOIAT_Mobile',
                LanguageId: isArabic() ? 2 : 1,
                UserId: params?.data?.userId,
              },
              header: {authorization: 'Bearer ' + token},
            }),
          );
          if (
            res2.meta.requestStatus === 'fulfilled' &&
            res2.payload.networkSuccess &&
            res2.payload?.email
          ) {
            let payloadData = res2.payload;
            payload = payloadData;
            const init = buildInitialValues({res: payloadData, L, params});
            setFormData(init);
            const opts = {
              registrationTypes: mapOptions(payload?.registrationTypes),
              genders: mapOptions(payload?.genders),
              countries: mapOptions(payload?.countries),
              cities: mapOptions(payload?.cities),
              nationalities: mapOptions(payload?.nationalities),
              languages: mapOptions(payload?.languages),
              residenceStatuses: mapOptions(payload?.residenceStatuses),
              communicationChannels: mapOptions(payload?.communicationChannels),
              socialMedias: mapOptions(payload?.socialMedias),
              userTypes: mapOptions(payload?.userTypes),
              questions: mapOptions(payload?.questions),
            };
            setOptions(prev => ({...prev, ...opts}));
            if (!!payloadData.countryId)
              _getSSOLookupData(payloadData.countryId);
          }
        }
      } catch (e) {
        Alert.alert(L('errorTitle'), L('errorLoad'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);
  function fixName(name: string) {
    if (!!name) {
      let userName = name.replace(/,/g, ' ');
      userName = userName.replace(/\s+/g, ' ');
      userName = userName.trim();
      return userName;
    } else {
      return name;
    }
  }
  const onSubmit = async (values: any) => {
    try {
      try {
        dispatch(setLoadingModal(true));
        let token = '';
        const expiry = new Date(signUpToken.expiresIn);
        if (expiry > new Date()) {
          token = signUpToken.tokenData?.access_token;
        } else {
          const res1: any = await dispatch(getSsoToken(params?.userInfo));
          if (
            res1.meta.requestStatus === 'fulfilled' &&
            res1.payload.networkSuccess &&
            res1.payload?.access_token
          ) {
            token = res1.payload.access_token;
          } else {
            _openModal(
              dispatch,
              false,
              false,
              false,
              <Text h4 style={{color: colors.red}}>
                {t('IL.InternalServerError')}
              </Text>,
            );
            NavigationService.navigate('Home');
            return;
          }
        }
        if (token) {
          const data = await getFormData(values);
          const res2: any = await dispatch(
            saveProfile({
              body: data,
              header: {authorization: 'Bearer ' + token},
            }),
          );
          if (
            res2.meta.requestStatus === 'fulfilled' &&
            res2.payload.networkSuccess &&
            res2.payload?.success
          ) {
            _openModal(
              dispatch,
              false,
              false,
              false,
              <Text h4 style={{color: colors.green}}>
                {isArabic() ? res2.payload?.messageAr : res2.payload?.messageEn}
              </Text>,
            );
            if (!!params?.update) {
              NavigationService.goBack();
              return;
            }
            dispatch(setUserILID({userId: params?.data?.userId}));
            dispatch(setAuthenticated(true));
            dispatch(
              setAuthValues({
                token,
                userName: values?.fullName,
                expiryDate: expiry,
              }),
            );
            if (
              (isArabic() && params.userInfo?.fullnameAR) ||
              (!isArabic() && params.userInfo?.fullnameEN)
            ) {
              dispatch(
                setUserName({
                  userNameAR: fixName(params.userInfo?.fullnameAR),
                  userNameEN: fixName(params.userInfo?.fullnameEN),
                }),
              );
            }
            if (item != null) {
              let itemTemp = item;
              dispatch(setSelectedService(null));
              NavigationService.reset('dashboard');
              setTimeout(
                () =>
                  NavigationService.navigate('ServiceDetails', {
                    item: itemTemp,
                  }),
                50,
              );
            } else {
              NavigationService.reset('dashboard');
            }
          } else {
            type ApiErrors = Record<
              string,
              Array<{messageEn?: string; messageAr?: string}>
            >;
            function getAllErrorMessages(
              errors?: ApiErrors,
              isAr = false,
            ): string[] {
              if (!errors) return [];
              const msgs: string[] = [];
              for (const arr of Object.values(errors)) {
                if (!Array.isArray(arr)) continue;
                for (const m of arr) {
                  const txt =
                    (isAr ? m.messageAr : m.messageEn) ||
                    m.messageAr ||
                    m.messageEn;
                  if (txt) msgs.push(txt);
                }
              }
              return Array.from(new Set(msgs));
            }
            const isAr = isArabic();
            const allMsgs = getAllErrorMessages(res2.payload?.errors, isAr);
            _openModal(
              dispatch,
              false,
              false,
              false,
              allMsgs.length ? (
                <View style={{gap: 6}}>
                  {allMsgs.map((m, i) => (
                    <Text key={i} h4 style={{color: colors.red}}>
                      • {m}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text h4 style={{color: colors.red}}>
                  {isAr
                    ? res2.payload?.messageAr || t('IL.InternalServerError')
                    : res2.payload?.messageEn || t('IL.InternalServerError')}
                </Text>
              ),
            );
          }
        }
      } catch (e) {
        Alert.alert(L('errorTitle'), L('errorLoad'));
      } finally {
        dispatch(setLoadingModal(false));
      }
    } catch (e) {
      Alert.alert(L('errorTitle'), L('errorSubmit'));
    } finally {
    }
  };
  // ====== Helpers ======
  const isNonResident = (v: any) =>
    v ? String(v) === RESIDENCE.nonResident : false;
  return (
    <PageBg>
      <Page
        withHeader
        withStatusBar
        styles={{paddingHorizontal: 16 * BW()}}
        header={
          <Header
            title={
              !!params?.update ? t('IL.ProfileUpdate') : t('ProfileCompleting')
            }
            hideDrawer
          />
        }>
        <Loader isLoading={isLoading}>
          <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({
              values,
              errors,
              touched,
              setFieldValue,
              validateForm,
              setTouched,
              handleSubmit,
            }) => {
              const selectedRegType = String(values.registrationTypeId || '');
              // ——— فروع manageRegistrationType كما في CSHTML ———
              const isIndividual = selectedRegType === REG.individual;
              const isSpecial =
                selectedRegType === REG.customsEmployee ||
                selectedRegType === REG.localAuthorityEmployee ||
                selectedRegType === REG.externalForm ||
                selectedRegType === REG.ilCensus;
              const isCustomsOrLocal =
                selectedRegType === REG.customsEmployee ||
                selectedRegType === REG.localAuthorityEmployee;
              // عند تغيير نوع التسجيل
              const handleRegistrationTypeChange = (opt: any) => {
                const newVal = String(opt?.value ?? '');
                setFieldValue('registrationTypeId', newVal);
                // مطابق للمتصفح: إخفاء الشركة عند الفردي + تنظيفات أساسية
                if (newVal === REG.individual) {
                  setFieldValue('company', '');
                  setFieldValue('companyEmail', '');
                  setFieldValue('communicateOnCompanyEmailOnly', false);
                }
                // للفروع الخاصة: إجبار الدولة على الإمارات + إخفاء حالة الإقامة وتطبيق manageResidenceStatus("")
                if (
                  newVal === REG.customsEmployee ||
                  newVal === REG.localAuthorityEmployee ||
                  newVal === REG.externalForm ||
                  newVal === REG.ilCensus
                ) {
                  setFieldValue('countryId', UAE_COUNTRY_ID);
                  setFieldValue('cityId', values.cityId); // لا نغّيرها إن وجدت
                  // كما بالويب: نعتبر ResidenceStatus فارغ
                  setFieldValue('residenceStatusId', '');
                }
              };
              const handleCountryChange = (opt: any) => {
                const newVal = String(opt?.value ?? '');
                setFieldValue('countryId', newVal);
                _getSSOLookupData(newVal);
                if (newVal !== UAE_COUNTRY_ID) {
                  setFieldValue('cityId', '');
                }
              };
              // لغة عربية → إظهار الاسم العربي
              const handleLanguageChange = (opt: any) => {
                const newVal = String(opt?.value ?? '');
                setFieldValue('languageId', newVal);
                if (newVal !== '2055') {
                  setFieldValue('fullNameArabic', '');
                }
              };
              const handleCommChannelChange = (opt: any) => {
                const newVal = String(opt?.value ?? '');
                setFieldValue('communicationChannelId', newVal);
                if (newVal !== '5141') {
                  setFieldValue('alternativeEmail', '');
                }
              };
              const handleResidenceChange = (v: any) => {
                const newVal = String(v?.value ?? '');
                setFieldValue('residenceStatusId', newVal);
                if (isNonResident(newVal)) {
                  setFieldValue('emiratesIdNumber', '');
                  setFieldValue('emiratesIDExpiryDate', null);
                } else {
                  setFieldValue('passportNumber', '');
                  setFieldValue('passportExpiryDate', null);
                }
              };
              // ——— إظهار/إخفاء الحقول وفق الفروع ———
              // تاريخ الميلاد
              const showDOB = isIndividual
                ? values.isDateOfBirthVisible
                : isSpecial
                ? false
                : values.isDateOfBirthVisible;
              const reqDOB = isIndividual
                ? values.isDateOfBirthRequired
                : isSpecial
                ? false
                : values.isDateOfBirthRequired;
              // الشركة
              const showCompany = isIndividual
                ? false
                : isSpecial
                ? false
                : values.isCompanyVisible;
              const reqCompany = isIndividual
                ? false
                : isSpecial
                ? false
                : values.isCompanyRequired;
              // بريد الشركة (يُخفى في الفردي والفروع الخاصة)
              const showCompanyEmail = isIndividual
                ? false
                : isSpecial
                ? false
                : values.isCompanyEmailVisible;
              const companyOnly =
                values?.communicateOnCompanyEmailOnly === true ||
                values?.communicateOnCompanyEmailOnly === 'true';
              const reqCompanyEmail =
                showCompanyEmail &&
                companyOnly &&
                values.isCompanyEmailRequired;
              // الدولة/المدينة
              const showCountry = isIndividual
                ? values.isCountryVisible
                : isSpecial
                ? false
                : values.isCountryVisible;
              const reqCountry = isIndividual
                ? values.isCountryRequired
                : isSpecial
                ? false
                : values.isCountryRequired;
              const showCity =
                values.isCityVisible &&
                String(values.countryId) === UAE_COUNTRY_ID &&
                !isSpecial; // الويب يخفي الدولة بالفرع الخاص ويعيّن مدن الإمارات داخليًا
              // حالة الإقامة
              const showResidence = isIndividual
                ? values.isResidenceStatusVisible
                : isSpecial
                ? false
                : values.isResidenceStatusVisible;
              const reqResidence = isIndividual
                ? values.isResidenceStatusRequired
                : isSpecial
                ? false
                : values.isResidenceStatusRequired;
              // قناة تواصل / سوشيال / نوع مستخدم
              const showCommChannel = isIndividual
                ? values.isCommunicationChannelVisible
                : isSpecial
                ? false
                : values.isCommunicationChannelVisible;
              const reqCommChannel = isIndividual
                ? values.isCommunicationChannelRequired
                : isSpecial
                ? false
                : values.isCommunicationChannelRequired;
              const showSocial = isIndividual
                ? values.isSocialMediaVisible
                : isSpecial
                ? false
                : values.isSocialMediaVisible;
              const reqSocial = isIndividual
                ? values.isSocialMediaRequired
                : isSpecial
                ? false
                : values.isSocialMediaRequired;
              const showUserType = isIndividual
                ? values.isUserTypeVisible
                : isSpecial
                ? false
                : values.isUserTypeVisible;
              const reqUserType = isIndividual
                ? values.isUserTypeRequired
                : isSpecial
                ? false
                : values.isUserTypeRequired;
              const reqAvatar = isIndividual
                ? values.isAvatarRequired
                : isSpecial
                ? false
                : values.isAvatarRequired;
              const showAvatar = isIndividual
                ? values.isAvatarVisible
                : isSpecial
                ? false
                : values.isAvatarVisible;
              const reqIdCopy = isIndividual
                ? values.isIdentificationCopyRequired
                : isSpecial
                ? false
                : values.isIdentificationCopyRequired;
              const showIdCopy = isIndividual
                ? values.isIdentificationCopyVisible
                : isSpecial
                ? false
                : values.isIdentificationCopyVisible;
              // الاسم العربي (تبقى كما كانت: تُعرض فقط إذا اللغة=2055 وكان الـ flag يسمح)
              const showFullNameArabic =
                values.isFullNameArabicVisible &&
                String(values.languageId) === '2055';
              // بريد بديل: نفس الشرط المستخدم سابقًا
              const showAlternativeEmail =
                values.isAlternativeEmailVisible &&
                String(values.communicationChannelId) === '5141' &&
                !companyOnly;
              // ——— منطق الهوية/الجواز (مطابق للويب) ———
              const {showEmiratesId, reqEmiratesId, showPassport, reqPassport} =
                getIdentityVisibility(values);
              // حقول أخرى عامة (بدون تحسينات): هاتف العمل/المسمى تبع flags مباشرة
              const showWorkPhone = values.isWorkPhoneVisible;
              const reqWorkPhone = values.isWorkPhoneRequired;
              const showDesignation = values.isDesignationVisible;
              const reqDesignation = values.isDesignationRequired;
              // 2FA — مطابق: عرض سؤال/جواب فقط إن الواجهة تسمح و Yes
              const show2FAGroup =
                values.isTwoFactorEnabledVisible &&
                String(values.twoFactorEnabled) === 'true';
              return (
                <>
                  {values.isRegistrationTypeVisible && (
                    <Input
                      dropdown
                      label={L('registrationType')}
                      requiredStar={true}
                      items={options.registrationTypes}
                      value={values.registrationTypeId}
                      onChangeValue={handleRegistrationTypeChange}
                      error={
                        touched?.registrationTypeId && errors.registrationTypeId
                      }
                      disabled={!!params?.update && values.registrationTypeId}
                    />
                  )}
                  {isIndividual && (
                    <Input
                      checkbox
                      title={L('createIndividualProfile')}
                      checked={values.createIndividualProfile}
                      onPress={() =>
                        setFieldValue(
                          'createIndividualProfile',
                          !values.createIndividualProfile,
                        )
                      }
                      disabled={!!params?.update}
                    />
                  )}
                  {showCompany && (
                    <Input
                      type="textInput"
                      label={L('company')}
                      requiredStar={reqCompany}
                      value={values.company}
                      onChangeText={(t: string) => setFieldValue('company', t)}
                      error={touched.company && errors.company}
                      disabled={!!params?.update}
                    />
                  )}
                  {/* تماثل تمكين بريد الشركة فقط */}
                  {!isIndividual && !isSpecial && (
                    <Input
                      checkbox
                      title={L('companyEmailOnly')}
                      checked={values.communicateOnCompanyEmailOnly}
                      onPress={() =>
                        setFieldValue(
                          'communicateOnCompanyEmailOnly',
                          !values.communicateOnCompanyEmailOnly,
                        )
                      }
                      disabled={!!params?.update}
                    />
                  )}
                  {showCompanyEmail && (
                    <Input
                      type="textInput"
                      label={L('companyEmail')}
                      requiredStar={reqCompanyEmail}
                      value={values.companyEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={(t: string) =>
                        setFieldValue('companyEmail', t)
                      }
                      error={touched.companyEmail && errors.companyEmail}
                      disabled={!!params?.update}
                    />
                  )}
                  <Text h3 bold style={{marginTop: 8 * BW()}}>
                    {t('ApplicantPersonalInfoTitle')}
                  </Text>
                  <Input
                    type="textInput"
                    label={L('email')}
                    requiredStar
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(t: string) => setFieldValue('email', t)}
                    error={touched.email && errors.email}
                    disabled={true}
                  />
                  <Input
                    type="textInput"
                    label={L('fullName')}
                    requiredStar
                    value={values.fullName}
                    onChangeText={(t: string) => setFieldValue('fullName', t)}
                    error={touched.fullName && errors.fullName}
                    disabled={true}
                  />
                  {showFullNameArabic && (
                    <Input
                      type="textInput"
                      label={L('fullNameArabic')}
                      requiredStar={values.isFullNameArabicRequired}
                      value={values.fullNameArabic}
                      onChangeText={(t: string) =>
                        setFieldValue('fullNameArabic', t)
                      }
                      error={touched.fullNameArabic && errors.fullNameArabic}
                      disabled={true}
                    />
                  )}
                  {showAlternativeEmail && (
                    <Input
                      type="textInput"
                      label={L('alternativeEmail')}
                      requiredStar={values.isAlternativeEmailRequired}
                      value={values.alternativeEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={(t: string) =>
                        setFieldValue('alternativeEmail', t)
                      }
                      error={
                        touched.alternativeEmail && errors.alternativeEmail
                      }
                    />
                  )}
                  <Input
                    type="textInput"
                    label={L('mobilePhone')}
                    requiredStar
                    value={values.phoneNumber}
                    onChangePhoneNumber={(t: string) =>
                      setFieldValue('phoneNumber', t)
                    }
                    error={touched.phoneNumber && errors.phoneNumber}
                    disabled={true}
                  />
                  {showDOB && (
                    <Input
                      newDatePicker
                      label={L('dateOfBirth')}
                      requiredStar={reqDOB}
                      value={
                        !!values.dateOfBirth
                          ? new Date(values.dateOfBirth).toLocaleDateString()
                          : null
                      }
                      dateValue={values.dateOfBirth}
                      setDate={(d: any) => setFieldValue('dateOfBirth', d)}
                      error={touched.dateOfBirth && errors.dateOfBirth}
                      datePickerProps={{maximumDate: new Date()}}
                    />
                  )}
                  {showWorkPhone && (
                    <Input
                      type="textInput"
                      label={L('workPhone')}
                      requiredStar={reqWorkPhone}
                      value={values.workPhone}
                      onChangePhoneNumber={(t: string) =>
                        setFieldValue('workPhone', t)
                      }
                      error={touched.workPhone && errors.workPhone}
                    />
                  )}
                  {showDesignation && (
                    <Input
                      type="textInput"
                      label={L('designation')}
                      requiredStar={reqDesignation}
                      value={values.designation}
                      onChangeText={(t: string) =>
                        setFieldValue('designation', t)
                      }
                      error={touched.designation && errors.designation}
                    />
                  )}
                  {showCountry && (
                    <Input
                      type="dropdown"
                      label={L('country')}
                      requiredStar={reqCountry}
                      items={options.countries}
                      value={values.countryId}
                      onChangeValue={handleCountryChange}
                      error={touched.countryId && errors.countryId}
                    />
                  )}
                  {showCity && (
                    <Input
                      type="dropdown"
                      label={L('EmirateStateCity')}
                      requiredStar={values.isCityRequired}
                      items={options.cities}
                      value={values.cityId}
                      onChangeValue={(v: any) =>
                        setFieldValue('cityId', String(v?.value))
                      }
                      error={touched.cityId && errors.cityId}
                    />
                  )}
                  {values.isGenderVisible && (
                    <Input
                      type="dropdown"
                      label={L('gender')}
                      requiredStar={values.isGenderRequired}
                      items={options.genders}
                      value={values.genderId}
                      onChangeValue={(v: any) =>
                        setFieldValue('genderId', String(v?.value))
                      }
                      error={touched.genderId && errors.genderId}
                      // disabled={
                      // !!values.genderId || values.genderId != undefined
                      // ? true
                      // : false
                      // }
                    />
                  )}
                  {values.isNationalityVisible && (
                    <Input
                      type="dropdown"
                      label={L('nationality')}
                      requiredStar={values.isNationalityRequired}
                      items={options.nationalities}
                      value={values.nationalityId}
                      onChangeValue={(v: any) =>
                        setFieldValue('nationalityId', String(v?.value))
                      }
                      error={touched.nationalityId && errors.nationalityId}
                    />
                  )}
                  {values.isLanguageVisible && (
                    <Input
                      type="dropdown"
                      label={L('preferredLanguage')}
                      requiredStar={values.isLanguageRequired}
                      items={options.languages}
                      value={values.languageId}
                      onChangeValue={handleLanguageChange}
                      error={touched.languageId && errors.languageId}
                    />
                  )}
                  {showResidence && (
                    <Input
                      type="dropdown"
                      label={L('residenceStatus')}
                      requiredStar={reqResidence}
                      items={options.residenceStatuses}
                      value={values.residenceStatusId}
                      onChangeValue={handleResidenceChange}
                      error={
                        touched.residenceStatusId && errors.residenceStatusId
                      }
                    />
                  )}
                  {/* Emirates ID / Passport حسب manageResidenceStatus */}
                  {showEmiratesId && (
                    <>
                      <Input
                        type="textInput"
                        label={L('uaeId')}
                        requiredStar={reqEmiratesId}
                        keyboardType="number-pad"
                        maxLength={15}
                        value={values.emiratesIdNumber}
                        onChangeText={(t: string) =>
                          setFieldValue(
                            'emiratesIdNumber',
                            String(t).replace(/\D+/g, ''),
                          )
                        }
                        error={
                          touched.emiratesIdNumber && errors.emiratesIdNumber
                        }
                        disabled={!!params.userInfo?.idn || !!params?.update}
                      />
                      <Input
                        newDatePicker
                        label={L('emiratesIdExpiry')}
                        requiredStar={reqEmiratesId}
                        value={
                          !!values.emiratesIDExpiryDate
                            ? new Date(
                                values.emiratesIDExpiryDate,
                              ).toLocaleDateString()
                            : null
                        }
                        dateValue={values.emiratesIDExpiryDate}
                        setDate={(d: any) =>
                          setFieldValue('emiratesIDExpiryDate', d)
                        }
                        error={
                          touched.emiratesIDExpiryDate &&
                          errors.emiratesIDExpiryDate
                        }
                      />
                    </>
                  )}
                  {showPassport && (
                    <>
                      <Input
                        type="textInput"
                        label={L('passportNumber')}
                        requiredStar={reqPassport}
                        value={values.passportNumber}
                        onChangeText={(t: string) =>
                          setFieldValue('passportNumber', t)
                        }
                        error={touched.passportNumber && errors.passportNumber}
                      />
                      <Input
                        newDatePicker
                        label={L('passportExpiry')}
                        requiredStar={reqPassport}
                        value={
                          !!values.passportExpiryDate
                            ? new Date(
                                values.passportExpiryDate,
                              ).toLocaleDateString()
                            : null
                        }
                        dateValue={values.passportExpiryDate}
                        setDate={(d: any) =>
                          setFieldValue('passportExpiryDate', d)
                        }
                        error={
                          touched.passportExpiryDate &&
                          errors.passportExpiryDate
                        }
                      />
                    </>
                  )}
                  {showCommChannel && (
                    <Input
                      type="dropdown"
                      label={L('communicationChannel')}
                      requiredStar={reqCommChannel}
                      items={options.communicationChannels}
                      value={values.communicationChannelId}
                      onChangeValue={handleCommChannelChange}
                      error={
                        touched.communicationChannels &&
                        errors.communicationChannels
                      }
                    />
                  )}
                  {showSocial && (
                    <Input
                      type="dropdown"
                      label={L('socialMedia')}
                      requiredStar={reqSocial}
                      items={options.socialMedias}
                      value={values.socialMediaId}
                      onChangeValue={(v: any) =>
                        setFieldValue('socialMediaId', String(v?.value))
                      }
                      error={touched.socialMediaId && errors.socialMediaId}
                    />
                  )}
                  {showUserType && (
                    <Input
                      type="dropdown"
                      label={L('WhichAppliesMost')}
                      requiredStar={reqUserType}
                      items={options.userTypes}
                      value={values.userTypeId}
                      onChangeValue={(v: any) =>
                        setFieldValue('userTypeId', String(v?.value))
                      }
                      error={touched.userTypeId && errors.userTypeId}
                    />
                  )}
                  {/* 2FA */}
                  {values.isTwoFactorEnabledVisible && (
                    <Input
                      checkbox
                      title={L('twoFactor')}
                      checked={values.twoFactorEnabled}
                      onPress={() =>
                        setFieldValue(
                          'twoFactorEnabled',
                          !values.twoFactorEnabled,
                        )
                      }
                    />
                  )}
                  {show2FAGroup && (
                    <>
                      <Input
                        type="dropdown"
                        label={L('secretQuestion')}
                        items={options.questions}
                        value={values.question}
                        onChangeValue={(v: any) =>
                          setFieldValue('question', String(v?.value))
                        }
                      />
                      <Input
                        type="textInput"
                        label={L('secretAnswer')}
                        value={values.answer}
                        onChangeText={(t: string) => setFieldValue('answer', t)}
                      />
                    </>
                  )}
                  {showAvatar && (
                    <ILAttachmentUpload
                      title={t('ChangeAvatar')}
                      value={values.avatar}
                      onChange={(files: any) => setFieldValue('avatar', files)}
                      requiredStar={reqAvatar}
                      maxFile={1}
                      acceptedFiles={['jpg', 'jpeg', 'png']}
                      errors={!!errors?.avatar && errors?.avatar}
                      defaultBase64={DEFAULT_AVATAR_PNG_BASE64}
                    />
                  )}
                  {showIdCopy && (
                    <ILAttachmentUpload
                      title={L('IdentificationCopy')}
                      value={values.identificationCopy}
                      onChange={(files: any) =>
                        setFieldValue('identificationCopy', files)
                      }
                      requiredStar={reqIdCopy}
                      maxFile={1}
                      acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
                      attachmentDescription={L('IdCopyScanned')}
                      errors={
                        !!errors?.identificationCopy &&
                        errors?.identificationCopy
                      }
                    />
                  )}
                  <Button
                    title={L('save')}
                    styleText={{color: colors.mainWhite}}
                    style={styles.btn}
                    onPress={async () => {
                      const formErrors = await validateForm(); // runs Yup schema
                      if (Object.keys(formErrors).length > 0) {
                        setTouched(
                          Object.keys(formErrors).reduce(
                            (acc, key) => ({...acc, [key]: true}),
                            {},
                          ),
                        );
                        _openModal(
                          dispatch,
                          false,
                          false,
                          false,
                          <Text h4 style={{color: colors.red}}>
                            {t('IL.ERRORVALID')}
                          </Text>,
                        );
                      } else {
                        handleSubmit();
                      }
                    }}
                  />
                </>
              );
            }}
          </Formik>
        </Loader>
      </Page>
    </PageBg>
  );
}
const getStyle = (colors: any) =>
  StyleSheet.create({
    btn: {
      marginTop: 16 * BW(),
      backgroundColor: colors.secondaryColor,
      height: 'auto',
      minHeight: 30 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
