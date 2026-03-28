import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import SkeletonLoading from './SkeletonLoading';
import FastImage from 'react-native-fast-image';
const CustomImage = ({
  style,
  url,
  animated,
  sharedTransitionTag,
  fastImage,
  ...props
}: {
  style?: object;
  url?: string;
  animated?: boolean;
  fastImage?: boolean;
  sharedTransitionTag?: any;
  resizeMode?: any;
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  const {colors} = useTheme();

  return (
    <>
      {isLoading && (
        <View
          style={[
            style,
            {
              position: 'absolute',
              backgroundColor: '#E0E0E066',
              overflow: 'hidden',
            },
          ]}>
          <SkeletonLoading />
        </View>
      )}
      {fastImage ? (
        <FastImage
          source={{
            uri: url,
            priority: FastImage.priority.high,
          }}
          style={style}
          onLoadEnd={onLoadEnd}
          {...props}
        />
      ) : (
        <Image
          source={{
            uri: url,
          }}
          onLoadEnd={onLoadEnd}
          style={style}
          {...props}
        />
      )}
    </>
  );
};
export default CustomImage;
