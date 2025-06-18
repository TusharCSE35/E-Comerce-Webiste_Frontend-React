import {combineReducers} from "redux";
import AuthReducer from "./auth/reducer"
import CartReducer from "./cart/reducer"

const rootReducer = combineReducers({
    auth: AuthReducer,
    cart: CartReducer
})
export default rootReducer