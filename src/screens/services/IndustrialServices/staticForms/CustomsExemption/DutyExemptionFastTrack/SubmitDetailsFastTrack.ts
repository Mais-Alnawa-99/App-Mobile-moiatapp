export function transformFastTrackDutyExemptionData(data: any) {
  return {
    userId: data.userId,
    Id: data.applicationId,
    FormId: data.FormId,

    licenseId: data.licenseId,
    IsDraft: data.isDraft,
    BillOfLadingNumber: data.BillOfLadingNumber,
    SourceChamberCodeId: data.SourceChamberCodeId,
    EmirateId: data.EmirateId,
    ImportCode: data.ImportCode,
    ShipmentInvoiceNumber: data.ShipmentInvoiceNumber,
    InvoiceDate: data.InvoiceDate,
    CurrencyId: data.Currency.Id,
    TotalValue: data.TotalValue,
    TotalVAlueInAED: data.TotalVAlueInAED,
    FastTrackMaterials: data.NewMaterials?.map(m => {
      return {
        HSCodeId: m?.hsCodeId?.Id,
        Quantity: m?.TotalWeightasperCommercialInvoice,
        CountryOfOriginId: m?.CountryOfOrigin.Id,
        AvailableQuantity: m?.RemainingAvailableWeight,
        RawMaterialValue: m?.ValueoftheRawMaterial,
        // TotalWeightasperCommercialInvoice: m?.TotalWeightasperCommercialInvoice,
        WHSO_MOIAttachments:
          m?.WHSO_MOIAttachments?.map(att => {
            return {
              name: att?.name,
              type: att?.type,
              isnew: att?.isnew,
              base64: att?.base64,
            };
          }) ??
          m?.Attachments?.map(att => {
            return {
              name: att?.name,
              type: att?.type,
              isnew: att?.isnew,
              base64: att?.base64,
            };
          }),
      };
    }),

    InvoiceAttestationLegalization: data.InvoiceAttestationLegalization,
    AttestationDocumentType: data.AttestationDocumentType,
    CertificateOfOriginAttestationFees: data.CertificateOfOriginAttestationFees,
    InvoiceAttestationFees: data.AttestationFees,
    TotalAttestationFees: data.TotalAttestationFees,
    TotalFeeofallapplications: data.TotalFeeofallapplications || 0,
    TotalFees: data.TotalFees,
    InvoiceList: data.Invoice?.map(att => {
      return {
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      };
    }),
    PackingListList: data.PackingList?.map(att => {
      return {
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      };
    }),
    BilofLadingList: data.BillOfLading?.map(att => {
      return {
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      };
    }),
    CertificateOfOriginList: data.CertificateOfOrigin?.map(att => {
      return {
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      };
    }),

    TermsAndConditions: data.TermsAndConditions,
  };
}
