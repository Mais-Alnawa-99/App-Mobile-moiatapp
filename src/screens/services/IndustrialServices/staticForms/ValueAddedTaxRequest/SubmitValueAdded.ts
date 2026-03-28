export function transformValueAddedData(data: any) {
  return {
    userId: data.userId,
    formId: data.formId,
    licenseId: data.licenseId,
    Id: data.applicationId,
    isDraft: data.isDraft,
    annualSales: data.AnnualSales,
    finishedGoodsOpeningStock: data.FinishedGoodsOpeningStock,
    finishedGoodsClosingStock: data.FinishedGoodsClosingStock,
    netProfit: data.NetProfit,
    wagesAndSalaries: data.WagesAndSalaries,
    valueOfBuildings: data.ValueOfBuildings,
    depreciationOfBuilding: data.DepreciationOfBuilding,
    valueOfMachinery: data.ValueOfMachinery,
    depreciationOfMachinery: data.DepreciationOfMachinery,
    buildingRent: data.BuildingRent,
    rentOfWarehousesForTheFactory: data.RentOfWarehousesForTheFactory,
    rentOfLaborAccommodation: data.RentOfLaborAccommodation,
    valueOfLongtermLoans: data.ValueOfLongtermLoans,
    interestPaidOfLongterms: data.InterestPaidOfLongterms,
    administrationAndGeneralExpenses: data.AdministrationAndGeneralExpenses,
    patentCost: data.PatentCost,

    localPrimaryRawMaterials: data.LocalPrimaryRawMaterials,
    localAxillaryRawMaterials: data.LocalAxillaryRawMaterials,
    localSemiFinishedRawMaterials: data.LocalSemiFinishedRawMaterials,
    localFinishedMaterials:
      data.LocalFinishedMaterials ?? data.localFinishedMaterials,
    localPackagingMaterials: data.LocalPackagingMaterials,
    localUtilityFuelWaterElectricity: data.LocalUtilityFuelWaterElectricity,
    totalProductionCostOfLocalGulfOrigin:
      data.TotalProductionCostOfLocalGulfOrigin,

    foreignPrimaryRawMaterials: data.ForeignPrimaryRawMaterials,
    foreignAxillaryRawMaterials: data.ForeignAxillaryRawMaterials,
    foreignSemiFinishedRawMaterials: data.ForeignSemiFinishedRawMaterials,
    foreignFinishedMaterials:
      data.ForeignFinishedMaterials ?? data.foreignFinishedMaterials,
    foreignPackagingMaterials: data.ForeignPackagingMaterials,
    foreignUtilityFuelWaterElectricity: data.ForeignUtilityFuelWaterElectricity,
    totalProductionCostOfForeignOrigin: data.TotalProductionCostOfForeignOrigin,

    totalProductionCost: data.TotalProductionCost,
    valueAddedPercentage: data.ValueAddedPercentage,

    rawMaterialsInvoicesList: data.RawMaterialsInvoices?.map((att: any) => ({
      name: att?.name,
      type: att?.type,
      isnew: att?.isnew,
      base64: att?.base64,
    })),
    budgetDocumentCopiesList: data.BudgetDocumentCopies?.map((att: any) => ({
      name: att?.name,
      type: att?.type,
      isnew: att?.isnew,
      base64: att?.base64,
    })),
    OtherAttachmentsList: data.OtherAttachments?.map((att: any) => ({
      name: att?.name,
      type: att?.type,
      isnew: att?.isnew,
      base64: att?.base64,
    })),

    approveTheData: data.ApproveTheData,
    termsAndConditions: data.TermsAndConditions,
  };
}
