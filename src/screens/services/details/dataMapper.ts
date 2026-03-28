import serviceDetailsEn from './ServiceDetailsEn';
import serviceDetailsAr from './ServiceDetailsAr';
import {isArabic} from '../../../locales';

export function mapServiceDetails(serviceId: string) {
  const src = isArabic() ? serviceDetailsAr : serviceDetailsEn;

  const service: any = src.find(s => s.id === serviceId);
  if (!service) return null;

  const procedures =
    service.sections?.find((sec: any) => sec.serviceProcedures)
      ?.serviceProcedures ?? [];

  const requirements =
    service.sections?.find(
      (sec: any) => 'Requirements' in sec && sec.Requirements,
    )?.Requirements ?? [];

  const files =
    service.sections?.find((sec: any) => 'filesList' in sec && sec.filesList)
      ?.filesList ?? [];

  return {
    Id: service.id,
    relatedServiceId: service?.relatedServiceId,
    type: service?.type,
    Category_Id: service?.Category_Id,
    FieldValues: {
      Title: service.title,
      Description: service.description,
      StartServiceURL: service.startButton?.url ?? '',

      ServiceSubCategories: service.serviceOverview
        ? [
            {
              FieldValues: {
                Title: service.serviceOverview.serviceSubCategory.value,
              },
            },
          ]
        : [],

      ServiceTypes: service.serviceOverview
        ? [{FieldValues: {Title: service.serviceOverview.serviceType.value}}]
        : [],

      ServiceTargetAudience: service.serviceOverview
        ? [{FieldValues: {Title: service.serviceOverview.targetAudience.value}}]
        : [],

      Procedures: procedures.map((p: any) =>
        typeof p === 'string'
          ? {FieldValues: {Title: p}}
          : {FieldValues: {Title: p.text, Url: p.url ?? ''}},
      ),
      Requirements: requirements.map((r: any) =>
        typeof r === 'string'
          ? {FieldValues: {Title: r}}
          : {FieldValues: {Title: r.text, Url: r.url ?? ''}},
      ),
      Files: files.map((f: any) => ({
        FieldValues: {
          Title: f.name,
          Size: f.size,
          Type: f.type,
        },
      })),
      ServiceTime: service.serviceTime ?? '6 Working Days',
      Fees: Array.isArray(service.serviceFees?.Fees)
        ? service.serviceFees.Fees.map(fee => ({
            FieldValues: {
              Title: fee.value ?? fee.description ?? '',
              Value: fee.title ?? fee.amount ?? '',
            },
          }))
        : typeof service.serviceFees === 'string'
        ? service.serviceFees.split('\n').map(line => ({
            FieldValues: {Value: line.trim()},
          }))
        : service.serviceFees
        ? [
            ...(service.serviceFees.serviceFees
              ? [{FieldValues: {Value: service.serviceFees.serviceFees}}]
              : []),
            ...(service.serviceFees.feeNote
              ? [{FieldValues: {Value: service.serviceFees.feeNote}}]
              : []),
          ]
        : service.fee
        ? [{FieldValues: {Value: service.fee}}]
        : [],

      GeneralDocument: service.generalDocument
        ? {
            Title: service.generalDocument.title,
            Description: service.generalDocument.description,
            Size: service.generalDocument.size,
            Buttons:
              service.generalDocument.button?.map(btn => ({
                Title: btn.title,
                Url: btn.url,
              })) ?? [],
          }
        : null,

      FAQ: service.faq
        ? service.faq.items
          ? {
              Name: service.faq.name,
              Question: service.faq.items[0]?.question ?? '',
              ProceduresTitle: service.faq.items[0]?.proceduresTitle ?? '',
              RequirementsTitle: service.faq.items[0]?.requirementsTitle ?? '',
              Procedures: service.faq.items[0]?.procedures ?? [],
              Requirements: service.faq.items[0]?.requirements ?? [],
              Answers: service.faq.items[0]?.answers ?? [],
            }
          : {
              Name: service.faq.name,
              Question: service.faq.question ?? '',
              ProceduresTitle: service.faq.proceduresTitle ?? '',
              RequirementsTitle: service.faq.requirementsTitle ?? '',
              Procedures: service.faq.procedures ?? [],
              Requirements: service.faq.requirements ?? [],
              Answers: service.faq.answers ?? [],
            }
        : {},
      TutorialVideo: service.tutorialVideo
        ? {Title: service.tutorialVideo.title, Url: service.tutorialVideo.url}
        : null,
      UserManual: service.userManual
        ? {Title: service.userManual.title, Url: service.userManual.url}
        : null,
    },
  };
}

export function getServiceByRelated(relatedIe: any, relatedType: any) {
  const src = isArabic() ? serviceDetailsAr : serviceDetailsEn;
  let service;
  if (relatedType === 'il') {
    service = src.find(
      s => s.relatedServiceId === relatedIe && s.type === relatedType,
    );
  } else {
    service = src.find(
      s => s.relatedServiceId === relatedIe && s.type === undefined,
    );
  }

  if (!service) return null;
  else return {Id: service.id};
}
