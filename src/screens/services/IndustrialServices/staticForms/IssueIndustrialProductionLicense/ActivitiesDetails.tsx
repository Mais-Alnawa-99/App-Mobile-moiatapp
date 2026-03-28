import React, {useState, useMemo, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
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
import Input from '../../../../../component/input/Input';
import {ReadOnlyRow} from '../ReusableComponents';
import {useAppDispatch} from '../../../../../redux/store';
import {
  getMainActivity,
  getSubActivity,
} from '../../../../../redux/reducers/I-Services/thunk/ILFormService';
import MultiLevelDropdown from '../MultiLevelDropdown';
import {useDisabled} from './DisabledContext';

const getActivitySchema = (t: any) =>
  Yup.object().shape({
    MainActivity: Yup.object().required(t('Required')),
    SubActivity: Yup.array().required(t('Required')),
  });
const ActivitiesDetails = ({readOnly = false, index = 4}) => {
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
  const [activities, setActivities] = useState(values.Activities);
  const [mainActivities, setMainActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [subActivity, setSubActivity] = useState([]);
  const [activeIndex, setActiveIndex] = useState<number | null | string>(null);
  const resetValues = {
    MainActivity: null,
    SubActivity: [],
    index: null,
  };
  const [initialValues, setInitialValues] = useState(resetValues);
  const validationSchema = useMemo(() => getActivitySchema(t), [t]);

  const closeForm = () => {
    setModalVisible(false);
  };

  const _delete = index => {
    const newList = [...values.Activities];
    newList.splice(index, 1);
    setActivities(newList);
    setFieldValue('Activities', newList);
  };

  const _getMainActivity = () => {
    dispatch(getMainActivity()).then(res => {
      if (res.payload?.networkSuccess) {
        const result = res.payload.result;

        setMainActivities(result);
      } else {
        setMainActivities([]);
      }
    });
  };

  const findNodeById = (node, targetId) => {
    if (node.id === targetId) {
      return node;
    }
    if (node.children?.length) {
      for (const child of node.children) {
        const found = findNodeById(child, targetId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  //findNodeById(root, subActivityId);

  const _getSubActivity = value => {
    setIsLoading(true);
    dispatch(
      getSubActivity({mainActivity: value.id, subLevel: value.subLevel}),
    ).then(res => {
      setIsLoading(false);
      if (res.payload?.networkSuccess) {
        const result = res.payload.result.map(
          (item: any, index: number): any => ({
            label: item.isiC4Code + ' - ' + item.name,
            value: item.isiC4Code,
            ...item,
          }),
        );

        setSubOptions(result);
      } else {
        setSubOptions([]);
      }
    });
  };

  useEffect(() => {
    _getMainActivity();
  }, []);

  useEffect(() => {
    setActivities(values.Activities);
  }, [values.Activities]);

  return (
    <View>
      <StepIndicator
        stepNumber={index}
        stepName={t('IL.Activities')}
        style={{marginBottom: 8 * BW()}}
        requiredStar={true}
      />

      <View
        style={{
          minHeight: 100 * BW(),
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        {values.Activities?.length === 0 ? (
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
                    setInitialValues(resetValues);
                    setSubActivity([]);
                    setModalVisible(true);
                  }}
                  style={styles.btn}
                  styleText={styles.btnTitle}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={{gap: 8 * BW()}}>
            {!readOnly && !isDisabled('FirstName') && (
              <View style={{flexDirection: 'row'}}>
                <Button
                  title={t('addNew')}
                  onPress={() => {
                    setModalVisible(true);
                    setActivities(values.Activities);
                    setSubActivity([]);
                    setInitialValues(resetValues);
                  }}
                  style={styles.btn}
                  styleText={styles.btnTitle}
                />
              </View>
            )}
            {values.Activities?.map((activity, index) => {
              const isActive =
                activeIndex == null ? index == 0 : index === activeIndex;

              return (
                <Accordion
                  title={t('IL.AnActivity') + ' (' + (index + 1) + ')'}
                  expandedDefault={isActive}
                  onPress={() => setActiveIndex(isActive ? '' : index)}
                  styleHeader={{backgroundColor: colors.white}}
                  styleBody={{
                    backgroundColor: colors.white,
                    paddingBottom: 8 * BW(),
                  }}
                  styleIcon={{
                    tintColor: colors.secondaryColor,
                  }}
                  showBorder
                  styleTilte={{
                    color: isActive
                      ? colors.secondaryColor
                      : colors.textPrimaryColor,
                  }}>
                  <View>
                    <ReadOnlyRow
                      label={t('IL.MainActivity')}
                      value={
                        '(' +
                        activity.MainActivity?.isiC4Code +
                        ') ' +
                        activity.MainActivity?.name
                      }
                    />
                    <ReadOnlyRow
                      label={t('IL.SubActivity')}
                      value={activity.SubActivity?.map(
                        (item, index) =>
                          item.isiC4Code +
                          ' - ' +
                          item.name +
                          (activity.SubActivity.length - 1 !== index
                            ? '\n'
                            : ''),
                      )}
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
                            const updateActivity = {...activity, index};
                            setInitialValues(updateActivity);

                            _getSubActivity(activity?.MainActivity);
                            setSubActivity(
                              activity.SubActivity.map(item => item.value),
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
          </View>
        )}
      </View>
      {touched.Activities && errors.Activities && (
        <Text h5 style={{color: colors.red}}>
          {errors.Activities}
        </Text>
      )}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text h3 bold>
                {t('IL.AddNew')}
              </Text>
              <TouchableOpacity onPress={closeForm} style={{height: 25 * BW()}}>
                <MaterialIcons
                  name={'close'}
                  size={20 * BW()}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange
                onSubmit={values => {
                  try {
                    let newActivities = [];

                    if (values.index == null) {
                      newActivities = [...activities, values];
                    } else {
                      newActivities = [...activities];
                      newActivities[values.index] = values;
                    }
                    // const total = calculateTotalEmployees(newEmployees);
                    setActivities(newActivities);
                    setFieldValue('Activities', newActivities);
                    setModalVisible(false);
                    // setTotalEmployees(total);
                  } catch (error) {
                    // Optionally show an error message to the user
                  }
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
                      <View style={{flex: 1}}>
                        <View style={{zIndex: 11111}}>
                          <MultiLevelDropdown
                            data={mainActivities}
                            onItemSelect={item => {
                              setFieldValue('MainActivity', item);
                              setFieldValue('SubActivity', []);
                              _getSubActivity(item);
                            }}
                            label={t('IL.MainActivity')}
                            value={values.MainActivity}
                          />
                        </View>
                        {touched.MainActivity && errors.MainActivity && (
                          <Text h5 style={{color: colors.red}}>
                            {errors.MainActivity}
                          </Text>
                        )}

                        {isLoading ? (
                          <ActivityIndicator
                            style={{marginTop: 15 * BW()}}
                            size={'large'}
                            color={colors.secondaryColor + '99'}
                          />
                        ) : (
                          <View style={{height: '58%'}}>
                            <Input
                              multiSelect
                              requiredStar={true}
                              search={subOptions.length > 5 ? true : false}
                              label={t('IL.SubActivity')}
                              items={subOptions}
                              placeholder={t('Select')}
                              value={subActivity}
                              onChangeValue={selectedItems => {
                                setSubActivity(selectedItems);
                              }}
                              scrollSelected={true}
                              storeObjects={selectedItems =>
                                setFieldValue('SubActivity', selectedItems)
                              }
                              error={touched.SubActivity && errors.SubActivity}
                            />
                          </View>
                        )}
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
                          padding: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 8 * BW(),
                        }}
                        medium
                        styleText={{color: colors.mainWhite}}
                      />
                    </>
                  );
                }}
              </Formik>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActivitiesDetails;

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

      padding: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '80%',
    },
  });
