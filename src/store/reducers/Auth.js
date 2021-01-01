import { PURGE } from "redux-persist";
import { setToken } from '../axios';

var initialState =
{
  isLogin: false,
  auth: localStorage.getItem('token'),

  adminData: {},
  isAdminPassword: true,

  adminWallets: [],

  dashboardStats: {
    totalUsers: 0,
    totalDeposits: 1,
    totalWithdrawals: 1,
    newUsers: {
      labels: ["15 - August", "28 - August", "30 - August",],
      data: [2, 2, 4,],
    },
    newTrades: {
      labels: ["LTC/ETH", "LTC/BTC", "BCH/BTC",],
      data: [1, 6, 22,],
    },
    pairTrades: {
      labels: ["16 - August", "17 - August", "20 - August",],
      data: [8, 40, 8,],
    },
    newDeposit: {
      labels: ["29 - August", "30 - August", "31 - August"],
      data: [7, 4, 11],
    },
    coinDeposit: {
      labels: ["BCH", "LTC", "DASH",],
      data: [3, 4, 5,],
    },
    newWithdrawal: {
      labels: ["23 - August", "24 - August", "26 - August",],
      data: [4, 11, 2,],
    },
    coinWithdawal: {
      labels: ["DASH", "LTC", "BCH",],
      data: [2, 2, 4,],
    },
  },

  multiWallets: [],
  showSendSlider: false,
}

const Auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE: return initialState;

    case 'SAVE_LOGIN_DATA':
      setToken(payload.token);
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        auth: payload.token,
      };

    case 'IS_LOGIN_DISABLED':
      return {
        ...state,
        isLogin: !state.isLogin,
      };

    case 'LOGOUT':
      setToken();
      localStorage.removeItem('token');
      return {
        ...state,
        auth: ''
      };

    /*========== ADMIN REDUCERS ============= */

    case 'SET_ADMIN_DATA':
      return {
        ...state,
        adminData: payload,
      };

    case 'TOGGLE_ADD_PASSWORD':
      return {
        ...state,
        isAdminPassword: !state.isAdminPassword,
      };

    case 'SET_ADMIN_WALLETS':
      return {
        ...state,
        adminWallets: payload,
      };

    /*========== DASHBOARD REDUCERS ============= */

    case 'SET_DASHBOARD_STATS':
      return {
        ...state,
        dashboardStats: payload,
      };

    /*========== SEND NEW TRANSACTIONS REDUCERS ============= */

    case 'SET_MULTI_WALLETS':
      return {
        ...state,
        multiWallets: payload,
      };

    case 'TOGGLE_SEND_NEW':
      return {
        ...state,
        showSendSlider: !state.showSendSlider,
      };

    default:
      return state;
  }
};
export default Auth;
