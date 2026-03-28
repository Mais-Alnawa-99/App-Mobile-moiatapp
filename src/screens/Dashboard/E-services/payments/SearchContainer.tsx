import React, {Fragment, useState} from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch} from '../../../../redux/store';
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
        Start: selectedDate,
      }));
    }
  };

  const onChangeTo = (_: any, selectedDate: any) => {
    Platform.OS === 'android' && setShowTo(false);
    if (selectedDate) {
      setSearchParams((prev: any) => ({
        ...prev,
        End: selectedDate,
      }));
    }
  };
  const statuTypes = [
    {label: t('Labels.PaymentPaid'), value: 'Paid'},
    {label: t('Labels.PaymentListStatusPending'), value: 'Pending'},
    {label: t('Labels.PaymentListStatusFailed'), value: 'Failed'},
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
      {search && (
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
              datePicker
              label={t('Labels.StartDateText')}
              value={
                !!searchParams?.Start && searchParams.Start != undefined
                  ? searchParams?.Start?.toLocaleDateString?.()
                  : ''
              }
              show={showFrom}
              showDatepicker={() => setShowFrom(!showFrom)}
              onChangeDateFrom={onChangeFrom}
              styleInput={{minWidth: '49%'}}
              dateValue={searchParams.Start}
            />

            <Input
              datePicker
              label={t('Labels.EndDateText')}
              value={
                !!searchParams.End
                  ? searchParams?.End?.toLocaleDateString?.()
                  : ''
              }
              show={showTo}
              showDatepicker={() => setShowTo(!showTo)}
              onChangeDateFrom={onChangeTo}
              styleInput={{minWidth: '49%'}}
              dateValue={searchParams.End}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              textInput
              label={t('Labels.SearchPayment')}
              value={searchParams.Search}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  Search: text,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
            <Input
              textInput
              label={t('Labels.SearchByURN')}
              value={searchParams.URN}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  URN: text,
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
              dropdown
              label={t('Labels.SelectServiceName')}
              items={servicesEnv || []}
              value={searchParams.ServiceId}
              onChange={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  ServiceId: item?.value,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
            <Input
              dropdown
              label={t('Labels.SelectStatus')}
              items={statuTypes || []}
              value={searchParams.Status}
              onChange={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  Status: item?.value,
                }))
              }
              styleInput={{minWidth: '49%'}}
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
