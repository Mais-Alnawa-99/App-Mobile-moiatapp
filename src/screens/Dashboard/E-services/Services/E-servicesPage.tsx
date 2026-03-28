import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as Animatable from 'react-native-animatable';

import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {getDashboardGroupServices} from '../../../../redux/reducers/E-Services/thunk/services';
import Loader from '../../../../component/Loader';
import {parseJSON} from '../../../services/utils';
import Text from '../../../../component/Text';
import {isArabic} from '../../../../locales';
import EServiceCard from '../../Components/MostUsedServiceCard';
import Accordion from '../../../../component/Accordion';
import Search from '../../../../component/Search';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';

type LangItem = {value: string; langId: number};

function safeParse<T = any>(v: any, fallback: T): T {
  try {
    if (typeof v === 'string') return JSON.parse(v);
    if (typeof v === 'object' && v !== null) return v as T;
    return fallback;
  } catch {
    return fallback;
  }
}

function getLocalized(
  arr: LangItem[] | undefined,
  langId: number,
  fallback = '',
) {
  if (!Array.isArray(arr)) return fallback;
  return (
    arr.find(e => e.langId === langId)?.value ??
    arr.find(e => e.langId === (langId === 1 ? 2 : 1))?.value ??
    fallback
  );
}

export default function EAllServicesPage(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const langId = isArabic() ? 2 : 1;

  const {tokenData}: any = useAppSelector(state => state.userToken);
  const hasFetchedOnce = useRef(false);

  const _getDashboardGroupServices = () => {
    setIsLoading(true);
    dispatch(setLoadingModal(false));
    dispatch(getDashboardGroupServices()).then(res => {
      if (res?.payload?.serviceJSON) {
        const data = parseJSON(res.payload.serviceJSON);
        setCategories(Array.isArray(data) ? data : []);
      }
      setIsLoading(false);
    });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setLoadingModal(false));
      if (!hasFetchedOnce.current) {
        _getDashboardGroupServices();
        hasFetchedOnce.current = true;
      }
    }, [tokenData, tokenData?.access_token]),
  );

  const toggle = (key: string) =>
    setExpanded(prev => ({...prev, [key]: !prev[key]}));

  const matchesSearch = useCallback(
    (text?: string) =>
      !search ||
      (text || '').toLowerCase().includes(search.trim().toLowerCase()),
    [search],
  );

  const renderService = (service: any, index: number) => (
    <Animatable.View
      key={service.Id ?? `${service.Name}-${index}`}
      animation={index % 2 !== 0 ? 'fadeInLeft' : 'fadeInRight'}
      duration={600}
      delay={80}>
      <EServiceCard
        item={service}
        index={index}
        style={{
          maxWidth: '100%',
          marginTop: 8 * BW(),
          backgroundColor: colors.secondaryColor + '11',
        }}
      />
    </Animatable.View>
  );

  const buildCategoryGroups = (cat: any) => {
    const groups = safeParse<any[]>(cat?.ServicesJson, []);
    const roots = groups.filter(g => (g?.parentId ?? 0) === 0);
    const byId: Record<number, any> = {};
    groups.forEach(g => (byId[g.id] = g));

    const childrenMap: Record<number, any[]> = {};
    groups.forEach(g => {
      if (g.parentId && g.parentId !== 0) {
        childrenMap[g.parentId] = childrenMap[g.parentId] || [];
        childrenMap[g.parentId].push(g);
      }
    });

    return {roots, childrenMap};
  };

  const filterServicesBySearch = (servicesArr: any[]) => {
    if (!Array.isArray(servicesArr)) return [];
    if (!search) return servicesArr;

    return servicesArr.filter(s => {
      const names = safeParse<LangItem[]>(s.serviceName, []);
      const en = getLocalized(names, 1, '');
      const ar = getLocalized(names, 2, '');
      return matchesSearch(en) || matchesSearch(ar);
    });
  };

  const renderGroupBlock = (group: any, children: any[], keyPrefix: string) => {
    const gName = getLocalized(
      safeParse<LangItem[]>(group?.name, []),
      langId,
      '',
    );
    const gServices = safeParse<any[]>(group?.services, []);
    const filteredTopServices = filterServicesBySearch(gServices);

    const filteredChildren = (children || []).filter(ch => {
      const chName = getLocalized(
        safeParse<LangItem[]>(ch?.name, []),
        langId,
        '',
      );
      const chServices = safeParse<any[]>(ch?.services, []);
      const chServicesFiltered = filterServicesBySearch(chServices);
      return matchesSearch(chName) || chServicesFiltered.length > 0;
    });

    if (
      search &&
      filteredTopServices.length === 0 &&
      filteredChildren.length === 0
    ) {
      return null;
    }

    const grpKey = `${keyPrefix}-grp-${group.id}`;

    return (
      <Accordion
        key={grpKey}
        title={gName}
        bold
        expandedDefault={!!expanded[grpKey]}
        onPress={() => toggle(grpKey)}
        styleHeader={{backgroundColor: colors.white}}
        styleBody={{
          paddingBottom: 12 * BW(),
          paddingTop: 8 * BW(),
          backgroundColor: colors.white,
        }}
        styleIcon={{tintColor: colors.secondaryColor}}
        styleTilte={{
          color: expanded[grpKey]
            ? colors.secondaryColor
            : colors.textPrimaryColor,
        }}
        showBorder
        styleConatiner={{marginBottom: 8 * BW()}}>
        <View>
          {filteredTopServices.map(renderService)}

          {filteredChildren.map(ch => {
            const chName = getLocalized(
              safeParse<LangItem[]>(ch?.name, []),
              langId,
              '',
            );
            const chServices = filterServicesBySearch(
              safeParse<any[]>(ch?.services, []),
            );
            if (chServices.length === 0) return null;

            return (
              <View
                key={`${grpKey}-child-${ch.id}`}
                style={{marginTop: 10 * BW()}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6 * BW(),
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.secondaryColor,
                      width: 12 * BW(),
                      height: 12 * BW(),
                      borderRadius: 12 * BW(),
                    }}
                  />
                  <Text h4 medium>
                    {chName}
                  </Text>
                </View>
                <View style={{marginTop: 6 * BW()}}>
                  {chServices.map(renderService)}
                </View>
              </View>
            );
          })}
        </View>
      </Accordion>
    );
  };

  const renderCategory = (cat: any) => {
    const catTitle =
      langId === 2 ? cat?.NameArabic ?? '' : cat?.NameEnglish ?? '';

    const {roots, childrenMap} = buildCategoryGroups(cat);

    const filteredRootGroups = roots.filter(root => {
      const rName = getLocalized(
        safeParse<LangItem[]>(root?.name, []),
        langId,
        '',
      );
      const rServices = filterServicesBySearch(
        safeParse<any[]>(root?.services, []),
      );
      const rChildren = childrenMap[root.id] || [];
      const rChildrenVisible = rChildren.some(ch => {
        const chName = getLocalized(
          safeParse<LangItem[]>(ch?.name, []),
          langId,
          '',
        );
        const chServices = filterServicesBySearch(
          safeParse<any[]>(ch?.services, []),
        );
        return matchesSearch(chName) || chServices.length > 0;
      });

      if (!search) return true;
      return matchesSearch(rName) || rServices.length > 0 || rChildrenVisible;
    });

    if (filteredRootGroups.length === 0) return null;

    const catKey = `cat-${cat?.ServiceCategoryId}`;

    return (
      <Accordion
        key={catKey}
        title={catTitle}
        bold
        expandedDefault={!!expanded[catKey]}
        onPress={() => toggle(catKey)}
        styleHeader={{backgroundColor: colors.white}}
        styleBody={{
          paddingBottom: 16 * BW(),
          paddingTop: 8 * BW(),
          backgroundColor: colors.lightgray + '33',
        }}
        styleIcon={{tintColor: colors.secondaryColor}}
        styleTilte={{
          color: expanded[catKey]
            ? colors.secondaryColor
            : colors.textPrimaryColor,
        }}
        showBorder
        styleConatiner={{marginBottom: 12 * BW()}}>
        <View>
          {filteredRootGroups.map(root =>
            renderGroupBlock(root, childrenMap[root.id] || [], catKey),
          )}
        </View>
      </Accordion>
    );
  };

  return (
    <View style={styles.appContainer}>
      <Page
        withStatusBar
        ttsScopeId="es-Services-scope"
        styles={{paddingHorizontal: 16 * BW(), paddingTop: 8 * BW()}}
        withHeader
        onRefresh={_getDashboardGroupServices}
        header={
          <Header
            title={t('Services')}
            hideDrawer
            style={{borderBottomColor: colors.gray, borderBottomWidth: 0}}
            showCart
          />
        }>
        <Loader isLoading={isLoading}>
          <>
            <Search
              search={search}
              setSearch={setSearch}
              style={{
                marginBottom: 16 * BW(),
                backgroundColor: colors.white,
                flex: undefined,
                borderRadius: 6 * BW(),
                paddingHorizontal: 12 * BW(),
                borderBottomWidth: 0,
              }}
            />
            {/* عرض الفئات ➜ المجموعات الرئيسية ➜ الخدمات */}
            {categories.map(renderCategory)}
          </>
        </Loader>
      </Page>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
  });
