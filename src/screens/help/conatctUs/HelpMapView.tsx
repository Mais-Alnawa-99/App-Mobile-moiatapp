import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {BW} from '../../../style/theme';
import MapView, {Marker} from 'react-native-maps';
import CustomMapView from '../../../component/MapView';

export default function HelpMapView(props: any): JSX.Element {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [
          {
            latitude: 25.255861,
            longitude: 55.4119458,
          },
          {
            latitude: 24.459803,
            longitude: 54.3139325,
          },
        ],
        {
          edgePadding: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30,
          },
          animated: true,
        },
      );
    }
  }, []);
  return (
    <Animatable.View
      duration={700}
      delay={400}
      animation={'fadeIn'}
      style={{
        borderRadius: 2 * BW(),
        overflow: 'hidden',
        height: 180 * BW(),
        marginTop: 12 * BW(),
      }}>
      <CustomMapView mapRef={mapRef} style={{backgroundColor: '#fff'}}>
        <Marker
          key={'0'}
          coordinate={{
            latitude: 25.255861,
            longitude: 55.4119458,
          }}
          image={require('../../../assets/icons/mapMarker.png')}
        />
        <Marker
          key={'1'}
          coordinate={{
            latitude: 24.459803,
            longitude: 54.3139325,
          }}
          image={require('../../../assets/icons/mapMarker.png')}
        />
      </CustomMapView>
    </Animatable.View>
  );
}

const getStyle = (colors: any) => StyleSheet.create({});
