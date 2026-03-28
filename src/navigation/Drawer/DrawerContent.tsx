import React, {useEffect, useState} from 'react';

import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useDrawerStatus} from '@react-navigation/drawer';

import {BW} from '../../style/theme';
import {useTheme} from '@react-navigation/native';
import DrawerHeader from './DrawerHeader';
import {DrawerItemList} from './Overwrite/DrawerItemListOverwrite';
import {isArabic} from '../../locales';
import DrawerFooter from './DrawerFooter';
import Logout from './Logout';
import DrawerScreen from './DrawerScreen';
const DrawerContent = (props: any): JSX.Element => {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const drawerStatus = useDrawerStatus();
  const [animation, setAnimation] = useState('');
  const [animationLogout, setAnimationLogout] = useState('');

  const [delay, setDelay] = useState(0);
  // useEffect(() => {
  //   if (drawerStatus === 'open') {
  //     setAnimation(isArabic() ? 'fadeInRightBig' : 'fadeInLeftBig');
  //     setAnimationLogout('fadeIn');
  //     setDelay(200);
  //   } else {
  //     setAnimation('');
  //     setAnimationLogout('');
  //     setDelay(0);
  //   }
  // }, [drawerStatus]);

  let duration = 500;

  return (
    <>
      <Animatable.View
        delay={0}
        duration={800}
        key={`${animation}-22`}
        animation={{
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        }}
        style={{
          backgroundColor: colors.backgroundDrawer,
          flex: 1,
          height: '100%',
        }}>
        <DrawerHeader />
        <ScrollView
          contentContainerStyle={{paddingBottom: 130 * BW()}}
          showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation={animation}
            delay={delay}
            key={`${animation}-d`}
            duration={duration}
            style={styles.content}>
            <DrawerItemList {...props} />
          </Animatable.View>
        </ScrollView>
        {/* <ScrollView
          contentContainerStyle={{paddingBottom: 100 * BW()}}
          showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation={animation}
            delay={delay}
            key={`${animation}-d`}
            duration={duration}
            style={styles.content}>
            <DrawerScreen {...props} />
          </Animatable.View>
        </ScrollView> */}

        <Animatable.View
          animation={animationLogout}
          key={animationLogout}
          duration={duration}
          delay={delay}>
          <Logout />
        </Animatable.View>
      </Animatable.View>
      <DrawerFooter />
    </>
  );
};
export default DrawerContent;

const getStyle = (colors: any) =>
  StyleSheet.create({
    content: {
      backgroundColor: 'transparent',
      marginHorizontal: 16 * BW(),
      borderRadius: 18 * BW(),
      paddingVertical: 0 * BW(),
      marginTop: 0 * BW(),
    },
  });
