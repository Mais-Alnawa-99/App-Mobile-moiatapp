import React from 'react';
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

export default function AboutServiceSection(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);
  const {tokenData}: any = useAppSelector(store => store.userToken);
  const dispatch = useAppDispatch();
  const serviceData = props.data;

  return (
    <>
      {serviceData?.FieldValues?.Description && (
        <>
          <Line style={{...style.line, marginTop: 16 * BW()}} />
          <View style={{width: '100%'}}>
            <Button
              title={t('AboutTheService')}
              style={style.btnDetails}
              icon={require('../../../assets/icons/back.png')}
              onPress={() =>
                dispatch(
                  openBottomSheet({
                    content: (
                      <View style={{padding: 20 * BW()}}>
                        <Text h2 bold>
                          {t('AboutTheService')}
                        </Text>
                        <Text h3 style={style.desc}>
                          {serviceData.FieldValues.Description}
                        </Text>
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
                    ),
                  }),
                )
              }
              containerIcon={style.iconDetilas}
            />
          </View>
        </>
      )}

      {serviceData?.FieldValues?.Procedures?.length > 0 && (
        <>
          <Line style={style.line} />
          <View style={{width: '100%'}}>
            <Button
              title={t('ServiceProcedure')}
              style={style.btnDetails}
              icon={require('../../../assets/icons/back.png')}
              onPress={() =>
                dispatch(
                  openBottomSheet({
                    content: (
                      <View style={{padding: 20 * BW()}}>
                        {serviceData.FieldValues.Procedures.map(
                          (item, index) => (
                            <Text
                              h4
                              key={index}
                              style={{marginBottom: 8 * BW()}}>
                              • {item.FieldValues?.Title}
                            </Text>
                          ),
                        )}
                      </View>
                    ),
                  }),
                )
              }
              containerIcon={style.iconDetilas}
            />
          </View>
        </>
      )}

      {serviceData?.FieldValues?.Requirements?.length > 0 && (
        <>
          <Line style={style.line} />
          <View style={{width: '100%'}}>
            <Button
              title={t('RequiredDocuments')}
              style={style.btnDetails}
              icon={require('../../../assets/icons/back.png')}
              onPress={() =>
                dispatch(
                  openBottomSheet({
                    content: (
                      <View style={{padding: 20 * BW()}}>
                        {serviceData.FieldValues.Requirements.map(
                          (item, index) => (
                            <Text
                              h4
                              key={index}
                              style={{marginBottom: 8 * BW()}}>
                              • {item.FieldValues?.Title}
                            </Text>
                          ),
                        )}
                      </View>
                    ),
                  }),
                )
              }
              containerIcon={style.iconDetilas}
            />
          </View>
        </>
      )}

      {/* {serviceData?.FieldValues?.Files?.length > 0 && (
        <>
          <Line style={style.line} />
          <View style={{width: '100%'}}>
            <Button
              title={t('ConditionsOfUse')}
              style={style.btnDetails}
              icon={require('../../../assets/icons/back.png')}
              onPress={() =>
                dispatch(
                  openBottomSheet({
                    content: (
                      <View style={{padding: 20 * BW()}}>
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
          <Line style={style.line} />
          <View style={{width: '100%'}}>
            <Button
              title={t('ServiceFees')}
              style={style.btnDetails}
              icon={require('../../../assets/icons/back.png')}
              onPress={() =>
                dispatch(
                  openBottomSheet({
                    content: (
                      <View style={{padding: 20 * BW()}}>
                        {serviceData.FieldValues.Fees.map((fee, i) => (
                          <Text h4 key={i} style={{marginBottom: 8 * BW()}}>
                            • {fee.FieldValues.Title} - {fee.FieldValues.Value}
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
      )}

      {serviceData?.FieldValues?.FAQ?.Question && (
        <>
          <Line style={style.line} />
          <View style={{width: '100%'}}>
            <Button
              title={t('FAQ')}
              style={style.btnDetails}
              icon={require('../../../assets/icons/back.png')}
              onPress={() =>
                dispatch(
                  openBottomSheet({
                    content: (
                      <View style={{padding: 20 * BW()}}>
                        <Text h3 style={{marginBottom: 10 * BW()}}>
                          {serviceData.FieldValues.FAQ.Question}
                        </Text>

                        {serviceData.FieldValues.FAQ.Procedures?.length > 0 && (
                          <>
                            <Text h3 style={{marginTop: 10 * BW()}}>
                              {serviceData.FieldValues.FAQ.ProceduresTitle}
                            </Text>
                            {serviceData.FieldValues.FAQ.Procedures.map(
                              (step, i) => (
                                <Text
                                  h4
                                  key={i}
                                  style={{
                                    marginLeft: 10 * BW(),
                                    marginBottom: 6 * BW(),
                                  }}>
                                  • {step}
                                </Text>
                              ),
                            )}
                          </>
                        )}
                        {serviceData.FieldValues.FAQ.Answers?.length > 0 && (
                          <>
                            {serviceData.FieldValues.FAQ.Answers.map(
                              (ans, i) => (
                                <Text
                                  h4
                                  key={i}
                                  style={{
                                    marginLeft: 10 * BW(),
                                    marginBottom: 6 * BW(),
                                  }}>
                                  • {ans}
                                </Text>
                              ),
                            )}
                          </>
                        )}
                        {serviceData.FieldValues.FAQ.Requirements?.length >
                          0 && (
                          <>
                            <Text h3 style={{marginTop: 15 * BW()}}>
                              {serviceData.FieldValues.FAQ.RequirementsTitle}
                            </Text>
                            {serviceData.FieldValues.FAQ.Requirements.map(
                              (req, i) => (
                                <Text
                                  h4
                                  key={i}
                                  style={{
                                    marginLeft: 10 * BW(),
                                    marginBottom: 6 * BW(),
                                  }}>
                                  • {req}
                                </Text>
                              ),
                            )}
                          </>
                        )}
                      </View>
                    ),
                  }),
                )
              }
              containerIcon={style.iconDetilas}
            />
          </View>
        </>
      )}

      <Line style={{...style.line, marginBottom: 16 * BW()}} />
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    btnDetails: {
      height: 48 * BW(),
      backgroundColor: 'transparent',
      flexDirection: 'row-reverse',
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
      marginTop: 20 * BW(),
      marginEnd: 50 * BW(),
    },
    line: {
      marginVertical: 0,
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
