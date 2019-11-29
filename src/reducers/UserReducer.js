import { SIGNIN, SIGNOUT } from "../actions/consts";
const initialState = {
  isAuthenticated: false
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        isAuthenticated: true
      };
    case SIGNOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
