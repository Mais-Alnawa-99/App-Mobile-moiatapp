import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator, Modal} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW, BH} from '../../../../../style/theme';
import FactoryForm from './FactoryDetails';
import FactoryManagerForm from './FactoryManagerForm';
import LocalLicensingAuthority from './LocalLicensingAuthority';
import Utilities from './Utilities';
import FinancialStatement from './FinancialStatement';
import OwnerDetails from './OwnerDetails';
import EmployeesDetails from './EmployeesDetails';
import TermsAndConditions from './TermsAndConditions';
import TotalCostofLocalGulfOriginMaterials from './TotalCostofLocalGulfOriginMaterials';
import TotalCostofForeignOriginMaterials from './TotalCostofForeignOriginMaterials';
import {Formik} from 'formik';
import {initialValues, FormSchema} from './FormRalated';

import Products from './Products';
import RawMaterialsDetails from './RawMaterialsDetails';
import MachineryandEquipment from './MachineryandEquipment';
import ActivitiesDetails from './ActivitiesDetails';
import reactotron from 'reactotron-react-native';
import {useRoute} from '@react-navigation/native';

import {
  getLicenseData,
  GetLookupData,
  SubmitIndustrialLicense,
  SubmitInitialLicenseModification,
  SubmitIndustrialLicenseRenewal,
  getRequestDetails,
} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {isArabic} from '../../../../../locales';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {setCountries} from '../../../../../redux/reducers/I-Services/slice/Country';
import {setLegalEntities} from '../../../../../redux/reducers/I-Services/slice/LegalEntities';
import {setCities} from '../../../../../redux/reducers/I-Services/slice/City';
import {setAreas} from '../../../../../redux/reducers/I-Services/slice/Area';
import {setLocalAuthorities} from '../../../../../redux/reducers/I-Services/slice/LocalAuthorities';
import {setEmirates} from '../../../../../redux/reducers/I-Services/slice/Emirates';
import {mapUpdateData, transformFactoryData} from './SubmitLicenseData';
import ActionButtons from '../../ActionButtons';
import {setCategories} from '../../../../../redux/reducers/I-Services/slice/Category';
import Text from '../../../../../component/Text';
import NavigationService from '../../../../../navigation/NavigationService';
import {SPHeader} from '../../IlServiceHeader';
import {
  setLoadingApplication,
  setLoadingModal,
} from '../../../../../redux/reducers/General/loader';
import {DisabledProvider} from './DisabledContext';

const IssueIndustrialProductionLicense = () => {
  const dispatch = useAppDispatch();
  const params = useRoute().params;
  const serviceId = useMemo(
    () => params?.service?.serviceId || false,

    [params],
  );

  const [check, setCheck] = useState(false);

  const {t} = useTranslation();
  const validationSchema = useMemo(() => FormSchema(t), [t]);
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [isLoading, setIsLoading] = useState(false);
  const [initials, setInitials] = useState(initialValues);
  const [canPay, setCanPay] = useState(false);
  const userILData = useAppSelector(state => state.userILData);
  const [service, setService] = useState({});
  const _getUpdateLicenseData = async categoriesFromApi => {
    dispatch(setLoadingApplication(true));
    const data = await dispatch(
      getLicenseData({licenseId: userILData?.userILData?.Id}),
    ).then(res => {
      if (
        res.payload?.networkSuccess &&
        res.payload.Data &&
        res.payload.Data.data
      ) {
        const result = res.payload.Data.data;
        return result;
      } else {
        return null;
      }
    });
    if (data) {
      _getEmirates(data);
    }
    const updatedData = {
      ...data,
      categoriesFromApi,
      licenseID: userILData?.userILData?.Id,

      serviceId,
      isArabic: isArabic(),
      LocalIndustrialLicenseAttachment:
        serviceId != 19 ? data.LocalIndustrialLicenseAttachment : [],
    };
    const newMappedData = mapUpdateData(updatedData);

    setInitials(newMappedData);
    dispatch(setLoadingApplication(false));
  };

  const _getCountries = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'Countries'})).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.Countries.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        dispatch(setCountries(result));
      } else {
        dispatch(setCountries([]));
      }
    });
  };

  const _getEmirates = data => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'Emirates'})).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.Emirates.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        dispatch(setEmirates(result));
        if ((serviceId != '10' && data) || applicationId) {
          const emirate = result.filter(e => {
            return e.Id === data.Emirate?.Id;
          });

          if (emirate.length != 0) {
            const cities = emirate[0]?.City?.map(c => {
              return {...c, label: c.Name, value: c.Id};
            });
            dispatch(setCities(cities));
          }
        }
      } else {
        dispatch(setEmirates([]));
      }
    });
  };

  const _getLegalEntities = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'LegalEntities'})).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.LegalEntities.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        dispatch(setLegalEntities(result));
      } else {
        dispatch(setLegalEntities([]));
      }
    });
  };

  const _getLocalAuthorities = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'LocalAuthorities'})).then(
      res => {
        if (res.payload?.networkSuccess) {
          const result = res.payload.result.LocalAuthorities.map(
            (item: any, index: number): any => ({
              ...item,
              label: item.Name,
              value: item.Id,
            }),
          );
          dispatch(setLocalAuthorities(result));
        } else {
          dispatch(setLocalAuthorities([]));
        }
      },
    );
  };

  const _getCities = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'City'})).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.City.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        dispatch(setCities(result));
      } else {
        setCities([]);
      }
    });
  };

  const _getAreas = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'Area'})).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.Area.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        dispatch(setAreas(result));
      } else {
        setAreas([]);
      }
    });
  };

  const _getCategories = async () => {
    dispatch(setLoadingApplication(true));
    let language = isArabic() ? 2 : 1;
    const res = await dispatch(
      GetLookupData({language, Category: 'RawMaterialCategories'}),
    );
    if (res.payload?.networkSuccess) {
      const rm = res.payload.result.RawMaterialCategories.filter(
        (item: any) => item.Id != '1747',
      );
      const result = rm.map((item: any): any => ({
        label: item.Name,
        value: item.Id,
      }));

      dispatch(setCategories(result));
      const costs = result?.map(item => ({...item, sum: 0.0}));
      const costsList = {
        LocalMaterialsCost: [
          ...costs,
          {
            label: t('totalCostofLocalGulfOriginMaterials'),
            value: 'final',
            sum: 0.0,
          },
        ],
        ForeignMaterialsCost: [
          ...costs,
          {
            label: t('totalCostofForeignOriginMaterials'),
            value: 'final',
            sum: 0.0,
          },
        ],
      };

      return costsList; // <--- return for immediate use
    } else {
      dispatch(setCategories([]));
      return [];
    }
  };

  const applicationId = useMemo(() => params?.applicationId || false, [params]);
  const _getApplicationDetails = async (categoriesFromApi: any) => {
    dispatch(setLoadingApplication(true));
    const data = await dispatch(
      getRequestDetails({
        ApplicationId: applicationId, //'AD1A9DA7-08AD-44A6-841A-67EEE43E16BC', //
        UserId: userILData?.userId, //'4DEF6CD6-5ABF-4232-BB3A-C886617858EA', //
      }),
    );
    if (data?.payload?.Data?.success) {
      const updatedData = {
        ...data?.payload?.Data?.AppData,
        categoriesFromApi,
        serviceId,
        isArabic: isArabic(),
        licenseID: userILData?.userILData?.Id,
        userId: userILData?.userId,
      };
      const result = data?.payload?.Data?.AppData;
      _getEmirates(result);
      setCanPay(data?.payload.Data?.Application?.ShouldShowPaymentButton);
      setService({
        ReferenceNo: data?.payload.Data?.Application?.Refeno,
        DateCreated: data?.payload?.Data?.AppData?.DateCreated,
        LockedUser: data?.payload?.Data?.AppData?.LockedByName,
      });
      const newMappedData = mapUpdateData(updatedData);
      setInitials(newMappedData);
      dispatch(setLoadingApplication(false));
    } else dispatch(setLoadingApplication(false));
  };

  useEffect(() => {
    const fetchData = async () => {
      _getCountries();
      _getAreas();
      _getLegalEntities();
      _getLocalAuthorities();
      const cats = await _getCategories();
      if (applicationId) await _getApplicationDetails(cats);
      else if (serviceId != '10') {
        await _getUpdateLicenseData(cats);
      } else {
        setInitials({
          ...initialValues,
          LocalMaterialsCost: cats.LocalMaterialsCost,
          ForeignMaterialsCost: cats.ForeignMaterialsCost,
        });
        dispatch(setLoadingApplication(false));
        _getEmirates(null);
        _getCities();
      }
    };

    fetchData();
  }, []);
  function validateAnnualSales(values: any): boolean {
    const annualSales = Number(values.annualSales);
    const totalProduction = Number(values.totalProductionCost);
    const netProfit = Number(values.netProfit);
    const openingStock = Number(values.finishedGoodsOpeningStock);
    const closingStock = Number(values.finishedGoodsClosingStock);

    const expected = totalProduction + netProfit + openingStock - closingStock;
    return annualSales === expected;
  }
  const submitForm = async values => {
    try {
      //validateAnnualSales(values);
      let newBody = {};
      if (applicationId)
        newBody = {
          ...values,
          FormId: serviceId,
          UserId: userILData?.userId,
          Id: applicationId,
        };
      else newBody = {...values, FormId: serviceId, UserId: userILData?.userId};

      const body = transformFactoryData(newBody);

      let result = null;
      dispatch(setLoadingModal(true));
      switch (serviceId.toString()) {
        case '21':
          result = await dispatch(
            SubmitInitialLicenseModification({
              body: {...body, languageId: isArabic() ? 2 : 1},
            }),
          );
          break;

        case '10':
          result = await dispatch(SubmitIndustrialLicense({body}));
          break;

        case '19': {
          result = await dispatch(
            SubmitIndustrialLicenseRenewal({
              body: {
                ...body,
                ServiceActionType: 2,
                languageId: isArabic() ? 2 : 1,
              },
            }),
          );
          break;
        }

        default:
          throw new Error(`Unhandled serviceId: ${serviceId}`);
      }
      if (result?.payload) dispatch(setLoadingModal(false));

      if (
        result?.payload?.networkSuccess &&
        (result?.payload?.Data || result?.payload?.result)?.success
      ) {
        NavigationService.replace('Success', {
          message: isArabic()
            ? (result?.payload?.Data || result?.payload?.result)?.messageAr
            : (result?.payload?.Data || result?.payload?.result)?.message,
          Id: (result?.payload?.Data || result?.payload?.result)?.id,
          No: (result?.payload?.Data || result?.payload?.result).no,
          service: params?.service,
        });
      } else {
        if (!(result?.payload?.Data || result?.payload?.result)?.success) {
          let errorString = '';
          if (
            typeof (result?.payload?.Data || result?.payload?.result)?.errors ==
            'string'
          )
            errorString = (result?.payload?.Data || result?.payload?.result)
              ?.errors;
          else {
            errorString = Object.entries(
              (result?.payload?.Data || result?.payload?.result)?.errors,
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
        } else Alert.alert('', t('IL.NetworkError'));
      }
    } catch (error) {
      Alert.alert('', t('IL.InternalServerError'));
    }
  };

  return (
    <SPHeader
      service={{...service, ...params?.service}}
      exitForm={initials.isDraft == 0 && applicationId}
      canPay={canPay}>
      <Formik
        initialValues={initials}
        // enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async values => {
          try {
            await submitForm({...values, isDraft: 0});
          } catch (error) {
          } finally {
          }
        }}>
        {({values, handleSubmit, validateForm, setTouched}) => {
          const isDisabled = (fieldName: string) => {
            if (!applicationId) return false;
            else if (values.isDraft == 1) return false;
            else return true;
          };
          return (
            <DisabledProvider value={{isDisabled}}>
              <View style={{gap: 8 * BW()}}>
                <LocalLicensingAuthority
                  update={
                    (serviceId != '10' && !applicationId) ||
                    (applicationId && values.isDraft == 1)
                      ? 'Y'
                      : 'N'
                  }
                />
                <FactoryForm />
                <FactoryManagerForm />
                <ActivitiesDetails />
                <OwnerDetails />
                <EmployeesDetails />
                <Products />
                <MachineryandEquipment />
                <Utilities />
                <RawMaterialsDetails />
                <TotalCostofLocalGulfOriginMaterials />
                <FinancialStatement />
                <TotalCostofForeignOriginMaterials />
                <TermsAndConditions importantNote={true} setCheck={setCheck} />
                {!isDisabled('RawMaterials') && (
                  <ActionButtons
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
                          acc +
                          `${t(`IL.FormLabels.${field}`)}: ${errorMessage}\n`,
                        '',
                      );
                      if (errorString !== '') {
                        Alert.alert('', errorString);
                      } else {
                        handleSubmit();
                      }
                    }}
                    onSaveDraft={() => {
                      const data = {...values, isDraft: 1};

                      if (values.TradeNameEn == '' || values.TradeNameAr == '')
                        Alert.alert(
                          '',
                          t('IL.PleaseEnter') +
                            ' ' +
                            t('TradeNameEnLabel') +
                            ', ' +
                            t('TradeNameArLabel'),
                        );
                      else submitForm(data);
                    }}
                    disabled={!check}
                  />
                )}
              </View>
            </DisabledProvider>
          );
        }}
      </Formik>

      {isLoading && (
        <Modal visible={true} animationType="none" transparent={true}>
          <View style={styles.modalView}>
            <View style={styles.modalContainer}>
              <ActivityIndicator size={44} color={colors.mainWhite} />
              <Text
                h2
                medium
                style={{
                  color: colors.mainWhite,
                  marginTop: 20 * BW(),
                }}>
                {t('IL.DataFetched')}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </SPHeader>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      backgroundColor: colors.black + '70',
      width: '100%',
      height: '100%',
    },
    modalView: {
      borderRadius: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '100%',
    },
  });

export default IssueIndustrialProductionLicense;
