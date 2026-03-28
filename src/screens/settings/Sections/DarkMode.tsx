import React, {useEffect} from 'react';
import {View, Switch, useColorScheme} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useTheme} from '@react-navigation/native';
import Section from './Section';
import {_setLang} from '../../Lang';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {setSetting} from '../../../redux/reducers/General/settings';

export default function DarkMode() {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const {settings}: any = useAppSelector(state => state.settings);
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useAppDispatch();

  const _setSetting = () => {
    dispatch(setSetting({enabledDarkMode: !!!settings.enabledDarkMode}));
  };
  const setIsDarkModeDefault = () => {
    if (isDarkMode && settings.enabledDarkMode == undefined) {
      dispatch(setSetting({enabledDarkMode: true}));
    }
  };
  useEffect(() => {
    setIsDarkModeDefault();
  }, []);

  return (
    <Section
      icon={require('../../../assets/settings/Moon.png')}
      title={t('DarkMode')}
      endChildren={
        <View>
          <Switch
            trackColor={{
              false: '#E2E8F0',
              true: colors.secondaryColor,
            }}
            thumbColor={settings.enabledDarkMode ? colors.white : '#fff'}
            ios_backgroundColor={'#E2E8F0'}
            onValueChange={() => _setSetting()}
            value={settings.enabledDarkMode}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
          />
        </View>
      }
      onPress={() => _setSetting()}
    />
  );
}
