export const parseJSON = (input: any) => {
  try {
    return typeof input === 'string' ? JSON.parse(input) : input;
  } catch (e) {
    return null;
  }
};

export const getLocalizedValue = (arr: any[], langId: any) => {
  const found = arr?.find(i => i.langId === langId);
  return found?.value || '';
};

export const services: any = [
  1122, 1129, 1053, 1054, 10, 2, 1130, 3, 4, 1022, 1023, 1025, 1026, 1066, 1013,
  1070, 6, 1065, 1048, 1067, 1068, 1069, 1072, 1087, 1063, 1099, 1074, 1075,
  1088, 1089, 1093, 1056, 1057, 8, 1117, 1027, 11, 1134, 1135, 12, 13, 9, 1116,
  1052, 1051, 1097, 1126, 1145, 1045, 1046, 1047, 1084, 1082, 1132, 1147, 1141,
  1049, 1143, 5, 1030, 1029, 1, 1024, 1137, 1020, 1019, 1021, 1017, 1104, 1058,
  1105, 1106, 1061, 1050,
  // 1127,
];
// 1
