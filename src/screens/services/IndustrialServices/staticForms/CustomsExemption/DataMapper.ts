import {t} from 'i18next';

export function mapAddNewRawMaterial(appData: any) {
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
    ShipmentInvoiceNumber: appData?.ShipmentInvoiceNumber,
    InvoiceDate: appData?.InvoiceDate || '',
    CountryOfOrigin: appData?.CountryOfOriginId
      ? appData?.CountryOfOriginId
      : '',
    localGulfOriginForeign: appData?.CountryOfOrigin?.Foreign
      ? t('IL.ForeignOriginText')
      : t('IL.LocalOriginText'),

    RawMaterials: (appData?.NewMaterials || []).map(
      (m: any, index: number) => ({
        index,
        hsCodeId: m.HSCodeId
          ? {
              Id: m.HSCodeId || '-',
              Title: m.HscodeTitle || '-',
              label: m.HsTitle || '-',
              value: m.HSCodeId || '-',
              Code: m.HSCode || '-',
            }
          : {},
        Category: m.Category
          ? {
              Id: m.Category.Id,
              label: m.Category.Name,
              value: m.Category.Id,
            }
          : {},
        productsMaidByRawMaterial: m.ProductsList || [],
        Status: m.StatusId
          ? {
              Id: m.StatusId,
              label: m.StatusName,
              value: m.StatusId,
            }
          : {},
        Numberofmachinesofthesametype: m.NumberOfMachineryOrEquipment || '',
        TotalWeight: m.Quantity || '',
        MaterialUsage: m.MaterialUsage || '',
      }),
    ),
    LocalMaterialsCost: [],
    ForeignMaterialsCost: [],
    Invoice: appData?.InvoiceList
      ? appData?.InvoiceList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {
            type: attach.Type,
            base64: attach.Base64,
            name: attach.Name,
            size: sizeBytes,
            isnew: false,
          };
        })
      : [],
    BillOfLading: appData?.BilofLadingList
      ? appData?.BilofLadingList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {
            type: attach.Type,
            base64: attach.Base64,
            name: attach.Name,
            size: sizeBytes,
            isnew: false,
          };
        })
      : [],
    PackingList: appData?.PackingListList
      ? appData?.PackingListList.map((attach: any) => {
          const sizeBytes = attach.Base64
            ? getBase64FileSize(attach.Base64)
            : 0;
          return {
            type: attach.Type,
            base64: attach.Base64,
            name: attach.Name,
            size: sizeBytes,
            isnew: false,
          };
        })
      : [],
    TermsAndConditions: true,
    ServiceFees: 100,
    TotalFees: appData?.TotalFees ?? 0,
    isDraft: appData?.IsDraft,
  };
}
