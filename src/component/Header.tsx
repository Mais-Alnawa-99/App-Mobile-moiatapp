import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigationState, useTheme} from '@react-navigation/native';
import {useAppSelector} from '../redux/store';
import {isArabic} from '../locales';
import NavigationService, {goToRoot} from '../navigation/NavigationService';
import Text from './Text';
import theme, {BH, BW} from '../style/theme';
import Button from './Button';
import {_setLang} from '../screens/Lang';
import {LanguageSelectorModal} from '../screens/settings/Sections/Language';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import TTSBottomSheet from './tts/TTSBottomSheet';
import {getAll, getList, resetScope, triggerCollect} from './tts/TTSCollector';

export type Props = {
  title?: string;
  onPress?: () => void;
  hideDrawer?: boolean;
  hideBack?: boolean;
  showNotification?: boolean;
  showSearch?: boolean;
  hideHome?: boolean;
  showLang?: boolean;
  showLogout?: boolean;
  showLineNews?: boolean;
  showLogin?: boolean;
  style?: object;
  titleContainerStyle?: object;
  showDrawerClose?: boolean;
  draweHeader?: boolean;
  showBackDrawer?: boolean;
  showCart?: boolean;
  showProfile?: boolean;
  hideProfile?: boolean;
  onPressSearch?: () => void;
  styleBack?: object;
  onHomePress?: () => void;
  showTTSButton?: boolean;
  ttsScopeId?: any;
  ttstext?: any;
};

const Header: React.FC<Props> = ({
  title,
  onPress,
  style,
  hideDrawer,
  hideBack,
  showNotification,
  showSearch,
  hideHome,
  showLang,
  showLineNews,
  titleContainerStyle,
  showLogout,
  showLogin,
  showDrawerClose,
  draweHeader,
  showBackDrawer,
  showCart,
  showProfile,
  hideProfile,
  onPressSearch,
  onHomePress,
  styleBack,
  showTTSButton,
  ttsScopeId,
  ttstext,
  ...props
}): JSX.Element => {
  const handleGoBack = onPress
    ? () => onPress()
    : () => NavigationService.goBack();
  const handleBackDrawer = () => {
    // NavigationService.goBack();
    NavigationService.openDrawer();
  };
  const {colors}: any = useTheme();
  const styles = getStyles(colors, draweHeader);
  const {isLoggedIn} = useAppSelector(store => store.auth);
  const {cartItems} = useAppSelector(state => state.cartItems);
  const [showLangModal, setShowLangModal] = useState(false);
  const userName = useAppSelector(state => state.auth.userName);

  const index = useAppSelector(s => s.navigation.stackIndex);
  const [ttsOpen, setTtsOpen] = useState(false);
  const [ttsTextLocal, setTtsTextLocal] = useState('');

  const handleOpenTTS = () => {
    resetScope(ttsScopeId);
    triggerCollect(ttsScopeId);
    const all = getAll(ttsScopeId);

    setTtsOpen(true);
    setTtsTextLocal(all);
  };
  return (
    <View
      style={[
        styles.container,
        // !!props?.showLogo && styles.height,
        {...style},
      ]}>
      <View
        style={[
          styles.headerContainer,
          // !!props?.showLogo && styles.height
        ]}>
        {/* {!!props?.showLogo && (
          <LogoImage style={{marginTop: 4 * BW()}} white={props?.whiteLogo} />
        )} */}

        <View style={styles.flexRow}>
          {!hideDrawer && (
            <Button
              onPress={() => NavigationService.openDrawer()}
              icon={require('../assets/header/drawer.png')}
              style={{...styles.btnContainer}}
              containerIcon={styles.btn}
              styleIcon={{
                ...styles.image,
                transform: [{scaleX: isArabic() ? -1 : 1}],
              }}
            />
          )}
          {showDrawerClose && (
            <Button
              onPress={() => {
                NavigationService.closeDrawer();
                NavigationService.navigate('DrawerRoot');
              }}
              icon={require('../assets/icons/close.png')}
              style={{
                ...styles.btnContainer,
                marginLeft: 0,
              }}
              containerIcon={styles.btn}
              styleIcon={styles.image}
            />
          )}
          {showBackDrawer && (
            <Button
              onPress={() => handleBackDrawer()}
              style={{...styles.btnContainer, marginLeft: 0}}
              containerIcon={styles.btn}
              antDesign={'arrowleft'}
              antDesignColor={colors.iconPrimaryColor}
              antDesignSize={22 * BW()}
              styleIcon={{
                transform: [{scaleX: !isArabic() ? 1 : -1}],
              }}
            />
          )}

          {showCart && cartItems?.length > 0 && (
            <View>
              <Button
                onPress={() => NavigationService.navigate('StandardsCart')}
                icon={require('../assets/header/cart.png')}
                style={{
                  ...styles.btnContainer,
                  width: 24 * BW(),
                  height: 34 * BW(),
                  marginStart: hideDrawer ? 0 : 8 * BW(),
                }}
                containerIcon={styles.btn}
                styleIcon={styles.image}
              />
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: colors.red,
                  width: 18 * BW(),
                  height: 18 * BW(),
                  top: -4 * BW(),
                  right: -4 * BW(),
                  borderRadius: 50,
                  zIndex: 99,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  h5
                  style={{color: colors.mainWhite, lineHeight: 20 * BW()}}>
                  {cartItems?.length}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={[styles.titleContainer, {...titleContainerStyle}]}>
          <Text numberOfLines={1} h2 bold style={styles.title}>
            {title}
          </Text>
        </View>
        <View
          style={[
            styles.flexRow,
            {
              justifyContent: 'flex-end',
              gap: 8 * BW(),
            },
          ]}>
          {showTTSButton && (
            <Button
              onPress={() => handleOpenTTS()}
              style={styles.btnContainer}
              antDesign={'sound'}
              antDesignSize={20 * BW()}
              antDesignColor={
                !draweHeader
                  ? colors.iconPrimaryColor
                  : colors.tintColorDrawerHeader
              }
              containerIcon={styles.btn}
            />
          )}
          {isLoggedIn && showLogout && (
            <Button
              onPress={() => {}}
              icon={require('../assets/header/out.png')}
              style={styles.btnContainer}
              containerIcon={styles.btn}
              styleIcon={{
                ...styles.image,
                transform: [{rotate: !isArabic() ? '180deg' : '0deg'}],
              }}
            />
          )}
          {!isLoggedIn && showLogin && (
            <Button
              onPress={() =>
                NavigationService.navigate('DashboardTab', {showBack: true})
              }
              icon={require('../assets/header/login.png')}
              style={styles.btnContainer}
              containerIcon={styles.btn}
              styleIcon={{
                ...styles.image,
                transform: [{rotate: !isArabic() ? '180deg' : '0deg'}],
              }}
            />
          )}
          {/* {showProfile && isLoggedIn && (
            <Button
              onPress={() => {
                NavigationService.navigate('DrawerRoot', {screen: 'dashboard'});
              }}
              icon={require('../assets/tabs/dashboard.png')}
              style={styles.btnContainer}
              containerIcon={styles.btn}
              styleIcon={styles.image}
            />
          )} */}

          {showSearch && (
            <Button
              onPress={() => {
                onPressSearch
                  ? onPressSearch()
                  : NavigationService.navigate('SearchDrawer', {
                      screen: 'SearchScreen',
                      clearSearch: true,
                    });
              }}
              icon={require('../assets/header/search.png')}
              style={styles.btnContainer}
              containerIcon={styles.btn}
              styleIcon={styles.image}
            />
          )}

          {/* {showNotification && (
            <Button
              onPress={() => {}}
              icon={require('../assets/header/notification.png')}
              style={styles.btnContainer}
              containerIcon={styles.btn}
              styleIcon={styles.image}
            />
          )} */}

          {showLang && (
            <Button
              onPress={() => {
                setShowLangModal(true);
                // isArabic() ? _setLang('en') : _setLang('ar');
              }}
              style={{
                ...styles.btnContainer,
                // backgroundColor: colors.primary + '22',
                // borderRadius: 6 * BW(),
                // width: 25 * BW(),
                // height: 25 * BW(),
              }}
              // title={isArabic() ? 'En' : 'ع'}
              h2
              medium
              // ar={isArabic() ? false : true}
              // en={isArabic() ? true : false}
              icon={require('../assets/settings/GlobeSimple.png')}
              styleIcon={{
                ...styles.image,
                // tintColor: colors.secondaryColor,
                resizeMode: 'contain',
              }}
              containerIcon={styles.btn}
              // styleText={{
              //   color: colors.secondaryColor,
              //   lineHeight: isArabic() ? 28 * BW() : 24 * BW(),
              // }}
            />
          )}
          {index >= 2 && !hideHome && (
            <Button
              onPress={onHomePress ?? (() => goToRoot())}
              icon={require('../assets/header/home.png')}
              style={{
                ...styles.btnContainer,
                width: 24 * BW(),
                height: 30 * BW(),
              }}
              containerIcon={styles.btn}
              styleIcon={styles.image}
            />
          )}
          {index >= 1 && !hideBack && (
            <Button
              onPress={() => handleGoBack()}
              icon={require('../assets/icons/back.png')}
              style={{...styles.btnContainer, styleBack}}
              containerIcon={styles.btn}
              styleIcon={{
                ...styles.image,
                transform: [{rotate: !isArabic() ? '180deg' : '0deg'}],
              }}
            />
          )}

          {/* {!hideProfile && !!userName && index == 0 && (
            <TouchableOpacity
              style={styles.userImage}
              activeOpacity={0.5}
              onPress={() => {
                NavigationService.navigate('UserDetails');
              }}>
              <FontAwesomeIcon
                icon={faUser}
                color={colors.lightgray}
                size={18 * BW()}
              />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
      <LanguageSelectorModal
        visible={showLangModal}
        onClose={() => setShowLangModal(false)}
      />
      <TTSBottomSheet
        visible={ttsOpen}
        onClose={() => setTtsOpen(false)}
        text={ttstext ? ttstext : ttsTextLocal ?? ''}
      />
    </View>
  );
};

const getStyles = (colors: any, draweHeader?: boolean) =>
  StyleSheet.create({
    container: {
      height: 46 * BH(),
      width: '100%',
      backgroundColor: 'transparent',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    height: {
      height: 55 * BH(),
    },
    headerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
      height: 50 * BH(),
      paddingHorizontal: 16 * BW(),
      width: '100%',
      justifyContent: 'space-between',
    },
    firstItem: {
      paddingTop: 8 * BW(),
      paddingHorizontal: 12 * BW(),
      backgroundColor: colors.background,
      marginTop: -12 * BW(),
    },
    flexRow: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '20%',
    },
    title: {lineHeight: 30 * BW()},
    btnContainer: {
      width: 20 * BW(),
      height: 30 * BW(),
      zIndex: 6,
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: '100%',
      height: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'center',
      tintColor: !draweHeader
        ? colors.iconPrimaryColor
        : colors.tintColorDrawerHeader,
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    userImage: {
      width: 30 * BW(),
      height: 30 * BW(),
      borderRadius: 60 * BW(),
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Header;
