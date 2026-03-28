import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import Button from '../../component/Button';
import Search from '../../component/Search';
import NavigationService from '../../navigation/NavigationService';
import {isArabic} from '../../locales';

export default function SearchViewSection(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  return (
    <>
      {props?.fromSearch && (
        <Button
          onPress={() => NavigationService.goBack()}
          icon={require('../../assets/icons/back.png')}
          style={style.btnContainer}
          containerIcon={style.btn}
          styleIcon={{
            ...style.image,
            transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
          }}
        />
      )}
      <Search
        style={{marginTop: -8 * BW()}}
        search={props.search}
        setSearch={props.setSearch}
      />
      <Button
        style={style.containerBtnSwitch}
        icon={
          props.listView
            ? require('../../assets/icons/Grid.png')
            : require('../../assets/icons/list.png')
        }
        styleIcon={style.icon}
        onPress={() => {
          props.setListView(!props.listView);
        }}
      />
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    containerBtnSwitch: {
      backgroundColor: colors.secondaryColor,
      width: 42 * BW(),
      height: 42 * BW(),
      borderRadius: 100 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginStart: 16 * BW(),
      marginTop: 8 * BW(),
      alignSelf: 'flex-end',
    },
    icon: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
    btnContainer: {
      width: 20 * BW(),
      height: 30 * BW(),
      zIndex: 6,
      marginRight: 12 * BW(),
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: '100%',
      height: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'center',
      tintColor: colors.iconPrimaryColor,
    },
  });
