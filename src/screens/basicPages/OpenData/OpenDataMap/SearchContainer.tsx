import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import Text from '../../../../component/Text';
import Input from '../../../../component/input/Input';
import Button from '../../../../component/Button';
// import RadioButtonGroup from '../../../component/input/RadioButtonGroup';
import {BW} from '../../../../style/theme';
import {useAppDispatch} from '../../../../redux/store';
import {openBottomSheet} from '../../../../redux/reducers/General/bottomSheet';
import {
  getInteractiveFilters,
  getLocationAreas,
  getRelatedActivities,
} from '../../../../redux/reducers/OpenData/thunk/openData';

export default function FactoriesSearch({
  searchParams,
  setSearchParams,
  totalCount,
  onSearch,
  onReset,
  productList = [],
}: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();

  const [filterType, setFilterType] = useState('product');
  const [showSearch, setShowSearch] = useState(false);
  const [locationList, setLocationList] = useState([]);

  const [activityCategories, setActivityCategories] = useState([]);

  const [areaList, setAreaList] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setSearchParams((prev: any) => ({
      ...prev,
      filterType,
      selectedItem: '',
      activityCategory: '',
      activity: '',
    }));
  }, [filterType]);

  const _getInteractiveFilters = () => {
    dispatch(getInteractiveFilters()).then(res => {
      if (!!res?.payload?.Locations && Array.isArray(res?.payload?.Locations)) {
        const Loc = res?.payload?.Locations?.map((l: any) => ({
          label: l.Name,
          value: l.ID,
        }));

        setLocationList(Loc);
      }
      if (
        !!res?.payload?.ActivitiesCategory &&
        Array.isArray(res?.payload?.ActivitiesCategory)
      ) {
        const result = res?.payload?.ActivitiesCategory?.map((l: any) => ({
          label: l.Title,
          value: l.ID,
        }));

        setActivityCategories(result);
      }
    });
  };
  useEffect(() => {
    _getInteractiveFilters();
  }, []);

  const _getLocationAreas = () => {
    dispatch(getLocationAreas(searchParams.location)).then(res => {
      const Loc: any = Object.values(res?.payload || {})?.map((l: any) => ({
        label: l.Name,
        value: l.ID,
      }));

      setAreaList(Loc);
    });
  };
  useEffect(() => {
    _getLocationAreas();
  }, [searchParams.location]);

  const _getRelatedActivities = () => {
    dispatch(getRelatedActivities(searchParams.activityCategory)).then(res => {
      const Loc: any = Object.values(res?.payload || {})?.map((l: any) => ({
        label: l?.Name,
        value: l?.ID,
      }));

      setActivities(Loc);
    });
  };
  useEffect(() => {
    _getRelatedActivities();
  }, [searchParams.activityCategory]);

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
              setShowSearch(!showSearch);
            }}
            style={styles.searchBtn}
          />
          <Button
            Entypo={'ccw'}
            onPress={() => {
              onReset();
            }}
            EntypoColor={colors.secondaryColor}
            style={{...styles.searchBtn, marginEnd: 0 * BW()}}
          />
        </View>
      </View>
      {showSearch && (
        <View style={styles.container}>
          <Input
            radio
            row
            radioGroup={[
              {label: t('OpenDataObj.Product'), value: 'product'},
              {label: t('OpenDataObj.Activity'), value: 'activity'},
            ]}
            title={t('OpenDataObj.FilterBy')}
            value={filterType}
            onPress={(value: any) => {
              setFilterType(value?.value);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <Input
              textInput
              label={t('OpenDataObj.Search')}
              value={searchParams.searchword}
              onChangeText={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  searchword: item,
                }))
              }
              viewStyle={{minWidth: '48%'}}
            />
            <Input
              dropdown
              label={t('OpenDataObj.Location')}
              items={locationList}
              value={searchParams.location}
              onChange={(item: any) => {
                setSearchParams((prev: any) => ({
                  ...prev,
                  location: item?.value,
                }));
              }}
              viewStyle={{minWidth: '48%'}}
            />
            <Input
              dropdown
              label={t('OpenDataObj.Area')}
              items={areaList}
              disabled={!searchParams.location}
              value={searchParams.area}
              onChange={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  area: item?.value,
                }))
              }
              viewStyle={{minWidth: '48%'}}
            />
            {filterType === 'activity' && (
              <>
                <Input
                  dropdown
                  label={t('OpenDataObj.ActivityCategory')}
                  items={activityCategories}
                  value={searchParams.activityCategory}
                  onChange={(item: any) => {
                    setSearchParams((prev: any) => ({
                      ...prev,
                      activityCategory: item?.value,
                      activity: '',
                    }));
                  }}
                  viewStyle={{minWidth: '48%'}}
                />

                {/* <Input
                  dropdown
                  label={t('OpenDataObj.Activity')}
                  items={activities}
                  value={searchParams.activity}
                  onChange={(item: any) =>
                    setSearchParams((prev: any) => ({
                      ...prev,
                      activity: item?.value,
                    }))
                  }
                  viewStyle={{minWidth: '48%'}}
                /> */}
              </>
            )}
            {/* {filterType === 'product' && (
              <Input
                dropdown
                label={t('OpenDataObj.Product')}
                items={productList}
                value={searchParams.selectedItem}
                onChange={(item: any) =>
                  setSearchParams((prev: any) => ({
                    ...prev,
                    selectedItem: item?.value,
                  }))
                }
                viewStyle={{minWidth: '48%'}}
              />
            )} */}
          </View>
          <View style={styles.actions}>
            <Button
              title={t('Search')}
              onPress={() => {
                onSearch();
                setShowSearch(false);
              }}
              style={styles.searchBtnWithTitle}
              styleText={{color: colors.mainWhite}}
            />
          </View>
        </View>
      )}
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      borderColor: colors.gray,
      borderWidth: 1 * BW(),
      paddingHorizontal: 16 * BW(),
      paddingBottom: 16 * BW(),
      paddingTop: 4 * BW(),
      marginBottom: 8 * BW(),
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16 * BW(),
    },
    searchBtn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.border,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
    },

    resetBtn: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.secondaryColor,
      paddingHorizontal: 16 * BW(),
      width: 'auto',
      height: 'auto',
    },
    searchBtnContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 8 * BW(),
    },
    searchBtnWithTitle: {
      width: 80 * BW(),
      height: 'auto',
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
      marginTop: 8 * BW(),
      backgroundColor: colors.secondaryColor,
    },
  });
