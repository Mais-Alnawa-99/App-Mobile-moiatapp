import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground, LayoutAnimation} from 'react-native';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BW, BH} from '../../../../style/theme';
import {getFactoryUsers} from '../../../../redux/reducers/I-Services/thunk/factory';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';

import FlatListComp from '../../../../component/FlatList';
import Loader from '../../../../component/Loader';
import UsersCard from './UsersCard';
import Button from '../../../../component/Button';
import NavigationService from '../../../../navigation/NavigationService';
import PageBg from '../../../../component/PageBg';
import Search from '../../../../component/Search';
import {isArabic} from '../../../../locales';

const FactoryUsers = () => {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [factoryUsers, setFactoryUsers] = useState([]);
  const [search, setSearch] = useState(false);
  const {userILData} = useAppSelector(store => store.userILData);
  const [searchParams, setSearchParams] = useState<{
    SearchText: string;
  }>({
    SearchText: '',
  });
  const licenseId = userILData?.Id;
  useEffect(() => {
    if (!search) return;

    const debounce = setTimeout(() => {
      _getFactoryUsers(true);
    }, 200);

    return () => clearTimeout(debounce);
  }, [searchParams.SearchText, search]);

  const _getFactoryUsers = (search = false) => {
    setIsLoading(true);
    let params: any = {licenseId: licenseId};

    if (search && searchParams.SearchText) {
      params.SearchText = searchParams.SearchText;
    }

    dispatch(
      getFactoryUsers({
        body: {...params, language: isArabic() ? 2 : 1},
      }),
    ).then(res => {
      if (
        res.meta.requestStatus === 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        const users = res.payload?.result?.FactoryUsers || [];
        setFactoryUsers(users);
      } else {
        setFactoryUsers([]);
      }
      setIsLoading(false);
    });
  };
  useFocusEffect(
    useCallback(() => {
      _getFactoryUsers(false);
    }, []),
  );

  const renderItem = ({item}: any, index: any) => {
    return (
      <UsersCard
        key={index}
        index={index}
        item={item}
        onDelete={_getFactoryUsers}
        licenseId={licenseId}
      />
    );
  };

  return (
    <PageBg>
      <View style={styles.container}>
        <ImageBackground
          source={colors.mainBackgroundImg}
          style={{
            height: '100%',
            width: '100%',
          }}>
          <Page
            withStatusBar
            styles={{padding: 8 * BW()}}
            header={
              <Header
                title={t('IL.FactoryUsers')}
                titleContainerStyle={{flex: 8}}
              />
            }
            withHeader>
            <Search
              search={searchParams.SearchText}
              setSearch={(text: string) => {
                setSearchParams(prev => ({...prev, SearchText: text}));
                if (text.trim() === '') {
                  _getFactoryUsers(false);
                  setSearch(false);
                } else {
                  setSearch(true);
                }
              }}
              style={{
                marginBottom: 16 * BW(),
                backgroundColor: colors.white,
                flex: undefined,
                borderRadius: 6 * BW(),
                paddingHorizontal: 12 * BW(),
                borderBottomWidth: 0,
              }}
            />
            <Loader isLoading={isLoading}>
              <>
                <FlatListComp
                  data={factoryUsers || []}
                  scrollview
                  renderItem={({item, index}: any) => renderItem({item}, index)}
                  noData={!isLoading}
                />
              </>
            </Loader>
          </Page>
          <Button
            Entypo="plus"
            EntypoColor="#fff"
            EntypoSize={28 * BW()}
            onPress={() => {
              NavigationService.navigate('AddFactoryUser', {
                licenseId: licenseId,
              });
            }}
            style={styles.floatingAddBtn}
          />
        </ImageBackground>
      </View>
    </PageBg>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },

    floatingAddBtn: {
      position: 'absolute',
      bottom: 20 * BH(),
      right: 25 * BW(),
      width: 50 * BW(),
      height: 50 * BW(),
      borderRadius: 28 * BW(),
      backgroundColor: colors.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      zIndex: 100,
    },
  });

export default FactoryUsers;
