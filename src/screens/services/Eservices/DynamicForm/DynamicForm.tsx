import React, {useState, useEffect, Fragment, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../locales';
import {BW} from '../../../../style/theme';
import Text from '../../../../component/Text';
import Input from '../../../../component/input/Input';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import RelationField from './Fields/RelationField';
import AttachmentsField from './Fields/AttachmentsField';
import {replaceArabicNumerals} from '../../../../component/Generalfunction';
import PaymentField from './Fields/PaymentField';
import TermsConditionField from './Fields/TermsConditionField';
import SelectField from './Fields/SelectField';
import Actions from './Actions';
import {setModalData} from '../../../../redux/reducers/General/modal';
import InformationField from './Fields/InformationField';
import StepIndicator from './StepIndicator';
import LocationField from './Fields/LocationField';
import {
  ConstraintTypeEnum,
  FieldTypeEnum,
  FileConstraintTypeEnum,
} from './Constants';
import {getEntityFieldLookups} from '../../../../redux/reducers/E-Services/thunk/services';
import {parseJSON} from '../../utils';
import DateField from './Fields/DateField';
import RelationMultiField from './Fields/RelationMultiField';
import MultiSelectField from './Fields/MultiSelectField';
import {serviceApiGateway} from '../../../../redux/network/apiEservices';
import RelationMultiDropDownField from './Fields/RelationMultiDropDownField';
import RelationMultiAddExistField from './Fields/RelationMultiAddExistField';
import CalculatedField from './Fields/CalculatedField';
import {Buffer} from 'buffer';

export const _openModal = (
  dispatch?: any,
  title?: string | boolean,
  msg?: string | boolean,
  minHeight?: any,
  CustomView?: any,
) => {
  dispatch(
    setModalData({
      title: title,
      message: msg,
      minHeight: minHeight ? minHeight : '15%',
      hideCancel: true,
      CustomView: CustomView,
    }),
  );
};

const generateDataFromFormValues = (formValues: any, formData: any) => {
  let data: any = [];

  !!formData &&
    formData?.forEach((form: any) => {
      form.formSection.forEach((section: any) => {
        section.formSectionFields?.forEach((field: any) => {
          const entityFieldId = field.entityFieldId;

          if (
            field?.formSectionFieldTypeName === 'Relation' &&
            field?.relationType == 'Single'
          ) {
            const children =
              (formValues[entityFieldId]?.children &&
                formValues[entityFieldId]?.children?.map((child: any) => {
                  const updatedFields = child.fields.map((field: any) => {
                    if (
                      !!formValues?.[field.entityFieldId] &&
                      field?.children
                    ) {
                      return {
                        ...field,
                        value: '',
                        children:
                          formValues?.[field.entityFieldId]?.value?.children ||
                          [],
                      };
                    }
                    return field;
                  });

                  return {
                    ...child,
                    fields: updatedFields,
                  };
                })) ||
              [];
            data.push(
              !!formValues[entityFieldId]?.value?.children
                ? {
                    entityFieldId: parseInt(entityFieldId),
                    value:
                      (formValues[entityFieldId]?.value?.value &&
                        formValues[entityFieldId]?.value?.value.toString()) ||
                      '',
                    children: formValues[entityFieldId]?.value?.children,
                  }
                : {
                    entityFieldId: entityFieldId,
                    value:
                      formValues[entityFieldId] != undefined &&
                      formValues[entityFieldId]?.value != undefined
                        ? formValues[entityFieldId]?.value.toString()
                        : '',
                    children: children || [],
                  },
            );
          } else if (
            field?.formSectionFieldTypeName === 'Relation' &&
            field?.relationType == 'Multiple'
          ) {
            data.push({
              entityFieldId: entityFieldId,
              value: '',
              children: (formValues[entityFieldId]?.value?.children || [])?.map(
                (child: any) =>
                  child.RecordId
                    ? {
                        itemIndex: child.itemIndex,
                        fields: Object.entries(child.fields || {}).map(
                          ([key, val]: any) =>
                            !!val?.value?.children
                              ? {
                                  entityFieldId: parseInt(key),
                                  value:
                                    (val?.value?.value &&
                                      val?.value?.value.toString()) ||
                                    '',
                                  children: val?.value?.children,
                                }
                              : {
                                  entityFieldId: parseInt(key),
                                  value:
                                    val?.value &&
                                    Array.isArray(val?.value) &&
                                    val?.value?.length > 0
                                      ? val?.value.join(',')
                                      : val?.value != undefined
                                      ? val?.value.toString()
                                      : ' ',
                                },
                        ),
                        status: child.status,
                        recordId: child.RecordId,
                      }
                    : {
                        itemIndex: child.itemIndex,
                        fields: Object.entries(child.fields || {}).map(
                          ([key, val]: any) =>
                            !!val?.value?.children
                              ? {
                                  entityFieldId: parseInt(key),
                                  value:
                                    (val?.value?.value &&
                                      val?.value?.value.toString()) ||
                                    '',
                                  children: val?.value?.children,
                                }
                              : {
                                  entityFieldId: parseInt(key),
                                  value:
                                    val?.value &&
                                    Array.isArray(val?.value) &&
                                    val?.value?.length > 0
                                      ? val?.value.join(',')
                                      : val?.value != undefined
                                      ? val?.value.toString()
                                      : ' ',
                                },
                        ),
                        status: child.status,
                      },
              ),
            });
          } else if (field?.formSectionFieldTypeName === 'Number') {
            data.push({
              entityFieldId: entityFieldId,
              value:
                formValues[entityFieldId] != undefined &&
                formValues[entityFieldId]?.value != undefined
                  ? replaceArabicNumerals(
                      formValues[entityFieldId]?.value,
                    ).toString()
                  : '',
            });
          } else if (field?.fieldTypeId === 5) {
            data.push({
              entityFieldId: entityFieldId,
              value:
                formValues[entityFieldId] != undefined &&
                formValues[entityFieldId]?.value != undefined
                  ? formValues[entityFieldId]?.value.toString()
                  : '',
            });
          } else {
            data.push({
              entityFieldId: entityFieldId,
              value:
                formValues[entityFieldId] != undefined &&
                formValues[entityFieldId]?.value != undefined
                  ? formValues[entityFieldId]?.value.toString()
                  : '',
            });
          }
        });
      });
    });

  return data;
};

const DynamicForm = ({
  service,
  formData,
  tempAppId,
  applicationId,
  profId,
  path,
  setIsLoading,
  record,
}: any) => {
  const {t} = useTranslation();
  let actions = !!service?.actions;
  const {userData}: any = useAppSelector(store => store.userDataStored);

  const [formValues, setFormValues]: any = useState({});
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

  const [attachments, setAttachments] = useState([]);
  const [visibility, setVisibility]: any = useState({});
  const [requiredFields, setRequiredFields] = useState<Record<number, boolean>>(
    {},
  );
  const [errors, setErrors]: any = useState({});
  const [validations, setValidations]: any = useState({});
  const {tokenData}: any = useAppSelector(state => state.userToken);

  const fetchedFormIds = useRef<Set<number>>(new Set());

  let langId = isArabic() ? 2 : 1;

  const dispatch = useAppDispatch();

  const generateInitFormValues = (formData: any) => {
    let data: any = {};

    !!formData &&
      formData?.forEach((form: any) => {
        form.formSection.forEach((section: any) => {
          section.formSectionFields?.forEach((field: any) => {
            const entityFieldId = field.entityFieldId;
            const formSectionFieldValue = field?.formSectionFieldValue;
            data[entityFieldId] = {
              value: !!formSectionFieldValue ? formSectionFieldValue : '',
            };
          });
        });
      });

    setFormValues(data);
    initializeVisibility(formData, data);
  };
  useEffect(() => {
    // Generate Inital FormValues
    generateInitFormValues(formData);
  }, [formData, dispatch]);

  useEffect(() => {
    let required: Record<number, boolean> = {};

    !!formData &&
      formData?.forEach((form: any) => {
        form.formSection.forEach((section: any) => {
          section.formSectionFields?.forEach((field: any) => {
            if (field.constraints) {
              const isRequired = field.constraints.some(
                (constraint: any) => constraint.constraintTypeId === 1,
              );
              if (isRequired) {
                required[field.entityFieldId] = true;
              }
            }
          });
        });
      });

    setRequiredFields(required);
  }, [formData]);

  const updateAttachmentsFromSelectedRecord = (fetchedAttachments: any[]) => {
    const newAttachments: Record<number, any[]> = {};
    let attachmentLink = `${serviceApiGateway}/UploadAttachment/GetAttachmentById?`;
    let tempLink = `${serviceApiGateway}/UploadAttachment/GetTemporaryAttachmentById?`;
    fetchedAttachments.forEach((attachment: any) => {
      const attachmentId = attachment.AttachmentId;

      let formSectionAttachmentId: number | null = null;

      for (const form of formData) {
        for (const section of form?.formSection) {
          const found = section?.FormSectionAttachments?.find(
            (a: any) => a.AttachmentId === attachmentId,
          );

          if (found) {
            formSectionAttachmentId = found?.FormSectionAttachmentId;
            break;
          }
        }
        if (formSectionAttachmentId) break;
      }

      if (formSectionAttachmentId && attachment?.AttachmentFiles?.length) {
        newAttachments[formSectionAttachmentId] =
          attachment.AttachmentFiles.map((file: any) => ({
            id: file.id,
            returnedAtachmentId: file.id,
            attach:
              applicationId == 0
                ? `${tempLink}attachmentId=${file.id}&download=true`
                : `${attachmentLink}attachmentId=${file.id}&download=true`,
            type: file.MimeType,
            name: file.FileName,
            size: file.Size,
            progress: 100,
            temp: true,
          }));
      }
    });

    setAttachments((prev: any) => ({
      ...prev,
      ...newAttachments,
    }));
  };
  const decodeJWT = (token: string) => {
    try {
      const [, payload] = token.split('.');
      if (!payload) throw new Error('Invalid JWT format');

      const json = Buffer.from(payload, 'base64').toString('utf8');

      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  };
  const initializeVisibility = (formData: any[], customData?: any): any => {
    !!formData &&
      formData?.forEach((form: {formSection: any[]}) => {
        form.formSection.forEach(
          (section: {
            formSectionFields: any[];
            FormSectionAttachments: any;
          }) => {
            section.formSectionFields?.forEach((field: any) => {
              const formSectionFieldValue = field?.formSectionFieldValue;

              if (field.constraints) {
                field.constraints.forEach(
                  (constraint: {constraintTypeId: number; Settings: any}) => {
                    if (
                      (constraint.constraintTypeId === 4 ||
                        constraint.constraintTypeId === 10) &&
                      constraint.Settings
                    ) {
                      if (!formSectionFieldValue) {
                        const settings = JSON.parse(constraint.Settings);

                        let controlBy = settings.ControlBy;
                        let rawValues = settings.Values || '[]';

                        if (typeof controlBy === 'string') {
                          try {
                            controlBy = JSON.parse(controlBy || '{}');
                          } catch {
                            controlBy = [parseInt(controlBy)];
                          }
                        }

                        let values: any;
                        try {
                          values = JSON.parse(rawValues.replace(/'/g, '"'));

                          if (
                            typeof values == 'number' ||
                            typeof values == 'boolean'
                          ) {
                            values = values.toString();
                          }
                        } catch {
                          values = [rawValues.toString()];
                        }
                        let allMatch = false;

                        if (values != undefined) {
                          allMatch = controlBy.every(
                            (controlFieldId: number) => {
                              const controllingValue = !!customData?.[
                                controlFieldId
                              ]?.value
                                ? customData?.[controlFieldId]?.value
                                : null;

                              return !!values
                                ? Array.isArray(values)
                                  ? values.includes(String(controllingValue))
                                  : String(values) === String(controllingValue)
                                : false;
                            },
                          );
                        }

                        setVisibility((prev: any) => ({
                          ...prev,
                          [field.entityFieldId]: allMatch,
                        }));
                      } else {
                        const fieldId = field.entityFieldId;
                        setVisibility((prev: any) => ({
                          ...prev,
                          [fieldId]: !!formSectionFieldValue ? true : false,
                        }));
                      }
                    } else if (
                      constraint.constraintTypeId ===
                        ConstraintTypeEnum.VisibleByRole &&
                      constraint.Settings
                    ) {
                      let isValueContain: any = [];
                      const settings = JSON.parse(constraint.Settings);

                      let role = decodeJWT(tokenData?.access_token);

                      let loginUserRole: any = role?.role;

                      if (loginUserRole) {
                        let contValue = settings?.Values?.replace(
                          /[\[\]']+/g,
                          '',
                        );
                        let modifyVal = contValue?.split(',');
                        if (typeof loginUserRole == 'object') {
                          loginUserRole.find((v: any) => {
                            modifyVal?.map((cv: any) => {
                              if (cv == v) {
                                isValueContain.push(v);
                              }
                            });
                          });
                        } else {
                          modifyVal?.map((cv: any) => {
                            if (cv == loginUserRole) {
                              isValueContain.push(loginUserRole);
                            }
                          });
                        }

                        setVisibility((prev: any) => ({
                          ...prev,
                          [field.entityFieldId]:
                            isValueContain.length > 0 ? true : false,
                        }));
                      }
                    }
                  },
                );
              }
              if (field?.formSectionFieldSettings) {
                let formSectionFieldSettings = parseJSON(
                  field?.formSectionFieldSettings,
                );

                if (formSectionFieldSettings?.hiddenField) {
                  const fieldId = field.entityFieldId;
                  setVisibility((prev: any) => ({
                    ...prev,
                    [fieldId]: false,
                  }));
                }
              }
            });
            section.FormSectionAttachments?.forEach((attachment: any) => {
              attachment.constraints?.forEach(
                (constraint: any, entityFieldId: any) => {
                  if (
                    (constraint.constraintTypeId ===
                      FileConstraintTypeEnum.VisibleByValue ||
                      constraint.constraintTypeId ===
                        FileConstraintTypeEnum.VisibleByExpression) &&
                    constraint.Settings
                  ) {
                    try {
                      if (
                        constraint.constraintTypeId ===
                          FileConstraintTypeEnum.VisibleByValue &&
                        ((attachment.FileTemplates &&
                          attachment.FileTemplates?.length == 0) ||
                          (attachment?.AttachmentFiles &&
                            attachment?.AttachmentFiles.length == 0) ||
                          attachment.FileTemplates == undefined ||
                          attachment?.AttachmentFiles == undefined)
                      ) {
                        const settings = JSON.parse(constraint.Settings);

                        let controlBy = settings.ControlBy;
                        let rawValues = settings.Values || '[]';

                        if (typeof controlBy === 'string') {
                          try {
                            controlBy = JSON.parse(controlBy || '{}');
                          } catch {
                            controlBy = [parseInt(controlBy)];
                          }
                        }

                        let values: string[] = [];
                        try {
                          values = JSON.parse(rawValues.replace(/'/g, '"'));
                        } catch {
                          values = [rawValues.toString()];
                        }

                        const allMatch = controlBy.every(
                          (controlFieldId: number) => {
                            const controllingValue = !!customData?.[
                              controlFieldId
                            ]?.value
                              ? customData?.[controlFieldId]?.value
                              : null;

                            return controllingValue != null
                              ? values?.includes(String(controllingValue))
                              : false;
                          },
                        );
                        setVisibility((prev: any) => ({
                          ...prev,
                          [attachment.AttachmentId]: allMatch,
                        }));
                      } else if (
                        constraint.constraintTypeId ===
                          FileConstraintTypeEnum.VisibleByExpression &&
                        ((attachment.FileTemplates &&
                          attachment.FileTemplates?.length == 0) ||
                          (attachment?.AttachmentFiles &&
                            attachment?.AttachmentFiles.length == 0) ||
                          attachment.FileTemplates == undefined ||
                          attachment?.AttachmentFiles == undefined)
                      ) {
                        const settings = JSON.parse(constraint.Settings);
                        const expression = settings.Expression;
                        const formContext: any = {};
                        Object.keys(customData).forEach(id => {
                          formContext[`field_${id}`] =
                            customData[id]?.value ?? '';
                        });

                        const fakeJQuery = (selector: string) => {
                          const match =
                            selector.match(/#field_(\d+)/) ||
                            selector.match(/input\[id=field_(\d+)\]/);
                          if (match) {
                            const key = `field_${match[1]}`;
                            return {
                              val: () => formContext[key] ?? '',
                            };
                          }
                          return {val: () => ''};
                        };

                        const func = new Function('$', `return ${expression};`);
                        const result = func(fakeJQuery);

                        setVisibility((prev: any) => ({
                          ...prev,
                          [attachment.AttachmentId]: result === true,
                        }));
                      } else {
                        setVisibility((prev: any) => ({
                          ...prev,
                          [attachment.AttachmentId]:
                            (attachment.FileTemplates &&
                              attachment.FileTemplates?.length > 0) ||
                            (attachment?.AttachmentFiles &&
                              attachment?.AttachmentFiles.length > 0)
                              ? true
                              : false,
                        }));
                      }
                    } catch (err) {}
                  } else if (
                    constraint.constraintTypeId ===
                      FileConstraintTypeEnum.VisibleByRole &&
                    constraint.Settings
                  ) {
                    let isValueContain: any = [];
                    const settings = JSON.parse(constraint.Settings);

                    // let loginUserRole: any = tokenData?.profile?.role;
                    let loginUserRole = decodeJWT(
                      tokenData?.access_token,
                    )?.role;

                    if (loginUserRole) {
                      let contValue = settings?.Values?.replace(
                        /[\[\]']+/g,
                        '',
                      );
                      let modifyVal = contValue?.split(',');
                      if (typeof loginUserRole == 'object') {
                        loginUserRole.find((v: any) => {
                          modifyVal?.map((cv: any) => {
                            if (cv == v) {
                              isValueContain.push(v);
                            }
                          });
                        });
                      } else {
                        modifyVal?.map((cv: any) => {
                          if (cv == loginUserRole) {
                            isValueContain.push(loginUserRole);
                          }
                        });
                      }

                      setVisibility((prev: any) => ({
                        ...prev,
                        [attachment.AttachmentId]:
                          isValueContain.length > 0 ? true : false,
                      }));
                    }
                  }
                },
              );
            });
          },
        );
      });
  };

  const handleChange = (
    fieldId: any,
    value: any,
    field: any,
    newFormValuesInit?: any,
  ): any => {
    let newFormValues = {
      ...formValues,
      [fieldId]:
        typeof value === 'object' && !!value?.value && value !== null
          ? value
          : {value},
    };
    if (newFormValuesInit != undefined) {
      newFormValues = {
        ...newFormValuesInit,
        [fieldId]:
          typeof value === 'object' && !!value?.value && value !== null
            ? value
            : {value},
      };
    }

    if (!!value?.fromId) {
      newFormValues = {
        ...newFormValues,
        [value?.fromId]: {value: {children: value?.value?.children}},
      };
    }

    setFormValues(newFormValues);
    updateVisibility(
      fieldId,
      typeof value == 'object' && !!value?.value ? value?.value : value,
      newFormValues,
    );

    let error = '';
    let validation = '';
    //  Constraints
    if (
      field != undefined &&
      field?.constraints &&
      field?.formSectionFieldTypeName !== 'TermsCondition'
    ) {
      field.constraints.forEach((constraint: any) => {
        // Required
        if (constraint.constraintTypeId === 1 && !value) {
          error =
            JSON.parse(constraint.textMessages).find(
              (msg: any) => msg.langId === langId,
            )?.value || t('Field is required');
        }
        if (constraint?.constraintTypeId === 8 && value) {
          const settings =
            !!constraint?.Settings && JSON.parse(constraint.Settings || '{}');
          const regexPattern = settings?.Regexp;
          if (regexPattern) {
            const regex = new RegExp(regexPattern);
            if (!regex.test(value)) {
              validation = t('ValidatorMessages.MobileValidator');
            }
          }
        }
        if (
          constraint?.constraintTypeId === ConstraintTypeEnum.EmiratesID &&
          value
        ) {
          const settings =
            !!constraint?.Settings && JSON.parse(constraint?.Settings || '{}');
          const regexPattern = settings?.Regexp;
          if (regexPattern) {
            const regex = new RegExp(regexPattern);
            if (!regex.test(value)) {
              validation = t('ValidatorMessages.EmiratesIdValidator');
            }
          }
        }
        if (
          constraint?.constraintTypeId === ConstraintTypeEnum.Landline &&
          value
        ) {
          const settings =
            !!constraint?.Settings && JSON.parse(constraint?.Settings || '{}');
          const regexPattern = settings?.Regexp;
          if (regexPattern) {
            const regex = new RegExp(regexPattern);
            if (!regex.test(value)) {
              validation = t('ValidatorMessages.LandLineValidator');
            }
          }
        }
        if (
          constraint?.constraintTypeId === ConstraintTypeEnum.Email &&
          value
        ) {
          const settings =
            !!constraint?.Settings && JSON.parse(constraint?.Settings || '{}');
          const regexPattern = settings?.Regexp;
          if (regexPattern) {
            const regex = new RegExp(regexPattern);
            if (!regex.test(value)) {
              validation = t('ValidatorMessages.EmailValidator');
            }
          }
        }

        if (
          constraint.constraintTypeId ===
            ConstraintTypeEnum.IndustrialLicenseNumber &&
          value
        ) {
          const settings =
            !!constraint?.Settings && JSON.parse(constraint?.Settings || '{}');
          const regexPattern = settings?.Regexp;
          if (regexPattern) {
            const regex = new RegExp(regexPattern);
            if (!regex.test(value)) {
              validation = t('ValidatorMessages.ILNumberValidator');
            }
          }
        }

        if (
          constraint.constraintTypeId === ConstraintTypeEnum.EnglishLetters &&
          value
        ) {
          const englishRegex = /^[A-Za-z\s]*$/;
          if (!englishRegex.test(value)) {
            validation =
              JSON.parse(constraint.textMessages).find(
                (msg: any) => msg.langId === langId,
              )?.value || t('ValidatorMessages.EnglishLettersOnly');
          }
        }

        if (
          constraint.constraintTypeId === ConstraintTypeEnum.ArabicLetters &&
          value
        ) {
          const arabicRegex = /^[\u0600-\u06FF\s]+$/;
          if (!arabicRegex.test(value)) {
            validation =
              JSON.parse(constraint.textMessages).find(
                (msg: any) => msg.langId === langId,
              )?.value || t('ValidatorMessages.ArabicLettersOnly');
          }
        }
        if (
          constraint.constraintTypeId ===
            ConstraintTypeEnum.ClientSideCascading &&
          value
        ) {
          let settings = parseJSON(value.settings);
          let clientFieldsData = settings?.clientFieldsData;
          if (Array.isArray(clientFieldsData)) {
            clientFieldsData.forEach((item: any) => {
              const targetFieldId = item?.eFId;
              const fieldValue = Array.isArray(item?.vaue)
                ? item?.vaue[0]
                : item?.vaue;
              handleChange(targetFieldId, fieldValue, undefined, newFormValues);
            });
          }
        }
      });
    }

    Object.entries(formValues).forEach(([fieldKey, fieldObj]) => {
      const dependentFieldId = Number(fieldKey);

      const targetField = formData
        ?.flatMap((form: any) => form.formSection)
        ?.flatMap((section: any) => section.formSectionFields)
        ?.find((f: any) => f?.entityFieldId === dependentFieldId);

      if (
        targetField?.formSectionFieldSettings &&
        parseJSON(targetField?.formSectionFieldSettings)?.Expression &&
        parseJSON(targetField?.formSectionFieldSettings)?.EFIDs?.includes(
          fieldId,
        )
      ) {
        try {
          const settings = parseJSON(targetField?.formSectionFieldSettings);
          const expression = settings?.Expression;

          const formContext: any = {};
          Object.keys(newFormValues).forEach(id => {
            formContext[`field_${id}`] = newFormValues[id]?.label
              ? newFormValues[id]?.label
              : newFormValues[id]?.value || '';
          });

          const fakeJQuery = (selector: string) => {
            const dropdownMatch = selector.match(/#fieldDropdown_(\d+)/);
            if (dropdownMatch) {
              const key = `field_${dropdownMatch[1]}`;
              return {
                find: () => ({
                  contents: () => ({
                    text: () => formContext[key] ?? '',
                  }),
                }),
              };
            }

            const match =
              selector.match(/#field_(\d+)/) ||
              selector.match(/input\[id=field_(\d+)\]/);
            if (match) {
              const key = `field_${match[1]}`;
              return {
                val: () => formContext[key] ?? '',
              };
            }

            return {
              val: () => '',
              find: () => ({
                contents: () => ({
                  text: () => '',
                }),
              }),
            };
          };

          const func = new Function('$', `return ${expression};`);
          const result = func(fakeJQuery);

          newFormValues[dependentFieldId] = {value: result};
          setFormValues(newFormValues);
        } catch (err) {}
      }
    });

    setErrors((prev: any) => ({...prev, [fieldId]: error}));
    setValidations((prev: any) => ({...prev, [fieldId]: validation}));
  };

  const updateVisibility = (
    fieldId: any,
    value: any,
    customFormValues: any,
  ): any => {
    !!formData &&
      formData?.forEach((form: {formSection: any[]}) => {
        form.formSection.forEach(
          (section: {
            formSectionFields: any[];
            FormSectionAttachments: any[];
          }) => {
            section.formSectionFields?.forEach(
              (field: {
                constraints: any[];
                entityFieldId: any;
                relationType?: any;
              }) => {
                if (field.constraints) {
                  field.constraints.forEach(
                    (constraint: {
                      constraintTypeId: number;
                      Settings: string;
                    }) => {
                      if (
                        constraint.constraintTypeId === 4 &&
                        constraint?.Settings
                      ) {
                        const settings = JSON.parse(constraint.Settings);
                        if (settings.ControlBy.includes(fieldId)) {
                          const shouldBeVisible =
                            settings.Values?.includes(`'${value}'`) ||
                            settings.Values == value;

                          setVisibility((prev: any) => ({
                            ...prev,
                            [field.entityFieldId]: shouldBeVisible,
                          }));

                          if (!shouldBeVisible) {
                            clearFieldValue(
                              field.entityFieldId,
                              customFormValues,
                            );
                          }
                        }
                      }
                      if (
                        constraint.constraintTypeId === 10 &&
                        constraint?.Settings
                      ) {
                        try {
                          const settings = JSON.parse(constraint?.Settings);
                          const expression = settings?.Expression;

                          if (settings.ControlBy.includes(fieldId)) {
                            const formContext: any = {};
                            Object.keys(customFormValues).forEach(id => {
                              formContext[`field_${id}`] =
                                customFormValues[id]?.value ?? '';
                            });

                            const fakeJQuery = (selector: string) => {
                              const match =
                                selector.match(/#field_(\d+)/) ||
                                selector.match(/input\[id=field_(\d+)\]/);
                              if (match) {
                                const key = `field_${match[1]}`;
                                return {
                                  val: () => formContext[key] ?? '',
                                };
                              }
                              return {val: () => ''};
                            };

                            const func = new Function(
                              '$',
                              `return ${expression};`,
                            );
                            const result = func(fakeJQuery);
                            setVisibility((prev: any) => ({
                              ...prev,
                              [field.entityFieldId]: result === true,
                            }));
                            if (!result) {
                              clearFieldValue(
                                field.entityFieldId,
                                customFormValues,
                              );
                            }
                          }
                        } catch (err) {}
                      }
                    },
                  );
                }
              },
            );
            section.FormSectionAttachments?.forEach((attachment: any) => {
              attachment.constraints?.forEach((constraint: any) => {
                if (
                  constraint.constraintTypeId ===
                    FileConstraintTypeEnum.VisibleByValue &&
                  constraint.Settings
                ) {
                  try {
                    const settings = JSON.parse(constraint.Settings);
                    const controlBy = settings.ControlBy || [];
                    const rawValues = settings.Values || '[]';
                    const fixedJson = rawValues.replace(/'/g, '"');
                    let values = JSON.parse(fixedJson);
                    values =
                      typeof values === 'string' || typeof values === 'number'
                        ? [String(values)]
                        : values;
                    const allFieldsMatch = controlBy.every(
                      (controlFieldId: number) => {
                        let controllingValue =
                          customFormValues[controlFieldId]?.value;

                        controllingValue = String(controllingValue)
                          ? String(controllingValue)
                          : null;

                        return values?.includes(String(controllingValue));
                      },
                    );
                    setVisibility((prev: any) => ({
                      ...prev,
                      [attachment.AttachmentId]: allFieldsMatch,
                    }));
                  } catch (err) {}
                }

                if (
                  constraint.constraintTypeId ===
                    FileConstraintTypeEnum.VisibleByExpression &&
                  constraint?.Settings
                ) {
                  try {
                    const settings = JSON.parse(constraint.Settings);
                    const expression = settings.Expression;

                    if (settings.ControlBy.includes(fieldId)) {
                      const formContext: any = {};
                      Object.keys(customFormValues).forEach(id => {
                        formContext[`field_${id}`] =
                          customFormValues[id]?.value ?? '';
                      });

                      const fakeJQuery = (selector: string) => {
                        const match =
                          selector.match(/#field_(\d+)/) ||
                          selector.match(/input\[id=field_(\d+)\]/);

                        if (match) {
                          const key = `field_${match[1]}`;

                          return {
                            val: () => formContext[key] ?? '',
                          };
                        }
                        return {val: () => ''};
                      };

                      const func = new Function('$', `return ${expression};`);
                      const result = func(fakeJQuery);

                      setVisibility((prev: any) => ({
                        ...prev,
                        [attachment.AttachmentId]: result === true,
                      }));
                      if (!result) {
                        clearFieldValue(
                          attachment.AttachmentId,
                          customFormValues,
                        );
                      }
                    }
                  } catch (err) {}
                }
              });
            });
          },
        );
      });
  };
  const clearFieldValue = (fieldIdToClear: any, customFormValues: any) => {
    let newCustomValue = {
      ...customFormValues,
      [fieldIdToClear]: {
        value: '',
      },
    };
    setFormValues(newCustomValue);

    updateVisibility(fieldIdToClear, '', newCustomValue);
  };

  const [optionsMap, setOptionsMap]: any = useState({});

  useEffect(() => {
    let fieldsCascaded: any = [];
    !!formData &&
      formData?.forEach((form: {formSection: any[]; formId: number}) => {
        if (fetchedFormIds.current.has(form.formId)) return;

        let shouldFetch = false;

        form.formSection.forEach((section: {formSectionFields: any[]}) => {
          section.formSectionFields?.forEach((fieldItem: any) => {
            const isCascaded = fieldItem.constraints?.some(
              (c: any) => c.constraintTypeId === 3,
            );
            if (isCascaded) {
              fieldsCascaded.push(fieldItem.entityFieldId);
            }
            if (
              (fieldItem?.fieldTypeId === FieldTypeEnum.Options ||
                fieldItem?.fieldTypeId === FieldTypeEnum.MultiSelect) &&
              // fieldItem.Settings &&
              !optionsMap[fieldItem.entityFieldId]
            ) {
              shouldFetch = true;
            }
          });
        });
        let profileId =
          service?.profileEntityId != 6 && record?.profileRecordId
            ? record?.profileRecordId
            : service?.profileRecordId
            ? service?.profileRecordId
            : '';

        if (shouldFetch) {
          dispatch(
            getEntityFieldLookups({
              formId: form.formId,
              serviceId: service?.serviceId,
              profileRecordId: profileId,
            }),
          ).then((res: any) => {
            if (res.meta.requestStatus === 'fulfilled') {
              const payloadArray = Object.values(res.payload);

              payloadArray.forEach((entity: any) => {
                if (entity?.entityData) {
                  const options = JSON.parse(entity.entityData).map(
                    (opt: any) => ({
                      label: opt?.lookupValue,
                      value: opt?.lookupValueId,
                      lookupId: opt?.lookupId,
                      settings: opt?.Settings,
                    }),
                  );

                  if (!fieldsCascaded.includes(entity.entityFieldId))
                    setOptionsMap((prev: any) => ({
                      ...prev,
                      [entity.entityFieldId]: options,
                    }));
                }
              });

              fetchedFormIds.current.add(form.formId);
            }
          });
        }
      });
  }, [formData, service, profId]);

  return (
    <>
      {!!formData &&
        formData != undefined &&
        formData?.map(
          (
            form: {formSection: any[]; formName: any; formMode?: any},
            index: number,
          ): any => (
            <Fragment key={index}>
              <StepIndicator
                stepNumber={index + 1}
                stepName={
                  form.formName.find((t: any) => t.langId === langId)?.value
                }
                isLastStep={index === formData?.length - 1}
              />
              {form.formSection.map(
                (
                  section: {
                    formSectionOrder: React.Key | null | undefined;
                    formSectionName: any[];
                    formSectionFields: any[];
                    FormSectionAttachments: string | any[];
                  },
                  index: any,
                ) => (
                  <View
                    key={index}
                    style={{marginBottom: 20 * BW(), marginStart: 0 * BW()}}>
                    <Text h3 bold>
                      {
                        section.formSectionName.find(
                          (t: {langId: number}) => t.langId === langId,
                        )?.value
                      }
                    </Text>

                    {section.formSectionFields?.map(
                      (field: {
                        entityFieldId: any;
                        formSectionFieldName?: any;
                        relationShipNameTranslation?: any;
                        formSectionFieldTypeName?: any;
                        relationType?: any;
                        fieldTypeId?: any;
                        formSectionFieldid?: number;
                        relatedEntityFieldFilters?: string | undefined;
                        formSectionFieldValue?: any;
                        fieldModeId?: any;
                        formSectionFieldSettings?: any;
                        entityRelationships?: any;
                      }) => {
                        const isVisible =
                          visibility[field.entityFieldId] ?? true; // Show all fields by default

                        if (!isVisible) return null;

                        let title = JSON.parse(field.formSectionFieldName).find(
                          (t: {langId: number}) => t.langId === langId,
                        )?.value;
                        if (!!field?.relationShipNameTranslation) {
                          title = JSON.parse(
                            field?.relationShipNameTranslation,
                          ).find(
                            (t: {langId: number}) => t.langId === langId,
                          )?.value;
                        }
                        let isDisabled =
                          field?.fieldModeId == 2 || form?.formMode == 2;
                        const fieldSetting = field?.formSectionFieldSettings
                          ? JSON.parse(field?.formSectionFieldSettings)
                          : {};

                        return (
                          <View key={field.entityFieldId}>
                            {field?.formSectionFieldTypeName === 'Text' && (
                              <Input
                                textInput
                                required={
                                  !!errors[field.entityFieldId] &&
                                  !formValues[field.entityFieldId]?.value
                                }
                                error={
                                  (!!errors[field.entityFieldId] &&
                                    !formValues[field.entityFieldId]?.value &&
                                    errors[field.entityFieldId]) ||
                                  (!!validations[field.entityFieldId] &&
                                    validations[field.entityFieldId])
                                }
                                requiredStar={
                                  requiredFields[field.entityFieldId]
                                }
                                label={title}
                                value={
                                  formValues[field.entityFieldId]?.value || ''
                                }
                                onChangeText={(text: any) =>
                                  handleChange(field.entityFieldId, text, field)
                                }
                                disabled={isDisabled}
                              />
                            )}
                            {(field?.formSectionFieldTypeName === 'HTML' ||
                              field?.fieldTypeId === FieldTypeEnum.HTML ||
                              field?.formSectionFieldTypeName === 'Big Text' ||
                              field?.fieldTypeId === FieldTypeEnum.BigText) && (
                              <Input
                                textInput
                                required={
                                  !!errors[field.entityFieldId] &&
                                  !formValues[field.entityFieldId]?.value
                                }
                                error={
                                  (!!errors[field.entityFieldId] &&
                                    !formValues[field.entityFieldId]?.value &&
                                    errors[field.entityFieldId]) ||
                                  (!!validations[field.entityFieldId] &&
                                    validations[field.entityFieldId])
                                }
                                requiredStar={
                                  requiredFields[field.entityFieldId]
                                }
                                label={title}
                                value={
                                  formValues[field.entityFieldId]?.value || ''
                                }
                                onChangeText={(text: any) =>
                                  handleChange(field.entityFieldId, text, field)
                                }
                                disabled={isDisabled}
                                styleInput={{
                                  minHeight: 100 * BW(),
                                }}
                                multiline={true}
                              />
                            )}
                            {(field?.formSectionFieldTypeName === 'Date' ||
                              field?.fieldTypeId === FieldTypeEnum.Date) && (
                              <DateField
                                service={service}
                                formData={formData}
                                title={title}
                                field={field}
                                handleChange={handleChange}
                                formValues={formValues}
                                requiredFields={requiredFields}
                                errors={errors}
                                isDisabled={isDisabled}
                                validations={validations}
                              />
                            )}
                            {field?.formSectionFieldTypeName === 'Number' && (
                              <Input
                                textInput
                                required={
                                  !!errors[field.entityFieldId] &&
                                  !formValues[field.entityFieldId]?.value
                                }
                                error={
                                  (!!errors[field.entityFieldId] &&
                                    !formValues[field.entityFieldId]?.value &&
                                    errors[field.entityFieldId]) ||
                                  (!!validations[field.entityFieldId] &&
                                    validations[field.entityFieldId])
                                }
                                keyboardType="numeric"
                                requiredStar={
                                  requiredFields[field.entityFieldId]
                                }
                                label={title}
                                value={
                                  formValues[field.entityFieldId]?.value || ''
                                }
                                onChangeText={(text: any) =>
                                  handleChange(field.entityFieldId, text, field)
                                }
                                disabled={isDisabled}
                              />
                            )}
                            {field?.formSectionFieldTypeName === 'Boolean' && (
                              <Input
                                radio
                                row
                                radioGroup={[
                                  {label: t('true'), value: 'true'},
                                  {label: t('false'), value: 'false'},
                                ]}
                                title={title}
                                requiredStar={
                                  requiredFields[field.entityFieldId]
                                }
                                value={formValues[field.entityFieldId]?.value}
                                onPress={(value: any) =>
                                  handleChange(
                                    field.entityFieldId,
                                    value?.value,
                                    field,
                                  )
                                }
                                disabled={isDisabled}
                              />
                            )}
                            {/* options */}
                            {field?.fieldTypeId === FieldTypeEnum.Options && (
                              <SelectField
                                service={service}
                                formData={formData}
                                field={field}
                                title={title}
                                formSectionFields={section.formSectionFields}
                                handleChange={handleChange}
                                profId={profId}
                                requiredFields={requiredFields}
                                formValues={formValues}
                                errors={errors}
                                isDisabled={isDisabled}
                                validations={validations}
                                optionsMap={optionsMap}
                                setOptionsMap={setOptionsMap}
                              />
                            )}
                            {field?.fieldTypeId ===
                              FieldTypeEnum.MultiSelect && (
                              <MultiSelectField
                                service={service}
                                formData={formData}
                                field={field}
                                title={title}
                                formSectionFields={section.formSectionFields}
                                handleChange={handleChange}
                                profId={profId}
                                requiredFields={requiredFields}
                                formValues={formValues}
                                errors={errors}
                                isDisabled={isDisabled}
                                validations={validations}
                                optionsMap={optionsMap}
                                setOptionsMap={setOptionsMap}
                              />
                            )}
                            {/* <TermsCondition */}
                            <TermsConditionField
                              service={service}
                              formData={formData}
                              title={title}
                              formValues={formValues}
                              handleChange={handleChange}
                              field={field}
                              isDisabled={isDisabled}
                              requiredFields={requiredFields}
                            />
                            <InformationField title={title} field={field} />
                            {(field?.formSectionFieldTypeName === 'Location' ||
                              field?.fieldTypeId ===
                                FieldTypeEnum.Location) && (
                              <LocationField
                                service={service}
                                formData={formData}
                                title={title}
                                formValues={formValues}
                                handleChange={handleChange}
                                field={field}
                                isDisabled={isDisabled}
                                requiredFields={requiredFields}
                              />
                            )}
                            {(field?.formSectionFieldTypeName === 'Payments' ||
                              field?.fieldTypeId === 17) && (
                              <PaymentField
                                service={service}
                                formData={formData}
                                profId={profId}
                                formValues={formValues}
                                generateDataFromFormValues={
                                  generateDataFromFormValues
                                }
                                applicationId={applicationId}
                                handleChange={handleChange}
                                field={field}
                                title={title}
                              />
                            )}
                            {field?.fieldTypeId ===
                              FieldTypeEnum.CalculatedField && (
                              <CalculatedField
                                service={service}
                                formData={formData}
                                profId={profId}
                                formValues={formValues}
                                generateDataFromFormValues={
                                  generateDataFromFormValues
                                }
                                applicationId={applicationId}
                                handleChange={handleChange}
                                field={field}
                                title={title}
                                setFormValues={setFormValues}
                                updateVisibility={updateVisibility}
                              />
                            )}
                            {/* field?.relationType == 'Single' && */}
                            {field?.formSectionFieldTypeName === 'Relation' &&
                              field?.relationType == 'Single' &&
                              !fieldSetting?.showAsDropDown && (
                                <RelationField
                                  field={field}
                                  title={title}
                                  formValues={formValues}
                                  setFormValues={setFormValues}
                                  profId={profId}
                                  tempAppId={tempAppId}
                                  service={service}
                                  requiredStar={
                                    requiredFields[field.entityFieldId]
                                  }
                                  errors={errors}
                                  isDisabled={isDisabled}
                                  applicationId={applicationId}
                                  handleChange={handleChange}
                                  updateAttachmentsFromSelectedRecord={
                                    updateAttachmentsFromSelectedRecord
                                  }
                                  selectedRecordIdProps={selectedRecordId}
                                  setSelectedRecordIdProps={setSelectedRecordId}
                                  updateVisibility={updateVisibility}
                                />
                              )}

                            {field?.formSectionFieldTypeName === 'Relation' &&
                              field?.relationType == 'Single' &&
                              fieldSetting?.showAsDropDown && (
                                <RelationMultiDropDownField
                                  field={field}
                                  title={title}
                                  formValues={formValues}
                                  setFormValues={setFormValues}
                                  recordId={selectedRecordId || profId}
                                  tempAppId={tempAppId}
                                  service={service}
                                  requiredStar={true}
                                  record={record}
                                  errors={errors}
                                  isDisabled={isDisabled}
                                  applicationId={applicationId}
                                  currentStatusId={service?.stageId}
                                  handleChange={handleChange}
                                  itemIndex={
                                    field?.formSectionFieldValue &&
                                    !formValues?.[field.entityFieldId]
                                      ?.formSectionFieldId
                                      ? 1
                                      : false
                                  }
                                  withOutItemIndex={true}
                                />
                              )}
                            {field?.formSectionFieldTypeName === 'Relation' &&
                              field?.relationType == 'Multiple' && (
                                <>
                                  <RelationMultiField
                                    field={field}
                                    title={title}
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                    profId={profId}
                                    tempAppId={tempAppId}
                                    service={service}
                                    requiredStar={
                                      requiredFields[field.entityFieldId]
                                    }
                                    record={record}
                                    errors={errors}
                                    isDisabled={isDisabled}
                                    applicationId={applicationId}
                                    currentStatusId={service?.stageId}
                                    handleChange={handleChange}
                                    optionsMainMap={optionsMap}
                                  />
                                  {field?.entityRelationships?.[0]
                                    ?.multipleChildRelationShip ==
                                    'Many To Many' &&
                                    !isDisabled &&
                                    !fieldSetting?.noPopup && (
                                      <RelationMultiAddExistField
                                        field={field}
                                        title={title}
                                        formValues={formValues}
                                        setFormValues={setFormValues}
                                        profId={profId}
                                        tempAppId={tempAppId}
                                        service={service}
                                        requiredStar={
                                          requiredFields[field.entityFieldId]
                                        }
                                        errors={errors}
                                        isDisabled={isDisabled}
                                        applicationId={applicationId}
                                        handleChange={handleChange}
                                        updateAttachmentsFromSelectedRecord={
                                          updateAttachmentsFromSelectedRecord
                                        }
                                        selectedRecordIdProps={selectedRecordId}
                                        setSelectedRecordIdProps={
                                          setSelectedRecordId
                                        }
                                      />
                                    )}
                                </>
                              )}
                          </View>
                        );
                      },
                    )}

                    {section?.FormSectionAttachments?.length > 0 && (
                      <AttachmentsField
                        section={section}
                        langId={langId}
                        service={service}
                        tempAppId={tempAppId}
                        attachments={attachments}
                        setAttachments={setAttachments}
                        errors={errors}
                        applicationId={applicationId}
                        isDisabled={form.formMode == 2}
                        formValues={formValues}
                        visibility={visibility}
                      />
                    )}
                  </View>
                ),
              )}
            </Fragment>
          ),
        )}
      {actions && (
        <Actions
          service={service}
          formData={formData}
          generateDataFromFormValues={generateDataFromFormValues}
          tempAppId={tempAppId}
          profId={profId}
          visibility={visibility}
          formValues={formValues}
          setErrors={setErrors}
          attachments={attachments}
          applicationId={applicationId}
          setValidations={setValidations}
          path={path}
          optionsMap={optionsMap}
          record={record}
        />
      )}
    </>
  );
};

const getStyle = (colors: any) => StyleSheet.create({});

export default DynamicForm;
