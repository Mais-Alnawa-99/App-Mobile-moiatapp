import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {BW} from '../../../style/theme';
import Text from '../../../component/Text';
import {searchServices} from '../../../redux/reducers/Services/thunk/services';
import Loader from '../../../component/Loader';
import ServicesList from '../ServiceList';
import {isArabic} from '../../../locales';
import ServiceDetailsAr from './ServiceDetailsAr';
import ServiceDetailsEn from './ServiceDetailsEn';
import {setServices} from '../../../redux/reducers/Services/slice/services';

export default function RelatedSevices(props: any): JSX.Element {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const details = props.details;
  const data = props.data;

  const {services, isLoading} = useAppSelector(
    state => state.services.services,
  );
  const [serivcesFiltered, setServicesFiltered] = useState([]);
  const {active} = useAppSelector(state => state.services.services);

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
  const _searchService = () => {
    let services = src.filter(s => s.Category_Id === data?.Category_Id);

    const normalized = normalizeStaticServices(services);
    dispatch(setServices(normalized));
  };
  useEffect(() => {
    _searchService();
  }, []);

  const _setServicesList = () => {
    if (services) {
      setServicesFiltered(services.filter((p: any) => p?.Id != data?.Id));
    }
  };
  useEffect(() => {
    _setServicesList();
  }, [services]);

  return (
    <View>
      {serivcesFiltered.length > 0 && (
        <>
          <Text h4>{t('RelatedServices')}</Text>
          <View style={{marginTop: 12 * BW(), flexDirection: 'row'}}>
            <ServicesList
              services={serivcesFiltered}
              listView={true}
              style={{flexDirection: 'row', paddingStart: 0, paddingEnd: 0}}
              horizontal
              isLoading={isLoading}
              styleCard={{width: 200 * BW(), minHeight: 80 * BW()}}
              animation={'fadeInDown'}
              numberOfTitleLines={2}
              fromDetails
            />
          </View>
        </>
      )}
    </View>
  );
}

const getStyle = (colors: any) => StyleSheet.create({});
