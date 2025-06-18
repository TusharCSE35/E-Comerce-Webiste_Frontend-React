import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SHOP_LIST_REQUEST,
  OUTLET_LIST_REQUEST
} from './constants';


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SHOP_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case OUTLET_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };

    case LOGIN_FAILURE:
      localStorage.removeItem('user');
      localStorage.setItem('isAuthenticated', 'false');

      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null
      };

    default:
      return state;
  }
}

export default rootReducer;
