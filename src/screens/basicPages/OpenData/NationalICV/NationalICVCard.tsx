import React from 'react';
import {StyleSheet, View, Linking, TouchableOpacity} from 'react-native';
import Text from '../../../../component/Text';
import {BW} from '../../../../style/theme';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import DashedLine from '../../../../component/DashedLine';

export default function NationalICVCard({item}: {item: any}) {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();

  return (
    <View style={styles.card}>
      <View style={[styles.row, {marginBottom: 8 * BW()}]}>
        <Text h2 bold>
          {item.ConformityBodyName}
        </Text>
      </View>

      <View style={[styles.row]}>
        <Text h4 style={{color: colors.darkGray}}>
          {item.Designation}: {'  '}
          <Text h4 medium>
            {item.MemberName}
          </Text>
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
          {t('PhoneNumber')}:
        </Text>
        <Text h4 medium>
          {item.Numbers}
        </Text>
      </View>

      {/* 
      {item.CertificateDocument && (
        <TouchableOpacity
          onPress={() => Linking.openURL(item.CertificateDocument)}
          style={styles.link}>
          <Text style={{ color: colors.secondaryColor }}>
            Download Certificate
          </Text>
        </TouchableOpacity>
      )} 
      */}
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
      flexDirection: 'row',
      gap: 8 * BW(),
    },
    link: {
      marginTop: 10 * BW(),
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
