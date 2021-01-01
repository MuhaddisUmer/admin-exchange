export const login = ({ data, history }) => ({
  type: 'LOGIN',
  payload: data,
  history,
});

export const saveloginData = (data) => ({
  type: 'SAVE_LOGIN_DATA',
  payload: data,
});

export const isloginDisabled = () => ({
  type: 'IS_LOGIN_DISABLED',
});

export const logout = () => ({
  type: 'LOGOUT'
});

/*========== ADMIN ACTIONS ============= */

export const getAdminData = () => ({
  type: 'GET_ADMIN_DATA',
});

export const setAdminData = (data) => ({
  type: 'SET_ADMIN_DATA',
  payload: data,
});

export const toggleAdminPassword = () => ({
  type: 'TOGGLE_ADD_PASSWORD',
});

export const changeAdminPassword = (data) => ({
  type: 'CHANGE_ADMIN_PASSWORD',
  payload: data,
});

export const getAdminWallets = () => ({
  type: 'GET_ADMIN_WALLETS',
});

export const setAdminWallets = (data) => ({
  type: 'SET_ADMIN_WALLETS',
  payload: data,
});

/*========== DASHBOARD ACTIONS ============= */

export const getDashboardStats = () => ({
  type: 'GET_DASHBOARD_STATS',
});

export const setDashboardStats = (data) => ({
  type: 'SET_DASHBOARD_STATS',
  payload: data,
});

/*========== SEND NEW TRANSACTIONS ACTIONS ============= */

export const toggleSendNew = () => ({
  type: 'TOGGLE_SEND_NEW',
});

export const getMultiWallets = () => ({
  type: 'GET_MULTI_WALLETS',
});

export const setMultiWallets = (data) => ({
  type: 'SET_MULTI_WALLETS',
  payload: data,
});

export const sendNewTransactions = (data) => ({
  type: 'SEND_NEW_TRANSACTIONS',
  payload: data,
});

