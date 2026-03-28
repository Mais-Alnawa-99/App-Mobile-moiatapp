import React, {Fragment, useState} from 'react';
import {Image, Linking, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Button from './Button';
import {BW} from '../style/theme';
import Line from './Line';
import Text from './Text';

export type Props = {
  name: string;
};

const Social = (props: any) => {
  const {colors} = useTheme();
  const styles = getStyle(colors);
  let btns = [
    {
      icon: require('../assets/socialMidea/LinkedinLogo.png'),
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/company/moiatuae',
    },
    {
      icon: require('../assets/socialMidea/FacebookLogo.png'),
      name: 'Facebook',
      link: 'https://www.facebook.com/Moiatuae/',
    },
    {
      icon: require('../assets/socialMidea/InstagramLogo.png'),
      name: 'Instagram',
      link: 'https://www.instagram.com/moiatuae/',
    },
    {
      icon: require('../assets/socialMidea/twitter.png'),
      name: 'Twitter',
      link: 'https://x.com/MoIATUAE',
    },
    {
      icon: require('../assets/socialMidea/YoutubeLogo.png'),
      name: 'YouTube',
      link: 'https://www.youtube.com/channel/UC_nXrFpQ3hn72Qh7g_R1IiA',
    },
  ];

  return (
    <>
      <View style={{...styles.container, ...props.style}}>
        {btns.map((item, index) => (
          <Fragment key={index}>
            <Button
              onPress={() => {
                Linking.openURL(item.link);
              }}
              icon={item.icon}
              style={{...styles.btnContainer, ...props.btnContainer}}
              containerIcon={{...styles.containerIcon, ...props.btn}}
              styleIcon={{...styles.icon, ...props.iconStyle}}
            />
            {props?.withLine && index !== btns.length - 1 && (
              <Line style={styles.line} />
            )}
          </Fragment>
        ))}
      </View>
    </>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    btnContainer: {
      width: 30 * BW(),
      height: 30 * BW(),
      zIndex: 6,
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerIcon: {
      width: '80%',
      height: '80%',
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16 * BW(),
      paddingTop: 8 * BW(),
      paddingBottom: 20 * BW(),
      position: 'absolute',
      bottom: 0,
      width: '100%',
      minHeight: 80 * BW(),
      gap: 12 * BW(),
      backgroundColor: colors.darkBlue,
    },
    line: {
      marginVertical: 0,
      height: '50%',
      width: 0 * BW(),
    },
  });

export default Social;
