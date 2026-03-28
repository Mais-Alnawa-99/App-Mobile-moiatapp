import React, {Fragment, useState} from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {BW} from '../../../../style/theme';
import Button from '../../../../component/Button';
import Input from '../../../../component/input/Input';
import Text from '../../../../component/Text';

export default function SearchContainer({
  search,
  searchParams,
  setSearchParams,
  _getUserPaymentLists,
  setSearch,
  _resetSearch,
  toggleAccordion,
  totalCount,
  servicesEnv,
  setSearchEx,
  searchEx,
}: {
  search: any;
  searchParams: any;
  setSearchParams: any;
  _getUserPaymentLists: any;
  setSearch: any;
  _resetSearch: any;
  toggleAccordion: any;
  totalCount: any;
  servicesEnv: any;
  setSearchEx: any;
  searchEx: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const dispatch = useAppDispatch();
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const onChangeFrom = (_: any, selectedDate: any) => {
    Platform.OS === 'android' && setShowFrom(false);
    if (selectedDate) {
      setSearchParams((prev: any) => ({
        ...prev,
        fromDate: selectedDate,
      }));
    }
  };

  const onChangeTo = (_: any, selectedDate: any) => {
    Platform.OS === 'android' && setShowTo(false);
    if (selectedDate) {
      setSearchParams((prev: any) => ({
        ...prev,
        toDate: selectedDate,
      }));
    }
  };

  const [services, setServices] = useState([]);

  const {ilServices} = useAppSelector(store => store.ilServices.ilServices);

  const _setServices = (services: any) => {
    const formattedServices = services?.map((s: any) => ({
      label: s.ServiceName,
      value: s.ServiceId,
    }));

    setServices(formattedServices);
  };

  useFocusEffect(
    React.useCallback(() => {
      _setServices(ilServices);
    }, [ilServices]),
  );

  const paymentStatusOptions = [
    {label: t('IL.PaymentSuccessful'), value: '1'},
    {label: t('IL.PaymentFailed'), value: '2'},
    {label: t('IL.PaymentDeclined'), value: '3'},
  ];
  return (
    <>
      <View style={styles.searchBtnContainer}>
        <View>
          <Text h3 bold>
            {t('Labels.TotalCount') + ' ' + totalCount}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            icon={require('../../../../assets/header/search.png')}
            styleIcon={{tintColor: colors.secondaryColor}}
            containerIcon={{width: 20 * BW(), height: 20 * BW()}}
            onPress={() => {
              // _getStandardAndVersionsList(1, true);
              setSearch((prev: any) => !prev);
              setSearchEx((prev: any) => !prev);
              toggleAccordion();
            }}
            style={styles.searchBtn}
          />
          <Button
            Entypo={'ccw'}
            onPress={() => {
              _resetSearch();
            }}
            EntypoColor={colors.secondaryColor}
            style={{...styles.searchBtn, marginEnd: 0 * BW()}}
          />
        </View>
      </View>
      {searchEx && (
        <Animated.View
          style={{
            marginBottom: 12 * BW(),
            marginTop: -8 * BW(),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              textInput
              label={t('IL.PaymentKeywordSearchFields')}
              value={searchParams.SearchText}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  SearchText: text,
                }))
              }
              styleInput={{minWidth: '99%'}}
            />
          </View>
          <Input
            dropdown
            label={t('Labels.SelectServiceName')}
            items={services || []}
            value={searchParams.ServiceId}
            onChange={(item: any) =>
              setSearchParams((prev: any) => ({
                ...prev,
                ServiceId: item?.value,
              }))
            }
            styleInput={{minWidth: '49%'}}
          />

          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Input
              textInput
              label={t('IL.LicenseNumber')}
              value={searchParams.LicenseNumber}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  LicenseNumber: text,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
            <Input
              textInput
              label={t('IL.Factory')}
              value={searchParams.FactoryName}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  FactoryName: text,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              dropdown
              label={t('IL.PaymentStatus')}
              items={paymentStatusOptions || []}
              value={searchParams.PaymentStatus}
              onChange={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  PaymentStatus: item?.value,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
            <Input
              dropdown
              label={t('IL.PaymentType')}
              items={[
                {label: t('IL.ServiceFees'), value: '0'},
                {label: t('IL.InspectionFees'), value: '1'},
              ]}
              value={searchParams.paymentType}
              onChange={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  paymentType: item?.value,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              datePicker
              label={t('Labels.StartDateText')}
              value={
                !!searchParams?.fromDate && searchParams.fromDate != undefined
                  ? searchParams?.fromDate?.toLocaleDateString?.()
                  : ''
              }
              show={showFrom}
              showDatepicker={() => setShowFrom(!showFrom)}
              onChangeDateFrom={onChangeFrom}
              styleInput={{minWidth: '49%'}}
              dateValue={searchParams.fromDate}
            />

            <Input
              datePicker
              label={t('Labels.EndDateText')}
              value={
                !!searchParams.toDate
                  ? searchParams?.toDate?.toLocaleDateString?.()
                  : ''
              }
              show={showTo}
              showDatepicker={() => setShowTo(!showTo)}
              onChangeDateFrom={onChangeTo}
              styleInput={{minWidth: '49%'}}
              dateValue={searchParams.toDate}
            />
          </View>
          <Button
            title={t('Search')}
            onPress={() => {
              _getUserPaymentLists(1, true);
            }}
            style={styles.searchBtnTitle}
            styleText={{color: colors.mainWhite}}
          />
        </Animated.View>
      )}
    </>
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
    card: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 8 * BW(),
      marginBottom: 8 * BW(),
      borderRadius: 8 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    image: {
      width: '40%',
      height: 120 * BW(),
      borderRadius: 8 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    imagePlaceholder: {
      width: '100%',
      height: 120 * BW(),
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8 * BW(),
    },
    searchBtn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.border,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
    },
    searchBtnTitle: {
      width: 80 * BW(),
      height: 'auto',
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
      marginTop: 8 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    searchBtnContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 8 * BW(),
    },
    versionActions: {
      flexDirection: 'row',
      marginTop: 4 * BW(),
    },
    actionBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 4 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    previewBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 4 * BW(),
      backgroundColor: colors.white,
      borderColor: colors.textPrimaryColor,
      borderWidth: 1 * BW(),
    },
  });
