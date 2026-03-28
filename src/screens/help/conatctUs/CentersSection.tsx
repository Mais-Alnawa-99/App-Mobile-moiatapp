import React, {useEffect} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as Animatable from 'react-native-animatable';

import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {BW} from '../../../style/theme';
import Loader from '../../../component/Loader';
import Button from '../../../component/Button';
import FlatListComp from '../../../component/FlatList';
import {getContactUs} from '../../../redux/reducers/Help/thunk/thunk';
import Text from '../../../component/Text';
import Line from '../../../component/Line';
import {isArabic} from '../../../locales';

export default function CentersSection(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();

  const _getContactUs = () => {
    dispatch(getContactUs());
  };
  useEffect(() => {
    _getContactUs();
  }, []);

  const {details, isLoading} = useAppSelector(state => state.Help.contactUs);

  return (
    <Loader isLoading={isLoading}>
      <FlatListComp
        scrollview
        data={details}
        renderItem={({item, index}: any) => (
          <Animatable.View
            duration={700}
            delay={100}
            animation={index % 2 == 0 ? 'fadeInLeft' : 'fadeInRight'}
            key={index}
            style={style.container}>
            <Text h3 bold style={style.title}>
              {item?.FieldValues.Header}
            </Text>
            <Text h4 medium style={{...style.title, marginTop: 2 * BW()}}>
              {item?.FieldValues.Main_Address}
            </Text>
            {item?.Name == 'Abu Dhabi' ? (
              <View style={{...style.row, marginTop: 12 * BW()}}>
                <View style={style.row}>
                  <Text h4 style={style.lightPrimaryColor}>
                    {t('PhoneNumber')} :
                  </Text>
                  <Text h4 style={{...style.title, marginStart: 12 * BW()}}>
                    600565554
                  </Text>
                </View>
                <Line style={style.line} />
                <View style={{...style.row, marginStart: 24 * BW()}}>
                  <Text h4 style={style.lightPrimaryColor}>
                    {t('POBox')} :
                  </Text>
                  <Text h4 style={{...style.title, marginStart: 12 * BW()}}>
                    1266
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{...style.row, marginTop: 12 * BW()}}>
                <View style={style.row}>
                  <Text h4 style={style.lightPrimaryColor}>
                    {t('PhoneNumber')} :
                  </Text>
                  <Text h5 style={{...style.title, marginStart: 12 * BW()}}>
                    600565554
                  </Text>
                </View>
                <Line style={style.line} />
                <View style={{...style.row, marginStart: 24 * BW()}}>
                  <Text h4 style={style.lightPrimaryColor}>
                    {t('POBox')} :
                  </Text>
                  <Text h5 style={{...style.title, marginStart: 12 * BW()}}>
                    48666
                  </Text>
                </View>
              </View>
            )}
            <Button
              style={style.btnDirection}
              medium
              icon={require('../../../assets/icons/ArrowSquareUpLeft.png')}
              title={t('GetDirection')}
              onPress={() => {
                item?.Name == 'Abu Dhabi'
                  ? Linking.openURL(
                      'https://www.google.com/maps/search/?api=1&query=24.46238084516751,54.32418821149612',
                    )
                  : Linking.openURL(
                      'https://www.google.com/maps/search/?api=1&query=25.255861,55.4119458',
                    );
              }}
              styleText={{
                color: style.lightSecondaryColor.color,
                marginStart: 4 * BW(),
              }}
              styleIcon={{
                tintColor: style.lightSecondaryColor.color,
                transform: [{rotate: isArabic() ? '0deg' : '180deg'}],
              }}
              containerIcon={style.containerIconDirection}
            />
          </Animatable.View>
        )}
      />
    </Loader>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    line: {
      marginVertical: 0,
      height: '100%',
      width: 0 * BW(),
      marginStart: 24 * BW(),
    },
    container: {
      backgroundColor: colors.primary,
      paddingVertical: 8 * BW(),
      paddingHorizontal: 12 * BW(),
      borderRadius: 10 * BW(),
      marginTop: 12 * BW(),
      overflow: 'hidden',
      width: '100%',
    },
    title: {
      color: colors.mainWhite,
    },

    btnDirection: {
      width: 'auto',
      height: 'auto',
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 0,
      borderRadius: 0,
      marginTop: 12 * BW(),
    },
    containerIconDirection: {
      width: 20 * BW(),
      height: 20 * BW(),
    },
    lightSecondaryColor: {
      color: colors.lightSecondaryColor,
    },
    lightPrimaryColor: {
      color: colors.lightPrimaryColor,
    },
  });
