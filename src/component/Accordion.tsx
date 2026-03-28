import React, {useState, ReactNode} from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';
import Animated, {Easing, withSpring} from 'react-native-reanimated';

import {BH, BW} from '../style/theme';
import Text from './Text';
import {isArabic} from '../locales';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface AccordionProps {
  title?: string;
  children?: ReactNode;
  styleHeader?: {};
  styleBody?: {};
  showBorder?: boolean;
  onPress?: any;
  styleConatiner?: {};
  expandedDefault?: boolean;
  bold?: boolean;
  styleTilte?: {};
  styleIcon?: {};
}
const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  styleHeader,
  styleBody,
  showBorder,
  onPress,
  styleConatiner,
  expandedDefault = false,
  bold,
  styleTilte,
  styleIcon,
}) => {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const animationConfig = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeIn,
    },
    delete: {
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(animationConfig);
    // setExpanded(!expanded);
  };
  const togglePress = () => {
    toggleAccordion();
    if (onPress) onPress();
  };
  return (
    <View style={[styles.container, styleConatiner]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={togglePress}
        style={[
          styles.header,
          expandedDefault && styles.headerExpanded,
          styleHeader,
        ]}>
        <Text
          h4
          medium={!bold}
          bold={bold}
          style={{width: '90%', color: colors.textPrimaryColor, ...styleTilte}}>
          {title}
        </Text>
        <Animatable.View
          animation={{
            from: {
              rotate: expandedDefault ? '0deg' : '180deg',
            },
            to: {
              rotate: expandedDefault ? '180deg' : '0deg',
            },
          }}
          duration={400}
          useNativeDriver>
          <Image
            style={{
              transform: [{rotate: '-90deg'}],
              width: 18 * BW(),
              height: 18 * BW(),
              resizeMode: 'contain',
              tintColor: colors.iconPrimaryColor,
              ...styleIcon,
            }}
            source={require('../assets/icons/back.png')}
          />
        </Animatable.View>
      </TouchableOpacity>
      {expandedDefault && showBorder && (
        <View style={{overflow: 'hidden'}}>
          <View
            style={{
              borderStyle: 'dashed',
              borderWidth: 0.4 * BW(),
              borderColor: colors.primaryColor,
            }}
          />
        </View>
      )}
      {expandedDefault && (
        <View style={{overflow: 'hidden'}}>
          <Animated.View
            style={[
              expandedDefault ? styles.expandedBody : styles.body,
              styleBody,
            ]}>
            {children}
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    header: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: colors.primaryColor + '22',
      width: '100%',
      minHeight: 50 * BH(),
      borderRadius: 6 * BW(),
      paddingHorizontal: 16 * BW(),
      paddingVertical: 8 * BW(),
    },
    headerExpanded: {
      borderTopEndRadius: 6 * BW(),
      borderTopStartRadius: 6 * BW(),
      borderRadius: 0 * BW(),
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
      borderBottomEndRadius: 12 * BW(),
      borderBottomStartRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
    },
  });

export default Accordion;
