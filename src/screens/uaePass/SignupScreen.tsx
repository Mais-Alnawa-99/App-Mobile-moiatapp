import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import {BW} from '../../style/theme';
import reactotron from '../../redux/reactotron';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import Text from '../../component/Text';
import {useTranslation} from 'react-i18next';
import Header from '../../component/Header';
import {isArabic} from '../../locales';

import Input from '../../component/input/Input';
import PageBg from '../../component/PageBg';
import Page from '../../component/Page';
import {
  GetGenderList,
  GetLookupData,
} from '../../redux/reducers/I-Services/thunk/ILFormService';
import * as Yup from 'yup';

import {setCountries} from '../../redux/reducers/I-Services/slice/Country';
import {setEmirates} from '../../redux/reducers/I-Services/slice/Emirates';
import {Formik} from 'formik';

function SignUpScreen(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const [errorMsg, setErrorMsg] = useState('');
  const [genderList, setGenderList] = useState([]);
  const [registrationTypes, setRegistrationType] = useState([]);
  const countries = useAppSelector(state => state.Country.list);
  const emirates = useAppSelector(state => state.Emirate.list);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {url} = useAppSelector(store => store.webview);

  const languages = [
    {label: isArabic() ? 'عربي' : 'Arabic', value: '2'},
    {label: isArabic() ? 'انجليزي' : 'English', value: '1'},
  ];

  type FormValues = {
    RegistrationType: any;
    CompanyName: string;
    CompanyEmail: string;
    SendNotifications: boolean;
    Email: string;
    FullName: string;
    Mobile: string;
    DateOfBirth: string;
    CountryOfResidence: any;
    EmirateStateCity: any;
    Gender: any;
    Nationality: any;
    PreferredLanguage: any;
    UAEResidenceStatus: any;
    EmiratesID: string;
    EmiratesIdExpiryDate: string;
    PreferredCommunicationChannel: any;
    PreferredSocialMedia: any;
    WhichAppliesMost: any;
    ChangeAvatar: [];
    IdentificationCopy: [];
    ChooseFile: [];
  };

  const initialValues = useMemo<FormValues>(
    () => ({
      RegistrationType: {},
      CompanyName: '',
      CompanyEmail: '',
      SendNotifications: false,
      Email: '',
      FullName: '',
      Mobile: '',
      DateOfBirth: '',
      CountryOfResidence: {},
      EmirateStateCity: {},
      Gender: {},
      Nationality: {},
      PreferredLanguage: {},
      UAEResidenceStatus: {},
      EmiratesID: '',
      EmiratesIdExpiryDate: '',
      PreferredCommunicationChannel: {},
      PreferredSocialMedia: {},
      WhichAppliesMost: {},
      ChangeAvatar: [],
      IdentificationCopy: [],
      ChooseFile: [],
    }),
    [],
  );

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().trim().required(t('Required')),

    fullName: Yup.string().trim().required(t('Required')),

    selectedServices: Yup.array().min(1, t('AtLeastOneItem')),

    emiratesIDLabel: Yup.string().trim().required(t('Required')),

    acceptTerms: Yup.bool().oneOf([true], t('IL.ILC.mustAgreeToTerms')),
  });

  const _getGenderList = () => {
    setIsLoading(true);
    let language = isArabic() ? 2 : 1;
    dispatch(GetGenderList({language})).then(res => {
      setIsLoading(false);
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.map(
          (item: any, index: number): any => ({
            label: item.name,
            value: item.id,
          }),
        );
        setGenderList(result);
      } else {
        setGenderList([]);
      }
    });
  };

  const _getCountries = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'Countries'})).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.Countries.map(
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

  const _getEmirates = () => {
    let language = isArabic() ? 2 : 1;
    dispatch(GetLookupData({language, Category: 'Emirates'})).then(res => {
      if (res.payload?.networkSuccess) {
        const items = res.payload.result.Emirates.map(
          (item: any, index: number): any => ({
            ...item,
            label: item.Name,
            value: item.Id,
          }),
        );
        dispatch(setEmirates(items));
      } else {
        dispatch(setEmirates([]));
      }
    });
  };

  useEffect(() => {
    _getGenderList();
    _getCountries();
    _getEmirates();
  }, []);

  return (
    <PageBg>
      <View style={styles.container}>
        <ImageBackground
          source={colors.mainBackgroundImg}
          style={{
            height: '100%',
            width: '100%',
          }}>
          <Page
            withStatusBar
            styles={{padding: 8 * BW()}}
            header={
              <Header
                title={t('ProfileCompleting')}
                hideDrawer
                titleContainerStyle={{flex: 8}}
              />
            }
            withHeader>
            <Formik<FormValues>
              initialValues={initialValues}
              // validationSchema={validationSchema}
              validateOnMount={true}
              onSubmit={(values: any) => {}}>
              {({
                handleChange,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <Input
                    dropdown
                    label={t('RegistrationType')}
                    items={registrationTypes}
                    requiredStar
                    value={values.RegistrationType}
                    onChange={(val: any) => {
                      setFieldValue('RegistrationType', val.value);
                    }}
                    required={
                      touched.RegistrationType && errors.RegistrationType
                    }
                    error={touched.RegistrationType && errors.RegistrationType}
                  />
                  <Input
                    textInput
                    label={t('CompanyName')}
                    requiredStar
                    value={values.CompanyName}
                    onChangeText={handleChange('CompanyName')}
                    error={touched.CompanyName && errors.CompanyName}
                    required={touched.CompanyName && errors.CompanyName}
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                  />
                  <Input
                    textInput
                    label={t('CompanyEmail')}
                    requiredStar
                    value={values.CompanyEmail}
                    onChangeText={handleChange('CompanyEmail')}
                    error={touched.CompanyEmail && errors.CompanyEmail}
                    required={touched.CompanyEmail && errors.CompanyEmail}
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                    //   error={touched.Specs && errors.Specs}
                    //   required={touched.Specs && errors.Specs}
                  />
                  <Input
                    checkbox
                    title={t('SendNotifications')}
                    value={values.SendNotifications}
                    onChangeText={handleChange('SendNotifications')}
                    error={
                      touched.SendNotifications && errors.SendNotifications
                    }
                    required={
                      touched.SendNotifications && errors.SendNotifications
                    }
                    // checked={}
                    // onPress={() =>{}}
                    // styleInput={styles.input}
                  />
                  <Text h3 bold>
                    {t('ApplicantPersonalInfoTitle')}
                  </Text>
                  <Input
                    textInput
                    label={t('IL.Email')}
                    requiredStar
                    value={values.Email}
                    onChangeText={handleChange('Email')}
                    error={touched.Email && errors.Email}
                    required={touched.Email && errors.Email}
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                    //   error={touched.Specs && errors.Specs}
                    //   required={touched.Specs && errors.Specs}
                  />
                  <Input
                    textInput
                    label={t('FullName')}
                    requiredStar
                    value={values.FullName}
                    onChangeText={handleChange('FullName')}
                    error={touched.FullName && errors.FullName}
                    required={touched.FullName && errors.FullName}
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                    //   error={touched.Specs && errors.Specs}
                    //   required={touched.Specs && errors.Specs}
                  />
                  <Input
                    newDatePicker
                    label={t('DateOfBirth')}
                    dateValue={values.DateOfBirth}
                    // value={
                    //   !!values.DateOfBirth && values.DateOfBirth != undefined
                    //     ? values.DateOfBirth
                    //     : ''
                    // }
                    setDate={(v: any) => setFieldValue('DateOfBirth', v)}
                    requiredStar
                    error={touched.DateOfBirth && errors.DateOfBirth}
                    required={touched.DateOfBirth && errors.DateOfBirth}
                  />
                  <Input
                    dropdown
                    label={t('CountryOfResidence')}
                    items={countries}
                    requiredStar
                    value={values.CountryOfResidence}
                    onChange={(val: any) => {
                      setFieldValue('CountryOfResidence', val.value);
                    }}
                    required={
                      touched.CountryOfResidence && errors.CountryOfResidence
                    }
                    error={
                      touched.CountryOfResidence && errors.CountryOfResidence
                    }
                  />
                  <Input
                    dropdown
                    label={t('EmirateStateCity')}
                    items={emirates}
                    requiredStar
                    value={values.EmirateStateCity}
                    onChange={(v: any) =>
                      setFieldValue('EmirateStateCity', v?.value)
                    }
                    error={touched.EmirateStateCity && errors.EmirateStateCity}
                    required={
                      touched.EmirateStateCity && errors.EmirateStateCity
                    }
                  />
                  <Input
                    dropdown
                    requiredStar
                    label={t('Gender')}
                    items={genderList}
                    value={values.Gender}
                    onChange={(val: any) => {
                      setFieldValue('Gender', val);
                    }}
                  />
                  <Input
                    dropdown
                    label={t('Nationality')}
                    items={countries}
                    requiredStar
                    value={values.Nationality}
                    onChange={(val: any) => {
                      setFieldValue('Nationality', val);
                    }}
                  />
                  <Input
                    dropdown
                    label={t('PreferredLanguage')}
                    requiredStar
                    items={languages}
                    value={values.PreferredLanguage}
                    onChange={(val: any) => {
                      setFieldValue('PreferredLanguage', val);
                    }}
                  />
                  <Input
                    textInput
                    label={t('UAEResidenceStatus')}
                    requiredStar
                    value={values.UAEResidenceStatus}
                    onChangeText={handleChange('UAEResidenceStatus')}
                    error={
                      touched.UAEResidenceStatus && errors.UAEResidenceStatus
                    }
                    required={
                      touched.UAEResidenceStatus && errors.UAEResidenceStatus
                    }
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                    //   error={touched.Specs && errors.Specs}
                    //   required={touched.Specs && errors.Specs}
                  />
                  <Input
                    textInput
                    label={t('EmiratesIDLabel')}
                    requiredStar
                    value={values.EmiratesID}
                    onChangeText={handleChange('EmiratesID')}
                    error={touched.EmiratesID && errors.EmiratesID}
                    required={touched.EmiratesID && errors.EmiratesID}
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                    //   error={touched.Specs && errors.Specs}
                    //   required={touched.Specs && errors.Specs}
                  />
                  <Input
                    newDatePicker
                    label={t('EmiratesIdExpiryDate')}
                    dateValue={values.EmiratesIdExpiryDate}
                    value={
                      !!values.EmiratesIdExpiryDate &&
                      values.EmiratesIdExpiryDate != undefined
                        ? values.EmiratesIdExpiryDate
                        : ''
                    }
                    setDate={(v: any) =>
                      setFieldValue('EmiratesIdExpiryDate', v)
                    }
                    requiredStar
                    error={
                      touched.EmiratesIdExpiryDate &&
                      errors.EmiratesIdExpiryDate
                    }
                    required={
                      touched.EmiratesIdExpiryDate &&
                      errors.EmiratesIdExpiryDate
                    }
                  />
                  <Input
                    textInput
                    label={t('PreferredCommunicationChannel')}
                    requiredStar
                    value={values.PreferredCommunicationChannel}
                    onChangeText={handleChange('PreferredCommunicationChannel')}
                    error={
                      touched.PreferredCommunicationChannel &&
                      errors.PreferredCommunicationChannel
                    }
                    required={
                      touched.PreferredCommunicationChannel &&
                      errors.PreferredCommunicationChannel
                    }
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                    //   error={touched.Specs && errors.Specs}
                    //   required={touched.Specs && errors.Specs}
                  />
                  <Input
                    textInput
                    label={t('PreferredSocialMedia')}
                    requiredStar
                    value={values.PreferredSocialMedia}
                    onChangeText={handleChange('PreferredSocialMedia')}
                    error={
                      touched.PreferredSocialMedia &&
                      errors.PreferredSocialMedia
                    }
                    required={
                      touched.PreferredSocialMedia &&
                      errors.PreferredSocialMedia
                    }
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                    //   error={touched.Specs && errors.Specs}
                    //   required={touched.Specs && errors.Specs}
                  />
                  <Input
                    textInput
                    label={t('WhichAppliesMost')}
                    requiredStar
                    value={values.WhichAppliesMost}
                    onChangeText={handleChange('WhichAppliesMost')}
                    error={touched.WhichAppliesMost && errors.WhichAppliesMost}
                    required={
                      touched.WhichAppliesMost && errors.WhichAppliesMost
                    }
                    styleInput={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                    }}
                    //   error={touched.Specs && errors.Specs}
                    //   required={touched.Specs && errors.Specs}
                  />
                  {/* <FileUpload
                title={t('IL.ILC.LocalAuthorityApproval')}
                value={values.LocalAuthorityApproval}
                onChange={(files: any) =>
                  setFieldValue('LocalAuthorityApproval', files)
                }
                maxFile={2}
                acceptedFiles={acceptedFiles}
                maxFileSize={maxFileSize}
              /> */}
                  {/* <FileUpload
                title={t('IL.ILC.LocalAuthorityApproval')}
                value={values.LocalAuthorityApproval}
                onChange={(files: any) =>
                  setFieldValue('LocalAuthorityApproval', files)
                }
                maxFile={2}
                acceptedFiles={acceptedFiles}
                maxFileSize={maxFileSize}
              /> */}
                </View>
              )}
            </Formik>
          </Page>
        </ImageBackground>
      </View>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
    mainBtn: {
      height: 'auto',
      padding: 8 * BW(),
      marginVertical: 20 * BW(),
      marginHorizontal: 4 * BW(),

      borderRadius: 8 * BW(),
    },
  });
export default SignUpScreen;
