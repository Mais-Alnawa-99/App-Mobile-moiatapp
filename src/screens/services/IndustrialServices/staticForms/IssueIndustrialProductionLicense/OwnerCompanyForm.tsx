import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Input from '../../../../../component/input/Input';
import ILAttachmentUpload from '../../../../../component/attachment/ILAttachmentUpload';
import Text from '../../../../../component/Text';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {GetLookupData} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {isArabic} from '../../../../../locales';
import ReadOnlyInput from '../ReadOnlyText';
import {useTheme} from '@react-navigation/native';
const OwnerCompanyForm = ({
  values,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  errors,
  touched,
  TotalCapitalInvestment,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const countries = useAppSelector(state => state.Country.list);
  const {colors}: any = useTheme();
  return (
    <View>
      <Input
        textInput
        requiredStar
        label={t('CompanyNameEnglish')}
        placeholder={t('CompanyNameEnglish')}
        value={values.CompanyName}
        onChangeText={val => {
          setFieldValue('CompanyName', val);
          setFieldTouched('CompanyName', true);
        }}
        error={touched.CompanyName && errors.CompanyName}
      />

      <Input
        textInput
        requiredStar
        label={t('CompanyNameArabic')}
        placeholder={t('CompanyNameArabic')}
        value={values.CompanyNameArabic}
        stopReplaceNumeric
        onChangeText={val => {
          setFieldValue('CompanyNameArabic', val);
          setFieldTouched('CompanyNameArabic', true);
        }}
        error={touched.CompanyNameArabic && errors.CompanyNameArabic}
      />

      <Input
        dropdown
        requiredStar
        label={t('CompanyNationality')}
        items={countries} // Replace with real list
        value={values.Nationality}
        onChange={val => {
          setFieldValue('Nationality', val);
          // setFieldTouched('Nationality', true);
        }}
        error={touched.Nationality && errors.Nationality}
      />

      <Input
        textInput
        label={t('CompanyLocalLicenseNumber')}
        placeholder={t('CompanyLocalLicenseNumber')}
        value={values.CompanyLocalLicenseNumber}
        onChangeText={val => setFieldValue('CompanyLocalLicenseNumber', val)}
        error={
          touched.CompanyLocalLicenseNumber && errors.CompanyLocalLicenseNumber
        }
      />
      <Text
        h5
        style={{
          color: colors.lightPrimaryTextColor,
        }}>
        {t('IL.Help_CompanyLocalLicenseNumber')}
      </Text>

      <Input
        textInput
        requiredStar
        label={t('SharePercentage')}
        placeholder="0.00"
        keyboardType="numeric"
        value={values.CompanyPercentage}
        onChangeText={val => {
          setFieldValue('CompanyPercentage', val);
          setFieldValue(
            'CompanyContributionAmount',
            (Number(val) * Number(TotalCapitalInvestment)) / 100,
          );
        }}
        error={touched.CompanyPercentage && errors.CompanyPercentage}
      />

      <ReadOnlyInput
        requiredStar
        label={t('CompanyContributionAmount')}
        value={values.CompanyContributionAmount}
      />

      <ILAttachmentUpload
        title={t('CompanyLocalLicenseAttachment')}
        requiredStar
        maxFile={2}
        acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
        onChange={val => {
          setFieldValue('CompanyLocalLicenseAttachment', val);
          // setFieldTouched('CompanyLocalLicenseAttachment', true);
        }}
        value={values.CompanyLocalLicenseAttachment}
        errors={
          touched.CompanyLocalLicenseAttachment &&
          errors.CompanyLocalLicenseAttachment
        }
      />

      <ILAttachmentUpload
        title={t('CompanyEstablishmentContractAttachment')}
        maxFile={2}
        acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
        onChange={val => {
          setFieldValue('CompanyEstablishmentContractAttachment', val);
          // setFieldTouched('CompanyEstablishmentContractAttachment', true);
        }}
        value={values.CompanyEstablishmentContractAttachment}
        errors={
          touched.CompanyEstablishmentContractAttachment &&
          errors.CompanyEstablishmentContractAttachment
        }
      />
    </View>
  );
};

export default OwnerCompanyForm;
