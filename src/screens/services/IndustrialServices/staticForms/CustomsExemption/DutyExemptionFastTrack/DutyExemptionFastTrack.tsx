// DutyExemption.tsx

import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Platform, ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Page from '../../../../../../component/Page';
import PageBg from '../../../../../../component/PageBg';
import Header from '../../../../../../component/Header';
import Text from '../../../../../../component/Text';
import Input from '../../../../../../component/input/Input';
import FileUpload from '../../../../../../component/attachment/ILAttachmentUpload';
import StepIndicator from '../../../../Eservices/DynamicForm/StepIndicator';
import ActionButtons from '../../../ActionButtons';
import NoteBox from '../NoteBox';
import ProfileBrief from '../../../../../Dashboard/IL-Services/ProfileBrief';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/store';
import {exitConfirm} from '../../../../../WebViewScreen';
import {acceptedFiles} from '../../..';
import {BW} from '../../../../../../style/theme';
import RenderHtmlComponent from '../../../../../../component/renderHtml/RenderHtml';
import {isArabic} from '../../../../../../locales';
import {
  CascadedLookups,
  GetLookupData,
  getRequestDetails,
  submitDutyExemptionFastTrack,
  submitNewRawMaterial,
} from '../../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {setEmirates} from '../../../../../../redux/reducers/I-Services/slice/Emirates';
import RawMaterialsDetails from '../DutyExemption/RawMaterialDetails';
import {transformNewRawMaterialData} from '../SubmitDetails';
import {transformFastTrackDutyExemptionData} from './SubmitDetailsFastTrack';
import {isDraft} from '@reduxjs/toolkit';
import moment from 'moment';
import {SPHeader} from '../../../IlServiceHeader';
import {
  setLoadingApplication,
  setLoadingModal,
} from '../../../../../../redux/reducers/General/loader';
import NavigationService from '../../../../../../navigation/NavigationService';
import {_openModal} from '../../../../Eservices/ServiceForm';
import {mapDutyExemptionFastTrack} from './DataMapper';

const maxFileSize = 9 * 1024 * 1024;

type DutyExemptionFormValues = {
  BillOfLadingNumber: string;
  SourceChamberCodeId: string;
  EmirateId: string;
  ImportCode: string;
  ShipmentInvoiceNumber: string;
  InvoiceDate: any;
  Currency: string;
  TotalValue: string;
  TotalVAlueInAED: string;
  NewMaterials: any[];
  InvoiceAttestationLegalization: string;
  AttestationDocumentType: string;
  MOFAICApplicationNumber: string;
  CertificateOfOriginAttestationFees: string;
  AttestationFees: string;
  TotalAttestationFees: string;
  ServiceFees: number;
  TotalFeeofallapplications: number;
  TotalFees: number;
  Invoice: any[];
  BillOfLading: any[];
  PackingList: any[];
  CertificateOfOrigin: any[];
  isDraft: number;
  TermsAndConditions: boolean;
};
const initialValues: DutyExemptionFormValues = {
  BillOfLadingNumber: '',
  SourceChamberCodeId: '',
  EmirateId: '',
  ImportCode: '',
  ShipmentInvoiceNumber: '',
  InvoiceDate: '',
  Currency: '',
  TotalValue: '',
  TotalVAlueInAED: '',
  NewMaterials: [],
  InvoiceAttestationLegalization: '',
  AttestationDocumentType: '',
  MOFAICApplicationNumber: '',
  CertificateOfOriginAttestationFees: '',
  AttestationFees: '',
  TotalAttestationFees: '',
  ServiceFees: 100,
  TotalFeeofallapplications: 0,
  TotalFees: 0,
  Invoice: [],
  // AttestedInvoice: [],
  // AttestedCertificateOfOrigin: [],
  BillOfLading: [],
  PackingList: [],
  CertificateOfOrigin: [],
  isDraft: 1,
  TermsAndConditions: false,
};
export default function DutyExemptionFastTrack(props: any): JSX.Element {
  const params = props.route.params;
  const [canPay, setCanPay] = useState(false);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {colors}: any = useTheme();
  const userILData = useAppSelector(state => state.userILData);
  const [chambers, setChambers] = useState<any[]>([]);
  const [currency, setCurrency] = useState<any[]>([]);
  const emirates = useAppSelector(state => state.Emirate.list);
  const userId = useAppSelector(state => state.userILData.userId);
  const [showInvoiceDate, setShowInvoiceDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [initials, setInitials] = useState(initialValues);
  const [service, setService] = useState({});
  const [attestationLegalization, setAttestationLegalization] = useState<any[]>(
    [],
  );
  const [attestationDocumentType, setAttestationDocumentType] = useState<any[]>(
    [],
  );

  const validationSchema = Yup.object().shape({
    BillOfLadingNumber: Yup.string().required(t('Required')),
    SourceChamberCodeId: Yup.string().required(t('Required')),
    EmirateId: Yup.string().required(t('Required')),
    ShipmentInvoiceNumber: Yup.string().required(t('Required')),
    InvoiceDate: Yup.string().required(t('Required')),
    Currency: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),
    TotalValue: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('IL.EnterValidNumber')),
    PackingList: Yup.array().min(1, t('Required')),
    Invoice: Yup.array().min(1, t('Required')),
    BillOfLading: Yup.array().min(1, t('Required')),
    InvoiceAttestationLegalization: Yup.string()
      .oneOf(['1902', '1903'], t('Required'))
      .required(t('Required')),

    CertificateOfOrigin: Yup.array().when('AttestationDocumentType', {
      is: '3515',
      then: schema => schema.min(1, t('Required')),
    }),
    MOFAICApplicationNumber: Yup.string().when(
      'InvoiceAttestationLegalization',
      {
        is: '1903',
        then: schema => schema.required(t('Required')),
      },
    ),
    AttestationDocumentType: Yup.string().when(
      'InvoiceAttestationLegalization',
      {
        is: '1902',
        then: schema => schema.required(t('Required')),
      },
    ),
    NewMaterials: Yup.array()
      .min(1, t('AtLeastOneItem'))
      .required(t('AtLeastOneItem')),
    TermsAndConditions: Yup.bool().oneOf([true], t('IL.ILC.mustAgreeToTerms')),
  });
  const editableFields: any = [];

  const isDisabled = (fieldName: string) => {
    if (!applicationId) return false;
    else if (initials.isDraft == 1) return false;
    return !editableFields.includes(fieldName);
  };
  const applicationId = useMemo(() => params?.applicationId || false, [params]);
  const _getApplicationDetails = async () => {
    const data = await dispatch(
      getRequestDetails({
        ApplicationId: applicationId,
        UserId: userILData?.userId,
      }),
    );
    if (data?.payload.Data?.success) {
      const updatedData = data?.payload.Data?.AppData;
      setCanPay(data?.payload.Data?.Application?.ShouldShowPaymentButton);
      setService({
        ReferenceNo: data?.payload.Data?.Application?.Refeno,
        DateCreated: data?.payload?.Data?.AppData?.DateCreated,
        LockedUser: data?.payload?.Data?.AppData?.LockedByName,
      });
      const newMappedData = mapDutyExemptionFastTrack(updatedData);
      setInitials(newMappedData);
      dispatch(setLoadingApplication(false));
    }
  };
  const onChangeDate = (
    event: any,
    date: moment.MomentInput,
    setFieldValue: (arg0: string, arg1: string) => void,
  ) => {
    Platform.OS == 'android' && setShowInvoiceDate(false);
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setFieldValue('InvoiceDate', formattedDate);
    }
  };
  const onSubmit = (values: any) => {
    try {
      dispatch(setLoadingModal(true));
      const body = transformFastTrackDutyExemptionData({
        ...values,
        userId: userId,
        FormId: params?.service?.serviceId,
        licenseId: userILData?.userILData?.Id,
        applicationId,
      });
      let language = isArabic() ? 2 : 1;
      dispatch(
        submitDutyExemptionFastTrack({body: {...body, LanguageId: language}}),
      ).then(result => {
        dispatch(setLoadingModal(false));
        if (result?.payload?.networkSuccess) {
          if (result?.payload?.Data?.success)
            NavigationService.replace('Success', {
              message: isArabic()
                ? result?.payload?.Data?.messageAr
                : result?.payload?.Data?.message,
              Id: result?.payload?.Data?.id,
              No: result?.payload?.Data?.no,
              service: params?.service,
            });
          else {
            let message = isArabic()
              ? result.payload.Data.messageAr
              : result.payload.Data.message;

            let errorString = '';
            if (typeof result?.payload?.Data?.errors == 'string')
              errorString = result?.payload?.Data?.errors;
            else
              errorString = Object.entries(
                result?.payload?.Data?.errors,
              ).reduce(
                (acc, [field, errorMessage]) =>
                  acc + `${field}: ${errorMessage}\n`,
                '',
              );

            Alert.alert(message, errorString);
          }
        } else {
          Alert.alert('', t('IL.NetworkError'));
        }
      });
    } catch (error) {
    } finally {
    }
  };

  const _getChambers = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'SourceChamberCode'})).then(
      res => {
        if (res.payload?.networkSuccess) {
          const items = res.payload.result.SourceChamberCode.map(
            (item: any, index: number): any => ({
              ...item,
              label: item.Name,
              value: item.Id,
            }),
          );
          setChambers(items);
        } else {
          setChambers([]);
        }
      },
    );
  };
  const _getEmirates = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'Emirates'})).then(res => {
      if (res.payload?.networkSuccess) {
        const items = res.payload.result.Emirates.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        dispatch(setEmirates(items));
      } else {
        dispatch(setEmirates([]));
      }
    });
  };
  const _getCurrency = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(CascadedLookups({language, Category: 'Currency'})).then(res => {
      if (res.payload?.networkSuccess) {
        const items = res.payload.result.Currency.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        setCurrency(items);
      } else {
        setCurrency([]);
      }
    });
  };
  const _getAttestationLegalization = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(
      GetLookupData({language, Category: 'AttestationLegalization'}),
    ).then(res => {
      if (res.payload?.networkSuccess) {
        const items = res.payload.result.AttestationLegalization.filter(
          (item: any) => !['Bank', 'مصرف'].includes(item?.Name),
        ).map((item: any, index: number): any => ({
          ...item,
          label: item.Name,
          value: item.Id,
        }));
        setAttestationLegalization(items);
      } else {
        setAttestationLegalization([]);
      }
    });
  };
  const _getAttestationDocumentType = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(
      GetLookupData({language, Category: 'AttestationDocumentType'}),
    ).then(res => {
      if (res.payload?.networkSuccess) {
        const items = res.payload.result.AttestationDocumentType.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        setAttestationDocumentType(items);
      } else {
        setAttestationDocumentType([]);
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      _getCurrency();
      _getEmirates();
      _getAttestationLegalization();
      _getAttestationDocumentType();
      _getChambers();
      if (applicationId) await _getApplicationDetails();
    };
    fetchData();
  }, []);

  return (
    <SPHeader
      service={{...service, ...params?.service}}
      exitForm={initials.isDraft == 0 && applicationId}
      canPay={canPay}>
      <Formik
        initialValues={initials}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={values => onSubmit({...values, isDraft: 0})}>
        {({values, handleSubmit, setFieldValue, touched, errors}) => {
          useEffect(() => {
            if (values.InvoiceAttestationLegalization == '1902') {
              if (values.AttestationDocumentType == '3514') {
                setFieldValue('CertificateOfOriginAttestationFees', '0');
                setFieldValue('AttestationFees', '150.0');
                setFieldValue('TotalAttestationFees', '150.0');
                setFieldValue(
                  'TotalFees',
                  String(
                    Number(
                      Number(values.TotalAttestationFees) +
                        values.ServiceFees * values.NewMaterials.length,
                    ),
                  ),
                );
              } else if (values.AttestationDocumentType == '3515') {
                setFieldValue('CertificateOfOriginAttestationFees', '150.0');
                setFieldValue('AttestationFees', '150.0');
                setFieldValue('TotalAttestationFees', '300.0');
                setFieldValue(
                  'TotalFees',
                  String(
                    Number(
                      Number(values.TotalAttestationFees) +
                        values.ServiceFees * values.NewMaterials.length,
                    ),
                  ),
                );
              }
            } else if (values.InvoiceAttestationLegalization == '1903') {
              setFieldValue('CertificateOfOriginAttestationFees', '');
              setFieldValue('AttestationFees', '');
              setFieldValue('TotalAttestationFees', '');
              setFieldValue(
                'TotalFees',
                String(Number(values.ServiceFees * values.NewMaterials.length)),
              );
            }
          }, [
            values.InvoiceAttestationLegalization,
            values.NewMaterials,
            values.AttestationDocumentType,
            values.ServiceFees,
            values.TotalAttestationFees,
          ]);

          return (
            <View>
              <ProfileBrief
                userILData={userILData?.userILData}
                style={{marginTop: 0}}
                withoutAction
              />

              <NoteBox html note={t('IL.DE.DEFastImportantNotes')} />

              <StepIndicator
                stepNumber={1}
                stepName={t('IL.DE.ShipmentDetails')}
                style={{marginBottom: 0, marginTop: 8 * BW()}}
              />
              <Input
                textInput
                label={t('IL.DE.BillOfLadingNumber')}
                value={values.BillOfLadingNumber}
                onChangeText={(v: any) =>
                  setFieldValue('BillOfLadingNumber', v)
                }
                requiredStar
                error={touched.BillOfLadingNumber && errors.BillOfLadingNumber}
                required={
                  touched.BillOfLadingNumber && errors.BillOfLadingNumber
                }
                disabled={isDisabled('BillOfLadingNumber')}
              />
              <Input
                dropdown
                label={t('IL.DE.SourceChamber')}
                items={chambers}
                value={values.SourceChamberCodeId}
                onChange={(v: any) =>
                  setFieldValue('SourceChamberCodeId', v?.value)
                }
                requiredStar
                error={
                  touched.SourceChamberCodeId && errors.SourceChamberCodeId
                }
                required={
                  touched.SourceChamberCodeId && errors.SourceChamberCodeId
                }
                disabled={isDisabled('SourceChamberCodeId')}
              />
              <Text
                h5
                style={{
                  color: colors.lightPrimaryTextColor,
                }}>
                {t('IL.Help_SourcChamberOtherOption')}
              </Text>

              <Input
                dropdown
                label={t('IL.DE.Emirate')}
                items={emirates}
                value={values.EmirateId}
                onChange={(v: any) => setFieldValue('EmirateId', v?.value)}
                requiredStar
                error={touched.EmirateId && errors.EmirateId}
                required={touched.EmirateId && errors.EmirateId}
                disabled={isDisabled('EmirateId')}
              />
              <Input
                textInput
                label={t('IL.DE.CustomsNumber')}
                value={values.ImportCode}
                onChangeText={(v: any) => setFieldValue('ImportCode', v)}
                disabled={isDisabled('ImportCode')}
              />
              <Input
                textInput
                label={t('IL.DE.InvoiceNumber')}
                value={values.ShipmentInvoiceNumber}
                onChangeText={(v: any) =>
                  setFieldValue('ShipmentInvoiceNumber', v)
                }
                requiredStar
                error={
                  touched.ShipmentInvoiceNumber && errors.ShipmentInvoiceNumber
                }
                required={
                  touched.ShipmentInvoiceNumber && errors.ShipmentInvoiceNumber
                }
                disabled={isDisabled('ShipmentInvoiceNumber')}
              />
              <Input
                datePicker
                requiredStar
                label={t('IL.DE.InvoiceDate')}
                show={showInvoiceDate}
                showDatepicker={() => {
                  setShowInvoiceDate(!showInvoiceDate);
                }}
                onChangeDateFrom={(event, date) =>
                  onChangeDate(event, date, setFieldValue)
                }
                dateValue={
                  values.InvoiceDate
                    ? (() => {
                        const m =
                          Platform.OS === 'ios'
                            ? moment(
                                String(values.InvoiceDate),
                                [
                                  'M/D/YYYY h:mm:ss A',
                                  'M/D/YYYY h:mm A',
                                  'D/M/YYYY h:mm:ss A',
                                  'D/M/YYYY h:mm A',
                                  'MM/DD/YYYY',
                                  'YYYY-MM-DD',
                                ],
                                true,
                              )
                            : moment(String(values.InvoiceDate));
                        return m.isValid() ? m.toDate() : new Date();
                      })()
                    : new Date()
                }
                value={
                  values.InvoiceDate
                    ? (Platform.OS === 'ios'
                        ? moment(
                            String(values.InvoiceDate),
                            [
                              'M/D/YYYY h:mm:ss A',
                              'M/D/YYYY h:mm A',
                              'D/M/YYYY h:mm:ss A',
                              'D/M/YYYY h:mm A',
                              'MM/DD/YYYY',
                              'YYYY-MM-DD',
                            ],
                            true,
                          )
                        : moment(String(values.InvoiceDate))
                      ).isValid()
                      ? Platform.OS === 'ios'
                        ? moment(
                            String(values.InvoiceDate),
                            [
                              'M/D/YYYY h:mm:ss A',
                              'M/D/YYYY h:mm A',
                              'D/M/YYYY h:mm:ss A',
                              'D/M/YYYY h:mm A',
                              'MM/DD/YYYY',
                              'YYYY-MM-DD',
                            ],
                            true,
                          ).format('DD/MM/YYYY')
                        : moment(String(values.InvoiceDate)).format(
                            'DD/MM/YYYY',
                          )
                      : ''
                    : ''
                }
                error={touched.InvoiceDate && errors.InvoiceDate}
                datePickerProps={{
                  maximumDate: new Date(),
                }}
                disabled={isDisabled('InvoiceDate')}
              />

              <Input
                dropdown
                label={t('IL.DE.Currency')}
                items={currency}
                value={values.Currency}
                onChange={(v: any) => {
                  setFieldValue('Currency', v);

                  const val =
                    Number(values.TotalValue) * Number(v.ExchangeRate) || 0;
                  setFieldValue(
                    'TotalVAlueInAED',
                    val.toFixed(2).toString() || '10',
                  );
                }}
                requiredStar
                error={touched.Currency && errors.Currency}
                required={touched.Currency && errors.Currency}
                disabled={isDisabled('Currency')}
              />
              <Input
                textInput
                label={t('IL.DE.TotalInvoiceAmount')}
                value={values.TotalValue}
                onChangeText={(v: any) => {
                  setFieldValue('TotalValue', v);
                  const val =
                    Number(values.Currency?.ExchangeRate) * Number(v) || 0;
                  setFieldValue('TotalVAlueInAED', val.toFixed(2).toString());
                }}
                requiredStar
                error={touched.TotalValue && errors.TotalValue}
                required={touched.TotalValue && errors.TotalValue}
                disabled={isDisabled('TotalValue')}
              />
              <Input
                textInput
                label={t('IL.DE.InvoiceValueInAED')}
                value={values.TotalVAlueInAED}
                disabled
              />
              <StepIndicator
                stepNumber={2}
                stepName={t('IL.DE.RawMaterialDetails')}
                style={{marginTop: 8 * BW()}}
              />
              <RawMaterialsDetails
                isDisabled={isDisabled('InvoiceValueInAED')}
              />
              <StepIndicator
                stepNumber={3}
                stepName={t('IL.DE.AttestationSection')}
                style={{marginBottom: 0 * BW(), marginTop: 8 * BW()}}
              />
              <Input
                dropdown
                label={t('IL.DE.AttestationMethod')}
                items={attestationLegalization}
                value={values.InvoiceAttestationLegalization}
                onChange={(v: any) => {
                  setFieldValue('InvoiceAttestationLegalization', v?.value);
                  setFieldValue('AttestationDocumentType', '');
                  setFieldValue('MOFAICApplicationNumber', '');
                }}
                requiredStar
                error={
                  touched.InvoiceAttestationLegalization &&
                  errors.InvoiceAttestationLegalization
                }
                required={
                  touched.InvoiceAttestationLegalization &&
                  errors.InvoiceAttestationLegalization
                }
                disabled={isDisabled('InvoiceAttestationLegalization')}
              />

              {values.InvoiceAttestationLegalization == '1902' && (
                <Input
                  dropdown
                  label={t('IL.DE.AttestationDocumentType')}
                  items={attestationDocumentType}
                  value={values.AttestationDocumentType}
                  onChange={(v: any) => {
                    setFieldValue('AttestationDocumentType', v?.value);

                    if (v?.value == '3514') {
                      setFieldValue('CertificateOfOriginAttestationFees', '0');
                      setFieldValue('AttestationFees', '150.0');
                      setFieldValue('TotalAttestationFees', '150.0');
                      setFieldValue('TotalFees', '300.0');
                    } else if (v?.value == '3515') {
                      setFieldValue(
                        'CertificateOfOriginAttestationFees',
                        '150.0',
                      );
                      setFieldValue('AttestationFees', '150.0');
                      setFieldValue('TotalAttestationFees', '300.0');
                      setFieldValue('TotalFees', '400.0');
                    }
                  }}
                  requiredStar
                  error={
                    touched.AttestationDocumentType &&
                    errors.AttestationDocumentType
                  }
                  required={
                    touched.AttestationDocumentType &&
                    errors.AttestationDocumentType
                  }
                  disabled={isDisabled('AttestationDocumentType')}
                />
              )}

              {values.InvoiceAttestationLegalization == '1903' && (
                <Input
                  textInput
                  label={t('IL.DE.MOFAICNumber')}
                  value={values.MOFAICApplicationNumber}
                  onChangeText={(v: any) => {
                    setFieldValue('MOFAICApplicationNumber', v),
                      setFieldValue('TotalFees', '100.0');
                  }}
                  requiredStar
                  error={
                    touched.MOFAICApplicationNumber &&
                    errors.MOFAICApplicationNumber
                  }
                  required={
                    touched.MOFAICApplicationNumber &&
                    errors.MOFAICApplicationNumber
                  }
                  disabled={isDisabled('MOFAICApplicationNumber')}
                />
              )}
              <Input
                textInput
                label={t('IL.DE.CertificateOfOriginAttestationFees')}
                value={values.CertificateOfOriginAttestationFees}
                onChangeText={(v: any) =>
                  setFieldValue('CertificateOfOriginAttestationFees', v)
                }
                disabled
              />
              <Input
                textInput
                label={t('IL.DE.AttestationFees')}
                value={values.AttestationFees}
                onChangeText={(v: any) => setFieldValue('AttestationFees', v)}
                disabled
              />
              <Input
                textInput
                label={t('IL.DE.TotalAttestationFees')}
                value={values.TotalAttestationFees}
                onChangeText={(v: any) =>
                  setFieldValue('TotalAttestationFees', v)
                }
                disabled
              />
              <StepIndicator
                stepNumber={4}
                style={{marginBottom: 0 * BW(), marginTop: 8 * BW()}}
                stepName={t('IL.DE.DEFTServiceFees')}
              />
              <Input
                textInput
                label={t('IL.DE.DEFTServiceFeeLabel')}
                value={values.ServiceFees.toString()}
                disabled
              />
              <StepIndicator
                stepNumber={5}
                style={{marginBottom: 0 * BW(), marginTop: 8 * BW()}}
                stepName={t('IL.DE.TotalFees')}
              />
              <Input
                textInput
                label={t('IL.DE.TotalFees')}
                value={values.TotalFees.toString()}
                disabled
              />
              <StepIndicator
                stepNumber={6}
                style={{marginBottom: 0 * BW(), marginTop: 8 * BW()}}
                stepName={t('IL.DE.Attachments')}
              />
              <FileUpload
                title={t('IL.DE.InvoiceAttachment')}
                value={values.Invoice}
                onChange={(v: any) => setFieldValue('Invoice', v)}
                maxFile={2}
                maxFileSize={maxFileSize}
                acceptedFiles={acceptedFiles}
                requiredStar
                errors={touched.Invoice && errors.Invoice}
                required={touched.Invoice && errors.Invoice}
                isDisabled={isDisabled('Invoice')}
              />
              {/* {values.InvoiceAttestationLegalization === '1903' && (
                <>
                  <FileUpload
                    title={t('IL.DE.AttestedInvoice')}
                    value={values.AttestedInvoice}
                    onChange={(v: any) => setFieldValue('AttestedInvoice', v)}
                    maxFile={2}
                    maxFileSize={maxFileSize}
                    acceptedFiles={acceptedFiles}
                  />
                  <FileUpload
                    title={t('IL.DE.AttestedCertificateOfOrigin')}
                    value={values.AttestedCertificateOfOrigin}
                    onChange={(v: any) =>
                      setFieldValue('AttestedCertificateOfOrigin', v)
                    }
                    maxFile={2}
                    maxFileSize={maxFileSize}
                    acceptedFiles={acceptedFiles}
                  />
                </>
              )} */}
              <FileUpload
                title={t('IL.DE.BillOfLading')}
                value={values.BillOfLading}
                onChange={(v: any) => setFieldValue('BillOfLading', v)}
                maxFile={2}
                maxFileSize={maxFileSize}
                acceptedFiles={acceptedFiles}
                requiredStar
                errors={touched.BillOfLading && errors.BillOfLading}
                required={touched.BillOfLading && errors.BillOfLading}
                isDisabled={isDisabled('BillOfLading')}
              />
              <FileUpload
                title={t('IL.DE.PackingList')}
                value={values.PackingList}
                onChange={(v: any) => setFieldValue('PackingList', v)}
                maxFile={2}
                maxFileSize={maxFileSize}
                acceptedFiles={acceptedFiles}
                requiredStar
                errors={touched.PackingList && errors.PackingList}
                required={touched.PackingList && errors.PackingList}
                isDisabled={isDisabled('PackingList')}
              />
              <FileUpload
                title={t('IL.DE.CertificateOfOrigin')}
                value={values.CertificateOfOrigin}
                onChange={(v: any) => setFieldValue('CertificateOfOrigin', v)}
                maxFile={2}
                maxFileSize={maxFileSize}
                acceptedFiles={acceptedFiles}
                requiredStar={values.AttestationDocumentType == '3515'}
                errors={
                  touched.CertificateOfOrigin && errors.CertificateOfOrigin
                }
                required={
                  touched.CertificateOfOrigin && errors.CertificateOfOrigin
                }
                isDisabled={isDisabled('CertificateOfOrigin')}
              />

              <RenderHtmlComponent
                baseStyle={{marginTop: 8 * BW()}}
                noAutoWidth
                description={t('IL.DE.DeclarationText')}
              />
              <Input
                checkbox
                title={t('IL.DE.AgreeToTerms')}
                checked={values.TermsAndConditions}
                onPress={() =>
                  setFieldValue(
                    'TermsAndConditions',
                    !values.TermsAndConditions,
                  )
                }
                requiredStar
                error={touched.TermsAndConditions && errors.TermsAndConditions}
                required={
                  touched.TermsAndConditions && errors.TermsAndConditions
                }
                disabled={isDisabled('TermsAndConditions')}
              />
              {!isDisabled('NewMaterials') && (
                <ActionButtons
                  style={{marginTop: 8 * BW()}}
                  onSaveDraft={() => {
                    onSubmit({...values, isDraft: 1});
                  }}
                  onSubmit={() => {
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
                  }}
                  disabled={!values.TermsAndConditions}
                />
              )}
            </View>
          );
        }}
      </Formik>
    </SPHeader>
  );
}
