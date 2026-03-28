import React, {Fragment, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {BW} from '../../../style/theme';
import Loader from '../../../component/Loader';
import Text from '../../../component/Text';
import Input from '../../../component/input/Input';
import AddAttachment from '../../../component/attachment/AddAtachment';
import Button from '../../../component/Button';
import {useAppDispatch} from '../../../redux/store';
import {requestMessageUs} from '../../../redux/reducers/Help/thunk/thunk';
import ILAttachmentUpload from '../../../component/attachment/ILAttachmentUpload';

function Step({counter, label}: {counter: any; label: any}): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  return (
    <View style={styles.row}>
      <View
        style={{
          backgroundColor: colors.secondaryColor + '44',
          padding: 5 * BW(),
          borderRadius: 50 * BW(),
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 30 * BW(),
            height: 30 * BW(),
            borderRadius: 50 * BW(),
            backgroundColor: colors.secondaryColor,
          }}>
          <Text h2 medium style={{color: colors.white}}>
            {counter}
          </Text>
        </View>
      </View>
      <Text h3 medium style={{marginStart: 12 * BW()}}>
        {label}
      </Text>
    </View>
  );
}

interface ValuesType {
  contactPurpose: any;
  fullName: any;
  email: any;
  contactNumber: any;
  subject: any;
  message: any;
  attachments: any;
}
export default function MessageUs(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const initialValues = {
    contactPurpose: '',
    fullName: '',
    email: '',
    contactNumber: '',
    subject: '',
    message: '',
    attachments: [],
  };

  const validationSchema = Yup.object().shape({
    contactPurpose: Yup.string().required(t('Required')),
    fullName: Yup.string().required(t('Required')),
    email: Yup.string().email(t('ValidationEmail')).required(t('Required')),
    contactNumber: Yup.string().required(t('Required')),
    subject: Yup.string().required(t('Required')),
    message: Yup.string().required(t('Required')),
  });

  const optionIds = [
    'ConformityAffairs',
    'EmiratesNationalAccreditationSystem',
    'GeneralInquiries',
    'NationalInCountryValueProgram',
    'IndustrialServices',
    'IndustrialRegistry',
    'MakeItInTheEmirates',
    'MediaInquiries',
    'NationalConformityMarks',
    'IECEmiratesNationalCommittee',
  ];

  const contactPurposeItems = optionIds.map(id => ({
    label: t(`ContactPurposeOptions.${id}.label`),
    value: id,
    description: t(`ContactPurposeOptions.${id}.description`),
  }));

  const _submit = (values: ValuesType) => {
    setIsLoading(true);

    const params = {
      type: 0,
      category: values?.contactPurpose,
      email: values?.email,
      contactNumber: values?.contactNumber,
      fullName: values?.fullName,
      subject: values?.subject,
      text: values?.message,
      attachments: (values.attachments || []).map((att: any) => ({
        fileName: att.name,
        base64Content: att.base64,
      })),
    };

    dispatch(requestMessageUs(params)).then(res => {
      if (res.payload.networkSuccess) {
      }
      Alert.alert(res.payload?.message || t('IL.ErrorGeneral'));
      setIsLoading(false);
    });
  };
  return (
    <Loader>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={_submit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <Fragment>
            <View style={{marginTop: 16 * BW()}}>
              <Step counter={'1'} label={t('SelectContactPurpose')} />
              <Input
                search
                medium
                label={t('ContactPurpose')}
                dropdown
                items={contactPurposeItems}
                value={values.contactPurpose}
                onChange={(item: any) => {
                  setFieldValue('contactPurpose', item?.value);
                }}
                // onBlur={handleBlur('contactPurpose')}
                error={touched.contactPurpose && errors.contactPurpose}
                requiredStar
              />
              {values.contactPurpose && (
                <Text style={{marginTop: 8}}>
                  {t(
                    `ContactPurposeOptions.${values.contactPurpose}.description`,
                  )}
                </Text>
              )}
            </View>

            <View style={{marginTop: 16 * BW()}}>
              <Step counter={'2'} label={t('FillTheForm')} />
              <Input
                medium
                label={t('FullName')}
                placeholder={t('PleaseEnterYourFullName')}
                textInput
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                error={touched.fullName && errors.fullName}
                requiredStar
              />
              <Input
                medium
                label={t('EmailAddress')}
                placeholder={t('PleaseEnterYourEmailAddress')}
                textInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                requiredStar
              />
              <Input
                medium
                label={t('ContactNumber')}
                placeholder={t('PleaseEnterYourMobileNumber')}
                textInput
                value={values.contactNumber}
                onChangeText={handleChange('contactNumber')}
                onBlur={handleBlur('contactNumber')}
                error={touched.contactNumber && errors.contactNumber}
                requiredStar
              />
              <Input
                medium
                label={t('Subject')}
                placeholder={t('PleaseEnterTheSubject')}
                textInput
                value={values.subject}
                onChangeText={handleChange('subject')}
                onBlur={handleBlur('subject')}
                error={touched.subject && errors.subject}
                requiredStar
              />
              <Input
                medium
                label={t('Message')}
                placeholder={t('PleaseTypeYourMessage')}
                textInput
                multiline
                numberOfLines={4}
                styleInput={{minHeight: 100 * BW()}}
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                error={touched.message && errors.message}
                requiredStar
              />
              <ILAttachmentUpload
                medium
                title={t('IL.Attachments')}
                value={values.attachments}
                onChange={files => setFieldValue('attachments', files)}
              />
              <View style={{marginTop: 20 * BW()}}>
                <Button
                  onPress={handleSubmit}
                  h3
                  title={t('Submit')}
                  medium
                  style={styles.submit}
                  styleText={{color: colors?.mainWhite}}
                  loading={isLoading}
                  loadingColor={colors?.mainWhite}
                />
              </View>
            </View>
          </Fragment>
        )}
      </Formik>
    </Loader>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    submit: {
      width: 'auto',
      height: 'auto',
      minHeight: 40 * BW(),
      padding: 0 * BW(),
      backgroundColor: colors.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

// import React, {Fragment, useRef, useState} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {useTranslation} from 'react-i18next';

// import {useTheme} from '@react-navigation/native';
// import Loader from '../../../component/Loader';
// import WebViewCustom from '../../../component/WebView';
// import WebView from 'react-native-webview';
// import {isArabic} from '../../../locales';

// export default function MessageUs(props: any): JSX.Element {
//   const {t} = useTranslation();
//   const {colors} = useTheme();
//   const styles = getStyle(colors);

//   const [attachment, setAttachment] = useState([]);

//   const [canGoBack, setCanGoBack] = useState(false);
//   const [title, setTitle] = useState('');
//   const webViewRef = useRef<WebView>(null);

//   let code = `
//   setInterval(() => {
//        const getInTouchDiv = document.querySelector('.get-in-touch');
//               document.body.innerHTML = '';
//               document.body.appendChild(getInTouchDiv);
//       }, 100);

//   `;
//   return (
//     <Loader>
//       <WebViewCustom
//         setCanGoBack={setCanGoBack}
//         webViewRef={webViewRef}
//         setTitle={setTitle}
//         code={code}
//         url={
//           isArabic()
//             ? 'https://moiat.gov.ae/ar/contact-us/contact-us-form'
//             : 'https://moiat.gov.ae/en/contact-us/contact-us-form'
//         }
//       />
//     </Loader>
//   );
// }

// const getStyle = (colors: any) =>
//   StyleSheet.create({
//     row: {
//       alignItems: 'center',
//       flexDirection: 'row',
//     },
//   });
