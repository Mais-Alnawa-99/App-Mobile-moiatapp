import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Page from '../../component/Page';
import {BW} from '../../style/theme';
import Header from '../../component/Header';
import Loader from '../../component/Loader';
import HeaderBtnSection from './HeaderBtnSection';
import {getContactUs} from '../../redux/reducers/Help/thunk/thunk';
import ConatctUs from './conatctUs';
import MessageUs from './messageUs/MessageUs';
import PageBg from '../../component/PageBg';

export default function Help(props: any): JSX.Element {
  const service = props.route?.params?.item;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();

  const _getContactUs = () => {
    dispatch(getContactUs());
  };
  useEffect(() => {
    _getContactUs();
  }, []);

  const [activeBtn, setActiveBtn] = useState(0);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeBtn * 170, // Adjust based on button width
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeBtn]);

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="help-scope"
        styles={{padding: 8 * BW()}}
        header={
          <Header
            // title={t('help')}

            showLang
            showNotification
            hideBack
            showSearch
          />
        }
        withHeader>
        <Loader isLoading={false}>
          <Fragment>
            <HeaderBtnSection
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
            />
            {activeBtn == 0 && <ConatctUs />}
            {activeBtn == 1 && <MessageUs />}
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
    line: {
      marginVertical: 0,
      height: '100%',
      width: 0 * BW(),
      marginStart: 24 * BW(),
    },
    btnHeaderContainer: {
      backgroundColor: colors.primary,
      paddingVertical: 8 * BW(),
      paddingHorizontal: 12 * BW(),
      borderRadius: 10 * BW(),
      marginTop: 12 * BW(),
      overflow: 'hidden',
      width: '100%',
    },
    title: {
      color: colors.white,
    },
    btn: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.white,
      justifyContent: 'space-around',
      padding: 8 * BW(),
      flexDirection: 'column',
      borderRadius: 0,
    },
    btnDirection: {
      width: 'auto',
      height: 'auto',
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 0,
      borderRadius: 0,
      marginTop: 12 * BW(),
    },
    card: {
      height: 100 * BW(),
      borderRadius: 4 * BW(),
      flex: 1,
      borderColor: colors.gray,
      borderWidth: 0.4 * BW(),
    },

    SatrtService: {
      width: 'auto',
      height: 'auto',
      backgroundColor: colors.secondaryColor,
      borderRadius: 16 * BW(),
      flex: 1,
    },
    containerIcon: {
      width: 22 * BW(),
      height: 22 * BW(),
    },
    containerIconDirection: {
      width: 20 * BW(),
      height: 20 * BW(),
    },
  });
