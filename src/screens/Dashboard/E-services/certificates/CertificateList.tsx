import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../../component/Text';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import Button from '../../../../component/Button';
import FlatListComp from '../../../../component/FlatList';
import CertificateCard from './CertificateCard';
import ContentLoader from '../../../services/ContentLoader';

export default function CertificatesList(props: any): JSX.Element {
  const {colors} = useTheme();
  return (
    <FlatListComp
      scrollview
      data={props?.services}
      renderItem={({item, index}: any) => (
        <CertificateCard
          item={item}
          key={index}
          index={index}
          setTotalCount={props.setTotalCount}
        />
      )}
      onRefresh={props.searchService ? () => props.searchService(0) : null}
      onEndReachedThreshold={0.01}
      noData
    />
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
