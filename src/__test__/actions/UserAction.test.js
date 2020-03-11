import moxios from 'moxios';
import { signin, updateUserStore, signout, signup, updateUser, deleteUser, getUser, getAllUsers } from '../../actions/UserAction';
import { storeFactory } from '../test/TestUtils';

describe('Test signIn action creator', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

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

    test('Check success response of "signIn" action', () => {
        const store = storeFactory({ user });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: user.data,
            });
        });
        return store.dispatch(signin({ email: user.data.email, password: user.data.password, role: user.data.role }, () => { })).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(user);
        });
    });

    test('Check fail response of "signin" action', () => {
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'Invalid username & password' },
            });
        });
        return store.dispatch(signin({ email: user.data.email }, () => { })).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });


    test('Check response of "updateUserStore" action', () => {
        const store = storeFactory({ user });
        store.dispatch(updateUserStore(user.data));
        const newState = store.getState();
        expect(newState.user).toStrictEqual(user);
    });

    test('Check response of "signout" action', () => {
        const store = storeFactory({ user: singoutUser });
        store.dispatch(signout(() => { }));
        const newState = store.getState();
        expect(newState.user).toStrictEqual(singoutUser);
    });

    test('Check success response of "signup" action', () => {
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(signup({ ...user.data }, () => { })).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });

    test('Check fail response of `signup` action', () => {		
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(signup({ ...user.data }, () => { })).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });

    test('Check success response of "updateUser" action', () => {
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
            });
        });
        return store.dispatch(updateUser(user.data.id, { ...user.data }, () => { })).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });

    test('Check fail response of `updateUser` action', () => {		
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(updateUser(user.data.id, { ...user.data }, () => { })).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });

    test('Check success response of "deleteUser" action', () => {
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 204,
            });
        });
        return store.dispatch(deleteUser(user.data.id)).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });

    test('Check fail response of `deleteUser` action', () => {		
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(deleteUser(user.data.id)).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });

    test('Check success response of "getUser" action', () => {
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
            });
        });
        return store.dispatch(getUser(user.data.id)).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });

    test('Check fail response of `getUser` action', () => {		
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(getUser(user.data.id)).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });

    test('Check success response of "getAllUsers" action', () => {
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
        const store = storeFactory({ user: apiReuest });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                   "-Lx1WclrnUuv0_hSvdpV": {
                        balance: 4955,
                        country: "Indore",
                        email: "pankaj.birle@impetus.co.in",
                        employeeId: "IIIPL3025",
                        firstName: "Pankaj",
                        lastName: "Birle",
                        password: "pankaj123",
                        role: "EMPLOYEE",
                    }
                },
            });
        });
        return store.dispatch(getAllUsers()).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(apiReuest);
        });
    });

    test('Check fail response of `getAllUsers` action', () => {		
        const store = storeFactory({ user: singoutUser });
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 413,
                response: { message: 'No data available' },
            });
        });
        return store.dispatch(getAllUsers()).then(() => {
            const newState = store.getState();
            expect(newState.user).toStrictEqual(singoutUser);
        });
    });
});
