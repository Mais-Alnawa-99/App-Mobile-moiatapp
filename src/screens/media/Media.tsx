import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import Page from '../../component/Page';
import Header from '../../component/Header';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {BW} from '../../style/theme';
import {setSetting} from '../../redux/reducers/General/settings';
import {searchMedia} from '../../redux/reducers/Media/thunk/media';
import SearchViewSection from './SearchViewSection';
import MediaList from './MediaList';
import HeaderBtnSection from './HeaderBtnSection';

export default function Media(props: any): JSX.Element {
  const params = props?.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const [search, setSearch] = useState(params?.searchValue || '');
  const [activeBtn, setActiveBtn] = useState(0);
  const [mediatType, setMediaType] = useState(3);

  const dispatch = useAppDispatch();

  const {settings}: any = useAppSelector(state => state.settings);

  const [listView, setListView] = useState(settings?.mediaListView);

  const {mediaData, isLoading, top, skip, isLoadingMore, count} =
    useAppSelector(state => state.Media.Media);

  const _searchMedia = (offset: any) => {
    dispatch(
      searchMedia({
        CategoryId: '',
        MediaTypeId: mediatType,
        Keyword: search,
        TagId: '',
        Skip: offset,
        Top: top,
      }),
    );
  };

  const _searchMoreMedia = () => {
    if (skip < count && !isLoadingMore)
      setTimeout(() => {
        _searchMedia(skip);
      }, 1000);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     _searchMedia(0);
  //   }, [search, mediatType]),
  // );
  useEffect(() => {
    _searchMedia(0);
  }, [search, mediatType]),
    useEffect(() => {
      if (!params?.fromSearch) {
        setSearch('');
      } else {
        setSearch(params?.searchValue);
      }
    }, []);

  const _setSetting = () => {
    dispatch(setSetting({mediaListView: listView}));
  };
  useEffect(() => {
    _setSetting();
  }, [listView]);

  return (
    <View style={style.container}>
      <ImageBackground
        source={style.mainBackgroundImg.backgroundColor}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          ttsScopeId="media-scope"
          withOutScrollView
          header={
            <Header
              // title={t('Media')}
              hideBack={!params?.home}
              showNotification
              showLang
              showSearch
            />
          }
          withHeader={!params?.fromSearch}>
          <View style={[style.row]}>
            <SearchViewSection
              search={search}
              setSearch={setSearch}
              listView={listView}
              setListView={setListView}
              fromSearch={params?.fromSearch}
            />
          </View>
          <HeaderBtnSection
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
            setMediaType={setMediaType}
          />
          <MediaList
            mediaData={mediaData}
            listView={listView}
            isLoading={isLoading}
            _searchMedia={_searchMedia}
            _searchMoreMedia={_searchMoreMedia}
            moreLoading={isLoadingMore}
          />
        </Page>
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    mainBackgroundImg: {
      backgroundColor: colors.mainBackgroundImg,
    },
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    containerBtnSwitch: {
      backgroundColor: colors.secondaryColor,
      width: 42 * BW(),
      height: 42 * BW(),
      borderRadius: 100 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginStart: 16 * BW(),
      marginTop: 16 * BW(),
      alignSelf: 'flex-end',
    },
    icon: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
  });
