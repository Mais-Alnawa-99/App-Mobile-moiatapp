import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import {BW} from '../../../style/theme';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import {
  getService,
  searchServices,
} from '../../../redux/reducers/Services/thunk/services';
import Loader from '../../../component/Loader';
import TilteSection from './TilteSection';
import {isArabic} from '../../../locales';
import SeviceTypeDetails from './SeviceTypeSection';
import AboutServiceSection from './AboutServiceSection';
import GuideSection from './GuideSection';
import RelatedSevices from './RelatedSevices';
import {mapServiceDetails} from './dataMapper';
import PageBg from '../../../component/PageBg';
import {
  setILNeedUserId,
  setNeedRefreshToken,
} from '../../../redux/reducers/General/server';

export default function ServiceDetails(props: any): JSX.Element {
  const service = props.route?.params?.item;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);
  const [isLoadingSta, setisLoadingSta] = useState(false);
  const {isLoggedIn} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();
  const [details, setDetails] = useState<any>({});
  const serviceData = mapServiceDetails(service.Id);
  // const _getService = () => {
  //   setisLoadingSta(true);
  //   dispatch(
  //     getService({
  //       serviceId: service.Id,
  //     }),
  //   ).finally(() => {
  //     setisLoadingSta(false);
  //   });
  // };
  // useEffect(() => {
  //   _getService();
  // }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setNeedRefreshToken(true));
      dispatch(setILNeedUserId(true));
    }
  }, []);

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="serviceDetail-scope"
        styles={{padding: 8 * BW()}}
        // onRefresh={() => _getService()}
        header={<Header title={t('serviceDetail')} showNotification />}
        withHeader>
        <Loader isLoading={isLoadingSta}>
          <Fragment>
            <TilteSection details={details} data={serviceData} />
            <GuideSection details={details} data={serviceData} />
            <SeviceTypeDetails details={details} data={serviceData} />
            <AboutServiceSection details={details} data={serviceData} />
            <RelatedSevices details={details} data={serviceData} />
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
    icon: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
    btn: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 0,
      borderRadius: 0,
      flex: 1,
    },
    btnDetails: {
      height: 'auto',
      backgroundColor: 'transparent',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      padding: 0,
      borderRadius: 0,
      flex: 1,
      marginTop: 0,
      width: '100%',
    },
    iconDetilas: {
      transform: [{rotate: !isArabic() ? '180deg' : '0deg'}],
      width: 14 * BW(),
      height: 16 * BW(),
      resizeMode: 'contain',
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
  });
