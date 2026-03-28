// Token decoder utility for JWT tokens
export const decodeJWT = (token: string) => {
  try {
    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token format');
    }

    // Decode the payload (second part)
    const payload = parts[1];

    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);

    // Decode base64
    const decodedPayload = atob(paddedPayload);

    // Parse JSON
    const parsedPayload = JSON.parse(decodedPayload);

    return parsedPayload;
  } catch (error) {
    return null;
  }
};

// Extract expiry date from JWT token
export const getTokenExpiryDate = (token: string): string | null => {
  try {
    const decoded = decodeJWT(token);
    if (decoded && decoded.exp) {
      // Convert Unix timestamp to ISO string
      const expiryDate = new Date(decoded.exp * 1000).toISOString();
      return expiryDate;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJWT(token);
    if (decoded && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    }
    return true; // Consider expired if can't decode
  } catch (error) {
    return true;
  }
};
