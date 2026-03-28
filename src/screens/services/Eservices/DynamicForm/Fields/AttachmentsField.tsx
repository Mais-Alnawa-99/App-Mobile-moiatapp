import React, {useState, useEffect, Fragment} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import UplaodAtachment from '../../../../../component/attachment/UplaodAtachment';
import {BW} from '../../../../../style/theme';
import {serviceApiGateway} from '../../../../../redux/network/apiEservices';
import CustomImage from '../../../../../component/CustomImage';
import ImageViewer from '../../../../../component/ImageViewer';
import Text from '../../../../../component/Text';
import Button from '../../../../../component/Button';
import {_downloadFile} from '../../../../../component/SaveFiles';
import {useAppSelector} from '../../../../../redux/store';

const AttachmentsField = ({
  section,
  langId,
  service,
  tempAppId,
  attachments,
  setAttachments,
  errors,
  setErrors,
  applicationId,
  isDisabled,
  formValues,
  visibility,
  parentEntityFieldId,
  extraKey,
  itemIndex,
}: any) => {
  const {colors} = useTheme();
  const style = getStyle(colors);

  const {t} = useTranslation();
  let attachmentLink = `${serviceApiGateway}/UploadAttachment/GetAttachmentById?`;
  let tempLink = `${serviceApiGateway}/UploadAttachment/GetTemporaryAttachmentById?`;
  const {tokenData}: any = useAppSelector(store => store.userToken);
  const [loadingFiles, setLoadingFiles] = useState<Record<number, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const initialAttachments: Record<any, any[]> = {};

    section?.FormSectionAttachments?.forEach((attachment: any) => {
      if (attachment?.AttachmentFiles?.length) {
        if (!!extraKey) {
          initialAttachments[attachment.FormSectionAttachmentId] =
            attachment.AttachmentFiles.map((file: any) => {
              if (file?.ItemIndex === itemIndex)
                return {
                  id: file.id,
                  returnedAtachmentId: file.id,
                  attach:
                    applicationId == 0
                      ? `${tempLink}attachmentId=${file?.id.toString()}&download=true`
                      : `${attachmentLink}attachmentId=${file?.id.toString()}&download=true`,
                  type: file.MimeType,
                  name: file.FileName,
                  size: file.Size,
                  progress: 100,
                  temp: true,
                };
            }).filter(Boolean);
        } else {
          initialAttachments[attachment.FormSectionAttachmentId] =
            attachment.AttachmentFiles.map((file: any) => ({
              id: file.id,
              returnedAtachmentId: file.id,
              attach:
                applicationId == 0
                  ? `${tempLink}attachmentId=${file?.id.toString()}&download=true`
                  : `${attachmentLink}attachmentId=${file?.id.toString()}&download=true`,
              type: file.MimeType,
              name: file.FileName,
              size: file.Size,
              progress: 100,
              temp: true,
            }));
        }
      }
    });
    if (Object.keys(initialAttachments).length > 0) {
      if (!!extraKey) {
        if (!loaded) {
          setAttachments((prev: any) => {
            const updatedAttachments = {...prev};
            updatedAttachments[extraKey] = {
              ...updatedAttachments[extraKey],
              ...initialAttachments,
            };
            return updatedAttachments;
          });
          setLoaded(true);
        }
      } else {
        setAttachments((prev: any) => ({...prev, ...initialAttachments}));
      }
    }
  }, [section]);
  const getAttachmentLabel = (constraintTypeId: number, attachment: any) => {
    const constraint =
      attachment?.constraints &&
      attachment?.constraints?.find(
        (c: any) => c.constraintTypeId === constraintTypeId,
      );

    if (constraint?.attachmentLabels) {
      const labels = JSON.parse(constraint.attachmentLabels);
      return labels.find((l: any) => l.langId === langId)?.value;
    }

    return null;
  };

  return (
    <>
      {section?.FormSectionAttachments?.map((attachment: any) => {
        const attachmentLabel =
          attachment.attachmentName.find((name: any) => name.langId === langId)
            ?.value || 'Attachment';
        const attachmentDescription =
          attachment?.attachmentDescription &&
          attachment?.attachmentDescription?.find(
            (name: any) => name.langId === langId,
          )?.value;
        const isRequired = attachment.constraints?.some(
          (constraint: any) => constraint.constraintTypeId === 1,
        );

        const fileTemplates = attachment.FileTemplates || [];

        const maxFilesConstraint = attachment?.constraints?.find(
          (c: any) => c.constraintTypeId === 3,
        );
        const maxFiles = maxFilesConstraint
          ? JSON.parse(maxFilesConstraint.Settings)?.AllowedTotalFiles
          : null;
        const maxFilesLabel = getAttachmentLabel(3, attachment);

        const allowedExtensionsConstraint = attachment?.constraints?.find(
          (c: any) => c.constraintTypeId === 4,
        );

        const allowedExtensions = allowedExtensionsConstraint?.Settings
          ? JSON.parse(allowedExtensionsConstraint.Settings)?.AllowedExtensions
          : [];

        const extensionErrorMessage =
          allowedExtensionsConstraint?.textMessages &&
          JSON.parse(allowedExtensionsConstraint.textMessages)?.find(
            (m: any) => m.langId === langId,
          )?.value;
        const allowedExtensionsLabel = getAttachmentLabel(4, attachment);

        if (
          !visibility[attachment.AttachmentId] &&
          visibility[attachment.AttachmentId] != undefined
        )
          return null;

        // if (
        //   isDisabled &&
        //   !extraKey &&
        //   !!!attachments[attachment.FormSectionAttachmentId]
        // ) {
        //   return null;
        // }

        if (
          isDisabled &&
          !!extraKey &&
          attachments[extraKey] &&
          !!!attachments[extraKey][attachment.FormSectionAttachmentId]
        ) {
          return null;
        }

        if (!isDisabled && attachment?.FieldModeId === 2) {
          isDisabled = true;
        }

        let visibleTemplates = fileTemplates;

        const templateSettings =
          attachment?.Settings && JSON.parse(attachment?.Settings);
        const templateVisibility = templateSettings?.templateVisbility;

        if (!!templateVisibility && Array.isArray(templateVisibility)) {
          const matchedTemplates: number[] = [];

          templateVisibility.forEach((tv: any) => {
            const controlFieldIds = JSON.parse(tv.visibleByEntityFieldId);
            const expectedValues = JSON.parse(tv.values.replace(/'/g, '"'));

            const allMatch = controlFieldIds.every((controlFieldId: number) => {
              const controlValue = formValues?.[controlFieldId]?.value;
              return expectedValues.includes(String(controlValue));
            });

            if (allMatch) {
              matchedTemplates.push(tv.tempId);
            }
          });

          visibleTemplates = fileTemplates.filter((ft: any) =>
            matchedTemplates.includes(ft.id),
          );
        }

        const imageFiles = visibleTemplates.filter(
          (file: any) =>
            file.Extension === 'image/png' ||
            file.Extension === 'image/jpeg' ||
            file.Extension === 'image/jpg',
        );
        const documentFiles = visibleTemplates.filter(
          (file: any) =>
            file.Extension !== 'image/png' ||
            file.Extension !== 'image/jpeg' ||
            file.Extension !== 'image/jpg',
        );

        return (
          <View key={attachment.FormSectionAttachmentId}>
            <UplaodAtachment
              isDisabled={isDisabled}
              tempAppId={tempAppId}
              requiredStar={isRequired}
              attachmentId={attachment?.AttachmentId}
              applicationStageId={service?.stageId}
              maxFile={maxFiles}
              maxFilesLabel={maxFilesLabel}
              acceptedFiles={allowedExtensions}
              extensionErrorMessage={extensionErrorMessage}
              allowedExtensionsLabel={allowedExtensionsLabel}
              style={{marginTop: 12 * BW()}}
              addFileStyle={{minHeight: 40 * BW()}}
              attachment={
                extraKey
                  ? (attachments[extraKey] &&
                      attachments[extraKey][
                        attachment.FormSectionAttachmentId
                      ]) ||
                    []
                  : attachments[attachment.FormSectionAttachmentId] || []
              }
              setAttachment={
                !!extraKey
                  ? (file: any) => {
                      setAttachments((prev: any) => {
                        const updatedAttachments = {...prev};
                        updatedAttachments[extraKey] = {
                          ...updatedAttachments[extraKey],
                          [attachment.FormSectionAttachmentId]: file,
                        };
                        return updatedAttachments;
                      });
                    }
                  : (file: any) =>
                      setAttachments((prev: any) => ({
                        ...prev,
                        [attachment.FormSectionAttachmentId]: file,
                      }))
              }
              title={attachmentLabel}
              applicationId={applicationId}
              attachmentDescription={attachmentDescription}
              errors={errors}
              parentEntityFieldId={parentEntityFieldId}
              itemIndex={itemIndex}
            />
            {errors[attachment.FormSectionAttachmentId] &&
              (!!!attachments[attachment.FormSectionAttachmentId] ||
                (attachments[attachment.FormSectionAttachmentId] != undefined &&
                  attachments[attachment.FormSectionAttachmentId]?.length ==
                    0)) && (
                <Text style={style.requiredText} h5>
                  {errors[attachment.FormSectionAttachmentId]}
                </Text>
              )}
            {imageFiles.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={style.imageScrollContainer}>
                {imageFiles.map((file: any, index: number) => {
                  const fileUrl = `${serviceApiGateway}/UploadAttachment/GetServiceFileTemplateById?fileTemplateId=${file.id}&download=false`;

                  return <ImageViewer fileUrl={fileUrl} key={index} />;
                })}
              </ScrollView>
            )}
            {documentFiles.length > 0 && (
              <View style={{marginTop: 4 * BW()}}>
                {documentFiles.map((file: any, index: number) => {
                  const fileUrl = `${serviceApiGateway}/UploadAttachment/GetServiceFileTemplateById?fileTemplateId=${file.id}&download=false`;

                  return (
                    <View
                      key={index}
                      style={{
                        marginBottom: 8 * BW(),
                        padding: 10 * BW(),
                        borderRadius: 8 * BW(),
                        borderWidth: 1 * BW(),
                        borderColor: colors.border,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text h5 style={{flex: 1}} numberOfLines={1}>
                        {file.FileName}
                      </Text>
                      <Button
                        style={{
                          width: 'auto',
                          height: 'auto',
                          padding: 0,
                          backgroundColor: 'transparent',
                          borderRadius: 0,
                          marginHorizontal: 6 * BW(),
                        }}
                        loading={loadingFiles[file.id]}
                        containerIcon={{
                          width: 'auto',
                          height: 'auto',
                        }}
                        styleIcon={{
                          tintColor: 'green',
                          width: 16 * BW(),
                          height: 16 * BW(),
                        }}
                        textStyle={{fontSize: 10 * BW(), color: 'white'}}
                        onPress={async () => {
                          setLoadingFiles(prev => ({...prev, [file.id]: true}));
                          try {
                            await _downloadFile(
                              fileUrl,
                              file.FileName,
                              tokenData,
                            );
                          } catch (err) {
                          } finally {
                            setLoadingFiles(prev => ({
                              ...prev,
                              [file.id]: false,
                            }));
                          }
                        }}
                        icon={require('../../../../../assets/icons/eye.png')}
                      />
                    </View>
                  );
                })}
              </View>
            )}
            {/* {errors[attachment.FormSectionAttachmentId] && (
              <Text h5 style={style.errorText}>
                {errors[attachment.FormSectionAttachmentId]}
              </Text>
            )} */}
          </View>
        );
      })}
    </>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    errorText: {
      color: 'red',
      marginTop: 4 * BW(),
    },
    imageScrollContainer: {
      marginTop: 6 * BW(),
    },
    imageContainer: {
      marginRight: 10 * BW(),
      alignItems: 'center',
    },
    image: {
      width: 150 * BW(),
      height: 150 * BW(),
      borderRadius: 10 * BW(),
      borderWidth: 1 * BW(),
      borderColor: colors.border,
    },
    downloadButton: {
      marginTop: 8 * BW(),
      paddingVertical: 5 * BW(),
      paddingHorizontal: 10 * BW(),
      backgroundColor: colors.primary,
      borderRadius: 5 * BW(),
    },
    downloadText: {
      color: colors.white,
      fontWeight: 'bold',
    },
    requiredText: {
      color: '#db2c43',
      fontSize: 8 * BW(),
      lineHeight: 20 * BW(),
    },
  });

export default AttachmentsField;
