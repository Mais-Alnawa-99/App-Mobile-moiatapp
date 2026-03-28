import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {BW} from '../../../style/theme';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import {isArabic} from '../../../locales';
import {openBottomSheet} from '../../../redux/reducers/General/bottomSheet';
import Line from '../../../component/Line';
import {_downloadFile} from '../../../component/SaveFiles';
import Accordion from '../../../component/Accordion';

export default function AboutServiceSection(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {tokenData}: any = useAppSelector(store => store.userToken);
  const dispatch = useAppDispatch();
  const serviceData = props.data;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      {serviceData?.FieldValues?.Description && (
        <>
          <Accordion
            showBorder
            title={t('AboutTheService')}
            expandedDefault={activeIndex === 2}
            onPress={() => setActiveIndex(activeIndex === 2 ? null : 2)}
            styleHeader={{
              backgroundColor: colors.white,
            }}
            styleConatiner={{
              marginTop: 10 * BW(),
              backgroundColor: colors.white,
            }}
            styleBody={{
              backgroundColor: colors.white,
            }}
            styleIcon={{tintColor: colors.secondaryColor}}>
            <View
              style={{
                padding: 16 * BW(),
              }}>
              <Text h4>{serviceData.FieldValues.Description}</Text>

              {serviceData?.FieldValues?.UserManual && (
                <Button
                  style={style.btn}
                  medium
                  icon={require('../../../assets/icons/DownloadSimple.png')}
                  title={t('DownloadUserManual')}
                  styleText={style.title}
                  containerIcon={style.containerIcon}
                  onPress={() => {
                    const file = serviceData.FieldValues.UserManual;
                    _downloadFile(file.Url, file.Title, tokenData);
                  }}
                />
              )}
            </View>
          </Accordion>
        </>
      )}

      {serviceData?.FieldValues?.Procedures?.length > 0 && (
        <>
          <Accordion
            showBorder
            title={t('ServiceProcedure')}
            expandedDefault={activeIndex === 1}
            onPress={() => setActiveIndex(activeIndex === 1 ? null : 1)}
            styleHeader={{
              backgroundColor: colors.white,
            }}
            styleConatiner={{
              marginTop: 10 * BW(),
              backgroundColor: colors.white,
            }}
            styleBody={{
              backgroundColor: colors.white,
            }}
            styleIcon={{tintColor: colors.secondaryColor}}>
            <View style={{padding: 16 * BW()}}>
              {serviceData.FieldValues.Procedures.map((item, index) => (
                <Text h4 key={index}>
                  • {item.FieldValues?.Title}
                </Text>
              ))}
            </View>
          </Accordion>
        </>
      )}

      {serviceData?.FieldValues?.Requirements?.length > 0 && (
        <>
          <Accordion
            title={t('RequiredDocuments')}
            showBorder
            expandedDefault={activeIndex === 0}
            onPress={() => setActiveIndex(activeIndex === 0 ? null : 0)}
            styleHeader={{
              backgroundColor: colors.white,
            }}
            styleConatiner={{
              marginTop: 10 * BW(),
              backgroundColor: colors.white,
            }}
            styleBody={{
              backgroundColor: colors.white,
            }}
            styleIcon={{tintColor: colors.secondaryColor}}>
            <View style={{padding: 16 * BW()}}>
              {serviceData.FieldValues.Requirements.map((item, index) => (
                <Text h4 key={index} style={{marginBottom: 8 * BW()}}>
                  • {item.FieldValues?.Title}
                </Text>
              ))}
            </View>
          </Accordion>
        </>
      )}

      {/* {serviceData?.FieldValues?.Files?.length > 0 && (
        <>
         
          <View style={{width: '100%'}}>
            <Button
              title={t('ConditionsOfUse')}
              style={style.btnDetails}
              antDesign={'arrowdown'}
              antDesignColor={colors.iconPrimaryColor}
              antDesignSize={14 * BW()}
              onPress={() =>
                dispatch(
                  openBottomSheet({
                    content: (
                      <View style={{padding: 16 * BW(),}}>
                        {serviceData.FieldValues.Files.map((item, index) => (
                          <Text h4 key={index} style={{marginBottom: 8}}>
                            • {item.FieldValues?.Title}
                          </Text>
                        ))}
                      </View>
                    ),
                  }),
                )
              }
              containerIcon={style.iconDetilas}
            />
          </View>
        </>
      )} */}

      {serviceData?.FieldValues?.Fees?.length > 0 && (
        <>
          <Accordion
            title={t('ServiceFees')}
            showBorder
            expandedDefault={activeIndex === 3}
            onPress={() => setActiveIndex(activeIndex === 3 ? null : 3)}
            styleHeader={{
              backgroundColor: colors.white,
            }}
            styleConatiner={{
              marginTop: 10 * BW(),
              backgroundColor: colors.white,
            }}
            styleBody={{
              backgroundColor: colors.white,
            }}
            styleIcon={{tintColor: colors.secondaryColor}}>
            <View style={{padding: 16 * BW()}}>
              {serviceData.FieldValues.Fees.map((fee, i) => (
                <Text h4 key={i} style={{marginBottom: 8 * BW()}}>
                  {fee.FieldValues.Title || fee.FieldValues?.Value}
                </Text>
              ))}
            </View>
          </Accordion>
        </>
      )}

      {serviceData?.FieldValues?.FAQ?.Question && (
        <>
          <Accordion
            title={t('FAQ')}
            showBorder
            expandedDefault={activeIndex === 4}
            onPress={() => setActiveIndex(activeIndex === 4 ? null : 4)}
            styleHeader={{
              backgroundColor: colors.white,
            }}
            styleConatiner={{
              marginTop: 10 * BW(),
              backgroundColor: colors.white,
            }}
            styleBody={{
              backgroundColor: colors.white,
            }}
            styleIcon={{tintColor: colors.secondaryColor}}>
            <View style={{padding: 16 * BW()}}>
              <Text h3 medium style={{marginBottom: 6 * BW()}}>
                {serviceData.FieldValues.FAQ.Question}
              </Text>

              {serviceData.FieldValues.FAQ.Procedures?.length > 0 && (
                <>
                  <Text h3 medium style={{marginTop: 12 * BW()}}>
                    {serviceData.FieldValues.FAQ.ProceduresTitle}
                  </Text>
                  {serviceData.FieldValues.FAQ.Procedures.map((step, i) => (
                    <Text
                      h4
                      key={i}
                      style={{
                        marginLeft: 10 * BW(),
                        marginBottom: 6 * BW(),
                      }}>
                      • {step}
                    </Text>
                  ))}
                </>
              )}

              {serviceData.FieldValues.FAQ.Answers?.length > 0 && (
                <>
                  {serviceData.FieldValues.FAQ.Answers.map((ans, i) => (
                    <Text
                      h4
                      key={i}
                      style={{
                        marginLeft: 10 * BW(),
                        marginBottom: 6 * BW(),
                      }}>
                      • {ans}
                    </Text>
                  ))}
                </>
              )}

              {serviceData.FieldValues.FAQ.Requirements?.length > 0 && (
                <>
                  <Text h3 medium style={{marginTop: 12 * BW()}}>
                    {serviceData.FieldValues.FAQ.RequirementsTitle}
                  </Text>
                  {serviceData.FieldValues.FAQ.Requirements.map((req, i) => (
                    <Text
                      h4
                      key={i}
                      style={{
                        marginLeft: 10 * BW(),
                        marginBottom: 6 * BW(),
                      }}>
                      • {req}
                    </Text>
                  ))}
                </>
              )}
            </View>
          </Accordion>
        </>
      )}

      <Line style={{marginBottom: 16 * BW()}} />
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    btnDetails: {
      height: 48 * BW(),
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 0,
      borderRadius: 0,
      flex: 1,
      marginTop: 0,
      width: '100%',
    },
    iconDetilas: {
      transform: [{rotate: !isArabic() ? '180deg' : '0deg'}],
      width: 14 * BW(),
      height: 16 * BW(),
      resizeMode: 'contain',
    },
    containerIcon: {
      width: 22 * BW(),
      height: 22 * BW(),
    },
    desc: {
      color: colors.darkGray,
    },
    line: {
      borderStyle: 'dashed',
      borderWidth: 0.4 * BW(),
      borderColor: colors.lightPrimaryTextColor,
      marginHorizontal: 6 * BW(),
    },
    btn: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 0,
      borderRadius: 0,
      flex: 1,
    },
    title: {
      color: colors.secondaryColor,
      marginStart: 8 * BW(),
    },
  });
