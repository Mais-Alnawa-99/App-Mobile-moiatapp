import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import FlatListComp from '../../component/FlatList';
import CustomImage from '../../component/CustomImage';
import Text from '../../component/Text';
import MediaCard from './MediaCard';
import ContentLoaderMedia from './ContentLoader';

export default function MediaList(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const FlatListProps = {
    data: props.mediaData,
    contentContainerStyle: {
      gap: 12 * BW(),
      justifyContent: 'space-between',
    },
    renderItem: ({item, index}: any) => (
      <MediaCard item={item} index={index} listView={props.listView} />
    ),
    onRefresh: () => props._searchMedia(0),
    onEndReached: props._searchMoreMedia, // Pass as a reference
    onEndReachedThreshold: 0.01,
    moreLoading: props.moreLoading,
    noData: true,
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 8 * BW(),
      }}>
      {props.isLoading ? (
        <FlatListComp
          scrollview
          data={Array.from({length: 10}, (_, index) => index + 1)}
          contentContainerStyle={{
            flexDirection: props.listView ? 'column' : 'row',
            flexWrap: props.listView ? 'nowrap' : 'wrap',
            gap: 12 * BW(),
          }}
          scrollEnabled={false}
          renderItem={({item, index}: any) => (
            <ContentLoaderMedia
              isLoading={props.isLoading}
              listView={props.listView}
              key={index}
            />
          )}
          onRefresh={() => {
            props._searchMedia(0);
          }}
        />
      ) : (
        props?.news?.length != 0 &&
        (props.listView ? (
          <FlatListComp {...FlatListProps} key={'1'} numColumns={1} />
        ) : (
          <FlatListComp
            {...FlatListProps}
            key={'2'}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
          />
        ))
      )}
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    image: {
      height: 100 * BW(),
      borderRadius: 15 * BW(),
      resizeMode: 'cover',
      minWidth: 150 * BW(),
    },
    icon: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
  });
