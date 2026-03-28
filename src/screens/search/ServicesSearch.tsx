import React, {useState, useEffect, useRef, Fragment, useCallback} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {BW} from '../../style/theme';
import {searchMedia} from '../../redux/reducers/Media/thunk/media';
import MediaList from '../media/MediaList';
import ViewAll from '../../component/ViewAll';
import NavigationService from '../../navigation/NavigationService';
import {searchServices} from '../../redux/reducers/Services/thunk/services';
import ServicesList from '../services/ServiceList';
import {setActiveCat} from '../../redux/reducers/Services/slice/services';
import {isArabic} from '../../locales';
import ServiceDetailsAr from '../services/details/ServiceDetailsAr';
import ServiceDetailsEn from '../services/details/ServiceDetailsEn';

export default function ServicesSearch(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  const {allServices, isLoading, count} = useAppSelector(
    state => state.services.services,
  );
  const [filteredServices, setFilteredServices] = useState([]);

  const dispatch = useAppDispatch();

  const _searchService = (skip = 0) => {
    dispatch(
      searchServices({
        CategoryId: '',
        SubCategoryId: '',
        Keyword: '',
        TagId: '',
        Skip: 0,
        Top: 38,
        home: false,
      }),
    );
  };

  const serarch = () => {
    const src = isArabic() ? ServiceDetailsAr : ServiceDetailsEn;
    const normalizeStaticServices = (list: any[]) =>
      list.map(s => ({
        Id: s.id,
        FieldValues: {
          Title: s.title,
          ServiceCategories: s.Category_Id
            ? [{Id: `{${s.Category_Id.toUpperCase()}}`}]
            : [],
        },
      }));
    let services = src;

    const normalized = normalizeStaticServices(services);
    let fServices = normalized?.filter((service: any) => {
      const nameMatches = service?.Name?.toLowerCase().includes(
        props.searchValue.toLowerCase(),
      );
      const titleMatches = service?.FieldValues?.Title?.includes(
        props.searchValue,
      );
      return nameMatches || titleMatches;
    });
    if (fServices != undefined) {
      setFilteredServices(fServices);
    } else {
      setFilteredServices([]);
    }
  };

  useEffect(() => {
    // _searchService();
  }, []);
  useEffect(() => {
    serarch();
  }, [props.searchValue, allServices]);

  const _onPressViewAll = () => {
    dispatch(
      setActiveCat({
        activeType: 'allServices',
        activeBtn: 0,
      }),
    );
    NavigationService.navigate('Services', {
      searchValue: props.searchValue,
      fromSearch: true,
    });
  };
  return (
    <View>
      <ViewAll
        content={`${t('Services')}  ${filteredServices.length}`}
        showViewAll={filteredServices?.length != 0}
        onPress={() => {
          _onPressViewAll();
        }}
      />
      <ServicesList
        services={filteredServices}
        listView={false}
        isLoading={isLoading}
        searchService={_searchService}
        moreLoading={false}
        style={{paddingStart: 0, paddingEnd: 0}}
      />
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
    search: {
      borderWidth: 1 * BW(),
      borderColor: colors.gray,
      borderRadius: 8 * BW(),
      paddingHorizontal: 6 * BW(),
      marginStart: 12 * BW(),
    },
  });
