import React, {useState, useMemo, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import EmployeesDetailsFeilds from './EmployeesDetailsFeilds';
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
import {isArabic} from '../../../../../locales';
import Input from '../../../../../component/input/Input';
import {ReadOnlyRow} from '../ReusableComponents';
import {GetLookupData} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {useDisabled} from './DisabledContext';
const getEmployeeDetailsSchema = (t: any) =>
  Yup.object().shape({
    nationality: Yup.object()
      .required(t('Required'))
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      ),
    numberofFemaleEmployees: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('numberofFemaleEmployeesRequired')),
    numberofMaleEmployees: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('numberofMaleEmployeesRequired')),
    numberofEmployees: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('numberofEmployeesRequired')),
  });
const EmployeesDetails = ({readOnly = false, index = 6}) => {
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
  const [employees, setEmployees] = useState([]);
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);
  const resetValues = {
    nationality: {},
    numberofFemaleEmployees: 0,
    numberofMaleEmployees: 0,
    numberofEmployees: 0,
    IsDraft: 0,
    index: null,
  };
  const [initialValues, setInitialValues] = useState(resetValues);
  const validationSchema = useMemo(() => getEmployeeDetailsSchema(t), [t]);
  const [totalEmployees, setTotalEmployees] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const countries = useAppSelector(state => state.Country.list);
  const closeForm = () => {
    setModalVisible(false);
  };

  const _delete = index => {
    const newList = [...employees];
    newList.splice(index, 1);
    setEmployees(newList);
    setFieldValue('Employees', newList);

    const total = newList.reduce((acc, item) => {
      const num = parseInt(item.numberofEmployees || '0', 10);
      return acc + num;
    }, 0);

    setTotalEmployees(total.toString());
  };

  const calculateTotalEmployees = (data: any[]) => {
    return data
      .reduce((total, emp) => {
        const empCount = parseInt(emp.numberofEmployees || 0, 10);
        return total + empCount;
      }, 0)
      .toString();
  };

  return (
    <View>
      <StepIndicator
        stepNumber={index}
        stepName={t('employeesDetails')}
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
        {values.Employees?.length === 0 ? (
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
            {!readOnly && !isDisabled('FirstName') && (
              <View style={{flexDirection: 'row'}}>
                <Button
                  title={t('addNew')}
                  onPress={() => {
                    setModalVisible(true);
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
              <View style={{flexDirection: 'row'}}>
                <Button
                  title={t('addNew')}
                  onPress={() => {
                    setModalVisible(true);
                    setInitialValues(resetValues);
                    setEmployees(values.Employees);
                  }}
                  style={styles.btn}
                  styleText={styles.btnTitle}
                />
              </View>
            )}
            {values.Employees?.map((employee, index) => {
              const isActive =
                activeIndex == null ? index == 0 : index === activeIndex;
              return (
                <Accordion
                  title={t('addNewEmployeesGroupDetails')}
                  title={`${employee.nationality.label}`}
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
                      label={t('Nationality')}
                      value={employee.nationality.label}
                    />
                    <ReadOnlyRow
                      label={t('numberofFemaleEmployees')}
                      value={employee.numberofFemaleEmployees}
                    />
                    <ReadOnlyRow
                      label={t('numberofMaleEmployees')}
                      value={employee.numberofMaleEmployees}
                    />
                    <ReadOnlyRow
                      label={t('numberofEmployees')}
                      value={employee.numberofEmployees}
                    />
                    {!readOnly && !isDisabled('FirstName') && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          marginTop: 8 * BW(),
                          gap: 8 * BW(),
                        }}>
                        <Button
                          title={t('Edit')}
                          onPress={() => {
                            const updateOwner = {...employee, index};
                            setInitialValues(updateOwner);
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
      {touched.Employees && errors.Employees && (
        <Text h5 style={{color: colors.red}}>
          {errors.Employees}
        </Text>
      )}
      <EmployeesDetailsFeilds />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text h3 bold>
                {t('addNewEmployeesGroupDetails')}
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
                  let newEmployees = [];

                  if (values.index == null) {
                    newEmployees = [...employees, values];
                  } else {
                    newEmployees = [...employees];
                    newEmployees[values.index] = values;
                  }
                  const total = calculateTotalEmployees(newEmployees);
                  setEmployees(newEmployees);
                  setFieldValue('Employees', newEmployees);
                  setModalVisible(false);
                  setTotalEmployees(total);
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
                }) => (
                  <>
                    <View>
                      <Input
                        dropdown
                        label={t('Nationality')}
                        requiredStar
                        value={values.nationality}
                        onChange={val => {
                          setFieldValue('nationality', val);
                          // setFieldTouched('nationality', true);
                        }}
                        items={countries}
                        error={touched.nationality && errors.nationality}
                      />
                      <Input
                        textInput
                        requiredStar
                        label={t('numberofFemaleEmployees')}
                        value={values.numberofFemaleEmployees}
                        onChangeText={val => {
                          setFieldValue('numberofFemaleEmployees', val);
                          const male = parseInt(
                            values.numberofMaleEmployees || 0,
                            10,
                          );
                          const female = parseInt(val || 0, 10);
                          setFieldValue(
                            'numberofEmployees',
                            (male + female).toString(),
                          );
                        }}
                        error={
                          touched.numberofFemaleEmployees &&
                          errors.numberofFemaleEmployees
                        }
                      />

                      <Input
                        textInput
                        requiredStar
                        label={t('numberofMaleEmployees')}
                        value={values.numberofMaleEmployees}
                        onChangeText={val => {
                          setFieldValue('numberofMaleEmployees', val);
                          const male = parseInt(val || 0, 10);
                          const female = parseInt(
                            values.numberofFemaleEmployees || 0,
                            10,
                          );
                          setFieldValue(
                            'numberofEmployees',
                            (male + female).toString(),
                          );
                        }}
                        error={
                          touched.numberofMaleEmployees &&
                          errors.numberofMaleEmployees
                        }
                      />

                      <Input
                        textInput
                        requiredStar
                        label={t('numberofEmployees')}
                        value={values.numberofEmployees}
                        onChangeText={handleChange('numberofEmployees')}
                        disabled
                        error={
                          touched.numberofEmployees && errors.numberofEmployees
                        }
                      />
                    </View>
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
                  </>
                )}
              </Formik>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EmployeesDetails;

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
