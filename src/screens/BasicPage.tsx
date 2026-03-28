import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Page from '../../component/Page';
import {BW} from '../../style/theme';
import Header from '../../component/Header';
import Loader from '../../component/Loader';
import {getFAQs} from '../../redux/reducers/FAQs/thunk/faqs';
import Text from '../component/Text';

export default function FAQs(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();

  const _getFAQs = () => {
    dispatch(getFAQs());
  };
  useEffect(() => {
    _getFAQs();
  }, []);

  const {faqs, isLoading} = useAppSelector(state => state.FAQs);

  const [activeBtn, setActiveBtn] = useState(0);

  return (
    <View style={style.container}>
      <Page
        withStatusBar
        styles={{padding: 8 * BW()}}
        header={<Header title={t('FAQs')} showNotification />}
        withHeader>
        <Loader isLoading={isLoading}></Loader>
      </Page>
    </View>
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
  });
