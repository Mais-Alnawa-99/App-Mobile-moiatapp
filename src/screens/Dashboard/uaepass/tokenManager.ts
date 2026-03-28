import {store} from '../store';
import {getAuthToken} from '../reducers/Thunk/thunks';
import {
  setTokenAuthValues,
  setCustomerToken,
  clearCustomerToken,
} from '../reducers/allReducers';
import {
  decodeJWT,
  getTokenExpiryDate,
  isTokenExpired as isJWTExpired,
} from '../../utils/tokenDecoder';

let refreshPromise = null;

export function isTokenExpired() {
  const token = store.getState().authToken.authToken;

  if (token == '') return true;

  try {
    const currentDate = Math.floor(Date.now() / 1000);
    const expiryDate = store.getState().authToken.expiryDate;

    if (!expiryDate || expiryDate - currentDate < 60) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export async function ensureValidToken() {
  // If a refresh is already in progress, wait for it
  if (refreshPromise) {
    const newToken = await refreshPromise;
    return newToken;
  }

  // Start a new refresh
  refreshPromise = getPublicToken()
    .then(newToken => {
      refreshPromise = null;
      return newToken;
    })
    .catch(err => {
      refreshPromise = null;
      throw err;
    });

  return refreshPromise;
}

async function refreshToken() {
  try {
    return getPublicToken();
  } catch (err) {
    return null;
  }
}

// Function to decode JWT token and get expiration date
export const decodeTokenAndGetExpiry = (token: string): Date | null => {
  try {
    if (!token) return null;

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return null;

    const payload = tokenParts[1];
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const decodedPayload = atob(paddedPayload);
    const payloadObj = JSON.parse(decodedPayload);
    if (payloadObj.exp) {
      return payloadObj.exp;
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Function to get public token
export const getPublicToken = async (): Promise<string | null> => {
  const token = store.getState().authToken.authToken;

  try {
    if (!isTokenExpired()) {
      return token;
    }
    const response = await store.dispatch(getAuthToken() as any);

    if (
      response.payload?.res?.status === 'success' &&
      response.payload?.res?.result
    ) {
      const newToken = response.payload.res.result;
      const expiryDate = decodeTokenAndGetExpiry(newToken);

      store.dispatch(
        setTokenAuthValues({
          authToken: newToken,
          expiryDate: expiryDate,
        }),
      );

      return newToken;
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Function to validate token and refresh if needed
export const validateAndRefreshToken = async (): Promise<string | null> => {
  const currentToken = store.getState().authToken.authToken;

  if (!currentToken) {
    return await getPublicToken();
  }

  const expiryDateStr = store.getState().authToken.expiryDate;
  const currentDate = new Date();
  const expiryDate = expiryDateStr ? new Date(expiryDateStr) : null;

  if (!expiryDate || currentDate > expiryDate) {
    return await getPublicToken();
  }

  return currentToken;
};

// Function to get appropriate token based on user login status
export const getActiveToken = async (): Promise<string | null> => {
  const state = store.getState();
  const customerToken = state.authToken.customerToken;
  const isLoggedIn = state.authToken.isLoggedIn;

  // If user is logged in and has a customer token, use it
  if (isLoggedIn && customerToken) {
    // Check if customer token is expired
    if (!isJWTExpired(customerToken)) {
      return customerToken;
    } else {
      // Try to refresh customer token
      const newToken = await refreshCustomerTokenIfNeeded(customerToken);
      if (newToken) {
        return newToken;
      }
      // If refresh failed, clear customer token and fall back to public token
      store.dispatch(clearCustomerToken());
    }
  }

  // Use public token for anonymous users or when customer token fails
  return await validateAndRefreshToken();
};

// Function to refresh customer token
export const refreshCustomerTokenIfNeeded = async (
  customerToken: string,
): Promise<string | null> => {
  try {
    const {refreshCustomerToken} = await import('../reducers/Thunk/thunks');
    const response = await store.dispatch(
      refreshCustomerToken(customerToken) as any,
    );

    if (response.payload?.res?.status === 'success') {
      const {refreshToken, result} = response.payload.res;
      const expiryDate = getTokenExpiryDate(refreshToken);

      // Update customer token in store
      store.dispatch(
        setCustomerToken({
          token: refreshToken,
          expiryDate,
          userInfo: result,
        }),
      );

      return refreshToken;
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Function to handle login success and store customer token
export const handleLoginSuccess = (refreshToken: string, userInfo: any) => {
  const expiryDate = getTokenExpiryDate(refreshToken);

  store.dispatch(
    setCustomerToken({
      token: refreshToken,
      expiryDate,
      userInfo,
    }),
  );
};

// Function to logout and clear customer token
export const handleLogout = () => {
  store.dispatch(clearCustomerToken());
};

// Export token manager functions as a module
export const tokenManager = {
  getPublicToken,
  validateAndRefreshToken,
  getActiveToken,
  decodeTokenAndGetExpiry,
  handleLoginSuccess,
  handleLogout,
  refreshCustomerTokenIfNeeded,
};
