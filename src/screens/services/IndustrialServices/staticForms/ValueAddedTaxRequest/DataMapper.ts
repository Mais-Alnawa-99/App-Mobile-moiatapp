export function mapValueAddedCertificate(appData: any) {
  const getBase64FileSize = (base64: string): number => {
  // remove the base64 mime prefix if present (e.g. "data:application/pdf;base64,")
  let cleaned = base64.split(',').pop() || base64;

  // calculate padding
  let padding = 0;
  if (cleaned.endsWith('==')) padding = 2;
  else if (cleaned.endsWith('=')) padding = 1;

  // calculate size
  const sizeInBytes = (cleaned.length * 3) / 4 - padding;

  return sizeInBytes;
};
  return {
    AnnualSales: appData?.AnnualSales?.toString() || '',
    FinishedGoodsOpeningStock:
      appData?.FinishedGoodsOpeningStock?.toString() || '',
    FinishedGoodsClosingStock:
      appData?.FinishedGoodsClosingStock?.toString() || '',
    NetProfit: appData?.NetProfit?.toString() || '',
    WagesAndSalaries: appData?.WagesAndSalaries?.toString() || '',
    ValueOfBuildings: appData?.ValueOfBuildings?.toString() || '',
    DepreciationOfBuilding: appData?.DepreciationOfBuilding?.toString() || '',
    ValueOfMachinery: appData?.ValueOfMachinery?.toString() || '',
    DepreciationOfMachinery: appData?.DepreciationOfMachinery?.toString() || '',
    BuildingRent: appData?.BuildingRent?.toString() || '',
    RentOfWarehousesForTheFactory:
      appData?.RentOfWarehousesForTheFactory?.toString() || '',
    RentOfLaborAccommodation:
      appData?.RentOfLaborAccommodation?.toString() || '',
    ValueOfLongtermLoans: appData?.ValueOfLongtermLoans?.toString() || '',
    InterestPaidOfLongterms: appData?.InterestPaidOfLongterms?.toString() || '',
    AdministrationAndGeneralExpenses:
      appData?.AdministrationAndGeneralExpenses?.toString() || '',
    PatentCost: appData?.PatentCost?.toString() || '',

    LocalPrimaryRawMaterials:
      appData?.LocalPrimaryRawMaterials?.toString() || '0',
    LocalAxillaryRawMaterials:
      appData?.LocalAxillaryRawMaterials?.toString() || '0',
    LocalSemiFinishedRawMaterials:
      appData?.LocalSemiFinishedRawMaterials?.toString() || '0',
    LocalPackagingMaterials:
      appData?.LocalPackagingMaterials?.toString() || '0',
    LocalUtilityFuelWaterElectricity:
      appData?.LocalUtilityFuelWaterElectricity?.toString() || '0',
    TotalProductionCostOfLocalGulfOrigin:
      appData?.TotalProductionCostOfLocalGulfOrigin?.toString() || '0',

    ForeignPrimaryRawMaterials:
      appData?.ForeignPrimaryRawMaterials?.toString() || '0',
    ForeignAxillaryRawMaterials:
      appData?.ForeignAxillaryRawMaterials?.toString() || '0',
    ForeignSemiFinishedRawMaterials:
      appData?.ForeignSemiFinishedRawMaterials?.toString() || '0',
    ForeignPackagingMaterials:
      appData?.ForeignPackagingMaterials?.toString() || '0',
    ForeignUtilityFuelWaterElectricity:
      appData?.ForeignUtilityFuelWaterElectricity?.toString() || '0',
    TotalProductionCostOfForeignOrigin:
      appData?.TotalProductionCostOfForeignOrigin?.toString() || '0',

    TotalMaterialCost: appData?.TotalProductionCostOfForeignOrigin?.toString(),

    TotalProductionCost: appData?.TotalProductionCost?.toString() || '0',
    ValueAddedPercentage: appData?.ValueAddedPercentage?.toString() || '',


    RawMaterialsInvoices: appData?.RawMaterialsInvoicesList
      ? appData?.RawMaterialsInvoicesList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {type:attach.Type,base64:attach.Base64,name:attach.Name ,size: sizeBytes,isnew:false};
        })
      : [],
    BudgetDocumentCopies: appData?.BudgetDocumentCopiesList
      ? appData?.BudgetDocumentCopiesList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {type:attach.Type,base64:attach.Base64,name:attach.Name ,size: sizeBytes,isnew:false};
        })
      : [],
    OtherAttachments: appData?.OtherAttachmentsList
      ? appData?.OtherAttachmentsList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {type:attach.Type,base64:attach.Base64,name:attach.Name ,size: sizeBytes,isnew:false};
        })
      : [],


    ApproveTheData: true,
    isDraft: appData?.IsDraft,
    TermsAndConditions: true,
  };
}
