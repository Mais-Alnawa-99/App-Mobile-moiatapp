import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Text from '../../../../component/Text';
import {isArabic} from '../../../../locales';
import {BH, BW} from '../../../../style/theme';
import DashedLine from '../../../../component/DashedLine';
import Button from '../../../../component/Button';
import NavigationService from '../../../../navigation/NavigationService';
import {deleteFactoryUser} from '../../../../redux/reducers/I-Services/thunk/factory';
import {useAppDispatch} from '../../../../redux/store';
import {setModalData} from '../../../../redux/reducers/General/modal';

export default function UsersCard({
  item,
  index,
  onDelete,
  licenseId,
}: {
  item: any;
  index: any;
  onDelete: any;
  licenseId: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();

  const confirmDeletion = async () => {
    const res = await dispatch(deleteFactoryUser({userId: item.UserId}));
    if (
      res.meta.requestStatus === 'fulfilled' &&
      res?.payload?.networkSuccess
    ) {
      onDelete();
    }
  };

  const _deleteFactoryUser = () => {
    dispatch(
      setModalData({
        title: t('IL.confirmDeletion'),
        message: t('IL.deletionConfirm'),
        fun: () => {
          confirmDeletion();
        },
        titleConfirm: t('Delete'),
        hideCancel: false,
      }),
    );
  };

  return (
    <Animatable.View
      duration={600}
      delay={index * 100}
      animation={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
      key={index}>
      <View style={styles.card}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 40 * BH(),
          }}>
          <Text h3 bold style={{color: colors.darkGray}}>
            {item?.Name}
          </Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              height: 40 * BH(),
            }}>
            <Button
              Entypo="eye"
              EntypoColor={colors.secondaryColor}
              EntypoSize={18 * BW()}
              onPress={() => {
                NavigationService.navigate('ViewFactoryUser', {
                  userData: item,
                  licenseId: licenseId,
                });
              }}
            />
            {item?.IsAdmin === 1 && (
              <>
                <Button
                  Entypo="edit"
                  EntypoColor={colors.secondaryColor}
                  EntypoSize={18 * BW()}
                  onPress={() => {
                    NavigationService.navigate('EditFactoryUser', {
                      userData: item,
                      licenseId: licenseId,
                    });
                  }}
                />
                <Button
                  Entypo="trash"
                  EntypoColor={colors.secondaryColor}
                  EntypoSize={18 * BW()}
                  onPress={_deleteFactoryUser}
                />
              </>
            )}
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text h4>{t('FullName')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.Name || '-'}
          </Text>
        </View>
        <DashedLine />
        <View style={styles.infoRow}>
          <Text h4>{t('EmailLabel')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.Email || '-'}
          </Text>
        </View>
        <DashedLine />
        <View style={styles.infoRow}>
          <Text h4>{t('EmiratesIDLabel')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.IdNumber != 'NULL' ? item?.IdNumber : '-'}
          </Text>
        </View>
        <DashedLine />
        <View style={styles.infoRow}>
          <Text h4>{t('IL.role')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {!item?.IsAdmin ? t('Admin') : t('User')}
          </Text>
        </View>
        <DashedLine />
        <View style={styles.infoRow}>
          <Text h4>{t('IL.IsLinked')} : </Text>
          <Text h4 style={{color: colors.darkGray}}>
            {item?.IsLinked ? 'Yes' : 'No'}
          </Text>
        </View>
        <DashedLine />
        <View style={styles.infoRow}>
          <Text h4>{t('IL.FactoryName')} : </Text>
          <Text h4 style={{color: colors.darkGray, flex: 1}}>
            {isArabic() ? item?.FactoryNameAr : item?.FactoryNameEn}
          </Text>
        </View>
      </View>
    </Animatable.View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 12 * BW(),
      marginBottom: 8 * BH(),
      borderRadius: 6 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
