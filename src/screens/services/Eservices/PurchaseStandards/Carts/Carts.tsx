import React, {useState, useEffect} from 'react';
import {ImageBackground, LayoutAnimation, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import Page from '../../../../../component/Page';
import {BW} from '../../../../../style/theme';
import Header from '../../../../../component/Header';
import FlatListComp from '../../../../../component/FlatList';
import StandardCard from '../StandardCard';
import Button from '../../../../../component/Button';
import NavigationService from '../../../../../navigation/NavigationService';

export default function StandardsCart(props: any): JSX.Element {
  const params = props.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {cartItems} = useAppSelector(state => state.cartItems);
  const {userData}: any = useAppSelector(store => store.userDataStored);

  const renderItem = ({item}: any, index: any) => {
    return <StandardCard key={index} index={index} item={item} />;
  };

  const proceedToCheckout = () => {
    let standardItemsArr: any = [];
    cartItems?.map((item: any, index) => {
      let obj = {
        itemIndex: index + 1,
        recordId: item.versionRecordId, //RecordId,
        fields: [
          {
            entityFieldId: 1704,
            value: item.StandardNumber,
          },
          {
            entityFieldId: 1705,
            value: item.TitleEnglish,
          },
          {
            entityFieldId: 1706,
            value: item.TitleArabic,
          },
          {
            entityFieldId: 2327,
            value: item.version.LanguageId, //item.version.LanguageValue
          },
          {
            entityFieldId: 2328,
            value: item.version.NumberOfPages,
          },
          {
            entityFieldId: 2329,
            value: item.version.Price,
          },
        ],
        status: 1,
      };
      standardItemsArr.push(obj);
    });
    let defaultValueArr = [
      {
        entityFieldId: 2326,
        value: '',
        children: standardItemsArr,
      },
    ];

    let serviceId = 1050;
    let selectedProfile = userData;
    const inputRequest = {
      serviceId: serviceId,
      parentApplication: null,
      profileRecordId: selectedProfile
        ? selectedProfile?.record.RecordId
        : null,
      recordId: '',
      requestedServiceId: '',
      defaultValueArr: JSON.stringify(defaultValueArr),
    };
    NavigationService.navigate('ServiceForm', {
      serviceId: serviceId,
      record: inputRequest,
    });
  };
  const totalPrice = cartItems?.reduce(
    (sum: number, item: any) => sum + (item?.version?.Price || 0),
    0,
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          styles={{padding: 8 * BW()}}
          header={
            <Header
              title={t('Custom_Labels.ShoppingCart')}
              showNotification
              hideDrawer
              titleContainerStyle={{flex: 4}}
            />
          }
          withHeader>
          <FlatListComp
            data={cartItems || []}
            scrollview
            renderItem={({item, index}: any) => renderItem({item}, index)}
            noData
          />
        </Page>
        {cartItems.length > 0 && (
          <View
            style={{
              paddingBottom: 6 * BW(),
              paddingHorizontal: 16 * BW(),
              alignItems: 'flex-end',
            }}>
            <Button
              title={`${t(
                'Custom_Button.ProceedToCheckout',
              )} (${totalPrice.toFixed(2)} AED)`}
              style={styles.actionBtn}
              h3
              medium
              styleText={{color: colors.mainWhite}}
              onPress={() => {
                proceedToCheckout();
              }}
            />
          </View>
        )}
      </ImageBackground>
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
      gap: 4 * BW(),
      flex: 1,
    },
    actionBtn: {
      width: '40%',
      height: 'auto',
      backgroundColor: colors.secondaryColor,
      minHeight: 40 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 0,
      borderRadius: 4 * BW(),
    },
  });
