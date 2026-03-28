import React, {useEffect, useState} from 'react';
import {View, TextInput, ScrollView, StyleSheet} from 'react-native';
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
import {GetLookupData} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import Text from '../../../../../component/Text';

// Sample dropdown options

const hsCodes = [
  {label: '--اختر--', value: ''},
  {label: 'رمز 1', value: '1001'},
  {label: 'رمز 2', value: '1002'},
];

const GCCLocalCountries = ['AE', 'BH', 'KW', 'OM', 'QA', 'SA'];

const validationSchema = Yup.object().shape({
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
  productsMaidByRawMaterial: Yup.array().min(1, t('IL.Pleaseentertheproducts')),
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
  const countries = useAppSelector(state => state.Country.list);

  const [selectedValues, setSelectedValues] = useState([]);
  const [rowMaterials, setRowMaterials] = useState(values.RawMaterials);
  const [totalValue, setTotalValue] = useState('');
  const checkIsDisable = ({errors}) => {
    if (Object.keys(errors).length > 0) return true;
    else return false;
  };

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
  useEffect(() => {
    if (props.onChangeTotalValue) {
      props.onChangeTotalValue(totalValue);
    }
  }, [totalValue]);

  const calculateTotalValue = (data: any[]) => {
    return data
      .reduce((total, emp) => {
        const empCount = parseInt(emp.Value || 0, 10);
        return total + empCount;
      }, 0)
      .toString();
  };
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
        // const total = calculateTotalEmployees(newEmployees);
        setRowMaterials(newMaterial);
        setFieldValue('RawMaterials', newMaterial);

        // setTotalEmployees(total);

        const total = calculateTotalValue(newMaterial);
        setTotalValue(total);
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
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
            onBlur={handleBlur('Quantity')}
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
            onBlur={handleBlur('Value')}
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

              // Automatically set LocalGulfOriginForeign if needed
              if (GCCLocalCountries.includes(val?.code)) {
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
            search={props.categories.length > 5 ? true : false}
            label={t('IL.Category')}
            items={props.categories}
            placeholder={t('Select')}
            value={values.Category || {}}
            onChange={value => {
              setFieldValue('Category', value);
            }}
            error={touched.Category && errors.Category}
          />

          <Input
            textInput
            requiredStar={true}
            label={t('IL.MaterialUsage')}
            value={values.MaterialUsage}
            onChangeText={(text: any) => setFieldValue('MaterialUsage', text)}
            onBlur={handleBlur('MaterialUsage')}
            multiline
            numberOfLines={4}
            style={{
              borderRadius: 8 * BW(),
              marginBottom: 8 * BW(),
              backgroundColor: colors.white,
            }}
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

          {/* <Button title="إضافة" onPress={handleSubmit} 
          style={
                 checkIsDisable({errors})
                    ? {...styles.buttonSubmitDisable}
                    : {
                        ...styles.buttonSubmit,
                      }
                }
               styleText={{
                  color: checkIsDisable({errors})
                    ? colors.secondaryColor
                    : colors.mainWhite,
                }}/> */}
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
            h4
            medium
            styleText={{color: 'white'}}
          />
        </ScrollView>
      )}
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
