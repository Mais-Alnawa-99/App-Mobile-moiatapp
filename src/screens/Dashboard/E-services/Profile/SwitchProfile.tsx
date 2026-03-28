import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import Loader from '../../../../component/Loader';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {getServiceProfileData} from '../../../../redux/reducers/E-Services/thunk/profile';
import Text from '../../../../component/Text';
import {BW} from '../../../../style/theme';
import Button from '../../../../component/Button';
import {setUserDataStored} from '../../../../redux/reducers/User/userDataStored';
import {setNeedRefreshToken} from '../../../../redux/reducers/General/server';
import {isArabic} from '../../../../locales';
import NavigationService from '../../../../navigation/NavigationService';
import {createApplication} from '../../../services/Eservices/ServiceForm';
import {setLoadingService} from '../../../../redux/reducers/General/loader';
import DashedLine from '../../../../component/DashedLine';
import {parseJSON} from '../../../services/utils';
import PageBg from '../../../../component/PageBg';

export default function SelectProfile(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const [loadingState, setLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(false);
  const [noProfile, setNoProfile] = useState(false);

  const [profileData, setProfileData] = useState<any>(null);
  const style = getStyle(colors);
  const dispatch = useAppDispatch();
  const langId = isArabic() ? 2 : 1;
  const {tokenData}: any = useAppSelector(state => state.userToken);
  const {userData}: any = useAppSelector(state => state.userDataStored);

  const _getServiceProfileData = () => {
    if (!firstLoading) {
      setLoading(true);
    }
    setFirstLoading(true);
    if (params?.screen == 'ServiceForm' || params?.toScreen == 'ServiceForm') {
      dispatch(setLoadingService(true));
    }
    dispatch(
      getServiceProfileData({
        serviceId: '',
        profileRecordId: '',
      }),
    ).then(res => {
      if (res.payload.networkSuccess && !!res.payload.profileData) {
        let data = JSON.parse(res.payload?.profileData);
        if (data) {
          let object = {
            record:
              data && data[0]?.applicationRecords
                ? data[0]?.applicationRecords[0]
                : '',
            entity: data[0],
          };
          let entityHasRecords = [];
          data?.map((x: any) => {
            if (x.applicationRecords) {
              entityHasRecords.push(x.applicationRecords);
            }
          });
          if (entityHasRecords.length == 0) {
            setNoProfile(true);
          }
        }
        setLoading(false);
        setProfileData(data);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      _getServiceProfileData();
    }, [tokenData, tokenData?.access_token]),
  );

  const _switchProfile = (entity: any, app: any) => {
    dispatch(setUserDataStored({userData: {record: app, entity: entity}}));
    dispatch(setNeedRefreshToken(true));
    if (!!params?.screen || !!params?.toScreen) {
      if (
        params?.screen == 'ServiceForm' ||
        params?.toScreen == 'ServiceForm'
      ) {
        createApplication(params.serviceId, params);
      } else {
        NavigationService.replace(params?.screen, params);
      }
    }
    if (params?.toServices) {
      setTimeout(() => {
        NavigationService.goBack();
      }, 100);
    }
  };
  const {loadingService} = useAppSelector(state => state.loader);

  useEffect(() => {
    dispatch(setNeedRefreshToken(false));
  }, []);

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="es-switch-scope"
        header={<Header title={t('Labels.SwitchProfile')} showNotification />}
        onRefresh={() => _getServiceProfileData()}
        withHeader>
        <Loader
          isLoading={
            (loadingState && params?.toScreen != 'ServiceForm') ||
            (loadingService && params?.toScreen == 'ServiceForm')
          }>
          <>
            {profileData?.length > 0 ? (
              profileData?.map((entity: any, index: any) => (
                <View key={index}>
                  {entity?.applicationRecords?.length > 0 && (
                    <Text h2 bold style={style.entityTitle}>
                      {
                        entity?.entityNameTranslation.find(
                          (e: {langId: number}) => e.langId === langId,
                        )?.value
                      }
                    </Text>
                  )}

                  {entity?.applicationRecords?.length > 0 &&
                    entity?.applicationRecords.map(
                      (
                        app: {
                          fields: any[];
                          appliedApplications: any[];
                          RecordId: any;
                        },
                        i: number,
                      ) => (
                        <Animatable.View
                          key={i}
                          style={[
                            style.card,
                            userData?.record.RecordId == app?.RecordId && {
                              borderColor: colors.secondaryColor,
                              borderWidth: 1 * BW(),
                            },
                          ]}
                          animation={i % 2 == 0 ? 'fadeInRight' : 'fadeInLeft'}
                          delay={100 + 100 * index}>
                          {userData?.record.RecordId == app?.RecordId && (
                            <View
                              style={{
                                backgroundColor: colors.mainWhite,
                                position: 'absolute',
                                top: 12 * BW(),
                                right: 12 * BW(),
                                padding: 3 * BW(),
                                borderColor: colors.secondaryColor,
                                borderWidth: 4 * BW(),
                                borderRadius: 40 * BW(),
                              }}
                            />
                          )}
                          {app.fields?.map((field, j) => (
                            <Fragment key={j}>
                              <View key={j} style={style.fieldRow}>
                                <Text h4 style={style.title}>
                                  {
                                    field?.formSectionFieldName?.find(
                                      (e: {langId: number}) =>
                                        e.langId === langId,
                                    )?.value
                                  }
                                  {' :'}
                                </Text>
                                <Text h4 medium>
                                  {field?.lookupValues
                                    ? parseJSON(
                                        field?.lookupValues || '{}',
                                      ).find(
                                        (e: {LanguageId: number}) =>
                                          e.LanguageId === langId,
                                      )?.Value
                                    : field.Value}
                                </Text>
                              </View>
                              <DashedLine />
                            </Fragment>
                          ))}

                          {app.appliedApplications?.length > 0 && (
                            <View
                              style={[
                                style.serviceRow,
                                {
                                  flexDirection:
                                    app.appliedApplications.length > 1
                                      ? 'column'
                                      : 'row',
                                },
                              ]}>
                              <Text h4 medium style={style.title}>
                                {t('Labels.SelectedProfileOrganizationType')}:
                              </Text>
                              <View style={style.serviceList}>
                                {app.appliedApplications.map(
                                  (srv: any, idx: any) => (
                                    <View
                                      key={idx}
                                      style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 8 * BW(),
                                      }}>
                                      {app.appliedApplications.length > 1 && (
                                        <View
                                          style={{
                                            backgroundColor:
                                              colors.secondaryColor,
                                            width: 6 * BW(),
                                            height: 6 * BW(),
                                            borderRadius: 50,
                                          }}
                                        />
                                      )}
                                      <Text
                                        key={idx}
                                        h4
                                        style={{
                                          width:
                                            app.appliedApplications.length > 1
                                              ? '100%'
                                              : '72%',
                                        }}>
                                        {
                                          srv.serviceNameTranslations.find(
                                            (e: any) => e.langId === langId,
                                          )?.value
                                        }
                                      </Text>
                                    </View>
                                  ),
                                )}
                                {/* {app.appliedApplications.length > 2 && (
                              <TouchableOpacity
                                onPress={() =>
                                  handleOpenModal(app.appliedApplications)
                                }>
                                <Text style={style.seeMore}>...</Text>
                              </TouchableOpacity>
                            )} */}
                              </View>
                            </View>
                          )}

                          {userData?.record.RecordId != app?.RecordId && (
                            <Button
                              title={t('Button.SelectProfileButton')}
                              style={style.selectButton}
                              styleText={style.selectButtonText}
                              onPress={() => _switchProfile(entity, app)}
                              medium
                              antDesign={'arrowright'}
                              styleIcon={{
                                marginStart: 4 * BW(),
                                fontSize: 16 * BW(),
                                transform: [
                                  {rotate: isArabic() ? '180deg' : '0deg'},
                                ],
                              }}
                            />
                          )}
                        </Animatable.View>
                      ),
                    )}
                </View>
              ))
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text h3 medium>
                  {isArabic() ? 'لا يوجد بيانات' : 'No Data'}
                </Text>
              </View>
            )}
            {noProfile && (
              <Button
                style={style.createProfileBtn}
                styleText={{color: colors.mainWhite}}
                title={t('Button.CreateProfile')}
                onPress={() => NavigationService.navigate('EAllServicesPage')}
              />
            )}
            {/* <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          title={t('SelectedProfileOrganizationType')}>
          <ScrollView>
            {selectedProfile?.map((srv, idx) => (
              <Text key={idx} style={style.modalItem}>
                {
                  srv.serviceNameTranslations.find(e => e.langId === langId)
                    ?.value
                }
              </Text>
            ))}
          </ScrollView>
        </Modal> */}
          </>
        </Loader>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    entityTitle: {
      marginBottom: 4 * BW(),
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: 8 * BW(),
      padding: 12 * BW(),
      marginBottom: 12 * BW(),
    },
    fieldRow: {
      flexDirection: 'row',
      gap: 6 * BW(),
    },
    title: {
      color: colors.textColor + '99',
    },
    serviceRow: {
      flexDirection: 'row',
      gap: 6 * BW(),
    },
    serviceList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    seeMore: {
      color: '#007bff',
    },
    selectButton: {
      marginTop: 12 * BW(),
      height: 'auto',
      padding: 0 * BW(),
      flexDirection: 'row',
      width: 90 * BW(),
      // alignSelf:'flex-end'
    },
    selectButtonText: {
      color: colors.secondaryColor,
    },
    modalItem: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    line: {
      borderColor: '#D4DDEA',
      borderWidth: 0.6 * BW(),
      height: 0 * BW(),
      borderStyle: 'dashed',
      marginVertical: 6 * BW(),
    },
    createProfileBtn: {
      backgroundColor: colors.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 60 * BW(),
      height: 46 * BW(),
      marginHorizontal: 20 * BW(),
    },
  });
