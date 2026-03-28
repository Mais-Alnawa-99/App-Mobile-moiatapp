import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import Text from '../../component/Text';
import Accordion from '../../component/Accordion';

export default function FAQitem(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  return (
    <Accordion
      title={props?.item?.FieldValues.Question}
      onPress={() => props.setActiveBtn(!!props.isActive ? null : props.index)}
      expandedDefault={props.isActive}
      styleConatiner={{
        marginTop: props.index == 0 ? 0 : 12 * BW(),
      }}
      styleHeader={{
        backgroundColor: colors.white,
      }}
      styleTilte={{
        color: props.isActive ? colors.secondaryColor : colors.text,
      }}
      styleIcon={{
        tintColor: colors.secondaryColor,
      }}
      showBorder
      styleBody={{paddingHorizontal: 0}}>
      <View key={props.index} style={style.item}>
        <Text h4 medium style={style.title}>
          {props.item?.FieldValues.Answer}
        </Text>
      </View>
    </Accordion>
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
    },
    item: {
      padding: 16 * BW(),
      backgroundColor: colors.white,
    },
    title: {
      lineHeight: 24 * BW(),
    },
  });
