import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import CheckoutItem from '../checkout-item/checkout-item.component';
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';
import StripeCheckoutButton from '../stripe/stripe-button.component';

const CheckoutPage = ({cartItems, total}) =>(
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>product</span>
            </div>
            <div className='header-block'>
                <span>description</span>
            </div>
            <div className='header-block'>
                <span>quantity</span>
            </div>
            <div className='header-block'>
                <span>price</span>
            </div>
            <div className='header-block'>
                <span>remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem=>
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
        }
        <div className='total'>$ {total}</div>
        <div className = 'test-warning'>
            *Please use the following test credit card for payments*
            <br/>
            4242 4242 4242 4242 - Exp:01/21 - CVV: 123
        </div>
        <StripeCheckoutButton price={total} />
    </div>
)

const mapStateToProps=createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);