import React, {useState, useEffect, Fragment, useRef} from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import {isArabic} from '../../../../../locales';
import Text from '../../../../../component/Text';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {
  getSearchRelatedRecords,
  getApplicationChildForm,
  getRecordChildForm,
  getChildEntityFieldLookups,
  getCascadedLookups,
} from '../../../../../redux/reducers/E-Services/thunk/services';
import Button from '../../../../../component/Button';
import Input from '../../../../../component/input/Input';
import {BW} from '../../../../../style/theme';
import Loader from '../../../../../component/Loader';
import {
  ConstraintTypeEnum,
  FieldTypeEnum,
  FileConstraintTypeEnum,
} from '../Constants';
import AttachmentsField from './AttachmentsField';
import DateField from './DateField';
import {setNeedRefreshToken} from '../../../../../redux/reducers/General/server';
import TermsConditionField from './TermsConditionField';
import LocationField from './LocationField';
import {EntityFieldTypeEnum} from '../EntityFieldTypeIdEnum';
import InformationField from './InformationField';
import RelationMultiDropDownField from './RelationMultiDropDownField';
import TreeOptionField from './TreeOptionField';

interface RelationFieldProps {
  field: any;
  title: string;
  formValues: Record<number, any>;
  setFormValues: React.Dispatch<React.SetStateAction<Record<number, any>>>;
  profId: number;
  tempAppId?: any;
  service?: any;
  requiredStar?: any;
  errors?: any;
  isDisabled?: any;
  applicationId?: any;
  currentStatusId?: any;
  handleChange?: any;
  record?: any;
  optionsMainMap?: any;
}

const RelationMultiField: React.FC<RelationFieldProps> = ({
  field,
  title,
  formValues,
  setFormValues,
  profId,
  tempAppId,
  service,
  requiredStar,
  errors,
  isDisabled,
  applicationId,
  currentStatusId,
  handleChange,
  record,
  optionsMainMap,
}) => {
  let parentField = field;
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const langId = isArabic() ? 2 : 1;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedFields, setselectedFields] = useState<any | null>({});
  const [isAlreadyExist, setIsAlreadyExist] = useState<boolean>(false);

  const [childFormFields, setChildFormFields] = useState<any>([]);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [attachments, setAttachments] = useState<Record<string, any[]>>({});
  const attachmentKey = `${field.entityFieldId}_${editingItemIndex}`;

  const [selectedErrors, setSelectedErrors]: any = useState({});
  const [selectedValidations, setSelectedValidations]: any = useState({});
  //search
  const [searchFilters, setSearchFilters] = useState<any>('');
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [responseSearch, setResponseSearch] = useState<any>('');
  const [message, setMessage] = useState<any>('');

  const fieldSettings = field.formSectionFieldSettings
    ? JSON.parse(field.formSectionFieldSettings)
    : {};

  const searchFields = field.relatedEntityFieldFilters
    ? JSON.parse(field.relatedEntityFieldFilters)
    : [];
  isDisabled = isAlreadyExist
    ? true
    : fieldSettings?.canAdd === false
    ? true
    : isDisabled;

  const {userData}: any = useAppSelector(store => store.userDataStored);

  let settings = field?.Settings && JSON.parse(field?.Settings || '{}');

  const getDefaultSelectedFields = (childs?: any) => {
    const result: Record<number, any> = {};
    let childForm = !!childs ? childs : childFormFields;
    !!childForm &&
      childForm?.forEach((group: any) => {
        const allFields =
          (group?.Sections &&
            group?.Sections?.flatMap((section: any) => section.fields)) ||
          [];
        const fields = group?.Sections ? allFields : group?.Fields || [];
        fields?.forEach((field: any) => {
          result[field.entityFieldId] = {value: '', field};
        });
      });

    return result;
  };
  const _getRecordChildForm = (modalOpened: any) => {
    setLoading(true);
    dispatch(
      getRecordChildForm({
        FormSectionFieldId: field.formSectionFieldid,
        RecordId: profId,
        TempAppId: tempAppId != undefined ? tempAppId : '',
        ApplicationId: applicationId != undefined ? applicationId : '',
        ServiceId: service?.serviceId,
        EntityId: field?.entityRelationships
          ? field?.entityRelationships[0].ToEntityId
          : field.entityFieldId,
        CurrentStageId: currentStatusId,
      }),
    ).then(res => {
      setLoading(false);

      if (
        res.meta.requestStatus == 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        let child =
          !!res?.payload[0]?.childFormFields &&
          JSON.parse(res?.payload[0]?.childFormFields);

        setChildFormFields(child);
        if (!editingItemIndex) {
          setSelectedErrors({});
        }
        let childData = child[0];

        if (!!childData?.Values || modalOpened) {
          _getChildEntityFieldLookups(child, true);
        }
        !!searchFilters && setSearchFilters('');
        if (!!childData?.Values && !modalOpened) {
          const childrenEntries = childData?.Values?.map((valueItem: any) => {
            const valuesMap: Record<number, any> = {};

            valueItem?.Fields?.forEach((v: any) => {
              let selectedValues;
              let isMultiSelect =
                childData?.Fields?.find(
                  (field: any) => field.entityFieldId == v.entityFieldId,
                )?.fieldTypeId == 4;
              if (isMultiSelect) {
                selectedValues =
                  typeof v.formSectionFieldValue === 'string' &&
                  v.formSectionFieldValue
                    ? v.formSectionFieldValue
                        .split(',')
                        .map((val: any) => val.trim())
                    : v.formSectionFieldValue;
              }

              valuesMap[v.entityFieldId] = {
                value: isMultiSelect ? selectedValues : v.formSectionFieldValue,
                fieldTypeId: childData?.Fields?.find(
                  (field: any) => field.entityFieldId == v.entityFieldId,
                )?.fieldTypeId,
                field: childData?.Fields?.find(
                  (field: any) => field.entityFieldId == v.entityFieldId,
                ),
              };
            });

            const formFields: any = {};
            childData?.Fields.forEach((f: any) => {
              formFields[f.entityFieldId] = {
                value: valuesMap[f.entityFieldId]?.value ?? '',
                fieldTypeId: valuesMap[f.entityFieldId]?.fieldTypeId,
                field: valuesMap[f.entityFieldId]?.field,
              };
            });

            const visibleFields = childData?.Fields.filter(
              (f: any) => f.showOnMainForm === 'Show',
            ).reduce((acc: Record<string, any>, fiel: any) => {
              const fieldName = JSON.parse(
                fiel.formSectionFieldName || '{}',
              ).find((t: any) => t.langId === langId)?.value;
              let shouldHide = false;
              fiel?.constraints?.forEach((constraint: any) => {
                if (constraint.constraintTypeId === 4 && constraint?.Settings) {
                  const settings = JSON.parse(constraint.Settings);
                  settings?.ControlBy?.forEach((controlFieldId: number) => {
                    const controlValue = valuesMap[controlFieldId];

                    let expectedValues: string[] = [];

                    try {
                      if (Array.isArray(settings.Values)) {
                        expectedValues = settings.Values.map(String);
                      } else if (typeof settings.Values === 'string') {
                        const fixed = settings.Values.replace(/'/g, '"');
                        const parsed = JSON.parse(fixed);

                        if (Array.isArray(parsed)) {
                          expectedValues = parsed.map(String);
                        } else {
                          expectedValues = [String(parsed)];
                        }
                      } else {
                        expectedValues = [String(settings.Values)];
                      }
                    } catch (e) {
                      expectedValues = [String(settings.Values)];
                    }
                    if (!expectedValues.includes(String(controlValue?.value))) {
                      shouldHide = true;
                    }
                  });
                }
                if (constraint.constraintTypeId === 2 && constraint?.Settings) {
                  const settings = JSON.parse(constraint.Settings);
                  const controlBy = settings.ControlBy || [];
                  const rawValues = settings.Values || '[]';
                  const fixedJson = rawValues.replace(/'/g, '"');
                  const values = JSON.parse(fixedJson);

                  let hide = false;
                  controlBy.forEach((controlFieldId: number) => {
                    const controlValue =
                      selectedFields?.[controlFieldId]?.value;
                    if (values.includes(String(controlValue))) {
                      hide = true;
                    }
                  });

                  if (hide) return null;
                }
              });

              if (!shouldHide) {
                acc[fieldName] = {
                  value: valuesMap[fiel.entityFieldId]?.value ?? '',
                  fieldTypeId: fiel.fieldTypeId,
                  field: fiel,
                };
              }
              return acc;
            }, {});

            return {
              itemIndex: valueItem.ItemIndex,
              fields: formFields,
              data: visibleFields,
              status: applicationId == 0 ? 1 : 2,
            };
          });

          setFormValues(prev => ({
            ...prev,
            [field.entityFieldId]: {
              value: {
                children: childrenEntries,
              },
            },
          }));
        }
      }
    });
  };

  useEffect(() => {
    let appChield = true;
    if (modalVisible) {
      if (
        // (path == 'record') ||
        (applicationId == 0 &&
          ((record && record?.recordId) ||
            service?.isServiceProfile == 'true' ||
            fieldSettings?.returnAllRecord == true)) ||
        !!searchFilters
      ) {
        appChield = false;
      }
      if (service?.serviceId == 1050) {
        appChield = true;
      }
      if (appChield) {
        _getApplicationChildForm(modalVisible);
      } else {
        _getRecordChildForm(modalVisible);
      }
    }
  }, [modalVisible]);

  useEffect(() => {
    let appChield = true;

    if (
      // (path == 'record') ||
      (applicationId == 0 &&
        ((record && record?.recordId) ||
          service?.isServiceProfile == 'true' ||
          fieldSettings?.returnAllRecord == true)) ||
      !!searchFilters
    ) {
      appChield = false;
    }
    if (service?.serviceId == 1050) {
      appChield = true;
    }
    if (appChield) {
      _getApplicationChildForm(modalVisible);
    } else {
      _getRecordChildForm(modalVisible);
    }
  }, []);

  const [optionsMap, setOptionsMap]: any = useState('');
  const [treeOptions, setTreeOptions] = useState([]);

  const [optionsMapAll, setOptionsMapAll]: any = useState('');

  const getFieldsWithRelatedField = (fields: any[]) => {
    const relatedFields: {
      entityFieldId: number;
      relatedFieldId: number;
      textFieldId: number;
      showAllOptions: any;
    }[] = [];

    fields.forEach(field => {
      try {
        if (field.Settings) {
          const settings = JSON.parse(field.Settings);
          if (settings.relatedField?.id && settings.relatedField?.textFieldId) {
            relatedFields.push({
              entityFieldId: field.entityFieldId,
              relatedFieldId: settings.relatedField?.id,
              textFieldId: settings.relatedField.textFieldId,
              showAllOptions: settings.relatedField?.showAllOptions,
            });
          }
        }
      } catch (e) {}
    });

    return relatedFields;
  };

  const getRelatedFieldOptionsFromFormValues = (
    formValues: any,
    relatedFieldsDefs: {
      entityFieldId: number;
      relatedFieldId: number;
      textFieldId: number;
      showAllOptions: any;
    }[],
  ) => {
    const optionsMap: Record<number, any[]> = {};

    relatedFieldsDefs.forEach(
      ({entityFieldId, relatedFieldId, textFieldId, showAllOptions}) => {
        const related = formValues?.[relatedFieldId];
        const children = related?.value?.children;
        let options = [];

        if (children) {
          options = children
            .map((child: any) => {
              const textField = child.fields?.[textFieldId];
              if (!textField?.value) return null;

              return {
                label: textField.value,
                value: child.itemIndex?.toString(),
                lookupId: textFieldId,
                lookupValue: textField.value,
                lookupValueId: child.itemIndex?.toString(),
              };
            })
            .filter(Boolean);
        } else {
          let multiSelectValue = [];

          if (typeof related?.value == 'string') {
            multiSelectValue = related?.value.split(',').filter((x: any) => x);
          } else {
            multiSelectValue = related?.value;
          }

          let relatedFieldsOptions = [];
          if (showAllOptions) {
            relatedFieldsOptions = optionsMainMap?.[relatedFieldId];
          } else {
            relatedFieldsOptions = optionsMainMap?.[relatedFieldId]?.filter(
              (x: any) =>
                multiSelectValue.find(
                  (y: any) => y.toString() == x.value.toString(),
                ),
            );
          }

          options = relatedFieldsOptions;
        }
        if (options.length > 0) {
          optionsMap[entityFieldId] = options;
        }
      },
    );

    return optionsMap;
  };

  const _getChildEntityFieldLookups = (childs: any, allFields = false) => {
    dispatch(
      getChildEntityFieldLookups({
        FormSectionParentId: field.formSectionFieldid,
      }),
    ).then(res => {
      setLoading(false);
      if (res.payload.networkSuccess) {
        const payloadArray = Object.values(res.payload);
        const lookupOptionsMap: Record<number, any[]> = {};
        const lookupOptionsMapAll: Record<number, any[]> = {};
        const cascadedEntityFieldIds =
          !!childs &&
          childs.length > 0 &&
          childs
            ?.flatMap((group: any) => {
              const allFields =
                (group?.Sections &&
                  group?.Sections?.flatMap((section: any) => section.fields)) ||
                [];
              const fields = group?.Sections ? allFields : group?.Fields || [];
              return fields || [];
            })
            ?.filter((f: any) =>
              f.constraints?.some(
                (c: any) =>
                  c.constraintTypeId === ConstraintTypeEnum.CascadingLoad,
              ),
            )
            ?.map((f: any) => f.entityFieldId);

        payloadArray.forEach((fieldLookup: any) => {
          try {
            const fieldId = fieldLookup.entityFieldId;

            const isCascaded = cascadedEntityFieldIds.includes(fieldId);

            if (!isCascaded) {
              const parsedOptions = JSON.parse(
                fieldLookup.entityData || '[]',
              ).map((opt: any) => ({
                label: opt.lookupValue,
                value: opt.lookupValueId,
                lookupId: opt.lookupId,
                settings: opt?.Settings,
              }));

              lookupOptionsMap[fieldLookup.entityFieldId] = parsedOptions;
            }
            if (allFields) {
              const parsedOptionsAll = JSON.parse(
                fieldLookup.entityData || '[]',
              ).map((opt: any) => ({
                label: opt.lookupValue,
                value: opt.lookupValueId,
                lookupId: opt.lookupId,
                settings: opt?.Settings,
              }));

              lookupOptionsMapAll[fieldLookup.entityFieldId] = parsedOptionsAll;
            }
          } catch (e) {}
        });
        const allFormFields =
          childs?.flatMap((g: any) =>
            g.Sections
              ? g.Sections.flatMap((s: any) => s.fields)
              : g.Fields || [],
          ) || [];
        const relatedFieldsDefs = getFieldsWithRelatedField(allFormFields);
        const relatedOptionsMap = getRelatedFieldOptionsFromFormValues(
          formValues,
          relatedFieldsDefs,
        );

        setOptionsMap((prev: any) => ({
          ...prev,
          ...lookupOptionsMap,
          ...relatedOptionsMap,
        }));
        setOptionsMapAll((prev: any) => ({
          ...prev,
          ...lookupOptionsMapAll,
          ...relatedOptionsMap,
        }));
      }
    });
  };

  const handleCascadedFieldsChange = (
    changedFieldId: any,
    changedLookupId: any,
  ) => {
    childFormFields.forEach((group: any) => {
      const allFields =
        (group?.Sections &&
          group?.Sections?.flatMap((section: any) => section.fields)) ||
        [];
      const fields = group?.Sections ? allFields : group?.Fields || [];
      fields.forEach((childField: any) => {
        const isCascaded = childField.constraints?.some(
          (c: any) => c.constraintTypeId === ConstraintTypeEnum.CascadingLoad,
        );

        if (isCascaded) {
          const constraint = childField.constraints.find(
            (c: any) => c.constraintTypeId === ConstraintTypeEnum.CascadingLoad,
          );

          const settings = JSON.parse(constraint?.Settings || '{}');

          const parents = Array.isArray(settings?.Cascaded)
            ? settings.Cascaded
            : [parseInt(settings.Cascaded)];
          if (parents.includes(parseInt(changedFieldId))) {
            dispatch(
              getCascadedLookups({
                LookupParentId: changedLookupId,
                ProfileRecordId: userData?.record?.RecordId || '',
                ExtraValues: '',
                EntityFieldId: childField.entityFieldId,
              }),
            ).then(response => {
              if (
                response.meta.requestStatus === 'fulfilled' &&
                response.payload
              ) {
                const entity: any = Object.values(response.payload)[0];

                if (entity?.entityData) {
                  const options = JSON.parse(entity.entityData).map(
                    (opt: any) => ({
                      label: opt.lookupValue,
                      value: opt.lookupValueId,
                      lookupId: opt.lookupId,
                      settings: opt?.Settings,
                    }),
                  );

                  setOptionsMap((prev: any) => ({
                    ...prev,
                    [childField.entityFieldId]: options,
                  }));
                  // setselectedFields((prev: any) => ({
                  //   ...prev,
                  //   [childField.entityFieldId]: {value: ''},
                  // }));
                }
              }
            });
          }
        }
      });
    });
  };
  const deleteCascadedFieldsOtions = () => {
    const newOptionsMap = {...optionsMap};
    childFormFields.forEach((group: any) => {
      const allFields =
        (group?.Sections &&
          group?.Sections?.flatMap((section: any) => section.fields)) ||
        [];
      const fields = group?.Sections ? allFields : group?.Fields || [];
      fields.forEach((f: any) => {
        const isCascaded = f.constraints?.some(
          (c: any) => c.constraintTypeId === ConstraintTypeEnum.CascadingLoad,
        );
        if (isCascaded) {
          delete newOptionsMap[f.entityFieldId];
        }
      });
    });
    setOptionsMap(newOptionsMap);
  };

  const getNextItemIndex = () => {
    const existingChildren =
      formValues[field.entityFieldId]?.value?.children || [];
    return existingChildren.length + 1;
  };

  const handleFieldChange = (
    fieldId: number,
    value: any,
    field?: any,
    newFieldsInit?: any,
  ) => {
    let newFields = {
      ...selectedFields,
      [fieldId]:
        typeof value === 'object' && !!value?.value && value !== null
          ? value
          : {value, field},
    };

    if (newFieldsInit != undefined) {
      newFields = {
        ...newFieldsInit,
        [fieldId]:
          typeof value === 'object' && !!value?.value && value !== null
            ? value
            : {value, field},
      };
    }

    setselectedFields(newFields);

    if (value?.lookupId)
      handleCascadedFieldsChange(field.entityFieldId, value?.lookupId);

    let error = '';
    let validation = '';

    if (
      field != undefined &&
      field?.constraints &&
      field?.formSectionFieldTypeName !== 'TermsCondition'
    ) {
      field.constraints.forEach((constraint: any) => {
        // Required
        if (
          constraint.constraintTypeId === ConstraintTypeEnum.Required &&
          !value
        ) {
          error =
            JSON.parse(constraint.textMessages).find(
              (msg: any) => msg.langId === langId,
            )?.value || t('Field is required');
        }

        // Regex types
        const regexConstraint = (type: number, messageKey: string) => {
          if (constraint.constraintTypeId === type && value) {
            const settings =
              !!constraint?.Settings &&
              JSON.parse(constraint?.Settings || '{}');
            const regexPattern = settings?.Regexp;
            if (regexPattern) {
              const regex = new RegExp(regexPattern);
              if (!regex.test(value)) {
                validation = t(messageKey);
              }
            }
          }
        };

        regexConstraint(
          ConstraintTypeEnum.Mobile,
          'ValidatorMessages.MobileValidator',
        );
        regexConstraint(
          ConstraintTypeEnum.EmiratesID,
          'ValidatorMessages.EmiratesIdValidator',
        );
        regexConstraint(
          ConstraintTypeEnum.Landline,
          'ValidatorMessages.LandLineValidator',
        );
        regexConstraint(
          ConstraintTypeEnum.Email,
          'ValidatorMessages.EmailValidator',
        );

        // ClientSideCascading
        if (
          constraint.constraintTypeId ===
            ConstraintTypeEnum.ClientSideCascading &&
          value
        ) {
          let settings = JSON.parse(value.settings || '{}');
          let clientFieldsData = settings?.clientFieldsData;

          if (Array.isArray(clientFieldsData)) {
            clientFieldsData.forEach((item: any) => {
              const targetFieldId = item?.eFId;
              const fieldValue = Array.isArray(item?.vaue)
                ? item?.vaue[0]
                : item?.vaue;

              handleFieldChange(
                targetFieldId,
                fieldValue,
                undefined,
                newFields,
              );
            });
          }
        }
      });
    }

    setSelectedErrors((prev: any) => ({...prev, [fieldId]: error}));
    setSelectedValidations((prev: any) => ({...prev, [fieldId]: validation}));
  };

  const validateRequiredFields = (): boolean => {
    let isValid = true;
    const newErrors: any = {};

    childFormFields.forEach((group: any) => {
      const allFields =
        (group?.Sections &&
          group?.Sections?.flatMap((section: any) => section.fields)) ||
        [];
      const fields = group?.Sections ? allFields : group?.Fields || [];
      fields.forEach((field: any) => {
        const isRequired = field.constraints?.some(
          (c: any) => c.constraintTypeId === 1,
        );

        const isHidden = field.constraints?.some((constraint: any) => {
          if (
            constraint.constraintTypeId === ConstraintTypeEnum.HideForValues
          ) {
            const settings = JSON.parse(constraint.Settings || '{}');
            const controlBy = settings.ControlBy || [];
            const rawValues = settings.Values || '[]';
            const fixedJson = rawValues.replace(/'/g, '"');
            const values = JSON.parse(fixedJson);

            return controlBy.some((controlFieldId: number) => {
              const controlValue = selectedFields?.[controlFieldId]?.value;
              return values.includes(String(controlValue));
            });
          }
          if (
            constraint.constraintTypeId === ConstraintTypeEnum.VisibleByValue
          ) {
            const settings = JSON.parse(constraint.Settings || '{}');
            const controlBy = settings.ControlBy || [];
            const rawValues = settings.Values || '[]';
            let values: string[] = [];

            try {
              if (typeof rawValues === 'string') {
                const fixed = rawValues.replace(/'/g, '"');

                const parsed = JSON.parse(fixed);

                if (Array.isArray(parsed)) {
                  values = parsed.map(String);
                } else {
                  values = [String(parsed)];
                }
              } else if (Array.isArray(rawValues)) {
                values = rawValues.map(String);
              } else {
                values = [];
              }
            } catch (e) {
              values = [String(rawValues)];
            }

            return controlBy.some((controlFieldId: number) => {
              const controlValue = selectedFields?.[controlFieldId]?.value;

              const isHidden = Array.isArray(controlValue)
                ? !controlValue.some(value => values.includes(String(value)))
                : !values.includes(String(controlValue));

              return isHidden;
            });
          }
          return false;
        });

        if (
          (isRequired && !isHidden) ||
          field?.fieldTypeId === FieldTypeEnum.TermsCondition
        ) {
          const value = selectedFields?.[field.entityFieldId]?.value;
          if (
            value === '' ||
            value === undefined ||
            value === null ||
            !value ||
            (Array.isArray(value) && value.length === 0)
          ) {
            isValid = false;

            const msg = field?.constraints?.find(
              (c: any) => c.constraintTypeId === 1,
            )?.textMessages;

            const parsed = !!msg && JSON.parse(msg);
            const localizedMsg =
              (!!parsed &&
                parsed?.find((m: any) => m.langId === langId)?.value) ||
              t('Messages.Required');

            newErrors[field.entityFieldId] = localizedMsg;
          }
        }
      });
      group?.FormSectionAttachments?.forEach((attachment: any) => {
        const isAttachmentRequired = attachment.constraints?.some(
          (c: any) => c.constraintTypeId === 1,
        );

        const attachmentValue = attachments[attachmentKey] || [];

        if (
          isAttachmentRequired &&
          !!getAttachmentVisibility(selectedFields, attachment) &&
          (attachmentValue?.length === 0 ||
            Object.keys(attachmentValue).length === 0 ||
            (Object.keys(attachmentValue).length > 0 &&
              attachmentValue[attachment.FormSectionAttachmentId] &&
              attachmentValue[attachment.FormSectionAttachmentId]?.length ===
                0))
        ) {
          isValid = false;
          const attachmentMsg = JSON.parse(
            attachment.constraints[0].textMessages,
          );
          const localizedMsg =
            attachmentMsg.find((msg: any) => msg.langId === langId)?.value ||
            t('Messages.Required');

          newErrors[attachment.FormSectionAttachmentId] = localizedMsg;
        }
      });
    });

    setSelectedErrors((prev: any) => ({
      ...prev,
      ...newErrors,
    }));

    return isValid;
  };
  const addValuesToData = () => {
    const localizedFieldValues: Record<string, any> = {};
    childFormFields.forEach((group: any) => {
      const allFields =
        (group?.Sections &&
          group?.Sections?.flatMap((section: any) => section.fields)) ||
        [];
      const fields = group?.Sections ? allFields : group?.Fields || [];
      fields.forEach((field: any) => {
        const title = JSON.parse(field.formSectionFieldName).find(
          (t: any) => t.langId === langId,
        )?.value;
        if (field.showOnMainForm == 'Show') {
          const fieldValue =
            selectedFields?.[field.entityFieldId]?.label ||
            selectedFields?.[field.entityFieldId]?.value ||
            '';

          if (
            !!selectedFields?.[field.entityFieldId]?.label ||
            !!selectedFields?.[field.entityFieldId]?.value
          ) {
            if (
              editingItemIndex ||
              selectedFields?.[field.entityFieldId]?.fieldTypeId ==
                FieldTypeEnum.MultiSelect ||
              selectedFields?.[field.entityFieldId]?.fieldTypeId ==
                FieldTypeEnum.Boolean
            ) {
              localizedFieldValues[title] = {
                value: selectedFields?.[field.entityFieldId]?.label
                  ? selectedFields?.[field.entityFieldId]?.label
                  : selectedFields?.[field.entityFieldId]?.value,
                fieldTypeId: selectedFields?.[field.entityFieldId]?.fieldTypeId,
                field: selectedFields?.[field.entityFieldId]?.field,
              };
            } else {
              localizedFieldValues[title] = fieldValue;
            }
          }
        }
      });
    });

    return localizedFieldValues;
  };

  // default value

  const _getApplicationChildForm = (modalOpened: any) => {
    setLoading(true);
    dispatch(
      getApplicationChildForm({
        EntityId: field?.entityRelationships
          ? field?.entityRelationships[0].ToEntityId
          : 0,
        FormSectionFieldId: field?.formSectionFieldid,
        ServiceId: service?.serviceId,
        ApplicationId: applicationId,
        ItemIndex: field?.itemIndex ? field?.itemIndex : null,
        defaultValues: record?.defaultValueArr || '',
      }),
    ).then((res: any) => {
      setLoading(false);
      if (res.meta.requestStatus === 'fulfilled') {
        const childFormFields = JSON.parse(res.payload[0]?.childFormFields);

        if (!childFormFields?.length) return;

        const childData = childFormFields[0];
        setChildFormFields(childFormFields);

        if (!!childData?.Values || modalOpened) {
          _getChildEntityFieldLookups(childFormFields, true);
        }

        if (
          (applicationId != 0 && !modalOpened) ||
          (!!childData?.Values && service.serviceId == 1050)
        ) {
          const allFields =
            (childData?.Sections &&
              childData?.Sections.flatMap((section: any) => [
                ...(section?.fields || []),
              ])) ||
            [];
          const fields = childData?.Sections
            ? allFields
            : childData?.Fields || [];

          const childrenEntries = childData?.Values?.map((valueItem: any) => {
            const valuesMap: Record<number, any> = {};

            valueItem?.Fields?.forEach((v: any) => {
              let selectedValues;
              let isMultiSelect =
                fields?.find(
                  (field: any) => field.entityFieldId == v.entityFieldId,
                )?.fieldTypeId == 4;
              if (isMultiSelect) {
                selectedValues =
                  typeof v.formSectionFieldValue === 'string' &&
                  v.formSectionFieldValue
                    ? v.formSectionFieldValue
                        .split(',')
                        .map((val: any) => val.trim())
                    : v.formSectionFieldValue;
              }

              valuesMap[v.entityFieldId] = {
                value: isMultiSelect ? selectedValues : v.formSectionFieldValue,
                fieldTypeId: fields?.find(
                  (field: any) => field.entityFieldId == v.entityFieldId,
                )?.fieldTypeId,
                field: fields?.find(
                  (field: any) => field.entityFieldId == v.entityFieldId,
                ),
              };
            });

            const formFields: any = {};
            fields.forEach((f: any) => {
              formFields[f.entityFieldId] = {
                value: valuesMap[f.entityFieldId]?.value ?? '',
                fieldTypeId: valuesMap[f.entityFieldId]?.fieldTypeId,
                field: valuesMap[f.entityFieldId]?.field,
              };
            });

            const visibleFields = fields
              .filter((f: any) => f.showOnMainForm === 'Show')
              .reduce((acc: Record<string, any>, fiel: any) => {
                const fieldName = JSON.parse(
                  fiel.formSectionFieldName || '{}',
                ).find((t: any) => t.langId === langId)?.value;
                let shouldHide = false;
                fiel?.constraints?.forEach((constraint: any) => {
                  if (
                    constraint.constraintTypeId === 4 &&
                    constraint?.Settings
                  ) {
                    const settings = JSON.parse(constraint.Settings);
                    settings?.ControlBy?.forEach((controlFieldId: number) => {
                      const controlValue = valuesMap[controlFieldId];

                      let expectedValues: string[] = [];

                      try {
                        if (Array.isArray(settings.Values)) {
                          expectedValues = settings.Values.map(String);
                        } else if (typeof settings.Values === 'string') {
                          const fixed = settings.Values.replace(/'/g, '"');
                          const parsed = JSON.parse(fixed);

                          if (Array.isArray(parsed)) {
                            expectedValues = parsed.map(String);
                          } else {
                            expectedValues = [String(parsed)];
                          }
                        } else {
                          expectedValues = [String(settings.Values)];
                        }
                      } catch (e) {
                        expectedValues = [String(settings.Values)];
                      }
                      if (
                        !expectedValues.includes(String(controlValue?.value))
                      ) {
                        shouldHide = true;
                      }
                    });
                  }
                  if (
                    constraint.constraintTypeId === 2 &&
                    constraint?.Settings
                  ) {
                    const settings = JSON.parse(constraint.Settings);
                    const controlBy = settings.ControlBy || [];
                    const rawValues = settings.Values || '[]';
                    const fixedJson = rawValues.replace(/'/g, '"');
                    const values = JSON.parse(fixedJson);

                    let hide = false;
                    controlBy.forEach((controlFieldId: number) => {
                      const controlValue =
                        selectedFields?.[controlFieldId]?.value;
                      if (values.includes(String(controlValue))) {
                        hide = true;
                      }
                    });

                    if (hide) return null;
                  }
                });

                if (!shouldHide) {
                  acc[fieldName] = {
                    value: valuesMap[fiel.entityFieldId]?.value ?? '',
                    fieldTypeId: fiel.fieldTypeId,
                    field: fiel,
                  };
                }
                return acc;
              }, {});
            if (service.serviceId == 1050) {
              return {
                itemIndex: valueItem.ItemIndex,
                fields: formFields,
                data: visibleFields,
                status: 2,
                RecordId: valueItem.RecordId,
              };
            } else {
              return {
                itemIndex: valueItem.ItemIndex,
                fields: formFields,
                data: visibleFields,
                status: applicationId == 0 ? 1 : 2,
              };
            }
          });

          setFormValues(prev => ({
            ...prev,
            [field.entityFieldId]: {
              value: {
                children: childrenEntries,
              },
            },
          }));
        }
      }
    });
  };

  const processedParents = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!childFormFields?.length || !selectedFields) return;
    const sectionFields =
      (childFormFields?.[0]?.Sections &&
        childFormFields?.[0]?.Sections.flatMap((section: any) => [
          ...(section?.fields || []),
        ])) ||
      [];

    const allFields = childFormFields?.[0]?.Sections
      ? sectionFields
      : childFormFields.flatMap((g: any) => g.Fields || []) || [];
    // const allFields = childFormFields.flatMap((g: any) => g.Fields || []);

    const cascadedConstraints = allFields
      .filter((f: any) =>
        f.constraints?.some(
          (c: any) => c.constraintTypeId === ConstraintTypeEnum.CascadingLoad,
        ),
      )
      .map((f: any) =>
        f.constraints.find(
          (c: any) => c.constraintTypeId === ConstraintTypeEnum.CascadingLoad,
        ),
      )
      .filter(Boolean);

    const parentFieldIds = cascadedConstraints.flatMap((constraint: any) => {
      const settings =
        constraint?.Settings && JSON.parse(constraint?.Settings || '{}');
      const parents = settings.Cascaded;

      return Array.isArray(parents) ? parents : [parseInt(parents)];
    });

    Object.entries(selectedFields).forEach(([fieldIdStr, valObj]: any) => {
      const fieldId = parseInt(fieldIdStr);
      const fieldValue = valObj?.value;

      if (
        !parentFieldIds.includes(fieldId) ||
        processedParents.current.has(fieldId)
      )
        return;

      const matchedOption = optionsMap?.[fieldId]?.find(
        (opt: any) => String(opt.value) === String(fieldValue),
      );

      if (matchedOption?.lookupId) {
        processedParents.current.add(fieldId);
        handleCascadedFieldsChange(fieldId, matchedOption.lookupId);
      }
    });
  }, [childFormFields, optionsMap, selectedFields]);

  const getFieldsChild = (key: any, value: any, itemIndex: any) => {
    const chieldFieldSettings = value?.field?.formSectionFieldSettings
      ? JSON.parse(value?.field?.formSectionFieldSettings)
      : {};

    if (value?.fieldTypeId == FieldTypeEnum.Options) {
      return (
        <Input
          dropdown
          search={
            !!optionsMapAll &&
            optionsMapAll[value?.field?.entityFieldId].length > 5
              ? true
              : false
          }
          label={key}
          items={
            (!!optionsMapAll && optionsMapAll[value?.field?.entityFieldId]) ||
            []
          }
          placeholder={t('Select')}
          value={value.value || ''}
          disabled={true}
          viewStyle={{width: '100%'}}
        />
      );
    }
    if (chieldFieldSettings?.showAsDropDown) {
      return (
        <RelationMultiDropDownField
          field={value?.field}
          title={key}
          formValues={{[value?.field?.entityFieldId]: {value: value?.value}}}
          setFormValues={setselectedFields}
          recordId={responseSearch?.[0]?.recordId}
          tempAppId={tempAppId}
          service={service}
          record={record}
          errors={[]}
          isDisabled={true}
          applicationId={applicationId}
          currentStatusId={service?.stageId}
          handleChange={handleFieldChange}
          itemIndex={itemIndex}
        />
      );
    }

    if (value?.fieldTypeId == FieldTypeEnum.MultiSelect) {
      return (
        <Input
          multiSelect
          search={
            !!optionsMapAll &&
            optionsMapAll[value?.field?.entityFieldId].length > 5
              ? true
              : false
          }
          label={key}
          items={
            (!!optionsMapAll && optionsMapAll[value?.field?.entityFieldId]) ||
            []
          }
          placeholder={t('Select')}
          value={value.value || ''}
          disabled={true}
          viewStyle={{width: '100%'}}
        />
      );
    }
    if (value?.fieldTypeId == 8) {
      return (
        <Input
          radio
          row
          radioGroup={[
            {label: t('true'), value: 'true'},
            {label: t('false'), value: 'false'},
          ]}
          title={key}
          value={value.value}
          disabled={true}
          viewStyle={{width: '100%'}}
        />
      );
    }
    return (
      <Input
        textInput
        label={key}
        value={value.value}
        viewStyle={{width: '100%'}}
        disabled
      />
    );
  };

  // Search no popup

  const fetchRelationOptions = (reset = false) => {
    setLoadingSearch(true);

    const filtersArray = Object.entries(searchFilters)
      .filter(([_, value]: any) => value.trim() !== '')
      .map(([entityFieldId, value]) => {
        const searchField = searchFields.find(
          (f: any) => f.entityFieldId == Number(entityFieldId),
        );
        let searchFieldOperator = '';
        let settings = searchField.settings
          ? JSON.parse(searchField.settings)
          : '';

        if (settings && settings.CascadedBy) {
          searchField.fieldTypeId = EntityFieldTypeEnum.Options;
          searchField.entityFieldLookups = [];
        }
        if (settings?.equalOnly) {
          searchFieldOperator = 'equal';
        } else if (settings?.containsOnly) {
          searchFieldOperator = 'contains';
        }
        return {
          EntityFieldId: Number(entityFieldId),
          FieldTypeId: searchField?.fieldTypeId ?? 1,
          Operator: searchFieldOperator
            ? searchFieldOperator
            : searchField.fieldTypeId != EntityFieldTypeEnum.Integer
            ? 'contains'
            : '',
          Value: value,
        };
      });
    let extraFieldFilters = '';
    if (!reset) {
      extraFieldFilters = !!searchFilters ? JSON.stringify(filtersArray) : '';
    } else {
      extraFieldFilters = '';
      setSearchFilters('');
    }

    dispatch(
      getSearchRelatedRecords({
        FormSectionFieldId: field.formSectionFieldid,
        RecordId: '',
        PageNumber: 1,
        PageSize: 5,
        ProfileRecordId: userData?.record?.RecordId,
        ExtraFieldFilters: extraFieldFilters,
        MatchAnyCondition: false,
        TempAppId: tempAppId != undefined ? tempAppId : '',
        ApplicationId: applicationId != undefined ? applicationId : '',
        ServiceId: service?.serviceId,
      }),
    ).then((res: any) => {
      setLoadingSearch(false);
      if (res.meta.requestStatus === 'fulfilled') {
        if (res.payload.relatedData != null) {
          const responseData = JSON.parse(res.payload.relatedData);
          setModalVisible(true);
          setResponseSearch(responseData);
          const fields = responseData?.[0]?.Fields;
          if (fields && fields.length) {
            const updatedFields: any = {...selectedFields};

            fields.forEach((field: any) => {
              if (
                field?.entityFieldId &&
                field?.formSectionFieldValue !== undefined
              ) {
                updatedFields[field.entityFieldId] = {
                  value: field.formSectionFieldValue,
                  field: field,
                };
              }
            });

            setselectedFields(updatedFields);
          }
        } else {
          setMessage(t('Messages.NoRecord'));
        }
      } else {
        setMessage(t('Messages.NoRecord'));
      }
    });
  };

  const getSearchFields = (searchFields: any) => {
    return (
      searchFields.length > 0 && (
        <>
          <View style={style.searchContainer}>
            {searchFields.map((field: any, index: number) => (
              <Input
                key={index}
                viewStyle={{width: '49%', minWidth: '49%'}}
                styleInput={{
                  backgroundColor: colors.mainBackground,
                  borderColor: colors.border,
                  borderWidth: 1 * BW(),
                }}
                textInput
                placeholder={
                  field.entityFieldTranslation.find(
                    (t: any) => t.langId === langId,
                  )?.value
                }
                placeholderTextColor={colors.textGray}
                value={searchFilters[field.entityFieldId] || ''}
                onChangeText={(value: any) => {
                  handleFieldChange(field.entityFieldId, value, field);
                  setSearchFilters((prev: any) => ({
                    ...prev,
                    [field.entityFieldId]: value,
                  }));
                }}
              />
            ))}
            <View style={style.searchBtnContainer}>
              <Button
                Entypo={'ccw'}
                onPress={() => {
                  !!searchFilters ? fetchRelationOptions(true) : {};
                }}
                EntypoColor={colors.secondaryColor}
                style={{...style.searchBtn, marginEnd: 6 * BW()}}
              />
              <Button
                icon={require('../../../../../assets/header/search.png')}
                styleIcon={{tintColor: colors.secondaryColor}}
                loading={loadingSearch}
                containerIcon={{width: 20 * BW(), height: 20 * BW()}}
                onPress={() =>
                  !!searchFilters ? fetchRelationOptions(false) : {}
                }
                style={style.searchBtn}
              />
            </View>
          </View>
        </>
      )
    );
  };
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard?.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardOffset(e?.endCoordinates?.height);
      },
    );

    const keyboardDidHideListener = Keyboard?.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOffset(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const checkSingleSelectFiledType = (filed: any) => {
    if (filed?.formSectionFieldSettings) {
      let setting = JSON.parse(filed?.formSectionFieldSettings);
      let multiSelectSetting = setting?.multiSelection;

      if (
        multiSelectSetting &&
        multiSelectSetting?.serviceId == service.serviceId
      ) {
        let parentField = formValues?.[multiSelectSetting?.parentEFID];

        let isValueElectrical =
          parentField.children?.[0].fields.find(
            (pf: any) => pf.entityFieldId == multiSelectSetting.enableEFID,
          )?.value == multiSelectSetting.EFIDValue;
        if (isValueElectrical) return false;
        return true;
      }
    }
    return false;
  };
  return (
    <View style={{marginTop: 8 * BW()}}>
      {title && (
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Text h4 medium>
            {title}
          </Text>
          {requiredStar && (
            <Icon
              name="star-of-life"
              size={6 * BW()}
              color="#db2c43"
              style={{marginHorizontal: 4 * BW(), marginBottom: 4 * BW()}}
            />
          )}
        </View>
      )}

      {settings?.Min && settings?.Min > 0 && !isDisabled && (
        <View
          style={{
            marginTop: 4 * BW(),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text h4>
            {t('Labels.AddMinimum')} {settings?.Min}
          </Text>
          <Icon
            name="star-of-life"
            size={6 * BW()}
            color="#db2c43"
            style={{marginHorizontal: 4 * BW(), marginBottom: 4 * BW()}}
          />
        </View>
      )}
      {!!errors[field.entityFieldId] &&
        !formValues[field.entityFieldId]?.value && (
          <Text style={style.requiredText} h5>
            {errors[field.entityFieldId]}
          </Text>
        )}
      {!!formValues[field.entityFieldId]?.value?.children &&
        formValues[field.entityFieldId]?.value?.children.length > 0 &&
        formValues[field.entityFieldId]?.value?.children?.map(
          (item: any, index: number) => (
            <View
              key={index}
              style={{
                marginVertical: 10 * BW(),
                padding: 12 * BW(),
                borderWidth: 1 * BW(),
                borderColor: colors.border,
                borderRadius: 8 * BW(),
              }}>
              {Object.entries(item.data || {}).map(([key, value]: any) =>
                value?.value ? (
                  getFieldsChild(key, value, item.itemIndex)
                ) : (
                  <>
                    <Input
                      key={key}
                      textInput
                      label={key}
                      value={value}
                      viewStyle={{width: '100%'}}
                      disabled
                    />
                  </>
                ),
              )}
              {item?.isSelected == undefined && !isDisabled && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 8 * BW(),
                  }}>
                  <Button
                    style={{
                      backgroundColor: colors.secondaryColor,
                      marginRight: 8 * BW(),
                      paddingHorizontal: 4 * BW(),
                      paddingVertical: 4 * BW(),
                      height: 'auto',
                    }}
                    icon={require('../../../../../assets/icons/edit.png')}
                    styleIcon={style.styleIcon}
                    onPress={() => {
                      const fieldsObject = item.fields || {};

                      Object.entries(fieldsObject).forEach(
                        async ([fieldIdStr, fieldValueObj]: any) => {
                          const fieldId = parseInt(fieldIdStr);

                          await handleFieldChange(fieldId, fieldValueObj, {
                            entityFieldId: fieldId,
                          });
                        },
                      );
                      processedParents.current.clear();

                      setselectedFields(item.fields);

                      // setAttachments((prev: any) => ({
                      //   ...prev,
                      //   [`${field.entityFieldId}_${item.itemIndex}`]:
                      //     item?.attachments || [],
                      // }));
                      setAttachments((prev: any) => {
                        const updatedAttachments = {...prev};
                        updatedAttachments[
                          `${field.entityFieldId}_${item.itemIndex}`
                        ] = item?.attachments;

                        return updatedAttachments;
                      });
                      setEditingItemIndex(item.itemIndex);
                      setModalVisible(true);
                    }}
                  />

                  <Button
                    style={{
                      backgroundColor: '#db2c43',
                      paddingHorizontal: 4 * BW(),
                      paddingVertical: 4 * BW(),
                      height: 'auto',
                    }}
                    styleIcon={style.styleIcon}
                    icon={require('../../../../../assets/icons/delete.png')}
                    onPress={() => {
                      const updatedChildren =
                        formValues[
                          field.entityFieldId
                        ]?.value?.children?.filter(
                          (child: any) => child.itemIndex !== item.itemIndex,
                        ) || [];

                      handleChange(
                        field.entityFieldId,
                        {
                          value: {
                            ...formValues[field.entityFieldId]?.value,
                            children: updatedChildren,
                          },
                        },
                        field,
                      );
                    }}
                  />
                </View>
              )}
              {(isDisabled ||
                (item?.isSelected != undefined && !!item?.isSelected)) && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 8 * BW(),
                  }}>
                  <Button
                    style={{
                      backgroundColor: colors.green,
                      marginRight: 8 * BW(),
                      paddingHorizontal: 4 * BW(),
                      paddingVertical: 4 * BW(),
                      height: 'auto',
                    }}
                    icon={require('../../../../../assets/icons/eye.png')}
                    styleIcon={style.styleIcon}
                    onPress={() => {
                      const fieldsObject = item.fields || {};

                      Object.entries(fieldsObject).forEach(
                        async ([fieldIdStr, fieldValueObj]: any) => {
                          const fieldId = parseInt(fieldIdStr);

                          await handleFieldChange(fieldId, fieldValueObj, {
                            entityFieldId: fieldId,
                          });
                        },
                      );
                      processedParents.current.clear();
                      setselectedFields(item.fields);
                      setIsAlreadyExist(item?.isSelected);

                      // setAttachments((prev: any) => ({
                      //   ...prev,
                      //   [`${field.entityFieldId}_${item.itemIndex}`]:
                      //     item?.attachments || [],
                      // }));
                      setAttachments((prev: any) => {
                        const updatedAttachments = {...prev};
                        updatedAttachments[
                          `${field.entityFieldId}_${item.itemIndex}`
                        ] = item?.attachments;

                        return updatedAttachments;
                      });
                      setEditingItemIndex(item.itemIndex);
                      setModalVisible(true);
                    }}
                  />
                  {item?.isSelected != undefined && !!item?.isSelected && (
                    <Button
                      style={{
                        backgroundColor: '#db2c43',
                        paddingHorizontal: 4 * BW(),
                        paddingVertical: 4 * BW(),
                        height: 'auto',
                      }}
                      styleIcon={style.styleIcon}
                      icon={require('../../../../../assets/icons/delete.png')}
                      onPress={() => {
                        const updatedChildren =
                          formValues[
                            field.entityFieldId
                          ]?.value?.children?.filter(
                            (child: any) => child.itemIndex !== item.itemIndex,
                          ) || [];

                        handleChange(
                          field.entityFieldId,
                          {
                            value: {
                              ...formValues[field.entityFieldId]?.value,
                              children: updatedChildren,
                            },
                          },
                          field,
                        );
                      }}
                    />
                  )}
                </View>
              )}
            </View>
          ),
        )}
      {((!formValues[field.entityFieldId]?.data && applicationId == 0) ||
        (!formValues[field.entityFieldId]?.value?.children &&
          applicationId != 0)) &&
        (isDisabled || (!isDisabled && applicationId !== 0)) && (
          <Loader isLoading={loading}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {!formValues[field.entityFieldId]?.value?.children &&
                !formValues[field.entityFieldId]?.data && (
                  <Text h4>{t('Messages.NoRecord')}</Text>
                )}
            </View>
          </Loader>
        )}
      {!isDisabled && !fieldSettings?.noPopup && (
        <Button
          medium
          title={t('Add') + ' ' + title}
          onPress={() => {
            setModalVisible(true);
            setAttachments({});
          }}
          style={style.btn}
          styleText={style.btnTitle}
        />
      )}
      {!isDisabled && fieldSettings?.noPopup && (
        <View style={style.searchMainContainer}>
          {getSearchFields(searchFields)}
          {message && (
            <Text h4 style={{width: '100%', ...style.requiredText}}>
              {message}
            </Text>
          )}
          <Text h4>{t('Messages.UseSearchButton') + title} </Text>
        </View>
      )}

      {/* {formValues[field.entityFieldId] && (
        <Text style={{marginTop: 8}}>{formValues[field.entityFieldId]}</Text>
      )} */}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={style.modalContainer}>
          <View
            style={[
              style.modalView,
              {
                maxHeight: keyboardOffset ? '50%' : '88%',
                marginBottom: keyboardOffset,
              },
            ]}>
            <Text h3 bold>
              {t('Add')} {title}
            </Text>
            {/* {getSearchFields(searchFields)} */}

            <Loader isLoading={loading}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 50 * BW()}}>
                <View
                  style={{
                    backgroundColor: colors.mainBackground,
                  }}>
                  {(childFormFields == null ||
                    childFormFields?.length == 0) && (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 220 * BW(),
                      }}>
                      <Text h4>{t('Messages.NoRecord')}</Text>
                    </View>
                  )}
                  {modalVisible &&
                    childFormFields?.map((group: any, groupIndex: number) => {
                      // const allFields =
                      //   (group?.Sections &&
                      //     group?.Sections?.flatMap(
                      //       (section: any) => section.fields,
                      //     )) ||
                      //   [];

                      const allFields =
                        (group?.Sections &&
                          group?.Sections.flatMap((section: any) => [
                            {sectionName: section?.sectionName || []},
                            ...(section?.fields || []),
                            ...(section?.SectionAttachments || []),
                          ])) ||
                        [];
                      const fields = group?.Sections
                        ? allFields
                        : group?.Fields || [];
                      const attachmentVisibility: any = {};
                      group?.FormSectionAttachments?.forEach(
                        (attachment: any) => {
                          attachmentVisibility[attachment.AttachmentId] =
                            getAttachmentVisibility(selectedFields, attachment);
                        },
                      );
                      return (
                        <Fragment key={groupIndex}>
                          {fields.map((field: any, fieldIndex: any) => {
                            const title =
                              field?.formSectionFieldName &&
                              JSON.parse(field?.formSectionFieldName).find(
                                (t: any) => t.langId === langId,
                              )?.value;

                            const isRequired = field.constraints?.some(
                              (c: any) => c.constraintTypeId === 1,
                            );

                            const isDisabledField =
                              field?.fieldModeId === 2 || isDisabled;
                            const fieldValue =
                              selectedFields?.[field.entityFieldId]?.value ||
                              '';

                            const hideForValuesConstraint =
                              field.constraints?.find(
                                (c: any) =>
                                  c.constraintTypeId ===
                                  ConstraintTypeEnum.HideForValues,
                              );

                            if (hideForValuesConstraint) {
                              const settings = JSON.parse(
                                hideForValuesConstraint.Settings || '{}',
                              );
                              const controlBy = settings.ControlBy || [];
                              const rawValues = settings.Values || '[]';
                              const fixedJson = rawValues.replace(/'/g, '"');
                              const values = JSON.parse(fixedJson);

                              let shouldHide = false;

                              controlBy.forEach((controlFieldId: number) => {
                                const controlValue =
                                  selectedFields?.[controlFieldId]?.value;
                                if (values.includes(String(controlValue))) {
                                  shouldHide = true;
                                }
                              });

                              if (shouldHide) return null;
                            }
                            const VisibleByValueConstraint =
                              field?.constraints?.find(
                                (c: any) =>
                                  c.constraintTypeId ===
                                  ConstraintTypeEnum.VisibleByValue,
                              );

                            if (VisibleByValueConstraint) {
                              const settings = JSON.parse(
                                VisibleByValueConstraint?.Settings || '{}',
                              );
                              const controlBy = settings.ControlBy || [];
                              const rawValues = settings.Values || '[]';

                              let shouldHide = false;
                              controlBy.forEach((controlFieldId: number) => {
                                const controlValue =
                                  selectedFields?.[controlFieldId]?.value;
                                if (Array.isArray(controlValue)) {
                                  if (
                                    !controlValue.some(value =>
                                      rawValues.includes(String(value)),
                                    )
                                  ) {
                                    shouldHide = true;
                                  }
                                } else {
                                  if (
                                    !controlValue ||
                                    !rawValues.includes(String(controlValue))
                                  ) {
                                    shouldHide = true;
                                  }
                                }
                              });
                              if (shouldHide) return null;
                            }
                            const chieldFieldSettings =
                              field.formSectionFieldSettings
                                ? JSON.parse(field.formSectionFieldSettings)
                                : {};
                            if (field?.hideOnPopup) return null;

                            let attachmentData: any = false;
                            if (!!field?.FormSectionAttachmentId) {
                              const VisibleFileConstraint =
                                field?.constraints?.find(
                                  (c: any) =>
                                    c.constraintTypeId ===
                                    FileConstraintTypeEnum.VisibleByValue,
                                );
                              if (VisibleFileConstraint) {
                                const settings = JSON.parse(
                                  VisibleFileConstraint?.Settings || '{}',
                                );
                                const controlBy = settings.ControlBy || [];
                                const rawValues = settings.Values || '[]';

                                let shouldHide = false;
                                controlBy.forEach((controlFieldId: number) => {
                                  const controlValue =
                                    selectedFields?.[controlFieldId]?.value;
                                  if (Array.isArray(controlValue)) {
                                    if (
                                      !controlValue.some(value =>
                                        rawValues.includes(String(value)),
                                      )
                                    ) {
                                      shouldHide = true;
                                    }
                                  } else {
                                    if (
                                      !controlValue ||
                                      !rawValues.includes(String(controlValue))
                                    ) {
                                      shouldHide = true;
                                    }
                                  }
                                });
                                if (shouldHide) return null;
                              }
                              attachmentData = {
                                FormSectionAttachments: [{...field}],
                              };

                              if (attachmentData) {
                                return (
                                  <AttachmentsField
                                    section={attachmentData}
                                    langId={langId}
                                    service={service}
                                    tempAppId={tempAppId}
                                    attachments={attachments}
                                    extraKey={attachmentKey}
                                    setAttachments={setAttachments}
                                    errors={selectedErrors}
                                    applicationId={applicationId}
                                    isDisabled={isDisabled}
                                    formValues={formValues}
                                    visibility={[]}
                                    parentEntityFieldId={
                                      parentField.entityFieldId
                                    }
                                    itemIndex={
                                      editingItemIndex
                                        ? editingItemIndex
                                        : getNextItemIndex()
                                    }
                                  />
                                );
                              }
                            }
                            if (
                              !!field?.sectionName &&
                              field?.sectionName?.length > 0
                            ) {
                              return (
                                <View
                                  key={fieldIndex}
                                  style={{
                                    marginTop:
                                      fieldIndex == 0 ? 4 * BW() : 8 * BW(),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 6 * BW(),
                                  }}>
                                  <View
                                    style={{
                                      width: 10 * BW(),
                                      height: 10 * BW(),
                                      backgroundColor: colors?.secondaryColor,
                                      borderRadius: 20 * BW(),
                                    }}
                                  />
                                  <Text h3 medium>
                                    {
                                      field?.sectionName?.find(
                                        (n: any) => n.langId === langId,
                                      )?.value
                                    }
                                  </Text>
                                </View>
                              );
                            }
                            return (
                              <View key={field.fieldIndex}>
                                {field?.fieldTypeId === FieldTypeEnum.Text && (
                                  <Input
                                    textInput
                                    required={
                                      !!selectedErrors[field.entityFieldId] &&
                                      !selectedFields[field.entityFieldId]
                                        ?.value
                                    }
                                    error={
                                      (!!selectedErrors[field.entityFieldId] &&
                                        !selectedFields[field.entityFieldId]
                                          ?.value &&
                                        selectedErrors[field.entityFieldId]) ||
                                      (!!selectedValidations[
                                        field.entityFieldId
                                      ] &&
                                        selectedValidations[
                                          field.entityFieldId
                                        ])
                                    }
                                    label={title}
                                    requiredStar={isRequired}
                                    value={fieldValue}
                                    onChangeText={(text: any) => {
                                      handleFieldChange(
                                        field.entityFieldId,
                                        text,
                                        field,
                                      );
                                    }}
                                    disabled={isDisabledField}
                                  />
                                )}

                                {/* Number Field */}
                                {field?.fieldTypeId ===
                                  FieldTypeEnum.Integer && (
                                  <Input
                                    textInput
                                    label={title}
                                    required={
                                      !!selectedErrors[field.entityFieldId] &&
                                      !selectedFields[field.entityFieldId]
                                        ?.value
                                    }
                                    error={
                                      (!!selectedErrors[field.entityFieldId] &&
                                        !selectedFields[field.entityFieldId]
                                          ?.value &&
                                        selectedErrors[field.entityFieldId]) ||
                                      (!!selectedValidations[
                                        field.entityFieldId
                                      ] &&
                                        selectedValidations[
                                          field.entityFieldId
                                        ])
                                    }
                                    keyboardType="numeric"
                                    requiredStar={isRequired}
                                    value={fieldValue}
                                    onChangeText={(text: any) => {
                                      handleFieldChange(
                                        field.entityFieldId,
                                        text,
                                        field,
                                      );
                                    }}
                                    disabled={isDisabledField}
                                  />
                                )}
                                {field?.fieldTypeId ==
                                  FieldTypeEnum.TreeOptions && (
                                  <TreeOptionField
                                    field={field}
                                    title={title}
                                    handleChange={handleFieldChange}
                                    isDisabled={isDisabledField}
                                    formValues={selectedFields}
                                    treeOptions={treeOptions}
                                    isRequired={isRequired}
                                    setTreeOptions={setTreeOptions}
                                    required={
                                      !!selectedErrors[field.entityFieldId] &&
                                      !selectedFields[field.entityFieldId]
                                        ?.value
                                    }
                                    error={
                                      (!!selectedErrors[field.entityFieldId] &&
                                        !selectedFields[field.entityFieldId]
                                          ?.value &&
                                        selectedErrors[field.entityFieldId]) ||
                                      (!!selectedValidations[
                                        field.entityFieldId
                                      ] &&
                                        selectedValidations[
                                          field.entityFieldId
                                        ])
                                    }
                                  />
                                )}
                                {(field?.formSectionFieldTypeName === 'Date' ||
                                  field?.fieldTypeId ===
                                    FieldTypeEnum.Date) && (
                                  <DateField
                                    service={service}
                                    title={title}
                                    field={field}
                                    handleChange={handleFieldChange}
                                    formValues={selectedFields}
                                    requiredFields={{
                                      [field.entityFieldId]: isRequired
                                        ? true
                                        : false,
                                    }}
                                    errors={selectedErrors}
                                    isDisabled={isDisabledField}
                                    validations={[]}
                                  />
                                )}
                                {field?.fieldTypeId ===
                                  FieldTypeEnum.TermsCondition && (
                                  <View style={{marginTop: 8 * BW()}}>
                                    <Text h4 bold>
                                      {t('Labels.termConditions')}
                                    </Text>
                                    <TermsConditionField
                                      service={service}
                                      title={title}
                                      formValues={selectedFields}
                                      handleChange={handleFieldChange}
                                      field={field}
                                      isDisabled={isDisabledField}
                                    />
                                    {!!selectedErrors[field.entityFieldId] &&
                                      !selectedFields[field.entityFieldId]
                                        ?.value &&
                                      selectedErrors[field.entityFieldId] && (
                                        <Text style={style.requiredText} h5>
                                          {selectedErrors[field?.entityFieldId]}
                                        </Text>
                                      )}
                                  </View>
                                )}
                                <InformationField
                                  title={title}
                                  field={field}
                                  styleBody={{width: '100%'}}
                                />

                                {(field?.fieldTypeId === FieldTypeEnum.HTML ||
                                  field?.fieldTypeId ===
                                    FieldTypeEnum.BigText) && (
                                  <Input
                                    textInput
                                    required={
                                      !!selectedErrors[field.entityFieldId] &&
                                      !selectedFields[field.entityFieldId]
                                        ?.value
                                    }
                                    error={
                                      (!!selectedErrors[field.entityFieldId] &&
                                        !selectedFields[field.entityFieldId]
                                          ?.value &&
                                        selectedErrors[field.entityFieldId]) ||
                                      (!!selectedValidations[
                                        field.entityFieldId
                                      ] &&
                                        selectedValidations[
                                          field.entityFieldId
                                        ])
                                    }
                                    label={title}
                                    value={fieldValue}
                                    onChangeText={(text: any) => {
                                      handleFieldChange(
                                        field.entityFieldId,
                                        text,
                                        field,
                                      );
                                    }}
                                    disabled={isDisabledField}
                                    styleInput={{
                                      minHeight: 60 * BW(),
                                    }}
                                    multiline={true}
                                    requiredStar={isRequired}
                                  />
                                )}

                                {field?.fieldTypeId ===
                                  FieldTypeEnum.MultiSelect &&
                                  !checkSingleSelectFiledType(field) && (
                                    <Input
                                      multiSelect
                                      label={title}
                                      required={
                                        !!selectedErrors[field.entityFieldId] &&
                                        !selectedFields[field.entityFieldId]
                                          ?.value
                                      }
                                      error={
                                        (!!selectedErrors[
                                          field.entityFieldId
                                        ] &&
                                          !selectedFields[field.entityFieldId]
                                            ?.value &&
                                          selectedErrors[
                                            field.entityFieldId
                                          ]) ||
                                        (!!selectedValidations[
                                          field.entityFieldId
                                        ] &&
                                          selectedValidations[
                                            field.entityFieldId
                                          ])
                                      }
                                      value={fieldValue}
                                      items={
                                        !!optionsMap &&
                                        optionsMap[field.entityFieldId]
                                          ? optionsMap[field.entityFieldId]
                                          : []
                                      }
                                      requiredStar={isRequired}
                                      extraValue
                                      onChangeValue={(items: any) => {
                                        handleFieldChange(
                                          field.entityFieldId,
                                          {
                                            value:
                                              (!!items &&
                                                items.map(
                                                  (i: any) => i.value,
                                                )) ||
                                              [],
                                            label: null,
                                            lookupId:
                                              (!!items &&
                                                items
                                                  .map((i: any) => i.lookupId)
                                                  .join(',')) ||
                                              null,
                                            settings: null,
                                            fieldTypeId: field?.fieldTypeId,
                                            field: field,
                                          },
                                          field,
                                        );
                                      }}
                                      disabled={isDisabledField}
                                    />
                                  )}

                                {(field?.fieldTypeId ===
                                  FieldTypeEnum.Options ||
                                  (field?.fieldTypeId ===
                                    FieldTypeEnum.MultiSelect &&
                                    checkSingleSelectFiledType(field))) && (
                                  <Input
                                    dropdown
                                    label={title}
                                    required={
                                      !!selectedErrors[field.entityFieldId] &&
                                      !selectedFields[field.entityFieldId]
                                        ?.value
                                    }
                                    error={
                                      (!!selectedErrors[field.entityFieldId] &&
                                        !selectedFields[field.entityFieldId]
                                          ?.value &&
                                        selectedErrors[field.entityFieldId]) ||
                                      (!!selectedValidations[
                                        field.entityFieldId
                                      ] &&
                                        selectedValidations[
                                          field.entityFieldId
                                        ])
                                    }
                                    value={fieldValue}
                                    items={
                                      !!optionsMap &&
                                      optionsMap[field.entityFieldId]
                                        ? optionsMap[field.entityFieldId]
                                        : []
                                    }
                                    search={
                                      !!optionsMap &&
                                      optionsMap[field.entityFieldId] &&
                                      optionsMap[field.entityFieldId]?.length >
                                        5
                                    }
                                    requiredStar={isRequired}
                                    onChangeValue={(item: any) => {
                                      handleFieldChange(
                                        field.entityFieldId,
                                        {
                                          value: item.value,
                                          label: item.label,
                                          lookupId: item.lookupId,
                                          settings: item.settings,
                                          field: field,
                                        },
                                        field,
                                      );
                                    }}
                                    disabled={isDisabledField}
                                  />
                                )}
                                {field?.formSectionFieldTypeName ===
                                  'Relation' &&
                                  field?.relationType == 'Multiple' &&
                                  chieldFieldSettings?.showAsDropDown && (
                                    <RelationMultiDropDownField
                                      field={field}
                                      title={title}
                                      formValues={selectedFields}
                                      setFormValues={setselectedFields}
                                      recordId={responseSearch?.[0]?.recordId}
                                      tempAppId={tempAppId}
                                      service={service}
                                      requiredStar={true}
                                      record={record}
                                      errors={selectedErrors}
                                      isDisabled={isDisabled}
                                      applicationId={applicationId}
                                      currentStatusId={service?.stageId}
                                      handleChange={handleFieldChange}
                                      itemIndex={editingItemIndex}
                                    />
                                  )}
                                {/* Boolean Field (Yes/No Radio) */}
                                {field?.fieldTypeId ===
                                  FieldTypeEnum.Boolean && (
                                  <Input
                                    radio
                                    row
                                    required={
                                      !!selectedErrors[field.entityFieldId] &&
                                      !selectedFields[field.entityFieldId]
                                        ?.value
                                    }
                                    error={
                                      (!!selectedErrors[field.entityFieldId] &&
                                        !selectedFields[field.entityFieldId]
                                          ?.value &&
                                        selectedErrors[field.entityFieldId]) ||
                                      (!!selectedValidations[
                                        field.entityFieldId
                                      ] &&
                                        selectedValidations[
                                          field.entityFieldId
                                        ])
                                    }
                                    radioGroup={[
                                      {label: t('true'), value: 'true'},
                                      {label: t('false'), value: 'false'},
                                    ]}
                                    title={title}
                                    value={fieldValue}
                                    requiredStar={isRequired}
                                    onPress={(val: any) => {
                                      handleFieldChange(
                                        field.entityFieldId,
                                        {
                                          value: val.value,
                                          fieldTypeId: field.fieldTypeId,
                                        },
                                        field,
                                      );
                                    }}
                                    disabled={isDisabledField}
                                  />
                                )}

                                {field?.fieldTypeId ===
                                  FieldTypeEnum.Location && (
                                  <LocationField
                                    service={service}
                                    title={title}
                                    formValues={selectedFields}
                                    isInitLocation={!!editingItemIndex}
                                    handleChange={handleFieldChange}
                                    field={field}
                                    isDisabled={isDisabledField}
                                    requiredFields={{
                                      [field.entityFieldId]: isRequired
                                        ? true
                                        : false,
                                    }}
                                  />
                                )}
                              </View>
                            );
                          })}
                          {group?.FormSectionAttachments?.length > 0 && (
                            <AttachmentsField
                              section={group}
                              langId={langId}
                              service={service}
                              tempAppId={tempAppId}
                              attachments={attachments}
                              extraKey={attachmentKey}
                              setAttachments={setAttachments}
                              errors={selectedErrors}
                              applicationId={applicationId}
                              isDisabled={isDisabled}
                              formValues={formValues}
                              visibility={attachmentVisibility}
                              parentEntityFieldId={field.entityFieldId}
                              itemIndex={
                                editingItemIndex
                                  ? editingItemIndex
                                  : getNextItemIndex()
                              }
                            />
                          )}
                        </Fragment>
                      );
                    })}
                </View>
              </ScrollView>
            </Loader>
            <View style={style.footerButtons}>
              <Button
                title={t('Button.CancelButton')}
                style={style.btnClose}
                styleText={{color: colors.secondaryColor}}
                onPress={() => {
                  setModalVisible(false);
                  setEditingItemIndex(null);
                  setselectedFields(getDefaultSelectedFields());
                  setSelectedErrors({});
                  setIsAlreadyExist(false);
                }}
              />
              {childFormFields != null &&
                childFormFields?.length != 0 &&
                !isDisabled &&
                (editingItemIndex ? (
                  <Button
                    title={t('Button.SubmitButton')}
                    style={style.btnConfirm}
                    styleText={{color: colors.mainWhite}}
                    onPress={() => {
                      const isValid = validateRequiredFields();
                      if (!isValid) return;

                      const newEntry = {
                        itemIndex: editingItemIndex,
                        fields: selectedFields,
                        data: addValuesToData(),
                        status: applicationId == 0 ? 1 : 2,
                        attachments: attachments[attachmentKey],
                      };

                      const existingValue =
                        formValues[field.entityFieldId]?.value || {};
                      const existingChildren = existingValue?.children || [];

                      const updatedChildren = existingChildren.map(
                        (child: any) =>
                          child.itemIndex === editingItemIndex
                            ? newEntry
                            : child,
                      );

                      const newValue = {
                        ...existingValue,
                        children: updatedChildren,
                      };

                      handleChange(
                        field.entityFieldId,
                        {
                          value: newValue,
                        },
                        field,
                      );

                      setselectedFields(getDefaultSelectedFields());
                      setSelectedErrors({});

                      setIsAlreadyExist(false);
                      setEditingItemIndex(null);
                      setModalVisible(false);
                      deleteCascadedFieldsOtions();
                    }}
                    backgroundColorDisabled={colors.secondaryColor}
                  />
                ) : (
                  <>
                    <Button
                      title={t('Button.SubmitButton')}
                      style={style.btnConfirm}
                      styleText={{color: colors.mainWhite}}
                      onPress={() => {
                        const isValid = validateRequiredFields();
                        if (!isValid) return;

                        const newItemIndex = getNextItemIndex();
                        const newEntry = {
                          itemIndex: newItemIndex,
                          fields: selectedFields,
                          data: addValuesToData(),
                          status: applicationId == 0 ? 1 : 2,

                          attachments: attachments[attachmentKey],
                        };

                        const existingValue =
                          formValues[field.entityFieldId]?.value || {};
                        const existingChildren = existingValue?.children || [];
                        const newValue = {
                          ...existingValue,
                          children: [...existingChildren, newEntry],
                        };
                        handleChange(
                          field.entityFieldId,
                          {
                            value: newValue,
                          },
                          field,
                        );

                        setselectedFields(getDefaultSelectedFields());
                        setSelectedErrors({});

                        setIsAlreadyExist(false);
                        setAttachments({});
                        setModalVisible(false);
                        deleteCascadedFieldsOtions();
                      }}
                      backgroundColorDisabled={colors.secondaryColor}
                    />
                    {!fieldSettings?.noPopup && (
                      <Button
                        title={t('Button.SubmitAndAddMoreButton')}
                        style={style.btnConfirm}
                        styleText={{color: colors.mainWhite}}
                        onPress={() => {
                          const isValid = validateRequiredFields();
                          if (!isValid) return;
                          const newItemIndex = getNextItemIndex();

                          const newEntry = {
                            itemIndex: newItemIndex,
                            fields: selectedFields,
                            data: addValuesToData(),
                            status: applicationId == 0 ? 1 : 2,
                            attachments: attachments[attachmentKey],
                          };

                          const existingValue =
                            formValues[field.entityFieldId]?.value || {};
                          const existingChildren =
                            existingValue?.children || [];
                          const newValue = {
                            ...existingValue,
                            children: [...existingChildren, newEntry],
                          };

                          handleChange(
                            field.entityFieldId,
                            {
                              value: newValue,
                            },
                            field,
                          );

                          setselectedFields(getDefaultSelectedFields());
                          setSelectedErrors({});
                          setSelectedValidations({});

                          setAttachments({});

                          setIsAlreadyExist(false);
                          deleteCascadedFieldsOtions();
                        }}
                        backgroundColorDisabled={colors.secondaryColor}
                      />
                    )}
                  </>
                ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    btnConfirm: {
      width: 'auto',
      height: 'auto',
      backgroundColor: colors.secondaryColor,
      minWidth: '33%',
      padding: 6 * BW(),
    },
    btnClose: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      minWidth: '25%',
      borderColor: colors.secondaryColor,
      borderWidth: 1 * BW(),
      padding: 6 * BW(),
    },
    btnTitle: {color: colors.secondaryColor},
    listItem: {
      borderBottomWidth: 1 * BW(),
      borderBottomColor: colors.border,
      paddingVertical: 10 * BW(),
    },
    listItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      paddingHorizontal: 8 * BW(),
      backgroundColor: colors.black + '99',
    },
    modalView: {
      backgroundColor: colors.mainBackground,
      borderRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '40%',
      maxHeight: '88%',
    },
    footerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4 * BW(),
      bottom: 12 * BW(),
      left: 12 * BW(),
      right: 12 * BW(),
      position: 'absolute',
      width: '100%',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 12 * BW(),
    },

    paginationButton: {
      width: 'auto',
      height: 'auto',
    },
    imgContainer: {
      width: 16 * BW(),
      height: 16 * BW(),
    },

    pageButton: {
      width: 35 * BW(),
      height: 35 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5 * BW(),
      borderWidth: 1 * BW(),
      borderColor: colors.border,
      marginHorizontal: 5 * BW(),
      backgroundColor: colors.white,
    },

    activePage: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    pageText: {
      fontSize: 14 * BW(),
      color: colors.text,
    },

    activePageText: {
      fontSize: 14 * BW(),
      color: colors.white,
      fontWeight: 'bold',
    },
    btn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.secondaryColor,
      borderWidth: 1 * BW(),
      marginTop: 4 * BW(),
    },
    searchContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    searchMainContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      paddingHorizontal: 8 * BW(),
      paddingVertical: 2 * BW(),
      paddingBottom: 4 * BW(),

      borderRadius: 4 * BW(),
      marginTop: 4 * BW(),
    },
    searchBtn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.border,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
    },
    searchBtnContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      minWidth: '49%',
    },
    requiredText: {
      color: '#db2c43',
      fontSize: 8 * BW(),
      lineHeight: 20 * BW(),
    },

    styleIcon: {
      tintColor: colors.mainWhite,
      width: 16 * BW(),
      height: 16 * BW(),
    },
  });

export default RelationMultiField;

const getAttachmentVisibility = (formValues: any, attachment: any): boolean => {
  const visibilityConstraint = attachment.constraints?.find(
    (c: any) => c.constraintTypeId === 5,
  );

  if (!visibilityConstraint || !visibilityConstraint.Settings) return true;

  try {
    const settings = JSON.parse(visibilityConstraint.Settings);

    const controlBy = settings.ControlBy || [];
    let rawValues = settings.Values;

    let expectedValues: string[] = [];

    if (typeof rawValues === 'string') {
      const fixed = rawValues.replace(/'/g, '"');

      try {
        const parsed = JSON.parse(fixed);
        if (Array.isArray(parsed)) {
          expectedValues = parsed.map(v => String(v));
        } else {
          expectedValues = [String(parsed)];
        }
      } catch {
        expectedValues = [String(fixed)];
      }
    } else if (Array.isArray(rawValues)) {
      expectedValues = rawValues.map(v => String(v));
    } else {
      expectedValues = [String(rawValues)];
    }

    const allMatch = controlBy.every((controlFieldId: number) => {
      const controlValue = formValues?.[controlFieldId]?.value;
      return expectedValues.includes(String(controlValue));
    });

    return allMatch;
  } catch (err) {
    return true;
  }
};
