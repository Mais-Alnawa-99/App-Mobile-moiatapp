import React, {useState, useEffect, Fragment} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../../style/theme';
import Text from '../../../../../component/Text';
import Input from '../../../../../component/input/Input';
import RenderHtmlComponent from '../../../../../component/renderHtml/RenderHtmlReadMore';

const TermsConditionField = ({
  service,
  formData,
  title,
  formValues,
  handleChange,
  field,
  requiredFields,
  isDisabled,
}: any) => {
  const {colors} = useTheme();
  const style = getStyle(colors);
  const {t} = useTranslation();

  return (
    <>
      {field?.formSectionFieldTypeName === 'TermsCondition' && (
        <>
          <RenderHtmlComponent noAutoWidth description={title} />
          <Input
            checkbox
            disabled={isDisabled}
            viewStyle={{marginTop: 0}}
            // requiredStar={requiredFields[field.entityFieldId]}
            requiredStar
            title={t('AgreeWithTermsConditions')}
            checked={formValues[field.entityFieldId]?.value || false}
            onPress={() =>
              handleChange(
                field.entityFieldId,
                !formValues[field.entityFieldId]?.value,
                field,
              )
            }
          />
        </>
      )}

      {field?.formSectionFieldTypeName === 'Warning' && (
        <View style={style.warningContainer}>
          <Text>⚠️</Text>
          <RenderHtmlComponent
            styleBody={{backgroundColor: 'transparent'}}
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
    warningContainer: {
      backgroundColor: '#FFF9E1',
      borderColor: '#FFD700',
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      borderRadius: 6 * BW(),
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8 * BW(),
    },
  });

export default TermsConditionField;
