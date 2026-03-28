import {isArabic} from '../../../../../../locales';

export function transformMaterialQuantityIncreaseData(data: any) {
  return {
    userId: data.userId,
    formId: data.fromId,
    Id: data.applicationId,
    licenseId: data.licenseId,
    shipmentInvoiceNumber: data.ShipmentInvoiceNumber,
    languageId: isArabic() ? 2 : 1,
    invoiceDate: data.InvoiceDate.replace(/-/g, '/')
      .split('/')
      .reverse()
      .join('/'),
    serviceFees: data.ServiceFees,
    totalFees: Number(data.ServiceFees) * data.NewMaterials?.length,
    isDraft: data.isDraft,
    materialQuantity: data.NewMaterials?.map((m: any) => {
      return {
        totalQuantity: m?.TotalApprovedWeight,
        remainingQuantity: m?.RemainingAvailableWeight,
        quantity: m?.ExtraRequiredWeight,
        materialUsage: m?.ReasonsofMaterialIncrement,
        availabeWeightAfterIncrease: m?.TotalWeightuponApproval,
        reservedQuantity: m?.ReservedQuantity,
        totalRemainingWeightuponApproval: m?.TotalRemainingWeightuponApproval,
        hsCodeText: m?.HSCodeId?.Title,
        hsCodeId: m?.HSCodeId?.Id,
      };
    }),

    invoiceList: (data.invoiceList ?? data.Invoice)?.map((att: any) => ({
      name: att?.name,
      type: att?.type,
      isnew: att?.isnew,
      base64: att?.base64,
    })),
    packingListList: (data.packingListList ?? data.PackingList)?.map(
      (att: any) => ({
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      }),
    ),
    bilofLadingList: (data.bilofLadingList ?? data.BillOfLading)?.map(
      (att: any) => ({
        name: att?.name,
        type: att?.type,
        isnew: att?.isnew,
        base64: att?.base64,
      }),
    ),
    certificateOfOriginList: (
      data.CertificateOfOrigin ?? data.CertificateOfOrigin
    )?.map((att: any) => ({
      name: att?.name,
      type: att?.type,
      isnew: att?.isnew,
      base64: att?.base64,
    })),

    termsAndConditions: data.TermsAndConditions,
  };
}
