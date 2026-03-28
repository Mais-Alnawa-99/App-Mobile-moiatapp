import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {BW} from '../../style/theme';
import {useTranslation} from 'react-i18next';
import {isArabic} from '../../locales';

export default function WelcomePop({onFinish, theme}): JSX.Element {
  const [selected, setSelected] = useState(null);
  const colors = theme.colors;
  const {t} = useTranslation();

  const options = [
    {
      id: 'supplier',
      label: t('WelcomeOptions.supplierLabel'),
      subtitle: t('WelcomeOptions.supplierSubtitle'),
      bottomText: t('WelcomeOptions.supplierBottom'),
    },
    {
      id: 'buyer',
      label: t('WelcomeOptions.buyerLabel'),
      subtitle: t('WelcomeOptions.buyerSubtitle'),
      bottomText: t('WelcomeOptions.buyerBottom'),
    },
    {
      id: 'other',
      label: t('WelcomeOptions.otherLabel'),
      bottomText: t('WelcomeOptions.otherBottom'),
    },
  ];

  const handleSelect = id => {
    setSelected(id);
  };

  return (
    <View style={[styles.overlay, {backgroundColor: colors.backgroundColor}]}>
      <View style={[styles.container, {backgroundColor: colors.white}]}>
        <Image
          source={require('../../assets/login/headerlogin.png')}
          style={styles.headerImage}
          resizeMode="cover"
        />

        <Text style={[styles.title, {color: colors.secondaryColor}]}>
          {t('WelcomeOptions.Welcome')}
        </Text>

        {options.map(opt => (
          <TouchableOpacity
            key={opt.id}
            style={[styles.card, {backgroundColor: colors.mainBackground}]}
            onPress={() => handleSelect(opt.id)}
            activeOpacity={1}>
            <Text style={[styles.cardText, {color: colors.primary}]}>
              {opt.label}
            </Text>

            {opt.subtitle ? (
              <Text style={[styles.cardSubtitle, {color: colors.primary}]}>
                {opt.subtitle}
              </Text>
            ) : null}

            {opt.bottomText ? (
              <Text style={[styles.cardBottomText, {color: colors.primary}]}>
                {opt.bottomText}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.button, {borderColor: colors.secondaryColor}]}
          onPress={() => onFinish(selected)}
          activeOpacity={1}>
          <View style={[styles.buttonContent, {flexDirection: 'row'}]}>
            <Text style={[styles.buttonText, {color: colors.secondaryColor}]}>
              {t('WelcomeOptions.continueVisitor')}
            </Text>

            <Image
              source={require('../../assets/opportunities/Vector.png')}
              style={[styles.extraIcon, {tintColor: colors.secondaryColor}]}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    height: '80%',

    borderRadius: 20,
    padding: 22 * BW(),
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 12 * BW(),
  },
  subText: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15 * BW(),
  },
  card: {
    width: 340 * BW(),
    height: 158 * BW(),
    padding: 15 * BW(),
    borderRadius: 15 * BW(),
    marginVertical: 6 * BW(),
    top: 30 * BW(),
  },

  cardText: {
    fontSize: 16,
    direction: isArabic() ? 'rtl' : 'ltr',
    fontWeight: '700',
  },

  headerImage: {
    width: 358 * BW(),
    height: 30 * BW(),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20 * BW(),
    borderTopRightRadius: 20 * BW(),
  },

  button: {
    marginHorizontal: 10,
    marginTop: 40 * BW(),
    borderWidth: 1,
    borderRadius: 22 * BW(),
    width: isArabic() ? 120 * BW() : 150 * BW(),
    height: 31 * BW(),
    justifyContent: 'center',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 6 * BW(),
  },

  buttonText: {
    fontSize: 15 * BW(),
    fontWeight: '500',
    textAlign: 'center',
  },

  extraIcon: {
    width: 13 * BW(),
    height: 13 * BW(),
    transform: [{scaleX: isArabic() ? 1 : -1}],
  },

  cardSubtitle: {
    fontSize: 15,
    marginTop: 4 * BW(),
    direction: isArabic() ? 'rtl' : 'ltr',
    fontWeight: '200',
  },

  cardBottomText: {
    fontSize: 14,
    position: 'absolute',
    bottom: 10 * BW(),

    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',

    right: isArabic() ? 15 * BW() : 20 * BW(),
  },
});
