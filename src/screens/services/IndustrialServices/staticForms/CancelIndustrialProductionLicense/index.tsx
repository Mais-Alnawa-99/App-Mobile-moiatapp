import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Page from '../../../../../component/Page';
import PageBg from '../../../../../component/PageBg';
import Header from '../../../../../component/Header';
import Text from '../../../../../component/Text';
import Input from '../../../../../component/input/Input';
import FileUpload from '../../../../../component/attachment/ILAttachmentUpload';
import Loader from '../../../../../component/Loader';
import {BW} from '../../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {acceptedFiles, maxFileSize} from '../..';
import {exitConfirm} from '../../../../WebViewScreen';
import ProfileBrief from '../../../../Dashboard/IL-Services/ProfileBrief';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import ActionButtons from '../../ActionButtons';
import {SPHeader} from '../../IlServiceHeader';
import {
  getDuesOnLicense,
  getRequestDetails,
  SubmitIndustrialLicenseCancellation,
} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {isArabic} from '../../../../../locales';
import reactotron from 'reactotron-react-native';
import {
  setLoadingModal,
  setLoadingApplication,
} from '../../../../../redux/reducers/General/loader';
import NavigationService from '../../../../../navigation/NavigationService';
import {_openModal} from '../../../Eservices/ServiceForm';
import {isDraft} from '@reduxjs/toolkit';

interface FormValues {
  ReasonOfCancellation: string;
  LocalAuthorityApprovalList: any[];
  IncorporationContractList: any[];
  CancellationLetterList: any[];
  TermsAndConditions: boolean;
  isDraft: any;
  DuesOnCompany: any;
}

export default function IndustrialLicenseCancellation(props: any): JSX.Element {
  const params = props.route.params;
  const [canPay, setCanPay] = useState(false);
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const initialValues: FormValues = {
    ReasonOfCancellation: '',
    LocalAuthorityApprovalList: [],
    IncorporationContractList: [],
    CancellationLetterList: [],
    TermsAndConditions: false,
    isDraft: 0,
    DuesOnCompany: 0,
  };
  const [initials, setInitials] = useState(initialValues);
  const dispatch = useAppDispatch();
  const userILData: any = useAppSelector(store => store.userILData);
  const [service, setService] = useState({});
  const applicationId = useMemo(() => params?.applicationId || false, [params]);
  const validationSchema = Yup.object().shape({
    ReasonOfCancellation: Yup.string().required(t('Required')),
    CancellationLetterList: Yup.array()
      .min(1, t('Required'))
      .required(t('Required')),
    TermsAndConditions: Yup.bool().oneOf([true], t('IL.ILC.mustAgreeToTerms')),
  });
  const submitForm = (values: any) => {
    try {
      dispatch(setLoadingModal(true));

      let body = {};
      if (applicationId)
        body = {
          ...values,
          formId: '17',
          userId: userILData?.userId,
          Id: applicationId,
        };
      else body = {...values, formId: '17', userId: userILData?.userId};
      dispatch(
        SubmitIndustrialLicenseCancellation({
          body: {
            ...body,
            licenseId: userILData?.userILData?.Id,
            languageId: isArabic() ? 2 : 1,
          },
        }),
      ).then(result => {
        dispatch(setLoadingModal(false));
        if (result?.payload?.networkSuccess) {
          if (result?.payload?.Data?.success)
            NavigationService.replace('Success', {
              message: isArabic()
                ? result.payload.Data.messageAr
                : result.payload.Data.message,
              Id: result?.payload?.Data?.id,
              No: result?.payload?.Data?.no,
              service: params?.service,
            });
          else {
            const errorString = Object.entries(
              result?.payload?.Data?.errors,
            ).reduce(
              (acc, [field, errorMessage]) =>
                acc + `${field}: ${errorMessage}\n`,
              '',
            );
            if (errorString !== '') {
              Alert.alert(
                isArabic()
                  ? result.payload.Data.messageAr
                  : result.payload.Data.message,
                errorString,
              );
            }
          }
        } else {
          Alert.alert('', t('IL.NetworkError'));
        }
      });
    } catch (error) {
    } finally {
    }
  };
  const getBase64FileSize = (base64: string): number => {
    // remove the base64 mime prefix if present (e.g. "data:application/pdf;base64,")
    let cleaned = base64.split(',').pop() || base64;

    // calculate padding
    let padding = 0;
    if (cleaned.endsWith('==')) padding = 2;
    else if (cleaned.endsWith('=')) padding = 1;

    // calculate size
    const sizeInBytes = (cleaned.length * 3) / 4 - padding;

    return sizeInBytes;
  };
  const _getApplicationDetails = async () => {
    dispatch(setLoadingApplication(true));
    const data = await dispatch(
      getRequestDetails({
        ApplicationId: applicationId, //'AD1A9DA7-08AD-44A6-841A-67EEE43E16BC', //
        UserId: userILData?.userId, //'4DEF6CD6-5ABF-4232-BB3A-C886617858EA', //
      }),
    );
    if (data?.payload?.Data?.success) {
      const result = data?.payload?.Data?.AppData;
      setCanPay(data?.payload.Data?.Application?.ShouldShowPaymentButton);
      setService({
        ReferenceNo: data?.payload.Data?.Application?.Refeno,
        DateCreated: data?.payload?.Data?.AppData?.DateCreated,
        LockedUser: data?.payload?.Data?.AppData?.LockedByName,
      });

      const newMappedData = {
        ReasonOfCancellation: result.ReasonOfCancellation,
        LocalAuthorityApprovalList: result.LocalAuthorityApprovalList
          ? result.LocalAuthorityApprovalList.map((attach: any) => {
              const sizeBytes = attach.Base64
                ? getBase64FileSize(attach.Base64)
                : 0;
              return {
                type: attach.Type,
                base64: attach.Base64,
                name: attach.Name,
                size: sizeBytes,
                isnew: false,
              };
            })
          : [],
        IncorporationContractList: result.IncorporationContractList
          ? result.IncorporationContractList.map((attach: any) => {
              const sizeBytes = attach.Base64
                ? getBase64FileSize(attach.Base64)
                : 0;
              return {
                type: attach.Type,
                base64: attach.Base64,
                name: attach.Name,
                size: sizeBytes,
                isnew: false,
              };
            })
          : [],
        CancellationLetterList: result.CancellationLetterList
          ? result.CancellationLetterList.map((attach: any) => {
              const sizeBytes = attach.Base64
                ? getBase64FileSize(attach.Base64)
                : 0;
              return {
                type: attach.Type,
                base64: attach.Base64,
                name: attach.Name,
                size: sizeBytes,
                isnew: false,
              };
            })
          : [],
        isDraft: result.IsDraft,
        TermsAndConditions: true,
        DuesOnCompany: result?.DuesOnCompany,
      };
      setInitials(newMappedData);
      dispatch(setLoadingApplication(false));
    } else {
      _openModal(
        dispatch,
        false,
        false,
        false,
        <Text h4 style={{color: colors.red}}>
          {data?.payload?.Message}
        </Text>,
      );
      dispatch(setLoadingApplication(false));
    }
  };
  const onSubmit = (values: FormValues) => {
    submitForm(values);
  };

  useEffect(() => {
    if (applicationId) _getApplicationDetails();
  }, []);

  const _getDuesOnLicense = () => {
    dispatch(
      getDuesOnLicense({
        LicenseId: userILData?.userILData?.Id,
      }),
    ).then(res => {
      if (!!res.payload?.result) {
        setInitials({
          ...initials,
          DuesOnCompany: res.payload?.result?.DuesOnCompany,
        });
      }
    });
  };

  useEffect(() => {
    _getDuesOnLicense();
  }, []);

  return (
    <SPHeader
      service={{...service, ...params?.service}}
      exitForm={initials.isDraft == 0 && applicationId}
      canPay={canPay}>
      <Loader>
        <Formik
          initialValues={initials}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
            setTouched,
            validateForm,
          }) => {
            const isDisabled = (fieldName: string) => {
              if (!applicationId) return false;
              else if (values.isDraft == 1) return false;
              else return true;
            };
            return (
              <View>
                <ProfileBrief
                  style={{marginTop: 0}}
                  userILData={userILData?.userILData}
                  withoutAction
                />

                <View
                  style={{
                    borderColor: colors?.red,
                    borderWidth: 1 * BW(),
                    marginTop: 8 * BW(),
                    padding: 8 * BW(),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text h4 style={{color: colors?.red, textAlign: 'center'}}>
                    {t('IL.ILC.CancellationWarning')}
                  </Text>
                </View>
                <StepIndicator
                  style={{
                    marginBottom: 0 * BW(),
                    marginTop: 8 * BW(),
                  }}
                  stepNumber={1}
                  stepName={t('requestDetails')}
                />

                <Input
                  textInput
                  label={t('IL.ILC.ReasonOfCancellation')}
                  value={values.ReasonOfCancellation}
                  onChangeText={(text: any) =>
                    setFieldValue('ReasonOfCancellation', text)
                  }
                  error={
                    touched.ReasonOfCancellation && errors.ReasonOfCancellation
                  }
                  required={
                    touched.ReasonOfCancellation && errors.ReasonOfCancellation
                  }
                  styleInput={{
                    minHeight: 100 * BW(),
                  }}
                  multiline={true}
                  disabled={isDisabled('FirstName')}
                />

                <Input
                  textInput
                  label={t('IL.ILC.CompanyDues')}
                  value={String(values?.DuesOnCompany || 0)}
                  disabled
                />
                <View style={{marginTop: 8 * BW()}}>
                  <StepIndicator
                    stepNumber={2}
                    stepName={t('IL.Attachments')}
                    style={{marginBottom: 0}}
                  />

                  <FileUpload
                    title={t('IL.ILC.LocalAuthorityApproval')}
                    value={values.LocalAuthorityApprovalList}
                    onChange={(files: any) =>
                      setFieldValue('LocalAuthorityApprovalList', files)
                    }
                    maxFile={2}
                    acceptedFiles={acceptedFiles}
                    maxFileSize={maxFileSize}
                    isDisabled={isDisabled('FirstName')}
                  />
                  <FileUpload
                    title={t('IL.ILC.IncorporationContract')}
                    value={values.IncorporationContractList}
                    onChange={(files: any) =>
                      setFieldValue('IncorporationContractList', files)
                    }
                    maxFile={2}
                    maxFileSize={maxFileSize}
                    acceptedFiles={acceptedFiles}
                    isDisabled={isDisabled('FirstName')}
                  />
                  <FileUpload
                    title={t('IL.ILC.CancellationLetter')}
                    required={
                      touched.CancellationLetterList &&
                      errors.CancellationLetterList
                    }
                    requiredStar
                    value={values.CancellationLetterList}
                    onChange={(files: any) =>
                      setFieldValue('CancellationLetterList', files)
                    }
                    maxFile={2}
                    maxFileSize={maxFileSize}
                    acceptedFiles={acceptedFiles}
                    errors={
                      touched.CancellationLetterList &&
                      errors.CancellationLetterList
                    }
                    isDisabled={isDisabled('FirstName')}
                  />
                </View>
                <Text h4 style={{marginTop: 8 * BW()}}>
                  {t('IL.TermsAndConditionsNote')}
                </Text>
                <Input
                  checkbox
                  title={t('IL.ILC.AgreeToTerms')}
                  requiredStar
                  checked={values.TermsAndConditions}
                  onPress={(val: any) =>
                    setFieldValue(
                      'TermsAndConditions',
                      !values.TermsAndConditions,
                    )
                  }
                  error={
                    touched.TermsAndConditions && errors.TermsAndConditions
                  }
                  disabled={isDisabled('FirstName')}
                />
                {!isDisabled('FirstName') && (
                  <ActionButtons
                    style={{marginTop: 8 * BW()}}
                    onSubmit={async () => {
                      const formErrors = await validateForm();
                      setTouched(
                        Object.keys(values).reduce((acc, key) => {
                          acc[key] = true;
                          return acc;
                        }, {} as Record<string, boolean>),
                        true,
                      );
                      const errorString = Object.entries(formErrors).reduce(
                        (acc, [field, errorMessage]) =>
                          acc + `${t(`IL.ILC.${field}`)}: ${errorMessage}\n`,
                        '',
                      );
                      if (errorString !== '') {
                        Alert.alert('', errorString);
                      } else {
                        handleSubmit();
                        if (Object.entries(errors).length > 0)
                          _openModal(
                            dispatch,
                            false,
                            false,
                            false,
                            <Text h4 style={{color: colors.red}}>
                              {t('IL.ERRORVALID')}
                            </Text>,
                          );
                      }
                    }}
                    onSaveDraft={() => {
                      const data = {...values, isDraft: 1};
                      submitForm(data);
                    }}
                    disabled={!values.TermsAndConditions}
                  />
                )}
              </View>
            );
          }}
        </Formik>
      </Loader>
    </SPHeader>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 8 * BW(),
    },
    btn: {
      backgroundColor: colors?.secondaryColor,
      width: 'auto',
      height: 'auto',
      minHeight: 45 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30 * BW(),
    },
  });
