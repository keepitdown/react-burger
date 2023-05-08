const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = '/ingredients'
const ORDER_URL = '/orders';
const SIGN_UP_URL = '/auth/register';
const RECOVER_URL = '/password-reset';
const RESET_URL = '/password-reset/reset';
const LOG_IN_URL = '/auth/login';
const LOG_OUT_URL = '/auth/logout';
const REFRESH_TOKEN_URL = '/auth/token';
const PROFILE_DATA_URL = '/auth/user';

const FEED_WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const HISTORY_WS_URL = 'wss://norma.nomoreparties.space/orders';

const addedIngredient = 'addedIngredient';
const movedIngredient = 'movedIngredient';

const login = 'login';
const recover = 'recover';
const reset = 'reset';

const done = 'done';
const pending = 'pending';
const created = 'created';

const accessToken = 'accessToken';
const refreshToken = 'refreshToken';
const accessTokenMaxAge = '1200';
const refreshTokenMaxAge = '2592000';

export {
  BASE_URL, INGREDIENTS_URL, ORDER_URL, SIGN_UP_URL, RESET_URL, RECOVER_URL, LOG_IN_URL, LOG_OUT_URL, REFRESH_TOKEN_URL,
  PROFILE_DATA_URL, FEED_WS_URL, HISTORY_WS_URL, addedIngredient, movedIngredient, login, recover, reset, done, pending, created, accessToken, refreshToken,
  accessTokenMaxAge, refreshTokenMaxAge
};