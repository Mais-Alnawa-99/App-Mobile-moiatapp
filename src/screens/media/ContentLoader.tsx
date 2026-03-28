import React from 'react';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import SkeletonLoading from '../../component/SkeletonLoading';

export default function ContentLoaderMedia({
  listView,
  index,
  styleCard,
  animation,
  children,
  isLoading,
}: {
  listView?: boolean;
  index?: number;
  styleCard?: {};
  animation?: string;
  children?: any;
  isLoading?: boolean;
}): JSX.Element {
  const {colors} = useTheme();
  const style = getStyle(colors);

  return (
    <View
      key={index}
      style={[
        {
          width: listView ? '100%' : '48%',
          flexDirection: !listView ? 'column' : 'row',
        },
      ]}>
      {/* Title Placeholder */}
      <View
        style={[
          style.skeletonImage,
          {
            width: listView ? 150 * BW() : 'auto',
          },
        ]}>
        <SkeletonLoading />
      </View>

      <View style={style.contentContainer}>
        <View style={style.skeletonDate}>
          <SkeletonLoading />
        </View>
        <View style={style.skeletonTitle}>
          <SkeletonLoading />
        </View>
      </View>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      minHeight: 120 * BW(),
      borderRadius: 10 * BW(),
      backgroundColor: colors.background + '11',
      padding: 8 * BW(),
      paddingTop: 12 * BW(),
      paddingBottom: 8 * BW(),
      justifyContent: 'space-between',
    },

    contentContainer: {
      marginHorizontal: 10 * BW(),
      flex: 1,
    },
    skeletonDate: {
      width: 80 * BW(),
      height: 20 * BW(),
      backgroundColor: '#E0E0E066',
      borderRadius: 4 * BW(),
      marginTop: 4 * BW(),
      overflow: 'hidden',
    },
    skeletonTitle: {
      width: 140 * BW(),
      height: 20 * BW(),
      marginTop: 4 * BW(),
      backgroundColor: '#E0E0E066',
      borderRadius: 4 * BW(),
      overflow: 'hidden',
    },
    shimmer: {
      position: 'absolute',
      top: -100,
      bottom: -100,
      width: '40%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    skeletonImage: {
      height: 100 * BW(),
      borderRadius: 15 * BW(),
      resizeMode: 'cover',
      minWidth: 150 * BW(),
      backgroundColor: '#E0E0E066',
      overflow: 'hidden',
    },
  });
