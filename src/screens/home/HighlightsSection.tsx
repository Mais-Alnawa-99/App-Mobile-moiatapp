import React, {useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated as AnimatedNative,
  Dimensions,
} from 'react-native';
import Text from '../../component/Text';
import FlatListComp from '../../component/FlatList';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BW, getWidth} from '../../style/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {FadeInRight, Easing} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {searchMedia} from '../../redux/reducers/Media/thunk/media';
import Loader from '../../component/Loader';
import CustomImage from '../../component/CustomImage';
import NavigationService from '../../navigation/NavigationService';
import {isArabic} from '../../locales';
import SkeletonLoading from '../../component/SkeletonLoading';

const getCardWidth = () => {
  const screenWidth = getWidth();
  const pagePadding = 32 * BW();
  const cardWidth = screenWidth - pagePadding;

  return cardWidth;
};
export default function HighlightsSection(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {homeMediaData, isLoading} = useAppSelector(state => state.Media.Media);
  const {lang} = useAppSelector(state => state.lang);
  const dispatch = useAppDispatch();
  const _searchMedia = () => {
    dispatch(
      searchMedia({
        CategoryId: '',
        MediaTypeId: 3,
        Keyword: '',
        TagId: '',
        Skip: 0,
        Top: 6,
        home: true,
      }),
    );
  };

  useEffect(() => {
    setTimeout(() => {
      _searchMedia();
    }, 500);
  }, []);

  return (
    <Animated.View
      entering={FadeInRight.duration(1100).easing(Easing.ease)}
      style={style.container}>
      <View style={style.titleContainer}>
        <Text
          h2
          bold
          speakable={false}
          style={{
            color: colors.textPrimaryColor,
          }}>
          {t('highlights')}
        </Text>
        <TouchableOpacity
          style={style.alignItemsCenter}
          onPress={() => NavigationService.navigate('media', {home: true})}>
          <Text
            h4
            speakable={false}
            medium
            style={{
              color: colors.secondaryColor,
            }}>
            {t('viewAll')}
          </Text>
          <AntDesign
            name={'arrowright'}
            style={{
              marginStart: 4 * BW(),
              transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
            }}
            color={colors.secondaryColor}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ContentLoader />
      ) : (
        <FlatListComp
          contentContainerStyle={style.cardsContainer}
          horizontal
          data={homeMediaData}
          renderItem={({item, index}: {item: any; index: number}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  NavigationService.navigate('MediaDetails', item);
                }}
                style={{
                  width: getCardWidth(),
                }}>
                <CustomImage
                  fastImage
                  url={item?.FieldValues?.MainImage_FullUrl}
                  style={style.image}
                />
                <View
                  style={{
                    paddingTop: 8 * BW(),
                    marginHorizontal: 10 * BW(),
                  }}>
                  <Text
                    h5
                    speakable={false}
                    style={{
                      color: colors.secondaryColor,
                      paddingBottom: 8 * BW(),
                    }}>
                    {item?.FieldValues?.MediaDate}
                  </Text>
                  <Text
                    h4
                    medium
                    numberOfLines={2}
                    style={{
                      color: colors.textPrimaryColor,
                    }}>
                    {item?.FieldValues?.Title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Animated.View>
  );
}

const ContentLoader = () => {
  const {colors} = useTheme();
  const style = getStyle(colors);

  return (
    <View style={{width: getCardWidth(), marginTop: 14 * BW()}}>
      <View style={[style.skeletonImage, style.image]}>
        <SkeletonLoading />
      </View>
      <View style={{marginHorizontal: 10 * BW(), paddingTop: 8 * BW()}}>
        <View style={style.skeletonDate}>
          <SkeletonLoading />
        </View>
        <View style={style.skeletonTitle}>
          <SkeletonLoading />
        </View>
      </View>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 16 * BW(),
    },
    titleContainer: {flexDirection: 'row', justifyContent: 'space-between'},
    cardsContainer: {
      gap: 10,
      marginTop: 14 * BW(),
    },
    alignItemsCenter: {flexDirection: 'row', alignItems: 'center'},
    image: {
      height: 170 * BW(),
      borderRadius: 15 * BW(),
      width: '100%',
      resizeMode: 'cover',
    },
    shimmer: {
      position: 'absolute',
      top: -100,
      bottom: -100,
      width: '40%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    skeletonImage: {
      height: 30 * BW(),
      borderRadius: 6 * BW(),
      resizeMode: 'cover',
      width: 30 * BW(),
      backgroundColor: '#E0E0E066',
      overflow: 'hidden',
    },
    skeletonTitle: {
      width: getCardWidth(),
      height: 20 * BW(),
      marginTop: 8 * BW(),
      backgroundColor: '#E0E0E066',
      borderRadius: 4 * BW(),
      overflow: 'hidden',
    },
    skeletonDate: {
      width: 80 * BW(),
      height: 20 * BW(),
      marginTop: 4 * BW(),
      backgroundColor: '#E0E0E066',
      borderRadius: 4 * BW(),
      overflow: 'hidden',
    },
  });
