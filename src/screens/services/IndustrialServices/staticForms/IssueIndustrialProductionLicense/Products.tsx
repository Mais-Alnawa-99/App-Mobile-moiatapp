import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import {useTheme} from '@react-navigation/native';
import {BH, BW} from '../../../../../style/theme';
import Text from '../../../../../component/Text';
import Button from '../../../../../component/Button';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import reactotron from 'reactotron-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import Accordion from '../../../../../component/Accordion';
import Input from '../../../../../component/input/Input';
import {ReadOnlyRow} from '../ReusableComponents';
import HsCodes from '../HsCode';
import {useDisabled} from './DisabledContext';

const getProductSchema = (t: any) =>
  Yup.object().shape({
    HSCodeHSCodesListxlsx: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),
    AnnualProductionValueinAED: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('Required')),
    Designedproductioncapacityinkgyear: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('Required')),
    ActualProductionCapacityinkgyear: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('Required')),
  });
const Products = () => {
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();
  const {isDisabled} = useDisabled();
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState(values.Products);
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);
  const resetValues = {
    HSCodeHSCodesListxlsx: {},
    AnnualProductionValueinAED: 0,
    Designedproductioncapacityinkgyear: 0,
    ActualProductionCapacityinkgyear: 0,

    index: null,
  };
  const [initialValues, setInitialValues] = useState(resetValues);
  const validationSchema = useMemo(() => getProductSchema(t), [t]);

  const closeForm = () => {
    setModalVisible(false);
  };

  const _delete = index => {
    const newList = [...values.Products];
    newList.splice(index, 1);
    setProducts(newList);
    setFieldValue('Products', newList);
  };
  return (
    <View>
      <StepIndicator
        stepNumber={7}
        stepName={t('Products')}
        style={{marginBottom: 8 * BW()}}
        requiredStar={true}
      />
      <View
        style={{
          minHeight: 100 * BW(),
          alignContent: 'center',
          justifyContent: 'center',
          gap: 8 * BW(),
        }}>
        {values.Products?.length === 0 ? (
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 8 * BW(),
              gap: 8 * BW(),
              borderColor: colors.secondaryColor + '33',
              borderRadius: 8 * BW(),
              borderWidth: 1,
            }}>
            <Image
              source={require('../../../../../assets/Noitems.png')}
              style={{width: 80 * BW(), height: 80 * BW()}}
              resizeMode="contain"
            />
            <Text
              h3
              style={{
                justifyContent: 'center',
                alignSelf: 'center',

                color: colors.darkGray,
              }}>
              {t('NoItems')}
            </Text>
            {!isDisabled('FirstName') && (
              <View style={{flexDirection: 'row'}}>
                <Button
                  title={t('addNew')}
                  onPress={() => {
                    setModalVisible(true);
                    setInitialValues(resetValues);
                  }}
                  style={styles.btn}
                  styleText={styles.btnTitle}
                />
              </View>
            )}
          </View>
        ) : (
          <>
            {!isDisabled('FirstName') && (
              <View style={{flexDirection: 'row'}}>
                <Button
                  title={t('addNew')}
                  onPress={() => {
                    setModalVisible(true);
                    setInitialValues(resetValues);
                    setProducts(values.Products);
                  }}
                  style={styles.btn}
                  styleText={styles.btnTitle}
                />
              </View>
            )}
            {values.Products?.map((product, index) => {
              const isActive =
                activeIndex == null ? index == 0 : index === activeIndex;
              return (
                <Accordion
                  title={t('Product') + ' (' + Number(index + 1) + ')'}
                  expandedDefault={isActive}
                  bold
                  onPress={() => setActiveIndex(isActive ? '' : index)}
                  styleHeader={{backgroundColor: colors.white}}
                  styleBody={{
                    paddingBottom: 8 * BW(),
                    backgroundColor: colors.white,
                  }}
                  styleIcon={{
                    tintColor: colors.secondaryColor,
                  }}
                  styleTilte={{
                    color: isActive
                      ? colors.secondaryColor
                      : colors.textPrimaryColor,
                  }}
                  showBorder>
                  <View>
                    <ReadOnlyRow
                      label={t('IL.HsCodeLabel')}
                      value={
                        product.HSCodeHSCodesListxlsx.Code +
                        ' | ' +
                        product.HSCodeHSCodesListxlsx.Title
                      }
                    />
                    <ReadOnlyRow
                      label={t('IL.AnnualProductionValueLabel')}
                      value={product.AnnualProductionValueinAED}
                    />
                    <ReadOnlyRow
                      label={t('IL.DesignedProductionCapacityLabel')}
                      value={product.Designedproductioncapacityinkgyear}
                    />
                    <ReadOnlyRow
                      label={t('IL.ActualProductionCapacityLabel')}
                      value={product.ActualProductionCapacityinkgyear}
                    />
                    {!isDisabled('FirstName') && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          gap: 8 * BW(),
                          marginTop: 8 * BW(),
                        }}>
                        <Button
                          title={t('Edit')}
                          onPress={() => {
                            const updateOwner = {...product, index};
                            setInitialValues(updateOwner);
                            setModalVisible(true);
                          }}
                          style={{
                            backgroundColor: colors.green,
                            height: 30 * BW(),
                            padding: 0,
                            justifyContent: 'center',
                            width: 50 * BW(),
                          }}
                          h4
                          styleText={{color: colors.mainWhite}}
                        />
                        <Button
                          title={t('Delete')}
                          onPress={() => _delete(index)}
                          style={{
                            backgroundColor: colors.red,
                            height: 30 * BW(),
                            padding: 0,
                            justifyContent: 'center',
                            width: 50 * BW(),
                          }}
                          h4
                          styleText={{color: colors.mainWhite}}
                        />
                      </View>
                    )}
                  </View>
                </Accordion>
              );
            })}
          </>
        )}
      </View>
      {touched.Products && errors.Products && (
        <Text style={{color: colors.red}} h5>
          {errors.Products}
        </Text>
      )}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text h3 bold>
                {t('IL.AddNewProduct')}
              </Text>
              <TouchableOpacity
                onPress={closeForm}
                style={{height: 25 * BW(), zIndex: 10}}>
                <MaterialIcons
                  name={'close'}
                  size={20 * BW()}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange
                onSubmit={values => {
                  let newProducts = [];

                  if (values.index == null) {
                    newProducts = [...products, values];
                  } else {
                    newProducts = [...products];
                    newProducts[values.index] = values;
                  }
                  // const total = calculateTotalEmployees(newEmployees);
                  setProducts(newProducts);
                  setFieldValue('Products', newProducts);
                  setModalVisible(false);
                  // setTotalEmployees(total);
                }}>
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
                }) => {
                  return (
                    <>
                      <View>
                        <HsCodes
                          fieldName={'HSCodeHSCodesListxlsx'}
                          title={t('IL.HsCodeLabel')}
                          required={true}
                          editValue={values.HSCodeHSCodesListxlsx}
                          error={
                            touched.HSCodeHSCodesListxlsx &&
                            errors.HSCodeHSCodesListxlsx
                          }
                        />

                        <Input
                          textInput
                          requiredStar
                          keyboardType="numeric"
                          label={t('IL.AnnualProductionValueLabel')}
                          value={values.AnnualProductionValueinAED}
                          onChangeText={handleChange(
                            'AnnualProductionValueinAED',
                          )}
                          error={
                            touched.AnnualProductionValueinAED &&
                            errors.AnnualProductionValueinAED
                          }
                        />
                        <Input
                          textInput
                          requiredStar
                          keyboardType="numeric"
                          label={t('IL.DesignedProductionCapacityLabel')}
                          value={values.Designedproductioncapacityinkgyear}
                          onChangeText={handleChange(
                            'Designedproductioncapacityinkgyear',
                          )}
                          error={
                            touched.Designedproductioncapacityinkgyear &&
                            errors.Designedproductioncapacityinkgyear
                          }
                        />

                        <Input
                          textInput
                          label={t('IL.ActualProductionCapacityLabel')}
                          requiredStar
                          keyboardType="numeric"
                          value={values.ActualProductionCapacityinkgyear}
                          onChangeText={handleChange(
                            'ActualProductionCapacityinkgyear',
                          )}
                          error={
                            touched.ActualProductionCapacityinkgyear &&
                            errors.ActualProductionCapacityinkgyear
                          }
                        />
                      </View>
                      {Object.entries(errors).length > 0 && (
                        <Text
                          h4
                          style={{color: colors.red, marginTop: 8 * BW()}}>
                          {t('IL.ERRORVALID')}
                        </Text>
                      )}
                      <Button
                        title={t('Save')}
                        onPress={() => {
                          handleSubmit();
                        }}
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
                    </>
                  );
                }}
              </Formik>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Products;

const getStyles = (colors: any) =>
  StyleSheet.create({
    btn: {
      height: 40 * BH(),
      borderRadius: 8 * BW(),

      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8 * BW(),
      padding: 2 * BW(),
      borderColor: colors.secondaryColor,
      borderWidth: 1,
    },
    btnTitle: {
      color: colors.secondaryColor,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      paddingHorizontal: 8 * BW(),
      backgroundColor: colors.black + '89',
    },
    modalView: {
      backgroundColor: colors.mainBackground,
      borderRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '40%',
      maxHeight: '88%',
    },
  });
