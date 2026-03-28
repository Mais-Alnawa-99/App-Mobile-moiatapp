import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import Input from '../../../../../component/input/Input';
import UploadAttachment from '../../../../../component/attachment/UplaodAtachment';
import reactotron from 'reactotron-react-native';
import {useAppSelector} from '../../../../../redux/store';
import ILAttachmentUpload from '../../../../../component/attachment/ILAttachmentUpload';
import {isArabic} from '../../../../../locales';
import {BW} from '../../../../../style/theme';
import {useDisabled} from './DisabledContext';

const FactoryManagerForm = () => {
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  }: any = useFormikContext();
  const {isDisabled} = useDisabled();
  const {t} = useTranslation();
  const genders = [
    {label: isArabic() ? 'ذكر' : 'Male', value: 'M'},
    {label: isArabic() ? 'أنثى' : 'Female', value: 'F'},
  ];

  const [showDate, setShowDate] = useState(false);
  const countries = useAppSelector(state => state.Country.list);
  let selectedDate = values.ManagerIdentificationExpirationDate;
  const showManager = useMemo(() => {
    const isTrue =
      (values.LegalEntity?.isManager === 'Y' &&
        values.LegalEntity?.showDoYouHaveManager === 'N') ||
      (values.LegalEntity?.showDoYouHaveManager === 'Y' &&
        values.DoYouHaveManager?.value) ||
      Object.keys(values.LegalEntity || {}).length === 0;
    if (!isTrue) {
    }
    return isTrue;
  }, [values.LegalEntity, values.DoYouHaveManager]);

  const onChangeDate = (event, date, setFieldValue) => {
    Platform.OS == 'android' && setShowDate(false);
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      selectedDate = formattedDate;
      setFieldValue('ManagerIdentificationExpirationDate', formattedDate);
    }
  };

  return (
    <>
      {showManager ? (
        <View>
          <StepIndicator
            stepNumber={3}
            stepName={
              values.LegalEntity?.MnagerLabel || t('FactoryManagerData')
            }
            style={{marginBottom: 0 * BW()}}
          />
          <Input
            textInput
            requiredStar
            label={t('IL.FD.Representative')}
            value={values.FactoryManagerName}
            onChangeText={handleChange('FactoryManagerName')}
            onBlur={handleBlur('FactoryManagerName')}
            error={touched.FactoryManagerName && errors.FactoryManagerName}
            disabled={isDisabled('FirstName')}
          />

          <Input
            dropdown
            requiredStar
            label={t('Nationality')}
            items={countries}
            value={values.Nationality}
            onChange={value => setFieldValue('Nationality', value)}
            error={touched.Nationality && errors.Nationality}
            disabled={isDisabled('FirstName')}
          />

          <Input
            textInput
            requiredStar
            keyboardType="phone-pad"
            label={t('IL.Mobile_Phone')}
            value={values.MobileNumber}
            onChangeText={val => {
              setFieldValue('MobileNumber', val);
            }}
            onBlur={handleBlur('MobileNumber')}
            error={touched.MobileNumber && errors.MobileNumber}
            disabled={isDisabled('FirstName')}
          />

          <Input
            textInput
            requiredStar
            keyboardType="email-address"
            label={t('EmailAddress')}
            value={values.EmailAddress}
            onChangeText={val => {
              setFieldValue('EmailAddress', val);
            }}
            onBlur={handleBlur('EmailAddress')}
            error={touched.EmailAddress && errors.EmailAddress}
            disabled={isDisabled('FirstName')}
          />

          <Input
            dropdown
            requiredStar
            label={t('Gender')}
            items={genders}
            value={values.ManagerGender}
            onChange={value => setFieldValue('ManagerGender', value)}
            error={touched.ManagerGender && errors.ManagerGender}
            disabled={isDisabled('FirstName')}
          />

          <Input
            datePicker
            requiredStar
            label={t('IL.IdExpirationDate')}
            show={showDate}
            showDatepicker={() => setShowDate(!showDate)}
            onChangeDateFrom={(event, date) =>
              onChangeDate(event, date, setFieldValue)
            }
            dateValue={selectedDate ? new Date(selectedDate) : new Date()}
            value={
              selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : ''
            }
            error={
              touched.ManagerIdentificationExpirationDate &&
              errors.ManagerIdentificationExpirationDate
            }
            disabled={isDisabled('FirstName')}
          />

          <Input
            textInput
            requiredStar
            label={t('IL.IdNumber')}
            value={values.ManagerIdentificationNumber}
            onChangeText={handleChange('ManagerIdentificationNumber')}
            onBlur={handleBlur('ManagerIdentificationNumber')}
            error={
              touched.ManagerIdentificationNumber &&
              errors.ManagerIdentificationNumber
            }
            disabled={isDisabled('FirstName')}
          />

          <ILAttachmentUpload
            requiredStar={true}
            title={t('IL.IdCopy')}
            maxFile={2}
            acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
            onChange={val => {
              setFieldValue('ManagerIdentificationCopy', val);
              // setFieldTouched('ManagerIdentificationCopy', true);
            }}
            value={values.ManagerIdentificationCopy}
            isDisabled={isDisabled('FirstName')}
            errors={
              touched.ManagerIdentificationCopy &&
              errors.ManagerIdentificationCopy
            }
          />
        </View>
      ) : null}
    </>
  );
};

export default FactoryManagerForm;
