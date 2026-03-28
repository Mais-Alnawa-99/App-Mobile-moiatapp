import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import {parseJSON} from '../../utils';
import Text from '../../../../component/Text';
import NavigationService from '../../../../navigation/NavigationService';
import DashedLine from '../../../../component/DashedLine';
import VersionCard from './VersionCard';

export default function StandardCard({
  item,
  index,
}: {
  item: any;
  index: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const versions = parseJSON(item?.StandardVersions);

  return (
    <Animatable.View
      duration={1000}
      delay={150}
      animation={index % 2 != 0 ? 'fadeInLeft' : 'fadeInRight'}
      key={index}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
        onPress={() => {
          NavigationService.navigate('StandardsDetails', item);
        }}>
        <Text
          h3
          bold
          style={{
            color: colors.secondaryColor,
          }}>
          {item?.StandardNumber}
        </Text>
        <View style={{marginTop: 4 * BW(), gap: 4 * BW()}}>
          <Text h4>{isArabic() ? item?.TitleArabic : item?.TitleEnglish}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.row}>
              <Text h4>{t('Custom_Labels.StandardsPublishDate')} :</Text>
              <Text h4>{item?.PublishDate?.split('T')[0]}</Text>
            </View>

            <View style={styles.row}>
              <Text h4>{t('Custom_Labels.StandardsYear')} :</Text>
              <Text h4>{item?.StandardYear}</Text>
            </View>
          </View>
          {versions?.length > 0 && <DashedLine />}
          <VersionCard item={item} />
        </View>
      </TouchableOpacity>
    </Animatable.View>
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
    card: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 16 * BW(),
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
