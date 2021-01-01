import { PURGE } from "redux-persist";

var initialState = {
  allCoins: [],
  singleCoin: {},
  showCoinType: 'view',
  showCoinSlider: false,

  allPairs: [],
  showPairType: 'add',
  showPairSlider: false,
}

const Coin_Pair = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE: return initialState;

    /*========== COINS REDUCERS ============= */

    case 'SET_ALL_COINS':
      return {
        ...state,
        allCoins: payload,
      };

    case 'TOGGLE_VIEW_COIN':
      return {
        ...state,
        singleCoin: payload,
        showCoinType: 'view',
        showCoinSlider: !state.showCoinSlider,
      };

    case 'TOGGLE_EDIT_COIN':
      return {
        ...state,
        singleCoin: payload,
        showCoinType: 'edit',
        showCoinSlider: !state.showCoinSlider,
      };

    case 'UPDATE_COIN':
      return {
        ...state,
        singleCoin: payload,
      };

    case 'TOGGLE_ADD_COIN':
      return {
        ...state,
        showCoinType: 'add',
        showCoinSlider: !state.showCoinSlider,
      };

    /*========== PAIRS REDUCERS ============= */

    case 'SET_ALL_PAIRS':
      return {
        ...state,
        allPairs: payload,
      };

    case 'TOGGLE_ADD_PAIR':
      return {
        ...state,
        showPairType: 'add',
        showPairSlider: !state.showPairSlider,
      };

    default:
      return state;
  }
};
export default Coin_Pair;
