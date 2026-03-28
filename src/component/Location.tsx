import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  LayoutAnimation,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import Text from './Text';
import {BH, BW} from '../style/theme';
import {mapKey} from '../../app.json';

import MapView from './MapView';
import Button from './Button';
import {useTranslation} from 'react-i18next';

export const requestLocation = ({latitude, longitude}: any) => {
  Geocoder.init(mapKey);
  return new Promise((resolve, reject) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0];
        resolve(addressComponent);
      })
      .catch(error => resolve({status: false, error}));
  });
};

const Location = ({
  style,
  icon,
  styleIcon,
  styleAddress,
  label,
  styleLabel,
  styleContainer,
  press,
  setLocationProps,
  requiredStar,
  initLocation,
  isDisabled,
  isInitLocation,
}: any) => {
  const [location, setLocation]: any = useState({});

  const [address, setAddress]: any = useState(null);
  const [error, setError] = useState('');
  const {colors} = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        setError('Location permission denied');
        return false;
      }
    } catch (err) {
      // setError(err);
      return false;
    }
  };

  const requestGetLocationPermission = async () => {
    if (Platform.OS == 'android') {
      let permission: any = requestLocationPermission();
      if (permission) {
        getLocation();
      }
    } else {
      getLocation();
    }
  };

  useEffect(() => {
    if (
      typeof initLocation == 'object' &&
      Object.keys(initLocation).length !== 0
    ) {
      setLocation(initLocation);
    } else {
      if (!isInitLocation) requestGetLocationPermission();
    }
  }, [initLocation]);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      (error: any) => setError(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const onPress = async (nativeEvent: any) => {
    if (Platform.OS == 'android') {
      let permission: any = requestLocationPermission();
      if (permission) {
        setLocation(nativeEvent?.coordinate);
      }
    } else {
      setLocation(nativeEvent?.coordinate);
    }
  };

  const getAddress = (position: {latitude: any; longitude: any}) => {
    requestLocation({
      latitude: position?.latitude,
      longitude: position?.longitude,
    }).then((res: any) => {
      setAddress(res?.formatted_address);
      if (res?.formatted_address != undefined) {
        setLocationProps({
          latitude: position?.latitude,
          longitude: position?.longitude,
          address: res?.formatted_address,
        });
      }
    });
  };
  useEffect(() => {
    getAddress(location);
  }, [location]);
  const [mapRegion, setMapRegion] = useState({
    latitude: location?.latitude || 51.3068334,
    longitude: location?.longitude || 24.3311274,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    setMapRegion({
      latitude: location?.latitude || 51.3068334,
      longitude: location?.longitude || 24.3311274,
      latitudeDelta: mapRegion.latitudeDelta,
      longitudeDelta: mapRegion.longitudeDelta,
    });
  }, [location]);
  const [isMapMoved, setIsMapMoved] = useState(false);

  return (
    <View style={{marginTop: 8 * BW(), ...styleContainer}}>
      {label && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text h4 style={{...styleLabel}}>
            {label}
          </Text>
          {requiredStar && (
            <Icon
              name="star-of-life"
              size={6 * BW()}
              color="#db2c43"
              style={{marginHorizontal: 4 * BW()}}
            />
          )}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 4 * BW(),
          overflow: 'hidden',
          ...style,
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: 15 * BW(),
            height: 15 * BW(),
            resizeMode: 'contain',
            ...styleIcon,
          }}
          source={icon ? icon : require('../assets/icons/location.png')}
        />
        <Text
          h4
          numberOfLines={1}
          style={{
            marginLeft: 8 * BW(),
            paddingHorizontal: 4 * BW(),
            ...styleAddress,
          }}>
          {address}
        </Text>
      </View>
      <View style={[styles.expandedBody]}>
        <MapView
          latitude={location?.latitude || 51.3068334}
          longitude={location?.longitude || 24.3311274}
          onPress={({nativeEvent}: any) => {
            if (!isDisabled) {
              onPress(nativeEvent);
              setIsMapMoved(true);
            }
          }}
          // provider={PROVIDER_GOOGLE}
          location={location}
          region={
            Platform.OS == 'android'
              ? {
                  latitude: location?.latitude || 51.3068334,
                  longitude: location?.longitude || 24.3311274,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : mapRegion
          }
          onRegionChangeComplete={(newRegion: any) => {
            if (isMapMoved) {
              setMapRegion({
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
                latitudeDelta: newRegion.latitudeDelta,
                longitudeDelta: newRegion.longitudeDelta,
              });
            }
          }}>
          <Marker
            key={'0'}
            coordinate={{
              latitude: location?.latitude || 51.3068334,
              longitude: location?.longitude || 24.3311274,
            }}
            title={address}

            // description={address}
          />
        </MapView>
        {!isDisabled && (
          <Button
            onPress={getLocation}
            style={{
              position: 'absolute',
              bottom: 10 * BW(),
              right: 10 * BW(),
              backgroundColor: 'white',
              padding: 4 * BW(),
              borderRadius: 8 * BW(),
              alignItems: 'center',
              justifyContent: 'center',
              width: 60 * BW(),
              height: 60 * BW(),
            }}
            icon={require('../assets/icons/location.png')}
            styleIcon={{
              width: 15 * BW(),
              height: 15 * BW(),
              resizeMode: 'contain',
              ...styleIcon,
            }}
            h5
            title={t('locMe')}
          />
        )}
      </View>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
    },

    body: {
      overflow: 'hidden',
      backgroundColor: colors.primaryColor + '09',
      borderBottomEndRadius: 12 * BW(),
      borderBottomStartRadius: 12 * BW(),
      padding: 12 * BW(),
    },
    expandedBody: {
      backgroundColor: colors.primaryColor + '09',
      height: 200 * BW(),
      overflow: 'hidden',
      borderRadius: 4 * BW(),
      marginTop: 6 * BW(),
    },
  });
export default Location;
