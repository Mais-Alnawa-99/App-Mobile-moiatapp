import React from 'react';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import SkeletonLoading from '../../component/SkeletonLoading';

export default function ContentLoaderServiceCard({
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
        style.card,
        {
          minHeight: listView ? 100 * BW() : 120 * BW(),
          width: listView ? '100%' : '48%',
          ...styleCard,
        },
      ]}>
      {/* Title Placeholder */}
      <View style={style.skeletonTitle}>
        <SkeletonLoading />
      </View>

      <View style={style.btnContainer}>
        <View style={style.skeletonButton}>
          <SkeletonLoading />
        </View>
        <View style={style.skeletonButtonText}>
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
      backgroundColor: colors.background,
      padding: 8 * BW(),
      paddingTop: 12 * BW(),
      paddingBottom: 8 * BW(),
      justifyContent: 'space-between',
    },
    skeletonTitle: {
      height: 20 * BW(),
      backgroundColor: '#E0E0E066',
      borderRadius: 4,
      marginBottom: 10,
      overflow: 'hidden',
    },
    btnContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20 * BW(),
    },
    skeletonButton: {
      width: 30 * BW(),
      height: 30 * BW(),
      backgroundColor: '#E0E0E066',
      borderRadius: 5,
      overflow: 'hidden',
    },
    skeletonButtonText: {
      width: 80 * BW(),
      height: 20 * BW(),
      backgroundColor: '#E0E0E066',
      borderRadius: 4,
      overflow: 'hidden',
    },
    shimmer: {
      position: 'absolute',
      top: -100,
      bottom: -100,
      width: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  });
