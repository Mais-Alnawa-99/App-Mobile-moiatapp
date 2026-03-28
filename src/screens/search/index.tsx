import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Page from '../../component/Page';
import {BW} from '../../style/theme';
import Search from '../../component/Search';
import Text from '../../component/Text';
import NavigationService from '../../navigation/NavigationService';
import MediaSearch from './MideaSearch';
import {isArabic} from '../../locales';
import ServicesSearch from './ServicesSearch';
import Button from '../../component/Button';

export default function SearchScreen(props: any): JSX.Element {
  const params = props?.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {isLoading} = useAppSelector(state => state.Media.Media);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue('');
  }, [params.clearSearch]);
  return (
    <View style={style.container}>
      <Page
        withStatusBar
        ttsScopeId="search-scope"
        scrollEnabled={!isLoading}
        styles={{padding: 8 * BW()}}
        header={
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingEnd: 16 * BW(),
              marginTop: 8 * BW(),
            }}>
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
            <Search
              style={style.search}
              search={searchValue}
              setSearch={setSearchValue}
            />
          </View>
        }
        withHeader>
        {searchValue.length == 0 && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text h2 medium style={{color: colors.textPrimaryColor}}>
              {isArabic()
                ? 'اكتب للبحث عن الخدمات والوسائط ؟'
                : 'Type to search for services and media'}
            </Text>
          </View>
        )}
        {searchValue.length > 3 && (
          <View>
            <MediaSearch searchValue={searchValue} />
            <ServicesSearch searchValue={searchValue} />
          </View>
        )}
      </Page>
    </View>
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
    search: {
      borderWidth: 1 * BW(),
      borderColor: colors.gray,
      borderRadius: 8 * BW(),
      paddingHorizontal: 6 * BW(),
    },
    btnContainer: {
      width: 20 * BW(),
      height: 30 * BW(),
      zIndex: 6,
      marginHorizontal: 12 * BW(),
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
