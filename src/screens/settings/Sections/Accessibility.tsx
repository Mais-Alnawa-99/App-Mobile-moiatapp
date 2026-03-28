import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '../../../component/Text';
import {BW} from '../../../style/theme';
import {useTheme} from '@react-navigation/native';
import NextView from './NextView';
import Section from './Section';
export default function Accessibility() {
  const {t} = useTranslation();
  return (
    <Section
      icon={require('../../../assets/settings/PersonArmsSpread.png')}
      title={t('Accessibility')}
      endChildren={<NextView />}
    />
  );
}
