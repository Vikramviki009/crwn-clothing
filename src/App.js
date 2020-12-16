import React, { useEffect } from 'react';
import {Route, Switch, Redirect}  from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.comoponent';

import HomePage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.components';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  },[ checkUserSession ]);

    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' render={()=>currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage/>)}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    );
  };

const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch =>({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);