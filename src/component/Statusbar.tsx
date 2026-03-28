import React, {PropsWithChildren, useCallback, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Platform,
} from 'react-native';
import {useAppSelector} from '../redux/store';
import {useFocusEffect} from '@react-navigation/native';

type SectionProps = PropsWithChildren<{
  backgroundColor?: string;
  barStyle?: any;
  withoutStatusbar?: boolean;
}>;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export default function CustomStatusBar({
  backgroundColor,
  barStyle,
  withoutStatusbar,
  ...props
}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {settings}: any = useAppSelector(state => state.settings);

  return (
    <View
      style={[
        {
          height: STATUSBAR_HEIGHT,
        },
        {
          backgroundColor: 'transparent',
        },
      ]}>
      <SafeAreaView>
        {!withoutStatusbar && (
          <StatusBar
            barStyle={
              barStyle
                ? barStyle
                : (isDarkMode && settings?.enabledDarkMode == undefined) ||
                  settings?.enabledDarkMode
                ? 'light-content'
                : 'dark-content'
            }
            translucent
            backgroundColor={backgroundColor}
            {...props}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
