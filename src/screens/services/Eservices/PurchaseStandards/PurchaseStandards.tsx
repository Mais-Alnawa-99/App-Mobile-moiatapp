import React, {useState, useEffect} from 'react';
import {ImageBackground, LayoutAnimation, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch} from '../../../../redux/store';
import Page from '../../../../component/Page';
import {BW} from '../../../../style/theme';
import Header from '../../../../component/Header';
import Loader from '../../../../component/Loader';
import {
  getStandardAndVersionsList,
  getStandardTypeList,
} from '../../../../redux/reducers/E-Services/thunk/standards';
import {isArabic} from '../../../../locales';
import {parseJSON} from '../../utils';
import FlatListComp from '../../../../component/FlatList';
import Pagination from '../../../../component/Pagination';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';
import SearchContainer from './SearchContainer';
import StandardCard from './StandardCard';
import PageBg from '../../../../component/PageBg';

export default function PurchaseStandards(props: any): JSX.Element {
  const params = props.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [standardList, setStandardList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [standardTypes, setStandardTypes] = useState([]);

  const [search, setSearch] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    StandardType: '';
    StandardICS: '';
    StandardNumber: '';
    StandardName: '';
    StandardYear: '';
  }>({
    StandardType: '',
    StandardICS: '',
    StandardNumber: '',
    StandardName: '',
    StandardYear: '',
  });

  const _resetSearch = () => {
    setSearchParams({
      StandardType: '',
      StandardICS: '',
      StandardNumber: '',
      StandardName: '',
      StandardYear: '',
    });
    _getStandardAndVersionsList(1, false);
    setSearch(false);
    toggleAccordion();
  };

  const _getStandardAndVersionsList = (pageNumber: number, search = false) => {
    dispatch(setLoadingModal(true));
    setPageNumber(pageNumber);
    let params: any = {
      StandardType: '',
      StandardICS: '',
      StandardNumber: '',
      StandardName: '',
      StandardYear: '',
    };
    if (search) {
      params = searchParams;
    } else {
      params = {
        StandardType: '',
        StandardICS: '',
        StandardNumber: '',
        StandardName: '',
        StandardYear: '',
      };
    }
    dispatch(
      getStandardAndVersionsList({
        PageNumber: pageNumber,
        PageSize: 12,
        StandardType: params?.StandardType,
        StandardICS: params?.StandardICS,
        StandardNumber: params?.StandardNumber,
        StandardName: params?.StandardName,
        StandardYear: params?.StandardYear,
      }),
    ).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        setIsLoading(false);
        dispatch(setLoadingModal(false));

        if (!!res?.payload?.standardList) {
          if (!search) _getStandardTypeList();

          setStandardList(parseJSON(res?.payload?.standardList));
          setTotalCount(res?.payload?.totalRecordCount);
        } else {
          setStandardList([]);
        }
      }
    });
  };
  useEffect(() => {
    _getStandardAndVersionsList(1);
  }, []);

  const _getStandardTypeList = () => {
    dispatch(getStandardTypeList()).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        if (!!res?.payload) {
          let data: any = formatProductTypes(res?.payload);
          setStandardTypes(data);
        }
      }
    });
  };

  const formatProductTypes = (rawData: any) => {
    return Object.entries(rawData || {})
      .filter(([key]) => !isNaN(Number(key)))
      .map(([_, item]: any) => ({
        label: item.name,
        value: item.id,
      }));
  };

  const title =
    params?.serviceItem?.serviceName?.find((n: any) =>
      isArabic() ? n.langId === 2 : n.langId === 1,
    )?.value || t('PurchaseStandards');

  const renderItem = ({item}: any, index: any) => {
    return <StandardCard key={index} index={index} item={item} />;
  };

  const animationConfig = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeIn,
    },
    delete: {
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(animationConfig);
  };

  return (
    <PageBg>
      <Page
        withStatusBar
        styles={{padding: 8 * BW()}}
        onRefresh={() => _getStandardAndVersionsList(1)}
        header={
          <Header
            title={title}
            showNotification
            titleContainerStyle={{flex: 4}}
            showCart
          />
        }
        withHeader>
        {totalCount > 0 && (
          <SearchContainer
            search={search}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            standardTypes={standardTypes}
            _getStandardAndVersionsList={_getStandardAndVersionsList}
            setSearch={setSearch}
            _resetSearch={_resetSearch}
            toggleAccordion={toggleAccordion}
          />
        )}
        <Loader isLoading={isLoading}>
          <>
            <FlatListComp
              data={standardList || []}
              scrollview
              renderItem={({item, index}: any) => renderItem({item}, index)}
              noData={!isLoading}
            />
          </>
        </Loader>
        {totalCount > 1 && (
          <Pagination
            currentPage={pageNumber}
            totalCount={totalCount}
            pageSize={12}
            onPageChange={page => {
              _getStandardAndVersionsList(page);
            }}
          />
        )}
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4 * BW(),
      flex: 1,
    },
  });
