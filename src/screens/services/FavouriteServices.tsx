import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {store, useAppDispatch, useAppSelector} from '../../redux/store';
import {BW} from '../../style/theme';
import {searchServices} from '../../redux/reducers/Services/thunk/services';
import ServicesList from './ServiceList';
import {updateUserFavouriteServices} from '../../redux/reducers/E-Services/thunk/services';
import {
  clearFavouriteServices,
  setFavouriteServices,
  setFavouriteServicesAll,
} from '../../redux/reducers/Services/slice/favouriteServices';
import {isArabic} from '../../locales';
import ServiceDetailsAr from './details/ServiceDetailsAr';
import ServiceDetailsEn from './details/ServiceDetailsEn';
import {getFavoriteAndMostUsedServices} from '../../redux/reducers/E-Services/thunk/dashboard';
import {getUserDashBoard} from '../../redux/reducers/I-Services/thunk/profile';
import {setUserFavoriteService} from '../../redux/reducers/I-Services/thunk/factory';

export const _updateUserFavouriteServices = (item: any, isFavourite: any) => {
  const isLoggedInVar = store.getState().auth.isLoggedIn;
  if (!isLoggedInVar) {
    store.dispatch(setFavouriteServices(item));
  } else {
    if (item?.type == 'il') {
      store
        .dispatch(
          setUserFavoriteService({
            FormId: item?.relatedServiceId,
            userId: store.getState().userILData.userId,
            isFavorite: !isFavourite,
          }),
        )
        .then(res => {
          if (res?.payload?.networkSuccess && res?.payload?.Data?.success) {
            store.dispatch(setFavouriteServices(item));
          }
        });
    } else {
      store
        .dispatch(
          updateUserFavouriteServices({
            ServiceId: item?.relatedServiceId,
            IsFavourite: !isFavourite,
          }),
        )
        .then(res => {
          if (res?.payload?.networkSuccess && res?.payload?.status == 200) {
            store.dispatch(setFavouriteServices(item));
          }
        });
    }
  }
};
export default function FavouriteServices(props: any): JSX.Element {
  const {colors} = useTheme();
  const style = getStyle(colors);

  const {favouriteServices} = useAppSelector(state => state.favouriteServices);
  const [favIdsFromApi, setFavIdsFromApi] = useState<(number | string)[]>([]);
  const [favILIdsFromApi, setFavILIdsFromApi] = useState<(number | string)[]>(
    [],
  );
  const {userILData, userId}: any = useAppSelector(store => store.userILData);
  const {isLoggedIn} = useAppSelector(store => store.auth);

  const dispatch = useAppDispatch();
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

  const asArray = (v: any) => {
    if (Array.isArray(v)) return v;
    try {
      const j = JSON.parse(v ?? '[]');
      return Array.isArray(j) ? j : [];
    } catch {
      return [];
    }
  };
  const refreshFavorites = useCallback(async () => {
    dispatch(getFavoriteAndMostUsedServices()).then(res => {
      if (res.payload.networkSuccess) {
        const esArr = asArray(res?.payload?.userFavoriteServices);
        const esIds = esArr.map((x: any) => x?.Id).filter(Boolean);
        setFavIdsFromApi(esIds);
      }
    });
    dispatch(
      getUserDashBoard({
        UserId: userId,
      }),
    ).then(res => {
      if (res.payload.networkSuccess) {
        const ilArr = asArray(res?.payload?.result?.FavoriteServices);
        const ilIds = ilArr.map((x: any) => x?.ServiceId).filter(Boolean);

        setFavILIdsFromApi(ilIds);
      }
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) refreshFavorites();
  }, []);
  const srcNormalized = useMemo(() => normalizeStaticServices(src), [src]);

  const favSet = useMemo(() => new Set(favIdsFromApi), [favIdsFromApi]);
  const ilSet = useMemo(() => new Set(favILIdsFromApi), [favILIdsFromApi]);

  const favouriteFromSrc = useMemo(() => {
    return srcNormalized.filter(s => {
      const rid = s?.relatedServiceId;
      if (!rid) return false;

      const inEs = favSet.has(rid);
      const inIl = ilSet.has(rid);

      const passEs = inEs && s?.type !== 'il';
      const passIl = inIl && s?.type === 'il';

      return passEs || passIl;
    });
  }, [srcNormalized, favSet, ilSet]);

  useEffect(() => {
    store.dispatch(setFavouriteServicesAll(favouriteFromSrc));
  }, [favouriteFromSrc]);

  useEffect(() => {
    const list = Array.isArray(favouriteServices) ? favouriteServices : [];

    const esIdsSet = new Set<number | string>();
    const ilIdsSet = new Set<number | string>();

    for (const x of list) {
      const rid = x?.relatedServiceId ?? x?.Id ?? x?.id;
      if (!rid) continue;
      if (x?.type === 'il') ilIdsSet.add(rid);
      else esIdsSet.add(rid);
    }

    // حدّث favIdsFromApi (ES)
    setFavIdsFromApi(prev => {
      const prevSet = new Set(prev);
      const same =
        prevSet.size === esIdsSet.size &&
        [...prevSet].every(v => esIdsSet.has(v));
      return same ? prev : Array.from(esIdsSet);
    });

    // حدّث favILIdsFromApi (IL)
    setFavILIdsFromApi(prev => {
      const prevSet = new Set(prev);
      const same =
        prevSet.size === ilIdsSet.size &&
        [...prevSet].every(v => ilIdsSet.has(v));
      return same ? prev : Array.from(ilIdsSet);
    });
  }, [favouriteServices]);

  return (
    <ServicesList
      services={favouriteFromSrc}
      listView={props.listView}
      isLoading={false}
      searchService={() => refreshFavorites()}
    />
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
