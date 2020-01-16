import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import 'semantic-ui-css/semantic.min.css';

import { Container } from 'semantic-ui-react';

import { updateUserStore } from '../actions/UserAction';

import Header from './header';
import Login from './signin';
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
import { AuthRoute } from '../utils';

export class UnConnectedRouting extends Component {

  constructor(props) {
    super(props);
  }

  /** Check the localstorage have information of logged user */
  componentDidMount() {
    const loggedUser = reactLocalStorage.get('loggedUser');
    if (loggedUser && this.props.user.isAuthenticated === false) {
      this.props.updateUserStore(JSON.parse(loggedUser));
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <div className='ui segment routing-container'>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Sigup} />
            <AuthRoute path='/dashboard' component={Dashboard} />
            <AuthRoute path='/users' permission='ADMIN' component={UserList} />
            <AuthRoute path='/add-user' permission='ADMIN' component={AddUser} />
            <AuthRoute path='/update-user/:id' permission='ADMIN' component={AddUser} />
            <AuthRoute path='/add-item' permission='ADMIN' component={AddItem} />
            <AuthRoute path='/update-item/:id' permission='ADMIN' component={AddItem} />
            <AuthRoute path='/items' permission='ADMIN' component={ItemList} />
            <AuthRoute path='/add-day-item' permission='ADMIN' component={DayItem} />
            <AuthRoute path='/update-day-item/:id' permission='ADMIN' component={DayItem} />
            <AuthRoute path='/day-items' permission='ADMIN' component={DayItemList} />
            <AuthRoute path='/purchase-item' permission='ADMIN' component={PurchaseItem} />
            <AuthRoute path='/transactions' component={TransactionList} />
            <Route path='*' component={NoPage} />
          </Switch >
        </div>
      </Container >
    );
  }
}


const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { updateUserStore })(UnConnectedRouting);

