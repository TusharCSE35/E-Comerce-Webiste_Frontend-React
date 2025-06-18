import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SHOP_LIST_REQUEST,
  OUTLET_LIST_REQUEST
} from './constants';

export const loginUser = (payload, navigate) => ({
  type: LOGIN_REQUEST,
  data: payload,
  navigate,
});

export const shopList = (payload, navigate) => ({
  type: SHOP_LIST_REQUEST,
  data: payload,
  navigate,
});

export const outletList = (payload, navigate) => ({
  type: OUTLET_LIST_REQUEST,
  data: payload,
  navigate,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
