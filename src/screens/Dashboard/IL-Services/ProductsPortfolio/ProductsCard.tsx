import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Text from '../../../../component/Text';
import {BH, BW} from '../../../../style/theme';
import DashedLine from '../../../../component/DashedLine';
import Button from '../../../../component/Button';
import NavigationService from '../../../../navigation/NavigationService';
import {isArabic} from '../../../../locales';

export default function ProductsCard({
  item,
  index,
}: {
  item: any;
  index: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [isMultiline, setIsMultiline] = useState(false);

  return (
    <Animatable.View
      duration={600}
      delay={index * 100}
      animation={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
      key={index}>
      <View style={styles.card}>
        <View
          style={{
            ...styles.hsContainer,
            borderRadius: isMultiline ? 10 * BW() : 50 * BW(),
          }}>
          <Text
            h4
            style={{color: colors.golden, flex: 1}}
            onTextLayout={(e: any) => {
              const lineCount = e.nativeEvent.lines.length;
              lineCount > 1 && setIsMultiline(true);
            }}>
            {isArabic() ? item?.HsCodeNameAr : item?.HsCodeNameEn}
          </Text>
        </View>
        <View style={{marginVertical: 8 * BW()}}>
          {item?.DescriptionAr && (
            <Text h2 bold style={{color: colors.darkGray}}>
              {isArabic() ? item?.DescriptionAr : item?.DescriptionEn}
            </Text>
          )}
          {item?.ProductNameAr && (
            <Text h3 style={{color: colors.darkGray}}>
              {isArabic() ? item?.ProductNameAr : item?.ProductNameEn}
            </Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text h4>{t('TotalValue')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.TotalValue || '-'}
          </Text>
        </View>
        <DashedLine style={{marginVertical: 2 * BW()}} />

        <View style={styles.infoRow}>
          <Text h4>{t('IL.TotalQuantity')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.TotalQuantity || '-'}
          </Text>
        </View>

        <DashedLine style={{marginVertical: 2 * BW()}} />

        <View style={styles.infoRow}>
          <Text h4>{t('IL.Dimension')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.Dimension || '-'}
          </Text>
        </View>
        <DashedLine style={{marginVertical: 2 * BW()}} />

        <View style={styles.infoRow}>
          <Text h4>{t('IL.Specs')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.Specs || '-'}
          </Text>
        </View>
        <DashedLine style={{marginVertical: 2 * BW()}} />

        <View style={styles.infoRow}>
          <Text h4>{t('IL.UnitWeight')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.UnitWeight || '-'}
          </Text>
        </View>
        <DashedLine style={{marginVertical: 2 * BW()}} />

        <View style={styles.infoRow}>
          <Text h4>{t('IL.Unit')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.Unit || '-'}
          </Text>
        </View>
        <DashedLine style={{marginVertical: 2 * BW()}} />

        <View style={styles.infoRow}>
          <Text h4>{t('IL.MinOrder')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.MinOrder || '-'}
          </Text>
        </View>
        <View
          style={{
            ...styles.infoRow,
            justifyContent: 'flex-end',
            //  marginRight: 12 * BW(),
          }}>
          {/* <Button
            antDesign="edit"
            antDesignColor={colors.secondaryColor}
            title={t('IL.Edit')}
            styleText={{color: colors.secondaryColor}}
            style={styles.actionIconBtn}
            styleIcon={{margin: 0}}
            onPress={() =>
              NavigationService.navigate('EditProductPortfolio', {
                product: item,
              })
            }
          /> */}
        </View>
      </View>
    </Animatable.View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 12 * BW(),
      marginBottom: 8 * BH(),
      borderRadius: 16 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionIconBtn: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      marginRight: 8 * BW(),
      flexDirection: 'row-reverse',
      gap: 8,
    },
    hsContainer: {
      backgroundColor: colors.lightSecondaryColor + '45',
      alignSelf: 'flex-start',
      paddingHorizontal: 8 * BW(),
      paddingVertical: 2 * BH(),
      width: '100%',
    },
  });
