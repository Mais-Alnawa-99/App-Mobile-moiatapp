import React, {Fragment, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
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
  PAGE_SIZE,
}: any) {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <View style={{flex: 1}}>
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
        onRefresh={() => {
          _getUserApplicationsList(1);
        }}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={(newPage: number) => {
            setCurrentPage(newPage);
            _getUserApplicationsList(newPage);
          }}
        />
      )}
    </View>
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
