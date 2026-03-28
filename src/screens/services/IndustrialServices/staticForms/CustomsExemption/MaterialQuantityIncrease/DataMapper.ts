export function mapMaterialQuantityIncrease(appData: any) {
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
    ShipmentInvoiceNumber: appData?.ShipmentInvoiceNumber || '',
    InvoiceDate: appData?.InvoiceDate || '',
    NewMaterials: (appData?.MaterialQuantity || []).map(
      (m: any, index: number) => ({
        index,
        HSCodeId: m.HSCodeId
          ? {
              Id: m.HSCodeId || '-',
              Title: m.HSCodeText || '-',
              Code: m.HSCode || '-',
            }
          : {},
        TotalApprovedWeight: m.TotalQuantity || '',
        RemainingAvailableWeight: m.RemainingQuantity || '',
        ExtraRequiredWeight: m.Quantity || '',
        ReservedQuantity: m.ReservedQuantity || '0',
        ReasonsofMaterialIncrement: m.MaterialUsage || '',
        TotalWeightuponApproval: m.AvailabeWeightAfterIncrease || '0',
        TotalRemainingWeightuponApproval:
          m.TotalRemainingWeightuponApproval || '0',
      }),
    ),
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
    ServiceFees: 50,
    TotalFees: appData?.TotalFees || 0,
    isDraft: appData?.IsDraft,
    TermsAndConditions: true,
  };
}
