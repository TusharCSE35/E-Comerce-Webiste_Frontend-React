import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, SHOP_LIST_REQUEST, OUTLET_LIST_REQUEST } from './constants';
import { loginSuccess, loginFailure } from './actions';
import { AuthRepository } from '../../services/api/AuthRepository';
import { toast } from 'react-toastify';

function* handleShopList(payload) {
  try {
    const response = yield call(AuthRepository.fetchShopList, payload.data);

    if (response?.data?.userId) {
      const userData = {
        name: response?.data.name,
        username: response?.data.username
      }
      yield put(loginSuccess(userData));
    }

    if (response?.data?.shopList?.length > 0) {
      payload.navigate('/shop-list', {
        state: {
          shopList: response.data.shopList,
          userId: response.data.userId,
          name: response.data.name,
          message: response.message,
          profileImageUrl: response.data.profileImageUrl,
          username: payload.data.username,
          password: payload.data.password
        }
      });
    } else {
      toast.warn('No shops available');
      payload.navigate('');
    }

  } catch (error) {
    yield put(loginFailure(error.message || 'Login failed'));
    toast.error(error.message || 'Login failed');
  }
}


function* handleOutletList(payload) {
  try {
    const response = yield call(AuthRepository.outletList, payload.data);

    if (response?.data.length > 0) {
      payload.navigate('/outlet-list', {
        state: {
          outletList: response.data,
          shopTitle: payload.data.shopTitle,
          shopLogoUrl: payload.data.shopLogoUrl,
          message: response.message,
          userId: payload.data.userId,
          name: payload.data.name,
          username: payload.data.username,
          password: payload.data.password,
          shopId: payload.data.shopId
        }
      });
    } else {
      toast.warn('No outlet available');
      payload.navigate('');
    }

  } catch (error) {
    yield put(loginFailure(error.message || 'Login failed'));
    toast.error(error.message || 'Login failed');
  }
}

function* handleLogin(payload) {
  try {
    const response = yield call(AuthRepository.fetchLogin, payload.data);
    const token = response?.data?.token;

    if (token) {
      localStorage.setItem("token", token);

      const tempOrderRes = yield call(AuthRepository.getTemporaryOrderId);
      const tempOrderId = tempOrderRes?.data?.temporaryOrderId;
      if (tempOrderId) {
        localStorage.setItem("temporaryOrderId", tempOrderId.toString());
      }
    }

    payload.navigate('/');
  } catch (error) {
    yield put(loginFailure(error.message || 'Login failed'));
    toast.error(error.message || 'Login failed');
  }
}

function* AuthSaga() {
  yield takeLatest(SHOP_LIST_REQUEST, handleShopList);
  yield takeLatest(OUTLET_LIST_REQUEST, handleOutletList);
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}

export default AuthSaga;
