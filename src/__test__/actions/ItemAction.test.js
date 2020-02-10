import moxios from 'moxios';
import { getAllItems, addItem, updateItem, deleteItem, getItem, getAllDayItems, addDayItem, updateDayItem, deleteDayItem, getDayItem, getAllTransactions } from '../../actions/ItemAction';
import { storeFactory } from '../test/TestUtils';

describe('Test signIn action creator', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

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
        id: "abc",
        amount: 15,
        category: "Roti",
        description: "This is tawa rohi",
        isActive: "Active",
        itemName: "Tawa Roti"
      },
      {
		id: "def",
        amount: 15,
        category: "Dal",
        description: "Tal tadka",
        isActive: "Active",
        itemName: "Dal tadka"
      }
    ],
    allDayItems: [
      {
        id: 'abc',
        date: "27-Dec-2019",
        remainingQuantity: 0,
        totalQuantity: 100,
        itemName: "Dal tadka",
        category: "Dal",
        amount: 10,
		itemDetails: {
			itemName: "Dal tadka",
			category: "Dal",
			amount: 10
		},
      },
      {
        id: 'def',
        date: "27-Dec-2019",
        remainingQuantity: 0,
        totalQuantity: 100,
        itemName: "Sev Tamatar",
        category: "Dal",
        amount: 20,
		itemDetails: {
			 itemName: "Sev Tamatar",
			 category: "Dal",
			 amount: 20
		},
      }
    ],
    allTransactions: [
      {
        amount: 15,
        date: "26-Dec-2019",        
        purchaseAmount: "0.00",
        quantity: 0,
        userId: "-Lwc-iXIVHhQnEihsqcW",
        id: "-Lx18EC9oMqwARQ2HL5m",
		itemId: "-Lwi9T6G70Fs-Wd5JF0r",
        itemName: "Tawa Roti",
        category: "Roti",
		itemDetails: {
			itemId: "-Lwi9T6G70Fs-Wd5JF0r",
			itemName: "Tawa Roti",
			category: "Roti",
			 amount: 15,
		},
		userDetails: {
			firstName: "Harish",
			lastName: "Nararayan",
		},
        userName: "Harish Nararayan"
      },
      {
        amount: 15,
        date: "26-Dec-2019",        
        purchaseAmount: "10.00",
        quantity: 1,
        userId: "-Lwc-iXIVHhQnEihsqcs",
        id: "-Lx18EC9oMqwARQ2HL5n",
		itemId: "-Lwi9T6G70Fs-Wd5JF0r",
        itemName: "Tawa Roti",
        category: "Roti",
		itemDetails: {
			itemId: "-Lwi9T6G70Fs-Wd5JF0r",
			itemName: "Tawa Roti",
			category: "Roti",
			amount: 15,
		},
        userName: "Harish Nararayan",
		userDetails: {
			firstName: "Harish",
			lastName: "Nararayan"
		},
      }
    ]
  };

    test('Check success response of `getAllItems` action', () => {
		const item = {
			...initialState,
			allItems: globalState.allItems
		};
        const store = storeFactory({ item });
		const responseData = {
		 'abc':{
			amount: 15,
			category: "Roti",
			description: "This is tawa rohi",
			isActive: "Active",
			itemName: "Tawa Roti"
		  },
		  'def': {
			amount: 15,
			category: "Dal",
			description: "Tal tadka",
			isActive: "Active",
			itemName: "Dal tadka"
		  },
		};
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: responseData,
            });
        });
        return store.dispatch(getAllItems()).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `getAllItems` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(getAllItems()).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
	
	test('Check success response of `addItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(addItem(globalState.allDayItems[0], jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `addItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(addItem(globalState.allDayItems[0], jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

   test('Check success response of `updateItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(updateItem('abc', globalState.allDayItems[0], jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `updateItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(updateItem('abc',globalState.allDayItems[0], jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
	
	test('Check success response of `deleteItem` action', () => {
		const item = {
			...initialState,
			isLoading: true
		};
        const store = storeFactory({ item });
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(deleteItem('abc', jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `deleteItem` action', () => {
		const item = {
			...initialState,			
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(deleteItem('abc',jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
	
	test('Check success response of `getItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(getItem('abc', jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `getItem` action', () => {
		const item = {
			...initialState,			
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(getItem('abc',jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
	
	test('Check success response of `getAllDayItems` action', () => {
		const item = {
			...initialState,
			allDayItems: globalState.allDayItems
		};
        const store = storeFactory({ item });
		const responseData = {
			'abc': {
				date: "27-Dec-2019",
				remainingQuantity: 0,
				totalQuantity: 100,
				itemDetails: {
					itemName: "Dal tadka",
				  category: "Dal",
				  amount: 10
				}
              },
      'def': {
        date: "27-Dec-2019",
        remainingQuantity: 0,
        totalQuantity: 100,
        itemDetails: {
			itemName: "Sev Tamatar",
			category: "Dal",
			amount: 20
			},
		}
	};
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
				response: responseData
            });
        });
        return store.dispatch(getAllDayItems()).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `getItem` action', () => {
		const item = {
			...initialState,			
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(getAllDayItems()).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
	
	test('Check success response of `addDayItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(addDayItem(globalState.allDayItems[0], jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
 
 test('Check fail response of `addDayItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(addDayItem(globalState.allDayItems[0], jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

   test('Check success response of `updateDayItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(updateItem('abc', globalState.allDayItems[0], jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `updateItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(updateItem('abc',globalState.allDayItems[0], jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
	
	test('Check success response of `deleteDayItem` action', () => {
		const item = {
			...initialState,
			isLoading: true
		};
        const store = storeFactory({ item });
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(deleteDayItem('abc', jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `deleteDayItem` action', () => {
		const item = {
			...initialState,			
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(deleteDayItem('abc',jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
	
	test('Check success response of `getDayItem` action', () => {
		const item = {
			...initialState,
		};
        const store = storeFactory({ item });
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(getDayItem('abc', jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `getDayItem` action', () => {
		const item = {
			...initialState,			
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(getDayItem('abc',jest.fn())).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
	
	test('Check success response of `getAllTransactions` action', () => {
		const item = {
			...initialState,
			allTransactions: globalState.allTransactions
		};
        const store = storeFactory({ item });
		const responseData = {
			"-Lx18EC9oMqwARQ2HL5m" : {
        amount: 15,
        date: "26-Dec-2019",        
        purchaseAmount: "0.00",
        quantity: 0,
        userId: "-Lwc-iXIVHhQnEihsqcW",
		itemId: "-Lwi9T6G70Fs-Wd5JF0r",
        itemName: "Tawa Roti",
        category: "Roti",
		itemDetails: {
			itemId: "-Lwi9T6G70Fs-Wd5JF0r",
			itemName: "Tawa Roti",
			category: "Roti",
			 amount: 15,
		},
		userDetails: {
			firstName: "Harish",
			lastName: "Nararayan",
		},
        userName: "Harish Nararayan"
      },
      "-Lx18EC9oMqwARQ2HL5n": {
        amount: 15,
        date: "26-Dec-2019",        
        purchaseAmount: "10.00",
        quantity: 1,
        userId: "-Lwc-iXIVHhQnEihsqcs",
       itemId: "-Lwi9T6G70Fs-Wd5JF0r",
        itemName: "Tawa Roti",
        category: "Roti",
		itemDetails: {
			itemId: "-Lwi9T6G70Fs-Wd5JF0r",
			itemName: "Tawa Roti",
			category: "Roti",
			 amount: 15,
		},
        userName: "Harish Nararayan",
		userDetails: {
			firstName: "Harish",
			lastName: "Nararayan"
		},
      }
	};
		
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
				response: responseData
            });
        });
        return store.dispatch(getAllTransactions()).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });

    test('Check fail response of `getAllTransactions` action', () => {
		const item = {
			...initialState,			
		};
        const store = storeFactory({ item });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(getAllTransactions()).then(() => {
            const newState = store.getState();
            expect(newState.item).toStrictEqual(item);
        });
    });
  
  
});
