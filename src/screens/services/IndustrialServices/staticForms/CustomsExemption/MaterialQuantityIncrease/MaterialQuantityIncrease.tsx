import React, {useEffect, useMemo, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Page from '../../../../../../component/Page';
import PageBg from '../../../../../../component/PageBg';
import Header from '../../../../../../component/Header';
import Text from '../../../../../../component/Text';
import Input from '../../../../../../component/input/Input';
import FileUpload from '../../../../../../component/attachment/ILAttachmentUpload';
import {BW} from '../../../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/store';
import StepIndicator from '../../../../Eservices/DynamicForm/StepIndicator';
import {exitConfirm} from '../../../../../WebViewScreen';
import {acceptedFiles} from '../../..';
import ProfileBrief from '../../../../../Dashboard/IL-Services/ProfileBrief';
import ActionButtons from '../../../ActionButtons';
import RawMaterialsDetails from './RawMaterialDetails';
import {transformMaterialQuantityIncreaseData} from './SubmitMaterialQuantityIncreaseDetails';
import {
  getRequestDetails,
  submitMaterialQuantityIncrease,
} from '../../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {isArabic} from '../../../../../../locales';
import moment from 'moment';
import {SPHeader} from '../../../IlServiceHeader';
import {
  setLoadingApplication,
  setLoadingModal,
} from '../../../../../../redux/reducers/General/loader';
import {Alert} from 'react-native';
import NavigationService from '../../../../../../navigation/NavigationService';
import {_openModal} from '../../../../Eservices/ServiceForm';
import {mapMaterialQuantityIncrease} from './DataMapper';
import {getTextFromHtml} from '../../../../../../component/Generalfunction';

const maxFileSize = 9 * 1024 * 1024;
interface FormValues {
  ShipmentInvoiceNumber: string;
  InvoiceDate: any;
  NewMaterials: any[];
  Invoice: any[];
  BillOfLading: any[];
  PackingList: any[];
  CertificateOfOrigin: any[];
  TermsAndConditions: boolean;
  ServiceFees: number;
  TotalFees: number;
  isDraft: number;
}

export default function MaterialQuantityIncrease(props: any): JSX.Element {
  const params = props.route.params;
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const dispatch = useAppDispatch();
  const style = getStyle(colors);
  const {userILData, userId}: any = useAppSelector(store => store.userILData);
  const [showInvoiceDate, setShowInvoiceDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [canPay, setCanPay] = useState(false);
  const [service, setService] = useState({});
  const initialValues: FormValues = {
    ShipmentInvoiceNumber: '',
    InvoiceDate: '',
    NewMaterials: [],
    Invoice: [],
    BillOfLading: [],
    CertificateOfOrigin: [],
    PackingList: [],
    TermsAndConditions: false,
    ServiceFees: 50,
    TotalFees: 0,
    isDraft: 1,
  };
  const [initials, setInitials] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    ShipmentInvoiceNumber: Yup.string().required(t('Required')),
    InvoiceDate: Yup.string().required(t('Required')),
    PackingList: Yup.array().min(1, t('Required')).required(t('Required')),
    Invoice: Yup.array().min(1, t('Required')).required(t('Required')),
    TermsAndConditions: Yup.bool().oneOf([true], t('IL.ILC.mustAgreeToTerms')),
    NewMaterials: Yup.array()
      .min(1, t('AtLeastOneItem'))
      .required(t('AtLeastOneItem')),
  });
  const onChangeDate = (
    event: any,
    date: moment.MomentInput,
    setFieldValue: (arg0: string, arg1: string) => void,
  ) => {
    Platform.OS == 'android' && setShowInvoiceDate(false);
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setSelectedDate(formattedDate);
      setFieldValue('InvoiceDate', formattedDate);
    }
  };

  const editableFields: any = [];

  const isDisabled = (fieldName: string) => {
    if (!applicationId) {
      return false;
    } else if (initials.isDraft == 1) {
      return false;
    }
    return !editableFields.includes(fieldName);
  };
  const applicationId = useMemo(() => params?.applicationId || false, [params]);
  const _getApplicationDetails = async () => {
    const data = await dispatch(
      getRequestDetails({
        ApplicationId: applicationId,
        UserId: userId,
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
      const newMappedData = mapMaterialQuantityIncrease(updatedData);

      setInitials(newMappedData);

      dispatch(setLoadingApplication(false));
    }
  };

  const onSubmit = (values: FormValues) => {
    try {
      dispatch(setLoadingModal(true));
      const body = transformMaterialQuantityIncreaseData({
        ...values,
        userId,
        licenseId: userILData?.Id,
        fromId: params.service.serviceId,
        languageId: isArabic() ? 2 : 1,
        applicationId,
      });
      dispatch(submitMaterialQuantityIncrease({body})).then(result => {
        dispatch(setLoadingModal(false));
        if (result?.payload?.networkSuccess) {
          if (result?.payload?.Data?.success) {
            NavigationService.replace('Success', {
              message: isArabic()
                ? result?.payload?.Data?.messageAr
                : result?.payload?.Data?.message,
              Id: result?.payload?.Data?.id,
              No: result?.payload?.Data?.no,
              service: params?.service,
            });
          } else {
            let message = isArabic()
              ? result.payload.Data.messageAr
              : result.payload.Data.message;

            let errorString = '';
            if (typeof result?.payload?.Data?.errors === 'string') {
              errorString = result?.payload?.Data?.errors;
            } else {
              errorString = Object.entries(
                result?.payload?.Data?.errors,
              ).reduce(
                (acc, [field, errorMessage]) =>
                  acc + `${field}: ${errorMessage}\n`,
                '',
              );
            }
            errorString = getTextFromHtml(errorString);
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
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingApplication(true));
      if (applicationId) {
        await _getApplicationDetails();
      }
      dispatch(setLoadingApplication(false));
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
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={values => onSubmit({...values, isDraft: 0})}>
        {({handleSubmit, values, setFieldValue, errors, touched}) => (
          <View>
            <ProfileBrief
              style={{marginTop: 0}}
              userILData={userILData}
              withoutAction
            />
            <StepIndicator
              stepNumber={1}
              stepName={t('IL.CE.InvoiceProof')}
              style={{marginBottom: 0, marginTop: 8 * BW()}}
            />
            <Input
              textInput
              label={t('IL.CE.InvoiceNumber')}
              value={values.ShipmentInvoiceNumber}
              onChangeText={(text: any) =>
                setFieldValue('ShipmentInvoiceNumber', text)
              }
              error={
                touched.ShipmentInvoiceNumber && errors.ShipmentInvoiceNumber
              }
              required={
                touched.ShipmentInvoiceNumber && errors.ShipmentInvoiceNumber
              }
              requiredStar
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
                      : moment(String(values.InvoiceDate)).format('DD/MM/YYYY')
                    : ''
                  : ''
              }
              error={touched.InvoiceDate && errors.InvoiceDate}
              datePickerProps={{
                maximumDate: new Date(),
              }}
              disabled={isDisabled('InvoiceDate')}
            />

            <StepIndicator
              stepNumber={2}
              stepName={t('IL.DE.RawMaterialDetails')}
              style={{marginTop: 8 * BW()}}
            />
            <RawMaterialsDetails isDisabled={isDisabled('InvoiceDate')} />

            <StepIndicator
              stepNumber={3}
              stepName={t('IL.ServiceFees')}
              style={{marginBottom: 0 * BW(), marginTop: 8 * BW()}}
            />
            <Input
              textInput
              label={t('IL.CE.ServiceFeePerHSCode')}
              value={values.ServiceFees.toString()}
              disabled
            />
            <Input
              textInput
              label={t('IL.Total')}
              value={String(values.ServiceFees * values.NewMaterials.length)}
              disabled
            />
            <StepIndicator
              stepNumber={4}
              stepName={t('IL.Attachments')}
              style={{marginBottom: 0 * BW(), marginTop: 8 * BW()}}
            />
            <FileUpload
              title={t('IL.CE.Invoice')}
              value={values.Invoice}
              onChange={(files: any) => setFieldValue('Invoice', files)}
              maxFile={2}
              acceptedFiles={acceptedFiles}
              maxFileSize={maxFileSize}
              errors={touched.Invoice && errors.Invoice}
              required={touched.Invoice && errors.Invoice}
              requiredStar
              isDisabled={isDisabled('Invoice')}
            />
            <FileUpload
              title={t('IL.CE.BillOfLading')}
              value={values.BillOfLading}
              onChange={(files: any) => setFieldValue('BillOfLading', files)}
              maxFile={2}
              acceptedFiles={acceptedFiles}
              maxFileSize={maxFileSize}
              isDisabled={isDisabled('BillOfLading')}
            />
            <FileUpload
              title={t('IL.CE.PackingList')}
              required={touched.PackingList && errors.PackingList}
              requiredStar
              value={values.PackingList}
              onChange={(files: any) => {
                setFieldValue('PackingList', files);
              }}
              maxFile={2}
              acceptedFiles={acceptedFiles}
              maxFileSize={maxFileSize}
              errors={touched.PackingList && errors.PackingList}
              isDisabled={isDisabled('PackingList')}
            />
            <FileUpload
              title={t('IL.CE.CountryCer')}
              value={values.CertificateOfOrigin}
              onChange={(files: any) =>
                setFieldValue('CertificateOfOrigin', files)
              }
              maxFile={2}
              acceptedFiles={acceptedFiles}
              maxFileSize={maxFileSize}
              isDisabled={isDisabled('CertificateOfOrigin')}
            />

            <View style={{marginTop: 8 * BW()}}>
              <Text h4>{t('IL.CE.DeclarationText')}</Text>
              <Text h4 style={{marginTop: 8 * BW()}}>
                {t('IL.CE.InspectionNote')}
              </Text>
            </View>
            <Input
              checkbox
              title={t('IL.ILC.AgreeToTerms')}
              requiredStar
              checked={values.TermsAndConditions}
              onPress={() =>
                setFieldValue('TermsAndConditions', !values.TermsAndConditions)
              }
              error={touched.TermsAndConditions && errors.TermsAndConditions}
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
                  if (Object.entries(errors).length > 0) {
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
                disabled={!values.TermsAndConditions}
              />
            )}
          </View>
        )}
      </Formik>
    </SPHeader>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
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
