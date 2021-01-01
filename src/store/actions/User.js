export const getAllUsers = () => ({
  type: 'GET_ALL_USERS',
});

export const setLoading = (data) => ({
  type: 'SET_LOADING',
  payload: data,
});

export const setAllUsers = (data) => ({
  type: 'SET_ALL_USERS',
  payload: data,
});

export const getSingleUser = (data) => ({
  type: 'GET_SINGLE_USER',
  payload: data,
});

export const setSingleUser = (data) => ({
  type: 'SET_SINGLE_USER',
  payload: data,
});

export const updateUser = ({ data, id }) => ({
  type: 'UPDATE_USER',
  payload: data,
  id
});

export const toggleIsActive = (data) => ({
  type: 'TOGGLE_IS_ACTIVE',
  payload: data
});

export const toggleIsPassword = (data) => ({
  type: 'TOGGLE_IS_PASSWORD',
  payload: data
});

export const toggleIsSMS = (data) => ({
  type: 'TOGGLE_IS_SMS',
  payload: data
});

export const toggleIsTwoFA = (data) => ({
  type: 'TOGGLE_IS_TWO_FA',
  payload: data
});

export const getContactRequest = () => ({
  type: 'GET_CONTACT_REQUEST',
});

export const setContactRequest = (data) => ({
  type: 'SET_CONTACT_REQUEST',
  payload: data,
});

export const resolveTicket = ({data}) => ({
  type: 'RESOLVE_TICKET',
  payload: data,
});