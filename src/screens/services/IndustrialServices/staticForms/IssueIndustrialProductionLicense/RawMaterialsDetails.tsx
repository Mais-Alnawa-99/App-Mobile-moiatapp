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
import Accordion from '../../../../../component/Accordion';
import {ReadOnlyRow} from '../ReusableComponents';
import {GetLookupData} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {isArabic} from '../../../../../locales';
import ReadOnlyInput from '../ReadOnlyText';
import MaterialForm from './RawMaterialForm';
import reactotron from 'reactotron-react-native';
import {_openModal} from '../../../Eservices/ServiceForm';
import {useDisabled} from './DisabledContext';

const RawMaterialsDetails = () => {
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
  const {isDisabled} = useDisabled();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [itemList, setItemList] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);
  const [rowMaterials, setRowMaterials] = useState(values.RawMaterials);
  const [totalValue, setTotalValue] = useState('');

  const resetValues = {
    Category: {},
    HSCodeHSCodesListxlsx: {},
    Quantity: '',
    MaterialUsage: '',
    productsMaidByRawMaterial: [],
    Value: '',
    CountryOfOriginId: {},
    LocalGulfOriginForeign: '', // Read-only
    LocalGulfOriginForeignValue: '',
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

  const closeForm = () => {
    setModalVisible(false);
  };
  const _delete = index => {
    const newList = [...values.RawMaterials];
    newList.splice(index, 1);
    setRowMaterials(newList);
    setFieldValue('RawMaterials', newList);
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
    const rawMaterials = values.RawMaterials;

    if (rawMaterials.length != 0) {
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

            const updatedCost = {
              ...lCost,
              sum: oldSum + Number(material.Value),
            };

            // Replace in array
            const updatedArray = [...localCost];
            updatedArray[foundIndex] = updatedCost;

            // Save back
            localCost = updatedArray;
          }
          lSum = lSum + Number(material.Value);
        } else {
          // Find the object
          const foundIndex = foreignCost?.findIndex(
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
      foreignCost[foreignCost.length - 1] = {
        ...foreignCost[foreignCost?.length - 1],
        sum: fSum,
      };

      const total = rawMaterials
        .reduce((total, rm) => {
          const rmCount = parseInt(rm.Value || 0, 10);
          return total + rmCount;
        }, 0)
        .toString();
      setTotalValue(total);
      setFieldValue('LocalMaterialsCost', localCost);
      setFieldValue('ForeignMaterialsCost', foreignCost);
    }
  }, [values.RawMaterials]);

  return (
    <View>
      <StepIndicator
        stepNumber={10}
        stepName={t('IL.RawMaterials')}
        style={{marginBottom: 0 * BW()}}
        requiredStar={true}
      />
      <View
        style={{
          minHeight: 100 * BW(),
          alignContent: 'center',
          justifyContent: 'center',
          gap: 8 * BW(),
          marginTop: 8 * BW(),
        }}>
        {values.RawMaterials?.length == 0 ? (
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: colors.secondaryColor + '99',
              borderRadius: 8 * BW(),
              borderWidth: 1,
              paddingVertical: 8 * BW(),
              gap: 8 * BW(),
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
            {!isDisabled('RawMaterials') && (
              <Button
                title={t('addNew')}
                onPress={() => {
                  if (checkProduct()) {
                    setModalVisible(true);
                    setInitialForm(resetValues);
                  }
                }}
                style={styles.btn}
                styleText={styles.btnTitle}
              />
            )}
          </View>
        ) : (
          <>
            {!isDisabled('RawMaterials') && (
              <View style={{flexDirection: 'row'}}>
                <Button
                  title={t('addNew')}
                  onPress={() => {
                    if (checkProduct()) {
                      setModalVisible(true);
                      setInitialForm(resetValues);
                    }
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
                        RawMaterial.HSCodeHSCodesListxlsx.Code +
                        ' | ' +
                        RawMaterial.HSCodeHSCodesListxlsx.Title
                      }
                    />
                    <ReadOnlyRow
                      label={t('IL.GrossWeight')}
                      value={RawMaterial.Quantity}
                    />
                    <ReadOnlyRow
                      label={t('IL.MaterialUsage')}
                      value={RawMaterial.MaterialUsage}
                    />
                    <ReadOnlyRow
                      label={t('IL.CountryOfOrigin')}
                      value={RawMaterial.CountryOfOriginId?.label}
                    />
                    {!isDisabled('RawMaterials') && (
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
                      </View>
                    )}
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
      <ReadOnlyInput
        key={'#'}
        label={t('IL.TotalValueofRawMaterialinAED')}
        value={totalValue}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalView]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10 * BW(),
              }}>
              <Text h3 bold>
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
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={{marginBottom: 0 * BW()}}>
              <View
                style={{
                  backgroundColor: colors.mainBackground,
                }}>
                <MaterialForm
                  initials={initialForm}
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
      gap: 8 * BW(),
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
      minHeight: '40%',
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

export default RawMaterialsDetails;
