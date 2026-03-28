import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import Input from '../../../../../component/input/Input';
import Button from '../../../../../component/Button';
import {BH, BW} from '../../../../../style/theme';
import {useTheme} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import HsCodes from '../HsCode';
import {useAppSelector} from '../../../../../redux/store';
import Text from '../../../../../component/Text';

const GCCLocalCountries = ['AE', 'BH', 'KW', 'OM', 'QA', 'SA'];

const getRawMaterialsSchema = (t: any) =>
  Yup.object().shape({
    Category: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),
    HSCodeHSCodesListxlsx: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),

    MaterialUsage: Yup.string()
      .max(500, t('IL.Characters500Limit'))
      .required(t('IL.MaterialUsagerequired')),
    productsMaidByRawMaterial: Yup.array().min(
      1,
      t('IL.Pleaseentertheproducts'),
    ),
    Quantity: Yup.number()
      .typeError(t('NumericOnly'))
      .required(t('IL.QuantityRequired')),

    Value: Yup.number()
      .typeError(t('NumericOnly'))
      .required(t('IL.ValueRequired')),

    CountryOfOriginId: Yup.object()
      .test(
        'has-keys',
        t('IL.CountryRequired'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('IL.CountryRequired')),
  });

const MaterialForm = (props: any) => {
  const {
    values,

    setFieldValue,
  } = useFormikContext();

  const {colors}: any = useTheme();
  const {t} = useTranslation();
  const validationSchema = useMemo(() => getRawMaterialsSchema(t), [t]);
  const [options, setOptions] = useState([]);
  const countries = useAppSelector(state => state.Country.list);
  const categories = useAppSelector(state => state.Category.list);
  const [rowMaterials, setRowMaterials] = useState(values.RawMaterials);

  useEffect(() => {
    let newProductOptions = values.Products?.map(p => {
      return {
        value: p.HSCodeHSCodesListxlsx.Id,
        label:
          p.HSCodeHSCodesListxlsx.Code + ' | ' + p.HSCodeHSCodesListxlsx.Title,
      };
    });
    setOptions(newProductOptions);
  }, [values.Products]);

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
      }) => (
        <View>
          {/* الرمز المنسق */}

          <HsCodes
            fieldName={'HSCodeHSCodesListxlsx'}
            title={t('IL.HsCodeLabel')}
            required={true}
            editValue={values.HSCodeHSCodesListxlsx}
            error={
              touched.HSCodeHSCodesListxlsx && errors.HSCodeHSCodesListxlsx
            }
          />

          <Text
            h5
            style={{
              color: colors.lightPrimaryTextColor,
            }}>
            {t('IL.Help_RawMaterialsHsCode')}
          </Text>

          {/* الكمية */}

          <Input
            textInput
            requiredStar
            keyboardType="numeric"
            label={t('IL.Quantity')}
            placeholder="0"
            value={values.Quantity}
            onChangeText={handleChange('Quantity')}
            error={touched.Quantity && errors.Quantity}
          />

          <Input
            textInput
            requiredStar
            keyboardType="numeric"
            label={t('IL.Value')}
            placeholder="00.00"
            value={values.Value}
            onChangeText={handleChange('Value')}
            error={touched.Value && errors.Value}
          />

          <Input
            dropdown
            requiredStar
            label={t('IL.CountryOfOrigin')}
            placeholder={t('Select')}
            items={countries} // [{label: 'UAE', value: 1}]
            value={values.CountryOfOriginId}
            onChange={val => {
              setFieldValue('CountryOfOriginId', val);
              if (GCCLocalCountries.includes(val?.Value)) {
                setFieldValue(
                  'LocalGulfOriginForeign',
                  t('IL.LocalOriginText'),
                );
                setFieldValue('LocalGulfOriginForeignValue', 'L');
              } else {
                setFieldValue(
                  'LocalGulfOriginForeign',
                  t('IL.ForeignOriginText'),
                );
                setFieldValue('LocalGulfOriginForeignValue', 'F');
              }
            }}
            error={touched.CountryOfOriginId && errors.CountryOfOriginId}
          />

          <Input
            textInput
            label={t('IL.OriginType')}
            value={values.LocalGulfOriginForeign}
            editable={false}
          />
          {/* Hidden field - Formik only */}
          <Input
            textInput
            value={values.LocalGulfOriginForeignValue}
            onChangeText={handleChange('LocalGulfOriginForeignValue')}
            style={{display: 'none'}}
          />

          {/* التصنيف */}
          <Input
            dropdown
            requiredStar={true}
            search={categories.length > 5 ? true : false}
            label={t('IL.Category')}
            items={categories}
            placeholder={t('Select')}
            value={values.Category || {}}
            onChange={value => {
              setFieldValue('Category', value);
            }}
            error={touched.Category && errors.Category}
          />

          {/* وصف الاستخدام */}
          <Input
            textInput
            requiredStar={true}
            label={t('IL.MaterialUsage')}
            value={values.MaterialUsage}
            onChangeText={(text: any) => setFieldValue('MaterialUsage', text)}
            multiline
            numberOfLines={4}
            error={touched.MaterialUsage && errors.MaterialUsage}
          />
          <Text
            h5
            style={{
              color: colors.lightPrimaryTextColor,
            }}>
            {t('IL.Help_MaterialUsage')}
          </Text>
          <Input
            multiSelect
            requiredStar={true}
            search={options?.length > 5 ? true : false}
            label={t('ProductMaidByThis')}
            items={options}
            placeholder={t('Select')}
            value={values.productsMaidByRawMaterial}
            onChangeValue={selectedItems => {
              setFieldValue('productsMaidByRawMaterial', selectedItems);
            }}
            error={
              touched.productsMaidByRawMaterial &&
              errors.productsMaidByRawMaterial
            }
          />
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
              height: 40 * BW(),
              marginVertical: 8 * BW(),
              padding: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            medium
            styleText={{color: colors.mainWhite}}
          />
        </View>
      )}
    </Formik>
  );
};

export default MaterialForm;
