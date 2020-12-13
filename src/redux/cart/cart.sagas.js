import { all, call, takeLatest, put } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

export function* emptyCart(){
    yield put(clearCart())
};

export function* onClearCart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, emptyCart)
};

export function* cartSagas(){
    yield all([call(onClearCart)])
};