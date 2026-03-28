import React, {Fragment, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Accordion from '../../../component/Accordion';
import Text from '../../../component/Text';
import {isArabic} from '../../../locales';
import {BW} from '../../../style/theme';

export default function PrivacyPolicyContent() {
  const {colors}: any = useTheme();
  const {t} = useTranslation();
  const arabic = isArabic();
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);

  return (
    <View style={styles.container}>
      {policySections.map((item, index) => {
        const isActive =
          activeIndex == null ? index == 0 : index === activeIndex;
        return (
          <Fragment key={index}>
            {index == 0 ? (
              <Text h4 style={{marginBottom: 16 * BW()}}>
                {arabic ? item.contentAr : item.contentEn}
              </Text>
            ) : (
              <Accordion
                title={arabic ? item.titleAr : item.titleEn}
                expandedDefault={isActive}
                onPress={() => setActiveIndex(isActive ? '' : index)}
                styleHeader={{backgroundColor: colors.white}}
                styleBody={{
                  paddingBottom: 12 * BW(),
                  paddingTop: 8 * BW(),
                  backgroundColor: colors.white,
                }}
                styleIcon={{
                  tintColor: colors.secondaryColor,
                }}
                styleTilte={{
                  color: isActive
                    ? colors.secondaryColor
                    : colors.textPrimaryColor,
                }}
                showBorder
                styleConatiner={{marginBottom: 16 * BW()}}>
                <View style={styles.item}>
                  <Text h4>{arabic ? item.contentAr : item.contentEn}</Text>
                </View>
              </Accordion>
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  item: {
    paddingVertical: 8 * BW(),
  },
});

const policySections = [
  {
    titleEn: 'Introduction',
    titleAr: 'مقدمة',
    contentEn: `This agreement is made between Ministry of Industry and Advanced Technology and the user of its mobile app, be it signed up or otherwise. Once agreed to the terms of use, the user may browse the mobile app and use it according to these terms and condition, this introduction is an integral part of this agreement. The terms are:`,
    contentAr: `هذه الاتفاقية هي عقد مبرم بين وزارة الصناعة والتكنولوجيا المتقدمة، ومن يستخدم تطبيقها الإلكتروني على شبكة الإنترنت سواء كان المستخدم مسجلاً أم لا، وبموافقة المستخدم على شروط التطبيق يمكنه الدخول إليه واستخدامه حسب شروط الاتفاقية، وتعتبر هذه المقدمة جزءاً لا يتجزأ من هذه الاتفاقية والشروط هي:`,
  },
  {
    titleEn: 'Disclaimer of Warranty',
    titleAr: 'شروط الاستخدام',
    contentEn: `In addition to the provisions of this agreement, browsing this mobile app shall also be subject to the federal laws of the United Arab Emirates, local laws and international conventions to which the UAE is party Therefore, the mobile app user shall not be entitled to use the logo of the Ministry of Industry and Advanced Technology or the contents of its mobile app, which are subject to intellectual property rights applicable in the UAE and the international conventions made in this regard, without a proper consent from the Ministry of Industry and Advanced Technology, and adopting the proper course of action set for this practice you expressly understand and agree that your use of the site, or any material available through this site, is at your own risk. Neither Ministry of Industry and Advanced Technology nor its employees warrant that the site will be uninterrupted, problem-free, free of omissions, or error-free; nor do they make any warranty as to the results that may be obtained from the use of the site. The content and function of the site are provided to you "as is," without warranties of any kind, either express or implied.`,
    contentAr: `لا تتحمل وزارة الصناعة والتكنولوجيا المتقدمة المسؤولية بأي حال من الأحوال الأضرار العرضية، أو المباشرة أو غير المباشرة أو الخاصة أو العقابية أو النموذجية أو الناشئة، والتي قد تظهر نتيجة لاستخدامك أو عدم قدرتك على استخدام التطبيق، بما في ذلك ومن دون حصر ضياع الدخل أو ضياع السمعة أو ضياع العمل أو ضياع البيانات أو تعطل الكمبيوتر أو عمله بصورة خاطئة أو أي أضرار أخرى.

إن المستخدم لهذا التطبيق يخضع بجانب هذه الاتفاقية للقوانين الاتحادية لدولة الإمارات العربية المتحدة والقوانين المحلية والاتفاقيات الدولية التي تكون دولة الإمارات طرفاُ فيها، ولذلك، فإنه لا يحق له استخدام شعار الوزارة ومحتويات تطبيقها اللذان يخضعان للحماية بموجب قوانين الملكية الفكرية المعمول بها داخل الدولة والاتفاقيات الدولية المبرمة بخصوصها دون إذن مسبق من الوزارة و إتباع الإجراءات المتبعة لديها في هذا الخصوص.
`,
  },
  {
    titleEn: 'Amendment',
    titleAr: 'تعديل الاتفاقية',
    contentEn: `Ministry of Industry and Advanced Technology may amend the terms & conditions of this agreement, provided a notice to this effect shall be displayed on this webpage. Amendments shall take effect once made. Your recurrent browsing of the mobile app, following introduction of those amendments, shall be construed as endorsement of those amendments. You have therefore got to visit this webpage regularly to review the terms & conditions of use.`,
    contentAr: `يحق لوزارة الصناعة والتكنولوجيا المتقدمة، تعديل هذه الشروط والأحكام على أن يتم وضع إشعار بحدوث تعديلات على هذه الصفحة، وتدخل التعديلات حيز النفاذ بمجرد إحداثها، إن استخدامك المتكرر للتطبيق بعد إحداث تلك التعديلات يعني موافقتك على التعديلات، ويتعين عليك القيام بزيارات دورية لهذه الصفحة لمراجعة شروط وأحكام الاستخدام.`,
  },
  {
    titleEn: 'Required Conduct',
    titleAr: 'التصرف المطلوب',
    contentEn: `You agree to access and use the site only for lawful purposes, and that you are fully aware of all laws, statutes, rules and regulations pertaining to your use of the site. By accessing the site, you agree that you will not: Use the site to commit a crime or encourage others to engage in any conduct which would constitute a criminal offense or give rise to civil liability; Post or transmit any discriminatory, libelous, harassing, defamatory, obscene, pornographic, or otherwise unlawful content against any party;Use the site to impersonate other parties or entities;Use the site to upload any content that contains a software virus, "Trojan horse" or any other computer code, files, or programs that may alter, damage, or interrupt the functionality of the site or the hardware or software of any other person who accesses the site; Upload, post, email, or otherwise transmit any materials that you do not have a right to transmit under any law or under a contractual relationship;Alter, damage, or delete any content posted on the site; Disrupt the normal flow of communication in any way; Claim a relationship with or represent any business, association, or other organization with which you are not authorized to claim such a relationship or represent;Post or transmit any unsolicited advertising, promotional materials, or other forms of solicitation; Post any material that infringes upon or violates the intellectual property rights of another; orCollect or store personal information about others`,
    contentAr: `أنت توافق على دخول واستخدام التطبيق لأغراض مشروعة فقط، وعلى علم كامل بكل القوانين والأنظمة والقواعد والأحكام والشروط المتعلقة باستخدامك للتطبيق، وبمجرد دخولك إلى التطبيق فإنك توافق على الامتناع عن:
استخدام التطبيق من أجل ارتكاب جريمة أو تشجيع الآخرين على التورط في أي تصرف قد يعد جريمة أو ينطوي على مسؤولية مدنية، ادخال أو نشر أي محتويات غير قانونية تتضمن تمييزاً أو تشهيراً أو إساءة أو قذف أو فاحشة ضد أي جهة كانت أو مواد إباحية، استخدام التطبيق من أجل انتحال شخصيات أو أطراف أخرى، استخدام التطبيق لتحميل أي مادة فيها برامج تحتوي على فيروسات أو ملفات تجسس أو أي شفرات حاسوبية أو ملفات أو برامج قد تعمل على تغيير أو إتلاف أو إعاقة عمل التطبيق أو أي جهاز أو برنامج عائد إلى أي شخص يدخل إلى التطبيق، تحميل أو إدخال أو إرسال أو بث لأي مواد لا يحق لك بثها بموجب أي قانون أو علاقة تعاقدية، تغيير أو إتلاف أو شطب أي محتوى على التطبيق، تعطيل خطوط الاتصال الاعتيادية بأي شكل كان، الادعاء بالارتباط مع أو تمثيل أي شركة أو جمعية أو هيئة من دون أن تكون مخولاً بادعاء تلك العلاقة أو ذلك التمثيل، نشر أو بث أي إعلان أو مادة دعائية أو أي شكل من أشكال الترويج، نشر أي مادة تتنافى أو تتعارض مع حقوق الملكية الفكرية للآخرين، جمع أو تخزين المعلومات الشخصية عن الآخرين.
`,
  },
  {
    titleEn: 'Registration',
    titleAr: 'التسجيل',
    contentEn: `Certain portions of the site are limited to registered users and/or allow a user to request support or services online by entering personal information. You agree that any information provided to us in these areas will be complete and accurate, that you will not register under the name of, nor attempt to enter the site under the name of, another person, and that you will not adopt a user name that Ministry of Industry and Advanced Technology, in its sole discretion, deems offensive.`,
    contentAr: `بعض أجزاء التطبيق لا تفتح إلا للأعضاء المسجلين و/أو تتيح للمستخدم طلب الدعم أو الخدمات إلكترونياً عبر إدخال المعلومات الشخصية، أنت توافق على أن أي معلومات تقدم لنا عبر تلك الأجزاء هي معلومات كاملة ودقيقة، وأنك لن تقوم بالتسجيل، ولن تحاول دخول التطبيق مستخدماً اسم شخص آخر، ولن تتبنى اسم مستخدم قد تراه وزارة الصناعة والتكنولوجيا المتقدمة غير مناسب.`,
  },
  {
    titleEn: 'Collection and Use of Online Information',
    titleAr: 'جمع واستخدام المعلومات الإلكترونية',
    contentEn: `Ministry of Industry and Advanced Technology web server automatically collects your IP address when you visit our site (your IP address is your computer's unique address that lets other computers attached to the internet know where to send data but does not identify you individually). We use your IP address to help diagnose problems with our server and to compile statistics on site usage.

Using IP address helps in diagnosing the technical problems encountered by our mobile app, and conduct necessary statistics to measure our mobile app use. We undertake not to share your IP address with any party, other than the technical team of the and Ministry of Industry and Advanced Technology and its consultants, who are bound by non-disclosure agreements with the and Ministry of Industry and Advanced Technology.

In order to provide a better-quality service and a more dynamic mobile app, some parts of this mobile app might use cookies as part of interaction with your browser. The cookie is a small text file sent to your computer’s hard disk to enable our mobile app to recognize your computer. The cookie will not attempt to read any information contained in your computer's hard drive. We do not collect and match cookies data with any other personal information in order to recognize your identity or your e-mail address.`,
    contentAr: `عند زيارتك للتطبيق الالكتروني الخاص بوزارة الصناعة والتكنولوجيا المتقدمة، سيعمل التطبيق تلقائياً على التقاط عنوان بروتوكول الإنترنت الخاص بك (عنوان بروتوكول الإنترنت الخاص بك هو الرقم الخاص بجهاز الكمبيوتر الذي تستخدمه، والذي يسمح للأجهزة الأخرى الموصولة بشبكة الإنترنت بتحديد وجهة البيانات الصادرة عنها، لكن من دون التعرف عليك شخصياً)، واستخدام بروتوكول الإنترنت يساعد على تشخيص المشكلات التقنية التي قد تحدث في التطبيق الخاص بنا، وإجراء الإحصاء اللازم لقياس استخدام التطبيق، ونحن نلتزم بعدم السماح لأي جهة خارج إطار الفريق الفني لوزارة الصناعة والتكنولوجيا المتقدمة ومستشاريها الملتزمين باتفاقيات معها بالاطلاع على بروتوكول الإنترنت الخاص بك.

ومن أجل تقديم خدمة أفضل وتطبيق إلكتروني أكثر فاعلية يمكن لبعض أقسام هذا التطبيق استخدام برامج الكوكي (cookies) كجزء من التفاعل مع متصفحك، وبرنامج الكوكي هو عبارة عن ملف نصي صغير نرسله إلى القرص الصلب الخاص بك ليتمكن تطبيقنا من التعرف على كمبيوترك، ولن يقوم الكوكي بمحاولة قراءة أي من المعلومات الموجودة على قرصك الصلب، ونحن لا نقوم بتجميع معلومات برامج الكوكي مع أي معلومات شخصية أخرى من أجل تحديد هويتك أو عنوان بريدك الإلكتروني.
`,
  },
  {
    titleEn: 'Protection of Personal Information',
    titleAr: 'حماية معلوماتك',
    contentEn: `Your personal information is only available to the Ministry of Industry and Advanced Technology employees who have a need to know it. It will not be available for public inspection without your consent. Also, no site user information will be shared, sold, or transferred to any third party without your prior consent. Access to such information is only given to those qualified professionals who provide and Ministry of Industry and Advanced Technology online services consistent with your interactions with our site.`,
    contentAr: `عند زيارتك لبعض أجزاء هذا التطبيق أو التسجيل لبعض الخدمات، ربما يطلب منك تقديم معلومات شخصية للتعريف بهويتك مثل الاسم، والعنوان، والجنس، وربما رقم بطاقة الائتمان وهي كلها معلومات ضرورية لإتمام معاملتك، غير أن رقم بطاقتك لن يتم تخزينه مطلقاً وتحت أي ظرف، وفي حال رفضك تقديم تلك المعلومات، فإنك بذلك تحد من قدرتنا على خدمتك ولكن استخدام التطبيق رغم ذلك متاح حسب هذه الشروط.`,
  },
  {
    titleEn: 'Safe Transfer of Information',
    titleAr: 'انتقال آمن للمعلومات',
    contentEn: `This mobile app undertakes to provide sufficient protection for the information you provide to us. We employ electronic, material and legal protection measures to maintain your confidential information. Additionally, we encrypt information classified as sensitive (such as credit card numbers) or data that have to be kept confidential according to statutory requirements.`,
    contentAr: `لن تكون معلوماتك الشخصية متاحة إلا لموظفي الوزارة الذين تقتضي ظروف عملهم الاطلاع على تلك المعلومات، ولن تكون تلك المعلومات متاحة لاطلاع الجمهور من دون موافقتك، وعلاوة على ذلك لن يتم تبادل أو تداول أي من تلك المعلومات لأي طرف آخر من دون موافقتك المسبقة، ولن يتم السماح بالوصول إلى المعلومات إلا من قبل الأشخاص المؤهلين والمختصين الذين يتولون تقديم خدمات الوزارة الإلكترونية المتسقة مع تعاملاتك من تطبيقنا الالكتروني.`,
  },
  {
    titleEn: 'Right to review, amend or correct personal details',
    titleAr: 'حماية المعلومات الشخصية',
    contentEn: `Any user supplying us with his /her personal details is entitled to review or amend those personal details at any time`,
    contentAr: `لن تكون معلوماتك الشخصية متاحة إلا لموظفي الوزارة الذين تقتضي ظروف عملهم الاطلاع على تلك المعلومات، ولن تكون تلك المعلومات متاحة لاطلاع الجمهور من دون موافقتك، وعلاوة على ذلك لن يتم تبادل أو تداول أي من تلك المعلومات لأي طرف آخر من دون موافقتك المسبقة، ولن يتم السماح بالوصول إلى المعلومات إلا من قبل الأشخاص المؤهلين والمختصين الذين يتولون تقديم خدمات الوزارة الإلكترونية المتسقة مع تعاملاتك من تطبيقنا الالكتروني.

الحق في معاينة أو تعديل أو تصحيح البيانات الشخصية:
يحق لأي مستخدم يزودنا بمعلوماته الشخصية معاينة أو تعديل أو تصحيح معلوماته الشخصية في أي وقت.
`,
  },
  {
    titleEn: 'Termination of Use',
    titleAr: 'إنهاء الاستخدام',
    contentEn: `Ministry of Industry and Advanced Technology may, in its sole discretion, terminate or suspend your access to or use of this site without a prior notice for your violation of these terms and conditions or laws applicable in the UAE, or for other conduct which Ministry of Industry and Advanced Technology, in its sole discretion, believes is breaching international agreements and conventions or harmful to others. In the event of termination, you will no longer be authorized to access the site, and Ministry of Industry and Advanced Technology will use any means possible to enforce this termination.`,
    contentAr: `لوزارة الصناعة والتكنولوجيا المتقدمة كل الحق في إنهاء أو تعليق دخولك أو استخدامك لهذا التطبيق من دون إشعار مسبق وذلك بسبب انتهاكك لهذه الشروط أو القوانين المعمول بها في دولة الإمارات أو بسبب أي تصرف قد ترى وزارة الصناعة والتكنولوجيا المتقدمة أنه مخالف للاتفاقيات الدولية والأعراف أو مضر بالآخرين، وفي حال الإنهاء لن يكون في إمكانك الدخول إلى التطبيق، وسوف تستخدم وزارة الصناعة والتكنولوجيا المتقدمة كل وسيلة متاحة لتطبيق هذا المنع.`,
  },
  {
    titleEn: 'Other Site Links',
    titleAr: 'وصلات المواقع الأخرى',
    contentEn: `The privacy policy applies only to the mobile app of the Ministry of Industry and Advanced Technology. In the event of shifting to another mobile app though the link provided at and Ministry of Industry and Advanced Technology mobile app, you should read the privacy policy of that mobile app so as to be aware of the applicable practices. and Ministry of Industry and Advanced Technology will therefore not accept responsibility or liability for any harm or loss incurred as a result of surfing that mobile app which is not operated by Ministry of Industry and Advanced Technology.

Ministry of Industry and Advanced Technology does not control these mobile apps nor do we review or control their content. Ministry of Industry and Advanced Technology provides these links to users for convenience. These links are not an endorsement of products, services, or information, and do not imply an association between Ministry of Industry and Advanced Technology and the operators of the linked mobile app. When you select a link to an outside mobile app, you are subject to the terms and conditions of the owner/sponsors of that outside mobile app.`,
    contentAr: `ينطبق نهج الخصوصية هذا على التطبيق الالكتروني لوزارة الصناعة والتكنولوجيا المتقدمة فقط، وفي حال انتقلت إلى تطبيق آخر من خلال رابط موجود في صفحات تطبيق الوزارة فإنه يتعين عليك قراءة نهج الخصوصية الخاص بذلك التطبيق لتحديد الممارسات المعتمدة هناك والوزارة غير مسئولة عن أي أضرار تنتج عن الدخول لهذه المواقع، حيث أن هذه المواقع لا يتم تشغيلها من قبل وزارة الصناعة والتكنولوجيا المتقدمة وليس للوزارة سيطرة عليها، كما أننا لا نقوم بمراجعة أو التحكم بالمحتوى الخاص بتلك المواقع، إن وزارة الصناعة والتكنولوجيا المتقدمة توفر تلك الوصلات من باب التسهيل على المستخدمين، وليس لتلك الوصلات أي مضامين ترويجية خاصة بالسلع أو الخدمات أو المعلومات، وهي لا تنطوي على أي ربط ما بين وزارة الصناعة والتكنولوجيا المتقدمة ومشغلي المواقع المتصلة، وعند اختيارك لوصلة خاصة بتطبيق خارجي، فإنك تكون خاضعاً للشروط والأحكام الخاصة بمالك/راعي ذلك التطبيق الخارجي.`,
  },
  {
    titleEn: 'Content',
    titleAr: 'المحتوى',
    contentEn: `Ministry of Industry and Advanced Technology reserves the right to monitor any content that you provide, but should not be obligated to do so. Although Ministry of Industry and Advanced Technology cannot monitor all postings on the site, we reserve the right (but assume no obligation) to delete, move, or edit any postings that violate these terms and conditions, the laws of the United Arab Emirates, and the international conventions to which the UAE is a party.`,
    contentAr: `تحتفظ وزارة الصناعة والتكنولوجيا المتقدمة بالحق في مراقبة أي محتوى يتم إدخاله من قبلك غير أنها ليست ملزمة بذلك، ومع أن وزارة الصناعة والتكنولوجيا المتقدمة لا تستطيع مراقبة كل ما يتم إدخاله على التطبيق، فإننا نحتفظ بالحق (من دون التزام) في شطب أو إزالة أو تحرير أي مواد مدخلة من شأنها انتهاك شروط هذه الاتفاقية وقوانين دولة الإمارات العربية المتحدة والإتفاقات الدولية التي تكون دولة الإمارات طرفاً فيها.`,
  },
  {
    titleEn: 'Indemnity',
    titleAr: 'التعويض',
    contentEn: `You agree to defend the interests of the Ministry of Industry and Advanced Technology with any party, official or otherwise, in connection with any claim, financial or otherwise, arising from any breach by you of any of the terms and conditions of this agreement. Accordingly, you will bear all costs, financial or otherwise, resulting from your breach of any of the conditions of this agreement, be it insurance, compensation, fees or any other costs, financial or otherwise. Any settlement made with anybody, official or otherwise, in connection with any breach of the conditions of this agreement shall not be valid and effective, unless with the explicit written consent of the Ministry of Industry and Advanced Technology.`,
    contentAr: `أنت توافق على الدفاع عن مصالح الوزارة لدى أي جهة رسمية أو غير رسمية بسبب أي مطالبة مالية أو غير مالية نتجت عن انتهاكك لأي شرط من شروط هذه الاتفاقية ونتيجة لذلك فإنك تتحمل كل التكاليف المالية وغير المالية التي نتجت عن انتهاكك لأي شرط من شروط هذه الاتفاقية سواء أكانت تأميناً أو تعويضاً أو رسوماً أو أي تكاليف مالية أو غير مالية أخرى، وكل تسوية تقوم بها لدى أي جهة رسمية أو غير رسمية بسبب انتهاكك لأي شرط من شروط هذه الاتفاقية لا تصبح صحيحة ونافذة المفعول إلا بموافقة الوزارة الصريحة والخطية لها.`,
  },
  {
    titleEn: 'Limitation of Liability',
    titleAr: 'التنازل عن الضمان',
    contentEn: `In no event will Ministry of Industry and Advanced Technology be liable for any incidental, indirect, special, punitive, exemplary, or consequential damages, arising out of your use of or inability to use the site, including without limitation, loss of revenue or anticipated profits, loss of goodwill, loss of business, loss of data, computer failure or malfunction, or any other damages.`,
    contentAr: `أنت تفهم بوضوح وتوافق على أن استخدامك للتطبيق أو أي مادة متاحة من خلاله هي خاضعة لمسؤوليتك الخاصة، ولا توفر لوزارة الصناعة والتكنولوجيا المتقدمة ولا أي من موظفيها ضمانة بأن التطبيق لن يتعرض للتوقف أو أنه سيكون خالياً من المشاكل أو الحذف أو الأخطاء، كما لا توجد ضمانة بشأن النتيجة التي ستحصل عليها جراء استخدامك للتطبيق، إن المحتويات والأدوات على التطبيق مقدمة لك على حالها من دون ضمانات من أي نوع، سواء كانت صريحة أو ضمنية`,
  },
];
