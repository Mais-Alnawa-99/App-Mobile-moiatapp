import {Platform, Share} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

import FileViewer from 'react-native-file-viewer';
import {requestReadWritePermission} from './Generalfunction';

export const _downloadFile64 = async (
  name: any,
  extension: any,
  base64Content: any,
  shareAfterDownload: boolean = false,
) => {
  try {
    if (Platform.OS !== 'ios') {
      const canDownload = await requestReadWritePermission();
      if (!canDownload) return;
    }

    const dirs = RNFetchBlob.fs.dirs;
    const downloadPath = `${dirs.DocumentDir}/${name}.${extension}`;

    await RNFetchBlob.fs
      .writeFile(downloadPath, base64Content, 'base64')
      .then(() => {
        if (shareAfterDownload) {
          Share.share({
            url: 'file://' + downloadPath,
            title: name,
            message: name,
          });
        } else {
          FileViewer.open(downloadPath);
        }
      })
      .catch(err => {});
  } catch (error) {}
};

export const _downloadFile = async (
  file: any,
  title: any,
  tokenData: any,
  shareAfterDownload: boolean = false,
) => {
  let dirs = RNFetchBlob.fs.dirs;

  const path = `${dirs.DocumentDir}/${title}`;
  RNFetchBlob.config({
    fileCache: true,
    trusty: true,
    path,
    indicator: true,
    overwrite: true,
  })
    .fetch('GET', file, {
      authorization: `Bearer ${tokenData?.access_token}`,
    })
    .progress((received, total) => {})
    .then(() => {
      if (shareAfterDownload) {
        Share.share({
          url: 'file://' + path,
          title,
          message: title,
        });
      } else {
        FileViewer.open(path);
      }
    });
};

const mimeByExt: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  mp4: 'video/mp4',
  txt: 'text/plain',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

// export const _downloadFilePromise = async (
//   fileUrl: string,
//   title: string, // لازم يتضمن امتداد
//   tokenData?: {access_token?: string},
// ) => {
//   const {fs, config} = RNFetchBlob;
//   const dirs = fs.dirs;

//   try {
//     const api = Number(Platform.Version) || 30;
//     const fileName = safeName(title);
//     const folder = `${dirs.DownloadDir}/moiat`;
//     const destPath = `${folder}/${fileName}`;

//     // أذونات فقط لأجهزة قديمة لو كنت لاحقًا راح تنسخ لـ Downloads (هنا مو لازم)
//     if (Platform.OS === 'android' && api <= 29) {
//       // مو ضروري للتنزيل داخل DocumentDir، لكن ما يضر لو دالتك تطلب إذن
//       await requestReadWritePermission().catch(() => {});
//     }

//     // أنشئ المجلد
//     try {
//       await fs.mkdir(folder);
//     } catch {}

//     // نزّل مع Authorization (لاحظ الحرف الكبير)
//     const res = await config({
//       path: destPath,
//       trusty: true,
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: destPath,
//         title: fileName,
//       },
//     }).fetch('GET', fileUrl, {
//       Authorization: `Bearer ${tokenData?.access_token || ''}`,
//     });

//     // تأكد من الحالة
//     //   const status = res.info().status;
//     //   if (status < 200 || status >= 300) {
//     //     throw new Error(`HTTP ${status}`);
//     //   }

//     //   // تأكد أنه انكتب فعلاً
//     //   const stat = await fs.stat(destPath);
//     //   if (!stat || Number(stat.size) === 0) {
//     //     throw new Error('File empty or not written');
//     //   }

//     //   // ما نفتح – فقط نرجّع المسار
//     //   return {ok: true, path: destPath};
//   } catch (err) {
//     return {ok: false, error: String(err)};
//   }
// };

const safeName = (s: string) =>
  String(s || 'file')
    ?.replace?.(/[\\/:*?"<>|]/g, '_')
    ?.replace?.(/\s+/g, ' ')
    ?.trim?.();

export const _downloadFilePromise = async (
  fileUrl: string,
  title: string,
  tokenData?: {access_token?: string},
  shareAfterDownload: boolean = false,
): Promise<{ok: true; path: string} | {ok: false; error: string}> => {
  const {fs, config} = RNFetchBlob;
  const dirs = fs.dirs;

  try {
    const fileName = safeName(title);

    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const mime = mimeByExt[ext] || 'application/octet-stream';

    if (Platform.OS === 'ios') {
      const folder = `${dirs.DocumentDir}/moiatApp`;
      const path = `${folder}/${fileName}`;
      try {
        await fs.mkdir(folder);
      } catch {}
      const res = await config({path, trusty: true}).fetch('GET', fileUrl, {
        Authorization: `Bearer ${tokenData?.access_token || ''}`,
      });
      const status = res.info().status;
      if (status < 200 || status >= 300) throw new Error(`HTTP ${status}`);
      const stat = await fs.stat(path);
      if (!stat || Number(stat.size) === 0) throw new Error('Empty file');
      if (shareAfterDownload)
        await Share.share({url: 'file://' + path, title, message: title});
      else await FileViewer.open(path, {showOpenWithDialog: true});
      return {ok: true, path};
    }

    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`; // Or other suitable directory

    try {
      const response = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: path,
        headers: {
          Authorization: `Bearer ${tokenData?.access_token || ''}`,
        },
        progress: res => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
        },
      }).promise;

      if (response.statusCode === 200) {
      } else {
      }
    } catch (error) {}

    if (shareAfterDownload)
      await Share.share({url: path, title, message: title});
    else await FileViewer.open(path, {showOpenWithDialog: true});
    return {ok: true, path: ''};
  } catch (err: any) {
    return {ok: false, error: String(err?.message || err)};
  }
};

export const _downloadFilePromise2 = async (
  fileUrl: string,
  title: string,
  tokenData?: {access_token?: string},
  shareAfterDownload: boolean = false,
): Promise<{ok: true; path: string} | {ok: false; error: string}> => {
  const {fs, config} = RNFetchBlob;
  const dirs = fs.dirs;

  try {
    const fileName = safeName(title);

    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const mime = mimeByExt[ext] || 'application/octet-stream';

    if (Platform.OS === 'ios') {
      const folder = `${dirs.DocumentDir}/moiatApp`;
      const path = `${folder}/${fileName}`;
      try {
        await fs.mkdir(folder);
      } catch {}
      const res = await config({path, trusty: true}).fetch('GET', fileUrl, {
        Authorization: `Bearer ${tokenData?.access_token || ''}`,
      });
      const status = res.info().status;
      if (status < 200 || status >= 300) throw new Error(`HTTP ${status}`);
      const stat = await fs.stat(path);
      if (!stat || Number(stat.size) === 0) throw new Error('Empty file');
      if (shareAfterDownload)
        await Share.share({url: 'file://' + path, title, message: title});
      else await FileViewer.open(path, {showOpenWithDialog: true});
      return {ok: true, path};
    }

    // const folder = `${dirs?.DownloadDir}/moiatApp`;
    // const path = `${folder}/${fileName}`;
    // try {
    //   await fs?.mkdir(folder);
    // } catch {}
    const dlRes = await config({
      trusty: true,
      indicator: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        mime,
        description: 'Downloading...',
      },
    }).fetch('GET', fileUrl, {
      Authorization: `Bearer ${tokenData?.access_token || ''}`,
    });
    // let outPath = dlRes.path();
    // if (!outPath) outPath = (dlRes as any)?.data;

    // if (shareAfterDownload)
    //   await Share.share({url: outPath, title, message: title});
    // else await FileViewer.open(outPath, {showOpenWithDialog: true});
    return {ok: true, path: ''};
  } catch (err: any) {
    return {ok: false, error: String(err?.message || err)};
  }
};
