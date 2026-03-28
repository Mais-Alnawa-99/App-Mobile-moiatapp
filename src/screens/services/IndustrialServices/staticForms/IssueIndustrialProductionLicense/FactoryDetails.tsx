import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import Input from '../../../../../component/input/Input'; // Assuming you have a custom Input component
import CustomMapView from '../../../../../component/MapView';
import {t} from 'i18next';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import {Marker} from 'react-native-maps';
import ILAttachmentUpload from '../../../../../component/attachment/ILAttachmentUpload';
import {BW} from '../../../../../style/theme';
import {isArabic} from '../../../../../locales';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {GetLookupData} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import reactotron from 'reactotron-react-native';
import Geocoder from 'react-native-geocoding';
import {mapKey} from '../../../../../../app.json'; // adjust path to your app.json
import {setCities} from '../../../../../redux/reducers/I-Services/slice/City';
import {setAreas} from '../../../../../redux/reducers/I-Services/slice/Area';
import Text from '../../../../../component/Text';
import {Image} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import MyLocation from '../../../../../component/MyLocation';
import {useDisabled} from './DisabledContext';

Geocoder.init(mapKey);

const requestLocation = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return new Promise((resolve, reject) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        const addressComponent = json.results[0];
        resolve(addressComponent);
      })
      .catch(error => resolve({status: false, error}));
  });
};

const FactoryForm = () => {
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();
  const {isDisabled} = useDisabled();
  const dispatch = useAppDispatch();
  const legalEntities = useAppSelector(state => state.legalEntity.list);
  const {colors}: any = useTheme();
  const [areaOptions, setAreaOptions] = useState([]);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({
    latitude: 24.46667,
    longitude: 54.36667,
  });
  const managerOptions = [
    {label: t('IL.Yes'), value: true},
    {label: t('IL.No'), value: false},
  ];

  const [mapRegion, setMapRegion] = useState({
    latitude: 24.46667,
    longitude: 54.36667,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [isMapMoved, setIsMapMoved] = useState(false);

  const cities = useAppSelector(state => state.City.list);

  const area = useAppSelector(state => state.Area.list);

  const [attachments, setAttachments] = useState([]);

  return (
    <View>
      <StepIndicator
        stepNumber={2}
        stepName={t('FactoryData')}
        style={{marginBottom: 0 * BW()}}
      />
      <Input
        textInput
        requiredStar
        label={t('TradeNameEnLabel')}
        value={values.TradeNameEn}
        onChangeText={value => {
          setFieldValue('TradeNameEn', value);
          setFieldTouched('TradeNameEn', true);
        }}
        disabled={values.DisabledField || isDisabled('FirstName')}
        error={touched.TradeNameEn && errors.TradeNameEn}
      />

      <Input
        textInput
        requiredStar
        label={t('TradeNameArLabel')}
        value={values.TradeNameAr}
        stopReplaceNumeric
        onChangeText={value => {
          setFieldValue('TradeNameAr', value);
          setFieldTouched('TradeNameAr', true);
        }}
        disabled={values.DisabledField || isDisabled('FirstName')}
        error={touched.TradeNameAr && errors.TradeNameAr}
      />

      <Input
        textInput
        requiredStar
        label={t('IL.FactoryEmail')}
        value={values.FactoryEmail}
        onChangeText={handleChange('FactoryEmail')}
        disabled={values.DisabledField || isDisabled('FirstName')}
        error={touched.FactoryEmail && errors.FactoryEmail}
        autoComplete="email"
      />

      <Input
        dropdown
        requiredStar
        label={t('LegalEntityLabel')}
        items={legalEntities}
        value={values.LegalEntity}
        onChange={value => {
          setFieldValue('LegalEntity', value);
          setFieldValue('DoYouHaveManager', {});
        }}
        error={touched.LegalEntity && errors.LegalEntity}
        disabled={isDisabled('FirstName')}
      />

      {values.LegalEntity?.showDoYouHaveManager == 'Y' && (
        <Input
          dropdown
          requiredStar
          label={t('IL.DoYouHaveManagerLabel')}
          items={managerOptions}
          value={values.DoYouHaveManager}
          onChange={val => setFieldValue('DoYouHaveManager', val)}
          placeholder={t('IL.Select')}
          error={touched.DoYouHaveManager && errors.DoYouHaveManager}
          disabled={isDisabled('FirstName')}
        />
      )}

      <Input
        dropdown
        requiredStar
        label={t('CityLabel')}
        items={cities}
        value={values.FactoryCity}
        onChange={value => {
          setFieldValue('FactoryCity', value);
          const areaList = value.Area?.map((item: any) => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }));
          dispatch(setAreas(areaList));
        }}
        error={touched.FactoryCity && errors.FactoryCity}
        disabled={isDisabled('FirstName')}
      />

      <Input
        dropdown
        requiredStar
        label={t('AreaLabel')}
        items={area}
        value={values.Area}
        onChange={value => setFieldValue('Area', value)}
        error={touched.Area && errors.Area}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        label={t('AddressLabel')}
        value={values.Address}
        onChangeText={handleChange('Address')}
        disabled={values.DisabledField}
        error={touched.Address && errors.Address}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        label={t('FactoryWebsiteLabel')}
        value={values.FactoryWebsite}
        onChangeText={handleChange('FactoryWebsite')}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('FactoryAreaLabel')}
        value={values.FactoryArea}
        onChangeText={handleChange('FactoryArea')}
        error={touched.FactoryArea && errors.FactoryArea}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        label={t('PhoneNumberLabel')}
        value={values.PhoneNumber}
        onChangeText={handleChange('PhoneNumber')}
        error={touched.PhoneNumber && errors.PhoneNumber}
        disabled={isDisabled('FirstName')}
      />
      <View>
        {address !== '' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 4 * BW(),
              overflow: 'hidden',
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: 15 * BW(),
                height: 15 * BW(),
                resizeMode: 'contain',
              }}
              source={require('../../../../../assets/icons/location.png')}
            />
            <Text
              h4
              numberOfLines={1}
              style={{
                marginLeft: 3 * BW(),
                paddingHorizontal: 4 * BW(),
              }}>
              {address}
            </Text>
          </View>
        )}
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
          styleContainer={{
            marginTop: 11 * BW(),
          }}
          style={{
            marginBottom: 8 * BW(),
          }}
          label={t('FactoryLocatorOnlineLabel')}
          styleLabel={{
            color: colors.text,
          }}
          redStar
          press
          is_expand
          styleAddress={{marginLeft: 0, flex: 1}}
          initialLocation={{
            latitude: Number(values?.Latitude) || 24.46667,
            longitude: Number(values?.Longitude) || 54.36667,
            address: values?.Address,
          }}
          setLocationProps={value => {
            setFieldValue('Address', String(value));
          }}
          onCoordinatesChange={coordinates => {
            setFieldValue('Latitude', coordinates?.latitude);
            setFieldValue('Longitude', coordinates?.longitude);
            setFieldValue(
              'FactoryLocatorOnline',
              `${coordinates?.latitude},${coordinates?.longitude}`,
            );
          }}
        />
      </View>
      <Text h5 style={{color: colors.lightPrimaryTextColor}}>
        {t('IL.InspectionIsuue')}
      </Text>
      {touched.FactoryLocatorOnline && errors.FactoryLocatorOnline && (
        <Text style={{color: colors.red}} h5>
          {errors.FactoryLocatorOnline}
        </Text>
      )}

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('TotalCapitalInvestmentLabel')}
        value={values.TotalCapitalInvestment}
        onChangeText={handleChange('TotalCapitalInvestment')}
        error={touched.TotalCapitalInvestment && errors.TotalCapitalInvestment}
        disabled={isDisabled('FirstName')}
      />

      <ILAttachmentUpload
        isDisabled={isDisabled('FirstName')}
        requiredStar={true}
        maxFile={2}
        acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
        onChange={val => {
          setFieldValue('CopyLocalIndustrialLicense', val);
          // setFieldTouched('CopyLocalIndustrialLicense', true);
        }}
        value={values.CopyLocalIndustrialLicense}
        title={t('CopyLocalIndustrialLicenseTitle')}
        errors={
          touched.CopyLocalIndustrialLicense &&
          errors.CopyLocalIndustrialLicense
        }
      />

      <ILAttachmentUpload
        isDisabled={isDisabled('FirstName')}
        requiredStar={false}
        maxFile={1}
        acceptedFiles={['jpg', 'jpeg', 'png', 'pdf']}
        onChange={val => {
          setFieldValue('MemorandumofAssociation', val);
          // setFieldTouched('MemorandumofAssociation', true);
        }}
        value={values.MemorandumofAssociation}
        title={t('MemorandumofAssociationTitle')}
      />
    </View>
  );
};

export default FactoryForm;
