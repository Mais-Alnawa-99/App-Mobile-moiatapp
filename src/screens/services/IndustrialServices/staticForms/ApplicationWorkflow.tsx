import {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {getApplicationWorkflowSteps} from '../../../../redux/reducers/I-Services/thunk/ILFormService';
import {Alert, Modal, TouchableOpacity, Animated, Easing} from 'react-native';
import {isArabic} from '../../../../locales';
import {t} from 'i18next';
import {View} from 'react-native';
import Text from '../../../../component/Text';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {color} from 'react-native-elements/dist/helpers';
import CircularProgress from '../../../../component/CircularProgress';
import DashedLine from '../../../../component/DashedLine';
import Button from '../../../../component/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import AnimatedCircularProgress from '../../../../component/AnimatedCircularProgress';

export const ApplicationWorkflow = ({service}: any) => {
  const dispatch = useAppDispatch();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [finishedSteps, setFinishedSteps] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const slide1 = useRef(new Animated.Value(400)).current;
  const slide2 = useRef(new Animated.Value(425)).current;
  const slide3 = useRef(new Animated.Value(450)).current;
  const slideY = useRef(new Animated.Value(-100)).current;
  const progress = useRef(new Animated.Value(0)).current; // 0 → 1
  const flip = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (steps.length > 0)
      Animated.timing(slideY, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
  }, [finishedSteps, steps.length]);

  useEffect(() => {
    Animated.stagger(10, [
      Animated.timing(slide1, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slide2, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slide3, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const fetchSteps = async () => {
      const result: any = await dispatch(
        getApplicationWorkflowSteps({
          FormId: service?.serviceId || service?.id,
          ApplicationId: service?.ApplicationId,
        }),
      );

      if (result?.payload?.networkSuccess) {
        if (result?.payload?.Data?.responseErrorId === 0) {
          const data = result?.payload?.Data?.data || [];

          setSteps(data);

          // Current step (safe check)
          const curr = data.find((item: any) => item.IsCurrent);
          setCurrent(curr?.StepName ?? '');

          // Next step (safe check)
          const next = data.find(
            (item: any) => curr && item.StepNumber === curr.StepNumber + 1,
          );
          setNextStep(next?.StepName ?? '');

          // Finished steps (safe check)
          const finished = data.filter((item: any) => !!item.IsDone);
          setFinishedSteps(finished.length + 1);
        } else {
          Alert.alert(
            '',
            isArabic()
              ? result?.payload?.Data?.responseMessageAr
              : result?.payload?.Data?.responseMessageEn,
          );
        }
      } else {
        Alert.alert('', t('IL.NetworkError'));
      }
    };

    fetchSteps();
  }, []);

  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [scale, opacity, modalVisible]);
  return (
    <>
      <Animated.View style={{transform: [{translateY: slideY}]}}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            borderRadius: 8 * BW(),
            padding: 10 * BW(),
            marginBottom: 8 * BW(),
          }}
          onPress={() => {
            setModalVisible(true);
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Text h4 bold>
                {current}
              </Text>
              {nextStep != '' && (
                <Text h5 bold style={{color: colors.textColor + '99'}}>
                  {t('IL.NextStep')}
                  {': '}
                  {nextStep}
                </Text>
              )}
            </View>
            <View>
              <AnimatedCircularProgress
                current={finishedSteps}
                total={steps.length}
                size={60}
                strokeWidth={6}
                progressColor={colors.secondaryColor + '99'}
                backgroundColor="#eee"
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
      {service?.ApplicationId && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Animated.View
            style={[styles.card, {transform: [{translateX: slide1}]}]}>
            <View style={styles.header}>
              <Text h4 style={{color: colors.textPrimaryColor + 'bc'}}>
                {t('Labels.ApplicationNo')}
              </Text>
              <Icon
                name={'file-document-outline'}
                size={22}
                color={colors.secondaryColor + 'a2'}
              />
            </View>
            <View>
              <Text h4 medium style={{color: colors.textPrimaryColor}}>
                {service?.ReferenceNo}
              </Text>
            </View>
          </Animated.View>
          <Animated.View
            style={[styles.card, {transform: [{translateX: slide2}]}]}>
            <View style={styles.header}>
              <Text h4 style={{color: colors.textPrimaryColor + 'bc'}}>
                {t('IL.ApplicationDate')}
              </Text>
              <Icon
                name={'calendar-blank-outline'}
                size={22}
                color={colors.secondaryColor + 'a2'}
              />
            </View>
            <View>
              <Text h4 medium style={{color: colors.textPrimaryColor}}>
                {moment(service?.DateCreated).format('MMM DD,YYYY')}
              </Text>
            </View>
          </Animated.View>
          <Animated.View
            style={[styles.card, {transform: [{translateX: slide3}]}]}>
            <View style={[styles.header, {alignItems: 'flex-start'}]}>
              <Text h4 style={{color: colors.textPrimaryColor + 'bc'}}>
                {t('IL.CheckOutBy')}
              </Text>
              <Icon
                name={'account-outline'}
                size={22}
                color={colors.secondaryColor + 'a2'}
              />
            </View>
            <View>
              <Text h4 medium style={{color: colors.textPrimaryColor}}>
                {service?.LockedUser}
              </Text>
            </View>
          </Animated.View>
        </View>
      )}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            zIndex: 2,
            backgroundColor: colors.black + '70',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              borderRadius: 12 * BW(),
              width: '100%',
              borderWidth: 0.2 * BW(),
              borderColor: colors.border,
              minHeight: '30%',
              backgroundColor: colors.white,
              padding: 12 * BW(),
              flexDirection: 'column',
            }}>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text h3 bold>
                  {t('IL.RequestStage')} {current}
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
              <DashedLine />
            </View>
            <View style={{flexDirection: 'column'}}>
              {steps.map((item: any) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'flex-start',
                  }}>
                  <View style={{alignItems: 'center'}}>
                    {item.IsDone ? (
                      <View
                        style={{
                          borderRadius: 50 * BW(),
                          width: 30 * BW(),
                          height: 30 * BW(),
                          margin: 6 * BW(),
                          backgroundColor: colors.green,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon name="check" size={24} color={colors.mainWhite} />
                      </View>
                    ) : item.IsCurrent ? (
                      <Animated.View
                        style={{
                          transform: [{scale}],
                          opacity,
                          borderRadius: 50 * BW(),
                          width: 32 * BW(),
                          height: 32 * BW(),
                          margin: 6 * BW(),
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 6 * BW(),
                          borderWidth: 1.5,
                          borderColor: colors.secondaryColor + '99',
                        }}>
                        <View
                          style={{
                            borderRadius: 50 * BW(),
                            width: 24 * BW(),
                            height: 24 * BW(),
                            backgroundColor: colors.secondaryColor + '99',
                          }}></View>
                      </Animated.View>
                    ) : (
                      <View
                        style={{
                          borderRadius: 50 * BW(),
                          width: 30 * BW(),
                          height: 30 * BW(),
                          margin: 6 * BW(),
                          borderColor: colors.gray,
                          borderWidth: 3 * BW(),
                        }}
                      />
                    )}
                    {item.StepNumber != steps.length && (
                      <View
                        style={{
                          width: 4 * BW(),
                          height: 20 * BW(),
                          borderRadius: 12 * BW(),
                          backgroundColor: item.IsDone
                            ? colors.green
                            : item.IsCurrent
                            ? colors.secondaryColor + '99'
                            : colors.gray,
                        }}
                      />
                    )}
                  </View>
                  <View>
                    <Text bold style={{color: colors.textColor + '99'}}>
                      {t('IL.Step')} {item.StepNumber}
                    </Text>
                    <Text bold>{item.StepName}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors?.white + '99',
      width: '32%',
      padding: 5 * BW(),
      minHeight: 50 * BW(),
      borderRadius: 8 * BW(),
      marginBottom: 8 * BW(),
      borderWidth: 1,
      borderColor: colors?.white,
      height: 85 * BW(),
      // justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
