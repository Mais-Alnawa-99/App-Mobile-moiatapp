import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import Page from '../../component/Page';
import Header from '../../component/Header';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {BW} from '../../style/theme';
import Button from '../../component/Button';
import SideBar from './SideBar';
import {searchServices} from '../../redux/reducers/Services/thunk/services';
import ServicesList from './ServiceList';
import {setSetting} from '../../redux/reducers/General/settings';
import SearchViewSection from '../media/SearchViewSection';
import FavouriteServices from './FavouriteServices';
import {setServices} from '../../redux/reducers/Services/slice/services';
import {isArabic} from '../../locales';
import ServiceDetailsAr from './details/ServiceDetailsAr';
import ServiceDetailsEn from './details/ServiceDetailsEn';
import {
  setILNeedUserId,
  setNeedRefreshToken,
} from '../../redux/reducers/General/server';

export default function Services(props: any): JSX.Element {
  const params = props?.route?.params;

  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);
  const [search, setSearch] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  const {services, isLoading, isLoadingMore, count, skip, top} = useAppSelector(
    state => state.services.services,
  );
  const [favouriteServices, setFavouriteServices]: any = useState([]);

  const {settings}: any = useAppSelector(state => state.settings);
  const {active} = useAppSelector(state => state.services.services);

  const [listView, setListView] = useState(settings?.serviceListView);

  const dispatch = useAppDispatch();

  const _searchService = (offset: any, customTop?: number) => {
    // if (active.activeType != 'favourite') {
    //   dispatch(
    //     searchServices({
    //       CategoryId:
    //         active.activeType == 'allServices' ? '' : active.activeType,
    //       SubCategoryId: '',
    //       Keyword: '',
    //       TagId: '',
    //       Skip: offset,
    //       Top: customTop || top,
    //       home: false,
    //     }),
    //   );
    // }
  };
  const _searchMoreService = () => {
    if (
      skip < count &&
      !isLoadingMore &&
      active.activeType !== 'favourite' &&
      active.activeType !== 'c7dbbc80-47b8-4f0d-acf1-ef0069153621'
    ) {
      const remaining = count - skip;
      const topToFetch = remaining < top ? remaining : top;
      // setTimeout(() => {
      //   _searchService(skip, topToFetch);
      // }, 500);
    }
  };

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
      relatedServiceId: s.relatedServiceId,
      type: s?.type,
    }));
  useFocusEffect(
    useCallback(() => {
      switch (active.activeType) {
        case '3e8e68f3-536c-471b-a44b-64fc2ff5a236':
        case 'f8bf36e7-f8d3-4a61-9a8a-2cc22a608d5a':
        case 'a0476a86-81d8-4964-9b81-b2093250774f':
        case 'd5685023-9f9c-450a-a9c3-415af1c6c144':
        case 'db59caa7-fe90-4a79-b347-fd6063eeeaf5':
        case '4f860e8c-53e3-4a66-852b-74c8e9d5d22d':
        case '1768e3ba-55fd-4be9-8df2-2c4e808c70dc':
        case 'cb061eb9-819c-4125-aa12-b6d8be3aaf91':
        case 'f1e75583-f056-4b92-8fe6-4694da763e1f':
        case 'bb0a6053-9efc-4031-bfd7-67202c842604':
        case 'dc16af20-5124-47ed-937a-eb5f4122d1f8':
        case 'c7dbbc80-47b8-4f0d-acf1-ef0069153621':
          // case '0a7acf8b-0383-4942-bca7-a086eac3c29c':
          {
            let services = src.filter(s => s.Category_Id === active.activeType);
            const normalized = normalizeStaticServices(services);
            dispatch(setServices(normalized));
          }
          break;
        case 'allServices': {
          const normalized = normalizeStaticServices(src);
          dispatch(setServices(normalized));
          break;
        }
        default:
          // _searchService(0);
          break;
      }
    }, [active.activeType]),
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     _searchService(0);
  //   }, []),
  // );

  const _setSetting = () => {
    dispatch(setSetting({serviceListView: listView}));
  };
  useEffect(() => {
    _setSetting();
  }, [listView]);

  const serarch = () => {
    if (services?.length != 0 && active.activeType != 'favourite') {
      let fServices = services?.filter((service: any) =>
        service?.FieldValues?.Title?.toLowerCase().includes(
          search.toLowerCase(),
        ),
      );
      setFilteredServices(fServices);
    } else if (
      favouriteServices.length != 0 &&
      active.activeType == 'favourite'
    ) {
      let fServices = favouriteServices?.filter((service: any) =>
        service?.FieldValues?.Title?.toLowerCase().includes(
          search.toLowerCase(),
        ),
      );
      setFilteredServices(fServices);
    } else {
      setFilteredServices([]);
    }
  };
  useEffect(() => {
    serarch();
  }, [search, services, active.activeType, favouriteServices]);

  useEffect(() => {
    if (!params?.fromSearch) {
      setSearch('');
    } else {
      setSearch(params?.searchValue);
    }
  }, []);

  const {isLoggedIn} = useAppSelector(state => state.auth);

  return (
    <View style={style.container}>
      <ImageBackground
        source={style.mainBackgroundImg.backgroundColor}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          withOutScrollView
          ttsScopeId="services-scope"
          ttsQuietMs={2000}
          styles={{paddingHorizontal: 0}}
          header={
            <Header
              // title={t('services')}
              hideBack
              showNotification
              showLang
              showSearch
            />
          }
          withHeader={!params?.fromSearch}>
          <View style={[style.row]}>
            <SearchViewSection
              search={search}
              setSearch={setSearch}
              listView={listView}
              setListView={setListView}
              fromSearch={params?.fromSearch}
            />
          </View>
          <View style={{flexDirection: 'row', flex: 1, marginTop: 16 * BW()}}>
            <SideBar
              activeType={active.activeType}
              activeBtn={active.activeBtn}
            />
            {active.activeType == 'favourite' ? (
              <FavouriteServices
                listView={listView}
                favouriteServices={
                  !!search ? filteredServices : favouriteServices
                }
                setFavouriteServices={setFavouriteServices}
              />
            ) : (
              <ServicesList
                services={
                  !!search
                    ? filteredServices
                    : services?.length != 0
                    ? active.activeType == 'allServices'
                      ? services
                      : services?.filter((item: any) =>
                          item?.FieldValues?.ServiceCategories?.some(
                            (category: any) =>
                              category?.Id?.toUpperCase() ===
                              `{${active.activeType.toUpperCase()}}`,
                          ),
                        )
                    : []
                }
                listView={listView}
                isLoading={isLoading}
                searchService={_searchService}
                _searchMoreService={_searchMoreService}
                // moreLoading={isLoadingMore}
              />
            )}
          </View>
        </Page>
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    mainBackgroundImg: {
      backgroundColor: colors.mainBackgroundImg,
    },

    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16 * BW(),
    },
    containerBtnSwitch: {
      backgroundColor: colors.secondaryColor,
      width: 42 * BW(),
      height: 42 * BW(),
      borderRadius: 100 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginStart: 16 * BW(),
      marginTop: 8 * BW(),
      alignSelf: 'flex-end',
    },

    icon: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
  });
