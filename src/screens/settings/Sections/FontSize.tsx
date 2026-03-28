import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {BW, setFontSize} from '../../../style/theme';
import {useTheme} from '@react-navigation/native';
import Section from './Section';
import {_setLang} from '../../Lang';
import Slider from '@react-native-community/slider';
import {useAppDispatch} from '../../../redux/store';

export default function FontSize() {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  const _setFontSizeValue = (value: number) => {
    setFontSize(value);
  };
  return (
    <Section
      icon={require('../../../assets/settings/TextAa.png')}
      title={t('FontSize')}
      style={styles.row}
      endChildren={
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 8 * BW(),
          }}>
          <Slider
            style={{width: '100%'}}
            minimumValue={-2} // Minimum scale (50%)
            maximumValue={2}
            minimumTrackTintColor={colors.secondaryColor}
            maximumTrackTintColor="#E2E8F0"
            thumbTintColor={colors.secondaryColor}
            step={1}
            value={0}
            onValueChange={value => {
              _setFontSizeValue(value);
            }}
          />
        </View>
      }
    />
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  });
