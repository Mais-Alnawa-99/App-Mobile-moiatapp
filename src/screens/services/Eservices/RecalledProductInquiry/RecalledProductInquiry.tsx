import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  Animated,
  ImageBackground,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Page from '../../../../component/Page';
import {BW} from '../../../../style/theme';
import Header from '../../../../component/Header';
import Loader from '../../../../component/Loader';
import {
  getProductBrandNameModelNumber,
  getProductList,
  getProductTypes,
} from '../../../../redux/reducers/E-Services/thunk/recalledProductInquiry';
import {isArabic} from '../../../../locales';
import {parseJSON} from '../../utils';
import FlatListComp from '../../../../component/FlatList';
import Pagination from '../../../../component/Pagination';
import CustomImage from '../../../../component/CustomImage';
import Text from '../../../../component/Text';
import NavigationService from '../../../../navigation/NavigationService';
import {serviceApiGateway} from '../../../../redux/network/apiEservices';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';
import Button from '../../../../component/Button';
import Input from '../../../../component/input/Input';

export default function RecalledProductInquiry(props: any): JSX.Element {
  const params = props.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [productTypes, setProductTypes] = useState([]);
  const [productBrands, setProductBrands] = useState([]);
  const [showDateFrom, setShowDateFrom] = useState(false);
  const [showDateTo, setShowDateTo] = useState(false);

  const [search, setSearch] = useState(false);
  const [searchParams, setSearchParams]: any = useState({
    productName: '',
    productType: '',
    brand: '',
    modelNumber: '',
    dateFrom: '',
    dateTo: '',
  });

  const _resetSearch = () => {
    setSearchParams({
      productName: '',
      productType: '',
      brand: '',
      modelNumber: '',
      dateFrom: '',
      dateTo: '',
    });
    _getProductList(1, false);
    setSearch(prev => !prev);
    toggleAccordion();
  };

  const _getProductList = (pageNumber: number, search = false) => {
    dispatch(setLoadingModal(true));
    setPageNumber(pageNumber);
    let params: any = {
      productName: '',
      productType: '',
      brand: '',
      modelNumber: '',
      dateFrom: '',
      dateTo: '',
    };
    if (search) {
      params = searchParams;
    } else {
      params = {
        productName: '',
        productType: '',
        brand: '',
        modelNumber: '',
        dateFrom: '',
        dateTo: '',
      };
    }
    dispatch(
      getProductList({
        PageNumber: pageNumber,
        PageSize: 12,
        ProductName: params?.productName,
        ProductType: params?.productType,
        Brand: params?.brand,
        ModelNumber: params?.modelNumber,
        From: params?.dateFrom ? params?.dateFrom?.toISOString() : '',
        To: params?.dateTo ? params?.dateTo?.toISOString() : '',
      }),
    ).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        setIsLoading(false);
        dispatch(setLoadingModal(false));

        if (!!res?.payload?.productList) {
          if (!search) _getProductTypes();
          setProductList(parseJSON(res?.payload?.productList));
          setTotalCount(res?.payload?.totalRecordCount);
        } else {
          setProductList([]);
        }
      }
    });
  };
  useEffect(() => {
    _getProductList(1);
  }, []);

  const _getProductTypes = () => {
    dispatch(getProductTypes()).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        if (!!res?.payload) {
          let data: any = formatProductTypes(res?.payload);
          setProductTypes(data);
        }
      }
    });
  };

  const formatProductTypes = (rawData: any) => {
    return Object.entries(rawData || {})
      .filter(([key]) => !isNaN(Number(key)))
      .map(([_, item]: any) => ({
        label: item.name,
        value: item.id,
      }));
  };

  const _getProductBrandNameModelNumber = () => {
    dispatch(
      getProductBrandNameModelNumber({
        BrandName: '',
        ProductTypeId: searchParams?.productType,
      }),
    ).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        if (!!res?.payload) {
          let data: any = formatProductTypes(res?.payload);
          setProductBrands(data);
        }
      }
    });
  };

  useEffect(() => {
    if (!!searchParams?.productType) {
      _getProductBrandNameModelNumber();
    }
  }, [searchParams?.productType]);

  const title =
    params?.serviceItem?.serviceName?.find((n: any) =>
      isArabic() ? n.langId === 2 : n.langId === 1,
    )?.value || '';

  const renderItem = ({item}: any, index: any) => {
    const imageUrl =
      item?.PhotoAttachments?.[0]?.id &&
      `${serviceApiGateway}/UploadAttachment/GetAttachmentByRecordId?recordAttachmentId=${item?.PhotoAttachments[0].id}&download=false`;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          NavigationService.navigate('ProductDetails', item);
        }}>
        <Animatable.View
          duration={1000}
          delay={150}
          animation={index % 2 != 0 ? 'fadeInLeft' : 'fadeInRight'}
          key={index}
          style={styles.card}>
          {imageUrl && (
            <CustomImage
              url={imageUrl}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <View style={{flex: 1, gap: 4 * BW()}}>
            <View style={styles.row}>
              <Text h4>{t('Custom_Labels.ProductName')} : </Text>

              <Text h4 medium style={{width: '55%'}} numberOfLines={1}>
                {item?.ProductName}
              </Text>
            </View>
            <View style={styles.row}>
              <Text h4>{t('Custom_Labels.BrandName')} :</Text>

              <Text h4 medium style={{width: '55%'}} numberOfLines={1}>
                {isArabic() ? item?.BrandArabic : item?.BrandEnglish}
                {isArabic() ? item?.BrandArabic : item?.BrandEnglish}
              </Text>
            </View>
            <View style={styles.row}>
              <Text h4>{t('Custom_Labels.ModelNumber')} :</Text>

              <Text h4 medium style={{width: '55%'}} numberOfLines={1}>
                {item?.ModelNumber}
              </Text>
            </View>
            <View style={styles.row}>
              <Text h4>{t('Custom_Labels.ProductType')} :</Text>

              <Text h4 medium style={{width: '55%'}} numberOfLines={1}>
                {item?.ProductType}
              </Text>
            </View>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  const animationConfig = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeIn,
    },
    delete: {
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(animationConfig);
    // setExpanded(!expanded);
  };
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
          header={<Header title={title} showNotification />}
          withHeader>
          {totalCount > 0 && (
            <>
              <View style={styles.searchBtnContainer}>
                <Button
                  icon={require('../../../../assets/header/search.png')}
                  styleIcon={{tintColor: colors.secondaryColor}}
                  containerIcon={{width: 20 * BW(), height: 20 * BW()}}
                  onPress={() => {
                    // _getProductList(1, true);
                    setSearch(prev => !prev);
                    toggleAccordion();
                  }}
                  style={styles.searchBtn}
                />
                <Button
                  Entypo={'ccw'}
                  onPress={() => {
                    _resetSearch();
                  }}
                  EntypoColor={colors.secondaryColor}
                  style={{...styles.searchBtn, marginEnd: 0 * BW()}}
                />
              </View>
              {search && (
                <Animated.View
                  style={{
                    marginBottom: 12 * BW(),
                    marginTop: -8 * BW(),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Input
                      textInput
                      label={t('Custom_Labels.ProductName')}
                      placeholder={t('Search')}
                      value={searchParams.productName}
                      onChangeText={(text: any) =>
                        setSearchParams((prev: any) => ({
                          ...prev,
                          productName: text,
                        }))
                      }
                      styleInput={{minWidth: '49%'}}
                    />

                    <Input
                      dropdown
                      label={t('Custom_Labels.ProductType')}
                      items={productTypes || []}
                      value={searchParams.productType}
                      onChange={(item: any) =>
                        setSearchParams((prev: any) => ({
                          ...prev,
                          productType: item?.value,
                        }))
                      }
                      styleInput={{minWidth: '49%'}}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Input
                      dropdown
                      label={t('Custom_Labels.BrandName')}
                      items={productBrands || []}
                      value={searchParams.brand}
                      onChange={(item: any) =>
                        setSearchParams((prev: any) => ({
                          ...prev,
                          brand: item?.value,
                        }))
                      }
                      styleInput={{minWidth: '49%'}}
                    />
                    <Input
                      textInput
                      label={t('Custom_Labels.ModelNumber')}
                      value={searchParams.modelNumber}
                      onChangeText={(text: any) =>
                        setSearchParams((prev: any) => ({
                          ...prev,
                          modelNumber: text,
                        }))
                      }
                      styleInput={{minWidth: '49%'}}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Input
                      label={t('Labels.StartDateText')}
                      datePicker
                      show={showDateFrom}
                      showDatepicker={() => setShowDateFrom(!showDateFrom)}
                      value={
                        searchParams?.dateFrom
                          ? searchParams?.dateFrom?.toLocaleDateString()
                          : ''
                      }
                      onChangeDateFrom={(e: any, date: any) => {
                        Platform.OS == 'android' && setShowDateFrom(false);
                        date &&
                          setSearchParams((prev: any) => ({
                            ...prev,
                            dateFrom: date,
                          }));
                      }}
                      dateValue={searchParams.dateFrom}
                      styleInput={{minWidth: '49%'}}
                    />
                    <Input
                      label={t('Labels.EndDateText')}
                      datePicker
                      show={showDateTo}
                      showDatepicker={() => setShowDateTo(!showDateTo)}
                      value={
                        searchParams.dateTo
                          ? searchParams.dateTo?.toLocaleDateString()
                          : ''
                      }
                      onChangeDateFrom={(e: any, date: any) => {
                        Platform.OS == 'android' && setShowDateTo(false);
                        date &&
                          setSearchParams((prev: any) => ({
                            ...prev,
                            dateTo: date,
                          }));
                      }}
                      dateValue={searchParams.dateTo}
                      styleInput={{minWidth: '49%'}}
                    />
                  </View>
                  <Button
                    title={t('Search')}
                    onPress={() => {
                      _getProductList(1, true);
                      // setSearch(prev => !prev);
                      // toggleAccordion();
                    }}
                    style={styles.searchBtnTitle}
                    styleText={{color: colors.mainWhite}}
                  />
                </Animated.View>
              )}
            </>
          )}
          <Loader isLoading={isLoading}>
            <>
              <FlatListComp
                data={productList || []}
                scrollview
                renderItem={({item, index}: any) => renderItem({item}, index)}
                noData={!isLoading}
              />
            </>
          </Loader>
          {totalCount > 1 && (
            <Pagination
              currentPage={pageNumber}
              totalCount={totalCount}
              pageSize={12}
              onPageChange={page => {
                _getProductList(page);
              }}
            />
          )}
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
    },
    card: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 8 * BW(),
      marginBottom: 8 * BW(),
      borderRadius: 8 * BW(),
      flexDirection: 'row',
      gap: 8 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    image: {
      width: '40%',
      height: 120 * BW(),
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
    searchBtn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.border,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
    },
    searchBtnTitle: {
      width: 80 * BW(),
      height: 'auto',
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
      marginTop: 8 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    searchBtnContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginBottom: 8 * BW(),
    },
  });
