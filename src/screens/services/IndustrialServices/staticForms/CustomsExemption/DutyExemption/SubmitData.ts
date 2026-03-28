import reactotron from 'reactotron-react-native';

export function transformDutyExemptionData(data: any) {
  return {
    userId: data.userId,
    formId: data.formId,
    Id: data.applicationId,
    licenseId: data.licenseId,
    isDraft: data.isDraft,
    billOfLadingNumber: data.BillOfLadingNumber,
    sourceChamberCodeId: data.SourceChamberCodeId,
    emirateId: data.EmirateId,
    importCode: data.ImportCode,
    shipmentInvoiceNumber: data.ShipmentInvoiceNumber,
    invoiceDate: data.InvoiceDate.replace(/-/g, '/')
      .split('/')
      .reverse()
      .join('/'),
    currencyId: data.Currency.Id,
    totalValue: data.TotalValue,
    totalVAlueInAED: data.TotalVAlueInAED,
    MOFAICApplicationNumber: data.MOFAICApplicationNumber,
    exemptionMaterials: data.NewMaterials?.map(m => {
      return {
        hsCodeId: m?.hsCodeId?.Id,
        quantity: m?.TotalWeightasperCommercialInvoice,
        // quantity: 0,
        countryOfOriginId: m?.CountryOfOrigin?.Id,
        TotalApprovedWeight: m?.TotalApprovedWeight,
        RemainingWeight: m?.RemainingWeight,
        ReservedQuantity: m?.ReservedQuantity,
        availableQuantity: m?.RemainingAvailableWeight,
        // TotalWeightasperCommercialInvoice: m?.TotalWeightasperCommercialInvoice,
        rawMaterialValue: m?.ValueoftheRawMaterial,
        Attachments: m?.Attachments?.map(att => {
          return {
            name: att?.name,
            type: att?.type,
            isnew: att?.isnew,
            base64: att?.base64,
          };
        }),
      };
    }),

    invoiceAttestationLegalization: data.InvoiceAttestationLegalization,
    attestationDocumentType: data.AttestationDocumentType,
    CertificateOfOriginAttestationFees: data.CertificateOfOriginAttestationFees,

    InvoiceAttestationFees: data.AttestationFees,
    TotalAttestationFees: data.TotalAttestationFees,
    TotalFeeofallapplications: data.TotalFeeofallapplications,
    TotalFees: data.TotalFees,
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
    certificateOfOriginList: data.CertificateOfOrigin?.map(att => {
      return {
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      };
    }),
  };
}
