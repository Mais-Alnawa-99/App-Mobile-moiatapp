import React, {useState, useEffect, useRef, Fragment, useCallback} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {BW} from '../../style/theme';
import {searchMedia} from '../../redux/reducers/Media/thunk/media';
import MediaList from '../media/MediaList';
import ViewAll from '../../component/ViewAll';
import NavigationService from '../../navigation/NavigationService';

export default function MediaSearch(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  const {searchMedieData, isLoading, count} = useAppSelector(
    state => state.Media.Media,
  );

  const dispatch = useAppDispatch();

  const _searchMedia = () => {
    dispatch(
      searchMedia({
        CategoryId: '',
        MediaTypeId: 3,
        Keyword: props.searchValue,
        TagId: '',
        Skip: 0,
        Top: 3,
        home: false,
      }),
    );
  };
  useEffect(() => {
    if (props.searchValue.length > 1) {
      _searchMedia();
    }
  }, [props.searchValue]);

  return (
    <View>
      <ViewAll
        content={`${t('Media')}  ${count}`}
        showViewAll={searchMedieData?.length != 0}
        onPress={() => {
          NavigationService.navigate('MediaScreen', {
            searchValue: props.searchValue,
            fromSearch: true,
          });
        }}
      />
      <MediaList
        mediaData={searchMedieData}
        listView={true}
        isLoading={isLoading}
        _searchMedia={_searchMedia}
        moreLoading={false}
      />
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
      marginStart: 12 * BW(),
    },
  });
