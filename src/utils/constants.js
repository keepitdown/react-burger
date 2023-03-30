const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = '/ingredients'
const ORDER_URL = '/orders';
const SIGN_UP_URL = '/auth/register';
const LOG_IN_URL = '/auth/login';
const LOG_OUT_URL = '/auth/logout';
const REFRESH_TOKEN_URL = '/auth/token';
const PROFILE_DATA_URL = '/auth/user';

const addedIngredient = 'addedIngredient';
const movedIngredient = 'movedIngredient';

const accessToken = 'accessToken';
const refreshToken = 'refreshToken';
const accessTokenMaxAge = 1200;
const refreshTokenMaxAge = 2592000;

export {
  BASE_URL, INGREDIENTS_URL, ORDER_URL, SIGN_UP_URL, LOG_IN_URL, LOG_OUT_URL, REFRESH_TOKEN_URL,
  PROFILE_DATA_URL, addedIngredient, movedIngredient, accessToken, refreshToken, accessTokenMaxAge, refreshTokenMaxAge
};