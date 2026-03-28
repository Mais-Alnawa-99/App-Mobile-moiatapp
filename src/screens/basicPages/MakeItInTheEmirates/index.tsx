import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  Linking,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import Page from '../../../component/Page';
import Header from '../../../component/Header';
import {BW} from '../../../style/theme';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import {isArabic} from '../../../locales';

export default function MakeItInTheEmirates(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  let url = isArabic() ? 'https://www.miite.ae/ar' : 'https://www.miite.ae/en';
  return (
    <View style={styles.appcontainer}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          ttsScopeId="MakeItInTheEmirates-scope"
          styles={{
            padding: 8 * BW(),
            paddingTop: 16 * BW(),
          }}
          contentContainerStyle={{
            gap: 16 * BW(),
          }}
          header={
            <Header
              title={t('MakeItInTheEmirates')}
              hideBack
              hideDrawer
              showBackDrawer
            />
          }
          withHeader>
          <View style={styles.mainImg}>
            <Image
              resizeMode="contain"
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%',
              }}
              source={require('../../../assets/about/Ministers-Message.jpg')}
            />
          </View>
          {isArabic() ? (
            <View style={{gap: 16 * BW(), marginTop: 6 * BW()}}>
              <Text h3 bold>
                {` الركيزة للتميز الصناعي العالمي`}
              </Text>
              <Text h4>
                {`أصبح حدث اصنع في الإمارات حدثًا محوريًا للمصنعين والمستثمرين وقادة الصناعة الذين يتطلعون للاستفادة من الفرص الهائلة في قطاع الصناعة في دولة الإمارات التي تشهد توسعًا سريعًا.`}
              </Text>

              <Text h4>
                {`مع التركيز الكبير على التنويع الاقتصادي، والابتكار التكنولوجي، والاستدامة، يعد الحدث المكان الرئيسي للتواصل، وإبرام الصفقات، والمناقشات الاستراتيجية حول مواضيع رئيسية مثل التصنيع المتقدم، والصناعة 4.0، والمواد المستدامة، وفرص الاستثمار في المشهد الصناعي لدولة الإمارات.`}
              </Text>

              <Text h4>
                {`ومع استمرار الحدث في النمو من حيث الحجم والأثر، يظل منصة حاسمة في تشكيل مستقبل التصنيع، حيث تعرض أكثر من 160 مليار درهم من اتفاقيات الاستلام، وتعزز الشراكات العالمية، وتدعم مكانة الإمارات كمركز رائد للتميز الصناعي والابتكار.`}
              </Text>
            </View>
          ) : (
            <View style={{gap: 16 * BW()}}>
              <Text h3 bold>
                {`The Powerhouse for Global Industrial Excellence`}
              </Text>
              <Text h4>
                {`Make It In The Emirates has become a pivotal event for manufacturers, investors, and industry leaders looking to capitalize on the vast opportunities within the UAE’s rapidly expanding industrial and manufacturing sectors.`}
              </Text>

              <Text h4>
                {`With a strong focus on economic diversification, technological innovation, and sustainability, the event serves as the premier meeting place for networking, deal-making, and strategic discussions on key topics such as advanced manufacturing, Industry 4.0, sustainable materials, and investment opportunities in the UAE’s industrial landscape.`}
              </Text>

              <Text h4>
                {`As the event continues to grow in scale and influence, it remains a critical platform for shaping the future of manufacturing, showcasing AED 143+ billion in offtake agreements, fostering global partnerships, and reinforcing the UAE’s position as a leading hub for industrial excellence and innovation. `}
              </Text>
            </View>
          )}
          <Button
            onPress={() => Linking.openURL(url)}
            style={styles.readBtn}
            h4
            styleText={{color: colors.secondaryColor}}
            antDesign={isArabic() ? 'arrowleft' : 'arrowright'}
            antDesignSize={14 * BW()}
            title={isArabic() ? 'اقرأ المزيد' : 'Read More'}
          />
        </Page>
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appcontainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    mainImg: {
      width: '100%',
      height: 230 * BW(),
      borderRadius: 6 * BW(),
      overflow: 'hidden',
    },
    readBtn: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 6 * BW(),
    },
  });
