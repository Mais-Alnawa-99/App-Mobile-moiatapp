import {t} from 'i18next';
import {isArabic} from '../../../../../locales';
import reactotron from 'reactotron-react-native';

export function transformFactoryData(data: any) {
  // const data = input?.factoryData || {};
  // "userId": "4DEF6CD6-5ABF-4232-BB3A-C886617858EA",
  //     "licenseId": "C74039C1-7B8C-4A7B-B72C-23BA8A659A94",
  const materialCost = {
    PrimaryRawMaterials: '0',
    AxillaryRawMaterials: '0',
    SemiFinishedRawMaterials: '0',
    PackagingMaterials: '0',
    Utility: '0',
    TotalCost: '0',
  };
  return {
    Id: data?.Id,
    LicenseId: data?.LicenseId,
    UserId: data?.UserId,
    FormId: data?.FormId,
    isDraft: data?.isDraft || 0,
    emirateId: data?.Emirate?.Id,
    localLicensingAuthorityId: data?.LocalAuthority?.value,
    localIndustrialLicenseNumber: data?.LocalIndustrialLicenseNumber,
    localIndustrialLicenseIssueDate: data?.LocalIndustrialLicenseIssueDate,
    localIndustrialLicenseExpiryDate: data?.LocalIndustrialLicenseExpiryDate,
    TradeNameEn: data?.TradeNameEn,
    TradeNameAr: data?.TradeNameAr,
    FactoryEmail: data?.FactoryEmail,
    LegalEntityId: data?.LegalEntity?.Id,
    CityId: data?.FactoryCity?.Id,
    AreaId: data?.Area?.Id,
    Address: data?.Address,
    FactoryWebsite: data?.FactoryWebsite,
    FactoryArea: data?.FactoryArea,
    PhoneNumber: data?.PhoneNumber,
    FactoryLocatorOnline: data?.FactoryLocatorOnline,
    TotalCapitalInvestment: data?.TotalCapitalInvestment,
    Latitude: data?.Latitude,
    Longitude: data?.Longitude,
    LocalIndustrialLicenseAttachment: data?.CopyLocalIndustrialLicense?.map(
      attach => {
        return {
          type: attach.type,
          name: attach.name,
          isnew: data?.FormId === '19' && !data?.Id ? true : attach.isnew,
          base64: attach.base64,
        };
      },
    ),

    MemorandumofAssociationAttachment: data?.MemorandumofAssociation?.map(
      attach => {
        return {
          type: attach.type,
          name: attach.name,
          isnew: data?.FormId === '19' && !data?.Id ? true : attach.isnew,
          base64: attach.base64,
        };
      },
    ),
    ManagerName: data?.FactoryManagerName,
    ManagerNationalityId: data?.Nationality?.Id,
    ManagerMobileNumber: data?.MobileNumber,
    ManagerEmailAddress: data?.EmailAddress,
    ManagerGenderId: data?.ManagerGender?.value,
    ManagerIdentificationExpirationDate:
      data?.ManagerIdentificationExpirationDate,
    ManagerIdentificationNumber: data?.ManagerIdentificationNumber,
    ManagerIdentificationAttachment: data?.ManagerIdentificationCopy?.map(
      attach => {
        return {
          type: attach.type,
          name: attach.name,
          isnew: data?.FormId === '19' && !data?.Id ? true : attach.isnew,

          base64: attach.base64,
        };
      },
    ),
    annualSales: Number(data?.annualSales) || 0,
    finishedGoodsOpeningStock: Number(data?.finishedGoodsOpeningStock) || 0,
    finishedGoodsClosingStock: Number(data?.finishedGoodsClosingStock) || 0,
    netProfit: Number(data?.netProfit) || 0,
    wagesandSalaries: Number(data?.wagesandSalaries) || 0,
    valueofBuildings: Number(data?.valueofBuildings) || 0,
    depreciationofBuilding: Number(data?.depreciationofBuilding) || 0,
    valueofMachinery: Number(data?.valueofMachinery) || 0,
    depreciationofMachinery: Number(data?.depreciationofMachinery) || 0,
    buildingRent: Number(data?.buildingRent) || 0,
    rentOfWarehousesForTheFactory:
      Number(data?.rentOfWarehousesForTheFactory) || 0,
    rentOfLaborAccommodation: Number(data?.rentOfLaborAccommodation) || 0,
    valueofLongtermLoans: Number(data?.valueofLongtermLoans) || 0,
    interestPaidofLongterms: Number(data?.interestPaidofLongterms) || 0,
    administrationandGeneralExpenses:
      Number(data?.administrationandGeneralExpenses) || 0,
    patentCost: Number(data?.patentCost) || 0,
    Products: data?.Products?.map(p => {
      return {
        HScodeId: p.HSCodeHSCodesListxlsx?.Id,
        AnnualProductionValueinAED: p.AnnualProductionValueinAED,
        Designedproductioncapacityinkgyear:
          p.Designedproductioncapacityinkgyear,
        ActualProductionCapacityinkgyear: p.ActualProductionCapacityinkgyear,
      };
    }),

    RawMaterials: data?.RawMaterials?.map(rw => {
      return {
        CategoryId: rw.Category?.value,
        HScodeId: rw.HSCodeHSCodesListxlsx?.Id,
        Quantity: rw.Quantity,
        MaterialUsage: rw.MaterialUsage,
        productsMaidByRawMaterial: rw.productsMaidByRawMaterial,
        Value: rw.Value,
        CountryOfOriginId: rw.CountryOfOriginId?.value,
        LocalGulfOriginForeign: rw.LocalGulfOriginForeign,
        LocalGulfOriginForeignValue: rw.LocalGulfOriginForeignValue,
      };
    }),

    ForeignMaterials:
      data?.ForeignMaterialsCost && data?.ForeignMaterialsCost?.length > 0
        ? {
            PrimaryRawMaterials: data?.ForeignMaterialsCost[0].sum,
            AxillaryRawMaterials: data?.ForeignMaterialsCost[1].sum,
            SemiFinishedRawMaterials: data?.ForeignMaterialsCost[2].sum,
            PackagingMaterials: data?.ForeignMaterialsCost[3].sum,
            Utility: data?.ForeignMaterialsCost[4].sum,
            TotalCost:
              data?.ForeignMaterialsCost[data.ForeignMaterialsCost.length - 1]
                .sum,
          }
        : materialCost,
    LocalMaterialsCost:
      data?.LocalMaterialsCost && data?.LocalMaterialsCost?.length > 0
        ? {
            PrimaryRawMaterials: data?.LocalMaterialsCost[0].sum,
            AxillaryRawMaterials: data?.LocalMaterialsCost[1].sum,
            SemiFinishedRawMaterials: data?.LocalMaterialsCost[2].sum,
            PackagingMaterials: data?.LocalMaterialsCost[3].sum,
            Utility: data?.LocalMaterialsCost[4].sum,
            TotalCost:
              data?.LocalMaterialsCost[data.ForeignMaterialsCost.length - 1]
                .sum,
          }
        : materialCost,
    monthlyElectricityConsumptioninKWH:
      Number(data?.monthlyElectricityConsumptioninKWH) || 0,
    monthlyElectricityConsumptionChargesinAED:
      Number(data?.monthlyElectricityConsumptionChargesinAED) || 0,
    monthlyWaterConsumptionGallon:
      Number(data?.monthlyWaterConsumptionGallon) || 0,
    monthlyWaterConsumptionChargesinAED:
      Number(data?.monthlyWaterConsumptionChargesinAED) || 0,
    monthlyGasConsumptionMMBTU: Number(data?.monthlyGasConsumptionMMBTU) || 0,
    monthlyGasConsumptionChargesinAED:
      Number(data?.monthlyGasConsumptionChargesinAED) || 0,
    Machines: data?.Machines?.map(m => {
      return {
        HScodeId: m.HSCodeHSCodesListxlsx?.Id,
        CountryofOriginId: m.CountryofOrigin?.value,
        StatusId: m.Status?.value,
        Numberofmachinesofthesametype: m.Numberofmachinesofthesametype,
        productsMaidByRawMaterial: m.productsMaidByRawMaterial,
        TotalValue: m.TotalValue,
      };
    }),

    DoYouHaveManager: data?.DoYouHaveManager?.value ? 'Y' : 'N',
    Activities: data?.Activities?.map(ac => {
      return {
        MainActivityId: ac.MainActivity.id,
        SubActivityIds: ac.SubActivity.map(sac => {
          return {
            id: sac.id,
          };
        }),
      };
    }),

    Owners: data?.Owners?.map(o => {
      return {
        CompanyName: o.CompanyName,
        CompanyNameArabic: o.CompanyNameArabic,
        CompanyNationalityId: o.Nationality?.value,
        CompanyLocalLicenseNumber: o.CompanyLocalLicenseNumber,
        CompanyPercentage: o.CompanyPercentage,
        CompanyContributionAmount: o.CompanyContributionAmount,
        CompanyLocalLicenseAttachment: o.CompanyLocalLicenseAttachment?.map(
          att => {
            return {
              name: att.name,
              type: att.type,
              isnew: data?.FormId === '19' && !data?.Id ? true : attach.isnew,
              base64: att.base64,
            };
          },
        ),
        CompanyEstablishmentContractAttachment:
          o.CompanyEstablishmentContractAttachment?.map(att => {
            return {
              name: att.name,
              type: att.type,
              isnew: data?.FormId === '19' && !data?.Id ? true : attach.isnew,
              base64: att.base64,
            };
          }),

        PersonName: o.PersonName,
        PersonNameArabic: o.PersonNameArabic,
        PersonNationalityId: o.Nationality?.value,
        PersonEmiratesID: o.PersonEmiratesID,
        PersonPercentage: o.PersonPercentage,
        PersonContributionAmount: o.PersonContributionAmount,
        OwnerGenderId:
          typeof o.OwnerGenderId === 'string'
            ? o.OwnerGenderId
            : o.OwnerGender?.value,
        PersonEmiratesIdAttachment: o.PersonEmiratesIdAttachment?.map(att => {
          return {
            name: att.name,
            type: att.type,
            isnew: data?.FormId === '19' && !data?.Id ? true : attach.isnew,
            base64: att.base64,
          };
        }),
        PersonPassportAttachment: o.PersonPassportAttachment?.map(att => {
          return {
            name: att.name,
            type: att.type,
            isnew: data?.FormId === '19' && !data?.Id ? true : attach.isnew,
            base64: att.base64,
          };
        }),
        PersonVisaExpatsAttachment: o.PersonVisaExpatsAttachment?.map(att => {
          return {
            name: att.name,
            type: att.type,
            isnew: data?.FormId === '19' && !data?.Id ? true : attach.isnew,
            base64: att.base64,
          };
        }),
        IsUAENational: o.IsUAENational,
        OwnerTypeId: o.OwnerTypeId,
        type: o.type,
      };
    }),
    Employees: data?.Employees?.map(emp => {
      return {
        nationalityId: emp.nationality?.value,
        numberofFemaleEmployees: emp.numberofFemaleEmployees,
        numberofMaleEmployees: emp.numberofMaleEmployees,
        numberofEmployees: emp.numberofEmployees,
      };
    }),
    NumberofEmployeesLocal: data?.numberofEmployeesLocal,
    NumberofEmployeesGCC: data?.numberofEmployeesGCC,
    NumberofEmployeesForeign: data?.numberofEmployeesForeign,
    TotalNumberOfEmployees: data?.totalNumberofEmployees || '0',
    TotalProductionCost: data?.TotalProductionCost || '0',
  };
}

const getBase64FileSize = (base64: string): number => {
  // remove the base64 mime prefix if present (e.g. "data:application/pdf;base64,")
  let cleaned = base64?.split?.(',').pop?.() || base64;

  // calculate padding
  let padding = 0;
  if (cleaned?.endsWith?.('==')) {
    padding = 2;
  } else if (cleaned?.endsWith?.('=')) {
    padding = 1;
  }

  // calculate size
  const sizeInBytes = (cleaned?.length * 3) / 4 - padding;

  return sizeInBytes;
};

export function mapUpdateData(data: any) {
  const genders = [
    {label: data?.isArabic ? 'ذكر' : 'Male', value: 'M'},
    {label: data?.isArabic ? 'أنثى' : 'Female', value: 'F'},
  ];
  const managerOptions = [
    {label: t('IL.Yes'), value: true},
    {label: t('IL.No'), value: false},
  ];
  const newMappedData = {
    LicenseId: data?.licenseID,
    UserId: data?.userId,
    FormId: data?.serviceId,
    isDraft: data?.IsDraft || data?.isDraft || 0,
    Emirate: {
      ...data.Emirate,
      label: data?.Emirate?.Name,
      value: data?.Emirate?.Id,
    },
    LocalAuthority: {
      ...data.LocalAuthority,
      label: data?.LocalAuthority?.Name,
      value: data?.LocalAuthority?.Id,
    },
    LocalIndustrialLicenseNumber: data?.LocalIndustrialLicenseNumber,
    LocalIndustrialLicenseIssueDate:
      data?.LocalIndustrialLicenseIssueDate?.split('T')[0] || '',
    LocalIndustrialLicenseExpiryDate:
      data?.LocalIndustrialLicenseExpiryDate?.split('T')[0] || '',
    TradeNameEn: data?.TradeNameEn || '',
    TradeNameAr: data?.TradeNameAr || '',
    FactoryEmail: data?.FactoryEmail || '',
    LegalEntity: {
      ...data.LegalEntity,
      label: data?.LegalEntity?.Name,
      value: Number(data.LegalEntity?.Id),
    },
    FactoryCity: {...data.City, label: data?.City?.Name, value: data?.City?.Id},
    Area: {...data.Area, label: data?.Area?.Name, value: data?.Area?.Id},
    Address: data?.Address || '',
    FactoryWebsite: data?.FactoryWebsite || '',
    FactoryArea: data?.FactoryArea || '',
    PhoneNumber: data?.PhoneNumber || '',
    FactoryLocatorOnline:
      data?.FactoryLocatorOnline ||
      `${data.Latitude ? data?.Latitude : ''},${
        data?.Longitude ? data?.Longitude : ''
      }`,
    TotalCapitalInvestment: data?.TotalCapitalInvestment || '',
    Latitude: data?.Latitude || '',
    Longitude: data?.Longitude || '',
    CopyLocalIndustrialLicense: data?.LocalIndustrialLicenseAttachment
      ? data?.LocalIndustrialLicenseAttachment.map((attach: any) => {
          const sizeBytes = attach.base64
            ? getBase64FileSize(attach.base64)
            : 0;
          return {...attach, size: sizeBytes};
        })
      : [],

    MemorandumofAssociation: data?.MemorandumofAssociationAttachment
      ? data?.MemorandumofAssociationAttachment.map((attach: any) => {
          const sizeBytes = attach.base64
            ? getBase64FileSize(attach.base64)
            : 0;
          return {...attach, size: sizeBytes};
        })
      : [],
    FactoryManagerName: data?.ManagerName || '',
    Nationality: data?.ManagerNationality
      ? {
          ...data.ManagerNationality,
          label: data?.ManagerNationality.Name,
          value: data?.ManagerNationality?.Id,
        }
      : {},
    MobileNumber: data?.ManagerMobileNumber || '',
    EmailAddress: data?.ManagerEmailAddress || '',
    ManagerGender: data?.ManagerGenderId
      ? data?.ManagerGenderId == 'M'
        ? genders[0]
        : genders[1]
      : {},
    ManagerIdentificationExpirationDate:
      data?.ManagerIdentificationExpirationDate?.split('T')[0] || '',
    ManagerIdentificationNumber: data?.ManagerIdentificationNumber || '',
    ManagerIdentificationCopy: data?.ManagerIdentificationAttachment
      ? data?.ManagerIdentificationAttachment.map((attach: any) => {
          const sizeBytes = attach.base64
            ? getBase64FileSize(attach.base64)
            : 0;
          return {...attach, size: sizeBytes};
        })
      : [],
    annualSales: data?.AnnualSales?.toString() || '',
    finishedGoodsOpeningStock:
      data?.FinishedGoodsOpeningStock?.toString() || '',
    finishedGoodsClosingStock:
      data?.FinishedGoodsClosingStock?.toString() || '',
    netProfit: data?.NetProfit?.toString() || '',
    wagesandSalaries: data?.WagesandSalaries?.toString() || '',
    valueofBuildings: data?.ValueofBuildings?.toString() || '',
    depreciationofBuilding: data?.DepreciationofBuilding?.toString() || '',
    valueofMachinery: data?.ValueofMachinery?.toString() || '',
    depreciationofMachinery: data?.DepreciationofMachinery?.toString() || '',
    buildingRent: Number(data?.BuildingRent) || 0,
    rentOfWarehousesForTheFactory:
      data?.RentOfWarehousesForTheFactory?.toString() || '',
    rentOfLaborAccommodation: data?.RentOfLaborAccommodation?.toString() || '',
    valueofLongtermLoans: data?.ValueofLongtermLoans?.toString() || '',
    interestPaidofLongterms: data?.InterestPaidofLongterms?.toString() || '',
    administrationandGeneralExpenses:
      data?.AdministrationandGeneralExpenses?.toString() || '',
    patentCost: data?.PatentCost?.toString() || '',
    Products: data?.Products
      ? data?.Products?.map((p: any) => {
          return {
            HSCodeHSCodesListxlsx: {
              Id: p.HScodeId,
              Title: p.HSCodeTitle,
              Code: p.HSCode,
            },
            AnnualProductionValueinAED: p.AnnualProductionValueinAED,
            Designedproductioncapacityinkgyear:
              p.Designedproductioncapacityinkgyear,
            ActualProductionCapacityinkgyear:
              p.ActualProductionCapacityinkgyear,
          };
        })
      : [],
    RawMaterials: data?.RawMaterials
      ? data?.RawMaterials?.map((r: any) => {
          return {
            Category: {
              ...r.Category,
              label: r.Category?.Name,
              value: r.Category?.Id,
            },
            HSCodeHSCodesListxlsx: {
              Id: r.HScodeId,
              Title: r.HSCodeTitle,
              Code: r.HSCode,
            },
            Quantity: r.Quantity,
            MaterialUsage: r.MaterialUsage,
            productsMaidByRawMaterial: r.ProductsMaidByRawMaterial?.map(
              (p: any) => {
                return p.HSCodeId;
              },
            ),
            Value: r.Value || '0',
            CountryOfOriginId: {
              ...r.CountryOfOrigin,
              label: r.CountryOfOrigin?.Name,
              value: r.CountryOfOrigin?.Id,
            },
            LocalGulfOriginForeign:
              r.LocalGulfOriginForeign || r.CountryOfOrigin?.Foreign
                ? t('IL.ForeignOriginText')
                : t('IL.LocalOriginText'),
            LocalGulfOriginForeignValue:
              r.LocalGulfOriginForeignValue || r.CountryOfOrigin?.Foreign
                ? 'F'
                : 'L',
          };
        })
      : [],
    ForeignMaterialsCost:
      data?.ForeignMaterials || data?.categoriesFromApi?.ForeignMaterialsCost,
    LocalMaterialsCost:
      data?.LocalMaterialsCost || data?.categoriesFromApi?.LocalMaterialsCost,
    monthlyElectricityConsumptioninKWH:
      data?.MonthlyElectricityConsumptioninKWH?.toString() || '',
    monthlyElectricityConsumptionChargesinAED:
      data?.MonthlyElectricityConsumptionChargesinAED?.toString() || '',
    monthlyWaterConsumptionGallon:
      data?.MonthlyWaterConsumptionGallon?.toString() || '',
    monthlyWaterConsumptionChargesinAED:
      data?.MonthlyWaterConsumptionChargesinAED?.toString() || '',
    monthlyGasConsumptionMMBTU:
      data?.MonthlyGasConsumptionMMBTU?.toString() || '',
    monthlyGasConsumptionChargesinAED:
      data?.MonthlyGasConsumptionChargesinAED?.toString() || '',
    Machines: data?.Machines
      ? data?.Machines?.map((m: any) => {
          return {
            HSCodeHSCodesListxlsx: {
              Id: m.HScodeId,
              Title: m.HSCodeTitle,
              Code: m.HSCode,
            },
            CountryofOrigin: {
              ...m.CountryOfOrigin,
              label: m.CountryofOrigin?.Name,
              value: m.CountryofOrigin?.Id,
            },
            Status: {
              label: m.Status?.Name,
              value: m.Status?.Id,
            },
            Numberofmachinesofthesametype: m.Quantity ? Number(m.Quantity) : 0,
            productsMaidByRawMaterial: m.ProductsMaidByRawMaterial?.map(
              (p: any) => {
                return p.HSCodeId;
              },
            ),
            Quantity: m.Quantity,
            TotalValue: m.TotalValue ? Number(m.TotalValue) : 0,
          };
        })
      : [],
    DoYouHaveManager: data?.DoYouHaveManager
      ? data?.DoYouHaveManager == 'True'
        ? managerOptions[0]
        : data?.DoYouHaveManager
        ? data?.DoYouHaveManager == 'False'
          ? managerOptions[1]
          : {}
        : {}
      : {},
    Activities: data?.Activities
      ? data?.Activities.map((ac: any) => {
          return {
            MainActivity: {
              id: ac.MainActivity.ActivityId,
              name: ac.MainActivity.Name,
              isiC4Code: ac.MainActivity.ISIC4,
              label: ac.MainActivity.ISIC4 + ' - ' + ac.MainActivity.Name,
              value: ac.MainActivity.ISIC4,
            },
            SubActivity:
              ac.SubActivityList?.map((sac: any) => ({
                id: sac.ActivityId,
                name: sac.Name,
                isiC4Code: sac.ISIC4,
                label: sac.ISIC4 + ' - ' + sac.Name,
                value: sac.ISIC4,
              })) || [],
          };
        })
      : [],

    Owners: data?.Owners
      ? data?.Owners?.map((o: any) => {
          return {
            ...o,
            PersonEmiratesIdAttachment: o.PersonEmiratesIdAttachment
              ? o.PersonEmiratesIdAttachment.map((att: any) => {
                  return {
                    ...att,
                    size: att.base64 ? getBase64FileSize(att.base64) : 0,
                  };
                })
              : [],
            PersonPassportAttachment: o.PersonPassportAttachment
              ? o.PersonPassportAttachment.map((att: any) => {
                  return {
                    ...att,
                    size: att.base64 ? getBase64FileSize(att.base64) : 0,
                  };
                })
              : [],
            PersonVisaExpatsAttachment: o.PersonVisaExpatsAttachment
              ? o.PersonVisaExpatsAttachment.map((att: any) => {
                  return {
                    ...att,
                    size: att.base64 ? getBase64FileSize(att.base64) : 0,
                  };
                })
              : [],
            CompanyLocalLicenseAttachment: o.CompanyLocalLicenseAttachment
              ? o.CompanyLocalLicenseAttachment.map((att: any) => {
                  return {
                    ...att,
                    size: att.base64 ? getBase64FileSize(att.base64) : 0,
                  };
                })
              : [],
            CompanyEstablishmentContractAttachment:
              o.CompanyEstablishmentContractAttachment
                ? o.CompanyEstablishmentContractAttachment.map((att: any) => {
                    return {
                      ...att,
                      size: att.base64 ? getBase64FileSize(att.base64) : 0,
                    };
                  })
                : [],
            Nationality: o.Nationality
              ? {
                  ...o.Nationality,
                  label: o.Nationality?.Name,
                  value: o.Nationality?.Id,
                }
              : {},
            OwnerGender: o.OwnerGenderId,
          };
        })
      : [],
    Employees: data?.Employees
      ? data?.Employees.map((e: any) => {
          return {
            ...e,
            nationality: {
              ...e.nationality,
              label: e.nationality?.Name,
              value: e.nationality?.Id,
            },
          };
        })
      : [],

    numberofEmployeesLocal: data?.NumberofEmployeesLocal?.toString() || '0',
    numberofEmployeesGCC: data?.NumberofEmployeesGCC?.toString() || '0',
    numberofEmployeesForeign: data?.NumberofEmployeesForeign?.toString() || '0',
    totalNumberofEmployees: '0',
    FromMoec: [],
    TotalProductionCost: data?.TotalProductionCost || '0',
  };

  return newMappedData;
}
