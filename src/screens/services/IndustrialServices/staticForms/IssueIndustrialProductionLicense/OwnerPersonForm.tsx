import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Input from '../../../../../component/input/Input';
import UploadAttachment from '../../../../../component/attachment/UplaodAtachment';
import Text from '../../../../../component/Text';
import {BW} from '../../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {GetLookupData} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {isArabic} from '../../../../../locales';
import {GetGenderList} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import ReadOnlyInput from '../ReadOnlyText';
import ILAttachmentUpload from '../../../../../component/attachment/ILAttachmentUpload';
import {useTheme} from '@react-navigation/native';
const OwnerPersonForm = ({
  values,
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
  const [genderList, setGenderList] = useState([]);
  const {colors}: any = useTheme();
  // const { values, handleChange, setFieldValue, errors, touched } = useFormikContext();

  const _getGenderList = () => {
    setIsLoading(true);
    let language = isArabic() ? 2 : 1;
    dispatch(GetGenderList({language})).then(res => {
      setIsLoading(false);
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.map(
          (item: any, index: number): any => ({
            label: item.name,
            value: item.id,
          }),
        );
        setGenderList(result);
      } else {
        setGenderList([]);
      }
    });
  };
  useEffect(() => {
    _getGenderList();
  }, []);
  return (
    <View>
      <Input
        textInput
        requiredStar
        label={t('PersonNameEnglish')}
        placeholder={t('PersonNameEnglish')}
        value={values.PersonName}
        onChangeText={val => {
          setFieldValue('PersonName', val);
          setFieldTouched('PersonName', true);
        }}
        error={touched.PersonName && errors.PersonName}
      />

      <Input
        textInput
        requiredStar
        label={t('PersonNameArabic')}
        placeholder={t('PersonNameArabic')}
        value={values.PersonNameArabic}
        stopReplaceNumeric
        onChangeText={val => {
          setFieldValue('PersonNameArabic', val);
          setFieldTouched('PersonNameArabic', true);
        }}
        error={touched.PersonNameArabic && errors.PersonNameArabic}
      />

      <Input
        dropdown
        label={t('Nationality')}
        requiredStar
        value={values.Nationality}
        onChange={val => {
          setFieldValue('Nationality', val);
        }}
        items={countries}
        error={touched.Nationality && errors.Nationality}
      />

      <Input
        textInput
        label={t('EmiratesID')}
        placeholder="784xxxxxxxxxxxx"
        keyboardType="numeric"
        value={values.PersonEmiratesID}
        onChangeText={val => setFieldValue('PersonEmiratesID', val)}
        error={touched.PersonEmiratesID && errors.PersonEmiratesID}
      />
      <Text
        h5
        style={{
          color: colors.lightPrimaryTextColor,
        }}>
        {t('IL.Help_EmirateID')}
      </Text>

      <Input
        textInput
        requiredStar
        label={t('SharePercentage')}
        keyboardType="numeric"
        value={values.PersonPercentage}
        onChangeText={val => {
          setFieldValue('PersonPercentage', val);
          setFieldValue(
            'PersonContributionAmount',
            (Number(val) * Number(TotalCapitalInvestment)) / 100,
          );
        }}
        error={touched.PersonPercentage && errors.PersonPercentage}
      />

      <ReadOnlyInput
        requiredStar
        label={t('ContributionAmount')}
        value={values.PersonContributionAmount}
      />

      <Input
        dropdown
        requiredStar
        label={t('Gender')}
        items={genderList}
        value={values.OwnerGender}
        onChange={val => {
          setFieldValue('OwnerGender', val);
        }}
        error={touched.OwnerGender && errors.OwnerGender}
      />

      <ILAttachmentUpload
        title={t('EmiratesIDCopy')}
        maxFile={2}
        requiredStar={true}
        acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
        onChange={val => {
          setFieldValue('PersonEmiratesIdAttachment', val);
        }}
        value={values.PersonEmiratesIdAttachment}
        errors={
          touched.PersonEmiratesIdAttachment &&
          errors.PersonEmiratesIdAttachment
        }
      />
      {touched.PersonEmiratesIdAttachment &&
        errors.PersonEmiratesIdAttachment && (
          <Text style={{color: colors.red}} h5>
            {errors.PersonEmiratesIdAttachment}
          </Text>
        )}

      <ILAttachmentUpload
        title={t('PassportCopy')}
        maxFile={2}
        acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
        onChange={val => {
          setFieldValue('PersonPassportAttachment', val);
        }}
        value={values.PersonPassportAttachment}
      />
      {touched.PersonPassportAttachment && errors.PersonPassportAttachment && (
        <Text style={{color: colors.red}} h5>
          {errors.PersonPassportAttachment}
        </Text>
      )}

      <ILAttachmentUpload
        title={t('VisaForExpats')}
        maxFile={2}
        acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
        onChange={val => {
          setFieldValue('PersonVisaExpatsAttachment', val);
        }}
        value={values.PersonVisaExpatsAttachment}
      />
      {touched.PersonVisaExpatsAttachment &&
        errors.PersonVisaExpatsAttachment && (
          <Text style={{color: colors.red}} h5>
            {errors.PersonVisaExpatsAttachment}
          </Text>
        )}
    </View>
  );
};

export default OwnerPersonForm;
