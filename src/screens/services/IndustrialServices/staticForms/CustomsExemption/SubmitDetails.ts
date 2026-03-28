export function transformNewRawMaterialData(data: any) {
  return {
    licenseId: data.licenseId,
    Id: data.applicationId,
    userId: data.userId,
    formId: data.formId,
    isDraft: data.isDraft,
    shipmentInvoiceNumber: data.ShipmentInvoiceNumber,
    invoiceDate: data.InvoiceDate,
    // currencyId: data.Currency?.Id || 2,
    CountryOfOriginId: data.CountryOfOrigin,
    serviceFees: data.ServiceFees,
    totalFees: Number(data.ServiceFees) * data.RawMaterials?.length,
    newMaterials: data.RawMaterials?.map(m => {
      return {
        materialUsage: m?.MaterialUsage,
        categoryId: m?.Category?.value,
        hsCodeId: m?.hsCodeId?.Id,
        quantity: m?.TotalWeight,
        StatusId: m?.Status?.value,
        numberOfMachineryOrEquipment: m?.Numberofmachinesofthesametype,
        // countryOfOriginId: m?.CountryOfOrigin || 2,
        // availableQuantity: m?.AvailableQuantity ? +m.AvailableQuantity : 0,
        // rawMaterialValue: m?.RawMaterialValue ? +m.RawMaterialValue : 0,
        whso_MOIAttachments: m?.Attachments?.map(att => {
          return {
            name: att?.name,
            type: att?.type,
            isnew: att?.isnew,
            base64: att?.base64,
          };
        }),
        ProductsList: m?.productsMaidByRawMaterial,
      };
    }),

    invoiceList: data.Invoice?.map(att => {
      return {
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      };
    }),
    packingListList: data.PackingList?.map(att => {
      return {
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      };
    }),
    bilofLadingList: data.BillOfLading?.map(att => {
      return {
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      };
    }),

    termsAndConditions: data.TermsAndConditions,
  };
}
