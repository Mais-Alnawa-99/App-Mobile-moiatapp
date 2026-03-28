import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {BW} from '../../../../style/theme';
import {getFactoryDetails} from '../../../../redux/reducers/I-Services/thunk/profile';
import Text from '../../../../component/Text';
import Loader from '../../../../component/Loader';
import PageBg from '../../../../component/PageBg';
import Accordion from '../../../../component/Accordion';
import Location from '../../../../component/Location';
import DashedLine from '../../../../component/DashedLine';
import moment from 'moment';
import {isArabic} from '../../../../locales';
import MyLocation from '../../../../component/MyLocation';
import {getLicenseData} from '../../../../redux/reducers/I-Services/thunk/ILFormService';

export default function FactoryDetails(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const [factoryDetails, setFactoryDetails]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<{
    [key: number]: boolean;
  }>({1: true});
  const dispatch = useAppDispatch();
  const {userILData, userId}: any = useAppSelector(store => store.userILData);

  const toggleGroup = (id: number) => {
    setExpandedGroups(prev => ({...prev, [id]: !prev[id]}));
  };

  const _getLicenseData = () => {
    setIsLoading(true);
    dispatch(
      getLicenseData({
        licenseId: userILData?.Id,
      }),
    ).then(res => {
      setIsLoading(false);
      if (res.payload?.networkSuccess) {
        setFactoryDetails(res.payload?.Data?.data);
      } else {
        setFactoryDetails({});
      }
    });
  };

  useEffect(() => {
    _getLicenseData();
  }, []);

  const renderRow = (label: string, value: any) => (
    <View style={style.row}>
      <Text h4 style={style.labelText}>
        {label} :
      </Text>
      <Text h4 style={style.valueText}>
        {value}
      </Text>
    </View>
  );

  return (
    <PageBg>
      <Page
        withStatusBar
        onRefresh={_getLicenseData}
        ttsScopeId="il-facdet-scope"
        header={<Header title={t('IL.FactoryProfile')} />}
        withHeader>
        <Loader isLoading={isLoading}>
          {!isLoading && factoryDetails?.TradeNameEn && (
            <View>
              <Text h2 bold style={{marginBottom: 8 * BW()}}>
                {isArabic()
                  ? factoryDetails.TradeNameAr
                  : factoryDetails.TradeNameEn}
              </Text>
              <View style={style.container}>
                {renderRow(
                  t('IL.RecordNumber'),
                  factoryDetails.RecordNumber || '33333',
                )}
                {renderRow(
                  t('IL.RecordDate'),
                  moment(factoryDetails.RegistrationDate).format('DD MMM YYYY'),
                )}
                {renderRow(
                  t('IL.ExpiryDate'),
                  moment(factoryDetails.ExpiryDate).format('DD MMM YYYY'),
                )}
                {renderRow(
                  t('IL.LicenseStatus'),
                  factoryDetails.LicenseStatusText,
                )}
              </View>
              <DashedLine />
              <View style={style.container}>
                <Text h4 bold>
                  {t('IL.FD.LocalAuthority')}
                </Text>
                {renderRow(t('IL.Emirates'), factoryDetails.Emirate.Name)}
                {renderRow(
                  t('IL.FD.LocalAuthority'),
                  factoryDetails.LocalAuthority.Name,
                )}
                {renderRow(
                  t('IL.FD.LocalLicenseNumber'),
                  factoryDetails.LocalIndustrialLicenseNumber,
                )}
              </View>
              <DashedLine />
              <View style={style.container}>
                <Text h4 bold>
                  {t('IL.FactoryData')}
                </Text>
                {renderRow(
                  t('IL.FormLabels.LegalEntity'),
                  factoryDetails.LegalEntity.Name,
                )}
                {renderRow(t('IL.FD.City'), factoryDetails.City.Name)}
                {renderRow(t('IL.FD.Area'), factoryDetails.Area.Name)}
                {renderRow(t('PhoneNumber'), factoryDetails.PhoneNumber)}
                {renderRow(t('IL.FactoryEmail'), factoryDetails.FactoryEmail)}
                {renderRow(
                  t('IL.FD.FactoryEstablishmentDate'),
                  moment(factoryDetails.LocalIndustrialLicenseIssueDate).format(
                    'DD MMM YYYY',
                  ),
                )}
                {renderRow(
                  t('IL.FD.LocalIndustrialLicenseExpiryDate'),
                  moment(
                    factoryDetails.LocalIndustrialLicenseExpiryDate,
                  ).format('DD MMM YYYY'),
                )}
                {/* <Location
                    label={t('IL.Sitemap')}
                    styleLabel={{color: colors?.darkGray}}
                    styleContainer={{marginTop: 0}}
                    isDisabled={true}
                    initLocation={{
                      latitude: Number(factoryDetails.Latitude || 0),
                      longitude: Number(factoryDetails.Longitude || 0),
                    }}
                    isInitLocation={true}
                  /> */}
                <MyLocation
                  styleContainer={{marginTop: 11 * BW()}}
                  style={{marginBottom: 8 * BW()}}
                  label={t('IL.Sitemap')}
                  styleLabel={{color: colors.text}}
                  redStar
                  isDisabled={true}
                  is_expand
                  onPress={() => {}}
                  hideSearch={true}
                  press={false}
                  styleAddress={{marginLeft: 0, flex: 1}}
                  readOnly
                />
                {renderRow(
                  t('IL.FD.TotalCapitalInvestment'),
                  factoryDetails.TotalCapitalInvestment,
                )}
                {renderRow(t('IL.FD.FactoryArea'), factoryDetails.FactoryArea)}
              </View>
              <DashedLine />
              {factoryDetails.ManagerDetails &&
                factoryDetails.ManagerDetails.length > 0 &&
                factoryDetails.ManagerDetails?.map((manager: any) => (
                  <>
                    <View style={style.container}>
                      <Text h4 bold>
                        {t('IL.FactoryManagerInformation')}
                      </Text>

                      {renderRow(
                        t('IL.FD.Representative'),
                        factoryDetails.ManagerName,
                      )}
                      {renderRow(
                        t('Nationality'),
                        factoryDetails.ManagerNationality,
                      )}
                      {renderRow(
                        t('IL.Mobile_Phone'),
                        factoryDetails.ManagerMobileNumber,
                      )}
                      {renderRow(
                        t('EmailAddress'),
                        factoryDetails.ManagerEmailAddress,
                      )}
                      {renderRow(t('Gender'), factoryDetails.ManagerGenderId)}
                      {renderRow(
                        t('IL.IdNumber'),
                        factoryDetails.ManagerIdentificationNumber,
                      )}
                      {renderRow(
                        t('IL.IdExpirationDate'),
                        factoryDetails.ManagerIdentificationExpirationDate,
                      )}
                    </View>
                    <DashedLine />
                  </>
                ))}

              {[
                {
                  id: 1,
                  title: t('IL.Activities'),
                  data: factoryDetails.Activities,
                  customRender: () => {
                    const activities = factoryDetails.Activities || [];

                    return (
                      <View style={{gap: 12 * BW()}}>
                        {activities.map((act: any, index: number) => (
                          <View key={act.MainActivity?.ActivityId || index}>
                            <View style={style.rowCenter}>
                              <View style={style.dot} />
                              <Text h4 medium>
                                {act.MainActivity?.ISIC4} -{' '}
                                {act.MainActivity?.Name}
                              </Text>
                            </View>

                            {act.SubActivityList?.map((sub: any, i: number) => (
                              <Text
                                key={sub.ActivityId}
                                h4
                                style={{
                                  ...style.valueText,
                                  marginStart: 8 * BW(),
                                  marginTop: 4 * BW(),
                                }}>
                                {sub.ISIC4} - {sub.Name}
                              </Text>
                            ))}
                          </View>
                        ))}
                      </View>
                    );
                  },
                },
                {
                  id: 2,
                  title: t('IL.OwnerDetails'),
                  data: factoryDetails.Owners,
                  renderItem: (o: any, i: number) => (
                    <View style={{gap: 4 * BW()}}>
                      <View style={style.rowCenter}>
                        <View style={style.dot} />
                        <Text h4 medium style={style.valueText}>
                          {o.PersonName}
                        </Text>
                      </View>
                      {renderRow(
                        t('IL.FD.CompanyNameArabic'),
                        o.PersonNameArabic,
                      )}
                      {renderRow(t('IL.FD.Country'), o.Nationality?.Name)}
                      {renderRow(
                        t('IL.FD.ContributionAmount'),
                        o.PersonContributionAmount,
                      )}
                      {renderRow(t('IL.FD.Percentage'), o.PersonPercentage)}
                    </View>
                  ),
                },
                {
                  id: 3,
                  title: t('IL.FD.ListExemptedMaterials'),
                  data: factoryDetails.LicenseExemptedMaterialDto,
                  renderItem: (p: any, i: number) => (
                    <View
                      key={i}
                      style={{
                        marginBottom:
                          i ==
                          (factoryDetails?.LicenseExemptedMaterialDto?.length ||
                            1) -
                            1
                            ? 0
                            : 16 * BW(),
                        gap: 8 * BW(),
                      }}>
                      <View style={style.rowCenter}>
                        <View style={style.dot} />
                        <Text h4 medium style={style.valueText}>
                          {p.HSCodeTitle}
                        </Text>
                      </View>
                      {renderRow(t('IL.FD.TotalQuantity'), p.TotalQuantity)}
                      {renderRow(
                        t('IL.FD.RemainingQuantity'),
                        p.RemainingQuantity,
                      )}
                    </View>
                  ),
                },
                {
                  id: 4,
                  title: t('IL.Products'),
                  data: factoryDetails.Products,

                  renderItem: (p: any, i: number) => (
                    <View
                      key={i}
                      style={{
                        marginBottom:
                          i == (factoryDetails?.Products?.length || 1) - 1
                            ? 0
                            : 16 * BW(),
                        gap: 8 * BW(),
                      }}>
                      <View style={style.rowCenter}>
                        <View style={style.dot} />
                        <Text h4 medium style={style.valueText}>
                          {p.HSCodeTitle}
                        </Text>
                      </View>
                      {renderRow(
                        t('IL.FD.TotalValueOfProduction'),
                        p.AnnualProductionValueinAED,
                      )}
                      {renderRow(
                        t('IL.FD.TotalQuantityOfProductionInKg'),
                        p.ActualProductionCapacityinkgyear,
                      )}
                    </View>
                  ),
                },
                {
                  id: 5,
                  title: t('IL.EmployeesDetails'),
                  data: factoryDetails.Employees,
                  renderItem: (e: any, i: number) => (
                    <View
                      key={i}
                      style={{
                        marginBottom:
                          i == (factoryDetails?.Employees?.length || 1) - 1
                            ? 0
                            : 16 * BW(),
                        gap: 8 * BW(),
                      }}>
                      {renderRow(t('numberofEmployees'), e?.numberofEmployees)}
                      {renderRow(
                        t('IL.FD.NumberOfMaleEmployee'),
                        e?.numberofMaleEmployees,
                      )}
                      {renderRow(
                        t('IL.FD.NumberOfFemaleEmployee'),
                        e?.numberofFemaleEmployees,
                      )}
                      {renderRow(t('Nationality'), e?.nationality.Name)}
                    </View>
                  ),
                },
                {
                  id: 6,
                  title: t('IL.MachineryEquipments'),
                  data: factoryDetails?.Machines,
                  renderItem: (m: any, i: number) => (
                    <View
                      key={i}
                      style={{
                        marginBottom:
                          i == (factoryDetails?.Machines?.length || 1) - 1
                            ? 0
                            : 16 * BW(),
                        gap: 8 * BW(),
                      }}>
                      <View style={style.rowCenter}>
                        <View style={style.dot} />
                        <Text h4 medium style={style.valueText}>
                          {m?.HSCode} | {m?.HSCodeTitle}
                        </Text>
                      </View>
                      {renderRow(t('IL.Status'), m?.Status?.Name)}
                      {renderRow(
                        t('IL.CountryOfOrigin'),
                        m?.CountryofOrigin?.Name,
                      )}
                      {renderRow(
                        t('Numberofmachinesofthesametype'),
                        m?.Quantity,
                      )}
                    </View>
                  ),
                },
                {
                  id: 7,
                  title: t('IL.RawMaterials'),
                  data: factoryDetails.RawMaterials,
                  renderItem: (r: any, i: number) => (
                    <View
                      key={i}
                      style={{
                        marginBottom:
                          i == (factoryDetails?.RawMaterials?.length || 1) - 1
                            ? 0
                            : 16 * BW(),
                        gap: 8 * BW(),
                      }}>
                      <View style={style.rowCenter}>
                        <View style={style.dot} />
                        <Text h4 medium style={style.valueText}>
                          {r.HSCode + r.HSCodeTitle}
                        </Text>
                      </View>

                      {renderRow(
                        t('IL.CountryOfOrigin'),
                        r.CountryOfOrigin?.Name,
                      )}
                      {renderRow(t('IL.FD.QuantityInKGPerYear'), r.Quantity)}
                      {renderRow(t('IL.FD.MaterialUsage'), r.MaterialUsage)}
                    </View>
                  ),
                },
                {
                  id: 8,
                  title: t('IL.FinancialStatements'),
                  data: Object.entries(factoryDetails).filter(
                    ([key, val]) =>
                      [
                        'AnnualSales',
                        'FinishedGoodsOpeningStock',
                        'FinishedGoodsClosingStock',
                        'NetProfit',
                        'WagesandSalaries',
                        'ValueofBuildings',
                        'DepreciationofBuilding',
                        'ValueofMachinery',
                        'DepreciationofMachinery',
                        'BuildingRent',
                        'RentOfWarehousesForTheFactory',
                        'RentOfLaborAccommodation',
                        'ValueofLongtermLoans',
                        'InterestPaidofLongterms',
                        'AdministrationandGeneralExpenses',
                        'PatentCost',
                      ].includes(key) &&
                      val !== null &&
                      val !== undefined,
                  ),
                  renderItem: ([key, val]: [string, any], i: number) => (
                    <View key={key} style={{marginTop: 4 * BW()}}>
                      <View style={style.rowCenter}>
                        <View style={style.dot} />
                        {renderRow(t(`IL.FD.${key}`), val)}
                      </View>
                    </View>
                  ),
                },
              ].map(
                group =>
                  group.data?.length > 0 && (
                    <Accordion
                      key={group.id}
                      title={group.title}
                      bold
                      expandedDefault={expandedGroups[group.id]}
                      onPress={() => toggleGroup(group.id)}
                      styleHeader={{backgroundColor: colors.white}}
                      styleBody={{
                        paddingVertical: 16 * BW(),
                        paddingHorizontal: 16 * BW(),
                        backgroundColor: colors.white + '99',
                      }}
                      styleIcon={{tintColor: colors.secondaryColor}}
                      styleTilte={{
                        color: expandedGroups[group.id]
                          ? colors.secondaryColor
                          : colors.textPrimaryColor,
                      }}
                      showBorder
                      styleConatiner={{marginBottom: 8 * BW()}}>
                      {group?.renderItem && (
                        <View>{group.data.map(group?.renderItem)}</View>
                      )}
                      {group.customRender && group.customRender()}
                    </Accordion>
                  ),
              )}
            </View>
          )}
        </Loader>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8 * BW(),
    },
    rowCenter: {
      gap: 8 * BW(),
      alignItems: 'center',
      flexDirection: 'row',
    },
    labelText: {
      color: colors.darkGray,
    },
    valueText: {
      color: colors.text,
    },
    container: {
      gap: 16 * BW(),
    },
    dot: {
      width: 8 * BW(),
      height: 8 * BW(),
      backgroundColor: colors.secondaryColor,
      borderRadius: 50,
    },
  });
