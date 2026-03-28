import React, {useEffect, useMemo, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Page from '../../../../../component/Page';
import PageBg from '../../../../../component/PageBg';
import Header from '../../../../../component/Header';
import Text from '../../../../../component/Text';
import Input from '../../../../../component/input/Input';
import FileUpload from '../../../../../component/attachment/ILAttachmentUpload';
import {BW} from '../../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import ProfileBrief from '../../../../Dashboard/IL-Services/ProfileBrief';
import {acceptedFiles} from '../..';
import {exitConfirm} from '../../../../WebViewScreen';
import NoteBox from './NoteBox';
import {
  getLicenseData,
  getRequestDetails,
  submitValueAdded,
} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {transformValueAddedData} from './SubmitValueAdded';
import ActionButtons from '../../ActionButtons';
import {SPHeader} from '../../IlServiceHeader';
import {isArabic} from '../../../../../locales';
import {
  setLoadingApplication,
  setLoadingModal,
} from '../../../../../redux/reducers/General/loader';
import NavigationService from '../../../../../navigation/NavigationService';
import {_openModal} from '../../../Eservices/ServiceForm';
import {mapValueAddedCertificate} from './DataMapper';
import {getFactoryDetails} from '../../../../../redux/reducers/I-Services/thunk/profile';

const maxFileSize = 9 * 1024 * 1024;

export default function ValueAddedTaxRequest(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const dispatch = useAppDispatch();
  const style = getStyle(colors);
  const {userILData} = useAppSelector(state => state.userILData);
  const userId = useAppSelector(state => state.userILData.userId);
  const [canPay, setCanPay] = useState(false);
  const [service, setService] = useState({});
  const params = props.route.params;

  let initialValues = {
    AnnualSales: '',
    FinishedGoodsOpeningStock: '',
    FinishedGoodsClosingStock: '',
    NetProfit: '',
    WagesAndSalaries: '',
    ValueOfBuildings: '',
    DepreciationOfBuilding: '',
    ValueOfMachinery: '',
    DepreciationOfMachinery: '',
    BuildingRent: '',
    RentOfWarehousesForTheFactory: '',
    RentOfLaborAccommodation: '',
    ValueOfLongtermLoans: '',
    InterestPaidOfLongterms: '',
    AdministrationAndGeneralExpenses: '',
    PatentCost: '',
    LocalPrimaryRawMaterials: '0',
    LocalAxillaryRawMaterials: '0',
    LocalSemiFinishedRawMaterials: '0',
    LocalPackagingMaterials: '0',
    LocalUtilityFuelWaterElectricity: '0',
    TotalProductionCostOfLocalGulfOrigin: '0',
    ForeignPrimaryRawMaterials: '0',
    ForeignAxillaryRawMaterials: '0',
    ForeignSemiFinishedRawMaterials: '0',
    ForeignPackagingMaterials: '0',
    ForeignUtilityFuelWaterElectricity: '0',
    TotalProductionCostOfForeignOrigin: '0',
    TotalMaterialCost: '0',
    TotalProductionCost: '0',
    ValueAddedPercentage: '',
    RawMaterialsInvoices: [],
    BudgetDocumentCopies: [],
    OtherAttachments: [],
    ApproveTheData: false,
    isDraft: 0,
    TermsAndConditions: false,
  };

  const [initials, setInitials] = useState(initialValues);
  const normalize = (str: string) => str?.trim().toLowerCase();
  const categoryNameToFieldKey: Record<string, string> = {
    'primary raw materials': 'PrimaryRawMaterials',
    'axillary raw materials': 'AxillaryRawMaterials',
    'semi finished raw materials': 'SemiFinishedRawMaterials',
    'packaging materials': 'PackagingMaterials',
    'utility/fuel/water/electricity': 'UtilityFuelWaterElectricity',

    // Arabic
    'مواد خام أساسية': 'PrimaryRawMaterials',
    'مواد خام مساعدة': 'AxillaryRawMaterials',
    'مواد خام نصف مصنعة': 'SemiFinishedRawMaterials',
    'مواد تعبئة وتغليف': 'PackagingMaterials',
    'وقود/ماء/كهرباء': 'UtilityFuelWaterElectricity',
  };

  const _getFactoryDetails = () => {
    dispatch(setLoadingModal(true));
    dispatch(getLicenseData({licenseId: userILData?.Id}))
      .then(res => {
        if (
          res.meta.requestStatus === 'fulfilled' &&
          res.payload?.networkSuccess
        ) {
          let initRequestTemp = res.payload?.Data?.data;

          // base object
          let newInitials: any = {
            ...initialValues,
            AnnualSales: String(initRequestTemp?.AnnualSales || ''),
            FinishedGoodsOpeningStock: String(
              initRequestTemp?.FinishedGoodsOpeningStock || '',
            ),
            FinishedGoodsClosingStock: String(
              initRequestTemp?.FinishedGoodsClosingStock || '',
            ),
            NetProfit: String(initRequestTemp?.NetProfit || ''),
            WagesAndSalaries: String(initRequestTemp?.WagesandSalaries || ''),
            ValueOfBuildings: String(initRequestTemp?.ValueofBuildings || ''),
            DepreciationOfBuilding: String(
              initRequestTemp?.DepreciationofBuilding || '',
            ),
            ValueOfMachinery: String(initRequestTemp?.ValueofMachinery || ''),
            DepreciationOfMachinery: String(
              initRequestTemp?.DepreciationofMachinery || '',
            ),
            BuildingRent: String(initRequestTemp?.BuildingRent || ''),
            RentOfWarehousesForTheFactory: String(
              initRequestTemp?.RentOfWarehousesForTheFactory || '',
            ),
            RentOfLaborAccommodation: String(
              initRequestTemp?.RentOfLaborAccommodation || '',
            ),
            ValueOfLongtermLoans: String(
              initRequestTemp?.ValueofLongtermLoans || '',
            ),
            InterestPaidOfLongterms: String(
              initRequestTemp?.InterestPaidofLongterms || '',
            ),
            AdministrationAndGeneralExpenses: String(
              initRequestTemp?.AdministrationandGeneralExpenses || '',
            ),
            PatentCost: String(initRequestTemp?.PatentCost || ''),
            LocalPrimaryRawMaterials: '0',
            LocalAxillaryRawMaterials: '0',
            LocalSemiFinishedRawMaterials: '0',
            LocalPackagingMaterials: '0',
            LocalUtilityFuelWaterElectricity: '0',
            TotalProductionCostOfLocalGulfOrigin: '0',
            ForeignPrimaryRawMaterials: '0',
            ForeignAxillaryRawMaterials: '0',
            ForeignSemiFinishedRawMaterials: '0',
            ForeignPackagingMaterials: '0',
            ForeignUtilityFuelWaterElectricity: '0',
            TotalProductionCostOfForeignOrigin: '0', // will calculate below
            TotalMaterialCost: '0',
            TotalProductionCost: '0',
            ValueAddedPercentage: String(
              initRequestTemp?.ValueAddedPercentage || '',
            ),
            RawMaterialsInvoices: [],
            BudgetDocumentCopies: [],
            OtherAttachments: [],
            ApproveTheData: false,
            isDraft: 0,
            TermsAndConditions: false,
          };

          let foreignTotal = 0;
          let localTotal = 0;
          initRequestTemp?.RawMaterials?.forEach((mat: any) => {
            const rawName = mat?.Category?.Name?.trim().toLowerCase();
            const baseKey = categoryNameToFieldKey[rawName];
            if (baseKey && mat?.Value !== undefined) {
              const prefix = mat?.CountryOfOrigin?.Foreign
                ? 'Foreign'
                : 'Local';
              const finalKey = prefix + baseKey;

              newInitials[finalKey] = String(mat.Value);
              if (prefix === 'Foreign') {
                foreignTotal += Number(mat.Value) || 0;
              } else {
                localTotal += Number(mat.Value) || 0;
              }
            }
          });

          newInitials.TotalProductionCostOfForeignOrigin = String(foreignTotal);
          newInitials.TotalProductionCostOfLocalGulfOrigin = String(localTotal);
          setInitials(newInitials);
        }
      })
      .finally(() => {
        dispatch(setLoadingModal(false));
      });
  };
  useEffect(() => {
    if (!applicationId) {
      _getFactoryDetails();
    }
  }, []);

  const validationSchema: any = Yup.object().shape({
    AnnualSales: Yup.string().required(t('Required')),
    FinishedGoodsOpeningStock: Yup.string().required(t('Required')),
    FinishedGoodsClosingStock: Yup.string().required(t('Required')),
    NetProfit: Yup.string().required(t('Required')),
    WagesAndSalaries: Yup.string().required(t('Required')),
    ValueOfBuildings: Yup.string().required(t('Required')),
    DepreciationOfBuilding: Yup.string().required(t('Required')),
    ValueOfMachinery: Yup.string().required(t('Required')),
    DepreciationOfMachinery: Yup.string().required(t('Required')),
    ValueOfLongtermLoans: Yup.string().required(t('Required')),
    AdministrationAndGeneralExpenses: Yup.string().required(t('Required')),
    PatentCost: Yup.string().required(t('Required')),
    TermsAndConditions: Yup.bool().oneOf([true], t('IL.ILC.mustAgreeToTerms')),
    ApproveTheData: Yup.bool().oneOf([true], t('Required')),
    RawMaterialsInvoices: Yup.array()
      .min(1, t('Required'))
      .required(t('Required')),
    BudgetDocumentCopies: Yup.array()
      .min(1, t('Required'))
      .required(t('Required')),
  });

  function validateAnnualSales(values: any): boolean {
    const annualSales = Number(values.AnnualSales);
    const totalProduction = Number(values.TotalProductionCost);
    const netProfit = Number(values.NetProfit);
    const openingStock = Number(values.FinishedGoodsOpeningStock);
    const closingStock = Number(values.FinishedGoodsClosingStock);

    const expected = totalProduction + netProfit + openingStock - closingStock;

    return annualSales === expected;
  }

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
      const newMappedData = mapValueAddedCertificate(updatedData);

      setInitials(newMappedData);

      dispatch(setLoadingApplication(false));
    }
  };

  const onSubmit = (values: any) => {
    const condition = validateAnnualSales(values);
    if (condition || values.isDraft == 1) {
      const body = transformValueAddedData({
        ...values,
        userId: userId,
        licenseId: userILData?.Id,
        formId: params?.service?.serviceId,
        applicationId,
      });
      let language = isArabic() ? 2 : 1;
      dispatch(setLoadingModal(true));
      try {
        dispatch(
          submitValueAdded({body: {...body, languageId: language}}),
        ).then(result => {
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
              let message = isArabic()
                ? result.payload.Data.messageAr
                : result.payload.Data.message;
              Alert.alert(message, errorString);
            }
          } else {
            Alert.alert('', t('IL.NetworkError'));
          }
        });
      } catch (error) {
      } finally {
      }
    } else {
      Alert.alert(t('ValidationError'), t('IL.ValueAddedValidate'), [
        {text: t('OK')},
      ]);
    }
  };
  const totalFields = [
    'WagesAndSalaries',
    'DepreciationOfBuilding',
    'DepreciationOfMachinery',
    'BuildingRent',
    'RentOfWarehousesForTheFactory',
    'RentOfLaborAccommodation',
    'InterestPaidOfLongterms',
    'AdministrationAndGeneralExpenses',
    'PatentCost',
    'TotalMaterialCost',
  ];
  const totalCostOfMaterials = [
    'TotalProductionCostOfForeignOrigin',
    'TotalProductionCostOfLocalGulfOrigin',
  ];
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
        {({handleSubmit, values, setFieldValue, errors, touched}: any) => {
          useEffect(() => {
            if (!applicationId) {
              const numbers = totalFields.map(key => Number(values[key]) || 0);
              const total = numbers.reduce((a, b) => a + b, 0);
              const totalProduction = Number(total);
              const materials = totalCostOfMaterials.map(
                key => Number(values[key]) || 0,
              );
              const totalMaterial = materials.reduce((a, b) => a + b, 0);

              setFieldValue('TotalMaterialCost', String(totalMaterial));
              setFieldValue('TotalProductionCost', String(total));

              if (totalProduction > 0) {
                const percentage =
                  ((totalProduction - totalMaterial) / totalProduction) * 100;
                setFieldValue('ValueAddedPercentage', percentage.toFixed(2));
              } else {
                setFieldValue('ValueAddedPercentage', '0');
              }
            }
          }, [values]);
          return (
            <View>
              <ProfileBrief userILData={userILData} withoutAction />
              <NoteBox />
              <StepIndicator
                stepNumber={1}
                stepName={t('IL.VAT.section_1')}
                style={{marginBottom: 0, marginTop: 8 * BW()}}
              />
              {[
                'AnnualSales',
                'FinishedGoodsOpeningStock',
                'FinishedGoodsClosingStock',
                'NetProfit',
                'WagesAndSalaries',
                'ValueOfBuildings',
                'DepreciationOfBuilding',
                'ValueOfMachinery',
                'DepreciationOfMachinery',
                'BuildingRent',
                'RentOfWarehousesForTheFactory',
                'RentOfLaborAccommodation',
                'ValueOfLongtermLoans',
                'InterestPaidOfLongterms',
                'AdministrationAndGeneralExpenses',
                'PatentCost',
              ].map(key => (
                <Input
                  key={key}
                  textInput
                  label={t(`IL.VAT.${key}`)}
                  value={values?.[key]}
                  onChangeText={(text: any) => setFieldValue(key, text)}
                  requiredStar={!!validationSchema.fields[key]}
                  required={touched?.[key] && errors?.[key]}
                  error={touched?.[key] && errors?.[key]}
                  disabled={isDisabled(key)}
                  keyboardType="numeric"
                />
              ))}

              <StepIndicator
                stepNumber={2}
                stepName={t('IL.VAT.section_2')}
                style={{marginBottom: 0, marginTop: 8 * BW()}}
              />
              {[
                'LocalPrimaryRawMaterials',
                'LocalAxillaryRawMaterials',
                'LocalSemiFinishedRawMaterials',
                'LocalPackagingMaterials',
                'LocalUtilityFuelWaterElectricity',
                'TotalProductionCostOfLocalGulfOrigin',
              ].map(key => (
                <Input
                  key={key}
                  textInput
                  label={t(`IL.VAT.${key}`)}
                  value={values?.[key]}
                  onChangeText={(text: any) => setFieldValue(key, text)}
                  disabled
                />
              ))}

              <StepIndicator
                stepNumber={3}
                stepName={t('IL.VAT.section_3')}
                style={{marginBottom: 0, marginTop: 8 * BW()}}
              />
              {[
                'ForeignPrimaryRawMaterials',
                'ForeignAxillaryRawMaterials',
                'ForeignSemiFinishedRawMaterials',
                'ForeignPackagingMaterials',
                'ForeignUtilityFuelWaterElectricity',
                'TotalProductionCostOfForeignOrigin',
                'TotalMaterialCost',
                'TotalProductionCost',
              ].map(key => (
                <Input
                  key={key}
                  textInput
                  label={t(`IL.VAT.${key}`)}
                  value={values?.[key]}
                  onChangeText={(text: any) => setFieldValue(key, text)}
                  disabled
                  h3={['TotalMaterialCost', 'TotalProductionCost'].includes(
                    key,
                  )}
                  bold={['TotalMaterialCost', 'TotalProductionCost'].includes(
                    key,
                  )}
                />
              ))}

              <StepIndicator
                stepNumber={4}
                stepName={t('IL.VAT.section_4')}
                style={{marginBottom: 0, marginTop: 8 * BW()}}
              />
              <Input
                textInput
                label={t('IL.VAT.ValueAddedPercentage')}
                value={values.ValueAddedPercentage}
                onChangeText={(text: any) =>
                  setFieldValue('ValueAddedPercentage', text)
                }
                disabled
              />

              <StepIndicator
                stepNumber={5}
                stepName={t('IL.VAT.section_5')}
                style={{marginBottom: 0, marginTop: 8 * BW()}}
              />
              <FileUpload
                requiredStar
                title={t('IL.VAT.RawMaterialsInvoices')}
                value={values.RawMaterialsInvoices}
                onChange={files => setFieldValue('RawMaterialsInvoices', files)}
                maxFile={5}
                maxFileSize={maxFileSize}
                acceptedFiles={acceptedFiles}
                required={
                  touched.RawMaterialsInvoices && errors.RawMaterialsInvoices
                }
                errors={
                  touched.RawMaterialsInvoices && errors.RawMaterialsInvoices
                }
                isDisabled={isDisabled('RawMaterialsInvoices')}
              />
              <FileUpload
                title={t('IL.VAT.BudgetDocumentCopies')}
                value={values.BudgetDocumentCopies}
                onChange={files => setFieldValue('BudgetDocumentCopies', files)}
                maxFile={5}
                maxFileSize={maxFileSize}
                acceptedFiles={acceptedFiles}
                requiredStar
                required={
                  touched.BudgetDocumentCopies && errors.BudgetDocumentCopies
                }
                errors={
                  touched.BudgetDocumentCopies && errors.BudgetDocumentCopies
                }
                isDisabled={isDisabled('BudgetDocumentCopies')}
              />
              <FileUpload
                title={t('IL.VAT.OtherAttachments')}
                value={values.OtherAttachments}
                onChange={files => setFieldValue('OtherAttachments', files)}
                maxFile={5}
                maxFileSize={maxFileSize}
                acceptedFiles={acceptedFiles}
                isDisabled={isDisabled('OtherAttachments')}
              />
              <Input
                checkbox
                title={t('IL.VAT.ApproveTheData')}
                checked={values.ApproveTheData}
                onPress={() =>
                  setFieldValue('ApproveTheData', !values.ApproveTheData)
                }
                requiredStar
                required={touched.ApproveTheData && errors.ApproveTheData}
                error={touched.ApproveTheData && errors.ApproveTheData}
                disabled={isDisabled('ApproveTheData')}
              />

              <Text h4 style={{marginTop: 8 * BW()}}>
                {t('IL.VAT.VATDeclarationText')}
              </Text>

              <Input
                checkbox
                title={t('IL.ILC.AgreeToTerms')}
                checked={values.TermsAndConditions}
                onPress={() =>
                  setFieldValue(
                    'TermsAndConditions',
                    !values.TermsAndConditions,
                  )
                }
                requiredStar
                required={
                  touched.TermsAndConditions && errors.TermsAndConditions
                }
                error={touched.TermsAndConditions && errors.TermsAndConditions}
                disabled={isDisabled('TermsAndConditions')}
              />

              {!isDisabled('NetProfit') && (
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
          );
        }}
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
