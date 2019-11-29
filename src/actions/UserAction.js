import { SIGNIN, SIGNOUT } from "./consts";
import { reactLocalStorage } from "reactjs-localstorage";

export function signin(callback) {
  return dispatch => {
    dispatch({
      type: SIGNIN
    });
    reactLocalStorage.set("isAuthenticated", true);
    callback();
  };
}

export function signout(callback) {
  return dispatch => {
    dispatch({
      type: SIGNOUT
    });
    reactLocalStorage.set("isAuthenticated", false);
    reactLocalStorage.clear();
    callback();
  };
}
