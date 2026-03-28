import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {YMChat} from 'ymchat-react-native';
import * as Animatable from 'react-native-animatable';

import {BW} from '../../../style/theme';
import {isArabic} from '../../../locales';
import Button from '../../../component/Button';
import FlatListComp from '../../../component/FlatList';
import CardWithAnimation from '../../../component/CardWithAnimation';
import {callPhoneNumber} from '../../../component/Generalfunction';
import NavigationService from '../../../navigation/NavigationService';

export default function CallSection(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const startChat = () => {
    YMChat.setBotId('x1708618004141');
    YMChat.setCustomURL('https://r1.cloud.yellow.ai');
    YMChat.setVersion(2);
    YMChat.setEnableSpeech(true);
    YMChat.setMicIconColor('#ffffff');
    YMChat.setMicBackgroundColor(colors.secondaryColor);
    YMChat.setStatusBarColor(colors.white);

    YMChat.startChatbot();
  };

  let btns = [
    {
      title: t('CallUs'),
      icon: require('../../../assets/icons/Phone.png'),
      onPress: () => {
        callPhoneNumber('600565554');
      },
    },
    {
      title: t('ContactMinister'),
      icon: require('../../../assets/icons/Bank.png'),
      onPress: () => {
        NavigationService.navigate('ContactMinister', {
          url: isArabic()
            ? 'https://moiat.gov.ae/ar/contact-us/contact-minister'
            : 'https://moiat.gov.ae/en/contact-us/contact-minister',
          hideDrawer: true,
        });
      },
    },

    {
      title: t('ChatBot'),
      icon: require('../../../assets/icons/ChatDots.png'),
      onPress: () => {
        startChat();
      },
    },
  ];

  return (
    <Fragment>
      <View style={[style.row, {marginTop: 16 * BW()}]}>
        <FlatListComp
          horizontal
          scrollview
          scrollEnabled={false}
          data={btns}
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          renderItem={({item, index}: any) => (
            <Animatable.View
              key={index}
              duration={700}
              delay={100 * index}
              animation={'fadeInDown'}>
              <CardWithAnimation style={style.card}>
                <Button
                  style={{
                    ...style.btn,
                  }}
                  title={item.title}
                  icon={item.icon}
                  speakable
                  containerIcon={style.containerIcon}
                  styleIcon={style.styleIcon}
                  onPress={item.onPress ? () => item.onPress() : () => {}}
                />
              </CardWithAnimation>
            </Animatable.View>
          )}
        />
      </View>
      {/* <Animatable.View duration={700} delay={100} animation={'fadeInLeft'}>
        <Button
          title={t('EServicesHelp')}
          style={style.btnDetails}
          icon={require('../../../assets/icons/back.png')}
          onPress={() => {
            NavigationService.navigate('WebViewScreen', {
              url: isArabic()
                ? 'https://moiat.gov.ae/ar/e-services/help'
                : 'https://moiat.gov.ae/en/e-services/help',
              hideDrawer: true,
            });
          }}
          containerIcon={style.iconDetilas}
        />
      </Animatable.View> */}
      <Animatable.View duration={700} delay={100} animation={'fadeInRight'}>
        <Button
          title={t('FAQs')}
          style={style.btnDetails}
          speakable
          icon={require('../../../assets/icons/back.png')}
          onPress={() => {
            NavigationService.navigate('FAQs');
          }}
          containerIcon={style.iconDetilas}
        />
      </Animatable.View>
    </Fragment>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },

    title: {
      color: colors.white,
    },
    btn: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.white,
      justifyContent: 'space-around',
      padding: 8 * BW(),
      flexDirection: 'column',
      borderRadius: 0,
      borderWidth: 0,
    },
    card: {
      height: 100 * BW(),
      borderRadius: 4 * BW(),
      borderWidth: 0,
      flex: 1,
    },
    containerIcon: {
      width: 22 * BW(),
      height: 22 * BW(),
    },
    styleIcon: {
      tintColor: colors.secondaryColor,
    },
    btnDetails: {
      height: 'auto',
      backgroundColor: colors.white,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      padding: 8 * BW(),
      paddingHorizontal: 12 * BW(),
      borderRadius: 4 * BW(),
      minHeight: 45 * BW(),
      width: '100%',
      marginTop: 8 * BW(),
    },
    iconDetilas: {
      transform: [{rotate: !isArabic() ? '180deg' : '0deg'}],
      width: 14 * BW(),
      height: 16 * BW(),
      resizeMode: 'contain',
    },
  });
