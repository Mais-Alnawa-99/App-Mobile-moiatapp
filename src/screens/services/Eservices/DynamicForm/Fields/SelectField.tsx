import React, {useState, useEffect, Fragment, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../../locales';
import Input from '../../../../../component/input/Input';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {
  getEntityFieldLookups,
  getCascadedLookups,
} from '../../../../../redux/reducers/E-Services/thunk/services';
import {ConstraintTypeEnum, FieldTypeEnum} from '../Constants';

const SelectField = ({
  service,
  formData,
  field,
  title,
  handleChange,
  profId,
  formValues,
  requiredFields,
  errors,
  isDisabled,
  validations,
  optionsMap,
  setOptionsMap,
  formSectionFields,
}: any) => {
  const {colors}: any = useTheme();

  const dispatch = useAppDispatch();
  const isCascaded =
    field?.constraints &&
    field.constraints?.some(
      (c: any) => c.constraintTypeId === ConstraintTypeEnum.CascadingLoad,
    );
  let isTextFieldChange =
    field?.formSectionFieldSettings &&
    JSON.parse(field.formSectionFieldSettings)?.applyChangeEvent == true
      ? true
      : false;

  let isAutoSelect =
    field?.formSectionFieldSettings &&
    JSON.parse(field.formSectionFieldSettings)?.autoSelect == true
      ? true
      : false;
  let setting =
    field?.constraints &&
    field.constraints.find(
      (c: any) => c.constraintTypeId == ConstraintTypeEnum.CascadingLoad,
    )?.Settings;
  const cascadedValues = !!setting && JSON.parse(setting)?.Values;
  const {userData}: any = useAppSelector(store => store.userDataStored);

  const cascadedField = isCascaded
    ? field?.constraints &&
      JSON.parse(
        field.constraints.find(
          (c: any) => c.constraintTypeId === ConstraintTypeEnum.CascadingLoad,
        )?.Settings,
      ).Cascaded
    : null;
  const parentFieldId = isCascaded
    ? typeof cascadedField == 'string'
      ? cascadedField
      : cascadedField[0]
    : null;

  const {t} = useTranslation();
  const options = optionsMap[field.entityFieldId] || [];

  useEffect(() => {
    if (isCascaded || formValues[parentFieldId]) {
      fetchOptions(formValues[parentFieldId] || null);
    }
  }, [formValues[parentFieldId], optionsMap[parentFieldId]]);
  const fetchOptions = (parentValue: any) => {
    let lookupId;
    const currentValue = parentValue?.value;
    const matchedOption =
      !!optionsMap[parentFieldId] &&
      optionsMap[parentFieldId].find((opt: any) => opt.value === currentValue);

    if (matchedOption) {
      lookupId = matchedOption.lookupId;
    }
    let extraFields: any = [];
    if (cascadedValues && JSON.parse(cascadedValues)?.extraEFIDs) {
      let extFieldlookupObject: any = [];
      JSON.parse(cascadedValues)?.extraEFIDs.map((x: any) => {
        let extField = formSectionFields.find(
          (f: {entityFieldId: any}) => f.entityFieldId == x,
        );

        if (isTextFieldChange) {
          extraFields.push({
            Id: extField.entityFieldId,
            Value: extField.formSectionFieldValue.toString(),
          });
        } else {
          let isLookupData = formSectionFields?.find(
            (f: {entityFieldId: any}) => f.entityFieldId == x,
          )?.entityData;
          let entityFieldLookupData = isLookupData
            ? JSON.parse(isLookupData)
            : '';

          if (extField && entityFieldLookupData) {
            if (typeof extField.formSectionFieldValue != 'string') {
              extField.formSectionFieldValue?.map((x: any) => {
                entityFieldLookupData?.find(
                  (lookup: {lookupValueId: any; lookupId: any}) => {
                    if (lookup.lookupValueId == x) {
                      extFieldlookupObject.push(lookup.lookupId);
                    }
                  },
                );
              });
            } else {
              let extFieldValues = extField.formSectionFieldValue.split(',');
              extFieldValues?.map((x: any) => {
                entityFieldLookupData?.find(
                  (lookup: {lookupValueId: any; lookupId: any}) => {
                    if (lookup.lookupValueId == x) {
                      extFieldlookupObject.push(lookup.lookupId);
                    }
                  },
                );
              });
            }
            extraFields.push({
              Id: extField.entityFieldId,
              Value: extFieldlookupObject.toString(),
            });
          }
          if (
            extField &&
            extField.fieldTypeId == FieldTypeEnum.Relation &&
            formValues[extField.entityFieldId]?.value
          ) {
            extraFields.push({
              Id: extField.entityFieldId,
              Value: formValues[extField.entityFieldId]?.value.toString(),
            });
          }
        }
      });
    }

    if (!!!parentValue?.value) return;
    if (!!!parentValue?.lookupId && !!!lookupId) return;

    try {
      dispatch(
        getCascadedLookups({
          LookupParentId: parentValue?.lookupId
            ? parentValue?.lookupId
            : lookupId,
          ProfileRecordId: userData?.record?.RecordId || '',
          ExtraValues: !!extraFields ? JSON.stringify(extraFields) : '',
          EntityFieldId: field.entityFieldId,
        }),
      ).then(response => {
        if (response.meta.requestStatus === 'fulfilled' && response.payload) {
          const payloadArray = Object.values(response.payload);
          const entity: any = payloadArray[0];

          if (entity?.entityData) {
            const options = JSON.parse(entity.entityData).map(
              (opt: {
                lookupValue: any;
                lookupValueId: any;
                lookupId: any;
                Settings: any;
                settings: any;
              }) => ({
                label: opt?.lookupValue,
                value: opt?.lookupValueId,
                lookupId: opt?.lookupId,
                settings: opt?.Settings || opt?.settings,
              }),
            );
            if (isAutoSelect && !!options && options.length > 0) {
              handleChange(
                field.entityFieldId,
                {
                  value: options[0]?.value,
                  label: options[0]?.label,
                  lookupId: options[0]?.lookupId,
                  settings: options[0]?.settings,
                },
                field,
              );
            }
            setOptionsMap((prev: any) => ({
              ...prev,
              [field.entityFieldId]: options,
            }));
          }
        }
      });
    } catch (error) {
    } finally {
    }
  };
  return (
    <Input
      dropdown
      required={
        !!errors[field.entityFieldId] && !formValues[field.entityFieldId]?.value
      }
      error={
        (!!errors[field.entityFieldId] &&
          !formValues[field.entityFieldId]?.value &&
          errors[field.entityFieldId]) ||
        (!!validations[field.entityFieldId] && validations[field.entityFieldId])
      }
      requiredStar={requiredFields[field.entityFieldId]}
      search={options.length > 5 ? true : false}
      label={title}
      items={options}
      placeholder={t('Select')}
      value={formValues[field.entityFieldId]?.value || ''}
      onChange={(item: {
        value: any;
        lookupId: any;
        settings: any;
        label: any;
      }) =>
        handleChange(
          field.entityFieldId,
          {
            value: item.value,
            lookupId: item.lookupId,
            settings: item.settings,
            label: item.label,
          },
          field,
        )
      }
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

export default SelectField;
