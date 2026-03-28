import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import {parseJSON} from '../../utils';
import Text from '../../../../component/Text';
import DashedLine from '../../../../component/DashedLine';
import VersionActions from './VersionActions';

export default function VersionCard({
  item,
  index,
}: {
  item: any;
  index?: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const versions = parseJSON(item?.StandardVersions);

  return (
    <View style={{flex: 1}}>
      {versions?.map((v: any, idx: number) => {
        let lang = '';
        if (isArabic()) {
          lang =
            v?.Fields?.LanguageValue === 'English'
              ? 'الإنجليزية'
              : v?.Fields?.LanguageValue === 'Arabic'
              ? 'العربية'
              : 'الإنجليزية';
        } else {
          lang = v?.Fields?.LanguageValue;
        }
        const pageCount = v?.Fields?.NumberOfPages ?? 0;
        const price = v?.Fields?.Price?.toFixed(0) ?? '0';
        if (item?.versionRecordId && v?.RecordId !== item.versionRecordId) {
          return null;
        }
        return (
          <View>
            <View key={idx} style={styles.row}>
              <View style={styles.row}>
                <Text h4>
                  {lang} {t('Custom_Labels.StandardsVersion')} ({pageCount}){' '}
                  {t('Custom_Labels.StandardsNoOfPages')}
                </Text>
                <Text h4 bold style={{color: colors.secondaryColor}}>
                  {price} {isArabic() ? 'د.إ' : 'AED'}
                </Text>
              </View>
              <View>
                <VersionActions index={idx} item={v} parentItem={item} />
              </View>
            </View>
            {!item?.versionRecordId &&
              versions?.length > 1 &&
              idx != versions?.length - 1 && <DashedLine />}
          </View>
        );
      })}
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4 * BW(),
      flex: 1,
    },
    column: {
      alignItems: 'center',
      flexDirection: 'column',
      gap: 4 * BW(),
      flex: 1,
    },
    card: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 8 * BW(),
      marginBottom: 8 * BW(),
      borderRadius: 8 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    versionActions: {
      flexDirection: 'row',
      marginTop: 4 * BW(),
    },
    actionBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 4 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    previewBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 4 * BW(),
      backgroundColor: colors.white,
      borderColor: colors.textPrimaryColor,
      borderWidth: 1 * BW(),
    },
  });
