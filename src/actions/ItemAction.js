import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import {
  ITEM_API_FAIL,
  ITEM_API_REQUEST,
  ALLITEMS,
  ITEM_API_SUCCESS,
  ALLDAYITEMS,
  ALLTRANSACTION
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

/** Get all Day Items */
export function getAllDayItems() {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .get(`${BASE_URL}/dayItems.json`, header)
      .then(response => {
        const itemsData = firebaseResponseTransform(response.data);
        console.log("all day items response ", itemsData);
        const dayItems = itemsData.map(val => {
          return {
            ...val,
            date: moment(val.date).format("DD-MMM-YYYY"),
            itemName: val.itemDetails.itemName,
            category: val.itemDetails.category,
            amount: val.itemDetails.amount
          };
        });
        console.log("all day items ", dayItems);
        dispatch({
          type: ALLDAYITEMS,
          payload: dayItems
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

// Add day item
export function addDayItem(data, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .post(`${BASE_URL}/dayItems.json`, data, header)
      .then(response => {
        dispatch({
          type: ITEM_API_SUCCESS
        });
        toast.success(langs.messages.DAY_ITEM_ADDED);
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

export function updateDayItem(itemId, data, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .put(`${BASE_URL}/dayItems/${itemId}.json`, data, header)
      .then(response => {
        dispatch({
          type: ITEM_API_SUCCESS
        });
        toast.success(langs.messages.DAY_ITEM_UPDATED);
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

// delete a day item
export function deleteDayItem(itemId, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .delete(`${BASE_URL}/dayItems/${itemId}.json`, header)
      .then(response => {
        callback();
        toast.success(langs.messages.DAY_ITEM_DELETED);
      })
      .catch(error => {
        dispatch({
          type: ITEM_API_FAIL
        });
        toast.error(langs.messages.COMMON_ERROR);
      });
  };
}

export function getDayItem(itemId, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .get(`${BASE_URL}/dayItems/${itemId}.json`, header)
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

// Purchase a item
export function purchaseItem(data, callback) {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .post(`${BASE_URL}/purchaseItems.json`, data, header)
      .then(response => {
        dispatch({
          type: ITEM_API_SUCCESS
        });
        toast.success(langs.messages.ITEM_PURCHASED);
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

/** Get all Day Transations  */
export function getAllTransactions() {
  return dispatch => {
    dispatch({
      type: ITEM_API_REQUEST
    });
    axios
      .get(`${BASE_URL}/purchaseItems.json`, header)
      .then(response => {
        const itemsData = firebaseResponseTransform(response.data);
        const allTransactions = itemsData.map(val => {
          return {
            ...val,
            itemName: val.itemDetails.itemName,
            category: val.itemDetails.category,
            amount: val.itemDetails.amount,
            userName: `${val.userDetails.firstName} ${val.userDetails.lastName}`
          };
        });
        console.log("Get all transation ", allTransactions);
        dispatch({
          type: ALLTRANSACTION,
          payload: allTransactions
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
