import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {isArabic} from '../../../locales';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import Text from '../../../component/Text';
import {BW} from '../../../style/theme';
import ValuesSection from './ValuesSection';
import SectorsSection from './SectorsSection';

export default function AboutMinistry(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const des = isArabic()
    ? `تم تأسيس وزارة الصناعة والتكنولوجيا المتقدمة في دولة الإمارات العربية المتحدة، في يوليو 2020، بهدف تمكين القطاع الصناعي في الدولة ورفع مساهمته في الناتج المحلي الإجمالي. وفي سبيل تكوين منظومة وطنية متكاملة لدعم وتنمية قطاع الصناعة الإماراتي، تم دمج كلا من مكتب وزير دولة للتكنولوجيا المتقدمة، وهيئة الإمارات للمواصفات والمقاييس "مواصفات"، وقطاع الصناعة في وزارة الطاقة والبنية التحتية، إلى هيكل وزارة الصناعة والتكنولوجيا المتقدمة منذ ذلك الحين، وانتقلت بالتبعية معها كافة الصلاحيات والمهام إلى الوزارة.

وستعمل الوزارة على صياغة سياسات وقوانين وبرامج لإنشاء إطار عمل بمستوى عالمي للتنمية الصناعية من شأنه أن يساعد في جذب الاستثمارات الأجنبية المباشرة، وتعزيز القيمة الوطنية المضافة، ودعم ريادة الأعمال الوطنية، وخلق فرص العمل، واستقطاب المواهب والعقول المبدعة، والارتقاء بالكوادر الوطنية، وتعزيز صادرات المنتجات المحلية لدولة الإمارات من خلال تعزيز تنافسيتها.

وستشجع الوزارة إنشاء المجمعات الصناعية، ورفع القدرات المحلية في مجال التكنولوجيا المتقدمة، وتسريع التنمية الصناعية للمساهمة الفاعلة في اقتصاد متنوع مبني على المعرفة، وصولاً إلى تحقيق الاكتفاء الذاتي صناعياً، كذلك فإن البنية التحتية للجودة تعد ركناً أساسيا في نجاح "مشروع 300 مليار" فيما تخضع المنظومة بالكامل لإشراف وزارة الصناعة والتكنولوجيا المتقدمة، بعد دمج هيئة الإمارات للمواصفات والمقاييس ضمن هيكل الوزارة.`
    : `Established in July 2020, the Ministry of Industry and Advanced Technology (MoIAT) aims to boost the UAE’s industrial sector and increase its contribution to the GDP. The National Strategy for Industry and Advanced Technology “Operation 300 billion” was launched to form an integrated system to support and develop the UAE's industrial sector. The Office of the Minister of State for Advanced Technology, the Emirates Authority for Standardization and Metrology (ESMA) and the industrial sector in the Ministry of Energy and Infrastructure were merged into the Ministry of Industry and Advanced Technology. Since then, all authorities, responsibilities and duties have been transferred to the newly founded ministry.

MoIAT develops policies and regulations to establish a world-class industrial development framework through uniting the efforts of the industrial sector. The ministry helps shape an enabling environment to support an advanced industrial system, boasting strong regulatory and legislative capabilities, and enabling exciting investment opportunities. The ministry helps facilitate sustainable and independent local supply chains, while promoting self-sufficiency and ensuring business continuity and flexibility, towards achieving positive, tangible and harmonious economic and social impact. The ministry also supports national entrepreneurship, creates more job opportunities, and attracts talented and creative minds, strengthening national cadres and enhancing the export of local products through increased quality and competitiveness.

The ministry encourages the establishment of industrial zones to build local capacities in advanced technology while accelerating sustainable industrial development to contribute to a diversified knowledge-based economy.

Also, Quality Infrastructure is considered a crucial component to the success of “Operation 300 Billion”, as the entire system falls under the supervision of the Ministry of Industry and Advanced Technology, following the integration of the Emirates Authority for Standardization and Metrology within the ministry's structure.`;

  const vision = isArabic()
    ? `منظومة صناعية متكاملة تعتمد التقنيات المتقدمة وحلول الثورة الصناعية الرابعة للمساهمة في نمو اقتصادي مستدام قائم على المعرفة`
    : `To develop an integrated industrial system that leverages advanced technologies and Fourth Industrial Revolution solutions to contribute to building a sustainable, knowledge-based economy.`;

  const message = isArabic()
    ? `تمكين القطاع الصناعي من خلال الارتقاء بمعايير الجودة، ورفع الجاذبية الاستثمارية، واستقطاب أفضل العقول والكفاءات، وتطوير قدراتنا الوطنية في صناعات المستقبل، وتوطين المعرفة وتعزيز القيمة الوطنية المضافة للصناعات الإماراتية.`
    : `We aim to enhance the national industrial sector by accelerating advance technology adoption, boosting quality infrastructure, and building an attractive business and investment environment in the UAE. In addition, we seek to attract high-skill talents and capabilities to upskill our local talent pool in industries of the future and enhance national in-country value of national industries.`;

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
          ttsScopeId="AboutUs-scope"
          styles={{padding: 8 * BW()}}
          contentContainerStyle={{gap: 16 * BW()}}
          header={
            <Header title={t('AboutUs')} hideBack hideDrawer showBackDrawer />
          }
          withHeader>
          <Image
            resizeMode="contain"
            style={{
              width: '100%',
              height: 260 * BW(),
              resizeMode: 'contain',
            }}
            source={require('../../../assets/about/img-text-block-4.png')}
          />
          <View style={{gap: 8 * BW()}}>
            <Text h3 bold>
              {isArabic() ? 'عن الوزارة' : 'About The Ministry'}
            </Text>

            <Text h4>{des}</Text>
          </View>
          <View style={{gap: 8 * BW()}}>
            <Text h3 bold>
              {isArabic() ? 'رؤيتنا' : 'Our Vision'}
            </Text>
            <Text h4>{vision}</Text>
          </View>
          <View style={{gap: 8 * BW()}}>
            <Text h3 bold>
              {isArabic() ? 'رسالتنا' : 'Our Message'}
            </Text>
            <Text h4> {message}</Text>
          </View>
          <ValuesSection />
          <SectorsSection />
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
  });
