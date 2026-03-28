import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../component/Text';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import Button from '../../component/Button';
import FlatListComp from '../../component/FlatList';
import ServiceCard from './ServiceCard';
import ContentLoaderServiceCard from './ContentLoader';

export default function ServicesList(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);
  return (
    <View
      style={{
        flex: 1,
        paddingEnd: 16 * BW(),
        paddingStart: 8 * BW(),
        ...props.style,
      }}>
      {props.isLoading ? (
        <FlatListComp
          scrollview
          data={Array.from({length: 10}, (_, index) => index + 1)}
          horizontal={props.horizontal}
          scrollEnabled={false}
          contentContainerStyle={{
            flexDirection: props?.listView ? 'column' : 'row',
            flexWrap: props?.listView ? 'nowrap' : 'wrap',
            gap: 8 * BW(),
            ...props.style,
          }}
          renderItem={({item, index}: any) => (
            <ContentLoaderServiceCard
              key={index}
              isLoading={props.isLoading}
              listView={props.listView}
              styleCard={{
                ...style.card,
                minHeight: props.listView ? 100 * BW() : 120 * BW(),
                width: props.listView ? '100%' : '48%',
                ...props.styleCard,
              }}
            />
          )}
          onRefresh={!!props.searchService ? () => props.searchService() : null}
        />
      ) : (
        <FlatListComp
          data={props?.services}
          horizontal={props.horizontal}
          key={props.listView ? '1' : '2'}
          numColumns={props.listView ? 1 : 2}
          contentContainerStyle={{
            gap: 6 * BW(),
            justifyContent: 'space-between',
          }}
          columnWrapperStyle={
            !props.listView ? {justifyContent: 'space-between'} : undefined
          }
          renderItem={({item, index}: any) => (
            <ServiceCard
              item={item}
              listView={props.listView}
              key={index}
              index={index}
              styleCard={props.styleCard}
              numberOfTitleLines={props.numberOfTitleLines}
              animation={props.animation}
              fromDetails={props.fromDetails}
            />
          )}
          onRefresh={props.searchService ? () => props.searchService(0) : null}
          onEndReached={
            props._searchMoreService ? props._searchMoreService : undefined
          }
          moreLoading={props.moreLoading}
          onEndReachedThreshold={0.01}
          noData
        />
      )}
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    cardsContainer: {
      flexWrap: 'wrap',
      gap: 10 * BW(),
    },
    iconHeart: {
      tintColor: colors?.primary,
      width: 22 * BW(),
      height: 22 * BW(),
    },
    startBtn: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      borderRadius: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20 * BW(),
    },
    startTxt: {
      color: colors?.secondaryColor,
      marginEnd: 6 * BW(),
    },
    card: {
      minHeight: 120 * BW(),
      borderRadius: 10 * BW(),
      backgroundColor: colors.background,
      padding: 8 * BW(),
      paddingTop: 12 * BW(),
      paddingBottom: 8 * BW(),
      justifyContent: 'space-between',
    },
  });
