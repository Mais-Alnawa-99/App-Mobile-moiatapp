import React, {Fragment, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Text from '../../../../component/Text';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import Line from '../../../../component/Line';
import RequestData from './RequestData';
import Pagination from '../../../../component/Pagination';
import FlatListComp from '../../../../component/FlatList';

export default function RequestServiceCard({
  service,
  statusId,
  listView,
  number,
  _getUserApplicationsList,
  loadingRequests,
  requests,
  setCurrentPage,
  currentPage,
  fromSearch,
  totalCount,
  setTotalCount,
  setActiveStage,
  activeStage,
}: any) {
  const PAGE_SIZE = 10;

  let langId = isArabic() ? 2 : 1;
  const arabicName =
    !!service &&
    JSON.parse(service.serviceName)?.find((e: any) => e.langId === langId)
      ?.value;
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const handleToggleAccordion = async (
    index: string,
    service: any,
    stage: any,
    status: any,
    count: any,
  ) => {
    if (activeStage === index) {
      setActiveStage(null);
      return;
    }

    setActiveStage(index);
    setTotalCount(Number(count || 0));
    setCurrentPage(1);
    _getUserApplicationsList(
      service.serviceId,
      stage.stageId,
      1,
      false,
      undefined,
      status?.stageStatusId,
    );
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      {!listView ? (
        <View style={styles.card}>
          <View style={styles.header}>
            <Text h4 bold>
              {arabicName}
            </Text>
          </View>
          <View>
            {!!service?.stages &&
              service?.stages?.map((stage: any, index: number) => {
                const stageName = JSON.parse(stage.stagesName)?.find(
                  (e: any) => e.langId === langId,
                )?.value;
                let statuses = stage?.stageStatuses;
                if (!!statusId) {
                  statuses = statuses.filter(
                    (s: any) => s.stageStatusId === statusId,
                  );
                }
                return (
                  <Fragment key={index}>
                    {statuses.map((status: any, sIndex: number) => {
                      const statusName = JSON.parse(status.statusesName)?.find(
                        (e: any) => e.langId === langId,
                      )?.value;

                      return (
                        <Fragment key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              handleToggleAccordion(
                                `${index}_${sIndex}_${service.serviceId}`,
                                service,
                                stage,
                                status,
                                status.StatusCount,
                              );
                            }}
                            style={styles.stageRow}>
                            <View style={[styles.stageRow, {gap: 8 * BW()}]}>
                              <View style={styles.orderNum}>
                                <Text h4 style={styles.order}>
                                  {String(status.StatusCount).padStart(2, '0')}
                                </Text>
                              </View>
                              <Text h4>{stageName}</Text>
                              <View
                                style={{
                                  borderColor: colors.primary,
                                  borderWidth: 0.4 * BW(),
                                  width: 0,
                                  height: 20 * BW(),
                                }}
                              />
                              <Text
                                h4
                                style={
                                  status?.stageStatusId == 2
                                    ? styles.green
                                    : styles.red
                                }>
                                {statusName}
                              </Text>
                            </View>
                            <Animatable.View
                              animation={{
                                from: {
                                  rotate:
                                    activeStage ===
                                    `${index}_${sIndex}_${service.serviceId}`
                                      ? '-90deg'
                                      : '90deg',
                                },
                                to: {
                                  rotate:
                                    activeStage ===
                                    `${index}_${sIndex}_${service.serviceId}`
                                      ? '90deg'
                                      : '-90deg',
                                },
                              }}
                              duration={400}
                              useNativeDriver>
                              <Image
                                style={{
                                  transform: [
                                    {rotate: !isArabic() ? '180deg' : '0deg'},
                                  ],
                                  width: 14 * BW(),
                                  height: 14 * BW(),
                                  resizeMode: 'contain',
                                  tintColor: colors.iconPrimaryColor,
                                }}
                                source={require('../../../../assets/icons/back.png')}
                              />
                            </Animatable.View>
                          </TouchableOpacity>

                          {activeStage ===
                            `${index}_${sIndex}_${service.serviceId}` && (
                            <View style={{maxHeight: 500 * BW()}}>
                              <FlatListComp
                                data={requests}
                                scrollview
                                renderItem={({item, index}: any) => (
                                  <RequestData
                                    applicationDetails={item}
                                    index={index}
                                    listView={listView}
                                  />
                                )}
                                noData={!loadingRequests}
                              />
                              {totalPages > 1 && (
                                <Pagination
                                  currentPage={currentPage}
                                  totalCount={totalCount}
                                  pageSize={PAGE_SIZE}
                                  onPageChange={(newPage: number) => {
                                    setCurrentPage(newPage);
                                    _getUserApplicationsList(
                                      service.serviceId,
                                      stage.stageId,
                                      newPage,
                                      false,
                                      undefined,
                                      status?.stageStatusId,
                                    );
                                  }}
                                />
                              )}
                            </View>
                          )}
                          {index != service?.stages.length && (
                            <Line
                              style={{
                                marginVertical: 8 * BW(),
                                marginBottom: 4 * BW(),
                                borderTopWidth: 0.4 * BW(),
                              }}
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </Fragment>
                );
              })}
          </View>
        </View>
      ) : (
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 50 * BW()}}>
            <FlatListComp
              data={requests}
              scrollview
              renderItem={({item, index}: any) => (
                <RequestData
                  style={{
                    ...styles.card,
                    marginTop: 0,
                    marginBottom: 8 * BW(),
                    padding: 16 * BW(),
                  }}
                  applicationDetails={item}
                  index={index}
                  listView={listView}
                  fromSearch={fromSearch}
                  total={totalCount}
                  setTotalCount={setTotalCount}
                />
              )}
              noData={!loadingRequests}
            />
            {!loadingRequests &&
              ((!fromSearch && number > 1) ||
                (fromSearch && totalPages > 1)) && (
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={PAGE_SIZE}
                  onPageChange={(newPage: number) => {
                    setCurrentPage(newPage);
                    _getUserApplicationsList('', '', newPage);
                  }}
                />
              )}
          </ScrollView>
        </View>
      )}
      {/* {loadingRequests && <Loader modal isLoading={loadingRequests} />} */}
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    alignItemsCenter: {flexDirection: 'row', alignItems: 'center'},

    container: {
      backgroundColor: colors.primaryColor,
      borderRadius: 12 * BW(),
      paddingHorizontal: 16 * BW(),
      paddingVertical: 16 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 42 * BW(),
    },
    userImage: {
      height: 70 * BW(),
      width: 70 * BW(),
      borderRadius: 60 * BW(),
      backgroundColor: colors.background,
      zIndex: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    userName: {
      color: colors.mainWhite,
      paddingHorizontal: 20 * BW(),
      textAlign: 'center',
      marginTop: 8 * BW(),
    },
    btnContainer: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row-reverse',
      gap: 4 * BW(),
    },
    containerIcon: {
      width: 24 * BW(),
      height: 24 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'center',
    },
    card: {
      padding: 10 * BW(),
      marginBottom: 8 * BW(),
      backgroundColor: colors.white,
      borderRadius: 8 * BW(),
    },
    header: {
      marginBottom: 8,
    },

    stageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4 * BW(),
      justifyContent: 'space-between',
    },
    orderNum: {
      backgroundColor: colors.lightPrimaryColor,
      borderRadius: 30 * BW(),
      width: 30 * BW(),
      height: 30 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
    order: {
      color: colors.black,
    },

    green: {
      color: colors.green,
    },
    red: {
      color: colors.red,
    },
  });
