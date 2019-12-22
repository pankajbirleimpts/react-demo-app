import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ITEM_API_FAIL,
  ITEM_API_REQUEST,
  ALLITEMS,
  ITEM_API_SUCCESS
} from "./consts";

import { BASE_URL, langs } from "../config";
import { firebaseResponseTransform } from "../utils";

const header = {
  headers: {
    "Content-Type": "application/json"
  }
};
/** Get all Items */
export function getAllItems() {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .get(`${BASE_URL}/items.json`, header)
      .then(response => {
        console.log("items response ", response.data);
        const itemsData = firebaseResponseTransform(response.data);
        dispatch({
          type: ALLITEMS,
          payload: itemsData
        });
      })
      .catch(error => {
        dispatch({
          type: ITEM_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}

export function addItem(data, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .post(`${BASE_URL}/items.json`, data, header)
      .then(response => {
        dispatch({
          type: ITEM_API_SUCCESS
        });
        toast.success(langs.messages.ITEM_ADDED);
        callback();
      })
      .catch(error => {
        dispatch({
          type: ITEM_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}



export function updateItem(itemId, data, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .put(`${BASE_URL}/items/${itemId}.json`, data, header)
      .then(response => {
        dispatch({
          type: ITEM_API_SUCCESS
        });
        toast.success(langs.messages.ITEM_UPDATED);
        callback();
      })
      .catch(error => {
        console.log("signup error");
        dispatch({
          type: ITEM_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}

// delete a item 
export function deleteItem(itemId, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .delete(`${BASE_URL}/items/${itemId}.json`, header)
      .then(response => {
        callback();
        toast.success(langs.messages.ITEM_DELETED);
      })
      .catch(error => {
        dispatch({
          type: ITEM_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };

}

export function getItem(itemId, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .get(`${BASE_URL}/items/${itemId}.json`, header)
      .then(response => {
        dispatch({
          type: ITEM_API_SUCCESS
        });
        callback(response.data);
      })
      .catch(error => {
        dispatch({
          type: ITEM_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}

