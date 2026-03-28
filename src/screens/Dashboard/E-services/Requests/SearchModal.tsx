import React, {Fragment, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

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
import {useAppDispatch} from '../../../../redux/store';
import Text from '../../../../component/Text';

const SearchModal = ({search, categories, searchParams, mode}: any) => {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();

  const [showDateFrom, setShowDateFrom] = useState(false);
  const [showDateTo, setShowDateTo] = useState(false);
  const [users, setUsers] = useState([]);
  const [dynamicFilters, setDynamicFilters]: any = useState([]);

  const serviceOptions = (categories || []).map((cat: any) => {
    const serviceNameArray = JSON.parse(cat?.serviceName);
    const name = serviceNameArray.find((x: any) =>
      isArabic() ? x.langId === 2 : x.langId === 1,
    )?.value;

    return {
      label: name,
      value: cat.serviceId,
    };
  });

  const onChangeDateFrom = (event: any, selectedDate: any) => {
    Platform.OS == 'android' && setShowDateFrom(false);
    if (selectedDate) {
      setSearchParamsLocal((prev: any) => ({...prev, dateFrom: selectedDate}));
    }
  };

  const onChangeDateTo = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setSearchParamsLocal((prev: any) => ({...prev, dateTo: selectedDate}));
    }
  };
  const dispatch = useAppDispatch();
  const [searchParamsLocal, setSearchParamsLocal] = useState(searchParams);

  const _getUserApplicationAssignedToCategories = () => {
    const requestParams = {
      Mode: !!mode ? mode : 'MyApplications',
      Search: '',
      Start: '',
      End: '',
      AssignedUsers: '',
      ShowDeleted: false,
      IsDraft: false,
      ExtraFieldFilters: '',
      MatchAnyCondition: false,
      OwnedBy: '',
      Duration: '',
      ServiceId: searchParamsLocal?.selectedService
        ? searchParamsLocal?.selectedService
        : '',
    };
    dispatch(getUserApplicationAssignedToCategories(requestParams)).then(
      (res: any) => {
        if (res.payload?.applicationCategories) {
          const assignToUsersOptions = res.payload?.applicationCategories.map(
            (user: any) => ({
              label: user.UserName,
              value: user.UserId,
            }),
          );
          setUsers(assignToUsersOptions);
        }
      },
    );
  };
  const _getServiceFieldsByServiceId = () => {
    dispatch(
      GetServiceFieldsByServiceId({
        serviceId: searchParamsLocal.selectedService,
      }),
    ).then((res: any) => {
      if (res.payload.networkSuccess && res.payload?.errors == undefined) {
        const filters = Object.values(res.payload).filter(
          (item: any) =>
            typeof item === 'object' &&
            !Array.isArray(item) &&
            item !== null &&
            !item.networkSuccess,
        );

        setDynamicFilters(filters);
      } else {
        setDynamicFilters([]);
      }
    });
  };
  useEffect(() => {
    _getServiceFieldsByServiceId();
    _getUserApplicationAssignedToCategories();
  }, [searchParamsLocal?.selectedService]);

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
                  dropdown
                  search={serviceOptions.length > 5 ? true : false}
                  label={t('Table.ServiceName')}
                  items={serviceOptions}
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
                <Input
                  textInput
                  label={t('Labels.SearchByApplicationNumber')}
                  value={searchParamsLocal.requestNumber}
                  onChangeText={(text: any) =>
                    setSearchParamsLocal((prev: any) => ({
                      ...prev,
                      requestNumber: text,
                    }))
                  }
                  styleInput={styles.input}
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
                  label={t('Labels.AssignedToUsers')}
                  value={searchParamsLocal.assignedTo}
                  styleInput={styles.input}
                  items={users}
                  onChange={(item: any) =>
                    setSearchParamsLocal((prev: any) => ({
                      ...prev,
                      assignedTo: item?.value,
                    }))
                  }
                />
                <Input
                  textInput
                  label={t('Labels.OwnedBy')}
                  value={searchParamsLocal.owner}
                  onChangeText={(text: any) =>
                    setSearchParamsLocal((prev: any) => ({
                      ...prev,
                      owner: text,
                    }))
                  }
                  styleInput={styles.input}
                />
                <Input
                  dropdown
                  label={t('Labels.Duration')}
                  value={searchParamsLocal.durationStatus}
                  styleInput={styles.input}
                  items={[
                    {label: t('In Time'), value: 'InTime'},
                    {label: t('Delayed'), value: 'Delayed'},
                  ]}
                  onChange={(item: any) =>
                    setSearchParamsLocal((prev: any) => ({
                      ...prev,
                      durationStatus: item?.value,
                    }))
                  }
                />

                <View style={styles.row}>
                  <Input
                    checkbox
                    title={t('Labels.ShowDeletedApplication')}
                    checked={searchParamsLocal.showDeleted}
                    onPress={() =>
                      setSearchParamsLocal((prev: any) => ({
                        ...prev,
                        showDeleted: !prev.showDeleted,
                      }))
                    }
                    styleInput={styles.input}
                  />
                  <Input
                    checkbox
                    title={t('Labels.ShowDraftApplication')}
                    checked={searchParamsLocal.showDrafts}
                    onPress={() =>
                      setSearchParamsLocal((prev: any) => ({
                        ...prev,
                        showDrafts: !prev.showDrafts,
                      }))
                    }
                    styleInput={styles.input}
                  />
                </View>

                <Input
                  checkbox
                  title={t('Labels.MatchFilterCondition')}
                  checked={searchParamsLocal.matchAny}
                  onPress={() =>
                    setSearchParamsLocal((prev: any) => ({
                      ...prev,
                      matchAny: !prev.matchAny,
                    }))
                  }
                  styleInput={styles.input}
                />
                <View
                  style={[
                    {
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    },
                  ]}>
                  {dynamicFilters.length > 0 &&
                    dynamicFilters?.map((field: any, index: number) => {
                      const label = JSON.parse(
                        field.entityFieldTranslation,
                      ).find((x: any) =>
                        isArabic() ? x.langId === 2 : x.langId === 1,
                      )?.value;

                      const isDropdown =
                        field?.fieldTypeId == 5 || field.entityFieldLookups;
                      const options = isDropdown
                        ? JSON.parse(field.entityFieldLookups).map(
                            (opt: any) => ({
                              label: opt.lookupValue,
                              value: opt.lookupId,
                            }),
                          )
                        : [];

                      const filterValue =
                        searchParamsLocal.extraFieldFilters?.[
                          field.entityFieldId
                        ]?.value || '';
                      const filterOperator =
                        searchParamsLocal.extraFieldFilters?.[
                          field.entityFieldId
                        ]?.operator || 'contains';

                      const updateFilter = (data: any) => {
                        setSearchParamsLocal((prev: any) => ({
                          ...prev,
                          extraFieldFilters: {
                            ...prev.extraFieldFilters,
                            [field.entityFieldId]: {
                              ...prev.extraFieldFilters?.[field.entityFieldId],
                              ...data,
                              fieldTypeId: field.fieldTypeId,
                            },
                          },
                        }));
                      };

                      return (
                        <Fragment key={field.entityFieldId}>
                          {isDropdown ? (
                            <Input
                              dropdown
                              label={label}
                              dropdownPosition={'top'}
                              items={options}
                              value={filterValue}
                              onChange={(item: any) =>
                                updateFilter({value: item?.value})
                              }
                              styleInput={styles.input}
                            />
                          ) : (
                            <View style={{marginTop: 6 * BW()}}>
                              <Text h4>{label}</Text>

                              <View
                                style={[
                                  {
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-between',
                                    gap: 6 * BW(),
                                    marginTop: -6 * BW(),
                                  },
                                ]}>
                                <Input
                                  dropdown
                                  dropdownPosition={'top'}
                                  items={[
                                    {label: 'Equals', value: 'equal'},
                                    {label: 'Not Equal', value: 'notequal'},
                                    {label: 'Start With', value: 'startswith'},
                                    {label: 'End With', value: 'endswith'},
                                    {label: 'Contains', value: 'contains'},
                                  ]}
                                  value={filterOperator}
                                  onChange={(item: any) =>
                                    updateFilter({operator: item?.value})
                                  }
                                  styleInput={{
                                    ...styles.input,
                                  }}
                                />
                                <Input
                                  textInput
                                  value={filterValue}
                                  onChangeText={(text: string) =>
                                    updateFilter({value: text})
                                  }
                                  styleInput={styles.input}
                                />
                              </View>
                            </View>
                          )}
                        </Fragment>
                      );
                    })}
                </View>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10 * BW(),
            }}>
            <Button
              title={t('Search')}
              style={styles.btn}
              styleText={{
                color: '#fff',
              }}
              onPress={() => {
                // setModalVisible(false);
                !!search && search('', '', 1, true, searchParamsLocal);
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
