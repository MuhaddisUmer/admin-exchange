/*========== COINS ACTIONS ============= */

export const toggleViewCoin = (data) => ({
  type: 'TOGGLE_VIEW_COIN',
  payload: data
});

export const getAllCoins = () => ({
  type: 'GET_ALL_COINS',
});

export const setAllCoins = (data) => ({
  type: 'SET_ALL_COINS',
  payload: data,
});

export const toggleEditCoin = (data) => ({
  type: 'TOGGLE_EDIT_COIN',
  payload: data
});

export const editCoin = ({ data, id }) => ({
  type: 'EDIT_COIN',
  payload: data,
  id
});

export const updateCoin = (data) => ({
  type: 'UPDATE_COIN',
  payload: data
});

export const toggleAddCoin = () => ({
  type: 'TOGGLE_ADD_COIN',
});

export const addCoin = ({ data }) => ({
  type: 'ADD_COIN',
  payload: data,
});

/*========== PAIRS ACTIONS ============= */

export const getAllPairs = () => ({
  type: 'GET_ALL_PAIRS',
});

export const setAllPairs = (data) => ({
  type: 'SET_ALL_PAIRS',
  payload: data,
});

export const toggleAddPair = () => ({
  type: 'TOGGLE_ADD_PAIR',
});

export const addPair = ({ data }) => ({
  type: 'ADD_PAIR',
  payload: data,
});

export const deletePair = (data) => ({
  type: 'DELETE_PAIR',
  payload: data,
});