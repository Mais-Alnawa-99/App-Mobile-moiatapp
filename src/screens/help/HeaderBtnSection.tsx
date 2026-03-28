import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as Animatable from 'react-native-animatable';

import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import Button from '../../component/Button';
import Line from '../../component/Line';
import FlatListComp from '../../component/FlatList';

export default function HeaderBtnSection(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  const {activeBtn, setActiveBtn} = props;
  let btns = [
    {
      title: t('ContactUs'),
    },
    {
      title: t('MessageUs'),
    },
  ];

  return (
    <View style={[style.btnHeaderContainer, style.row]}>
      <FlatListComp
        horizontal
        scrollview
        data={btns}
        contentContainerStyle={{flex: 1, alignItems: 'center'}}
        renderItem={({item, index}: any) => (
          <Fragment key={index}>
            <View style={{flex: 1}}>
              <Button
                style={{...style.btn, minHeight: 45 * BW()}}
                h3
                medium
                title={item.title}
                styleText={style.title}
                onPress={() => {
                  setActiveBtn(index);
                }}
              />
              <Animatable.View
                delay={100}
                duration={500}
                animation={activeBtn == index ? 'fadeIn' : 'fadeOut'}
                style={{
                  ...style.underLine,
                }}
              />
            </View>
            {index != btns.length - 1 && <Line style={style.line} />}
          </Fragment>
        )}
      />
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    btnHeaderContainer: {
      backgroundColor: colors.primary,
      padding: 8 * BW(),
      paddingVertical: 0,
      borderRadius: 12 * BW(),
      overflow: 'hidden',
    },
    title: {
      color: colors.mainWhite,
    },
    line: {
      marginVertical: 0,
      height: '40%',
      width: 0 * BW(),
    },
    underLine: {
      marginVertical: 0,
      backgroundColor: colors.lightSecondaryColor,
      height: 0 * BW(),
      borderWidth: 1.8 * BW(),
      borderColor: colors.lightSecondaryColor,
      borderRadius: 10 * BW(),
      width: '60%',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 0,
    },
    btn: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 0,
      borderRadius: 0,
      flex: 1,
    },
    btnDetails: {
      height: 'auto',
      backgroundColor: 'transparent',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      padding: 0,
      borderRadius: 0,
      flex: 1,
      marginTop: 0,
      width: '100%',
    },
  });
