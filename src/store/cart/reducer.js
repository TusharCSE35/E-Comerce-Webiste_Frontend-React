import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  ADD_UPDATE_CART_REQUEST,
  ADD_UPDATE_CART_SUCCESS,
  ADD_UPDATE_CART_FAILURE,
} from "./constants";

const initialState = {
  loading: false,
  items: [],
  error: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CART_REQUEST:
    case ADD_UPDATE_CART_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case ADD_UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_CART_FAILURE:
    case ADD_UPDATE_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
