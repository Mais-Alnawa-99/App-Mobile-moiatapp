import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Page from '../../component/Page';
import {BW} from '../../style/theme';
import Header from '../../component/Header';
import Loader from '../../component/Loader';
import {getFAQs} from '../../redux/reducers/FAQs/thunk/faqs';
import FlatListComp from '../../component/FlatList';
import FAQitem from './FAQitem';
import Accordion from '../../component/Accordion';
import Text from '../../component/Text';
import PageBg from '../../component/PageBg';
import Input from '../../component/input/Input';
import Search from '../../component/Search';

export default function FAQs(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {lang} = useAppSelector(state => state.lang);

  const dispatch = useAppDispatch();

  const _getFAQs = () => {
    dispatch(getFAQs());
  };
  useEffect(() => {
    _getFAQs();
  }, [lang]);
  const [activeBtn, setActiveBtn] = useState<number | null>(null);

  const {faqs, isLoading} = useAppSelector(state => state.FAQs);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs?.filter((faq: any) => {
    const q = searchQuery.toLowerCase();
    return (
      faq?.FieldValues?.Question?.toLowerCase().includes(q) ||
      faq?.FieldValues?.Answer?.toLowerCase().includes(q)
    );
  });

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="FAQs-scope"
        styles={{padding: 8 * BW()}}
        withOutScrollView
        header={<Header title={t('FAQs')} showNotification />}
        withHeader>
        <Loader isLoading={isLoading}>
          <Fragment>
            <View>
              <Search
                value={searchQuery}
                setSearch={setSearchQuery}
                style={{
                  marginBottom: 16 * BW(),
                  backgroundColor: colors.white,
                  flex: undefined,
                  borderRadius: 6 * BW(),
                  paddingHorizontal: 12 * BW(),
                  borderBottomWidth: 0,
                }}
              />
            </View>
            <FlatListComp
              scrollview
              data={filteredFAQs}
              onRefresh={() => _getFAQs()}
              noData
              renderItem={({item, index}: any) => {
                const isActive = index === activeBtn;
                return (
                  <FAQitem
                    key={index}
                    index={index}
                    item={item}
                    isActive={isActive}
                    activeBtn={activeBtn}
                    setActiveBtn={setActiveBtn}
                  />
                );
              }}
            />
          </Fragment>
        </Loader>
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
    },
    item: {
      paddingVertical: 16 * BW(),
    },
    title: {
      lineHeight: 24 * BW(),
    },
  });
