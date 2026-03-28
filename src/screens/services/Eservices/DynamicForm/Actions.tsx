import React, {useState, useEffect, Fragment} from 'react';
import {View, Alert, StyleSheet, Modal, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../locales';
import {BW} from '../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {
  executeAction,
  newApplicationExecuteAction,
} from '../../../../redux/reducers/E-Services/thunk/applications';
import Button from '../../../../component/Button';
import {
  ConstraintTypeEnum,
  CustomServicesConstant,
  FieldTypeEnum,
  StageActionType,
} from './Constants';
import CommentModal from './CommentModal';
import {EntityFieldTypeEnum} from './EntityFieldTypeIdEnum';
import NavigationService from '../../../../navigation/NavigationService';
import {
  hideModal,
  setModalData,
} from '../../../../redux/reducers/General/modal';
import {
  baseEsevicesUrl,
  eservicesURL,
} from '../../../../redux/network/apiEservices';
import {parseJSON} from '../../utils';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';
import {clearCartItems} from '../../../../redux/reducers/E-Services/slice/cartItems';
import {baseILSsoUrl} from '../../../../redux/network/api_ILServices';

const Actions = ({
  service,
  formData,
  generateDataFromFormValues,
  tempAppId,
  profId,
  visibility,
  formValues,
  setErrors,
  attachments,
  applicationId,
  setValidations,
  path,
  customApplicationForm,
  routerUrl,
  optionsMap,
  record,
}: any) => {
  let actions = !!service?.actions && JSON.parse(service?.actions);
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  let langId = isArabic() ? 2 : 1;
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const [attachmentsComment, setAttachmentsComment] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const {t} = useTranslation();

  const validateForm = () => {
    let isValid = true;
    let missingFields: any = [];
    let errors: Record<number, string> = {};
    let validations: Record<number, string> = {};

    formData.forEach((form: any) => {
      form.formSection.forEach((section: any) => {
        section.formSectionFields?.forEach((field: any) => {
          const isVisible = visibility[field.entityFieldId] ?? true;

          if (
            isVisible &&
            field.constraints &&
            field?.formSectionFieldTypeName !== 'Payments'
          ) {
            field.constraints.forEach((constraint: any) => {
              if (constraint.constraintTypeId === 1) {
                if (
                  (!formValues[field.entityFieldId]?.value &&
                    field?.formSectionFieldTypeName !== 'TermsCondition') ||
                  (field?.formSectionFieldTypeName === 'Relation' &&
                    field?.relationType == 'Multiple' &&
                    (formValues[field.entityFieldId]?.value?.children?.length ==
                      0 ||
                      formValues[field.entityFieldId]?.value?.children ==
                        undefined))
                ) {
                  if (
                    field?.formSectionFieldTypeName === 'Relation' &&
                    field?.relationType == 'Multiple'
                  ) {
                    isValid = false;
                    missingFields.push(
                      JSON.parse(
                        field?.relationShipNameTranslation ||
                          field.formSectionFieldName,
                      ).find((t: {langId: number}) => t.langId === langId)
                        ?.value,
                    );
                  } else {
                    isValid = false;
                    missingFields.push(
                      JSON.parse(field.formSectionFieldName).find(
                        (t: {langId: number}) => t.langId === langId,
                      )?.value,
                    );
                  }
                  const errorMessage =
                    JSON.parse(
                      field.constraints.find(
                        (constraint: any) => constraint.constraintTypeId === 1,
                      )?.textMessages,
                    ).find((msg: any) => msg.langId === langId)?.value ||
                    t('Field is required');
                  errors[field.entityFieldId] = errorMessage;
                }
              }

              if (constraint.constraintTypeId === 11) {
                const settings = JSON.parse(constraint.Settings || '{}');
                const controlBy = settings?.ControlBy?.[0];
                const comparisonValue = settings?.Values;

                const currentValue = formValues[field.entityFieldId]?.value;
                const referenceValue = formValues[controlBy]?.value;

                if (
                  !!currentValue &&
                  !!comparisonValue &&
                  parseFloat(currentValue) <= parseFloat(comparisonValue)
                ) {
                  isValid = false;
                  const validationMessage =
                    t('GreaterThanValidator') + comparisonValue;

                  validations[field.entityFieldId] = validationMessage;

                  missingFields.push(
                    JSON.parse(field.formSectionFieldName).find(
                      (t: {langId: number}) => t.langId === langId,
                    )?.value,
                  );
                }
                if (
                  !!currentValue &&
                  !!referenceValue &&
                  new Date(currentValue) <= new Date(referenceValue)
                ) {
                  isValid = false;
                  const validationMessage =
                    JSON.parse(constraint.textMessages).find(
                      (msg: any) => msg.langId === langId,
                    )?.value || t('Field value must be greater');

                  validations[field.entityFieldId] = validationMessage;
                  missingFields.push(
                    JSON.parse(field.formSectionFieldName).find(
                      (t: {langId: number}) => t.langId === langId,
                    )?.value,
                  );
                }
              }
              if (constraint.constraintTypeId === 8) {
                const settings = JSON.parse(constraint.Settings || '{}');
                const regexPattern = settings?.Regexp;
                const fieldValue = formValues[field.entityFieldId]?.value;

                if (regexPattern && fieldValue) {
                  const mobileRegex = new RegExp(regexPattern);

                  if (!mobileRegex.test(fieldValue)) {
                    isValid = false;
                    const validationMessage = t(
                      'ValidatorMessages.MobileValidator',
                    );

                    validations[field.entityFieldId] = validationMessage;

                    missingFields.push(
                      JSON.parse(field.formSectionFieldName).find(
                        (t: {langId: number}) => t.langId === langId,
                      )?.value,
                    );
                  }
                }
              }
              if (
                constraint?.constraintTypeId === ConstraintTypeEnum.EmiratesID
              ) {
                const settings =
                  !!constraint?.Settings &&
                  JSON.parse(constraint?.Settings || '{}');
                const regexPattern = settings?.Regexp;
                const fieldValue = formValues[field.entityFieldId]?.value;

                if (regexPattern && fieldValue) {
                  const valueRegex = new RegExp(regexPattern);

                  if (!valueRegex.test(fieldValue)) {
                    isValid = false;
                    const validationMessage = t(
                      'ValidatorMessages.EmiratesIdValidator',
                    );

                    validations[field.entityFieldId] = validationMessage;

                    missingFields.push(
                      JSON.parse(field.formSectionFieldName).find(
                        (t: {langId: number}) => t.langId === langId,
                      )?.value,
                    );
                  }
                }
              }
              if (
                constraint?.constraintTypeId === ConstraintTypeEnum.Landline
              ) {
                const settings =
                  !!constraint?.Settings &&
                  JSON.parse(constraint?.Settings || '{}');
                const regexPattern = settings?.Regexp;
                const fieldValue = formValues[field.entityFieldId]?.value;

                if (regexPattern && fieldValue) {
                  const valueRegex = new RegExp(regexPattern);

                  if (!valueRegex.test(fieldValue)) {
                    isValid = false;
                    const validationMessage = t(
                      'ValidatorMessages.EmiratesIdValidator',
                    );

                    validations[field.entityFieldId] = validationMessage;

                    missingFields.push(
                      JSON.parse(field.formSectionFieldName).find(
                        (t: {langId: number}) => t.langId === langId,
                      )?.value,
                    );
                  }
                }
              }
              if (constraint?.constraintTypeId === ConstraintTypeEnum.Email) {
                const settings =
                  !!constraint?.Settings &&
                  JSON.parse(constraint?.Settings || '{}');
                const regexPattern = settings?.Regexp;
                const fieldValue = formValues[field.entityFieldId]?.value;

                if (regexPattern && fieldValue) {
                  const valueRegex = new RegExp(regexPattern);

                  if (!valueRegex.test(fieldValue)) {
                    isValid = false;
                    const validationMessage = t(
                      'ValidatorMessages.EmiratesIdValidator',
                    );

                    validations[field.entityFieldId] = validationMessage;

                    missingFields.push(
                      JSON.parse(field.formSectionFieldName).find(
                        (t: {langId: number}) => t.langId === langId,
                      )?.value,
                    );
                  }
                }
              }
              if (
                constraint.constraintTypeId ===
                ConstraintTypeEnum.IndustrialLicenseNumber
              ) {
                const settings =
                  !!constraint?.Settings &&
                  JSON.parse(constraint?.Settings || '{}');
                const regexPattern = settings?.Regexp;
                if (regexPattern) {
                  const regex = new RegExp(regexPattern);
                  if (!regex.test(formValues[field.entityFieldId]?.value)) {
                    isValid = false;
                    const validationMessage = t(
                      'ValidatorMessages.ILNumberValidator',
                    );

                    validations[field.entityFieldId] = validationMessage;

                    missingFields.push(
                      JSON.parse(field.formSectionFieldName).find(
                        (t: {langId: number}) => t.langId === langId,
                      )?.value,
                    );
                  }
                }
              }
            });
          }
          if (
            field?.formSectionFieldTypeName === 'TermsCondition' &&
            !formValues[field.entityFieldId]?.value
          ) {
            isValid = false;
            missingFields.push(t('TermsCondition'));
          }
          if (
            field?.formSectionFieldTypeName === 'Relation' &&
            field?.relationType == 'Multiple'
          ) {
            let settingsField =
              !!field?.Settings && JSON.parse(field?.Settings || '{}');

            if (
              !!settingsField?.Min &&
              ((formValues[field.entityFieldId]?.value?.children &&
                settingsField?.Min >
                  formValues[field.entityFieldId]?.value?.children?.length) ||
                formValues[field.entityFieldId]?.value?.children == undefined)
            ) {
              isValid = false;
              missingFields.push(
                JSON.parse(
                  field?.relationShipNameTranslation ||
                    field.formSectionFieldName,
                ).find((t: {langId: number}) => t.langId === langId)?.value,
              );
            }
          }
        });

        section?.FormSectionAttachments?.forEach((attachment: any) => {
          const isRequired = attachment.constraints?.some(
            (constraint: any) => constraint.constraintTypeId === 1,
          );
          const isVisible = visibility[attachment.AttachmentId] ?? true;

          if (
            isRequired &&
            (!attachments[attachment.FormSectionAttachmentId] ||
              attachments[attachment.FormSectionAttachmentId].length === 0) &&
            isVisible
          ) {
            isValid = false;
            missingFields.push(
              attachment.attachmentName.find(
                (name: any) => name.langId === langId,
              )?.value || t('Attachment'),
            );
            const errorMessage =
              JSON.parse(attachment.constraints[0].textMessages).find(
                (msg: any) => msg.langId === langId,
              )?.value || t('Field is required');

            errors[attachment.FormSectionAttachmentId] =
              errorMessage || t('File is required');
          }
        });
      });
    });
    setErrors(errors);
    setValidations(validations);

    if (!isValid) {
      Alert.alert(
        t('ValidationError'),
        `${t('PleaseFillRequiredFields')}:\n${missingFields.join(', ')}`,
      );
      // _openModal(
      //   t('ValidationError'),
      //   `${t('PleaseFillRequiredFields')}:\n${missingFields.join(', ')}`,
      //   '85%',
      // );
    }
    return isValid;
  };

  const handleActionPress = (action: any) => {
    if (action.ValidateForm && !validateForm()) {
      return;
    }

    // Alert.alert(
    //   t('Confirmation'),
    //   `${t('AreYouSure')} ${
    //     JSON.parse(action.StageActionName).find((a: any) => a.langId === langId)
    //       ?.value
    //   }?`,
    //   [
    //     {text: t('Cancel'), style: 'cancel'},
    //     {
    //       text: t('Proceed'),
    //       onPress: () => {
    //         Alert.alert(t('Success'), t('ActionCompletedSuccessfully'));
    //       },
    //     },
    //   ],
    // );
    submitFormData(action);
  };
  let params: any = {
    applicationId: applicationId,
    CurrentApplicationStageId: service?.applicationStageId,
    LastApplicationStageActionId: service?.applicationStageActionId
      ? service?.applicationStageActionId
      : null,
  };

  const submitFormData = (action: any = '') => {
    if (
      action?.stageActionTypeId == StageActionType.approve ||
      action?.stageActionTypeId == StageActionType.reject ||
      action?.stageActionTypeId == StageActionType.return ||
      action?.stageActionTypeId == StageActionType.assign ||
      action?.stageActionTypeId == StageActionType.pay ||
      action?.stageActionTypeId == StageActionType.delete ||
      action?.stageActionTypeId == StageActionType.notes ||
      action?.stageActionTypeId == StageActionType.reOpen ||
      action?.stageActionTypeId == StageActionType.downloadAction ||
      action?.stageActionTypeId == StageActionType.ReAssign
    ) {
      //If is action setting not disablePopup then open action comment modal
      let actionSetting = action.Settings ? JSON.parse(action.Settings) : '';
      if (actionSetting && actionSetting?.disablePopup) {
        _submitDataWithoutOpenModal(action);
      } else {
        _openCommentModal(action);
      }
    } else if (
      action?.stageActionTypeId == StageActionType.save ||
      action?.stageActionTypeId == StageActionType.submit ||
      action?.stageActionTypeId == StageActionType.sendEmail
    ) {
      _submitDataWithoutOpenModal(action);
    }
  };

  const _openCommentModal = (action: any) => {
    setSelectedAction(action);
    setModalVisible(true);
  };

  const _submitAppModal = (action: any, result?: any) => {
    params.destinationStageId = null;
    params.comments = comment;
    params.internalComments = result?.internalComment || '';
    params.users = result?.team ? result?.users : '';
    params.teamsIds = result?.team || '';
    params.viewingTeamsIds = result?.viewingTeam || '';
    if (action?.stageActionTypeId != StageActionType.delete) {
      if (result?.destinationStageId) {
        params.destinationStageId = result?.destinationStageId;
      } else {
        if (action?.DestinationStages) {
          let destinationStage = JSON.parse(action.DestinationStages);
          if (destinationStage.length < 2) {
            params.destinationStageId =
              destinationStage[destinationStage.length - 1].DestinationStageId;
          }
        }
      }
    }
    _submitApplication(params, action);
  };

  const _submitDataWithoutOpenModal = (action: any) => {
    let destinationStageId;
    if (action?.DestinationStages) {
      let destinationStage = JSON.parse(action.DestinationStages);
      if (destinationStage.length < 2) {
        destinationStageId =
          destinationStage[destinationStage.length - 1].DestinationStageId;
      }
    }
    params.destinationStageId = destinationStageId;

    _submitApplication(params, action);
  };

  const _submitApplication = (params: any, action: any) => {
    setIsLoading(true);
    dispatch(setLoadingModal(true));

    let data = generateDataFromFormValues(formValues, formData);
    params.data = data;
    params.stageActionId = action?.stageActionId;

    if (applicationId == 0) {
      params.parentApplication = null;
      params.serviceId = service?.serviceId;
      params.parentApplication = null;
      params.profileRecordId = record?.profileRecordId
        ? record?.profileRecordId
        : null;
      params.recordId = record?.recordId ? record?.recordId : null;
      params.requestedServiceId = record?.requestedServiceId
        ? record?.requestedServiceId
        : service?.requestedServiceId
        ? service?.requestedServiceId
        : null;
      params.tempAppId = tempAppId;
      params.DeviceTypeId = 2;
      _newApplication(params, action);
    } else {
      _executeAction(params, action);
    }
  };

  const _newApplication = (params: any, action: any) => {
    // dispatch(hideModal());
    dispatch(newApplicationExecuteAction(params)).then(res => {
      setIsLoading(false);
      dispatch(setLoadingModal(false));

      setTimeout(() => {
        handleExecuteResponse(res?.payload, action, params);
      }, 200);
    });
  };

  const _executeAction = (params: any, action: any) => {
    dispatch(executeAction(params)).then(res => {
      setIsLoading(false);
      dispatch(setLoadingModal(false));

      setTimeout(() => {
        handleExecuteResponse(res?.payload, action, params);
      }, 200);
    });
  };

  const {userData}: any = useAppSelector(store => store.userDataStored);

  const _openModal = (
    title?: string | boolean,
    msg?: string | boolean,
    minHeight?: any,
    CustomView?: any,
    fun?: any,
  ) => {
    dispatch(
      setModalData({
        title: title,
        message: msg,
        minHeight: minHeight ? minHeight : '15%',
        hideCancel: true,
        CustomView: CustomView,
        fun: !!fun ? () => fun() : false,
      }),
    );
  };

  const handleExecuteResponse = async (
    response: any,
    action: any,
    params: any,
    serviceSettings?: any,
    happinessMeterKey?: string,
    applicationNumber?: string,
  ) => {
    if (!response.networkSuccess) {
      _openModal(false, t('Labels.Sorry'));
      return;
    }
    const result = response?.executeActionResult;
    const stageActionTypeId = action.stageActionTypeId;
    const actionSettings = action.actionSettings;
    if (result?.status === 200) {
      // Handle errorsList
      if (result.errorsList) {
        const customErrors =
          typeof result.errorsList === 'string'
            ? JSON.parse(result.errorsList)
            : result.errorsList;
        let fieldNameTranslation = customErrors?.[0]?.fieldNameTranslation;
        let fieldNameTranslationValue =
          fieldNameTranslation && typeof fieldNameTranslation === 'string'
            ? JSON.parse(fieldNameTranslation)?.find(
                (a: any) => a.langId == langId,
              )?.value
            : '';

        _openModal(
          t('ValidationError'),
          customErrors.length > 0
            ? fieldNameTranslationValue
              ? fieldNameTranslationValue + '\n' + customErrors[0]?.description
              : '' + customErrors[0]?.description
            : '',
          '35%',
        );
        return;
      }

      const stageActionSetting = actionSettings
        ? JSON.parse(actionSettings)
        : {};

      // Reload application
      if (stageActionSetting?.reloadApplication === true) {
        if (params.serviceId === 1050) {
          dispatch(clearCartItems());
        }

        if (path === 'new') {
          NavigationService.replace('ApplicationDetails', {
            appId: result.applicationId,
            withCustomPluse: stageActionTypeId === StageActionType.approve,
          });
        } else {
          NavigationService.navigate('ApplicationDetails', {
            appId: result.applicationId,
            withCustomPluse: stageActionTypeId === StageActionType.approve,
          });
        }
        return;
      }

      // Invalid stage
      if (result?.currentAppStageExists === 'false') {
        _openModal(false, t('InvalidStageMessage'), '30%');
        return;
      }

      // Handle download
      if (stageActionTypeId === StageActionType.downloadAction) {
        if (result?.fileContents && result?.fileName) {
          // _downloadBase64File(result.fileContents, result.fileName + '.xlsx');
        } else if (result?.redirectURL) {
          NavigationService.navigate('WebViewScreen', {
            url: result.redirectURL,
            hideDrawer: true,
          });
        } else {
          NavigationService.navigate('Result');
        }
        return;
      }

      // Handle print content
      if (result?.printContent) {
        // setPrintContents(result.printContent);
        // setPrintModalVisible(true);
        return;
      }

      // Handle pay
      if (stageActionTypeId === StageActionType.pay) {
        const settings = actionSettings ? JSON.parse(actionSettings) : {};
        const {message, errorMessage, errorID, redirectURL, orderNumber} =
          result;

        if (settings?.GeneratePaymentLink) {
          NavigationService.navigate('WebViewScreen', {
            url: eservicesURL + '/custom/paymentlink/' + orderNumber,
            hideDrawer: true,
          });
          return;
        }

        if (message === 'New' || message === 'Failed') {
          if (errorID > 0) {
            _openModal(
              t('Error'),
              `${t('Labels.PaymentStatusFailed')}: ${errorMessage}`,
              '40%',
            );
          } else if (redirectURL) {
            NavigationService.navigate('WebViewScreen', {
              url: redirectURL,
              hideDrawer: true,
              setInternalUrl: (url: string) => {
                if (
                  url.startsWith(baseEsevicesUrl) ||
                  url.startsWith(baseILSsoUrl)
                ) {
                  NavigationService.replace('PaymentsReceiptDetails', {
                    orderNumber: orderNumber,
                  });
                }
              },
            });
          } else {
            _openModal(t('Error'), `${t('PaymentError')}: ${errorID}`, '40%');
          }
          return;
        }

        if (message === 'Pending') {
          _openModal('', t('Alerts.TransactionPending'), '40%');
          return;
        }

        if (message === 'Paid') {
          NavigationService.replace('PaymentsReceiptDetails', {
            orderNumber: orderNumber,
          });
          if (params.serviceId === 1050) {
            dispatch(clearCartItems());
          }
          return;
        }

        if (redirectURL) {
          NavigationService.navigate('WebViewScreen', {
            url: redirectURL,
            hideDrawer: true,
            setInternalUrl: (url: string) => {
              if (
                url.startsWith(baseEsevicesUrl) ||
                url.startsWith(baseILSsoUrl)
              ) {
                NavigationService.replace('PaymentsReceiptDetails', {
                  orderNumber: orderNumber,
                });
              }
            },
          });
          return;
        }
      }

      // Send Email
      if (stageActionTypeId === StageActionType.sendEmail) {
        _openModal(false, t('EmailSentSuccessfully'), '25%');
        return;
      }

      // Custom Thank You Pages
      if (customApplicationForm) {
        switch (params.serviceId) {
          case CustomServicesConstant.MiteForumService:
            // NavigationService.navigate('CustomThankYou_MITE');
            NavigationService.navigate('WebViewScreen', {
              url: eservicesURL + '/custom/mite-thankyou',
              hideDrawer: true,
            });
            return;
          case CustomServicesConstant.UAECTEForumService:
            // NavigationService.navigate('CustomThankYou_UAECTE');
            NavigationService.navigate('WebViewScreen', {
              url: eservicesURL + '/custom/uaecte-forum-thankyou',
              hideDrawer: true,
            });
            return;
          case CustomServicesConstant.ICVDayService:
            // NavigationService.navigate('CustomThankYou_ICVDay');
            NavigationService.navigate('WebViewScreen', {
              url: eservicesURL + '/custom/icv-day-thankyou',
              hideDrawer: true,
            });
            return;
          default:
            if (routerUrl?.includes('customer-support')) {
              // NavigationService.navigate('CustomThankYou_Support');
              NavigationService.navigate('WebViewScreen', {
                url: eservicesURL + '/custom/custom-support-thankyou',
                hideDrawer: true,
              });
            } else {
              // NavigationService.navigate('CustomThankYou_Census');
              NavigationService.navigate('WebViewScreen', {
                url: eservicesURL + '/custom/il-census-thankyou',
                hideDrawer: true,
              });
            }
            return;
        }
      }

      // If there's a redirectURL - WebView
      if (result?.redirectURL) {
        NavigationService.navigate('WebViewScreen', {
          url: result.redirectURL,
          hideDrawer: true,
        });
        return;
      }

      // Default success handling
      if (path === 'new') {
        if (stageActionTypeId == StageActionType.save) {
          if (params.serviceId === 1050) {
            dispatch(clearCartItems());
          }
          _openModal(
            false,
            `${t('ActionSavedSuccessfully')} ${result.applicationNumber}`,
            '15%',
            false,
            () =>
              NavigationService.replace('ApplicationDetails', {
                appId: result.applicationId,
                withCustomPluse: stageActionTypeId === StageActionType.approve,
              }),
          );
        } else {
          let msg;
          if (result.applicationNumber != null) {
            msg = `${t('ActionSubmittedSuccessfully')}, ${
              result.applicationNumber
            }`;
          } else {
            msg = `${t('ActionSubmittedSuccessfully')}`;
          }
          if (params.serviceId === 1050) {
            dispatch(clearCartItems());
          }
          _openModal(false, msg, '15%', false, () =>
            NavigationService.replace('ApplicationDetails', {
              appId: result.applicationId,
              withCustomPluse: stageActionTypeId === StageActionType.approve,
            }),
          );
        }
      } else {
        if (stageActionTypeId == StageActionType.delete) {
          _openModal(
            false,
            `${t('Labels.ResultApplicationDeleted')} `,
            '15%',
            false,
            () => NavigationService.goBack(),
          );
        } else {
          if (params.serviceId === 1050) {
            dispatch(clearCartItems());
          }
          _openModal(
            false,
            `${t('ActionSubmittedSuccessfully')} `,
            '15%',
            false,
            () =>
              NavigationService.replace('ApplicationDetails', {
                appId: applicationId,
                withCustomPluse: stageActionTypeId === StageActionType.approve,
              }),
          );
        }
      }

      // _openModal(false, t('Success'), '25%');
    } else {
      const errors = result?.errorsList;
      if (errors) {
        const customErrors =
          typeof errors === 'string' ? JSON.parse(errors) : errors;
        let fieldNameTranslation = customErrors?.[0]?.fieldNameTranslation;

        let fieldNameTranslationValue =
          fieldNameTranslation && typeof fieldNameTranslation === 'string'
            ? JSON.parse(fieldNameTranslation)?.find(
                (a: any) => a.langId == langId,
              )?.value
            : '';

        _openModal(
          t('ValidationError'),
          customErrors.length > 0
            ? fieldNameTranslationValue
              ? fieldNameTranslationValue + '\n' + customErrors[0]?.description
              : '' + customErrors[0]?.description
            : '',
          '35%',
        );
      }
    }
  };

  return (
    <View style={style.buttonContainer}>
      {actions?.length != 0 &&
        actions?.map(
          (action: any, index: number) =>
            !hideButton(action, userData, formData, formValues, optionsMap) && (
              <Button
                key={index}
                title={
                  JSON.parse(action.StageActionName).find(
                    (a: {langId: number}) => a.langId === langId,
                  )?.value
                }
                style={
                  checkIsDisable(action, formData, formValues)
                    ? {...style.buttonSubmitDisable}
                    : {
                        ...style.buttonSubmit,
                      }
                }
                styleText={{
                  color: checkIsDisable(action, formData, formValues)
                    ? colors.secondaryColor
                    : colors.mainWhite,
                }}
                onPress={() => handleActionPress(action)}
                disabled={checkIsDisable(action, formData, formValues)}
              />
            ),
        )}
      {selectedAction != null && (
        <CommentModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          titleConfirm={
            JSON.parse(selectedAction.StageActionName).find(
              (a: {langId: number}) => a.langId === langId,
            )?.value
          }
          fun={() => _submitAppModal(selectedAction)}
          comment={comment}
          setComment={setComment}
          tempAppId={tempAppId}
          service={service}
          attachmentsComment={attachmentsComment}
          setAttachmentsComment={setAttachmentsComment}
          action={selectedAction}
          langId={langId}
          applicationId={applicationId}
        />
      )}
    </View>
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
    buttonContainer: {
      marginTop: -10 * BW(),
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 4 * BW(),
    },
    buttonSubmit: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.secondaryColor,
      backgroundColor: colors.secondaryColor,
      borderWidth: 1 * BW(),
      minWidth: '49%',
      padding: 8 * BW(),
      minHeight: 40 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSubmitDisable: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.secondaryColor + '22',
      backgroundColor: colors.secondaryColor + '22',
      borderWidth: 1 * BW(),
      minWidth: '49%',
      padding: 8 * BW(),
      marginTop: 6 * BW(),
      opacity: 0.6,
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
      backgroundColor: colors.white,
      borderRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 12 * BW(),
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      padding: 20 * BW(),
      width: 50 * BW(),
      height: 50 * BW(),
    },
  });

export default Actions;

const hideButton = (
  action: any,
  userData: any,
  formData: any,
  formValues: any,
  optionsMap: any,
) => {
  let hidebutton = true;
  let profileMatchedArr = [];
  let checkForEnableBy: any = [];
  if (
    action.stageActionTypeId != 7 &&
    action.stageActionTypeId != 10 &&
    action.stageActionTypeId != 11 &&
    action.stageActionTypeId != 15 &&
    !action.IsGeneralAction
  ) {
    hidebutton = false;
  }

  if (action?.Settings) {
    let setting = JSON.parse(action?.Settings);
    let selectedProfile = userData;
    if (setting.hideForProfileServices) {
      if (selectedProfile) {
        setting.hideForProfileServices?.map((hideServiceId: any) => {
          selectedProfile.record?.appliedApplications?.find((x: any) => {
            if (x.ServiceId == hideServiceId) {
              profileMatchedArr.push(hideServiceId);
            }
          });
        });
        return profileMatchedArr.length > 0 ? true : false;
      }
    } else {
      formData?.forEach((form: any) => {
        form?.formSection?.forEach((section: {formSectionFields: any[]}) => {
          section?.formSectionFields?.map(
            (field: {
              fieldTypeId: any;
              entityFieldId: any;
              childrens: {AllFields: any[]};
              formSectionFieldValue: any;
              LookupData: {entityData: string};
            }) => {
              if (setting && setting?.VisibleBy) {
                //add in Efficiency label and green label
                if (
                  setting?.VisibleBy?.ParentId &&
                  field.fieldTypeId == EntityFieldTypeEnum.Relation
                ) {
                  if (
                    field.entityFieldId.toString() ==
                    setting?.VisibleBy?.ParentId.toString()
                  ) {
                    //get children
                    formValues[field.entityFieldId]?.children?.forEach(
                      (element: {fields: any[]}) => {
                        let isMachingRecordFound = element?.fields?.find(
                          (x: {entityFieldId: any}) =>
                            x.entityFieldId == setting?.VisibleBy?.ControlBy,
                        );
                        if (isMachingRecordFound) {
                          let value = setting?.VisibleBy?.Values.find(
                            (x: any) =>
                              x == isMachingRecordFound?.formSectionFieldValue
                                ? isMachingRecordFound?.formSectionFieldValue?.toString()
                                : formValues?.[
                                    isMachingRecordFound?.entityFieldId
                                  ]?.value
                                ? formValues?.[
                                    isMachingRecordFound?.entityFieldId
                                  ]?.value
                                : '',
                          );
                          if (value != undefined) {
                            // isDisable = false;
                            checkForEnableBy.push(hidebutton);
                          } else {
                            hidebutton = true;
                          }
                        }
                      },
                    );
                    let visibleType = setting?.VisibleBy.Type;
                    if (visibleType == 'OR') {
                      if (
                        checkForEnableBy &&
                        checkForEnableBy.length > 0 &&
                        checkForEnableBy.length ==
                          formValues[field.entityFieldId]?.children?.length
                      ) {
                        hidebutton = true;
                      } else {
                        hidebutton = false;
                      }
                    } else {
                      if (checkForEnableBy.length > 0) {
                        hidebutton = !(
                          checkForEnableBy.length ==
                          formValues[field.entityFieldId]?.children?.length
                        );
                      } else {
                        hidebutton = true;
                      }
                    }
                  }
                }
                //main form fields
                else if (setting?.VisibleBy?.ControlBy == field.entityFieldId) {
                  //if action setting has key LookupSettingKey
                  if (
                    setting?.VisibleBy?.LookupSettingKey &&
                    field.fieldTypeId == FieldTypeEnum.Options
                  ) {
                    if (formValues[field.entityFieldId]?.value) {
                      let settings;
                      const currentValue =
                        formValues[field.entityFieldId]?.value;
                      const matchedOption =
                        !!optionsMap[field.entityFieldId] &&
                        optionsMap[field.entityFieldId].find(
                          (opt: any) => opt.value === currentValue,
                        );

                      if (matchedOption) {
                        settings = matchedOption.settings;
                      }

                      let selectedLookupValueSetting = formValues[
                        field.entityFieldId
                      ]?.settings
                        ? formValues[field.entityFieldId]?.settings
                        : settings
                        ? settings
                        : '';
                      hidebutton = true;
                      if (selectedLookupValueSetting) {
                        let lookupValSetting = JSON.parse(
                          selectedLookupValueSetting,
                        );

                        if (
                          lookupValSetting[
                            setting.VisibleBy.LookupSettingKey
                          ] != null
                        ) {
                          let value = setting.VisibleBy.Values.find(
                            (visibleByValue: any) =>
                              visibleByValue ==
                              lookupValSetting[
                                setting.VisibleBy.LookupSettingKey
                              ].toString(),
                          );
                          if (value != undefined) {
                            hidebutton =
                              value == '' || value != '' ? false : true;
                          } else {
                            hidebutton = true;
                          }
                        }
                      }
                    } else {
                      hidebutton = true;
                    }
                  } else {
                    let value = setting.VisibleBy.Values.find(
                      (x: any) =>
                        x == formValues[field.entityFieldId]?.value?.toString(),
                    );
                    if (value != undefined) {
                      hidebutton = value == '' || value != '' ? false : true;
                    } else {
                      hidebutton = true;
                    }
                  }
                }
              }
            },
          );
        });
      });
    }
  }

  return hidebutton;
};

const checkIsDisable = (action: any, formData: any, formValues: any) => {
  let isDisable = false;
  let controlByValueArray: any = [];
  let checkForEnableBy = [];
  if (action?.Settings && formData) {
    let setting = parseJSON(action?.Settings);
    formData?.forEach((form: any) => {
      form?.formSection?.forEach((section: any) => {
        section?.formSectionFields?.map((field: any) => {
          if (setting && setting?.DisableBy) {
            if (
              setting?.DisableBy.Controls &&
              setting?.DisableBy.Controls.length > 0
            ) {
              setting?.DisableBy.Controls.forEach((x: any) => {
                if (x?.ParentId && field.fieldTypeId == 7) {
                  if (field.entityFieldId.toString() == x.ParentId.toString()) {
                    if (
                      formValues[field.entityFieldId]?.children &&
                      formValues[field.entityFieldId]?.children.length > 0
                    ) {
                      formValues[field.entityFieldId]?.children?.forEach(
                        (element: any) => {
                          let isMachingRecordFound: any = '';
                          if (element?.fields && element?.fields[0].itemIndex) {
                            isMachingRecordFound = element?.fields
                              ?.filter((x: any) => x.itemIndex > 0)
                              ?.find(
                                (c: any) => c.entityFieldId == x?.ControlBy,
                              );
                          } else {
                            isMachingRecordFound = element?.fields?.find(
                              (c: any) => c.entityFieldId == x?.ControlBy,
                            );
                          }

                          if (isMachingRecordFound) {
                            if (
                              x.ControlBy == isMachingRecordFound?.entityFieldId
                            ) {
                              let current = x.Values?.find(
                                (value: any) =>
                                  value ==
                                    formValues?.[
                                      isMachingRecordFound?.entityFieldId
                                    ]?.value ||
                                  isMachingRecordFound?.formSectionFieldValue?.toString(),
                              );
                              if (current != undefined) {
                                let obj = {
                                  action: action,
                                  current: current,
                                };
                                controlByValueArray.push(obj);
                              }
                            }
                          }
                        },
                      );
                      isDisable =
                        controlByValueArray &&
                        controlByValueArray.length > 0 &&
                        controlByValueArray.length ==
                          formValues[field.entityFieldId]?.children?.length
                          ? true
                          : false;
                    } else {
                      isDisable = true;
                    }
                  }
                } else {
                  if (x.ControlBy == field.entityFieldId) {
                    let current = x.Values.find(
                      (value: any) =>
                        value ==
                        formValues?.[field.entityFieldId]?.value?.toString(),
                    );

                    if (current != undefined) {
                      let obj = {
                        action: action,
                        current: current,
                      };
                      controlByValueArray.push(obj);
                    }
                    let disableType = setting?.DisableBy.Type;
                    if (disableType) {
                      if (disableType == 'OR') {
                        //if Controls.length == contolvalue then disable
                        // != setting.DisableBy.Controls.length
                        if (
                          controlByValueArray &&
                          controlByValueArray.length > 0
                        ) {
                          isDisable = true;
                        } else {
                          isDisable = false;
                        }
                      } else {
                        if (
                          controlByValueArray &&
                          controlByValueArray.length ==
                            setting.DisableBy.Controls.length
                        ) {
                          isDisable = true;
                        } else {
                          isDisable = false;
                        }
                      }
                    } else {
                      isDisable =
                        controlByValueArray && controlByValueArray.length > 0
                          ? true
                          : false;
                    }
                  }
                }
              });
            }
          }

          if (setting && setting?.EnableBy) {
            if (
              setting?.EnableBy?.ParentId &&
              field.fieldTypeId == EntityFieldTypeEnum.Relation
            ) {
              if (
                field.entityFieldId.toString() ==
                setting?.EnableBy?.ParentId.toString()
              ) {
                //get children

                formValues[field.entityFieldId]?.children?.forEach(
                  (element: any) => {
                    let isMachingRecordFound = element?.fields?.find(
                      (x: any) =>
                        x.entityFieldId == setting?.EnableBy?.ControlBy,
                    );

                    if (isMachingRecordFound) {
                      let value = setting?.EnableBy?.Values.find((x: any) =>
                        x == isMachingRecordFound?.value
                          ? isMachingRecordFound?.value?.toString()
                          : '',
                      );

                      if (value != undefined) {
                        // isDisable = false;
                        checkForEnableBy.push(isDisable);
                      } else {
                        isDisable = true;
                      }
                    }
                  },
                );
                isDisable = !(
                  checkForEnableBy.length ==
                  formValues[field.entityFieldId]?.children?.length
                );
              }
            } else if (setting?.EnableBy?.ControlBy == field.entityFieldId) {
              let value = setting.EnableBy.Values.find(
                (x: any) => x == formValues?.[field.entityFieldId]?.value,
              );
              if (value != undefined) {
                isDisable = false;
              } else {
                isDisable = true;
              }
            }
          }
        });
      });
    });
  }
  return isDisable;
};
