import React, {useEffect, useState} from 'react';
import {View, Switch, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useTheme} from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';

import Section from './Section';
import {_setLang} from '../../Lang';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {setSetting} from '../../../redux/reducers/General/settings';

export default function Biometric() {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const {settings}: any = useAppSelector(state => state.settings);
  const [available, setAvailable] = useState(false);
  const dispatch = useAppDispatch();
  const _setSetting = () => {
    authenticate();
  };

  const checkAvailable = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const {available} = await rnBiometrics.isSensorAvailable();
    if (!available) {
      setAvailable(false);
      dispatch(setSetting({enabledBiometric: false}));
    } else {
      setAvailable(true);
    }
  };
  useEffect(() => {
    checkAvailable();
  }, []);

  const authenticate = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const {success} = await rnBiometrics.simplePrompt({
      promptMessage: t('AuthenticateToAccess'),
    });

    if (success) {
      if (!!settings.enabledBiometric) {
        dispatch(setSetting({enabledBiometric: false}));
      } else {
        await dispatch(setSetting({enabledBiometric: true}));
      }
    }
  };

  return (
    available && (
      <Section
        icon={require('../../../assets/settings/FingerprintSimple.png')}
        title={t('EnableBiometric')}
        endChildren={
          <View>
            <Switch
              trackColor={{
                false: '#E2E8F0',
                true: colors.secondaryColor,
              }}
              thumbColor={settings.enabledBiometric ? colors.white : '#fff'}
              ios_backgroundColor={'#E2E8F0'}
              onValueChange={() => _setSetting()}
              value={settings.enabledBiometric}
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            />
          </View>
        }
        onPress={() => _setSetting()}
      />
    )
  );
}
