import { PURGE } from "redux-persist";

var initialState = {
  allUsers: [],
  userDetails: {},
  userWallet: [],
  userTrades: [],
  userHistory: [],
  isLoading: false,
  isSMS: false,
  isActive: false,
  isTwoFA: false,
  isPassword: false,
  allContacts: [],
}

const User = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE: return initialState;

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: payload,
      };

    case 'SET_ALL_USERS':
      return {
        ...state,
        allUsers: payload,
      };

    case 'SET_SINGLE_USER':
      return {
        ...state,
        userDetails: payload['details'],
        userWallet: payload['balance'],
        userTrades: payload['trades'],
        userHistory: payload['history'],
      };

    case 'TOGGLE_IS_ACTIVE':
      return {
        ...state,
        isActive: payload,
      };

    case 'TOGGLE_IS_PASSWORD':
      return {
        ...state,
        isPassword: payload,
      };

    case 'TOGGLE_IS_SMS':
      return {
        ...state,
        isSMS: payload,
      };

    case 'TOGGLE_IS_TWO_FA':
      return {
        ...state,
        isTwoFA: payload,
      };

    case 'SET_CONTACT_REQUEST':
      return {
        ...state,
        allContacts: payload,
      };

    default:
      return state;
  }
};

export default User;
