import React, {useState, useEffect, Fragment, useRef} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch} from '../../../../../redux/store';
import {getCalculatedFieldValue} from '../../../../../redux/reducers/E-Services/thunk/services';
import Input from '../../../../../component/input/Input';

const CalculatedField = ({
  service,
  formData,
  profId,
  formValues,
  generateDataFromFormValues,
  applicationId,
  field,
  handleChange,
  title,
  setFormValues,
  updateVisibility,
}: any) => {
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();
  const prevFormValuesRef = useRef<any>(formValues);

  const settings = field?.formSectionFieldSettings
    ? JSON.parse(field.formSectionFieldSettings)
    : {};
  const targetFieldIds = settings?.EFIDs || [];
  const _getCalculatedFieldValue = () => {
    try {
      let body = {
        Data: JSON.stringify(generateDataFromFormValues(formValues, formData)),
        ApplicationId: applicationId,
        EntityFieldId: fieldId,
        CurrentApplicationStageId: service.stageId,
        ProfileRecordId: profId,
        ItemIndex: null,
      };

      dispatch(getCalculatedFieldValue(body)).then(res => {
        if (res.meta.requestStatus === 'fulfilled' && res.payload) {
          if (res.payload.fieldValue != null) {
            const currentValue = formValues?.[fieldId]?.value;
            const newValue = res.payload.fieldValue;

            if (currentValue !== newValue) {
              setFormValues((prev: any) => ({
                ...prev,
                [fieldId]: {
                  value: newValue,
                },
              }));
              let customFormValues = {
                ...formValues,
                [fieldId]: {
                  value: newValue,
                },
              };
              updateVisibility(fieldId, newValue, customFormValues);
            }
          } else {
            setFormValues((prev: any) => ({
              ...prev,
              [fieldId]: {
                value: '',
              },
            }));
          }
        }
      });
    } catch (error) {}
  };
  const fieldId = field?.entityFieldId;

  const debounceTimer = useRef<any>(null);
  const [debouncedFormValues, setDebouncedFormValues] = useState(formValues);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setDebouncedFormValues(formValues);
    }, 2000);
  }, [formValues]);

  useEffect(() => {
    const prevFormValues = prevFormValuesRef.current;
    const hasChanged = targetFieldIds?.some((id: any) => {
      return (
        JSON.stringify(debouncedFormValues[id]) !==
          JSON.stringify(prevFormValues[id]) && !!debouncedFormValues[id]?.value
      );
    });

    if (hasChanged && settings.callApi) {
      _getCalculatedFieldValue();
      prevFormValuesRef.current = debouncedFormValues;
    }
  }, [debouncedFormValues]);

  const {t} = useTranslation();
  return (
    <Input
      textInput
      label={title}
      value={formValues[field.entityFieldId]?.value || ''}
      onChangeText={(text: any) =>
        handleChange(field.entityFieldId, text, field)
      }
      disabled={true}
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

export default CalculatedField;
