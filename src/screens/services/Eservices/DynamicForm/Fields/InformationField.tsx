import React from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {BW} from '../../../../../style/theme';
import RenderHtmlComponent from '../../../../../component/renderHtml/RenderHtmlReadMore';
import {FieldTypeEnum} from '../Constants';

const InformationField = ({
  service,
  formData,
  title,
  formValues,
  handleChange,
  field,
  styleBody,
}: any) => {
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {t} = useTranslation();

  return (
    <>
      {(field?.formSectionFieldTypeName === 'Information' ||
        field?.fieldTypeId === FieldTypeEnum.Information) && (
        <View style={style.infoContainer}>
          <Icon
            name="info-circle"
            size={30 * BW()}
            color={colors.gray}
            style={style.icon}
          />
          <RenderHtmlComponent
            noAutoWidth
            styleBody={styleBody}
            description={title}
          />
        </View>
      )}
    </>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    infoContainer: {
      borderColor: colors.gray,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      borderRadius: 6 * BW(),
      marginTop: 18 * BW(),
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

export default InformationField;
