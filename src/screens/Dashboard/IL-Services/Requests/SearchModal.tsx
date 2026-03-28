import React, {Fragment, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useFocusEffect, useTheme} from '@react-navigation/native';

import {BW} from '../../../../style/theme';

import Button from '../../../../component/Button';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import Input from '../../../../component/input/Input';
import {isArabic} from '../../../../locales';
import {closeBottomSheet} from '../../../../redux/reducers/General/bottomSheet';
import {
  GetServiceFieldsByServiceId,
  getUserApplicationAssignedToCategories,
} from '../../../../redux/reducers/E-Services/thunk/applications';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Text from '../../../../component/Text';

const SearchModal = ({search, categories, searchParams, mode}: any) => {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();

  const [showDateFrom, setShowDateFrom] = useState(false);
  const [showDateTo, setShowDateTo] = useState(false);

  const [services, setServices] = useState([]);

  const {ilServices} = useAppSelector(store => store.ilServices.ilServices);

  const _setServices = (services: any) => {
    const formattedServices = (services || [])?.map((s: any) => ({
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

  const onChangeDateFrom = (event: any, selectedDate: any) => {
    Platform.OS == 'android' && setShowDateFrom(false);
    if (selectedDate) {
      setSearchParamsLocal((prev: any) => ({...prev, dateFrom: selectedDate}));
    }
  };

  const onChangeDateTo = (event: any, selectedDate: any) => {
    Platform.OS == 'android' && setShowDateTo(false);
    if (selectedDate) {
      setSearchParamsLocal((prev: any) => ({...prev, dateTo: selectedDate}));
    }
  };
  const dispatch = useAppDispatch();
  const [searchParamsLocal, setSearchParamsLocal] = useState(searchParams);

  const applicationStatuses = [
    {label: t('IL.DraftLicense'), value: '7'},
    {label: t('IL.InProgress'), value: '1'},
    {label: t('IL.Completed'), value: '2'},
    {label: t('IL.Approved'), value: '5'},
    {label: t('IL.Cancelled'), value: '3'},
    {label: t('IL.Rejected'), value: '4'},
    {label: t('IL.Inspection'), value: '6'},
    {label: t('IL.Return'), value: '8'},
    {label: t('IL.NotApplicable'), value: '9'},
  ];

  return (
    <>
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <View style={{flex: 1, position: 'relative'}}>
            <View style={{height: '100%', paddingBottom: 10 * BW()}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{height: '100%'}}>
                <Input
                  textInput
                  label={t('IL.KeywordSearchFields')}
                  value={searchParamsLocal.search}
                  onChangeText={(text: any) =>
                    setSearchParamsLocal((prev: any) => ({
                      ...prev,
                      search: text,
                    }))
                  }
                  styleInput={styles.input}
                />
                <Input
                  dropdown
                  label={t('Table.ServiceName')}
                  items={services}
                  placeholder={t('Select')}
                  value={searchParamsLocal.selectedService}
                  styleInput={styles.input}
                  onChange={(item: any) =>
                    setSearchParamsLocal((prev: any) => ({
                      ...prev,
                      selectedService: item?.value,
                    }))
                  }
                />

                <View style={styles.row}>
                  <Input
                    label={t('Labels.StartDateText')}
                    datePicker
                    styleInput={styles.input}
                    value={
                      searchParamsLocal.dateFrom
                        ? searchParamsLocal?.dateFrom.toLocaleDateString()
                        : ''
                    }
                    show={showDateFrom}
                    showDatepicker={() => setShowDateFrom(!showDateFrom)}
                    onChangeDateFrom={onChangeDateFrom}
                    dateValue={searchParamsLocal.dateFrom}
                  />

                  <Input
                    label={t('Labels.EndDateText')}
                    value={
                      searchParamsLocal.dateTo
                        ? searchParamsLocal?.dateTo.toLocaleDateString()
                        : ''
                    }
                    datePicker
                    styleInput={styles.input}
                    show={showDateTo}
                    showDatepicker={() => setShowDateTo(!showDateTo)}
                    onChangeDateFrom={onChangeDateTo}
                    dateValue={searchParamsLocal.dateTo}
                  />
                </View>
                <Input
                  dropdown
                  label={t('IL.Status')}
                  value={searchParamsLocal.status}
                  styleInput={styles.input}
                  items={applicationStatuses}
                  onChange={(item: any) =>
                    setSearchParamsLocal((prev: any) => ({
                      ...prev,
                      status: item?.value,
                    }))
                  }
                />
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 40 * BW(),
            }}>
            <Button
              title={t('Search')}
              style={styles.btn}
              styleText={{
                color: '#fff',
              }}
              onPress={() => {
                // setModalVisible(false);
                !!search && search(1, true, searchParamsLocal);
                dispatch(closeBottomSheet());
              }}
            />
            <View style={{flex: 1}} />
            <Button
              title={t('Cancel')}
              style={styles.btnClose}
              styleText={{
                color: colors.primaryColor,
              }}
              onPress={() =>
                // setModalVisible(false);
                dispatch(closeBottomSheet())
              }
            />
          </View>
        </View>
      </View>
    </>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      backgroundColor: colors.black + '99',
    },
    modalView: {
      backgroundColor: colors.background,
      paddingHorizontal: 15 * BW(),
      paddingVertical: 10 * BW(),
      width: '100%',
      minHeight: '85%',
      borderColor: colors.gray + '66',
      borderWidth: 0.2 * BW(),
    },
    row: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 22,
    },
    btn: {
      width: 'auto',
      height: 'auto',
      padding: 8 * BW(),
      paddingHorizontal: 10 * BW(),
      minWidth: '40%',
      backgroundColor: colors.secondaryColor,
      color: colors.background,
    },
    btnClose: {
      width: 'auto',
      height: 'auto',
      padding: 8 * BW(),
      paddingHorizontal: 10 * BW(),
      backgroundColor: 'transparent',
      color: colors.background,
      borderColor: colors.primaryColor,
      borderWidth: 1 * BW(),
      minWidth: '40%',
    },
    input: {
      backgroundColor: colors.mainBackground,
      minWidth: '49%',
    },
  });

export default SearchModal;
