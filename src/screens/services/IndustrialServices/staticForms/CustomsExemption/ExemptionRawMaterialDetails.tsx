/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import Input from '../../../../../component/input/Input';
import Page from '../../../../../component/Page';
import Header from '../../../../../component/Header';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW, BH} from '../../../../../style/theme';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import Button from '../../../../../component/Button';
import Text from '../../../../../component/Text';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';

import MaterialForm from './RawMaterialsForm';
import Accordion from '../../../../../component/Accordion';
import {ReadOnlyRow} from '../ReusableComponents';
import {GetLookupData} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {useAppDispatch} from '../../../../../redux/store';
import {isArabic} from '../../../../../locales';
import ReadOnlyInput from '../ReadOnlyText';

const ExemptionRawMaterialsDetails = ({isDisabled}) => {
  const formik = useFormikContext<FormValues>();
  if (!formik) {
    return null; // or some fallback UI
  }
  const {
    values,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [itemList, setItemList] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);
  const [rowMaterials, setRowMaterials] = useState(values.RawMaterials);
  const [categories, setCategories] = useState([]);
  const [totalValue, setTotalValue] = useState('');

  const resetValues = {
    Category: {},
    hsCodeId: {},
    productsMaidByRawMaterial: [],
    Status: {},
    Numberofmachinesofthesametype: '',
    TotalWeight: '',
    MaterialUsage: '',
  };
  const [initialForm, setInitialForm] = useState(resetValues);
  const termsCheckboxKey = 'acceptTerms';
  const fields = [
    {
      name: 'theOwnerOfTheTender',
      label: t('theOwnerOfTheTender'),
      type: 'text',
    },
    {name: 'nameOfTheProject', label: t('nameOfTheProject'), type: 'text'},
    {name: 'tenderNumber', label: t('tenderNumber'), type: 'text'},
    {
      name: 'subjectOfTheTender',
      label: t('subjectOfTheTender'),
      type: 'bigText',
    },
    {name: termsCheckboxKey, type: 'button-checkbox'},
  ];
  type TextFieldNames = (typeof fields)[number]['name'];

  type FormValues = {
    [key in TextFieldNames]: string;
  } & {
    acceptTerms: boolean;
  };
  const validationSchema = Yup.object(
    Object.fromEntries(
      fields.map(field => {
        if (field.type === 'button-checkbox') {
          return [
            field.name,
            Yup.bool().oneOf([true], t('IL.ILC.mustAgreeToTerms')),
          ];
        }
        return [
          field.name,
          Yup.string()
            .transform((value, originalValue) => {
              return originalValue?.trim() === '' ? null : value;
            })
            .nullable()
            .required(t('Required')),
        ];
      }),
    ),
  );

  const closeForm = () => {
    setModalVisible(false);
  };
  const _delete = index => {
    const newList = [...values.RawMaterials];
    newList.splice(index, 1);
    setRowMaterials(newList);
    setFieldValue('RawMaterials', newList);
  };
  useEffect(() => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'RawMaterialCategories'})).then(
      res => {
        if (res.payload?.networkSuccess) {
          const result = res.payload.result.RawMaterialCategories.map(
            (item: any, index: number): any => ({
              label: item.Name,
              value: item.Id,
            }),
          );
          setCategories(result);
          const costs = result?.map(item => ({...item, sum: 0.0}));
          setFieldValue('LocalMaterialsCost', [
            ...costs,
            {
              label: t('totalCostofLocalGulfOriginMaterials'),
              value: 'final',
              sum: 0.0,
            },
          ]);
          setFieldValue('ForeignMaterialsCost', [
            ...costs,
            {
              label: t('totalCostofForeignOriginMaterials'),
              value: 'final',
              sum: 0.0,
            },
          ]);
        } else {
          setCategories([]);
        }
      },
    );
  }, []);

  useEffect(() => {
    const rawMaterials = values.RawMaterials;
    let localCost = values.LocalMaterialsCost?.map(item => {
      return {...item, sum: 0};
    });
    let foreignCost = values.ForeignMaterialsCost?.map(item => {
      return {...item, sum: 0};
    });
    let lSum = 0,
      fSum = 0;
    rawMaterials?.map(material => {
      if (material.LocalGulfOriginForeignValue == 'L') {
        // Find the object
        const foundIndex = localCost?.findIndex(
          item => item.value == material.Category.value,
        );
        if (foundIndex !== -1) {
          const lCost = localCost[foundIndex];
          const oldSum = lCost.sum;
          // Do your calculation
          const updatedCost = {
            ...lCost,
            sum: oldSum + Number(material.Value), // for example
          };

          // Replace in array
          const updatedArray = [...localCost];
          updatedArray[foundIndex] = updatedCost;

          // Save back (e.g., to Formik)
          localCost = updatedArray;
        }
        lSum = lSum + Number(material.Value);
      } else {
        // Find the object
        const foundIndex = foreignCost.findIndex(
          item => item.value == material.Category.value,
        );
        if (foundIndex !== -1) {
          const fCost = foreignCost[foundIndex];
          const oldSum = fCost.sum;
          // Do your calculation
          const updatedCost = {
            ...fCost,
            sum: oldSum + Number(material.Value), // for example
          };

          // Replace in array
          const updatedArray = [...foreignCost];
          updatedArray[foundIndex] = updatedCost;

          // Save back (e.g., to Formik)
          foreignCost = updatedArray;
        }
        fSum = fSum + Number(material.Value);
      }
    });
    localCost[localCost?.length - 1] = {
      ...localCost[localCost?.length - 1],
      sum: lSum,
    };
    foreignCost[foreignCost?.length - 1] = {
      ...foreignCost[foreignCost.length - 1],
      sum: fSum,
    };
    setFieldValue('LocalMaterialsCost', localCost);
    setFieldValue('ForeignMaterialsCost', foreignCost);
  }, [values.RawMaterials]);

  return (
    <View>
      <StepIndicator
        stepNumber={2}
        stepName={t('RawMaterialDetail')}
        style={{marginTop: 8 * BW()}}
      />
      <View
        style={{
          minHeight: 100 * BW(),
          alignContent: 'center',
          justifyContent: 'center',
          gap: 8 * BW(),
        }}>
        {values.RawMaterials?.length == 0 ? (
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              borderColor: colors.secondaryColor + '99',
              borderRadius: 8 * BW(),
              borderWidth: 1,
              alignItems: 'center',
              gap: 8 * BW(),
              padding: 8 * BW(),
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
            {!isDisabled && (
              <Button
                medium
                title={t('addNew')}
                onPress={() => {
                  setModalVisible(true);
                  setInitialForm(resetValues);
                }}
                style={styles.btn}
                styleText={styles.btnTitle}
              />
            )}
          </View>
        ) : (
          <>
            {!isDisabled && (
              <View style={{flexDirection: 'row'}}>
                <Button
                  medium
                  title={t('addNew')}
                  onPress={() => {
                    setModalVisible(true);
                    setInitialForm(resetValues);
                  }}
                  style={styles.btn}
                  styleText={styles.btnTitle}
                />
              </View>
            )}
            {values.RawMaterials?.map((RawMaterial, index) => {
              const isActive =
                activeIndex == null ? index == 0 : index === activeIndex;
              return (
                <Accordion
                  title={t('IL.RawMaterial') + ' (' + Number(index + 1) + ')'}
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
                      label={t('IL.Category')}
                      value={RawMaterial.Category.label}
                    />
                    <ReadOnlyRow
                      label={t('IL.HsCodeLabel')}
                      value={
                        RawMaterial.hsCodeId.Code +
                        ' | ' +
                        RawMaterial.hsCodeId.Title
                      }
                    />
                    <ReadOnlyRow
                      label={t('IL.TotalWeightMaterial')}
                      value={RawMaterial.TotalWeight}
                    />
                    <ReadOnlyRow
                      label={t('IL.MaterialUsage')}
                      value={RawMaterial.MaterialUsage}
                    />
                    {/* {!!RawMaterial.productsMaidByRawMaterial?.ProductName && (
                      <ReadOnlyRow
                        label={t('ProductMaidByThis')}
                        value={
                          RawMaterial.productsMaidByRawMaterial?.length
                            ? RawMaterial.productsMaidByRawMaterial
                                .map((p: any) => p.ProductName?.trim())
                                .filter(Boolean)
                                .join(', ')
                            : ''
                        }
                      />
                    )} */}

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        gap: 8 * BW(),
                        marginTop: 8 * BW(),
                      }}>
                      {!isDisabled && (
                        <>
                          <Button
                            title={t('Edit')}
                            onPress={() => {
                              const updateOwner = {...RawMaterial, index};
                              setInitialForm(updateOwner);
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
                        </>
                      )}
                    </View>
                  </View>
                </Accordion>
              );
            })}
          </>
        )}
      </View>
      {touched.RawMaterials && errors.RawMaterials && (
        <Text style={{color: colors.red}} h5>
          {errors.RawMaterials}
        </Text>
      )}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalView]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10 * BW(),
              }}>
              <Text h2 bold style={{color: colors.black}}>
                {t('Add')} {t('IL.RawMaterial')}
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
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              style={{marginBottom: 0 * BW()}}>
              <View
                style={{
                  backgroundColor: colors.mainBackground,
                  flex: 1,
                }}>
                <MaterialForm
                  initials={initialForm}
                  categories={categories}
                  closeForm={() => closeForm()}
                  onChangeTotalValue={(val: number) => setTotalValue(val)}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 16 * BW(),
    },
    btn: {
      height: 40 * BH(),
      borderRadius: 8 * BW(),

      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8 * BW(),
      padding: 2 * BW(),
      borderColor: colors.secondaryColor,
      borderWidth: 1,
      //backgroundColor: '#fff',
    },
    btnTitle: {
      color: colors.secondaryColor,
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
      paddingVertical: 10 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '75%',
      maxHeight: '88%',
    },
    footerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4 * BW(),
      bottom: 12 * BW(),
      left: 12 * BW(),
      right: 12 * BW(),
      position: 'absolute',
      width: '100%',
    },
  });

export default ExemptionRawMaterialsDetails;
