import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated as AnimatedNative,
  Dimensions,
} from 'react-native';
import Text from '../../component/Text';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BH, BW} from '../../style/theme';
import {LinearGradient} from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  FadeInRight,
  Easing,
} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getLookupValues} from '../../redux/reducers/Lookup/thunk/lookup';
import Button from '../../component/Button';
import Loader from '../../component/Loader';
import NavigationService from '../../navigation/NavigationService';
import {setActiveCat} from '../../redux/reducers/Services/slice/services';
import reactotron from '../../redux/reactotron';
import SkeletonLoading from '../../component/SkeletonLoading';

export const getIcon = (name: any) => {
  if (name === 'Industrial Registry Services') {
    return require('../../assets/services/IndustrialRegistryServices.png');
  } else if (name === 'Conformity Services') {
    return require('../../assets/services/ConformityServices.png');
  } else if (name === 'Standards Services') {
    return require('../../assets/services/StandardsServices.png');
  } else if (name === 'Accreditation Services') {
    return require('../../assets/services/Flag.png');
  } else if (name === 'Customer Services') {
    return require('../../assets/services/CustomerServices.png');
  } else if (name === 'Initial Services') {
    return require('../../assets/services/InitialServices.png');
  } else if (name === 'Customs Exemption Services') {
    return require('../../assets/services/CustomExemptions.png');
  } else if (name === 'Halal Certification Services') {
    return require('../../assets/services/HalalCertifacationServices.png');
  } else if (name === 'Industrial Technology Transformation Services') {
    return require('../../assets/services/IndustrialTechnologyTransformationServices.png');
  } else if (name === 'ICV Services') {
    return require('../../assets/services/ICVServices.png');
  } else if (name === 'Industrial Production Services') {
    return require('../../assets/services/IndustrialProductionServices.png');
  } else if (name === 'Product Status Services') {
    return require('../../assets/services/ProductStatusServices.png');
  } else if (name === 'National Marks Services') {
    return require('../../assets/services/NationalMarksServices.png');
  } else if (name === 'Conformity Assessment Bodies Services') {
    return require('../../assets/services/ConformityAssessmentBodies.png');
  } else {
    return require('../../assets/services/gear-light.png');
  }
};

export default function ServiceCatalogSection(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const dispatch = useAppDispatch();
  const {servicesCat, isLoading}: any = useAppSelector(
    state => state.lookupsData.lookupsValues,
  );

  const {lang} = useAppSelector(state => state.lang);
  useEffect(() => {
    _getLookupValues();
  }, []);
  const _getLookupValues = async () => {
    await dispatch(getLookupValues(5));
  };

  const serviceCatalogCards = [
    {
      Id: 'allServices',
      title: t('AllServices'),
      icon: require('../../assets/services/AllServices.png'),
    },

    {
      Id: 'favourite',
      title: t('FavouriteServices'),
      icon: require('../../assets/services/FavouriteServices.png'),
    },
  ];
  const [services, setSerivces] = useState(serviceCatalogCards);

  const translateY = useSharedValue(-80);
  const translateX = useSharedValue(-150);
  const opacity = useSharedValue(0.2);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(-150, {
          duration: 3000,
        }),
        withTiming(120, {
          duration: 3000,
        }),
        withTiming(300, {
          duration: 3500,
        }),
      ),
      -1,
      false,
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.2, {
          duration: 3000,
        }),
        withTiming(0.5, {
          duration: 3000,
        }),
        withTiming(0.2, {
          duration: 3500,
        }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  // useFocusEffect(
  //   React.useCallback(() => {
  //     _getLookupValues();
  //   }, [lang]),
  // );
  // useEffect(() => {
  //   _getLookupValues();
  // }, [lang]);

  // const _getLookupValues = () => {
  //   dispatch(getLookupValues(5));
  // };

  useEffect(() => {
    if (!!servicesCat && !isLoading && servicesCat?.value != undefined) {
      const filtered = servicesCat.value.filter(
        s => s.Id !== '0a7acf8b-0383-4942-bca7-a086eac3c29c',
      );

      setSerivces([...serviceCatalogCards, ...filtered]);
    }
  }, [servicesCat]);

  const _onPressServiceCat = (item: any, index: number) => {
    dispatch(
      setActiveCat({
        activeType: item.Id,
        activeBtn: index,
      }),
    );
    NavigationService.navigate('services', {item, index});
  };

  return (
    <View style={style.container}>
      <Animated.View entering={FadeInRight.duration(800).easing(Easing.ease)}>
        <Text
          h2
          bold
          speakable={false}
          style={{
            color: colors.textPrimaryColor,
          }}>
          {t('serviceCatalog')}
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInRight.duration(800).easing(Easing.ease)}
        style={style.cardsContainer}>
        {isLoading
          ? Array.from({length: 6}, (_, index) => index + 1).map(
              (item, index) => {
                return <ContentLoader key={index} />;
              },
            )
          : services?.slice(0, 6).map((item: any, index) => {
              return (
                <View key={index} style={style.card}>
                  <Animated.View style={animatedStyle}>
                    <LinearGradient
                      colors={[
                        'rgba(255, 255, 255, 0)',
                        colors.secondaryColor,
                        'rgba(255, 255, 255, 0)',
                      ]}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        width: 50 * BW(),
                        height: 200 * BW(),
                        transform: [{rotate: '20deg'}],
                        position: 'absolute',
                        left: 0,
                        top: 0,
                      }}
                    />
                  </Animated.View>
                  <Button
                    style={style.innercard}
                    key={index}
                    activeOpacity={1}
                    onPress={() => {
                      _onPressServiceCat(item, index);
                    }}
                    medium
                    title={
                      item?.title ||
                      (item?.FieldValues != undefined &&
                        item?.FieldValues?.Title)
                    }
                    icon={item?.icon ? item?.icon : getIcon(item?.Name)}
                    antDesign
                    antDesignColor={colors.background}
                    styleText={{
                      color: colors.lightPrimaryTextColor,
                      textAlign: 'center',
                      marginTop: 10 * BW(),
                    }}
                    speakable
                    styleIcon={{
                      tintColor: colors?.iconPrimaryColor,
                      width: 25 * BW(),
                      height: 25 * BW(),
                    }}
                    numberOfLines={2}
                  />
                  <Animated.View style={animatedStyle}>
                    {/* <BlurView
                    blurType="light"
                    blurAmount={8}
                    reducedTransparencyFallbackColor="white"
                    style={{position: 'absolute', left: 0, top: 0, zIndex: 4}}> */}
                    <LinearGradient
                      colors={[
                        'rgba(255, 255, 255, 0)',
                        'rgba(148, 163, 184, 0.15)',
                        'rgba(255, 255, 255, 0)',
                      ]}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        width: 50,
                        height: 200,
                        transform: [{rotate: '30deg'}, {translateY: -50}],
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 4,
                      }}
                    />
                    {/* </BlurView> */}
                  </Animated.View>
                </View>
              );
            })}
      </Animated.View>
    </View>
  );
}

const ContentLoader = () => {
  const {colors} = useTheme();
  const style = getStyle(colors);

  return (
    <View
      style={[
        style.card,
        {justifyContent: 'space-around', backgroundColor: '#E0E0E033'},
      ]}>
      <View style={[style.skeletonImage]}>
        <SkeletonLoading />
      </View>

      <View style={style.skeletonTitle}>
        <SkeletonLoading />
      </View>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 18 * BW(),
      minHeight: 244 * BW(),
    },
    card: {
      width: 105 * BW(),
      height: 100 * BW(),
      borderRadius: 10 * BW(),
      backgroundColor: colors.background,
      padding: 2 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    innercard: {
      backgroundColor: colors.background,
      padding: 4 * BW(),
      borderRadius: 10 * BW(),
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      // flexDirection: 'column',
      // overflow: 'hidden',
    },
    cardsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: 12 * BW(),
      marginTop: 14 * BW(),
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
      backgroundColor: '#E0E0E077',
      overflow: 'hidden',
    },
    skeletonTitle: {
      width: 60 * BW(),
      height: 20 * BW(),
      marginTop: 4 * BW(),
      backgroundColor: '#E0E0E077',
      borderRadius: 4 * BW(),
      overflow: 'hidden',
    },
  });
