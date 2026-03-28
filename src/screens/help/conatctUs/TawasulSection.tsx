import React, {Fragment} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';
import Social from '../../../component/Social';
import Text from '../../../component/Text';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Line from '../../../component/Line';
import {
  callPhoneNumber,
  openWhatsappChat,
} from '../../../component/Generalfunction';
import {isArabic} from '../../../locales';

export default function TawasulSection(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  return (
    <Fragment>
      <View style={style.tawasulCintainer}>
        <TouchableOpacity
          onPress={() => {
            isArabic()
              ? Linking.openURL('https://171.ae/ar/')
              : Linking.openURL('https://171.ae/en/');
          }}>
          <Image
            style={{
              width: 180 * BW(),
              resizeMode: 'contain',
              height: 120 * BW(),
              tintColor: colors.tawasulColor,
            }}
            source={require('../../../assets/tawasul-logo.png')}
          />
        </TouchableOpacity>
        <View style={[style.row, {marginTop: 6 * BW()}]}>
          <TouchableOpacity
            onPress={() => openWhatsappChat('97147771777')}
            style={style.row}>
            <Text
              speakable={false}
              h2
              bold
              style={{marginHorizontal: 6 * BW()}}>
              047771777
            </Text>
            <FontAwesome5Icon
              name="whatsapp-square"
              color={'green'}
              size={24 * BW()}
            />
          </TouchableOpacity>
          <View style={style.line} />
          <TouchableOpacity
            onPress={() => {
              callPhoneNumber('171');
            }}
            style={style.row}>
            <Text
              h2
              bold
              speakable={false}
              style={{
                marginLeft: isArabic() ? 6 * BW() : 0,
                marginRight: isArabic() ? 0 : 6 * BW(),
              }}>
              171
            </Text>
            <FontAwesome5Icon
              name="phone-square"
              color={'green'}
              size={24 * BW()}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Social
        style={style.socialContainer}
        iconStyle={style.socialIcon}
        btnContainer={{
          width: 40 * BW(),
        }}
        withLine
      />
    </Fragment>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    socialContainer: {
      marginTop: 12 * BW(),
      backgroundColor: colors.white,
      borderRadius: 4 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 16 * BW(),
      position: 'static',
      paddingBottom: 16 * BW(),
      minHeight: 'auto',
    },
    socialIcon: {
      width: 24 * BW(),
      height: 24 * BW(),
      tintColor: colors.iconPrimaryColor,
      resizeMode: 'contain',
    },
    tawasulCintainer: {
      marginTop: 12 * BW(),
      backgroundColor: colors.white,
      borderRadius: 4 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8 * BW(),
      paddingBottom: 16 * BW(),
    },
    row: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: isArabic() ? 'row-reverse' : 'row',
    },
    line: {
      height: '100%',
      borderWidth: 0.6 * BW(),
      borderColor: colors.gray,
      marginHorizontal: 12 * BW(),
    },
  });
