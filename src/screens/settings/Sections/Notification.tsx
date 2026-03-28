import React, {useEffect} from 'react';
import {View, Switch} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useTheme} from '@react-navigation/native';
import Section from './Section';
import {_setLang} from '../../Lang';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {setSetting} from '../../../redux/reducers/General/settings';
export default function Notification() {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const {settings}: any = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();
  const _setSetting = () => {
    dispatch(
      setSetting({enabledNotification: !!!settings.enabledNotification}),
    );
  };
  useEffect(() => {
    if (settings.enabledNotification == undefined) {
      _setSetting();
    }
  }, []);

  return (
    <Section
      icon={require('../../../assets/settings/Notification.png')}
      title={t('EnableNotifications')}
      endChildren={
        <View>
          <Switch
            trackColor={{
              false: '#E2E8F0',
              true: colors.secondaryColor,
            }}
            thumbColor={settings.enabledNotification ? colors.white : '#fff'}
            ios_backgroundColor={'#E2E8F0'}
            onValueChange={() => _setSetting()}
            value={settings.enabledNotification}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
          />
        </View>
      }
      onPress={() => _setSetting()}
    />
  );
}
