import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BH, BW} from '../../../../../style/theme';
import Text from '../../../../../component/Text';
import Button from '../../../../../component/Button';
import {useState, useMemo} from 'react';
import OwnerPersonForm from './OwnerPersonForm';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import reactotron from 'reactotron-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import Accordion from '../../../../../component/Accordion';
import {isArabic} from '../../../../../locales';
import OwnerCompanyForm from './OwnerCompanyForm';
import {OwnerPerson, OwnerCompany} from './Owner';
import {_openModal} from '../../../Eservices/ServiceForm';
import {useAppDispatch} from '../../../../../redux/store';
import {useDisabled} from './DisabledContext';

const getOwnerPersonSchema = (t: any) =>
  Yup.object().shape({
    PersonName: Yup.string()
      .matches(/^[a-zA-Z0-9 #*()+.,\"\\/&':-]+$/, t('OnlyEnglishAllowed'))
      .required(t('Required')),

    PersonNameArabic: Yup.string()
      .matches(/^[\u0600-\u06FF0-9 #*()+.,\"\\/&':-]+$/, t('OnlyArabicAllowed'))
      .required(t('Required')),

    Nationality: Yup.object()
      .required(t('Required'))
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      ),

    PersonEmiratesID: Yup.string().matches(
      /^784[0-9]{12}$/,
      t('EmiratesIDFormatError'),
    ),

    PersonPercentage: Yup.number()
      //  .matches(/^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/, t('SharePercentageInvalid'))
      .required(t('Required')),

    PersonContributionAmount: Yup.number()
      //.matches(/^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/, t('InvalidNumber'))
      .required(t('Required')),

    OwnerGender: Yup.object()
      .required(t('GenderRequired'))
      .test(
        'has-keys',
        t('GenderRequired'),
        value => value && Object.keys(value).length > 0,
      ),
    PersonEmiratesIdAttachment: Yup.array()
      .min(1, t('AtLeastOneAttachment'))
      .of(
        Yup.object({
          base64: Yup.string().required(t('Base64Required')),
        }),
      )
      .required(t('AttachmentsRequired')),

    // PersonPassportAttachment: Yup.array()
    //   .min(1, t('AtLeastOneAttachment'))
    //   .of(
    //     Yup.object({
    //       base64: Yup.string().required(t('Base64Required')),
    //     }),
    //   )
    //   .required(t('AttachmentsRequired')),
  });
const numberRegex = /^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/;
const sharePercentRegex = /^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/;
const getOwnerCompanySchema = (t: any) =>
  Yup.object().shape({
    CompanyName: Yup.string()
      .matches(/^[a-zA-Z0-9 #*()+.,\"\\/&':-]+$/, t('OnlyEnglishAllowed'))
      .required(t('Required')),
    CompanyNameArabic: Yup.string()
      .matches(/^[\u0600-\u06FF0-9 #*()+.,\"\\/&':-]+$/, t('OnlyArabicAllowed'))
      .required(t('Required')),
    Nationality: Yup.object()
      .required(t('Required'))
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      ),
    CompanyLocalLicenseNumber: Yup.string()
      .nullable()
      .when(['IsUAENational', 'OwnerTypeId', 'IsDraft'], {
        is: (national, type, draft) =>
          Number(national) === 1 && Number(type) === 2 && Number(draft) === 0,
        then: schema => schema.required(t('LocalLicenseRequired')),
        otherwise: schema => schema.notRequired(),
      }),
    CompanyPercentage: Yup.string()
      .matches(sharePercentRegex, t('SharePercentageInvalid'))
      .required(t('Required')),

    CompanyContributionAmount: Yup.string()
      .matches(numberRegex, t('InvalidNumber'))
      .required(t('Required')),
    CompanyLocalLicenseAttachment: Yup.array()
      .min(1, t('AtLeastOneAttachment'))
      .of(
        Yup.object({
          base64: Yup.string().required(t('Base64Required')),
        }),
      )
      .required(t('AttachmentsRequired')),
  });

const OwnerDetails = ({readOnly = false, index = 5}) => {
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
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [owners, setOwners] = useState([]);
  const [type, setType] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);
  const initialPersonValues = {
    PersonName: '',
    PersonNameArabic: '',
    Nationality: {},
    PersonEmiratesID: '',
    PersonPercentage: '',
    PersonContributionAmount: '',
    OwnerGender: {},
    PersonEmiratesIdAttachment: [],
    PersonPassportAttachment: [],
    PersonVisaExpatsAttachment: [],
    IsUAENational: 0,
    OwnerTypeId: 1,
    IsDraft: 0,
    index: null,
  };

  const showOwner = useMemo(() => {
    return (
      (values.LegalEntity?.isOwner === 'Y' &&
        values.LegalEntity?.showDoYouHaveManager === 'N') ||
      (values.LegalEntity?.showDoYouHaveManager === 'Y' &&
        !values.DoYouHaveManager?.value) ||
      Object.keys(values.LegalEntity || {}).length === 0
    );
  }, [values.LegalEntity, values.DoYouHaveManager]);

  const initialCompanyValues = {
    CompanyName: '',
    CompanyNameArabic: '',
    Nationality: {},
    CompanyLocalLicenseNumber: '',
    CompanyPercentage: '',
    CompanyContributionAmount: '',
    CompanyLocalLicenseAttachment: [],
    CompanyEstablishmentContractAttachment: [],
    OwnerTypeId: 2,
    IsDraft: 0,
    IsUAENational: 0,
    index: null,
  };
  const [initialValues, setInitialValues] = useState({});
  const validationPersonSchema = useMemo(() => getOwnerPersonSchema(t), [t]);
  const validationCompanySchema = useMemo(() => getOwnerCompanySchema(t), [t]);
  const closeForm = () => {
    setModalVisible(false);
  };

  const checkFirst = () => {
    if (
      values.TotalCapitalInvestment == '' ||
      values.TotalCapitalInvestment == '0'
    ) {
      _openModal(
        dispatch,
        false,
        false,
        false,
        <Text h4 style={{color: colors.red}}>
          {t('CapitalRequired')}
        </Text>,
      );
      return false;
    } else return true;
  };

  const _delete = index => {
    const newOwners = owners.filter((_, i) => i !== index);
    setOwners(newOwners);
    setFieldValue('Owners', newOwners);
  };
  const TotalCapitalInvestment = values.TotalCapitalInvestment;
  return (
    <>
      {showOwner ? (
        <View style={{flex: 1}}>
          <StepIndicator
            stepNumber={index}
            stepName={t('OwnersDetails')}
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
            {values.Owners?.length === 0 ? (
              <View
                style={{
                  flexDirection: 'column',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 8 * BW(),
                  borderColor: colors.secondaryColor + '33',
                  borderRadius: 8 * BW(),
                  borderWidth: 1,
                  gap: 8 * BW(),
                }}>
                <Image
                  source={require('../../../../../assets/Noitems.png')}
                  style={{
                    width: 80 * BW(),
                    height: 80 * BW(),
                  }}
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
                {!readOnly && !isDisabled('FirstName') && (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8 * BW(),
                    }}>
                    <Button
                      title={t('AddPerson')}
                      onPress={() => {
                        if (checkFirst()) {
                          setModalVisible(true);
                          setInitialValues(initialPersonValues);
                          setType('person');
                        }
                      }}
                      style={styles.btn}
                      styleText={styles.btnTitle}
                    />
                    <Button
                      title={t('AddCompany')}
                      onPress={() => {
                        if (checkFirst()) {
                          setModalVisible(true);
                          setInitialValues(initialCompanyValues);
                          setType('company');
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
                {!readOnly && !isDisabled('FirstName') && (
                  <View style={{flexDirection: 'row', gap: 8 * BW()}}>
                    <Button
                      title={t('AddPerson')}
                      onPress={() => {
                        if (checkFirst()) {
                          setModalVisible(true);
                          setType('person');
                          setOwners(values.Owners);
                          setInitialValues(initialPersonValues);
                        }
                      }}
                      style={styles.btn}
                      styleText={styles.btnTitle}
                    />
                    <Button
                      title={t('AddCompany')}
                      onPress={() => {
                        if (checkFirst()) {
                          setModalVisible(true);
                          setInitialValues(initialCompanyValues);
                          setType('company');
                          setOwners(values.Owners);
                        }
                      }}
                      style={styles.btn}
                      styleText={styles.btnTitle}
                    />
                  </View>
                )}
                {values.Owners?.map((owner, index) => {
                  const isActive =
                    activeIndex == null ? index == 0 : index === activeIndex;
                  return (
                    <Accordion
                      key={index}
                      title={
                        `${
                          owner.OwnerTypeId === 1 ? t('person') : t('company')
                        }: ` +
                        `${
                          owner.OwnerTypeId === 1
                            ? isArabic()
                              ? owner.PersonNameArabic
                              : owner.PersonName
                            : isArabic()
                            ? owner.CompanyNameArabic
                            : owner.CompanyNameEnglish
                        }`
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
                        {owner.OwnerTypeId === 1 ? (
                          <OwnerPerson values={owner} />
                        ) : (
                          <OwnerCompany values={owner} />
                        )}
                        {!readOnly && !isDisabled('FirstName') && (
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
                                const updateOwner = {...owner, index};
                                setInitialValues(updateOwner);
                                setType(
                                  owner.OwnerTypeId === 1
                                    ? 'person'
                                    : 'company',
                                );
                                setModalVisible(true);
                              }}
                              style={{
                                backgroundColor: colors.green,
                                height: 30 * BW(),
                                justifyContent: 'center',
                                padding: 0,
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
                                justifyContent: 'center',
                                padding: 0,
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
          {touched.Owners && errors.Owners && (
            <Text style={{color: colors.red}}>{errors.Owners}</Text>
          )}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text h3 bold>
                    {type === 'person' ? t('AddPerson') : t('AddCompany')}
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
                    validationSchema={
                      type == 'person'
                        ? validationPersonSchema
                        : validationCompanySchema
                    }
                    validateOnBlur
                    validateOnChange
                    onSubmit={values => {
                      const owner = {...values, type: type};
                      let newOwners = [];

                      if (values.index == null) {
                        newOwners = [...owners, owner];
                      } else {
                        newOwners = [...owners];
                        newOwners[values.index] = owner;
                      }

                      setOwners(newOwners);
                      setFieldValue('Owners', newOwners);
                      setModalVisible(false);
                    }}>
                    {({
                      values,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      setFieldTouched,
                      errors,
                      touched,
                    }) => (
                      <>
                        {type === 'person' ? (
                          <OwnerPersonForm
                            values={values}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            errors={errors}
                            touched={touched}
                            TotalCapitalInvestment={TotalCapitalInvestment}
                          />
                        ) : (
                          <OwnerCompanyForm
                            values={values}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            errors={errors}
                            touched={touched}
                            TotalCapitalInvestment={TotalCapitalInvestment}
                          />
                        )}
                        {Object.entries(errors).length > 0 && (
                          <Text h4 style={{color: colors.red}}>
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
                          medium
                          styleText={{color: colors.mainWhite}}
                        />
                      </>
                    )}
                  </Formik>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

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

export default OwnerDetails;
