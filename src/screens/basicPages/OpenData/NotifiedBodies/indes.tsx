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
import NotifiedBodyCard from './NotifiedBodyCard';
import {
  getNotifiedBodies,
  getRegulations,
} from '../../../../redux/reducers/OpenData/thunk/openData';
import Input from '../../../../component/input/Input';
import Button from '../../../../component/Button';

export default function NotifiedBodies(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData]: any = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [search, setSearch] = useState(null);
  const [regulations, setRegulations] = useState<any[]>([]);
  const [selectedRegulation, setSelectedRegulations] = useState('');
  const PAGE_SIZE = 10;

  const _getNotifiedBodies = (
    newPage: any,

    regulationId?: number,
  ) => {
    setIsLoading(true);
    let id = {regulationId: regulationId ?? 0};
    let params = {
      id,
      pageNumber: newPage,
      pageSize: PAGE_SIZE,
    }
    dispatch(getNotifiedBodies(params)).then((res: any) => {
      if (res?.payload?.networkSuccess && !!res?.payload?.data) {
        const data = res?.payload?.data;
        setData(data);
        setTotalCount(res?.payload?.totalRecords);
      } else {
        setData([]);
      }
      setIsLoading(false);
    });
  };

  const _getRegulations = () => {
    let params: any = {};

    dispatch(getRegulations(params)).then((res: any) => {
      if (res?.payload?.networkSuccess && !!res?.payload?.data) {
        const items = res?.payload?.data.map((item: any, index: number) => ({
          value: item.id,
          label: item.regulationName,
        }));
        setRegulations(items);
      } else {
        setData([]);
      }
    });
  };

  const onSearch = () => {
    getNotifiedBodies(currentPage);
  };

  useEffect(() => {
    if (search == null) return;

    const delayDebounce = setTimeout(() => {
      onSearch();
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    _getRegulations();
    _getNotifiedBodies(currentPage);
  }, []);

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 6 * BW(),
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Input
              dropdown
              items={regulations}
              value={selectedRegulation}
              onChange={(v: any) => {
                setSelectedRegulations(v.value);
                _getNotifiedBodies(currentPage, v.value);
              }}
              styleInput={{
                marginBottom: 12 * BW(),
              }}
            />
          </View>
          <Button
            Entypo={'ccw'}
            onPress={() => {
              _getNotifiedBodies(0);
              setSelectedRegulations('');
            }}
            EntypoColor={colors.secondaryColor}
            style={{...styles.searchBtn, marginEnd: 0 * BW()}}
          />
        </View>
        <Loader isLoading={isLoading}>
          <FlatListComp
            data={data}
            noData
            renderItem={({item}: any) => <NotifiedBodyCard item={item} />}
          />
        </Loader>
        {totalCount > 1 && (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(newPage: number) => {
              setCurrentPage(newPage);
              _getNotifiedBodies(newPage);
            }}
          />
        )}
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
    searchBtn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.border,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
    },
  });
