import React, {useState, useEffect, Fragment, useRef} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../../locales';
import Input from '../../../../../component/input/Input';
import {useAppDispatch} from '../../../../../redux/store';
import {
  getEntityFieldLookups,
  getCascadedLookups,
} from '../../../../../redux/reducers/E-Services/thunk/services';
import moment from 'moment';

const DateField = ({
  service,
  formData,
  field,
  title,
  handleChange,
  formValues,
  requiredFields,
  errors,
  isDisabled,
  validations,
  isRequired,
}: any) => {
  const {colors}: any = useTheme();

  const dispatch = useAppDispatch();

  const [showDate, setShowDate] = useState(false);

  const selectedDate =
    !!formValues[field.entityFieldId]?.value &&
    formValues[field.entityFieldId]?.value != undefined
      ? formValues[field.entityFieldId]?.value
      : '';

  const onChangeDate = (event: any, selectedDate: any) => {
    Platform.OS == 'android' && setShowDate(false);
    if (selectedDate) {
      handleChange(
        field.entityFieldId,
        {value: moment(selectedDate).format('YYYY-MM-DD')},
        field,
      );
    }
  };

  return (
    <Input
      label={title}
      datePicker
      requiredStar={
        isRequired ? isRequired : requiredFields[field.entityFieldId]
      }
      error={
        (!!errors[field.entityFieldId] &&
          !formValues[field.entityFieldId]?.value &&
          errors[field.entityFieldId]) ||
        (!!validations[field.entityFieldId] && validations[field.entityFieldId])
      }
      required={
        !!errors[field.entityFieldId] && !formValues[field.entityFieldId]?.value
      }
      value={selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : ''}
      show={showDate}
      showDatepicker={() => setShowDate(!showDate)}
      onChangeDateFrom={onChangeDate}
      dateValue={selectedDate ? new Date(selectedDate) : new Date()}
      disabled={isDisabled}
    />
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

export default DateField;
