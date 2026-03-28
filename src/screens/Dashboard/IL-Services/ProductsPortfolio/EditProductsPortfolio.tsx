import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import Input from '../../../../component/input/Input';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import {BW, BH} from '../../../../style/theme';
import * as Yup from 'yup';
import {useAppDispatch} from '../../../../redux/store';
import userILData from '../../../../redux/reducers/User/userILData';
import {
  getProductsPortfolio,
  saveProductsPortfolio,
} from '../../../../redux/reducers/I-Services/thunk/ILFormService';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';
import {_openModal} from '../../../services/Eservices/ServiceForm';
import NavigationService from '../../../../navigation/NavigationService';

type FormValues = {
  ProductNameAr: string;
  ProductNameEn: string;
  MinimumOrderQuantity: string;
  Dimension: string;
  Specs: string;
  UnitWeight: string;
  Unit: any;
  DescriptionEn: string;
  DescriptionAr: string;
};

const EditProductPortfolio = (props: any) => {
  const params = props.route.params;
  const product = params.product;
  // const productId = '366691';
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // const [initials, setInitials]: any = useState({});

  const initials = useMemo<FormValues>(
    () => ({
      ProductNameAr: product.ProductNameAr,
      ProductNameEn: product.ProductNameEn,
      MinimumOrderQuantity: product.MinOrder?.toString(),
      Dimension: product.Dimension,
      Specs: product.Specs,
      UnitWeight: product.UnitWeight?.toString(),
      Unit: product.Unit,
      DescriptionEn: product.DescriptionEn,
      DescriptionAr: product.DescriptionAr,
    }),
    [],
  );

  const validationSchema = Yup.object().shape({
    // ProductNameAr: Yup.string().trim().required(t('Required')),
    // ProductNameEn: Yup.string().trim().required(t('Required')),
    ProductNameEn: Yup.string()
      .matches(/^[a-zA-Z0-9 .,&'\-]+$/, t('OnlyEnglishAllowed'))
      .max(512)
      .required(t('Required')),

    ProductNameAr: Yup.string()
      .matches(/^[\u0600-\u06FF0-9 .،&'\-]+$/, t('OnlyArabicAllowed'))
      .max(512)
      .required(t('Required')),

    MinimumOrderQuantity: Yup.string().trim().required(t('Required')),
    Dimension: Yup.string().trim().required(t('Required')),
    Specs: Yup.string().trim().required(t('Required')),
    UnitWeight: Yup.string().trim().required(t('Required')),
    DescriptionEn: Yup.string().trim().required(t('Required')),
    DescriptionAr: Yup.string().trim().required(t('Required')),
  });
  // const _getProductsPortfolio = () => {
  //   dispatch(setLoadingModal(true));
  //   dispatch(
  //     getProductsPortfolio({
  //       ProductId: productId,
  //     }),
  //   ).then(res => {
  //     dispatch(setLoadingModal(false));
  //     if (res.payload?.networkSuccess) {
  //       setInitials(res.payload?.Data);
  //     } else {
  //       setInitials({});
  //     }
  //   });
  // };
  const _saveProductsPortfolio = (values: any) => {
    dispatch(setLoadingModal(true));
    let payload = {
      ProductNameEn: values.ProductNameEn,
      ProductNameAr: values.ProductNameAr,
      DescriptionEn: values.DescriptionEn,
      DescriptionAr: values.DescriptionAr,
      Dimension: values.Dimension,
      Specs: values.Specs,
      UnitWeight: values.UnitWeight,
      Unit: values.Unit,
      MinimumOrderQuantity: values.MinimumOrderQuantity,
      Id: values.Id,
      HSCode: values.HSCode,
      TotalValue: values.TotalValue,
      TotalQuantity: values.TotalQuantity,
      FactoryName: values.FactoryName,
      HSCodeDescription: values.HSCodeDescription,
      UnitObject: values.UnitObject,
      AttachmentsListDto: values.AttachmentsListDto,
      Attachments: values.Attachments,
      AttachmentsList: values.AttachmentsList,
      Images: values.Images,
    };
    dispatch(saveProductsPortfolio({payload})).then(res => {
      dispatch(setLoadingModal(false));
      if (res?.payload?.Data?.success) {
        _openModal(
          dispatch,
          false,
          `${t('IL.ProductUpdated')} `,
          '15%',
          false,
          () => NavigationService.goBack(),
        );
      } else {
        _openModal(
          dispatch,
          t('IL.ErrorGeneralPageTitle'),
          `${t('IL.ErrorGeneral')} `,
          '15%',
          false,
        );
      }
    });
  };

  // useEffect(() => {
  //   conso.log('product', product);
  // }, []);

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
              title={t('IL.EditProductPortfolio')}
              hideDrawer
              titleContainerStyle={{flex: 8}}
            />
          }
          withHeader>
          <Formik<FormValues>
            initialValues={initials}
            enableReinitialize
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={values => {
              _saveProductsPortfolio(values);
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              setFieldTouched,
            }) => (
              <View>
                <Input
                  textInput
                  label={t('IL.ProductNameAr')}
                  requiredStar
                  value={values?.ProductNameAr}
                  onChangeText={value => {
                    setFieldValue('ProductNameAr', value);
                    setFieldTouched('ProductNameAr', true);
                  }}
                  error={touched.ProductNameAr && errors.ProductNameAr}
                  required={touched.ProductNameAr && errors.ProductNameAr}
                />
                <Input
                  textInput
                  label={t('IL.ProductNameEn')}
                  requiredStar
                  value={values?.ProductNameEn}
                  onChangeText={value => {
                    setFieldValue('ProductNameEn', value);
                    setFieldTouched('ProductNameEn', true);
                  }}
                  error={touched.ProductNameEn && errors.ProductNameEn}
                  required={touched.ProductNameEn && errors.ProductNameEn}
                />
                <Input
                  textInput
                  label={t('IL.MinOrder')}
                  requiredStar
                  value={values?.MinimumOrderQuantity?.toString()}
                  onChangeText={handleChange('MinimumOrderQuantity')}
                  error={
                    touched.MinimumOrderQuantity && errors.MinimumOrderQuantity
                  }
                  required={
                    touched.MinimumOrderQuantity && errors.MinimumOrderQuantity
                  }
                />
                <Input
                  textInput
                  label={t('IL.Dimension')}
                  requiredStar
                  value={values?.Dimension}
                  onChangeText={handleChange('Dimension')}
                  error={touched.Dimension && errors.Dimension}
                  required={touched.Dimension && errors.Dimension}
                />

                <Input
                  textInput
                  label={t('IL.Specs')}
                  requiredStar
                  value={values?.Specs}
                  onChangeText={handleChange('Specs')}
                  error={touched.Specs && errors.Specs}
                  required={touched.Specs && errors.Specs}
                />

                <Input
                  textInput
                  label={t('IL.UnitWeight')}
                  requiredStar
                  value={values?.UnitWeight?.toString()}
                  onChangeText={handleChange('UnitWeight')}
                  error={touched.UnitWeight && errors.UnitWeight}
                  required={touched.UnitWeight && errors.UnitWeight}
                />

                {/* <Input
                dropdown
                label={t('IL.Unit')}
                value={values?.Unit}
                // onChange={() => {}}
              /> */}

                <Input
                  label={t('IL.ProductDescriptionEn')}
                  value={values?.DescriptionEn}
                  onChangeText={handleChange('DescriptionEn')}
                  textInput
                  requiredStar
                  multiline
                  numberOfLines={4}
                  styleInput={{minHeight: 60 * BW()}}
                  error={touched.DescriptionEn && errors.DescriptionEn}
                  required={touched.DescriptionEn && errors.DescriptionEn}
                />

                <Input
                  label={t('IL.ProductDescriptionAr')}
                  value={values?.DescriptionAr}
                  onChangeText={handleChange('DescriptionAr')}
                  textInput
                  requiredStar
                  multiline
                  numberOfLines={4}
                  styleInput={{minHeight: 60 * BW()}}
                  error={touched.DescriptionAr && errors.DescriptionAr}
                  required={touched.DescriptionAr && errors.DescriptionAr}
                />

                <Button
                  title={t('IL.Edit')}
                  style={styles.buttonSubmit}
                  styleText={{color: colors.mainWhite}}
                  onPress={handleSubmit as any}
                />
              </View>
            )}
          </Formik>
        </Page>
      </ImageBackground>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },

    buttonSubmit: {
      width: 'auto',
      height: 'auto',
      backgroundColor: colors.secondaryColor,
      minHeight: 45 * BW(),
      marginTop: 8 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSubmitDisable: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.secondaryColor + '22',
      backgroundColor: colors.secondaryColor + '22',
      borderWidth: 1 * BW(),
      minWidth: '49%',
      padding: 8 * BW(),
      marginTop: 6 * BW(),
      opacity: 0.6,
    },
  });

export default EditProductPortfolio;
