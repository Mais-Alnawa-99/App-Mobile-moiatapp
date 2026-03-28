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
import {BW} from '../../style/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {FadeInRight, Easing} from 'react-native-reanimated';
import {isArabic} from '../../locales';
import {searchServices} from '../../redux/reducers/Services/thunk/services';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {setActiveCat} from '../../redux/reducers/Services/slice/services';
import NavigationService from '../../navigation/NavigationService';
import {setWebviewUrl} from '../../redux/reducers/General/webview';
import SkeletonLoading from '../../component/SkeletonLoading';
import {setNeedRefreshToken} from '../../redux/reducers/General/server';

export default function MostUsedServicesSection(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();
  const {homeServices, isLoading} = useAppSelector(
    state => state.services.services,
  );
  const {isLoggedIn} = useAppSelector(state => state.auth);

  const _searchService = () => {
    dispatch(
      searchServices({
        CategoryId: '',
        SubCategoryId: '',
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
      _searchService();
    }, 200);
  }, []);

  const _onPressViewAll = () => {
    let item = {Id: 'allServices'};
    dispatch(
      setActiveCat({
        activeType: 'allServices',
        activeBtn: 0,
      }),
    );
    NavigationService.navigate('services', {item, index: 0});
  };

  const _onPressService = (startServiceURL: any, url: any, title?: any) => {
    !isLoggedIn && dispatch(setWebviewUrl(startServiceURL));
    NavigationService.navigate('services');
    dispatch(setNeedRefreshToken(true));
    setTimeout(() => {
      NavigationService.navigate('WebViewScreen', {
        url: url,
        hideDrawer: true,
        title: title,
      });
    }, 100);

    // NavigationService.navigate('Services', {
    //   screen: 'WebViewScreen',
    //   url: url,
    //   hideDrawer: true,
    // });
  };
  return (
    <Animated.View
      entering={FadeInRight.duration(900).easing(Easing.ease)}
      style={style.container}>
      <View style={style.titleContainer}>
        <Text
          h2
          bold
          speakable={false}
          style={{
            color: colors.textPrimaryColor,
          }}>
          {t('mostUsedServices')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            _onPressViewAll();
          }}
          style={style.alignItemsCenter}>
          <Text
            h4
            medium
            speakable={false}
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
          data={homeServices}
          renderItem={({item, index}: {item: any; index: number}) => {
            return (
              <TouchableOpacity
                style={style.card}
                onPress={() => {
                  NavigationService.navigate('ServiceDetails', {item});
                  // _onPressService(
                  //   item?.FieldValues?.StartServiceURL,
                  //   item?.FieldValues?.ServiceFullURL,
                  //   item?.FieldValues != undefined && item?.FieldValues?.Title,
                  // );
                }}>
                <Text
                  h4
                  medium
                  style={{
                    color: colors.textPrimaryColor,
                  }}>
                  {item?.FieldValues != undefined && item?.FieldValues?.Title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  {/* <TouchableOpacity
                    // style={{
                    //   borderBottomColor: colors.textPrimaryColor,
                    //   borderBottomWidth: 0.4 * BW(),
                    // }}
                    onPress={() => {
                      NavigationService.navigate('ServiceDetails', {item});
                      // _onPressService(
                      //   item?.FieldValues?.StartServiceURL,
                      //   item?.FieldValues?.ServiceFullURL,
                      //   item?.FieldValues != undefined &&
                      //     item?.FieldValues?.Title,
                      // );
                    }}>
                    <Text
                      h4
                      style={{
                        color: colors.textPrimaryColor,
                      }}>
                      {t('info')}
                    </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={style.alignItemsCenter}
                    onPress={() => {
                      NavigationService.navigate('ServiceDetails', {item});
                    }}>
                    <Text
                      h4
                      medium
                      speakable={false}
                      style={{
                        color: colors.secondaryColor,
                      }}>
                      {t('start')}
                    </Text>
                    <AntDesign
                      name={'arrowright'}
                      style={{
                        marginStart: 4 * BW(),
                        fontSize: 16 * BW(),
                        transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
                      }}
                      color={colors.secondaryColor}
                    />
                  </TouchableOpacity>
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
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View
        style={[
          style.card,
          {
            justifyContent: 'space-between',
            backgroundColor: '#E0E0E033',
            borderWidth: 0,
          },
        ]}>
        <View style={style.skeletonTitle}>
          <SkeletonLoading />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={[style.skeletonInfo]}>
            <SkeletonLoading />
          </View>
          <View style={[style.skeletonInfo]}>
            <SkeletonLoading />
          </View>
        </View>
      </View>
      <View
        style={[
          style.card,
          {
            justifyContent: 'space-between',
            backgroundColor: '#E0E0E033',
            borderWidth: 0,
            marginStart: 12 * BW(),
          },
        ]}>
        <View style={style.skeletonTitle}>
          <SkeletonLoading />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={[style.skeletonInfo]}>
            <SkeletonLoading />
          </View>
          <View style={[style.skeletonInfo]}>
            <SkeletonLoading />
          </View>
        </View>
      </View>
    </View>
  );
};
const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 18 * BW(),
    },
    titleContainer: {flexDirection: 'row', justifyContent: 'space-between'},
    card: {
      width: 220 * BW(),
      height: 110 * BW(),
      borderRadius: 10 * BW(),
      borderColor: colors.background,
      borderWidth: 2 * BW(),
      backgroundColor: colors.background + '99',
      padding: 10 * BW(),
      justifyContent: 'space-between',
    },
    cardsContainer: {
      gap: 8 * BW(),
      marginTop: 14 * BW(),
    },
    alignItemsCenter: {flexDirection: 'row', alignItems: 'center'},
    shimmer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '40%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    skeletonInfo: {
      height: 20 * BW(),
      borderRadius: 6 * BW(),
      resizeMode: 'cover',
      width: 60 * BW(),
      backgroundColor: '#E0E0E077',
      overflow: 'hidden',
    },
    skeletonStart: {
      height: 50 * BW(),
      borderRadius: 6 * BW(),
      resizeMode: 'cover',
      width: 30 * BW(),
      backgroundColor: '#E0E0E077',
      overflow: 'hidden',
    },
    skeletonTitle: {
      width: '80%',
      height: 20 * BW(),
      marginTop: 4 * BW(),
      backgroundColor: '#E0E0E077',
      borderRadius: 4 * BW(),
      overflow: 'hidden',
    },
  });
