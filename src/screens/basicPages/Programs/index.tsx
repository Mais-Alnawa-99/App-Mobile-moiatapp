import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  Linking,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {isArabic} from '../../../locales';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import Text from '../../../component/Text';
import {BW} from '../../../style/theme';
import {URL} from '../../../redux/network/api';
import Button from '../../../component/Button';

export default function Programs(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  return (
    <View style={style.appcontainer}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          ttsScopeId="Programs-scope"
          styles={{
            padding: 8 * BW(),
            paddingTop: 16 * BW(),
          }}
          contentContainerStyle={{
            gap: 16 * BW(),
          }}
          header={
            <Header title={t('Programs')} hideBack hideDrawer showBackDrawer />
          }
          withHeader>
          {cards.map((item, index) => {
            const content = isArabic() ? item.ar : item.en;
            let url = isArabic()
              ? `${URL}/ar/${item.link}`
              : `${URL}/en/${item.link}`;
            return (
              <View key={index} style={style.bulletRow}>
                <Text h3 bold style={style.bulletText}>
                  {content.title}
                </Text>
                <Text h4>{content.description}</Text>
                <Button
                  onPress={() => Linking.openURL(url)}
                  style={style.readBtn}
                  h5
                  styleText={{color: colors.secondaryColor}}
                  antDesign={isArabic() ? 'arrowleft' : 'arrowright'}
                  antDesignSize={12 * BW()}
                  title={isArabic() ? 'اقرأ المزيد' : 'Read More'}
                />
              </View>
            );
          })}
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
    bulletRow: {
      gap: 8 * BW(),
      borderColor: colors.gray,
      borderWidth: 1 * BW(),
      padding: 16 * BW(),
      borderRadius: 4 * BW(),
    },
    bulletText: {
      flex: 1,
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

const cards = [
  {
    link: '/programs/icv',
    ar: {
      title: 'برنامج المحتوى الوطني',
      description:
        'برنامج المحتوى الوطني يهدف إلى تمكين رواد الصناعة والتكنولوجيا للاستفادة من قدرات بناء القطاع الصناعي وتعظيم الاستفادة من خلال زيادة القيمة المضافة للقطاعات المحلية.',
    },
    en: {
      title: 'National In-Country Value Program (ICV)',
      description:
        'The National In-Country Value Program (ICV) aims to enable the Ministry of Industry and Advanced Technology to improve the performance and sustainability of the industrial sector.',
    },
  },
  {
    link: '/programs/ttp',
    ar: {
      title: 'برنامج التحول التكنولوجي',
      description:
        'تم تصميم برنامج التحول التكنولوجي لتعزيز التحول الصناعي في دولة الإمارات العربية المتحدة والمساهمة في تحويل الدولة إلى مركز عالمي لتقنيات الثورة الصناعية الرابعة وصناعات المستقبل.',
    },
    en: {
      title: 'Technology Transformation Program (TTP)',
      description:
        'The TTP is designed to supercharge the UAE’s industrial transformation and help turn the country into a global hub for Fourth Industrial Revolution technologies and industries of the future.',
    },
  },
  {
    link: '/programs/halal',
    ar: {
      title: 'نظام الحلال الإماراتي',
      description:
        'بناء الثقة في المنتجات الحلال وفقاً لمتطلبات الحلال في دولة الإمارات العربية المتحدة',
    },
    en: {
      title: 'UAE Halal System',
      description:
        'Building confidence in Halal products in accordance with UAE Halal Requirements.',
    },
  },
  {
    link: '/programs/about-virtual-academy-icv',
    ar: {
      title: 'أكاديمية التدريب الافتراضية',
      description:
        'اكتسب مهارات من أفضل وأحدث الممارسات من رواد القطاع الصناعي، طور قدراتك لتعزيز فرص النجاح.',
    },
    en: {
      title: 'Virtual Academy',
      description:
        'Extending an open invitation to industrialists, investors, innovators and entrepreneurs to engage with Ministry of Industry & Advanced Technology and to benefit from the UAE’s exceptional value proposition.',
    },
  },
  {
    link: '/programs/manaa',
    ar: {
      title: 'مانع',
      description:
        'يعتبر نظام مانع من الأنظمة الابتكارية التي تضمن سلامة وجودة المنتجات، ويتيح لجميع فئات المجتمع من أفراد، ودوائر حكومية، وقطاعات خاصة الإبلاغ عن الإصابات والحوادث الناتجة عن استخدام المنتجات غير المطابقة للمواصفات، بالإضافة إلى الإبلاغ عن العثور على منتج مستدعى، أو منتج غير مطابق في الأسواق.',
    },
    en: {
      title: 'Manaa System',
      description:
        'Manaa is an innovative system that ensures the safety and quality of products. Manaa is a product recall management system. It is accessible to society, individuals, government departments, private sectors, suppliers and others. The system also allows the consumer to report injuries and accidents caused by using non-complying products, as well as to report the finding of a recalled or non-complying products on the market.',
    },
  },
  {
    link: '/programs/icv-formula',
    ar: {
      title: 'برنامج المحتوى الوطني',
      description:
        'الإرشادات التي تساعد الشركات الموردة لمعرفة كيفية احتساب شهادة القيمة الوطنية المضافة وفق الأهداف الخاصة بالتقييم ومنح الشهادات',
    },
    en: {
      title: 'ICV Formula',
      description:
        'Instructions to help the supplies to issue certificates using formula to get a certification score.',
    },
  },
  {
    link: '/programs/enas',
    ar: {
      title: 'نظام الاعتماد الوطني الإماراتي (ENAS)',
      description:
        'تأسست إدارة الاعتماد الوطني في عام 2004، استنادًا إلى القانون الاتحادي رقم (28) لعام 2001 وقرار مجلس الوزراء رقم (22) لعام 2004 لإدارة نظام الاعتماد الوطني الإماراتي.',
    },
    en: {
      title: 'About Emirates National Accreditation System (ENAS) - MOIAT',
      description:
        'National Accreditation Department was established in the year 2004, based on the Federal Law no. (28) for the year 2001 and the Cabinet Decision no. (22) for the year 2004 to manage ENAS.',
    },
  },
];
