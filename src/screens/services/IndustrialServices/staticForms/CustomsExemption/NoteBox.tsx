import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';

import Text from '../../../../../component/Text';
import {BW} from '../../../../../style/theme';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../../locales';
import RenderHtmlComponent from '../../../../../component/renderHtml/RenderHtmlReadMore';

const NoteBox = ({note, html}: any) => {
  const {i18n} = useTranslation();
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  return (
    <View style={styles.infoContainer}>
      <Icon
        name="info-circle"
        size={30 * BW()}
        color={colors.gray}
        style={styles.icon}
      />

      <Text h4 style={styles.paragraph}>
        {note ? (
          html ? (
            <RenderHtmlComponent description={note} noAutoWidth />
          ) : (
            note
          )
        ) : isArabic() ? (
          'جميع المواد المضافة في الطلب يجب ان تكون من نفس الفاتورة/قائمة المواد في الشحنة/بوليصة الشحن'
        ) : (
          'All added material in this application should be from the same Commercial Invoice/Packing List/Bill of Lading'
        )}
      </Text>
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
      marginTop: 16 * BW(),
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
