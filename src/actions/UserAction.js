import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  USER_API_FAIL,
  USER_API_REQUEST
} from "./consts";

import { BASE_URL, langs } from "../config";
import { firebaseResponseTransform } from "../utils";

const header = {
  headers: {
    "Content-Type": "application/json"
  }
};

/**
 * @updateUserStore
 * @desc: Update user store date from the local storage
 */
export function updateUserStore(userData) {
  return dispatch => {
    dispatch({
      type: SIGNIN,
      payload: userData
    });
  };
}

export function signin(user, callback) {
  return dispatch => {
    dispatch({
      type: USER_API_REQUEST
    });
    axios
      .get(`${BASE_URL}/users.json`, header)
      .then(response => {
        console.log("signin response ", response.data);
        const usersData = firebaseResponseTransform(response.data);
        console.log("userData", usersData);
        const loggedUser = usersData.find(
          val => val.email == user.email && val.password == user.password
        );
        console.log("loggedUser ", loggedUser);
        if (loggedUser) {
          dispatch({
            type: SIGNIN,
            payload: loggedUser
          });
          toast.success(langs.messages.SUCCESSFUL_SIGNIN);
          reactLocalStorage.set("isAuthenticated", true);
          reactLocalStorage.setObject("loggedUser", loggedUser);
          callback();
        } else {
          toast.error(langs.messages.INVALID_USERNAME_PASSWORD);
          dispatch({
            type: USER_API_FAIL
          });
        }
      })
      .catch(error => {
        console.log("signup error");
        dispatch({
          type: USER_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
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

export function signup(data, callback) {
  return dispatch => {
    dispatch({
      type: USER_API_REQUEST
    });
    axios
      .post(`${BASE_URL}/users.json`, data, header)
      .then(response => {
        console.log("signup response ", response);
        dispatch({
          type: SIGNUP
        });
        toast.success(langs.messages.SUCCESSFUL_SIGNUP);
        callback();
      })
      .catch(error => {
        console.log("signup error");
        dispatch({
          type: USER_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}
