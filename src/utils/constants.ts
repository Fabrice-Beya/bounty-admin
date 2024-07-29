export const LIMIT = 10;
export const SUPER_ADMIN = 'SUPER_ADMIN';
export const ADMIN = 'ADMIN';
export const STAFF = 'STAFF';
export const TOKEN = 'token';
export const PERMISSIONS = 'permissions';
export const AUTH_CRED = 'AUTH_CRED';
export const EMAIL_VERIFIED = 'emailVerified';
export const CART_KEY = 'pick-cart';
export const CHECKOUT = 'pickbazar-checkout';
export const RESPONSIVE_WIDTH = 659 as number;
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
// export const ACCEPTED_FILE_TYPES =
//   'image/*,application/pdf,application/zip,application/vnd.rar,application/epub+zip,.psd';

export const ACCEPTED_FILE_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'application/pdf': [],
  'application/zip': [],
  'application/vnd.rar': [],
  'application/epub+zip': [],
  '.psd': [],
}
