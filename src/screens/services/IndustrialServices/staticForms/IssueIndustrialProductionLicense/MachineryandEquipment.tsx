import React, {useState, useMemo, useEffect, useRef} from 'react';
import {StyleSheet, View, Image, ScrollView, Modal} from 'react-native';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import {useTheme} from '@react-navigation/native';
import {BH, BW} from '../../../../../style/theme';
import Text from '../../../../../component/Text';
import Button from '../../../../../component/Button';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import reactotron from 'reactotron-react-native';
import {useTranslation} from 'react-i18next';
import Accordion from '../../../../../component/Accordion';
import {isArabic} from '../../../../../locales';
import Input from '../../../../../component/input/Input';
import {ReadOnlyRow} from '../ReusableComponents';
import {GetLookupData} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import HsCodes from '../HsCode';
import ReadOnlyInput from '../ReadOnlyText';
import {_openModal} from '../../../Eservices/ServiceForm';
import {useDisabled} from './DisabledContext';

const getRawMaterialsSchema = (t: any) =>
  Yup.object().shape({
    HSCodeHSCodesListxlsx: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),
    CountryofOrigin: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),
    Status: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),
    Numberofmachinesofthesametype: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('Required')),
    TotalValue: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('Required')),
    productsMaidByRawMaterial: Yup.array().min(
      1,
      t('IL.Pleaseentertheproducts'),
    ),
  });
const MachineryandEquipment = () => {
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
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);
  const [machines, setMachines] = useState(values.Machines);
  const [totalMachines, setTotalMachines] = useState(0);
  const resetValues = {
    HSCodeHSCodesListxlsx: {},
    CountryofOrigin: {},
    Status: {},
    Numberofmachinesofthesametype: 0,
    productsMaidByRawMaterial: [],
    TotalValue: 0,
    IsDraft: 0,
    index: null,
  };
  const [initialValues, setInitialValues] = useState(resetValues);
  const validationSchema = useMemo(() => getRawMaterialsSchema(t), [t]);
  const [isLoading, setIsLoading] = useState(true);
  const countries = useAppSelector(state => state.Country.list);
  const [status, setStatus] = useState([]);
  const [options, setOptions] = useState([]);

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

  const _delete = index => {
    const newList = [...values.Machines];
    newList.splice(index, 1);
    setMachines(newList);
    setFieldValue('Machines', newList);
  };

  const _getStatus = () => {
    setIsLoading(true);
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'RawMaterialStatus'})).then(
      res => {
        setIsLoading(false);
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

  const checkProduct = () => {
    if (values.Products?.length == 0) {
      _openModal(
        dispatch,
        false,
        false,
        false,
        <Text h4 style={{color: colors.red}}>
          {t('IL.PleaseEnterOneProduct')}
        </Text>,
      );
      return false;
    } else return true;
  };

  useEffect(() => {
    _getStatus();
  }, []);

  useEffect(() => {
    const totalMachine = values.Machines;
    let sum = 0;
    totalMachine?.map(item => {
      sum += Number(item.TotalValue);

      return item;
    });
    setTotalMachines(sum);
  }, [values.Machines]);
  return (
    <View>
      <StepIndicator
        stepNumber={8}
        stepName={t('MachineryandEquipment')}
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
        {values.Machines?.length === 0 ? (
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
                    if (checkProduct()) {
                      setModalVisible(true);
                    }
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
                    if (checkProduct()) {
                      setModalVisible(true);
                      setMachines(values.Machines);
                      setInitialValues(resetValues);
                    }
                  }}
                  style={styles.btn}
                  styleText={styles.btnTitle}
                />
              </View>
            )}
            {values.Machines?.map((machine, index) => {
              const isActive =
                activeIndex == null ? index == 0 : index === activeIndex;
              return (
                <Accordion
                  title={
                    t('MachineryandEquipment') + ' (' + Number(index + 1) + ')'
                  }
                  expandedDefault={isActive}
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
                        machine.HSCodeHSCodesListxlsx.Code +
                        ' | ' +
                        machine.HSCodeHSCodesListxlsx.Title
                      }
                    />
                    <ReadOnlyRow
                      label={t('CountryofOrigin')}
                      value={machine.CountryofOrigin?.label}
                    />
                    <ReadOnlyRow
                      label={t('IL.Status')}
                      value={machine.Status.label}
                    />
                    <ReadOnlyRow
                      label={t('Numberofmachinesofthesametype')}
                      value={machine.Numberofmachinesofthesametype}
                    />
                    <ReadOnlyRow
                      label={t('TotalValue')}
                      value={machine.TotalValue}
                    />
                    {/* <ReadOnlyRow
                      label={t('ProductMaidByThis')}
                      value={machine.productsMaidByRawMaterial}
                    /> */}
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
                            const updateOwner = {...machine, index};
                            setInitialValues(updateOwner);
                            setModalVisible(true);
                          }}
                          style={{
                            backgroundColor: colors.green,
                            height: 30 * BW(),
                            padding: 0,
                            width: 50 * BW(),
                            justifyContent: 'center',
                          }}
                          h4
                          styleText={{color: 'white'}}
                        />
                        <Button
                          title={t('Delete')}
                          onPress={() => _delete(index)}
                          style={{
                            backgroundColor: colors.red,
                            height: 30 * BW(),
                            padding: 0,
                            width: 50 * BW(),
                            justifyContent: 'center',
                          }}
                          h4
                          styleText={{color: 'white'}}
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
      {touched.Machines && errors.Machines && (
        <Text h5 style={{color: colors.red}}>
          {errors.Machines}
        </Text>
      )}
      <ReadOnlyInput
        label={t('IL.TotalProductionCost')}
        value={totalMachines}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text h3 bold>
                {t('IL.AddNewEquipment')}
              </Text>
              <Button
                ioniconsColor={colors.red}
                ionicons={'close'}
                onPress={() => setModalVisible(false)}
                style={{
                  padding: 0,
                  width: 30 * BW(),
                  height: 30 * BW(),
                  justifyContent: 'center',
                }}
              />
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
                  let newMachines = machines;
                  if (values.index == null) {
                    newMachines = [...machines, values];
                  } else {
                    newMachines = [...machines];
                    newMachines[values.index] = values;
                  }
                  setMachines(newMachines);

                  setFieldValue('Machines', newMachines);
                  setModalVisible(false);
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
                          dropdown
                          label={t('CountryofOrigin')}
                          requiredStar
                          value={values.CountryofOrigin}
                          onChange={val => {
                            setFieldValue('CountryofOrigin', val);
                            // setFieldTouched('CountryofOrigin', true);
                          }}
                          items={countries}
                          error={
                            touched.CountryofOrigin && errors.CountryofOrigin
                          }
                        />

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
                          onChangeText={handleChange(
                            'Numberofmachinesofthesametype',
                          )}
                          error={
                            touched.Numberofmachinesofthesametype &&
                            errors.Numberofmachinesofthesametype
                          }
                        />
                        <Text
                          h5
                          style={{
                            color: colors.lightPrimaryTextColor,
                          }}>
                          {t('IL.Help_OfTheSameType')}
                        </Text>

                        <Input
                          textInput
                          label={t('TotalValue')}
                          requiredStar
                          value={values.TotalValue}
                          onChangeText={handleChange('TotalValue')}
                          error={touched.TotalValue && errors.TotalValue}
                        />

                        <Input
                          multiSelect
                          requiredStar={true}
                          search={options.length > 5 ? true : false}
                          label={t('ProductMaidByThis')}
                          items={options}
                          placeholder={t('Select')}
                          value={values.productsMaidByRawMaterial}
                          onChangeValue={selectedItems => {
                            setFieldValue(
                              'productsMaidByRawMaterial',
                              selectedItems,
                            );
                          }}
                          error={
                            touched.productsMaidByRawMaterial &&
                            errors.productsMaidByRawMaterial
                          }
                        />
                        <Text
                          h5
                          style={{
                            color: colors.lightPrimaryTextColor,
                          }}>
                          {t('IL.Help_Products')}
                        </Text>
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

export default MachineryandEquipment;

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
