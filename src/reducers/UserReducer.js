import {
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  USER_API_FAIL,
  USER_API_REQUEST
} from "../actions/consts";
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  data: null
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        data: action.payload
      };
    case SIGNOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    case USER_API_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_API_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case SIGNUP:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
