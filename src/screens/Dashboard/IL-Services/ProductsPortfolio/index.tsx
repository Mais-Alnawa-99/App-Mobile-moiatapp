import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {BW} from '../../../../style/theme';
import PageBg from '../../../../component/PageBg';
import ProductsCard from './ProductsCard';
import Loader from '../../../../component/Loader';
import FlatListComp from '../../../../component/FlatList';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {getFactoryProducts} from '../../../../redux/reducers/I-Services/thunk/ILFormService';

export default function ProductsPortfolio(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {userILData}: any = useAppSelector(store => store.userILData);
  const [products, setProducts]: any = useState([]);

  const _getFactoryProducts = () => {
    setIsLoading(true);
    dispatch(
      getFactoryProducts({
        licenseId: userILData?.Id,
      }),
    ).then(res => {
      setIsLoading(false);
      if (res.payload?.networkSuccess) {
        setProducts(res.payload?.result?.FactoryProducts);
      } else {
        setProducts([]);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      _getFactoryProducts();
    }, []),
  );
  const renderItem = ({item}: any, index: any) => {
    return <ProductsCard key={index} index={index} item={item} />;
  };

  return (
    <PageBg>
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
                title={t('IL.ProductsPortfolio')}
                hideDrawer
                titleContainerStyle={{flex: 8}}
              />
            }
            withHeader>
            <Loader isLoading={isLoading}>
              <>
                <FlatListComp
                  data={products || []}
                  scrollview
                  renderItem={({item, index}: any) => renderItem({item}, index)}
                  noData={!isLoading}
                />
              </>
            </Loader>
          </Page>
        </ImageBackground>
      </View>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
  });
