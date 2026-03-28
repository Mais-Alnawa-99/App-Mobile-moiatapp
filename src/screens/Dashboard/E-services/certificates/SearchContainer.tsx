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
              dropdown
              label={t('Labels.SelectDateFilterType')}
              items={standardTypes || []}
              value={searchParams.dateFilterType}
              onChange={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  dateFilterType: item?.value,
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
              datePicker
              label={t('Labels.CertificateFromDate')}
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
              label={t('Labels.CertificateToDate')}
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
              label={t('Labels.SearchCertificateByNumber')}
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
              label={t('Labels.OwnedBy')}
              value={searchParams.OwnedBy}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  OwnedBy: text,
                }))
              }
              styleInput={{minWidth: '49%'}}
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
