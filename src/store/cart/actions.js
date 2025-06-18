import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  ADD_UPDATE_CART_REQUEST,
  ADD_UPDATE_CART_SUCCESS,
  ADD_UPDATE_CART_FAILURE,
} from "./constants";

export const fetchCartRequest = (temporaryOrderId) => ({
  type: FETCH_CART_REQUEST,
  payload: temporaryOrderId,
});

export const fetchCartSuccess = (items) => ({
  type: FETCH_CART_SUCCESS,
  payload: items,
});

export const fetchCartFailure = (error) => ({
  type: FETCH_CART_FAILURE,
  payload: error,
});

export const addUpdateCartRequest = (payload) => ({
  type: ADD_UPDATE_CART_REQUEST,
  payload,
});

export const addUpdateCartSuccess = () => ({
  type: ADD_UPDATE_CART_SUCCESS,
});

export const addUpdateCartFailure = (error) => ({
  type: ADD_UPDATE_CART_FAILURE,
  payload: error,
});
