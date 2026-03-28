export function mapDutyExemptionFastTrack(appData: any) {
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
    BillOfLadingNumber: appData?.BillOfLadingNumber,
    SourceChamberCodeId: appData?.SourceChamberCodeId,
    EmirateId: appData?.Emirate
      ? {
          label: appData.Emirate.Name,
          value: appData.Emirate.Id,
          ...appData.Emirate,
        }
      : {},
    ImportCode: appData?.ImportCode,
    ShipmentInvoiceNumber: appData?.ShipmentInvoiceNumber,
    InvoiceDate: appData?.InvoiceDate || '',
    Currency: appData?.CurrencyId,
    TotalValue: appData?.TotalValue,
    TotalVAlueInAED: appData?.TotalVAlueInAED,
    NewMaterials: (appData?.FastTrackMaterials || []).map(
      (m: any, index: number) => ({
        index,
        hsCodeId: m.HSCodeId
          ? {
              Id: m.HSCodeId || '-',
              Title: m.HsTitle || '-',
              Code: m.HSCodeId || '-',
            }
          : {},
        CountryOfOrigin: m.Country
          ? {
              Id: m.Country.Id,
              label: m.Country.Name,
              value: m.Country.Id,
              code: m.Country.Value,
            }
          : {},
        ValueoftheRawMaterial: m.RawMaterialValue,
        TotalWeightasperCommercialInvoice: m.Quantity,
        TotalApprovedWeight: m.TotalQuantity,
        RemainingWeight: m.RemainingQuantity,
        ReservedQuantity: m.ReservedQuantity,
        RemainingAvailableWeight: m.AvailableQuantity,
        Attachments: m.WHSO_MOIAttachments,
      }),
    ),
    InvoiceAttestationLegalization: appData?.InvoiceAttestationLegalization,
    AttestationDocumentType: appData?.AttestationDocumentTypeObject?.Id
      ? appData.AttestationDocumentTypeObject.Id
      : '',
    MOFAICApplicationNumber: appData?.MOFAICApplicationNumber,
    CertificateOfOriginAttestationFees:
      appData?.CertificateOfOriginAttestationFees,
    AttestationFees: appData?.InvoiceAttestationFees,
    TotalAttestationFees: appData?.TotalAttestationFees,
    ServiceFees: 100,
    TotalFeeofallapplications: appData?.TotalFeeofallapplications,
    TotalFees: appData?.TotalFees,
    Invoice: appData?.InvoiceList
      ? appData?.InvoiceList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {type:attach.Type,base64:attach.Base64,name:attach.Name ,size: sizeBytes,isnew:false};
        })
      : [],
    BillOfLading: appData?.BilofLadingList
      ? appData?.BilofLadingList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {type:attach.Type,base64:attach.Base64,name:attach.Name ,size: sizeBytes,isnew:false};
        })
      : [],
    CertificateOfOrigin: appData?.CertificateOfOriginList
      ? appData?.CertificateOfOriginList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {type:attach.Type,base64:attach.Base64,name:attach.Name ,size: sizeBytes,isnew:false};
        })
      : [],
    PackingList: appData?.PackingListList
      ? appData?.PackingListList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {type:attach.Type,base64:attach.Base64,name:attach.Name ,size: sizeBytes,isnew:false};
        })
      : [],
    TermsAndConditions: true,
    isDraft: appData?.IsDraft,
  };
}
