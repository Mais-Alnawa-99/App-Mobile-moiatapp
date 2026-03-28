import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {isArabic} from '../../../locales';
import ServiceDetailsAr from '../details/ServiceDetailsAr';
import ServiceDetailsEn from '../details/ServiceDetailsEn';
import {getFavoriteAndMostUsedServices} from '../../../redux/reducers/E-Services/thunk/dashboard';
import {getUserDashBoard} from '../../../redux/reducers/I-Services/thunk/profile';
import {setFavouriteServicesAll} from '../../../redux/reducers/Services/slice/favouriteServices';

const normalizeStaticServices = (list: any[]) =>
  (list ?? []).map(s => ({
    Id: s.id,
    FieldValues: {
      Title: s.title,
      ServiceCategories: s.Category_Id
        ? [{Id: `{${String(s.Category_Id).toUpperCase()}}`}]
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

export default function FavoritesInitializer() {
  const dispatch = useAppDispatch();

  const {favouriteServices} = useAppSelector(state => state.favouriteServices);
  const {isLoggedIn} = useAppSelector(store => store.auth);

  const {userILData, userId}: any = useAppSelector(state => state.userILData);

  const src = isArabic() ? ServiceDetailsAr : ServiceDetailsEn;

  const [favIdsFromApi, setFavIdsFromApi] = useState<(number | string)[]>([]);
  const [favILIdsFromApi, setFavILIdsFromApi] = useState<(number | string)[]>(
    [],
  );
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
  }, [userId]);

  useEffect(() => {
    if (isLoggedIn) refreshFavorites();
  }, [refreshFavorites, isLoggedIn]);

  const srcNormalized = useMemo(() => normalizeStaticServices(src), [src]);
  const favSet = useMemo(() => new Set(favIdsFromApi), [favIdsFromApi]); // ES
  const ilSet = useMemo(() => new Set(favILIdsFromApi), [favILIdsFromApi]); // IL

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
    dispatch(setFavouriteServicesAll(favouriteFromSrc));
  }, [dispatch, favouriteFromSrc]);

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

    setFavIdsFromApi(prev => {
      const prevSet = new Set(prev);
      const same =
        prevSet.size === esIdsSet.size &&
        [...prevSet].every(v => esIdsSet.has(v));
      return same ? prev : Array.from(esIdsSet);
    });

    setFavILIdsFromApi(prev => {
      const prevSet = new Set(prev);
      const same =
        prevSet.size === ilIdsSet.size &&
        [...prevSet].every(v => ilIdsSet.has(v));
      return same ? prev : Array.from(ilIdsSet);
    });
  }, [favouriteServices]);

  return null;
}
