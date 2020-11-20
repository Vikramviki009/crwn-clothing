import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HpN9bCzPxoXYA5ljFookKlnAFIvNO9se0Ra9kDhB7eCgwh13ZoZOeRyJdayYymkOOelwbowGhdMinWt9eEqfhyw00XUvzGuVX';

    const onToken = token =>{
        console.log(token);
        alert('Payment Successful');
    }

    return(
        <StripeCheckout
            label = 'Pay Now'
            name= 'VRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;