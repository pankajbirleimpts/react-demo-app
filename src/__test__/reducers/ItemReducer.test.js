import ItemReducer from "../../reducers/ItemReducer";
import {
  ITEM_API_FAIL,
  ITEM_API_SUCCESS,
  ITEM_API_REQUEST,
  ALLITEMS,
  ALLDAYITEMS,
  ALLTRANSACTION
} from "../../actions/consts";

describe('Testing "ItemReducer" ', () => {
  const initialState = {
    isLoading: false,
    allItems: [],
    allDayItems: [],
    allTransactions: []
  };

  const globalState = {
    isLoading: false,
    allItems: [
      {
        id: 1,
        amount: 15,
        category: "Roti",
        description: "This is tawa rohi",
        isActive: "Active",
        itemName: "Tawa Roti"
      },
      {
        amount: 15,
        category: "Dal",
        description: "Tal tadka",
        isActive: "Active",
        itemName: "Dal tadka"
      }
    ],
    allDayItems: [
      {
        id: 1,
        date: "27-Dec-2019",
        remainingQuantity: 0,
        totalQuantity: 100,
        itemName: "Dal tadka",
        category: "Dal",
        amount: 10
      },
      {
        id: 2,
        date: "27-Dec-2019",
        remainingQuantity: 0,
        totalQuantity: 100,
        itemName: "Sev Tamatar",
        category: "Dal",
        amount: 20
      }
    ],
    allTransactions: [
      {
        amount: 15,
        date: "26-Dec-2019",
        itemId: "-Lwi9T6G70Fs-Wd5JF0r",
        purchaseAmount: "0.00",
        quantity: 0,
        userId: "-Lwc-iXIVHhQnEihsqcW",
        id: "-Lx18EC9oMqwARQ2HL5m",
        itemName: "Tawa Roti",
        category: "Roti",
        userName: "Harish Nararayan"
      },
      {
        amount: 15,
        date: "26-Dec-2019",
        itemId: "-Lwi9T6G70Fs-Wd5JF0r",
        purchaseAmount: "10.00",
        quantity: 1,
        userId: "-Lwc-iXIVHhQnEihsqcs",
        id: "-Lx18EC9oMqwARQ2HL5n",
        itemName: "Tawa Roti",
        category: "Roti",
        userName: "Harish Nararayan"
      }
    ]
  };

  test("return default initial state", () => {
    const newState = ItemReducer(undefined, null);
    expect(newState).toStrictEqual(initialState);
  });

  test("return `ALLITEMS` state", () => {
    const action = {
      type: ALLITEMS,
      payload: globalState.allItems
    };
    const modifiedState = {
        ...initialState,
        allItems: globalState.allItems
    }
    const newState = ItemReducer(undefined, action);
    expect(newState).toStrictEqual(modifiedState);
  });

  test("return `ALLDAYITEMS` state", () => {
    const action = {
      type: ALLDAYITEMS,
      payload: globalState.allDayItems
    };
    const modifiedState = {
        ...initialState,
        allDayItems: globalState.allDayItems
    }
    const newState = ItemReducer(undefined, action);
    expect(newState).toStrictEqual(modifiedState);
  });

  test("return `ALLTRANSACTION` state", () => {
    const action = {
      type: ALLTRANSACTION,
      payload: globalState.allTransactions
    };
    const modifiedState = {
        ...initialState,
        allTransactions: globalState.allTransactions
    }
    const newState = ItemReducer(undefined, action);
    expect(newState).toStrictEqual(modifiedState);
  });

  test("return `ITEM_API_REQUEST` state", () => {
    const action = {
      type: ITEM_API_REQUEST,
    };
    const modifiedState = {
        ...initialState,
        isLoading: true
    }
    const newState = ItemReducer(undefined, action);
    expect(newState).toStrictEqual(modifiedState);
  });

  test("return `ITEM_API_FAIL` state", () => {
    const action = {
      type: ITEM_API_FAIL,
    };
    const modifiedState = {
        ...initialState,
        isLoading: false
    }
    const newState = ItemReducer(undefined, action);
    expect(newState).toStrictEqual(modifiedState);
  });

  test("return `ITEM_API_SUCCESS` state", () => {
    const action = {
      type: ITEM_API_SUCCESS,
    };
    const modifiedState = {
        ...initialState,
        isLoading: false
    }
    const newState = ItemReducer(undefined, action);
    expect(newState).toStrictEqual(modifiedState);
  });
});
