import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Page from '../../../../component/Page';
import {BW} from '../../../../style/theme';
import Header from '../../../../component/Header';
import Loader from '../../../../component/Loader';
import {getProductDetail} from '../../../../redux/reducers/E-Services/thunk/recalledProductInquiry';
import {isArabic} from '../../../../locales';
import {parseJSON} from '../../utils';
import CustomImage from '../../../../component/CustomImage';
import Text from '../../../../component/Text';
import {serviceApiGateway} from '../../../../redux/network/apiEservices';

export default function ProductDetails(props: any): JSX.Element {
  const params = props.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetail]: any = useState();

  const _getProductDetail = () => {
    setIsLoading(true);
    dispatch(
      getProductDetail({
        ProductId: params?.RecordId,
      }),
    ).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        setIsLoading(false);
        if (!!res?.payload?.productDetail) {
          setProductDetail(parseJSON(res?.payload?.productDetail)?.[0]);
        }
      }
    });
  };
  useEffect(() => {
    _getProductDetail();
  }, []);

  let photoAttachments =
    !!productDetail?.PhotoAttachments &&
    parseJSON(productDetail?.PhotoAttachments);
  const imageUrl =
    photoAttachments?.[0]?.id &&
    `${serviceApiGateway}/UploadAttachment/GetAttachmentByRecordId?recordAttachmentId=${photoAttachments?.[0].id}&download=false`;

  const langId = isArabic() ? 'Arabic' : 'English';

  const title = productDetail?.[`ProductName${langId}`] || '';

  const rows = [
    {
      label: t('Custom_Labels.NotificationNumber'),
      value: productDetail?.NotificationNumber,
    },
    {
      label: t('Custom_Labels.NotifyingAuthority'),
      value:
        productDetail?.[`NotifyingAuthority_${langId}`] ||
        productDetail?.NotifyingAuthority,
    },
    {
      label: t('Custom_Labels.ProductCategory'),
      value:
        productDetail?.[`ProductCategory_${langId}`] ||
        productDetail?.ProductCategory,
    },
    {
      label: t('Custom_Labels.ProductName'),
      value: productDetail?.[`ProductName${langId}`],
    },
    {
      label: t('Custom_Labels.BrandName'),
      value: productDetail?.[`ProductBrand${langId}`],
    },
    {label: t('Custom_Labels.ModelNumber'), value: productDetail?.ModelNumber},
    {
      label: t('Custom_Labels.Country'),
      value: productDetail?.[`Country_${langId}`] || productDetail?.Country,
    },
    {
      label: t('Custom_Labels.Hazard'),
      value:
        productDetail?.[`HazardRisk${langId}`] ||
        productDetail?.HazardRiskEnglish,
    },
  ];

  return (
    <View style={style.container}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          styles={{padding: 8 * BW()}}
          header={<Header title={title} showNotification />}
          withHeader>
          <Loader isLoading={isLoading}>
            <View style={style.card}>
              {imageUrl && (
                <CustomImage
                  url={imageUrl}
                  style={style.image}
                  resizeMode="cover"
                />
              )}
              <View style={{flex: 1, gap: 4 * BW()}}>
                {rows?.map((row, index) => (
                  <View key={index} style={style.row}>
                    <Text h3 style={{color: colors.secondaryColor}}>
                      {row?.label} :
                    </Text>
                    <Text h3>{row?.value || '-'}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Loader>
        </Page>
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
      marginTop: 4 * BW(),
    },
    card: {
      flex: 1,
      gap: 8 * BW(),
    },
    image: {
      width: '100%',
      height: 230 * BW(),
      borderRadius: 8 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    imagePlaceholder: {
      width: '100%',
      height: 120 * BW(),
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8 * BW(),
    },
  });
