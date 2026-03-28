import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useFormikContext} from 'formik';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import Text from '../../../../../component/Text';
import {BW} from '../../../../../style/theme';
import {isArabic} from '../../../../../locales';
import Input from '../../../../../component/input/Input';
import Button from '../../../../../component/Button';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {
  getLicenseDetails,
  GetMainBySub,
  isIndustrialLicenseExist,
} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {ReadOnlyRow} from '../ReusableComponents';
import {setCities} from '../../../../../redux/reducers/I-Services/slice/City';
import {setLocalAuthorities} from '../../../../../redux/reducers/I-Services/slice/LocalAuthorities';
import moment from 'moment';
import {useDisabled} from './DisabledContext';
import {_openModal} from '../../../Eservices/ServiceForm';
import NavigationService from '../../../../../navigation/NavigationService';

const LocalLicensingAuthority = props => {
  const {values, handleBlur, handleChange, setFieldValue, errors, touched} =
    useFormikContext();
  const {isDisabled} = useDisabled();
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();

  const [showIssueDate, setShowIssueDate] = useState(false);
  const [showExpiryDate, setShowExpiryDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const emirates = useAppSelector(state => state.Emirate.list);
  const localAuthorities = useAppSelector(state => state.LocalAuthority.list);
  const [disabledField, setDisabledField] = useState(false);
  const [factoryData, setFactoryData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const [finished, setFinished] = useState(false);

  const _getMainBySub = async subActivity => {
    const res = await dispatch(GetMainBySub({subActivity}));

    if (res?.payload?.networkSuccess) {
      const result = res.payload.result;
      if (result) return result;
    }
    return null;
  };
  useEffect(() => {
    if (
      values.LocalIndustrialLicenseNumber != '' &&
      values.LocalAuthority?.value &&
      finished
    )
      dispatch(
        isIndustrialLicenseExist({
          LocalIndustrialLicenseNumber: values.LocalIndustrialLicenseNumber,
          LocalAuthorityId: values.LocalAuthority?.value,
        }),
      ).then(res => {
        if (res.payload?.networkSuccess)
          if (res.payload.Data?.success) {
            if (res.payload.Data?.IsLocalIndustrialNumberExist) {
              _openModal(
                dispatch,
                false,
                false,
                false,
                <Text h4 style={{color: colors.red}}>
                  {t('IL.AlreadyExist')}
                </Text>,
              );
              setFieldValue('LocalIndustrialLicenseNumber', '');
              setFieldValue('LocalAuthority', {});
              return;
            }
            setFinished(true);
          }
      });
    //setFinished(true);
  }, [values.LocalIndustrialLicenseNumber, values.LocalAuthority, finished]);
  const _getLicenseDetails = async () => {
    // if(!finished)
    //   setFinished(true)

    setIsSearching(true);
    //let checked = true;
    if (
      values.LocalIndustrialLicenseNumber != '' &&
      values.LocalAuthority?.value &&
      !finished
    ) {
      const data = await dispatch(
        isIndustrialLicenseExist({
          LocalIndustrialLicenseNumber: values.LocalIndustrialLicenseNumber,
          LocalAuthorityId: values.LocalAuthority?.value,
        }),
      );

      if (data.payload?.networkSuccess)
        if (data.payload.Data?.success)
          if (data.payload.Data?.IsLocalIndustrialNumberExist) {
            _openModal(
              dispatch,
              false,
              false,
              false,
              <Text h4 style={{color: colors.red}}>
                {t('IL.AlreadyExist')}
              </Text>,
            );
            setFieldValue('LocalIndustrialLicenseNumber', '');
            setFieldValue('LocalAuthority', {});

            setIsSearching(false);
            return;
          }
      setFinished(true);
    }

    dispatch(
      getLicenseDetails({
        licenseERN: '',
        licenseID: values.LocalIndustrialLicenseNumber,
        entityID: values.LocalAuthority.oldid,
      }),
    ).then(res => {
      setIsSearching(false);
      if (res.payload?.networkSuccess)
        if (res.payload.responseStatus === 0) {
          const result = res.payload.result;
          const d = new Date(
            result.licenseInfo?.licenseDetails?.licenseExpirationDate.replace(
              ' ',
              'T',
            ),
          );
          const expiry = new Date(d);

          if (expiry < new Date()) {
            _openModal(
              dispatch,
              false,
              false,
              false,
              <Text h4 style={{color: colors.red}}>
                {t('IL.ExpiredLicenseMessage')}
              </Text>,
            );
            NavigationService.goBack();
            return;
          }
          setFactoryData(result);
          setModalVisible(true);
        } else {
          setFactoryData({});
          Alert.alert(t('IL.NoDataFound'), t('IL.NoDataInDatabase'));
          setIsSearching(false);
        }
      else Alert.alert('', t('IL.NetworkError'));
    });
    setIsSearching(false);
  };

  const _getPreviousLicenseDetails = () => {
    setIsSearching(true);
    let FromMoec: any[];
    FromMoec = [];
    dispatch(
      getLicenseDetails({
        licenseERN: '',
        licenseID: values.LocalIndustrialLicenseNumber,
        entityID: values.LocalAuthority.OldId,
      }),
    ).then(res => {
      if (res.payload?.networkSuccess)
        if (res.payload.responseStatus === 0) {
          const result = res.payload.result.licenseInfo.licenseDetails;
          setFieldValue(
            'LocalIndustrialLicenseIssueDate',
            result.licenseRegistrationDate.split(' ')[0],
          );
          FromMoec = [...FromMoec, 'LocalIndustrialLicenseIssueDate'];
          setFieldValue(
            'LocalIndustrialLicenseExpiryDate',
            result.licenseExpirationDate.split(' ')[0],
          );
          FromMoec = [...FromMoec, 'LocalIndustrialLicenseExpiryDate'];

          setFieldValue('FromMoec', FromMoec);
          setDisabledField(true);
          setHideSearch(true);
          setIsSearching(false);
        } else {
          Alert.alert(t('IL.NoDataFound'), t('IL.NoDataInDatabase'));

          setIsSearching(false);
        }
      else Alert.alert('', t('IL.NetworkError'));
    });
  };

  const _getLocalAuthority = value => {
    const result = emirates.filter((item: any) => {
      return item.Id == value.value;
    });

    const authoroty = result[0]?.LocalAuthorities.map((item: any): any => ({
      ...item,
      label: item.Name,
      value: item.Id,
    }));
    dispatch(setLocalAuthorities(authoroty));
  };

  const _fillFactoryData = async () => {
    setIsLoading(true);
    const subActivities =
      factoryData?.licenseInfo?.licenseActivities?.licenseActivity;
    let activities = [...values.Activities]; // clone to avoid direct mutation

    for (const activity of subActivities) {
      const msactivity = await _getMainBySub(activity.activityCode);
      if (Object.keys(msactivity).length == 0) continue;
      const name = isArabic()
        ? activity.activityNameAR
        : activity.activityNameEN;
      const newSubActivity = {
        ...msactivity.current,
        label: activity.activityCode + ' - ' + name,
        value: activity.activityCode,
      };
      const index = activities.findIndex(
        item => item?.MainActivity?.id === msactivity?.main?.id,
      );

      if (index !== -1) {
        const subIndex = activities[index].SubActivity.findIndex(
          item => item?.isiC4Code === activity?.activityCode,
        );

        if (subIndex === -1) {
          activities[index] = {
            ...activities[index],
            SubActivity: [...activities[index].SubActivity, newSubActivity],
          };
        }
      } else {
        activities.push({
          MainActivity: msactivity.main,
          SubActivity: [newSubActivity],
        });
      }
    }

    // ✅ Set updated activities into Formik state
    setFieldValue('Activities', activities);

    let FromMoec = [];
    if (
      factoryData?.licenseInfo?.licenseDetails?.licenseRegistrationDate != null
    ) {
      setFieldValue(
        'LocalIndustrialLicenseIssueDate',
        factoryData?.licenseInfo?.licenseDetails?.licenseRegistrationDate.split(
          ' ',
        )[0],
      );
      FromMoec = [...FromMoec, 'LocalIndustrialLicenseIssueDate'];
    }
    if (
      factoryData?.licenseInfo?.licenseDetails?.licenseExpirationDate != null
    ) {
      setFieldValue(
        'LocalIndustrialLicenseExpiryDate',
        factoryData?.licenseInfo?.licenseDetails?.licenseExpirationDate.split(
          ' ',
        )[0],
      );
      FromMoec = [...FromMoec, 'LocalIndustrialLicenseExpiryDate'];
    }
    if (factoryData?.licenseInfo?.licenseDetails?.bnRegNameEn != null) {
      setFieldValue(
        'TradeNameEn',
        factoryData?.licenseInfo?.licenseDetails?.bnRegNameEn,
      );
      FromMoec = [...FromMoec, 'TradeNameEn'];
    }
    if (factoryData?.licenseInfo?.licenseDetails?.bnRegNameAr != null) {
      setFieldValue(
        'TradeNameAr',
        factoryData?.licenseInfo?.licenseDetails?.bnRegNameAr,
      );
      FromMoec = [...FromMoec, 'TradeNameAr'];
    }
    if (
      factoryData?.licenseInfo?.licenseDetails?.licenseOfficialEmail != null
    ) {
      setFieldValue(
        'FactoryEmail',
        factoryData?.licenseInfo?.licenseDetails?.licenseOfficialEmail,
      );
      FromMoec = [...FromMoec, 'FactoryEmail'];
    }
    if (factoryData?.licenseInfo?.licenseDetails?.licenseMobPhoneNo != null) {
      setFieldValue(
        'PhoneNumber',
        factoryData?.licenseInfo?.licenseDetails?.licenseMobPhoneNo,
      );
      FromMoec = [...FromMoec, 'PhoneNumber'];
    }
    if (factoryData?.licenseInfo?.licenseDetails?.licenseFullAddress != null) {
      setFieldValue(
        'Address',
        factoryData?.licenseInfo?.licenseDetails?.licenseFullAddress,
      );
      FromMoec = [...FromMoec, 'Address'];
    }
    setFieldValue('FromMoec', FromMoec);
    setDisabledField(true);
    setIsLoading(false);
    setModalVisible(false);
  };
  let selectedIssueDate = values.LocalIndustrialLicenseIssueDate;
  const onChangeIssueDate = (event, date, setFieldValue) => {
    Platform.OS == 'android' && setShowIssueDate(false);
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      selectedIssueDate = formattedDate;
      setFieldValue('LocalIndustrialLicenseIssueDate', formattedDate);
    }
  };

  let selectedExpiryDate = values.LocalIndustrialLicenseExpiryDate;
  const onChangeExpiryDate = (event, date, setFieldValue) => {
    Platform.OS == 'android' && setShowExpiryDate(false);
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      selectedExpiryDate = formattedDate;
      setFieldValue('LocalIndustrialLicenseExpiryDate', formattedDate);
    }
  };

  const _resetValuesMoec = () => {
    setFieldValue('LocalIndustrialLicenseIssueDate', '');
    setFieldValue('LocalIndustrialLicenseExpiryDate', '');
    setFieldValue('TradeNameEn', '');
    setFieldValue('TradeNameAr', '');
    setFieldValue('FactoryEmail', '');
    setFieldValue('PhoneNumber', '');
    setFieldValue('Address', '');
    setFieldValue('LocalIndustrialLicenseNumber', '');
    setFieldValue('Emirate', {});
    setFieldValue('LocalAuthority', {});
    setDisabledField(false);
  };

  useEffect(() => {
    if (
      props.update == 'Y' &&
      Object.keys(values.Emirate || {}).length > 0 &&
      Object.keys(values.LocalAuthority || {}).length > 0 &&
      values.LocalIndustrialLicenseNumber
    ) {
      _getPreviousLicenseDetails();
    }
  }, [props.update]);

  return (
    <View>
      <StepIndicator
        stepNumber={1}
        stepName={t('LocalAuthority')}
        style={{marginBottom: 0 * BW()}}
      />

      <Input
        dropdown
        requiredStar
        label={t('emirate')}
        items={emirates}
        value={values.Emirate}
        onChange={value => {
          setFieldValue('Emirate', value);
          const cityList = value.City?.map((item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }));
          dispatch(setCities(cityList));
          _getLocalAuthority(value);
        }}
        error={touched.Emirate && errors.Emirate}
        disabled={disabledField || isDisabled('FirstName')}
      />

      <Input
        dropdown
        requiredStar
        label={t('LocalAuthority')}
        items={localAuthorities}
        value={values.LocalAuthority}
        onChange={value => {
          setFieldValue('LocalAuthority', value);
          setFinished(true);
        }}
        error={touched.LocalAuthority && errors.LocalAuthority}
        disabled={disabledField || isDisabled('FirstName')}
      />

      <Input
        label={t('localIndustrialLicenseNumber')}
        value={values.LocalIndustrialLicenseNumber}
        onChangeText={value => {
          setFinished(false);
          setFieldValue('LocalIndustrialLicenseNumber', value);
        }}
        textInput
        requiredStar
        error={
          touched.LocalIndustrialLicenseNumber &&
          errors.LocalIndustrialLicenseNumber
        }
        disabled={
          (disabledField || props.update == 'Y' || isDisabled('FirstName')) &&
          values.isDraft == 0
        }
        onBlur={() => {
          setFinished(true);
        }}
      />
      {!hideSearch && !isDisabled('FirstName') && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 8 * BW(),
            justifyContent: 'space-between',
          }}>
          <Button
            title={t('Search')}
            onPress={() => _getLicenseDetails()}
            h3
            style={{
              borderRadius: 5 * BW(),
              alignSelf: 'flex-start',
              width: '25%',
              height: 40 * BW(),
              paddingVertical: 0,
              paddingBottom: 0,
              justifyContent: 'center',
            }}
            styleText={{
              color: colors.mainWhite,
              textAlign: 'center',
              justifyContent: 'center',
            }}
            loading={isSearching}
            disabled={isSearching}
            loadingColor={colors.mainWhite}
            backgroundColorDisabled={
              isSearching ? colors.secondaryColor + '80' : colors.secondaryColor
            }
          />

          <Button
            ionicons={'replay'}
            ioniconsColor={colors.secondaryColor}
            onPress={() => _resetValuesMoec()}
            h3
            style={{
              borderRadius: 5 * BW(),
              alignSelf: 'flex-start',
              width: 40 * BW(),
              height: 40 * BW(),
              paddingVertical: 0,
              borderColor: colors.secondaryColor,
              borderWidth: 1,
              paddingBottom: 0,
              justifyContent: 'center',
            }}
          />
        </View>
      )}

      <Input
        datePicker
        requiredStar
        label={t('localIndustrialLicenseIssueDate')}
        show={showIssueDate}
        showDatepicker={() => setShowIssueDate(!showIssueDate)}
        onChangeDateFrom={(event, date) =>
          onChangeIssueDate(event, date, setFieldValue)
        }
        dateValue={selectedIssueDate ? new Date(selectedIssueDate) : new Date()}
        value={
          selectedIssueDate
            ? moment(selectedIssueDate).format('DD/MM/YYYY')
            : ''
        }
        error={
          touched.LocalIndustrialLicenseIssueDate &&
          errors.LocalIndustrialLicenseIssueDate
        }
        disabled={
          values.FromMoec?.includes('LocalIndustrialLicenseIssueDate') ||
          isDisabled('FirstName')
        }
      />
      <Input
        datePicker
        requiredStar
        label={t('localIndustrialLicenseExpiryDate')}
        show={showExpiryDate}
        showDatepicker={() => setShowExpiryDate(!showExpiryDate)}
        onChangeDateFrom={(event, date) =>
          onChangeExpiryDate(event, date, setFieldValue)
        }
        dateValue={
          selectedExpiryDate ? new Date(selectedExpiryDate) : new Date()
        }
        value={
          selectedExpiryDate
            ? moment(selectedExpiryDate).format('DD/MM/YYYY')
            : ''
        }
        error={
          touched.LocalIndustrialLicenseExpiryDate &&
          errors.LocalIndustrialLicenseExpiryDate
        }
        disabled={
          values.FromMoec?.includes('LocalIndustrialLicenseExpiryDate') ||
          isDisabled('FirstName')
        }
        datePickerProps={{
          minimumDate: new Date(),
        }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10 * BW(),
              }}>
              <Text h3 bold>
                {t('IL.FactoryDetails')}
              </Text>
              <Button
                ioniconsColor={colors.red}
                ionicons={'close'}
                onPress={() => setModalVisible(false)}
                style={{
                  padding: 0,
                  width: 30 * BW(),
                  height: 30 * BW(),
                  justifyContent: 'center',
                }}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ReadOnlyRow
                label={t('TradeNameEnLabel')}
                value={factoryData?.licenseInfo?.licenseDetails?.bnRegNameEn}
              />
              <ReadOnlyRow
                label={t('TradeNameArLabel')}
                value={factoryData?.licenseInfo?.licenseDetails?.bnRegNameAr}
              />
              <ReadOnlyRow
                label={t('IL.FactoryEmail')}
                value={
                  factoryData?.licenseInfo?.licenseDetails?.licenseOfficialEmail
                }
              />
              {/* <ReadOnlyRow label={t('ManagerName')} value={factoryData?.licenseInfo?.licenseDetails?.bnRegNameEn} /> */}
              <ReadOnlyRow
                label={t('PhoneNumber')}
                value={
                  factoryData?.licenseInfo?.licenseDetails?.licenseMobPhoneNo
                }
              />
              <ReadOnlyRow
                label={t('AddressLabel')}
                value={
                  factoryData?.licenseInfo?.licenseDetails?.licenseFullAddress
                }
              />
              <ReadOnlyRow
                label={t('localIndustrialLicenseIssueDate')}
                value={
                  factoryData?.licenseInfo?.licenseDetails?.licenseRegistrationDate?.split(
                    ' ',
                  )[0]
                }
              />
              <ReadOnlyRow
                label={t('localIndustrialLicenseExpiryDate')}
                value={
                  factoryData?.licenseInfo?.licenseDetails?.licenseExpirationDate?.split(
                    ' ',
                  )[0]
                }
              />
              <View style={{}}>
                <Text h3 bold style={{marginBottom: 8 * BW()}}>
                  {t('IL.IndustrialActivities')}
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: colors.lightgray + '99',
                      padding: 8,
                    }}>
                    <Text bold style={{flex: 2}}>
                      {t('IL.ActivityCode')}
                    </Text>
                    <Text bold style={{flex: 3}}>
                      {t('IL.DescriptionAr')}
                    </Text>
                    <Text bold style={{flex: 3}}>
                      {t('IL.DescriptionEn')}
                    </Text>
                    <Text bold style={{flex: 1, fontSize: 9 * BW()}}>
                      {t('IL.IsOld')}
                    </Text>
                  </View>
                  {factoryData?.licenseInfo?.licenseActivities?.licenseActivity?.map(
                    (activity, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          padding: 8,
                          borderTopWidth: 1,
                          borderColor: colors.border,
                        }}>
                        <Text style={{flex: 2}}>{activity.activityCode}</Text>
                        <Text style={{flex: 3}}>{activity.activityNameAR}</Text>
                        <Text style={{flex: 3}}>{activity.activityNameEN}</Text>
                        <Text style={{flex: 1}}>
                          {activity.isOld ? t('IL.Yes') : t('IL.No')}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 12 * BW(),
                }}>
                <Button
                  title={t('Confirm')}
                  ionicons={'check-circle-outline'}
                  ioniconsColor={colors.mainWhite}
                  styleText={{color: colors.mainWhite}}
                  style={{
                    width: '30%',
                    flexDirection: 'row-reverse',
                    justifyContent: 'center',
                    height: 35 * BW(),
                    paddingVertical: 0,
                    gap: 3 * BW(),
                  }}
                  onPress={() => _fillFactoryData()}
                  disabled={isLoading}
                  loading={isLoading}
                  loadingColor={colors.mainWhite}
                  backgroundColorDisabled={
                    isLoading ? colors.green + '80' : colors.green
                  }
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
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
      zIndex: 9999,
      paddingHorizontal: 8 * BW(),
      backgroundColor: colors.black + '89',
    },
    modalView: {
      backgroundColor: colors.mainBackground,
      borderRadius: 12 * BW(),
      padding: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '40%',
      maxHeight: '88%',
    },
  });

export default LocalLicensingAuthority;
