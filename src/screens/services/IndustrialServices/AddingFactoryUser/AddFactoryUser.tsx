import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../../../../component/input/Input';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {useTranslation} from 'react-i18next';
import {useRoute, useTheme} from '@react-navigation/native';
import {BW, BH} from '../../../../style/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../../../../component/Button';
import Text from '../../../../component/Text';
import StepIndicator from '../../Eservices/DynamicForm/StepIndicator';
import reactotron from 'reactotron-react-native';
import PageBg from '../../../../component/PageBg';
import {
  getFormsList,
  submitFactoryUser,
} from '../../../../redux/reducers/I-Services/thunk/factory';
import {useAppDispatch} from '../../../../redux/store';
import NavigationService from '../../../../navigation/NavigationService';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';
import {_openModal} from '../../Eservices/ServiceForm';

const AddFactoryUser = () => {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const emiratesIdRegex = /^784[0-9]{4}[0-9]{7}[0-9]{1}$/;
  const termsCheckboxKey = 'acceptTerms';
  const [formOptions, setFormOptions] = useState<
    {label: string; value: number}[]
  >([]);
  type FormValues = {
    emailAddress: string;
    fullName: string;
    selectedServices: any[];
    emiratesIDLabel: string;
    acceptTerms: boolean;
  };

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .matches(/^[\w.\-]+@([\w\-]+\.)+[\w\-]{2,}$/, t('EmailFormatInvalid'))
      .required(t('EmailRequired')),

    fullName: Yup.string().trim().required(t('Required')),

    selectedServices: Yup.array().min(1, t('AtLeastOneItem')),

    emiratesIDLabel: Yup.string()
      .matches(emiratesIdRegex, t('EmiratesIDFormatError'))
      .required(t('Required')),

    acceptTerms: Yup.bool().oneOf([true], t('IL.ILC.mustAgreeToTerms')),
  });

  const route = useRoute<any>();
  const {licenseId} = route.params;

  const _submitFactoryUser = (values: any) => {
    dispatch(setLoadingModal(true));
    dispatch(
      submitFactoryUser({
        licenseId: licenseId,
        userId: '',
        email: values.emailAddress.trim(),
        userName: values.fullName.trim(),
        identificationDocumentNumber: values.emiratesIDLabel.trim(),
        formsList: (values.selectedServices ?? []).map((s: any) =>
          Number(s.value ?? s),
        ),
      }),
    ).then(res => {
      dispatch(setLoadingModal(false));
      if (
        res?.payload.networkSuccess &&
        !!res?.payload?.result?.FactoryUserId
      ) {
        _openModal(dispatch, false, `${t('IL.UserAdded')} `, '15%', false, () =>
          NavigationService.goBack(),
        );
      } else {
        _openModal(
          dispatch,
          t('IL.ErrorGeneralPageTitle'),
          `${t('ErrorGeneral')} `,
          '15%',
          false,
        );
      }
    });
  };
  const _getFormsList = async () => {
    dispatch(getFormsList()).then(res => {
      if (
        res.meta.requestStatus === 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        const list = res.payload?.result;
        const options = list.map((item: any) => ({
          label: item.Title,
          value: Number(item.id),
        }));
        setFormOptions(options);
      } else {
      }
    });
  };

  useEffect(() => {
    _getFormsList();
  }, []);

  const initialValues: any = {
    emailAddress: '',
    fullName: '',
    selectedServices: [],
    emiratesIDLabel: '',
    acceptTerms: false,
  };
  return (
    <PageBg>
      <Page
        withStatusBar
        hideBottomTab
        styles={{padding: 8 * BW()}}
        header={
          <Header
            title={t('IL.addingUser')}
            hideDrawer
            titleContainerStyle={{flex: 8}}
          />
        }
        withHeader>
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={(values: any) => {
            try {
              _submitFactoryUser(values);
            } catch (error) {
            } finally {
            }
          }}>
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View>
              <StepIndicator stepNumber={1} stepName={t('IL.userDetails')} />

              <Input
                textInput
                label={t('EmailLabel')}
                requiredStar
                value={values.emailAddress}
                onChangeText={handleChange('emailAddress')}
                error={touched.emailAddress && errors.emailAddress}
                required={touched.emailAddress && errors.emailAddress}
              />
              <Input
                textInput
                label={t('FullName')}
                requiredStar
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                error={touched.fullName && errors.fullName}
                required={touched.fullName && errors.fullName}
              />
              <Input
                multiSelect
                requiredStar={true}
                search={formOptions.length > 5 ? true : false}
                label={t('IL.serviceName')}
                items={formOptions}
                placeholder={t('Select')}
                value={values.selectedServices}
                onChangeValue={(selectedItems: any) => {
                  setFieldValue('selectedServices', selectedItems);
                }}
                error={touched.selectedServices && errors.selectedServices}
                required={touched.selectedServices && errors.selectedServices}
              />
              <Input
                textInput
                label={t('EmiratesIDLabel')}
                placeholder="xxxxxxxxxxxx784"
                keyboardType="numeric"
                requiredStar
                value={values.emiratesIDLabel}
                onChangeText={handleChange('emiratesIDLabel')}
                error={touched.emiratesIDLabel && errors.emiratesIDLabel}
              />
              <Text
                h5
                style={{
                  color: colors.lightPrimaryTextColor,
                }}>
                {t('IL.Help_EmirateID')}
              </Text>

              <StepIndicator
                stepNumber={2}
                stepName={t('acceptingTerms')}
                style={{marginTop: 16 * BW()}}
              />
              <Text h4>{t('termsIssuePricePreferenceCertificate')}</Text>
              <Input
                checkbox
                title={t('AgreeWithTermsConditions')}
                checked={values[termsCheckboxKey]}
                onPress={() =>
                  setFieldValue(termsCheckboxKey, !values[termsCheckboxKey])
                }
                viewStyle={{marginTop: 16 * BH()}}
              />
              <Button
                title={t('IL.ActionOk')}
                style={
                  !values.acceptTerms
                    ? {...styles.buttonSubmitDisable}
                    : {
                        ...styles.buttonSubmit,
                      }
                }
                styleText={{
                  color: !values.acceptTerms
                    ? colors.secondaryColor
                    : colors.mainWhite,
                }}
                disabled={!values.acceptTerms}
                onPress={handleSubmit as any}
              />
            </View>
          )}
        </Formik>
      </Page>
    </PageBg>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
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

export default AddFactoryUser;
