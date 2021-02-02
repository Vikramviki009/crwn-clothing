import React, { lazy, Suspense, useEffect } from 'react';
import {Route, Switch, Redirect}  from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './components/header/header.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';
import { GlobalStyles } from './global.styles';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
const HomePage = lazy(() => import('./pages/homepage/homepage.components'));
const ShopPage = lazy(() => import('./pages/shop/shop.components'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.comoponent'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  },[ checkUserSession ]);

    return (
      <div>
        <GlobalStyles/>
        <Header/>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage}/>
              <Route path='/signin' render={()=>currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage/>)}/>
              <Route exact path='/checkout' component={CheckoutPage}/>
            </Suspense>
          </ErrorBoundary>
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