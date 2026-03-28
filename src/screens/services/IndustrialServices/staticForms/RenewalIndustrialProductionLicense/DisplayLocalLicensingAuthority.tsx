import React, {useCallback, useEffect} from 'react';
import {View, ScrollView, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useFormikContext} from 'formik';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import ReadOnlyRow from '../ReadOnlyText';
import {BW} from '../../../../../style/theme';
import ILAttachmentUpload from '../../../../../component/attachment/ILAttachmentUpload';
import CustomMapView from '../../../../../component/MapView';
import Text from '../../../../../component/Text';
import reactotron from 'reactotron-react-native';
import {Marker} from 'react-native-maps';
import {useAppDispatch} from '../../../../../redux/store';
import {getLicenseDetails} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import Location from '../../../../../component/Location';
import MyLocation from '../../../../../component/MyLocation';
import {useDisabled} from '../IssueIndustrialProductionLicense/DisabledContext';

const DisplayLocalLicensingAuthority = () => {
  const {values, touched, errors, setFieldTouched, setFieldValue} =
    useFormikContext();
  const {isDisabled} = useDisabled();
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const dispatch = useAppDispatch();

  const _getLicenseDetails = () => {
    dispatch(
      getLicenseDetails({
        licenseERN: '',
        licenseID: values.LocalIndustrialLicenseNumber,
        entityID: values.LocalAuthority?.value,
      }),
    ).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.licenseInfo.licenseDetails;
        setFieldValue(
          'LocalIndustrialLicenseIssueDate',
          result.licenseRegistrationDate.split(' ')[0],
        );
        setFieldValue(
          'LocalIndustrialLicenseExpiryDate',
          result.licenseExpirationDate.split(' ')[0],
        );
      } else {
      }
    });
  };

  useEffect(() => {
    _getLicenseDetails();
  }, []);
  return (
    <View style={{width: '100%'}}>
      <StepIndicator
        stepNumber={1}
        stepName={t('FactoryData')}
        style={{marginBottom: 0 * BW()}}
      />

      <ReadOnlyRow label={t('emirate')} value={values.Emirate?.label || ''} />
      <ReadOnlyRow
        label={t('LocalAuthority')}
        value={values.LocalAuthority?.label || ''}
      />
      <ReadOnlyRow
        label={t('localIndustrialLicenseNumber')}
        value={values.LocalIndustrialLicenseNumber}
      />
      <ReadOnlyRow
        label={t('localIndustrialLicenseIssueDate')}
        value={values.LocalIndustrialLicenseIssueDate}
      />
      <ReadOnlyRow
        label={t('localIndustrialLicenseExpiryDate')}
        value={values.LocalIndustrialLicenseExpiryDate}
      />
      <ReadOnlyRow label={t('TradeNameEnLabel')} value={values.TradeNameEn} />
      <ReadOnlyRow label={t('TradeNameArLabel')} value={values.TradeNameAr} />
      <ReadOnlyRow label={t('IL.FactoryEmail')} value={values.FactoryEmail} />
      <ReadOnlyRow label={t('PhoneNumber')} value={values.PhoneNumber} />
      <ReadOnlyRow label={t('AddressLabel')} value={values.Address} />

      <ReadOnlyRow
        label={t('LegalEntityLabel')}
        value={values.LegalEntity?.label}
      />
      {values.LegalEntity?.showDoYouHaveManager === 'Y' && (
        <ReadOnlyRow
          label={t('IL.DoYouHaveManagerLabel')}
          value={values.DoYouHaveManager?.label}
        />
      )}
      <ReadOnlyRow label={t('CityLabel')} value={values.FactoryCity?.label} />
      <ReadOnlyRow label={t('AreaLabel')} value={values.Area?.label} />
      <ReadOnlyRow label={t('AddressLabel')} value={values.Address} />
      <ReadOnlyRow
        label={t('FactoryWebsiteLabel')}
        value={values.FactoryWebsite}
      />
      <ReadOnlyRow label={t('FactoryAreaLabel')} value={values.FactoryArea} />
      <ReadOnlyRow label={t('PhoneNumberLabel')} value={values.PhoneNumber} />
      <View>
        {isDisabled('FirstName') && (
          <View
            style={{
              zIndex: 1,
              width: '100%',
              height: '100%',

              position: 'absolute',
              backgroundColor: 'transparent',
            }}
            pointerEvents="auto"
          />
        )}

        <MyLocation
          hideSearch={isDisabled('FirstName')}
          label={t('FactoryLocatorOnlineLabel')}
          styleContainer={{
            marginTop: 8 * BW(),
          }}
          style={{
            marginBottom: 8 * BW(),
          }}
          styleLabel={{
            color: colors.text,
          }}
          redStar
          press
          is_expand
          styleAddress={{marginLeft: 0, flex: 1}}
          initialLocation={{
            latitude: Number(values.Latitude) || 24.46667,
            longitude: Number(values.Longitude) || 54.36667,
            address: values.Address,
          }}
          setLocationProps={value => {
            setFieldValue('Address', String(value));
          }}
          onCoordinatesChange={coordinates => {
            setFieldValue('Latitude', coordinates?.latitude);
            setFieldValue('Longitude', coordinates?.longitude);
          }}
          readOnly
          isDisabled={true}
        />

        <ReadOnlyRow
          label={t('TotalCapitalInvestmentLabel')}
          value={values.TotalCapitalInvestment}
        />
      </View>
      <ILAttachmentUpload
        isDisabled={isDisabled('FirstName')}
        requiredStar={true}
        maxFile={2}
        acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
        onChange={val => {
          setFieldValue('CopyLocalIndustrialLicense', val);
        }}
        value={values.CopyLocalIndustrialLicense}
        title={t('CopyLocalIndustrialLicenseTitle')}
        attachmentDescription={t('CopyLocalIndustrialLicenseDesc')}
        errors={
          touched.CopyLocalIndustrialLicense &&
          errors.CopyLocalIndustrialLicense
        }
      />
    </View>
  );
};

export default DisplayLocalLicensingAuthority;
