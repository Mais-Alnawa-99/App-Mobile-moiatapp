import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BH, BW} from '../../style/theme';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../redux/store';
import Text from '../../component/Text';
import {isArabic} from '../../locales';
import NavigationService from '../NavigationService';
import {useDrawerStatus} from '@react-navigation/drawer';
import * as Animatable from 'react-native-animatable';

export type Props = {
  name: string;
};

const DrawerLabel = (props: any) => {
  const {colors} = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [active, setActive] = useState<boolean>(false);
  const [accordionActive, setAccordionActive] = useState<number>();

  const onPress = (route: any) => {
    NavigationService.navigate(route);
  };
  const drawerStatus = useDrawerStatus();
  const [animation, setAnimation] = useState('');
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    if (drawerStatus === 'open') {
      setAnimation(isArabic() ? 'fadeInRightBig' : 'fadeInLeftBig');
      setDelay(200);
    } else {
      setAnimation('');
      setDelay(0);
    }
  }, [drawerStatus]);
  return (
    <Animatable.View
      animation={animation}
      delay={delay}
      key={`${animation}-d`}
      duration={130 * props.index}>
      <View
        style={[
          styles.container,
          props.home && {display: 'none'},
          styles.content,
        ]}>
        <Image source={props.icon} style={styles.icon} />
        <Text h3 medium style={styles.title}>
          {props.title}
        </Text>
        <View style={styles.line} />
        <Image
          style={styles.nextIcon}
          source={require('../../assets/drawer/next.png')}
        />
      </View>
    </Animatable.View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    title: {
      color: colors.mainWhite,
      marginLeft: 8 * BW(),
    },
    icon: {
      width: 20 * BW(),
      height: 20 * BW(),
      resizeMode: 'contain',
      tintColor: colors.mainWhite + 'aa',
    },
    nextIcon: {
      width: 10 * BW(),
      height: 12 * BW(),
      resizeMode: 'contain',
      tintColor: colors.secondaryColor,
      transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16 * BW(),
      paddingVertical: 8 * BW(),
      minHeight: 46 * BW(),
    },
    line: {
      flex: 1,
      borderBottomColor: colors.mainWhite,
      borderBottomWidth: 0.4 * BW(),
      marginHorizontal: 12 * BW(),
    },
    focused: {
      transform: [{rotate: '90deg'}],
    },
    content: {
      backgroundColor: colors.backgroundDrawerContent,
      borderRadius: 8 * BW(),
      overflow: 'hidden',
    },
  });

export default DrawerLabel;

{
  /* <TouchableOpacity
activeOpacity={1}
onPress={() => onPress(props.route)}
style={styles.container}>
<Image source={props.icon} style={styles.icon} />
<Text h3 medium style={styles.title}>
  {props.title}
</Text>
<View style={styles.line} />
<Image
  style={styles.nextIcon}
  source={require('../../assets/drawer/next.png')}
/>
</TouchableOpacity>
); */
}
