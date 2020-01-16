import UserReducer from '../../reducers/UserReducer';
import {
    SIGNIN,
    SIGNOUT,
    SIGNUP,
    USER_API_FAIL,
    USER_API_REQUEST,
    ALLUSERS
} from '../../actions/consts';


describe('Testing "UserReducer" ', () => {
    const initialState = {
        isAuthenticated: false,
        isLoading: false,
        data: null,
        allUsers: []
    };

    const user = {
        isAuthenticated: true,
        isLoading: false,
        allUsers: [],
        data: {
            balance: 4955,
            country: "Indore",
            email: "pankaj.birle@impetus.co.in",
            employeeId: "IIIPL3025",
            firstName: "Pankaj",
            id: "-Lx1WclrnUuv0_hSvdpV",
            lastName: "Birle",
            password: "pankaj123",
            role: "EMPLOYEE",
        },
    };

    const singoutUser = {
        isAuthenticated: false,
        isLoading: false,
        data: null,
        allUsers: []
    };

    test('return default initial state', () => {
        const newState = UserReducer(undefined, null);
        expect(newState).toStrictEqual(initialState);
    });

    test('return `SIGNIN` state', () => {
        const action = {
            type: SIGNIN,
            payload: user.data,
        };
        const newState = UserReducer(undefined, action);
        expect(newState).toStrictEqual(user);
    });

    test('return `SIGNOUT` state', () => {
        const action = {
            type: SIGNOUT,
        };
        const newState = UserReducer(undefined, action);
        expect(newState).toStrictEqual(singoutUser);
    });

    test('return `SIGNUP` state', () => {
        const action = {
            type: SIGNUP,
        };
        const newState = UserReducer(undefined, action);
        expect(newState).toStrictEqual(singoutUser);
    });

    test('return `USER_API_FAIL` state', () => {
        const action = {
            type: USER_API_FAIL,
        };
        const newState = UserReducer(undefined, action);
        expect(newState).toStrictEqual(singoutUser);
    });

    test('return `USER_API_REQUEST` state', () => {
        const apiReuest = {
            isAuthenticated: false,
            isLoading: true,
            data: null,
            allUsers: []
        };
        const action = {
            type: USER_API_REQUEST,
        };
        const newState = UserReducer(undefined, action);
        expect(newState).toStrictEqual(apiReuest);
    });

    test('return `ALLUSERS` state', () => {
        const apiReuest = {
            isAuthenticated: false,
            isLoading: false,
            data: null,
            allUsers: [{
                balance: 4955,
                country: "Indore",
                email: "pankaj.birle@impetus.co.in",
                employeeId: "IIIPL3025",
                firstName: "Pankaj",
                id: "-Lx1WclrnUuv0_hSvdpV",
                lastName: "Birle",
                password: "pankaj123",
                role: "EMPLOYEE",
            }]
        };
        const action = {
            type: ALLUSERS,
            payload: apiReuest.allUsers
        };
        const newState = UserReducer(undefined, action);
        expect(newState).toStrictEqual(apiReuest);
    });
});
