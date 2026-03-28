import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {BW} from '../../../../style/theme';
import Button from '../../../../component/Button';
import {serviceCustomApiGateway} from '../../../../redux/network/apiEservices';
import {_downloadFile} from '../../../../component/SaveFiles';
import {
  addCartItem,
  removeCartItem,
} from '../../../../redux/reducers/E-Services/slice/cartItems';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import CustomToast from '../../../../component/toast/CustomToast';

export default function VersionActions({
  item,
  index,
  parentItem,
}: {
  item: any;
  index: any;
  parentItem: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [pdfLoading, setPdfLoading] = useState(false);

  const {cartItems} = useAppSelector(state => state.cartItems);

  let previewStandardURL =
    serviceCustomApiGateway +
    '/Standard/PreviewStandard?StandardVersionRecordId=' +
    item?.RecordId;

  const generateUUID = (recordId: number): string =>
    new Date().valueOf().toString() + recordId.toString();

  const handleAddToCart = () => {
    const isAlreadyInCart = cartItems.some(
      ci =>
        ci?.RecordId === parentItem.RecordId &&
        ci?.versionRecordId === item?.RecordId,
    );

    if (isAlreadyInCart) {
      Alert.alert(t('Alerts.ItemAlreadyAddedToCart'));
    } else {
      const cartItem = {
        ...parentItem,
        version: item?.Fields,
        versionRecordId: item?.RecordId,
        price: item?.Fields?.Price,
        uuid: generateUUID(parentItem?.RecordId),
      };

      dispatch(addCartItem(cartItem));
      // showToast(t('Alerts.ItemAddedToCart'));
    }
  };

  const isAlreadyInCart = cartItems.some(
    ci =>
      ci?.RecordId === parentItem.RecordId &&
      ci?.versionRecordId === item?.RecordId,
  );

  return (
    <>
      <View style={styles.versionActions}>
        {isAlreadyInCart ? (
          <Button
            // title={t('Custom_Button_Mobile.RemoveFromCart')}
            style={{...styles.actionBtn, ...styles.deleteBtn}}
            // icon={require('../../../../assets/icons/delete.png')}
            // containerIcon={{width: 16 * BW(), hight: 16 * BW()}}
            // styleIcon={{tintColor: colors.mainWhite}}
            styleText={{color: colors.mainWhite}}
            ionicons={'remove-shopping-cart'}
            ioniconsColor={colors.mainWhite}
            onPress={() => {
              dispatch(
                removeCartItem({
                  RecordId: parentItem.RecordId,
                  versionRecordId: item?.RecordId,
                }),
              );
            }}
          />
        ) : (
          <Button
            // title={t('Custom_Button.AddToCart')}
            ionicons={'add-shopping-cart'}
            ioniconsColor={colors.mainWhite}
            style={styles.actionBtn}
            styleText={{color: colors.mainWhite}}
            onPress={() => {
              handleAddToCart();
            }}
          />
        )}
        <Button
          // title={t('Custom_Button.ViewStandardPDF')}
          style={styles.previewBtn}
          Fontisto={'preview'}
          FontistoColor={colors.textPrimaryColor}
          FontistoSize={20 * BW()}
          styleText={{color: colors.textPrimaryColor}}
          loading={pdfLoading}
          onPress={async () => {
            setPdfLoading(true);
            await _downloadFile(
              previewStandardURL,
              parentItem?.TitleEnglish + '.pdf',
              false,
            );
            await new Promise(resolve => setTimeout(resolve, 600));
            setPdfLoading(false);
          }}
        />
      </View>
      {/* <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      /> */}
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    versionActions: {
      flexDirection: 'row',
      marginTop: 4 * BW(),
    },
    actionBtn: {
      width: 'auto',
      height: 'auto',
      // paddingHorizontal: 6 * BW(),
      marginEnd: 6 * BW(),
      padding: 8 * BW(),
      backgroundColor: colors.secondaryColor,
      minHeight: 30 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8 * BW(),
      borderRadius: 4 * BW(),
    },
    deleteBtn: {
      backgroundColor: colors.red,
    },
    previewBtn: {
      width: 'auto',
      height: 'auto',
      // paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 6 * BW(),
      paddingEnd: 7 * BW(),
      backgroundColor: colors.white,
      borderColor: colors.textPrimaryColor,
      borderWidth: 1 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4 * BW(),
      minHeight: 30 * BW(),
    },
  });
