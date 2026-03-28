import React, {useEffect, useMemo, useState} from 'react';
import * as Yup from 'yup';
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useRoute, useTheme} from '@react-navigation/native';
import {BW} from '../../../../../style/theme';
import Header from '../../../../../component/Header';
import Page from '../../../../../component/Page';

import {Formik} from 'formik';
import reactotron from 'reactotron-react-native';
import {
  initialValues,
  FormSchema,
} from '../IssueIndustrialProductionLicense/FormRalated';
import TermsAndConditions from '../IssueIndustrialProductionLicense/TermsAndConditions';
import Button from '../../../../../component/Button';
import DisplayLocalLicensingAuthority from './DisplayLocalLicensingAuthority';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {
  getLicenseData,
  getLicenseDetails,
  GetLookupData,
  getRequestDetails,
  SubmitIndustrialLicenseRenewal,
} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {
  mapUpdateData,
  transformFactoryData,
} from '../IssueIndustrialProductionLicense/SubmitLicenseData';
import {isArabic} from '../../../../../locales';
import ActionButtons from '../../ActionButtons';
import Text from '../../../../../component/Text';
import PageBg from '../../../../../component/PageBg';
import {exitConfirm} from '../../../../WebViewScreen';
import {DisplayFactoryManagerDetails} from './DisplayFactoryManagerDetails';
import ActivitiesDetails from '../IssueIndustrialProductionLicense/ActivitiesDetails';
import OwnerDetails from '../IssueIndustrialProductionLicense/OwnerDetails';
import EmployeesDetails from '../IssueIndustrialProductionLicense/EmployeesDetails';
import {SPHeader} from '../../IlServiceHeader';
import {
  setLoadingApplication,
  setLoadingModal,
} from '../../../../../redux/reducers/General/loader';
import NavigationService from '../../../../../navigation/NavigationService';
import {setCountries} from '../../../../../redux/reducers/I-Services/slice/Country';
import {DisabledProvider} from '../IssueIndustrialProductionLicense/DisabledContext';
const RenewalIndustrialProductionLicense = ({}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [initials, setInitials] = useState(initialValues);
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState(false);
  const params = useRoute().params;
  const userILData = useAppSelector(state => state.userILData);
  const applicationId = useMemo(() => params?.applicationId || false, [params]);
  const [canPay, setCanPay] = useState(false);
  const [service, setService] = useState({});
  const validationSchema = Yup.object().shape({
    CopyLocalIndustrialLicense: Yup.array()
      .min(1, t('AtLeastOneAttachment'))
      .of(
        Yup.object({
          base64: Yup.string().required(t('Base64Required')),
        }),
      )
      .required(t('AttachmentsRequired')),
  });

  const _getApplicationDetails = async () => {
    const data = await dispatch(
      getRequestDetails({
        ApplicationId: applicationId, // 'AD1A9DA7-08AD-44A6-841A-67EEE43E16BC', //applicationId,
        UserId: userILData?.userId, // '4DEF6CD6-5ABF-4232-BB3A-C886617858EA', //userILData?.userId,
      }),
    );

    if (data?.payload?.Data?.success) {
      const updatedData = {
        ...data?.payload?.Data?.AppData,
        serviceId: 19,
        isArabic: isArabic(),
        licenseID: userILData?.userILData?.Id,
        userId: userILData?.userId,
      };
      setCheck(true);
      setCanPay(data?.payload.Data?.Application?.ShouldShowPaymentButton);
      setService({
        ReferenceNo: data?.payload.Data?.Application?.Refeno,
        DateCreated: data?.payload?.Data?.AppData?.DateCreated,
        LockedUser: data?.payload?.Data?.AppData?.LockedByName,
      });
      const newMappedData = mapUpdateData(updatedData);
      setInitials(newMappedData);
      dispatch(setLoadingApplication(false));
    }
  };

  const _getUpdateLicenseData = async () => {
    dispatch(setLoadingApplication(true));
    try {
      const res = await dispatch(
        getLicenseData({licenseId: userILData?.userILData?.Id}),
      );

      if (
        res.payload?.networkSuccess &&
        res.payload.Data &&
        res.payload.Data.data
      ) {
        const result = res.payload.Data.data;

        const res2 = await dispatch(
          getLicenseDetails({
            licenseERN: '',
            licenseID: result.LocalIndustrialLicenseNumber,
            entityID: result.LocalAuthority?.OldId,
          }),
        );

        if (res2.payload?.networkSuccess && res2.payload?.responseStatus == 0) {
          const result2 = res2.payload.result.licenseInfo.licenseDetails;

          const finalResult = {
            ...result,
            licenseID: userILData?.userILData?.Id,
            userId: userILData?.userId,
            serviceId: '19',
            LocalIndustrialLicenseIssueDate:
              result2.licenseRegistrationDate.split(' ')[0],
            LocalIndustrialLicenseExpiryDate:
              result2.licenseExpirationDate.split(' ')[0],
            LocalIndustrialLicenseAttachment: applicationId
              ? result.LocalIndustrialLicenseAttachment
              : [],
          };

          const newMappedData = mapUpdateData(finalResult);

          setInitials(newMappedData);
          dispatch(setLoadingApplication(false));
          return finalResult;
        } else {
          Alert.alert(
            t('IL.NoDataFound'),
            t('IL.NoDataInDatabase'),
            [
              {
                text: t('OK'),
                onPress: () => NavigationService.goBack(),
              },
            ],
            {cancelable: false},
          );
        }
      } else {
        Alert.alert(
          t('IL.NoDataFound'),
          t('IL.NoDataInDatabase'),
          [
            {
              text: t('OK'), // 👈 custom OK button
              onPress: () => NavigationService.goBack(),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (err) {
    } finally {
      dispatch(setLoadingApplication(false));
    }
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

  const submitForm = (values: any) => {
    try {
      let newBody = {};
      if (applicationId)
        newBody = {
          ...values,
          FormId: '19',
          UserId: userILData?.userId,
          Id: applicationId,
        };
      else newBody = {...values, FormId: '19', UserId: userILData?.userId};
      const body = transformFactoryData(newBody);
      dispatch(setLoadingModal(true));
      dispatch(
        SubmitIndustrialLicenseRenewal({
          body: {...body, ServiceActionType: 1, languageId: isArabic() ? 2 : 1},
        }),
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
  };
  useEffect(() => {
    if (applicationId) _getApplicationDetails();
    else _getUpdateLicenseData();
    _getCountries();
  }, []);

  return (
    <SPHeader
      service={{...service, ...params?.service}}
      exitForm={initials.isDraft == 0 && applicationId}
      canPay={canPay}>
      <Formik
        initialValues={initials}
        validationSchema={validationSchema}
        // enableReinitialize={true}
        onSubmit={values => {
          submitForm({...values, isDraft: 0});
        }}>
        {({values, handleSubmit, validateForm, setTouched}) => {
          const isDisabled = (fieldName: string) => {
            if (!applicationId) return false;
            else if (values.isDraft == 1) return false;
            else return true;
          };

          const showOwner =
            (values.LegalEntity?.isOwner === 'Y' &&
              values.LegalEntity?.showDoYouHaveManager === 'N') ||
            (values.LegalEntity?.showDoYouHaveManager === 'Y' &&
              !values.DoYouHaveManager?.value) ||
            Object.keys(values.LegalEntity || {}).length === 0;
          return (
            <DisabledProvider value={{isDisabled}}>
              <View style={{gap: 8 * BW()}}>
                <DisplayLocalLicensingAuthority />
                <DisplayFactoryManagerDetails />
                <ActivitiesDetails readOnly={true} index={3} />
                <OwnerDetails readOnly={true} index={4} />
                <EmployeesDetails index={showOwner ? 5 : 4} />
                <TermsAndConditions importantNote={true} setCheck={setCheck} />
                {!isDisabled('FirstName') && (
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
                      submitForm(data);
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

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },

    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      gap: 8,
    },
    titleText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    button: {
      borderColor: colors.primaryColor + '99',
      borderWidth: 1,
      borderRadius: 12 * BW(),
      padding: 12 * BW(),
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 100 * BW(),
    },
    icon: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    buttonText: {
      color: colors.mainWhite,
      fontSize: 18,
      fontWeight: '500',
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

export default RenewalIndustrialProductionLicense;
