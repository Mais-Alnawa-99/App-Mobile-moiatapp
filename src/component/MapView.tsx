import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {
  MapViewProps,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import {BW} from '../style/theme';

function CustomMapView({
  latitude,
  longitude,
  location,
  title,
  children,
  style,
  mapRef,
  provider,
  ...props
}: {
  latitude?: any;
  longitude?: any;
  location?: any;
  title?: string;
  children?: React.ReactNode;
  style?: {};
  mapRef?: any;
  onPress?: any;
  region?: any;
  onRegionChangeComplete?: any;
  provider?: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const styles = getStyle(colors);

  return (
    <MapView
      ref={mapRef}
      loadingEnabled={true}
      loadingIndicatorColor={colors.primary}
      loadingBackgroundColor="#F5F6FA"
      showsUserLocation={true}
      showsCompass={true}
      provider={!!provider ? provider : PROVIDER_DEFAULT}
      style={{width: '100%', height: '100%', ...style}}
      {...props}>
      {children}
    </MapView>
  );
}
const getStyle = (colors: any) => StyleSheet.create({});
export default CustomMapView;
