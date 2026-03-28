import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Modal, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW, BH} from '../../../../../../style/theme';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import Button from '../../../../../../component/Button';
import Text from '../../../../../../component/Text';
import StepIndicator from '../../../../Eservices/DynamicForm/StepIndicator';

import MaterialForm from './RawMaterialsForm';
import Accordion from '../../../../../../component/Accordion';
import {AttachmentRow, ReadOnlyRow} from '../../ReusableComponents';

import {useAppDispatch} from '../../../../../../redux/store';

const RawMaterialsDetails = ({isDisabled}) => {
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);
  const [newMaterials, setNewMaterials] = useState(values.NewMaterials);
  const [totalValue, setTotalValue] = useState('');

  const resetValues = {
    hsCodeId: {},
    CountryOfOrigin: '',
    TotalApprovedWeight: '0',
    RemainingWeight: '0',
    ReservedQuantity: '0',
    RemainingAvailableWeight: '0',
    TotalWeightasperCommercialInvoice: '0',
    ValueoftheRawMaterial: '0',
    Attachments: [],
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
    const newList = [...values.NewMaterials];
    newList.splice(index, 1);
    setNewMaterials(newList);
    setFieldValue('NewMaterials', newList);
  };

  return (
    <View
      style={{alignContent: 'center', justifyContent: 'center', gap: 8 * BW()}}>
      {values.NewMaterials?.length == 0 ? (
        <View
          style={{
            borderColor: colors.secondaryColor + '99',
            borderRadius: 8 * BW(),
            borderWidth: 1,
            minHeight: 100 * BW(),
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 8 * BW(),
            padding: 8 * BW(),
          }}>
          <Image
            source={require('../../../../../../assets/Noitems.png')}
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
          {values.NewMaterials?.map((NewMaterial, index) => {
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
                    label={t('IL.HsCodeLabel')}
                    value={
                      NewMaterial.hsCodeId.Title.includes('|')
                        ? NewMaterial.hsCodeId.Title
                        : NewMaterial.hsCodeId.Code +
                          ' | ' +
                          NewMaterial.hsCodeId.Title
                    }
                  />
                  <ReadOnlyRow
                    label={t('IL.CountryOfOrigin')}
                    value={
                      NewMaterial.CountryOfOrigin?.Name ??
                      NewMaterial.CountryOfOrigin?.label ??
                      '-'
                    }
                  />

                  <ReadOnlyRow
                    label={t('IL.TotalApprovedWeight')}
                    value={NewMaterial.TotalApprovedWeight}
                  />
                  <ReadOnlyRow
                    label={t('IL.RemainingWeight')}
                    value={NewMaterial.RemainingWeight}
                  />
                  <ReadOnlyRow
                    label={t('IL.ReservedQuantity')}
                    value={NewMaterial.ReservedQuantity}
                  />
                  <ReadOnlyRow
                    label={t('IL.RemainingAvailableWeight')}
                    value={NewMaterial.RemainingAvailableWeight}
                  />
                  <ReadOnlyRow
                    label={t('IL.TotalWeightasperCommercialInvoice')}
                    value={NewMaterial.TotalWeightasperCommercialInvoice}
                  />
                  <ReadOnlyRow
                    label={t('IL.ValueoftheRawMaterial')}
                    value={NewMaterial.ValueoftheRawMaterial}
                  />


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
                            const updateOwner = {...NewMaterial, index};
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
      {touched.NewMaterials && errors.NewMaterials && (
        <Text style={{color: colors.red}} h5>
          {errors.NewMaterials}
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
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
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
