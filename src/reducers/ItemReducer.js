import {
  ITEM_API_FAIL,
  ITEM_API_SUCCESS,
  ITEM_API_REQUEST,
  ALLITEMS,
  ALLDAYITEMS
} from "../actions/consts";
const initialState = {
  isLoading: false,
  allItems: [],
  allDayItems: []
};

export default function ItemsReducer(state = initialState, action) {
  switch (action.type) {
    case ALLITEMS:
      return {
        ...state,
        isLoading: false,
        allItems: action.payload
      };
    case ITEM_API_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ITEM_API_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case ITEM_API_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case ALLDAYITEMS:
      return {
        ...state,
        isLoading: false,
        allDayItems: action.payload
      };
    default:
      return state;
  }
}
