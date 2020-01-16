import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  USER_API_FAIL,
  USER_API_REQUEST,
  ALLUSERS
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

/** Get all users */
export function getAllUsers() {
  return dispatch => {
    dispatch({
      type: USER_API_REQUEST
    });
    axios
      .get(`${BASE_URL}/users.json`, header)
      .then(response => {
        const usersData = firebaseResponseTransform(response.data);
        const allUsers = usersData.filter(user => user.role === "EMPLOYEE");
        dispatch({
          type: ALLUSERS,
          payload: allUsers
        });
      })
      .catch(error => {
        dispatch({
          type: USER_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}



export function signin(user, callback) {
  return dispatch => {
    dispatch({
      type: USER_API_REQUEST
    });
    return axios
      .get(`${BASE_URL}/users.json`, header)
      .then(response => {
        const usersData = firebaseResponseTransform(response.data);
        let loggedUser = false;
        if (user.loginasadmin) {
          loggedUser = usersData.find(
            val => val.email == user.email && val.password == user.password && val.role === "ADMIN"
          );
        } else {
          loggedUser = usersData.find(
            val => val.email == user.email && val.password == user.password && val.role === "EMPLOYEE"
          );
        }
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

export function signup(data, callback, addUser = false) {
  return dispatch => {
    dispatch({
      type: USER_API_REQUEST
    });
    return axios
      .post(`${BASE_URL}/users.json`, data, header)
      .then(response => {       
        dispatch({
          type: SIGNUP
        });
        if (addUser) {
          toast.success(langs.messages.USER_ADDED);
        } else {
          toast.success(langs.messages.SUCCESSFUL_SIGNUP);
        }
        callback();
      })
      .catch(error => {      
        dispatch({
          type: USER_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}



export function updateUser(userId, data, callback) {
  return dispatch => {
    dispatch({
      type: USER_API_REQUEST
    });
   return axios
      .put(`${BASE_URL}/users/${userId}.json`, data, header)
      .then(response => {
        dispatch({
          type: SIGNUP
        });
        toast.success(langs.messages.USER_UPDATED);
        callback();
      })
      .catch(error => {
        dispatch({
          type: USER_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}

// delete a user 
export function deleteUser(userId, callback) {
  return dispatch => {
    dispatch({
      type: USER_API_REQUEST
    });
   return axios
      .delete(`${BASE_URL}/users/${userId}.json`, header)
      .then(response => {
        callback();
        toast.success(langs.messages.USER_DELETED);
      })
      .catch(error => {
        dispatch({
          type: USER_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };

}

export function getUser(userId, callback) {
  return dispatch => {
    dispatch({
      type: USER_API_REQUEST
    });
   return axios
      .get(`${BASE_URL}/users/${userId}.json`, header)
      .then(response => {
        dispatch({
          type: SIGNUP
        });
        callback(response.data);
      })
      .catch(error => {
        dispatch({
          type: USER_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}

