import {authorize, refresh, revoke} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from './environment';

const config = {
  issuer: 'https://sso-stag.moiat.gov.ae', // مزود المصادقة (Authorization Server)
  clientId: 'wfengine_front_stg', // معرف العميل (Client ID)
  redirectUrl: `${environment.clientRoot}/signin-callback`, // يجب أن يكون URI مخصصًا
  scopes: ['openid', 'profile'], // الصلاحيات المطلوبة
  serviceConfiguration: {
    authorizationEndpoint: 'https://sso-stag.moiat.gov.ae/connect/authorize',
    tokenEndpoint: 'https://sso-stag.moiat.gov.ae/connect/token',
  },
};

class AuthService {
  // 🔹 تسجيل الدخول
  async login(): Promise<any> {
    try {
      const authState = await authorize(config);

      await AsyncStorage.setItem('authState', JSON.stringify(authState)); // تخزين بيانات المصادقة
      return authState;
    } catch (error) {
      return null;
    }
  }

  // 🔹 جلب بيانات المستخدم المخزنة
  async getUser(): Promise<any | null> {
    try {
      const storedAuthState = await AsyncStorage.getItem('authState');
      return storedAuthState ? JSON.parse(storedAuthState) : null;
    } catch (error) {
      return null;
    }
  }

  // 🔹 تجديد `Access Token` إذا انتهت صلاحيته
  async renewToken(): Promise<any | null> {
    try {
      const authState = await this.getUser();
      if (!authState || !authState.refreshToken) return null;

      const refreshedState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });

      await AsyncStorage.setItem('authState', JSON.stringify(refreshedState)); // تحديث الـ Token
      return refreshedState;
    } catch (error) {
      return null;
    }
  }

  // 🔹 تسجيل الخروج
  async logout(): Promise<void> {
    try {
      const authState = await this.getUser();
      if (authState) {
        await revoke(config, {tokenToRevoke: authState.accessToken});
      }
      await AsyncStorage.removeItem('authState');
    } catch (error) {}
  }

  // 🔹 جلب Access Token
  async getAccessToken(): Promise<string | null> {
    const authState = await this.getUser();
    return authState?.accessToken || null;
  }
}

export const authService = new AuthService();
