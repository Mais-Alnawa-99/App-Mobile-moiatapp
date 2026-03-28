import React, {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {useAppDispatch} from '../../../../redux/store';
import Loader from '../../../../component/Loader';
import Page from '../../../../component/Page';
import PageBg from '../../../../component/PageBg';
import Header from '../../../../component/Header';
import Pagination from '../../../../component/Pagination';
import FlatListComp from '../../../../component/FlatList';
import Search from '../../../../component/Search';
import NationalICVCard from './NationalICVCard';
import {isArabic} from '../../../../locales';

export default function NationalICV(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData]: any = useState([]);
  const [totalCount, setTotalCount] = useState(120);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  const PAGE_SIZE = 10;
  let dataTemp = isArabic() ? dataAr : dataEn;
  useEffect(() => {
    setData(dataTemp);
    setTotalCount(dataAr.length);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    _search();
  }, [search]);
  const _search = () => {
    let tem = dataTemp.filter(p => p.ConformityBodyName.includes(search));
    setData(tem);
  };
  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId={`${params?.title}-scope`}
        styles={{padding: 8 * BW()}}
        header={
          <Header
            title={params?.title}
            hideDrawer
            titleContainerStyle={{flex: 8}}
          />
        }
        withOutScrollView
        contentContainerStyle={{}}
        withHeader>
        <Search
          search={search}
          setSearch={setSearch}
          style={{
            marginBottom: 16 * BW(),
            backgroundColor: colors.white,
            flex: undefined,
            borderRadius: 6 * BW(),
            paddingHorizontal: 12 * BW(),
            borderBottomWidth: 0,
          }}
        />
        <Loader isLoading={isLoading}>
          <FlatListComp
            data={data}
            renderItem={({item}: any) => <NationalICVCard item={item} />}
          />
        </Loader>
        {/* {totalCount > 1 && (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(newPage: number) => {
              setCurrentPage(newPage);
              // _getGetConformityBodies(newPage);
            }}
          />
        )} */}
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {},
    title: {
      marginTop: 16 * BW(),
    },
    subtitle: {
      color: colors.textColor,
      marginBottom: 8 * BW(),
    },

    submit: {
      marginTop: 20 * BW(),
      backgroundColor: colors.secondaryColor,
      minHeight: 40 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
    },
  });

const dataAr = [
  {
    '#': '1',
    ConformityBodyName: 'بي ام اس لتدقيق الحسابات',
    MemberName: 'شهينشا',
    Designation: 'مدير',
    Numbers:
      '+971 52 9402047\n+971 52 9974124\n+971 55 5569829\ninfo@bmsauditing.com',
    Email: '',
  },
  {
    '#': '2',
    ConformityBodyName: 'الشارد مدققون ومستشارون ش.ذ.م.م',
    MemberName: 'أحمد الشارد',
    Designation: 'شريك',
    Numbers:
      '+971  50 274 7388\n+971  4 255 5155 \nahmed@alsharid.com\nadmin@alsharid.com',
    Email: '',
  },
  {
    '#': '3',
    ConformityBodyName: 'ابستراكت لتدقيق الحسابات',
    MemberName: 'عمر علي الرئيسي',
    Designation: 'الشريك الإداري ومدير القيمة المضافة الوطنية',
    Numbers:
      '+971 55 424 6343\n+971 50 452 0648\n+971 4 557 0211\nomar@abstracticv.com',
    Email: '',
  },
  {
    '#': '4',
    ConformityBodyName: 'كي بي إم جي لوار جلف ليمتد',
    MemberName: 'محمد الجبر',
    Designation: 'مدير تنفيذي',
    Numbers: '+971 56 688 2440\nmaljabr@KPMG.com',
    Email: '',
  },
  {
    '#': '5',
    ConformityBodyName: 'برايس ووترهاوس كوبرز',
    MemberName: 'فيفيك أغاروال',
    Designation: 'مدير التدقيق',
    Numbers: '+971 56 992 9881\n+971 56 422 7073\nagarwal.e.vivek@pwc.com',
    Email: '',
  },
  {
    '#': '6',
    ConformityBodyName: 'الرقمية للاستشارات الإدارية',
    MemberName: 'مبارك القبيسي',
    Designation: 'المؤسس والشريك الإداري',
    Numbers: '+971 2 621 6669\n+971 54 444 4181\n+971 50 266 6634',
    Email: 'mmq@alraqamiya.ae',
  },
  {
    '#': '7',
    ConformityBodyName: 'إيه آر سي أسوسيتس',
    MemberName: 'عادل الملا',
    Designation: 'الرئيس التنفيذي',
    Numbers: '+971 50 950 9777\n+971 2  406 9690\n+971 4  591 9500',
    Email: 'adilalmulla@arcauditing.ae',
  },
  {
    '#': '8',
    ConformityBodyName: 'اردينت للمحاسبة والخدمات الاستشارية ذ.م,م',
    MemberName: 'السيد نيربهي فايديا',
    Designation: 'شريك ومستشار المخاطر',
    Numbers: '+971 565017275\n+971 2 622 6700',
    Email: 'icv@ardentadvisory.com',
  },
  {
    '#': '9',
    ConformityBodyName: 'أسستس بلس لخدمات المحاسبة والتدقيق',
    MemberName: 'يوسف الخنجري',
    Designation: 'شريك إداري',
    Numbers: '+971 2 641 6751\n+971 50 333 4684',
    Email: 'yousif@assistplus.ae',
  },
  {
    '#': '10',
    ConformityBodyName: 'بيكر تيلي إم كي إم محاسبون قانونيين',
    MemberName: 'سودهير ديشباندى',
    Designation: 'مدير - الاستشارات و التدقيق للمحتوى الوطني',
    Numbers: '+971 54 586 1577\n+971 4 369 7248',
    Email: 'sudhir@bakertillyjfc.com',
  },
  {
    '#': '11',
    ConformityBodyName: 'كروي ماك',
    MemberName: 'اوميش نارايانابا',
    Designation: 'مدير',
    Numbers: '+97156 864 4860\n+971 2 678 1130',
    Email: 'icv@crowe.ae',
  },
  {
    '#': '12',
    ConformityBodyName: 'ديلويت اند توش (الشرق الأوسط)',
    MemberName: 'فائزة سوهاون',
    Designation: 'شريك',
    Numbers: '+971 50 327 3405\n+971 2 408 2424',
    Email: 'fsohawon@deloitte.com',
  },
  {
    '#': '13',
    ConformityBodyName: 'إرنست اند يونغ',
    MemberName: 'صبيح مالك',
    Designation: 'مدير خدمات التأمين',
    Numbers: '+971 2 411 7302\n+971 50 329 7799',
    Email: 'Muhammad.arshad@ae.ey.com',
  },
  {
    '#': '14',
    ConformityBodyName: 'إيفاس محاسبون قانونيون دوليون',
    MemberName: 'فيجايا موهان',
    Designation: 'شريك إداري',
    Numbers: '+971 2 645 7775\n+971 4 272 4701\n+971 50 718 7645',
    Email: 'vijay@evasinternational.com',
  },
  {
    '#': '15',
    ConformityBodyName: 'فوكس محاسبون قانونيون',
    MemberName: 'طارق عبد الكريم',
    Designation: 'المدير العام',
    Numbers: '+971 2 644 1888\n+971 50 616 0587',
    Email: 'focusaa@emirates.net.ae',
  },
  {
    '#': '16',
    ConformityBodyName: 'جرانت ثورنتون للتدقيق والمحاسبة',
    MemberName: 'سمير حجازي',
    Designation: 'شريك، رئيس مكتب أبوظبي',
    Numbers: '+971 2 666 9750\n+971 56 742 3109',
    Email: 'samer.hijazi@ae.gt.com',
  },
  {
    '#': '17',
    ConformityBodyName: 'اتش ال بي هامت محاسبون قانونيون',
    MemberName: 'فيجاي أناند',
    Designation: 'المؤسس والرئيس التنفيذي',
    Numbers: '+971 4 327 7775\n+971 50 631 8537',
    Email: 'vijay@hlbhamt.com',
  },
  {
    '#': '18',
    ConformityBodyName: 'حميد الكعبي لتدقيق الحسابات',
    MemberName: 'حميد الكعبي',
    Designation: 'الرئيس التنفيذي',
    Numbers: '+971 2 309 0894\n+971 50 655 5285',
    Email: 'info@humaidalkaabi.ae',
  },
  {
    '#': '19',
    ConformityBodyName: 'كريستون مينون محاسبون قانونيون',
    MemberName: 'شيبو أبراهام',
    Designation: 'مدير الموارد البشرية والشؤون الإدارية',
    Numbers: '+971 4 276 2233\n+971 55 270 2970',
    Email: 'shibu@krestonmenon.com',
  },
  {
    '#': '20',
    ConformityBodyName: 'مجموعة مايورا بترا للخدمات الاستشارية',
    MemberName: 'بييش جواردر',
    Designation: 'شريك التدقيق والتأمين',
    Numbers: '+971 4 580 8003\n+971 52 640 6240\nuae@mbgcorp.com',
    Email: '',
  },
  {
    '#': '21',
    ConformityBodyName: 'فورفز مزارز محاسبون قانونيون',
    MemberName: 'شيلا أرولا',
    Designation: 'منسق',
    Numbers: '+971 2 665 5035',
    Email: 'ICV@mazars.ae',
  },
  {
    '#': '22',
    ConformityBodyName: 'بي كي اف – الإمارات العربية المتحدة',
    MemberName: 'جيوتن دولاكيا',
    Designation: 'شريك',
    Numbers: '+97150 904 9185\n+971 2 626 1715',
    Email: 'jyotin@pkfuae.com',
  },
  {
    '#': '23',
    ConformityBodyName: 'Protiviti',
    MemberName: 'مانيش لاليجام',
    Designation: 'الشريك و رئيس تنفيذي',
    Numbers: '+971 52 999 8939',
    Email: 'icv@protivitiglobal.me',
  },
  {
    '#': '24',
    ConformityBodyName: 'طلال أبو غزالة وشركائه الدولية',
    MemberName: 'فراس كيلاني',
    Designation: 'مدير تنفيذي',
    Numbers: '+971 2 678 1495\n+971 50 612 7310',
    Email: 'falkilani@tagi.com',
  },
  {
    '#': '25',
    ConformityBodyName: 'زايد تشارتد اكاونتنت لتدقيق الحسابات',
    MemberName: 'زايد عبدالله العلي',
    Designation: 'رئيس مجلس إدارة',
    Numbers: '+971 2 666 6828\n+971 55 162 9988\n+971 50 473 2999',
    Email: 'info@zcaa.ae',
  },
];

const dataEn = [
  {
    '#': '1',
    ConformityBodyName: 'B M S AUDITING',
    MemberName: 'Shehinsha',
    Designation: 'Director',
    Numbers:
      '+971 52 9402047\n+971 52 9974124\n+971 55 5569829\ninfo@bmsauditing.com',
    Email: '',
  },
  {
    '#': '2',
    ConformityBodyName: 'AL SHARID AUDITORS AND ADVISORS L.L.C',
    MemberName: 'Ahmed Al Sharid',
    Designation: 'Partner',
    Numbers:
      '+971  50 274 7388\n+971  4 255 5155 \nahmed@alsharid.com\nadmin@alsharid.com',
    Email: '',
  },
  {
    '#': '3',
    ConformityBodyName: 'Abstract Accounting and Auditing',
    MemberName: 'Omar Ali Raeisi',
    Designation: 'Managing Partner & ICV Director',
    Numbers:
      '+971 55 424 6343\n+971 50 452 0648\n+971 4 557 0211\nomar@abstracticv.com',
    Email: '',
  },
  {
    '#': '4',
    ConformityBodyName: 'KPMG Lower Gulf Limited',
    MemberName: 'Mohammad ALJabr',
    Designation: 'Director',
    Numbers: '+971 56 688 2440\nmaljabr@KPMG.com',
    Email: '',
  },
  {
    '#': '5',
    ConformityBodyName: 'PRICE WATERHOUSE COOPERS',
    MemberName: 'Vivek Agarwal ',
    Designation: 'Audit Director',
    Numbers: '+971 56 992 9881\n+971 56 422 7073\nagarwal.e.vivek@pwc.com',
    Email: '',
  },
  {
    '#': '6',
    ConformityBodyName: 'Management Consulting Firm',
    MemberName: 'Mubarak Al Qubaisi',
    Designation: 'Founder and Managing Partner',
    Numbers: '+971 2 621 6669\n+971 54 444 4181\n+971 50 266 6634',
    Email: 'mmq@alraqamiya.ae',
  },
  {
    '#': '7',
    ConformityBodyName: 'ARC Associates',
    MemberName: 'Adil Al Mulla',
    Designation: 'Chief Executive Officer ',
    Numbers: '+971 50 950 9777\n+971 2  406 9690\n+971 4  591 9500',
    Email: 'adilalmulla@arcauditing.ae',
  },
  {
    '#': '8',
    ConformityBodyName: 'Ardent Advisory and Accounting LLC',
    MemberName: 'Nirbhi Vaidya',
    Designation: 'Partner and Risk Adviser',
    Numbers: '+971 565017275\n+971 2 622 6700',
    Email: 'icv@ardentadvisory.com',
  },
  {
    '#': '9',
    ConformityBodyName: 'Assist Plus for accounting and auditing services',
    MemberName: 'Yousef Al-Khanjari',
    Designation: 'Managing Partner',
    Numbers: '+971 2 641 6751\n+971 50 333 4684',
    Email: 'yousif@assistplus.ae',
  },
  {
    '#': '10',
    ConformityBodyName: 'Bakertilly MKM Chartered Accountants',
    MemberName: 'Sudhir Deshpande',
    Designation: 'Director - Assurance, AUP, Financial Accounting & Advisory',
    Numbers: '+971 54 586 1577\n+971 4 369 7248',
    Email: 'sudhir@bakertillyjfc.com',
  },
  {
    '#': '11',
    ConformityBodyName: 'Crowe',
    MemberName: 'Umesh Narayanaba',
    Designation: 'Director',
    Numbers: '+97156 864 4860\n+971 2 678 1130',
    Email: 'icv@crowe.ae',
  },
  {
    '#': '12',
    ConformityBodyName: 'Deloitte & Touche (Middle East)',
    MemberName: 'Faeza Sohawon',
    Designation: 'Partner',
    Numbers: '+971 50 327 3405\n+971 2 408 2424',
    Email: 'fsohawon@deloitte.com',
  },
  {
    '#': '13',
    ConformityBodyName: 'Ernst & Young',
    MemberName: 'Muhammad Faheem Arshad',
    Designation: 'Senior Manager',
    Numbers: '+971 2 411 7333\n+971 50 329 7799',
    Email: 'Muhammad.arshad@ae.ey.com',
  },
  {
    '#': '14',
    ConformityBodyName: 'Evas International Chartered Accountants',
    MemberName: 'Vijaya Mohan',
    Designation: 'Managing Partner',
    Numbers: '+971 2 645 7775\n+971 4 272 4701\n+971 50 718 7645',
    Email: 'vijay@evasinternational.com',
  },
  {
    '#': '15',
    ConformityBodyName: 'Focus Chartered Accountants',
    MemberName: 'Tariq Abdel Karim',
    Designation: 'General Director',
    Numbers: '+971 2 644 1888\n+971 50 616 0587',
    Email: 'focusaa@emirates.net.ae',
  },
  {
    '#': '16',
    ConformityBodyName: 'Grant Thornton Auditing and Accounting',
    MemberName: 'Samir Hegazy',
    Designation: 'Partner, Head of the Abu Dhabi Office',
    Numbers: '+971 2 666 9750\n+971 56 742 3109',
    Email: 'samer.hijazi@ae.gt.com',
  },
  {
    '#': '17',
    ConformityBodyName: 'HLB Hammt Chartered Accountants',
    MemberName: 'Vijay Anand',
    Designation: 'Founder and CEO',
    Numbers: '+971 4 327 7775\n+971 50 631 8537',
    Email: 'vijay@hlbhamt.com',
  },
  {
    '#': '18',
    ConformityBodyName: 'Hamid Al Kaabi Accounts Audit',
    MemberName: 'Hamid Al Kaabi',
    Designation: 'Chief Executive Officer',
    Numbers: '+971 2 309 0894\n+971 50 655 5285',
    Email: 'info@humaidalkaabi.ae',
  },
  {
    '#': '19',
    ConformityBodyName: 'Kreston Menon Chartered Accountants',
    MemberName: 'Shibu Abraham',
    Designation: 'Director of Human Resources and Administration',
    Numbers: '+971 4 276 2233\n+971 55 270 2970',
    Email: 'shibu@krestonmenon.com',
  },
  {
    '#': '20',
    ConformityBodyName: 'MBC AUDITING & ACCOUNTING',
    MemberName: 'Peeyush Joardar',
    Designation: 'Partner - Audit & ICV certification',
    Numbers: '+971 4 580 8003\n+971 52 640 6240\nuae@mbgcorp.com',
    Email: '',
  },
  {
    '#': '21',
    ConformityBodyName: 'FORVIS MAZARS CHARTERED ACCOUNTANTS',
    MemberName: 'Sheila Arola',
    Designation: 'Coordinator',
    Numbers: '+971 2 665 5035',
    Email: 'ICV@mazars.ae',
  },
  {
    '#': '22',
    ConformityBodyName: 'PKF - United Arab Emirates',
    MemberName: 'Jyotin Dholakia',
    Designation: 'Partner',
    Numbers: '+97150 904 9185\n+971 2 626 1715',
    Email: 'jyotin@pkfuae.com',
  },
  {
    '#': '23',
    ConformityBodyName: 'Protiviti',
    MemberName: 'Manish Laligam',
    Designation: 'Partner & Managing Director',
    Numbers: '+971 52 999 8939',
    Email: 'icv@protivitiglobal.me',
  },
  {
    '#': '24',
    ConformityBodyName: 'Talal Abu-Ghazaleh & Co. International',
    MemberName: 'TFiras Kilani',
    Designation: 'Executive Director',
    Numbers: '+971 2 678 1495\n+971 50 612 7310',
    Email: 'falkilani@tagi.com',
  },
  {
    '#': '25',
    ConformityBodyName: 'Zayed Chartered Accountant',
    MemberName: 'Zayed Abdullah Al-Ali',
    Designation: 'Chairman',
    Numbers: '+971 2 666 6828\n+971 55 162 9988\n+971 50 473 2999',
    Email: 'info@zcaa.ae',
  },
];
