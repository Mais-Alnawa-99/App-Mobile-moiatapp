import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {t} from 'i18next';
import Input from '../../../../../../component/input/Input';
import Button from '../../../../../../component/Button';
import {BH, BW} from '../../../../../../style/theme';
import {useTheme} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import HsCodes from '../../HsCode';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/store';
import {isArabic} from '../../../../../../locales';
import {GetLookupData} from '../../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {setCountries} from '../../../../../../redux/reducers/I-Services/slice/Country';
import ILAttachmentUpload from '../../../../../../component/attachment/ILAttachmentUpload';
import Text from '../../../../../../component/Text';
import {acceptedFiles, maxFileSize} from '../../..';
import {GetHsCodeFactoriesAndDetails} from '../../../../../../redux/reducers/I-Services/thunk/HSCodes';

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
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const countries = useAppSelector(state => state.Country.list);
  const dispatch = useAppDispatch();
  const [newMaterials, setNewMaterials] = useState(values.NewMaterials);
  const GCCLocalCountries = ['AE', 'BH', 'KW', 'OM', 'QA', 'SA'];
  const {userILData} = useAppSelector(state => state.userILData);

  const validationSchema = Yup.object().shape({
    hsCodeId: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),
    CountryOfOrigin: Yup.object()
      .test(
        'has-keys',
        t('IL.CountryRequired'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('IL.CountryRequired')),
    ValueoftheRawMaterial: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('IL.EnterValidNumber')),
    TotalWeightasperCommercialInvoice: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('IL.EnterValidNumber'))
      .max(
        Yup.ref('RemainingAvailableWeight'),
        t('IL.WeightMustNotExceedRemaining'),
      ),
  });

  useEffect(() => {
    _getCountries();
  }, []);

  const _getCountries = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'Countries'})).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload?.result.Countries.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        dispatch(setCountries(result));
      } else {
        dispatch(setCountries([]));
      }
    });
  };

  useEffect(() => {
    _getCountries();
  }, []);

  return (
    <Formik
      initialValues={props.initials}
      validationSchema={validationSchema}
      onSubmit={values => {
        let myNewMaterial = [];

        if (values.index == null) {
          myNewMaterial = [...newMaterials, values];
        } else {
          myNewMaterial = [...newMaterials];
          myNewMaterial[values.index] = values;
        }
        setNewMaterials(myNewMaterial);
        setFieldValue('NewMaterials', myNewMaterial);

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
                const result = res.payload.HSCodeValues;

                setFieldValue('TotalApprovedWeight', result.total.toString());
                setFieldValue('RemainingWeight', result.remaining.toString());
                setFieldValue('ReservedQuantity', result.reserved.toString());
                setFieldValue(
                  'RemainingAvailableWeight',
                  result.available.toString(),
                );
              }
            });
          }
        }, [values.hsCodeId]);
        return (
          <View>
            <HsCodes
              fieldName={'hsCodeId'}
              title={t('IL.HsCodeLabel')}
              required={true}
              editValue={values.hsCodeId}
              licenseId={userILData?.Id}
              error={touched.hsCodeId && errors.hsCodeId}
            />

            <Text
              h5
              style={{
                color: colors.lightPrimaryTextColor,
              }}>
              {t('IL.Help_RawMaterialsHsCode')}
            </Text>

            <Input
              dropdown
              requiredStar
              label={t('IL.CountryOfOrigin')}
              placeholder={t('Select')}
              items={countries}
              value={values.CountryOfOrigin}
              onChange={val => {
                setFieldValue('CountryOfOrigin', val);

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
              error={touched.CountryOfOrigin && errors.CountryOfOrigin}
            />

            <Input
              textInput
              label={t('IL.TotalApprovedWeight')}
              value={values.TotalApprovedWeight}
              disabled
            />
            <Input
              textInput
              label={t('IL.RemainingWeight')}
              value={values.RemainingWeight}
              disabled
            />
            <Input
              textInput
              label={t('IL.ReservedQuantity')}
              value={values.ReservedQuantity}
              disabled
            />
            <Input
              textInput
              label={t('IL.RemainingAvailableWeight')}
              value={values.RemainingAvailableWeight}
              disabled
            />

            <Input
              textInput
              requiredStar={true}
              keyboardType="numeric"
              label={t('IL.TotalWeightasperCommercialInvoice')}
              value={values.TotalWeightasperCommercialInvoice}
              onChangeText={(text: any) =>
                setFieldValue('TotalWeightasperCommercialInvoice', text)
              }
              onBlur={handleBlur('TotalWeightasperCommercialInvoice')}
              error={
                touched.TotalWeightasperCommercialInvoice &&
                errors.TotalWeightasperCommercialInvoice
              }
              required={
                touched.TotalWeightasperCommercialInvoice &&
                errors.TotalWeightasperCommercialInvoice
              }
            />

            <Text
              h5
              style={{
                color: colors.lightPrimaryTextColor,
              }}>
              {t('IL.Help_TotalWeightasperCommercialInvoice')}
            </Text>
            <Input
              textInput
              requiredStar={true}
              keyboardType="numeric"
              label={t('IL.ValueoftheRawMaterial')}
              value={values.ValueoftheRawMaterial}
              onChangeText={(text: any) =>
                setFieldValue('ValueoftheRawMaterial', text)
              }
              onBlur={handleBlur('ValueoftheRawMaterial')}
              error={
                touched.ValueoftheRawMaterial && errors.ValueoftheRawMaterial
              }
              required={
                touched.ValueoftheRawMaterial && errors.ValueoftheRawMaterial
              }
            />
            <Text
              h5
              style={{
                color: colors.lightPrimaryTextColor,
              }}>
              {t('IL.Help_ValueoftheRawMaterial')}
            </Text>
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
