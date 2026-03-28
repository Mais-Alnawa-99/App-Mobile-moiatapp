import React, {useRef} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../../../locales';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {BW} from '../../../style/theme';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function GovernmentCharter(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scale = useRef(Animated.multiply(baseScale, pinchScale)).current;
  let lastScale = useRef(1);

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  let lastOffset = useRef({x: 0, y: 0});

  const MAX_TRANSLATE_X = SCREEN_WIDTH / 2;
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 4;

  const onPinchGestureEvent = Animated.event(
    [{nativeEvent: {scale: pinchScale}}],
    {useNativeDriver: true},
  );

  const onPanGestureEvent = ({nativeEvent}: any) => {
    if (lastScale.current > 1) {
      translateX.setValue(nativeEvent.translationX);
      translateY.setValue(nativeEvent.translationY);
    }
  };

  const handlePinchStateChange = ({nativeEvent}: any) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  };

  const handlePanStateChange = ({nativeEvent}: any) => {
    if (nativeEvent.oldState === State.ACTIVE && lastScale.current > 1) {
      lastOffset.current.x = Math.max(
        -MAX_TRANSLATE_X,
        Math.min(
          lastOffset.current.x + nativeEvent.translationX,
          MAX_TRANSLATE_X,
        ),
      );
      lastOffset.current.y = Math.max(
        -MAX_TRANSLATE_Y,
        Math.min(
          lastOffset.current.y + nativeEvent.translationY,
          MAX_TRANSLATE_Y,
        ),
      );
      translateX.setOffset(lastOffset.current.x);
      translateX.setValue(0);
      translateY.setOffset(lastOffset.current.y);
      translateY.setValue(0);
    }
  };
  const handleDoubleTap = () => {
    lastScale.current = 1;
    baseScale.setValue(1);
    pinchScale.setValue(1);

    lastOffset.current = {x: 0, y: 0};
    translateX.setOffset(0);
    translateX.setValue(0);
    translateY.setOffset(0);
    translateY.setValue(0);
  };

  const imageSource = isArabic()
    ? require('../../../assets/about/gov-charter-ar.jpg')
    : require('../../../assets/about/gov-charter-en.png');

  return (
    <View style={style.container}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          ttsScopeId="TheGovernmentCharter-scope"
          styles={{
            padding: 16 * BW(),
          }}
          // scrollEnabled={false}
          header={
            <Header
              titleContainerStyle={{flex: 4}}
              title={t('TheGovernmentCharter')}
              hideBack
              hideDrawer
              showBackDrawer
            />
          }
          withHeader>
          <View style={{borderRadius: 4 * BW(), overflow: 'hidden'}}>
            <View
              style={{
                width: '100%',
                height: 100 * BW(),
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: colors.mainWhite,
                flexDirection: 'row',
                paddingHorizontal: 10 * BW(),
                gap: 10 * BW(),
              }}>
              {isArabic() ? (
                <>
                  <Image
                    resizeMode="center"
                    style={{
                      width: '50%',
                      height: 50 * BW(),
                      resizeMode: 'contain',
                    }}
                    source={require('../../../assets/logo/logo_ar.png')}
                  />
                  <Image
                    resizeMode="center"
                    style={{
                      width: '50%',
                      height: 130 * BW(),
                      resizeMode: 'contain',
                    }}
                    source={require('../../../assets/about/em-ar.png')}
                  />
                </>
              ) : (
                <>
                  <Image
                    resizeMode="center"
                    style={{
                      width: '50%',
                      height: 100 * BW(),
                      resizeMode: 'center',
                    }}
                    source={require('../../../assets/logo/logo_en.png')}
                  />
                  <Image
                    resizeMode="center"
                    style={{
                      width: '50%',
                      height: 100 * BW(),
                      resizeMode: 'center',
                    }}
                    source={require('../../../assets/about/em-en.png')}
                  />
                </>
              )}
            </View>
            <View
              style={{
                width: '100%',
                height: 100 * BW(),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.mainWhite,
                flexDirection: 'row',
                paddingHorizontal: 10 * BW(),
                marginTop: -20 * BW(),
              }}>
              {isArabic() ? (
                <>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: 100 * BW(),
                      resizeMode: 'contain',
                    }}
                    source={require('../../../assets/about/gov-charter-ar-text.jpg')}
                  />
                </>
              ) : (
                <>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: 100 * BW(),
                      resizeMode: 'contain',
                    }}
                    source={require('../../../assets/about/gov-charter-en-text.png')}
                  />
                </>
              )}
            </View>
            <View style={{height: 480 * BW()}}>
              {/* <GestureHandlerRootView
              style={{
                height: 480 * BW(),
              }}>
              <TapGestureHandler numberOfTaps={2} onActivated={handleDoubleTap}>
                <PanGestureHandler
                  onGestureEvent={onPanGestureEvent}
                  onHandlerStateChange={handlePanStateChange}>
                  <Animated.View>
                    <PinchGestureHandler
                      onGestureEvent={onPinchGestureEvent}
                      onHandlerStateChange={handlePinchStateChange}> */}
              <Animated.Image
                source={imageSource}
                resizeMode="stretch"
                style={{
                  width: '100%',
                  height: '100%',
                  // transform: [
                  //   {scale},
                  //   {
                  //     translateX: translateX.interpolate({
                  //       inputRange: [-MAX_TRANSLATE_X, MAX_TRANSLATE_X],
                  //       outputRange: [-MAX_TRANSLATE_X, MAX_TRANSLATE_X],
                  //       extrapolate: 'clamp',
                  //     }),
                  //   },
                  //   {
                  //     translateY: translateY.interpolate({
                  //       inputRange: [-MAX_TRANSLATE_Y, MAX_TRANSLATE_Y],
                  //       outputRange: [-MAX_TRANSLATE_Y, MAX_TRANSLATE_Y],
                  //       extrapolate: 'clamp',
                  //     }),
                  //   },
                  // ],
                }}
              />
            </View>
            {/* </PinchGestureHandler>
                  </Animated.View>
                </PanGestureHandler>
              </TapGestureHandler>
            </GestureHandlerRootView> */}
          </View>
          {/* {isArabic() ? (
            <Text
              h4>{`الإنسـان أولا: خدمـات حكوميـة تتمحـور حـول الإنسـان، مصممـة لتناسـب احتياجاتـه ومتطلباتـه وتفضيلاتـه ويتـم تصميمهـا معـه.

الأولوية للخدمـات الرقميـة: توفيـر خدمـات حكوميـة رقميـة اسـتباقية لتناسـب أسـلوب الحيـاة فـي المسـتقبل.

طلـب المعلومـة مـرة واحـدة: خدمـات حكوميـة مترابطـة ومتكاملـة تعتمـد طلـب بيانـات المتعامـل مـرة واحـدة فقـط.

بيانـات آمنـة وتضمـن الخصوصيـة: مشـاركة البيانـات الحكوميـة بيـن الجهـات بطريقـة آمنـة ومحميـة تضمـن خصوصيـة المتعامـل.
 
قنـوات خدمـة موحـدة ومتنوعـة ومتناسـقة: توفيـر الخدمـات الحكوميـة مـن خـلال قنوات متنوعـة ومتكاملـة ومتناسـقة تناسـب رغبـة المتعامليـن، وعبـر واجهـة حكوميـة موحـدة.

تجربـة سلسـة واسـتباقية: توفيـر باقـات مـن الخدمـات الإسـتباقية المترابطـة السلسـة، تقـدم للمتعامـل قبـل طلبهـا وفـي الوقـت المناسـب بنـاء علـى أحـداث الحيـاة.

صوت المتعامل: الإنصات لصوت المتعامل والشفافية في نتائج القياس.

خدمـات ذات قيمـة مميـزة: رسـوم حكوميـة تراعـي تخفيـض التكلفـة علـى المتعامليـن ورفـع الكفـاءة فـي الجهـات الحكوميـة.`}</Text>
          ) : (
            <Text></Text>
          )} */}
        </Page>
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
  });
