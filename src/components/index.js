import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import 'semantic-ui-css/semantic.min.css';
import { toast } from 'react-toastify';
import { Container } from 'semantic-ui-react';

import { updateUserStore } from '../actions/UserAction';

import Header from './header';
import Login from './signin';
import Home from './home';
import Dashboard from './dashboard';
import About from './about';
import NoPage from './common/NoPage';
import Sigup from './signin/signup';
import UserList from './users/index';
import AddUser from './users/AddUser';
import AddItem from './items/AddItem';
import ItemList from './items';
import DayItem from './items/DayItem';
import DayItemList from './items/DayItemList';
import PurchaseItem from './items/PurchaseItem';
import TransactionList from './items/TransactionList';
import { langs } from '../config';

import languageContext from '../context/language';

function Routing(props) {
  /** Check the localstorage have information of logged user */
  (function() {
    const loggedUser = reactLocalStorage.get('loggedUser');
    if (loggedUser && props.user.isAuthenticated === false) {
      props.updateUserStore(JSON.parse(loggedUser));
    }
  })();

  return (
    <Container>
      <languageContext.Provider>
        <Router>
          <Header />
          <div className='ui segment routing-container'>
            <Switch>
              <Route exact path='/'>
                <Login />
              </Route>
              <Route path='/about'>
                <About />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/signup'>
                <Sigup />
              </Route>
              <AuthRoute path='/dashboard'>
                <Dashboard />
              </AuthRoute>
              <AuthRoute path='/users' permission='ADMIN'>
                <UserList />
              </AuthRoute>
              <AuthRoute path='/add-user' permission='ADMIN'>
                <AddUser />
              </AuthRoute>
              <AuthRoute path='/update-user/:id' permission='ADMIN'>
                <AddUser />
              </AuthRoute>
              <AuthRoute path='/add-item' permission='ADMIN'>
                <AddItem />
              </AuthRoute>
              <AuthRoute path='/update-item/:id' permission='ADMIN'>
                <AddItem />
              </AuthRoute>
              <AuthRoute path='/items' permission='ADMIN'>
                <ItemList />
              </AuthRoute>
              <AuthRoute path='/add-day-item' permission='ADMIN'>
                <DayItem />
              </AuthRoute>
              <AuthRoute path='/update-day-item/:id' permission='ADMIN'>
                <DayItem />
              </AuthRoute>
              <AuthRoute path='/day-items' permission='ADMIN'>
                <DayItemList />
              </AuthRoute>
              <AuthRoute path='/purchase-item' permission='ADMIN'>
                <PurchaseItem />
              </AuthRoute>
              <AuthRoute path='/transactions'>
                <TransactionList />
              </AuthRoute>
              <Route path='*'>
                <NoPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </languageContext.Provider>
    </Container>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { updateUserStore })(Routing);

// screen if you're not yet authenticated.
const AuthRouteFn = ({ children, permission, user, ...rest }) => {
  console.log('AuthRouteFn user ', user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user.isAuthenticated && permission === undefined) ||
        (user.isAuthenticated &&
          permission !== undefined &&
          permission === user.data.role) ? (
          children
        ) : (
          <React.Fragment>
            {toast.warn(langs.messages.PERMISSION_MSG)}
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          </React.Fragment>
        )
      }
    />
  );
};

const AuthRoute = connect(({ user }) => {
  return { user };
}, null)(AuthRouteFn);
