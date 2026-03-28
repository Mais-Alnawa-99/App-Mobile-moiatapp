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
  _getCertificates,
  setSearch,
  _resetSearch,
  toggleAccordion,
  totalCount,
}: {
  search: any;
  searchParams: any;
  setSearchParams: any;
  _getCertificates: any;
  setSearch: any;
  _resetSearch: any;
  toggleAccordion: any;
  totalCount: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

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

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const onChangeFrom = (_: any, selectedDate: any) => {
    Platform.OS === 'android' && setShowFrom(false);
    if (selectedDate) {
      setSearchParams((prev: any) => ({
        ...prev,
        FromDate: selectedDate,
      }));
    }
  };

  const onChangeTo = (_: any, selectedDate: any) => {
    Platform.OS === 'android' && setShowTo(false);
    if (selectedDate) {
      setSearchParams((prev: any) => ({
        ...prev,
        Todate: selectedDate,
      }));
    }
  };
  const standardTypes = [
    {label: t('Issue Date'), value: 'Issue'},
    {label: t('Expiry Date'), value: 'Expiry'},
    {label: t('Both'), value: 'Both'},
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
              textInput
              label={t('IL.KeywordSearchFields')}
              items={standardTypes || []}
              value={searchParams.SearchTerm}
              onChange={(value: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  SearchTerm: value,
                }))
              }
              styleInput={{minWidth: '99%'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              dropdown
              label={t('IL.Service')}
              value={searchParams.ServiceId}
              onChange={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  ServiceId: item?.value,
                }))
              }
              items={services}
              styleInput={{minWidth: '100%'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              datePicker
              label={t('IL.DateFrom')}
              value={
                !!searchParams?.FromDate && searchParams.FromDate != undefined
                  ? searchParams?.FromDate?.toLocaleDateString?.()
                  : ''
              }
              show={showFrom}
              showDatepicker={() => setShowFrom(!showFrom)}
              onChangeDateFrom={onChangeFrom}
              styleInput={{minWidth: '49%'}}
              dateValue={searchParams.FromDate}
            />
            <Input
              datePicker
              label={t('IL.DateTo')}
              value={
                !!searchParams.Todate
                  ? searchParams?.Todate?.toLocaleDateString?.()
                  : ''
              }
              show={showTo}
              showDatepicker={() => setShowTo(!showTo)}
              onChangeDateFrom={onChangeTo}
              styleInput={{minWidth: '49%'}}
              dateValue={searchParams.Todate}
            />
          </View>

          <Button
            title={t('Search')}
            onPress={() => {
              _getCertificates(1, true);
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
