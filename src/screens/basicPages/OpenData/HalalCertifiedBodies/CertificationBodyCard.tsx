import React from 'react';
import {StyleSheet, View, Linking, TouchableOpacity} from 'react-native';
import Text from '../../../../component/Text';
import {BW} from '../../../../style/theme';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {isArabic} from '../../../../locales';
import DashedLine from '../../../../component/DashedLine';

export default function CertificationBodyCard({item}: {item: any}) {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();

  return (
    <View style={styles.card}>
      <Text h2 bold>
        {isArabic() ? item.CertificationBodyAR : item.CertificationBodyEN}
      </Text>
      <View style={[styles.row, {marginTop: 6 * BW()}]}>
        <Text h4 medium>
          {item.Address?.trim?.()}
        </Text>
      </View>
      <DashedLine />
      <View style={styles.row}>
        <Text h4 style={{color: colors.darkGray}}>
          {t('PhoneNumber')}:
        </Text>
        <Text h4 medium>
          {item.Phone}
        </Text>
      </View>
      <DashedLine />

      <View style={styles.row}>
        <Text h4 style={{color: colors.darkGray}}>
          {t('EmailAddress')}:
        </Text>
        <Text h4 medium>
          {item.Email}
        </Text>
      </View>
      <DashedLine />

      <View style={styles.row}>
        <Text h4 style={{color: colors.darkGray}}>
          {t('IL.IssueDate')}:
        </Text>
        <Text h4 medium>
          {item.IssueDate?.split('T')[0]}
        </Text>
      </View>
      <DashedLine />

      <View style={styles.row}>
        <Text h4 style={{color: colors.darkGray}}>
          {t('IL.ExpiryDate')}:
        </Text>
        <Text h4 medium>
          {item.ExpiryDate?.split('T')[0]}
        </Text>
      </View>
      {/* {item.CertificateDocument && (
        <TouchableOpacity
          onPress={() => Linking.openURL(item.CertificateDocument)}
          style={styles.link}>
          <Text style={{color: colors.secondaryColor}}>
            Download Certificate
          </Text>
          <AntDesign
            name="download"
            size={14}
            color={colors.secondaryColor}
            style={{marginStart: 4}}
          />
        </TouchableOpacity>
      )} */}
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      borderWidth: 0.43 * BW(),
      borderColor: colors.secondaryColor,
      borderRadius: 8 * BW(),
      padding: 16 * BW(),
      paddingHorizontal: 18 * BW(),
      marginBottom: 12 * BW(),
      backgroundColor: colors.white,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8 * BW(),
    },
    link: {
      marginTop: 10 * BW(),
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
