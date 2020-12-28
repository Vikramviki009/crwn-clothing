import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HpN9bCzPxoXYA5ljFookKlnAFIvNO9se0Ra9kDhB7eCgwh13ZoZOeRyJdayYymkOOelwbowGhdMinWt9eEqfhyw00XUvzGuVX';

  const onToken = token => {
    axios({
      url:'payment',
      method:'post',
      data:{
        amount: priceForStripe,
        token: token
      }
    })
    .then(response => {
      alert("Payment Successful")
    })
    .catch(error => {
      alert("Payment Error")
    })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;