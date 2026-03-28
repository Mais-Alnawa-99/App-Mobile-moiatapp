import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Accordion from '../../../component/Accordion';
import Text from '../../../component/Text';
import {isArabic} from '../../../locales';
import {BW} from '../../../style/theme';

const sectorsData = [
  {
    titleAr: 'قطاع المواصفات والتشريعات الفنية',
    titleEn: 'Standards and Legislation Sector',
    contentAr: `يعد قطاع المواصفات والتشريعات الفنية أحد أبرز القطاعات الحيوية الداعمة لمنظومة الصناعة في دولة الإمارات العربية المتحدة بشكل عام، حيث يتولى القطاع مسؤولية إصدار المواصفات القياسية الإماراتية و اللوائح الفنية وأنظمة الرقابة و أنظمة القياس الوطنية الأخرى، وذلك من خلال لجان فنية وفرق عمل تخصصية تضم في عضويتها ممثلين عن الجهات ذات العلاقة، مثل القطاعات الصناعية والتجارية والخدمية والمؤسسات البحثية والتعليمية والجهات الحكومية ذات العلاقة.

وينسجم تطوير وتطبيق العديد من منهجيات العمل في قطاع المواصفات والتشريعات الفنية، فضلاً عن منهجية تقييم الأثر التشريعي لتوفير وسيلة مهمة لتهيئة بيئة تشريعية آمنة تتميز بالمرونة لمواكبة التقدم في المجالات الحديثة، ومواجهة التحديات المحتملة، وتدعم مبادرات الابتكار والتكنولوجيا المتقدمة وتطوير البنية التحتية للجودة بما يتواءم مع توجهات الدولة ومبادراتها الوطنية.

ويسهم قطاع المواصفات والتشريعات الفنية في تسهيل التجارة وعملية تبادل المنتجات بين الدول، من خلال مواءمة ضمان المواصفات الوطنية مع أفضل الممارسات الدولية القائمة في قطاع المقاييس بما يضمن جودة المنتجات الوطنية.

وتنفيذاً لالتزامات الدولة في اتفاقيات منظمة التجارة العالمية، تتولى الوزارة الإشراف على نقطة الاستعلام الإماراتية الخاصة باتفاقية العوائق الفنية أمام التجارة (TBT)، والتي تم إنشاؤها في العام 2005، وتتولى العديد من المهام والاختصاصات مثل الرد على الاستفسارات الخاصة باللوائح الفنية والمواصفات وإجراءات تقييم المطابقة فى الدولة والإخطار بمشاريع اللوائح الفنية.

كذلك إجراءات تقييم المطابقة الخاصة بالدولة قبل اعتمادها وإصدارها بفترة زمنية محددة، ونشر إصدارات إخطارت أعضاء المنظمة على الجهات المعنية داخل الدولة لدراستها وإبداء الرأي وذلك لضمان مواكبة القطاع الصناعي بالدولة للمتطلبات الفنية الخاصة بالتصدير إلى الدول الأعضاء في المنظمة.

ويُعنى قطاع المواصفات والتشريعات الفنية بإعداد المواصفات القياسية الوطنية واللوائح الفنية والأنظمة الرقابية لخدمة ودعم الصناعة الوطنية وزيادة تنافسيتها وتسهيل وصولها إلى الأسواق الدولية، كذلك تعزيز جودة مخرجات الصناعة الوطنية وتلبية متطلبات الصحة والسلامة وحماية البيئة والتي تسهم في حماية حقوق المستهلك، إضافة إلى إعداد وصياغة سياسة وطنية وأنظمة للقياس والمترولوجيا القانونية كجزء من البنية التحتية للجودة.

كذلك فإن القطاع مسؤول عن تقييم احتياجات القياس في الدولة وتحسين خدمات القياس القانونية، وبناء قدرات القياس محليا ونقل المعرفة للوصول بقدرات القياس والمعايرة الإماراتية إلى الاعتراف الدولي، بالصورة التي تعزز التنافسية والاستدامة للاقتصاد الوطني، وترتقي بجودة وسلامة المنتجات، وترفع من كفاءة الإجراءات الهادفة إلى تطبيق أعلى المعايير.`,
    contentEn: `The Industrial Growth Sector includes the Department of Industrial Policies and Legislation and the Department of National Added Value.

The Department of Industrial Policies and Legislation devises strategies and policies that support industrial development in the country, sets out a framework for the regulation of licenses in the industrial sector, develops legislation governing industrial activities and production while overseeing the implementation of industrial law.

The Sector identifies priority industries for the National Industrial Strategy in cooperation with the concerned entities, in addition to addressing challenges facing industrial sectors, and encouraging national transition to new and priority areas. It also defines new industrial activities, issues industry-specific licenses, and grants concessions and exemptions for industrial projects.

The Department of National Added Value focuses on enhancing national added value and increasing local industrial content through designing and updating the National Added Value Program that promotes local products while supervising its implementation. It outlines the program’s objectives and defines and monitors its key performance indicators.

The Department also sets guidelines and templates for suppliers, accredits certification bodies, issues list of mandatory products, and develops the Made in the Emirates program. In addition, it links national added value with incentives that encourage industrial development and coordinates the design and implementation of incentive programs in partnership with government agencies and major national institutions.`,
  },
  {
    titleAr: 'قطاع شؤون المطابقة',
    titleEn: 'Conformity Services Sector',
    contentAr: `قطاع شؤون المطابقة هو الأكثر تماساً مع مفاهيم الكفاءة والامتثال في عمليات الإنتاج وتوريد المنتجات، حيث يضمن- عبر دور تكاملي في تطوير السياسات في الوزارة - أن خطوط الإنتاج في الدولة، تطبق أفضل الممارسات، طبقاً للمواصفات القياسية والأنظمة واللوائح الفنية الإماراتية والدولية، كما يضطلع بوضع الخطط الاستراتيجية والتشغيلية والإشراف على تنفيذها بعد اعتمادها، ضمن قطاع الشؤون الرقابية والفنية والمطابقة.

ويرتبط عمل قطاع المطابقة بكفاءة عملية وآليات الإنتاج، وضمان تطبيق المصانع في الدولة، والموردين للمنتجات من الخارج، للمواصفات القياسية والتشريعات والأنظمة الرقابية واللوائح الفنية المعتمدة، والتي تحقق أعلى معايير الكفاءة في الإنتاج والتصنيع، ويمتد في بعض الأحيان إلى سلسلة الإمداد كاملة، من نقل وتخزين وعرض حتى يصل المنتج إلى المستهلكين.

ويُعد القطاع ويُحدّث المتطلبات والتشريعات والأدلة والمواصفات المتخصصة المتعلقة بأنظمة تقييم المطابقة، فضلاً عن إنشاء وإدارة نظام سحب واستدعاء المنتجات غير المطابقة على مستوى الدولة والتنسيق لتوحيد الإجراءات على المستوى الوطني والدولي لتبادل المعلومات بشأن المنتجات التي تشكل خطورة على البيئة والصحة وسلامة المستهلك.

كما يعنى القطاع بوضع نظم لمتابعة تطبيق المواصفات، والرقابة على مطابقة المنتجات والسلع للمواصفات القياسية، وتطبيق النظام التشريعي الخليجي للمطابقة ومنح شارة المطابقة الخليجية، ووضع وتنفيذ آليات وإجراءات التقييم الفني للمنتجات والتحقق من مطابقتها للمتطلبات الدولية، فضلاً عن التحقق من كفاءة المصانع الوطنية والدولية في التقدم للحصول على الشهادات وشارات المطابقة من خلال التقييم الميداني.

ويتحقق القطاع من مطابقة المنتجات والخدمات الوطنية المحلية والمستوردة للمواصفات القياسية لمنح شهادات وشارات المطابقة، ويصدر تراخيص استخدام هذه الشارات وفق النظم الصادرة عن الوزارة والمنظمات الدولية مثل شارة "حلال" وشارة الزراعة العضوية والمستدامة والشارة البيئية وشارات كفاءة الطاقة والمياه.

ويضع قطاع المطابقة نظم للرقابة على مطابقة المنتجات والسلع للمواصفات القياسية، بالتنسيق مع الجهات المعنية ووفقًا للتشريعات المنظمة، كما يمنح شهادات المطابقة للمنتجات والسلع وفقاً للمواصفات القياسية المعتمدة والإلزامية، كذلك يُعنى بالحصول على الاعترافات الثنائية والدولية بالنظام الوطني للمطابقة من المنظمات الإقليمية والدولية، ويضع تدابير لضمان استمرارية هذه الاعترافات لإزالة العوائق الفنية في حركة تجارة المنتجات.

كذلك، الانضمام إلى عضوية المنظمات الإقليمية والدولية وتمثيل الدولة في المحافل الدولية والمشاركة في اللجان والمؤتمرات في مجال التحقق من المطابقة ومنح الشهادات .`,
    contentEn: `The Industrial Accelerators Sector aims to develop the UAE’s industrial sector, enhance its competitiveness, fast-track its growth and drive innovation by establishing an enabling framework and launching accelerator programs in collaboration with relevant entities.

The Sector plays an integral role in attracting investment to the country’s industrial sector through the Investment Office that builds direct communication networks, acts as a point of contact between investors and public and private sector entities, and determines the requirements of investors (e.g. procedures for issuing licenses). It also identifies opportunities, events and other enabling factors for investors, as well as available incentives and financing in cooperation with Emirates Development Bank and other financing entities.

In addition, the Sector analyzes current data related to MoIAT’s specialties, reviews industrial trends, forecasts future developments that may impact the industrial sector and other sectors, and evaluates their impact on the ministry’s strategies and policies.`,
  },
  {
    titleAr: 'قطاع التنمية الصناعية',
    titleEn: 'Industrial Growth Sector',
    contentAr: `يضم قطاع التنمية الصناعية إدارتي السياسات والتشريعات الصناعية والقيمة الوطنية المضافة وهو القطاع المعني بإعداد وتطوير الاستراتيجيات و السياسات والتشريعات التي تخدم التنمية الصناعية في الدولة بالإضافة إلى تعزيز القيمة الوطنية المضافة و زيادة المحتوى المحلي الصناعي.

ويعمل القطاع على توفير إطار عمل لسياسة وتنظيم للتراخيص في القطاعات الصناعية وتطوير التشريعات للأنشطة والإنتاج الصناعي وكذلك تطوير ومراجعة وضمان تطبيق القانون الصناعي.

يُعنى القطاع بتحديد القطاعات الصناعية ذات الأولوية وتحديد استراتيجية الصناعة الوطنية بالتعاون مع الجهات المعنية، وصنع السياسات، ومعالجة التحديات التي تواجه القطاعات الصناعية القائمة، وتشجيع التحول الوطني إلى مجالات جديدة وذات أولوية في القطاعات الصناعية. أيضا تحديد الأنشطة الصناعية الجديدة وتطوير تراخيص صناعية محددة، وكذلك ومنح الامتيازات والإعفاءات للمشاريع الصناعية و الإشراف على تنفيذ المبادرات الاستراتيجية المتعلقة بالسياسات والتشريعات الصناعية.

ومن أبرز اختصاصات القطاع تصميم وتحسين عناصر برنامج القيمة الوطنية المضافة، ترويج المنتجات المحلية الوطنية وتشجيع زيادة المحتوى الصناعي المحلي وضع مستهدفات البرنامج ومتابعة المراحل الرئيسية لتنفيذه، وإرشادات وقوالب للموردين، وتجهيز جهات منح الشهادات لمباشرة العمل، وإصدار قائمة المنتجات الإلزامية، كذلك تولي المسؤولية عن تصميم برنامج "صُنع في الإمارات"، وربط القيمة الوطنية المضافة بالحوافز التي تُشجع التنمية الصناعية، و تطوير ومتابعة مؤشرات الأداء الرئيسية لبرنامج القيمة الوطنية المضافة، وتنسيق تصميم وتنفيذ برامج الحوافز من خلال إقامة شراكات مع الجهات الحكومية والمؤسسات الوطنية الكبرى.`,
    contentEn: `
The Conformity sector is closely linked to efficiency and compliance in the production processes and product supply. Through its complementary role in developing policies at the Ministry, it ensures that production lines in the country apply best practices in accordance with the UAE and international standards, specifications and technical regulations in production and manufacturing. This may extend to the entire supply chain – from transportation, storage and sales to product delivery to consumers. It also sets out strategic and operational plans, and supervises their implementation.

The Sector prepares and updates the requirements, legislation, manuals and specifications related to metrology assessment systems, in addition to establishing and managing a recall system for non-conforming products in the UAE. It also coordinates the standardization procedures at the national and international levels to exchange information on products that pose risks to the environment, health and consumer safety and more.

The Sector establishes systems to monitor the implementation of standards, applies GCC standards and grants the Gulf Conformity Mark, develops and implements mechanisms and procedures for technical evaluation and conformity verification of products and commodities, in addition to conducting inspections of local and international factories applying to obtain conformity certificates and marks.

The Sector grants certificates of conformity to local and imported products and commodities after verifying their conformity to the standard specifications. In accordance with the regulations of the ministry and international organizations, it also issues permits to use marks such as the halal mark, the organic and sustainable agriculture mark, the environmental mark, and the energy and water efficiency marks.

The Sector works to obtain bilateral and multinational recognitions for the national measurement system from regional and global organizations, and implements measures to ensure the continuity of these recognitions and remove technical obstacles to product trade movement. In addition, it seeks memberships in regional and global organizations, represents the country at international events, and participates in committees and conferences on conformity validation and certificate issue.`,
  },
  {
    titleAr: 'قطاع المسرعات الصناعية',
    titleEn: 'Industrial Accelerators Sector',
    contentAr: `يهدف قطاع المسرعات الصناعية إلى تمكين القطاع الصناعي في الدولة وتعزيز تنافسيته، وتسريع وتيرة النمو والابتكار من خلال تطوير البنية التنظيمية الداعمة والبرامج المسرّعة بالتنسيق مع الشركاء من الجهات المعنية.

وللقطاع أهمية كبيرة في جذب الاستثمار في القطاع الصناعي في الدولة من خلال "مكتب الاستثمار" المعني ببناء شبكات تواصل مباشرة، والعمل كنقطة وصل بين المستثمرين والجهات المعنية من القطاعين العام والخاص، والعمل على فهم متطلبات المستثمرين (على سبيل المثال، إجراءات إصدار التراخيص الخ)، وتحديد الفرص والفعاليات وعوامل التمكين الأخرى المساندة للمستثمرين، وتحديد الحوافز وفرص التمويل المتوافرة والحصول عليها بالتنسيق مع مصرف الإمارات للتنمية وجهات التمويل الأخرى.

كما سيُعنى القطاع بتحليل بيانات الوضع الحالي للمجالات ذات الصلة باختصاصات الوزارة، وتحليل التوجهات الصناعية وتوقع التطورات المستقبلية المحتمل أن يكون لها تأثير على القطاع الصناعي والقطاعات الأخرى، وتقييم أثرها على استراتيجيات الوزارة وسياساتها.`,
    contentEn: `The Standards and technical Legislation Sector is one of the most important sectors supporting the UAE’s industrial ecosystem. It is responsible for issuing national standard and technical and metrology regulations through technical committees and specialized working groups that include representatives of relevant entities in the industrial, commercial and service sectors, research and educational institutions, and concerned government authorities.

In addition to the development and implementation of standards and technical legislation, the Sector evaluates their impact with the aim of creating a secure and flexible legislative environment that can keep pace with progress in the field of future industries and overcome potential challenges. It also drives innovation, runs advanced technology initiatives and develops quality infrastructure in line with the country’s strategy.

The Sector helps facilitate trade and technology transfer between countries by harmonizing national standards with international best practices to ensure the quality of local products.

In line with the UAE’s commitments to World Trade Organization (WTO) agreements, MoIAT oversees the UAE National Enquiry Point for the Technical Barriers to Trade (TBT) Agreement, established in 2005. As part of this mandate, the Sector responds to inquiries on technical regulations and specifications as well as conformity assessment procedures, and notifies WTO of technical regulations projects.

In addition, the Sector submits national standards to WTO for evaluation prior to accreditation and issuance, and communicates feedback from the Organization to the concerned authorities in the UAE to align the country’s industrial sector with the technical requirements for export to the other member states.

As part of the country’s quality infrastructure, the Sector develops national policies and standard specifications, technical regulations, and legal metrology and control systems to boost the competitiveness of the national industry, facilitate its access to international markets, meet health, safety and environmental protection requirements, and safeguard consumer rights.

Furthermore, the Sector is tasked with assessing the country’s metrology needs, upgrading legal metrology services, building local metrology capabilities and sharing knowledge to gain international recognition for the UAE’s metrology and standardization capabilities with the aim of enhancing the competitiveness and sustainability of the national economy, improving the quality and safety of local products, and raising the efficiency of standard implementation.`,
  },
];

export default function SectorsSection() {
  const {colors}: any = useTheme();
  const {t} = useTranslation();
  const styles = getStyle(colors);
  const arabic = isArabic();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <View>
      <Text h3 bold style={styles.header}>
        {arabic ? 'القطاعات' : 'Our Sectors'}
      </Text>
      <View style={styles.container}>
        {sectorsData.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Accordion
              key={index}
              // showBorder

              title={arabic ? item.titleAr : item.titleEn}
              expandedDefault={isActive}
              onPress={() => setActiveIndex(isActive ? null : index)}
              styleHeader={styles.accordHeadaer}
              styleBody={styles.accordBody}
              styleTilte={{
                color: isActive ? colors.secondaryColor : colors.text,
              }}
              styleIcon={{
                tintColor: isActive ? colors.secondaryColor : colors.text,
              }}
              styleConatiner={{
                ...styles.accordItem,
                marginTop: index === 0 ? 0 : 12 * BW(),
              }}>
              <View style={styles.item}>
                <Text h4>{arabic ? item.contentAr : item.contentEn}</Text>
              </View>
            </Accordion>
          );
        })}
      </View>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.lightgray + '55',
      padding: 16 * BW(),
      paddingBottom: 18 * BW(),
      borderRadius: 10 * BW(),
    },
    header: {
      marginBottom: 8 * BW(),
    },
    item: {
      paddingBottom: 24 * BW(),
      paddingTop: 8 * BW(),
    },
    accordItem: {
      // backgroundColor: colors.lightgray + '99',

      borderBottomColor: colors.gray,
      borderBottomWidth: 1 * BW(),
    },
    accordHeadaer: {
      backgroundColor: 'transparent',
    },
    accordBody: {
      backgroundColor: 'transparent',
    },
  });
