import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {t} from 'i18next';
import Input from '../../../../../component/input/Input';
import Button from '../../../../../component/Button';
import {BH, BW} from '../../../../../style/theme';
import {useTheme} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HsCodes from '../HsCode';
import {isArabic} from '../../../../../locales';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {
  GetLookupData,
  getFactoryProducts,
} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import Text from '../../../../../component/Text';
import {View} from 'react-native';
import {GetHsCodeFactoriesAndDetails} from '../../../../../redux/reducers/I-Services/thunk/HSCodes';

const MaterialForm = (props: any) => {
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();
  const dispatch = useAppDispatch();
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const [options, setOptions] = useState([]);
  const [countries, setCountries] = useState([]);

  const [selectedValues, setSelectedValues] = useState([]);
  const [rowMaterials, setRowMaterials] = useState(values.RawMaterials);
  const [totalValue, setTotalValue] = useState('');
  const {userILData} = useAppSelector(store => store.userILData);
  const [factoryProducts, setFactoryProducts] = useState<
    {label: string; value: number}[]
  >([]);
  const [status, setStatus] = useState([]);
  const validationSchema = Yup.object().shape({
    Category: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),
    hsCodeId: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),

    TotalWeight: Yup.number()
      .typeError(t('NumericOnly'))
      .required(t('Required')),

    Status: Yup.object().when('Category', {
      is: (cat: any) => cat?.value === 1747,
      then: schema =>
        schema
          .test(
            'has-keys',
            t('Required'),
            value => value && Object.keys(value).length > 0,
          )
          .required(t('Required')),
      otherwise: schema => schema.notRequired(),
    }),

    Numberofmachinesofthesametype: Yup.number()
      .transform((value, originalValue) => {
        return originalValue === '' ? undefined : value;
      })
      .when('Category', {
        is: (cat: any) => cat?.value === 1747,
        then: schema =>
          schema
            .typeError(t('NumericOnly'))
            .positive(t('NumericOnly'))
            .required(t('Required')),
        otherwise: schema => schema.notRequired(),
      }),

    MaterialUsage: Yup.string()
      .max(500, t('IL.Characters500Limit'))
      .required(t('IL.MaterialUsagerequired')),

    productsMaidByRawMaterial: Yup.array().min(
      1,
      t('IL.Pleaseentertheproducts'),
    ),
  });

  const _getFactoryProducts = async () => {
    dispatch(getFactoryProducts({licenseId: userILData?.Id})).then(res => {
      if (
        res.meta.requestStatus === 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        const list = res.payload?.result.FactoryProducts;
        const options = list.map((item: any) => ({
          label: isArabic()
            ? (item.HsCodeNameAr || '').trim()
            : (item.HsCodeNameEn || '').trim(),
          value: Number(item.HSCodeId),
        }));
        setFactoryProducts(options);
      } else {
      }
    });
  };
  const _getStatus = (pageNumber: number = 1, search = false) => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'RawMaterialStatus'})).then(
      res => {
        if (res.payload?.networkSuccess) {
          const result = res.payload.result.RawMaterialStatus.map(
            (item: any, index: number): any => ({
              label: item.Name,
              value: item.Id,
            }),
          );
          setStatus(result);
        } else {
          setStatus([]);
        }
      },
    );
  };

  useEffect(() => {
    _getFactoryProducts();
    _getStatus();
  }, []);

  return (
    <Formik
      initialValues={props.initials}
      validationSchema={validationSchema}
      onSubmit={values => {
        let newMaterial = [];

        if (values.index == null) {
          newMaterial = [...rowMaterials, values];
        } else {
          newMaterial = [...rowMaterials];
          newMaterial[values.index] = values;
        }
        setRowMaterials(newMaterial);
        setFieldValue('RawMaterials', newMaterial);

        props.closeForm();
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => {
        useEffect(() => {
          if (values?.hsCodeId?.Id) {
            dispatch(
              GetHsCodeFactoriesAndDetails({
                licenseId: userILData?.Id,
                HscodeId: values.hsCodeId.Id,
              }),
            ).then(res => {
              if (res.payload?.networkSuccess) {
                const result = res.payload;

                if (result?.AntiDumping?.isRestricted) {
                  setFieldValue('hsCodeId', {});
                  setFieldTouched('hsCodeId', true);
                }
              }
            });
          }
        }, [values.hsCodeId]);
        const hsCodeKey = values?.hsCodeId?.Id
          ? `hs-${values.hsCodeId.Id}`
          : 'hs-empty';

        return (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Input
                dropdown
                requiredStar={true}
                search={props.categories.length > 5 ? true : false}
                label={t('IL.Category')}
                items={props.categories}
                placeholder={t('Select')}
                value={values.Category || {}}
                onChange={value => {
                  setFieldValue('Category', value);
                  setFieldValue('Numberofmachinesofthesametype', '');
                  setFieldValue('Status', {});
                }}
                error={
                  touched.Category && errors.Category ? errors.Category : ''
                }
              />
              <HsCodes
                key={hsCodeKey}
                fieldName={'hsCodeId'}
                title={t('IL.HsCodeLabel')}
                required={true}
                editValue={values.hsCodeId}
                error={touched.hsCodeId && errors.hsCodeId}
              />

              <Text
                h5
                style={{
                  color: colors.lightPrimaryTextColor,
                }}>
                {t('IL.Help_RawMaterialsHsCode')}
              </Text>
              {values.Category?.value == '1747' && (
                <>
                  <Input
                    dropdown
                    label={t('Status')}
                    requiredStar
                    value={values.Status}
                    onChange={val => {
                      setFieldValue('Status', val);
                      // setFieldTouched('Status', true);
                    }}
                    items={status}
                    error={touched.Status && errors.Status}
                  />
                  <Input
                    textInput
                    requiredStar
                    label={t('Numberofmachinesofthesametype')}
                    value={values.Numberofmachinesofthesametype}
                    onChangeText={handleChange('Numberofmachinesofthesametype')}
                    error={
                      touched.Numberofmachinesofthesametype &&
                      errors.Numberofmachinesofthesametype
                    }
                  />
                </>
              )}
              <Input
                textInput
                requiredStar
                label={t('IL.TotalWeightMaterial')}
                placeholder="0"
                keyboardType="numeric"
                value={String(values?.TotalWeight) || ''}
                onChangeText={val => {
                  setFieldValue('TotalWeight', val);
                }}
                onBlur={handleBlur('TotalWeight')}
                error={
                  touched.TotalWeight && errors.TotalWeight
                    ? errors.TotalWeight
                    : ''
                }
              />

              {/* وصف الاستخدام */}
              <Input
                textInput
                requiredStar={true}
                label={t('IL.MaterialUsage')}
                value={values.MaterialUsage}
                onChangeText={(text: any) =>
                  setFieldValue('MaterialUsage', text)
                }
                onBlur={handleBlur('MaterialUsage')}
                multiline
                numberOfLines={4}
                error={
                  touched.MaterialUsage && errors.MaterialUsage
                    ? errors.MaterialUsage
                    : ''
                }
              />

              <Input
                multiSelect
                requiredStar={true}
                search={factoryProducts?.length > 5 ? true : false}
                label={t('ProductMaidByThis')}
                items={factoryProducts}
                placeholder={t('Select')}
                value={values.productsMaidByRawMaterial}
                onChangeValue={(productsMaidByRawMaterial: any) => {
                  setFieldValue(
                    'productsMaidByRawMaterial',
                    productsMaidByRawMaterial,
                  );
                }}
                error={
                  touched.productsMaidByRawMaterial &&
                  errors.productsMaidByRawMaterial
                    ? errors.productsMaidByRawMaterial
                    : ''
                }
              />
            </View>
            {Object.entries(errors).length > 0 && (
              <Text h4 style={{color: colors.red, marginTop: 8 * BW()}}>
                {t('IL.ERRORVALID')}
              </Text>
            )}
            <Button
              title={t('Save')}
              onPress={handleSubmit}
              style={{
                backgroundColor: colors.secondaryColor,
                justifyContent: 'center',
                height: 40 * BW(),
                marginVertical: 8 * BW(),
                padding: 0,
              }}
              h2
              styleText={{color: 'white'}}
            />
          </View>
        );
      }}
    </Formik>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    btn: {
      height: 80 * BH(),
      borderRadius: 8 * BW(),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
      padding: 10 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    containerIcon: {
      width: 30 * BW(),
      height: 30 * BH(),
      alignItems: 'center',
      justifyContent: 'center',
      resizeMode: 'center',
    },
    imgCover: {
      width: '100%',
      height: '100%',
      tintColor: 'rgba(0,0,0,0.3)',
      resizeMode: 'contain',
    },
    logoContainer: {
      width: '100%',
      height: '80%',
      position: 'absolute',
      alignSelf: 'flex-start',
      justifyContent: 'flex-end',
      bottom: 5 * BW(),
      left: 5 * BW(),
    },
    buttonSubmit: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.secondaryColor,
      backgroundColor: colors.secondaryColor,
      borderWidth: 1 * BW(),
      minWidth: '49%',
      padding: 8 * BW(),
      marginTop: 6 * BW(),
      minHeight: 40 * BW(),
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

export default MaterialForm;
