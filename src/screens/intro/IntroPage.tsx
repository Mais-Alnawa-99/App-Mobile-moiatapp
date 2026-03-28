import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import Text from '../../component/Text';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import {BlurView} from '@react-native-community/blur';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faXmark,
  faArrowRightLong,
  faArrowLeftLong,
} from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay,
} from 'react-native-reanimated';
import NavigationService from '../../navigation/NavigationService';
import {useAppDispatch} from '../../redux/store';
import {setSkipedIntro} from '../../redux/reducers/General/intro';
import {isArabic} from '../../locales';
import Header from '../../component/Header';
import CustomStatusBar from '../../component/Statusbar';

export default function IntroPage(props: any): JSX.Element {
  let params = props?.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(isArabic() ? 50 : -50);
  const translateYContent = useSharedValue(0);
  const opacityContent = useSharedValue(0);
  const rotateImg = useSharedValue(0);
  let ar = isArabic();
  React.useEffect(() => {
    const fadeInLeft = () => {
      opacity.value = withTiming(1, {duration: 1000});
      translateX.value = withTiming(0, {duration: 1000}, () => {
        runOnJS(fadeOutRight)();
      });
    };

    const fadeOutRight = () => {
      opacity.value = withDelay(1000, withTiming(0, {duration: 1000}));
      translateX.value = withDelay(
        1000,
        withTiming(ar ? -50 : 50, {duration: 1000}, () => {
          translateX.value = ar ? 50 : -50;
          runOnJS(fadeInLeft)();
        }),
      );
    };

    fadeInLeft();
    slideIn();
  }, []);

  const animatedArrowStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}],
  }));

  const introData = [
    {
      id: 0,
      title: isArabic()
        ? 'تسجيل الدخول باستخدام الهوية الرقمية UAE PASS'
        : 'UAE PASS Sign In',
      desc: isArabic()
        ? 'حل موحد للهوية والتوقيع الرقمي لجميع المواطنين والمقيمين والزوار.'
        : 'A unified digital identity and signature solution for all citizens, residents, and visitors.',
      img: require('../../assets/sign.png'),
    },
    {
      id: 1,
      title: isArabic() ? 'لوحة المعلومات' : 'Information Dashboard',
      desc: isArabic()
        ? 'لوحة تفاعلية جديدة كليًا مع وصول مريح وميزات تتبع.'
        : 'All-new interactive dashboard with user friendly access and track features.',
      img: require('../../assets/dashboard.png'),
    },
    {
      id: 2,
      title: isArabic() ? 'الخدمات' : 'Services',
      desc: isArabic()
        ? 'بحث سهل الاستخدام عن الخدمات الإلكترونية.'
        : 'User-friendly search of e-services.',
      img: require('../../assets/service.png'),
    },
    {
      id: 3,
      title: isArabic()
        ? 'تبسيط عملية إصدار التراخيص'
        : 'Simplify Your Licensing Process',
      desc: isArabic()
        ? 'الوصول إلى جميع التفاصيل والأدوات التي تحتاجها لإصدار رخصتك.'
        : 'Access all the details and tools you need to issue your License.',
      img: require('../../assets/Details.png'),
    },
  ];

  const slideIn = () => {
    translateYContent.value = 100;
    opacityContent.value = 0;

    opacityContent.value = withTiming(1, {duration: 1500});
    translateYContent.value = withTiming(0, {duration: 900});
    rotateImg.value = withTiming(rotateImg.value + 30 * BW(), {duration: 900});
  };
  const slideOut = () => {
    translateYContent.value = 100;
    opacityContent.value = 0;

    opacityContent.value = withTiming(1, {duration: 1500});
    translateYContent.value = withTiming(0, {duration: 900});
    rotateImg.value = withTiming(rotateImg.value - 30 * BW(), {duration: 900});
  };

  const handleNext = () => {
    if (currentIndex < introData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      slideIn();
    } else {
      _setSkipedIntro();
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      slideOut();
    }
  };
  const _setSkipedIntro = () => {
    dispatch(setSkipedIntro());
  };

  const animatedStyleContent = useAnimatedStyle(() => ({
    transform: [{translateY: translateYContent.value}],
    opacity: opacityContent.value,
  }));
  const animatedStyleImg = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotateImg.value}deg`, // Convert the value to a degree string
      },
    ],
  }));

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={colors.introBackgroundImg}
        style={style.imageBackground}>
        {params?.fromDrawer && (
          <>
            <CustomStatusBar withoutStatusbar />
            <Header
              style={{
                marginLeft: -10 * BW(),
                height: 'auto',
              }}
              hideBack
              hideDrawer
              showBackDrawer
            />
          </>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              style.firstSection,
              params?.fromDrawer && {marginTop: -6 * BW()},
            ]}>
            <Animated.View style={animatedStyleContent}>
              <Text
                bold
                style={{
                  color: colors.textPrimaryColor,
                  lineHeight: 34 * BW(),

                  fontSize: isArabic() ? 20 * BW() : 26 * BW(),
                }}>
                {introData[currentIndex].title}
              </Text>
              <Text
                h4
                style={{
                  color: colors.textPrimaryColor,
                }}>
                {introData[currentIndex].desc}
              </Text>
            </Animated.View>
          </View>
          <View style={style.secondSection}>
            <View style={style.arrowBg}>
              <Animated.Image
                source={require('../../assets/background/introArrows.png')}
                style={[
                  {
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  },
                  animatedStyleImg,
                ]}></Animated.Image>
            </View>
            <View style={style.secondSectionBg}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={2}
                reducedTransparencyFallbackColor="white"
              />
              <Animated.View style={animatedStyleContent}>
                <Image
                  source={introData[currentIndex].img}
                  style={style.secondSectionImg}
                />
              </Animated.View>
            </View>
          </View>
          <View style={[style.thirdSection]}>
            {!params?.fromDrawer ? (
              <TouchableOpacity
                style={[
                  style.alignItemscenter,
                  {flexDirection: 'row', paddingHorizontal: 8 * BW()},
                ]}
                onPress={() => _setSkipedIntro()}>
                <FontAwesomeIcon
                  icon={faXmark}
                  color={colors.primaryColor}
                  size={20 * BW()}
                />
                <Text
                  h4
                  medium
                  style={{
                    color: colors.primaryColor,
                    paddingHorizontal: 8 * BW(),
                  }}>
                  {t('Skip')}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={currentIndex === 0 ? 0 : 0.6}
                style={[
                  style.alignItemscenter,
                  {
                    flexDirection: 'row',
                    paddingHorizontal: 8 * BW(),
                    opacity: currentIndex === 0 ? 0 : 1,
                  },
                ]}
                onPress={() => handlePrev()}>
                <FontAwesomeIcon
                  icon={faArrowLeftLong}
                  color={colors.iconPrimaryColor}
                  size={16 * BW()}
                  style={{
                    transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
                  }}
                />
                <Text
                  h4
                  medium
                  style={{
                    color: colors.primaryColor,
                    paddingHorizontal: 8 * BW(),
                  }}>
                  {t('Previous')}
                </Text>
              </TouchableOpacity>
            )}
            <View style={style.alignItemscenter}>
              {introData?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      style.dot,
                      currentIndex === index && {
                        backgroundColor: colors.secondaryColor,
                      },
                    ]}
                  />
                );
              })}
            </View>
            <TouchableOpacity
              activeOpacity={
                params?.fromDrawer && currentIndex === introData?.length - 1
                  ? 0
                  : 0.6
              }
              style={[
                style.alignItemscenter,
                {
                  opacity:
                    params?.fromDrawer && currentIndex === introData?.length - 1
                      ? 0
                      : 1,
                },
              ]}
              onPress={() => {
                handleNext();
              }}>
              <Text
                h4
                medium
                style={{
                  color: colors.primaryColor,
                  paddingHorizontal: 8 * BW(),
                }}>
                {t('Next')}
              </Text>
              <View style={style.nextBtn}>
                <Animated.View style={animatedArrowStyle}>
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    color={colors.mainWhite}
                    size={16 * BW()}
                    style={{
                      transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
                    }}
                  />
                </Animated.View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    dot: {
      marginHorizontal: 2 * BW(),
      width: 6 * BW(),
      height: 6 * BW(),
      borderRadius: (6 * BW()) / 2,
      backgroundColor: colors.lightPrimaryColor,
    },
    imageBackground: {
      backgroundColor: colors.mainBackground,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    firstSection: {
      marginTop: Platform.OS == 'ios' ? 60 * BW() : 50 * BW(),
      paddingStart: 30 * BW(),
      width: '75%',
      height: 70 * BW(),
    },
    secondSection: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24 * BW(),
    },
    thirdSection: {
      marginHorizontal: 30 * BW(),
      marginTop: 24 * BW(),
      borderRadius: (70 * BW()) / 2,
      height: 60 * BW(),
      backgroundColor: '#FFFFFF80',
      overflow: 'hidden',
      paddingHorizontal: 8 * BW(),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nextBtn: {
      backgroundColor: colors.primaryColor,
      width: 50 * BW(),
      height: 50 * BW(),
      borderRadius: (50 * BW()) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    alignItemscenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    arrowBg: {
      width: 450 * BW(),
      height: 450 * BW(),
      left: 110 * BW(),
    },
    secondSectionBg: {
      position: 'absolute',
      borderRadius: (400 * BW()) / 2,
      width: 400 * BW(),
      height: 400 * BW(),
      left: '25%',
      backgroundColor: '#3341551A',
      overflow: 'hidden',
      justifyContent: 'center',
    },
    secondSectionImg: {
      width: 240 * BW(),
      height: 440 * BW(),
      resizeMode: 'contain',
      left: 40 * BW(),
      top: 70 * BW(),
    },
  });
