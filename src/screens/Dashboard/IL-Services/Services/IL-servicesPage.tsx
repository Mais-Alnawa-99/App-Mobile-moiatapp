import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import ServiceCard from '../../Components/MostUsedServiceCard';
import Accordion from '../../../../component/Accordion';
import Search from '../../../../component/Search';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';

export default function ILAllServicesPage(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<{
    [key: number]: boolean;
  }>({[0]: true});
  const [search, setSearch] = useState('');

  const {ilServices} = useAppSelector(store => store.ilServices.ilServices);

  let langId = isArabic() ? 2 : 1;

  const renderService = (service: any, index: any) => {
    return (
      <Animatable.View
        animation={index % 2 !== 0 ? 'fadeInLeft' : 'fadeInRight'}
        duration={1000}
        key={index}
        delay={150}>
        <ServiceCard
          item={service}
          index={index}
          style={{
            maxWidth: '100%',
            marginTop: 8 * BW(),
            backgroundColor: colors.secondaryColor + '11',
          }}
          ilServices
        />
      </Animatable.View>
    );
  };
  const toggleGroup = (id: number) => {
    setExpandedGroups(prev => ({...prev, [id]: !prev[id]}));
  };

  const renderGroup = (group: any, index: any) => {
    const groupName = group.name;
    const groupServices = group.services;

    const filteredGroupServices = groupServices.filter((service: any) => {
      if (!search) return true;
      return service.name?.toLowerCase().includes(search.toLowerCase());
    });

    if (filteredGroupServices.length === 0) {
      return null;
    }

    return (
      <Accordion
        key={index}
        title={groupName}
        bold
        expandedDefault={expandedGroups[group.id]}
        onPress={() => toggleGroup(group.id)}
        styleHeader={{backgroundColor: colors.white}}
        styleBody={{
          paddingBottom: 12 * BW(),
          paddingTop: 8 * BW(),
          backgroundColor: colors.white,
        }}
        styleIcon={{
          tintColor: colors.secondaryColor,
        }}
        styleTilte={{
          color: expandedGroups[group.id]
            ? colors.secondaryColor
            : colors.textPrimaryColor,
        }}
        showBorder
        styleConatiner={{marginBottom: 8 * BW()}}>
        <View>
          {filteredGroupServices.map((service: any, index: any) =>
            renderService(service, index),
          )}
        </View>
      </Accordion>
    );
  };

  const groupedMap: any = {};
  ilServices?.forEach?.((service: any) => {
    const category = isArabic() ? service?.CatNameAr : service?.CatNameEn;
    if (!groupedMap[category]) {
      groupedMap[category] = [];
    }
    groupedMap[category].push(service);
  });

  const services = Object.entries(groupedMap).map(
    ([categoryName, serviceNames]: any, index) => ({
      id: index,
      parentId: 0,
      name: categoryName,
      services: serviceNames?.map?.((service: any, i: any) => ({
        id: i,
        name: service?.ServiceName,
        url: service?.ServiceUrl,
        serviceId: service?.ServiceId,
      })),
    }),
  );

  return (
    <>
      <View style={styles.appContainer}>
        <Page
          withStatusBar
          ttsScopeId="il-servi-scope"
          styles={{
            paddingHorizontal: 16 * BW(),
            paddingTop: 8 * BW(),
          }}
          withHeader
          // onRefresh={_getDashboardGroupServices}
          header={
            <Header
              title={t('industrialServices').replace('\n', ' ')}
              style={{
                borderBottomColor: colors.gray,
                borderBottomWidth: 0 * BW(),
              }}
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

              {services?.filter((g: any) => g.parentId === 0).map(renderGroup)}
            </>
          </Loader>
        </Page>
      </View>
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },

    // card: {
    //   backgroundColor: '#fff',
    //   borderRadius: 10 * BW(),
    //   padding: 12 * BW(),
    //   marginBottom: 12 * BW(),
    //   shadowColor: '#000',
    //   shadowOpacity: 0.08,
    //   shadowOffset: {width: 0, height: 1},
    //   shadowRadius: 4,
    //   elevation: 2,
    // },
    cardTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardButtons: {
      flexDirection: 'row-reverse',
      gap: 8 * BW(),
    },
    startButton: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 12 * BW(),
      paddingVertical: 6 * BW(),
      borderRadius: 6 * BW(),
    },
    viewButton: {
      backgroundColor: '#d49140',
      paddingHorizontal: 12 * BW(),
      paddingVertical: 6 * BW(),
      borderRadius: 6 * BW(),
    },
    serviceName: {
      fontSize: 16 * BW(),
      fontWeight: '600',
      marginTop: 8 * BW(),
      textAlign: 'right',
    },
    iconBox: {
      alignSelf: 'flex-end',
      marginTop: 8 * BW(),
      borderWidth: 2,
      borderColor: '#d49140',
      paddingHorizontal: 12 * BW(),
      paddingVertical: 4 * BW(),
      borderRadius: 4 * BW(),
    },
    iconText: {
      color: '#d49140',
      fontSize: 14 * BW(),
      fontWeight: '500',
    },
  });
