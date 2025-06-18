import { call, put, takeLatest } from "redux-saga/effects";
import CartRepository from "../../services/api/CartRepository";

import {
  FETCH_CART_REQUEST,
  ADD_UPDATE_CART_REQUEST,
} from "./constants";

import {
  fetchCartSuccess,
  fetchCartFailure,
  addUpdateCartSuccess,
  addUpdateCartFailure,
  fetchCartRequest,
} from "./actions";

function* fetchCartSaga(action) {
  try {
    const temporaryOrderId = action.payload;
    const response = yield call(CartRepository.getCartItems, temporaryOrderId);
   
    if (response.status === 1) {
      yield put(fetchCartSuccess(response.items));
    } else {
      yield put(fetchCartFailure(response.msg || "Failed to fetch cart"));
    }
  } catch (error) {
    yield put(fetchCartFailure(error.message));
  }
}

function* addUpdateCartSaga(action) {
  try {
    const payload = action.payload;
    const response = yield call(CartRepository.addOrUpdateCart, payload);
   
    if (response.statusCode === 1 || response.status === "item added") {
      yield put(addUpdateCartSuccess());
      yield put(fetchCartRequest(payload.temporaryOrderId));
    } else {
      yield put(addUpdateCartFailure(response.status || "Failed to add/update cart"));
    }
  } catch (error) {
    yield put(addUpdateCartFailure(error.message));
  }
}

export default function* cartSaga() {
  yield takeLatest(FETCH_CART_REQUEST, fetchCartSaga);
  yield takeLatest(ADD_UPDATE_CART_REQUEST, addUpdateCartSaga);
}
