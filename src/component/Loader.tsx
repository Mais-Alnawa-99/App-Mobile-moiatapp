import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Platform,
  Modal,
  View,
} from 'react-native';
import theme, {BW} from '../style/theme';
import Error from './error/Error';
import Text from './Text';
import {useAppSelector} from '../redux/store';
import FastImage from 'react-native-fast-image';

type PropsType = {
  isLoading?: boolean;
  children?: JSX.Element;
  style?: object;
  showImage?: boolean;
  isLandscape?: boolean;
  size?: number;
  modal?: boolean;
};

export default function Loader({
  isLoading,
  children,
  style,
  showImage,
  isLandscape,
  size,
  modal,
}: PropsType): JSX.Element {
  const styles = getStyles(theme.themeObject.colors);
  const {isOnline} = useAppSelector(store => store.server);
  if (!isOnline) {
    return <Error error_connection={true} />;
  }

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <>
      {showImage ? (
        Platform.OS == 'ios' ? (
          <Image
            resizeMode="stretch"
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../assets/splash.gif')}
          />
        ) : (
          <FastImage
            style={{width: '100%', height: '100%'}}
            source={require('../assets/splash.gif')}
            resizeMode={FastImage.resizeMode.stretch}
          />
        )
      ) : modal ? (
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ActivityIndicator
              size={size ? size : 30 * BW()}
              color={theme.themeObject.colors.primaryColor}
            />
          </View>
        </View>
      ) : (
        <SafeAreaView style={[styles.activity, {...style}]}>
          <ActivityIndicator
            size={size ? size : 30 * BW()}
            color={theme.themeObject.colors.primaryColor}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    activity: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      paddingHorizontal: 8 * BW(),
      backgroundColor: colors.black + '99',
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    modalView: {
      backgroundColor: colors.white,
      borderRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 12 * BW(),
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      padding: 20 * BW(),
      width: 50 * BW(),
      height: 50 * BW(),
    },
  });
