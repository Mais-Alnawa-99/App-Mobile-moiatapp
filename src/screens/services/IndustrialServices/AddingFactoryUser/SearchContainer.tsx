// import React from 'react';
// import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
// import {useTranslation} from 'react-i18next';
// import {useTheme} from '@react-navigation/native';
// import Text from '../../../../../component/Text';
// import Button from '../../../../../component/Button';
// import {BH, BW} from '../../../../../style/theme';
// import Input from '../../../../../component/input/Input';
// import {Icon} from 'react-native-elements';

// export default function SearchContainer({
//   search,
//   setSearch,

//   searchParams,
//   setSearchParams,
//   _resetSearch,
// }: {
//   search: any;
//   setSearch: any;
//   searchParams: any;
//   setSearchParams: any;
//   _resetSearch: any;
// }): JSX.Element {
//   const {t} = useTranslation();
//   const {colors}: any = useTheme();
//   const styles = getStyle(colors);

//   return (
//     <>
//       <View style={styles.searchBtnContainer}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'flex-end',
//             width: '100%',
//             gap: 5,
//           }}>
//           {search ? (
//             <Animated.View
//               style={{
//                 width: '87%',
//                 alignSelf: 'center',
//               }}>
//               <Input
//                 textInput
//                 placeholder={t('Search')}
//                 value={searchParams.Search}
//                 onChangeText={(text: string) => {
//                   setSearchParams((prev: any) => ({...prev, Search: text}));
//                 }}
//                 onBlur={() => setSearch(false)}
//                 styleInput={{
//                   borderRadius: 20 * BW(),
//                   borderWidth: 1,
//                   marginTop: 0,
//                   width: '100%',
//                 }}
//                 viewStyle={{marginTop: 0}}
//               />

//               <TouchableOpacity
//                 onPress={() => {
//                   _resetSearch();
//                 }}
//                 style={styles.clearIcon}>
//                 <Icon
//                   type="entypo"
//                   name="cross"
//                   size={26 * BW()}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </Animated.View>
//           ) : (
//             <Button
//               icon={require('../../../../../assets/header/search.png')}
//               styleIcon={{tintColor: colors.secondaryColor}}
//               containerIcon={{width: 20 * BW(), height: 20 * BW()}}
//               onPress={() => setSearch(true)}
//               style={styles.searchBtn}
//             />
//           )}

//           <Button
//             Entypo={'ccw'}
//             onPress={() => {
//               _resetSearch();
//               setSearch(false);
//             }}
//             EntypoColor={colors.secondaryColor}
//             style={styles.searchBtn}
//           />
//         </View>
//       </View>
//     </>
//   );
// }

// const getStyle = (colors: any) =>
//   StyleSheet.create({
//     searchBtn: {
//       width: 'auto',
//       height: 'auto',
//       borderColor: colors.border,
//       borderWidth: 1 * BW(),
//       borderRadius: 24 * BW(),
//       padding: 8 * BW(),
//       // marginEnd: 8 * BW(),
//       backgroundColor: '#fff',
//     },

//     searchBtnContainer: {
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       flexDirection: 'row',
//       marginBottom: 8 * BW(),
//     },
//     clearIcon: {
//       position: 'absolute',
//       right: 10 * BW(),
//       top: 20 * BH(),
//       transform: [{translateY: -8 * BH()}],
//       zIndex: 10,
//     },
//   });
