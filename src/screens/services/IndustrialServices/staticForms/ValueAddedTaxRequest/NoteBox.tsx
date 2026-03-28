import React from 'react';
import {
  View,
  Linking,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';

import Text from '../../../../../component/Text';
import {BW} from '../../../../../style/theme';
import {useTheme} from '@react-navigation/native';
import NavigationService from '../../../../../navigation/NavigationService';
import {isArabic} from '../../../../../locales';

const NoteBox = () => {
  const {i18n} = useTranslation();
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const handleLinkPress = () => {
    NavigationService.navigate('RenewalIndustrialProductionLicense');
  };

  return (
    <View style={styles.infoContainer}>
      <Icon
        name="info-circle"
        size={30 * BW()}
        color={colors.gray}
        style={styles.icon}
      />

      <Text h4 bold>
        {isArabic() ? 'ملاحظة مهمة:' : 'Important Note:'}
      </Text>

      <Text h4 style={styles.paragraph}>
        {isArabic()
          ? 'قبل طلب شهادة القيمة المضافة، يرجى التأكد من أن جميع تفاصيل الرخصة محدثة (المنتجات، المواد الأولية المحلية و الأجنبية، المعدات و الآلات)، تأكد من اضافة الخدمات (الماء و الكهرباء) كمادة أولية باستخدام الرمز المنسق 27160000-الطاقة الكهربائية واختيار النوع: خدمات.'
          : 'Before requesting a Value-Added Certificate, please ensure that your License Details (Products, Raw Materials (Local and Foreign), Machinery and Equipment) is updated. Additionally, ensure you add your Utilities as a Raw Material with HS Code 27160000-Electrical energy. and Type Utility.'}
      </Text>

      {/* <Text h4 style={styles.paragraph}>
        {isArabic()
          ? 'لتحديث معلومات الرخصة، يرجى التقديم على خدمة '
          : 'To update your License Details, you can do so through the '}
      </Text>
      <TouchableOpacity onPress={handleLinkPress}>
        <Text h4 style={styles.link}>
          {isArabic()
            ? 'تعديل رخصة صناعية'
            : 'Modify Industrial Production License'}
        </Text>
      </TouchableOpacity> */}

      <Text h4 style={styles.paragraph}>
        {isArabic()
          ? 'للتأكد من سرعة اتمام طلبكم، يرجى ارفاق الملفات التالية:'
          : 'To process your application faster, please attach the following pages in the indicated attachments fields in the end of this application:'}
      </Text>

      <View style={styles.list}>
        {(isArabic()
          ? [
              'صفحة حساب الأرباح/الخسائر',
              'صفحة المخزون',
              'صفحة الأصول الثابتة',
              'صفحة تكلفة المبيعات',
              'صفحة المصاريف العامة و الإدارية',
            ]
          : [
              'Profit/Loss Account Page',
              'Inventory Page',
              'Fixed Asset Page',
              'Cost of Sales Page',
              'General and Administrative Expenses Page',
            ]
        ).map((item, index) => (
          <View key={index} style={styles.row}>
            <View
              style={{
                width: 4 * BW(),
                height: 4 * BW(),
                backgroundColor: colors.black,
                borderRadius: 20 * BW(),
              }}
            />
            <Text h4>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NoteBox;

const getStyle = (colors: any) =>
  StyleSheet.create({
    paragraph: {
      marginTop: 8 * BW(),
    },

    link: {
      color: '#007BFF',
      textDecorationLine: 'underline',
    },
    list: {
      paddingStart: 16 * BW(),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4 * BW(),
    },
    infoContainer: {
      borderColor: colors.gray,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      borderRadius: 6 * BW(),
      marginTop: 24 * BW(),
      paddingTop: 12 * BW(),
    },
    icon: {
      marginRight: 10 * BW(),
      position: 'absolute',
      top: -16 * BW(),
      left: 12 * BW(),
      zIndex: 11,
    },
  });
