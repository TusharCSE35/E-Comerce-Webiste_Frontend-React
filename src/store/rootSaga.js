import {all,fork} from 'redux-saga/effects'
import AuthSaga from "./auth/sagas"
import CartSaga from "./cart/sagas"
export default function* rootSaga(){
    yield all([
        fork(AuthSaga),
        fork(CartSaga)
    ])
}