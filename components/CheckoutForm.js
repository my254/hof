import React from 'react';
import {PaymentElement} from '@stripe/react-stripe-js';
import { Button  } from '@mantine/core'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import { showNotification } from '@mantine/notifications';

import  app  from '../database/Firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';




const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    //form submit
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const {error} = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: 'https://handsof-africa.com/succes',
        },
      });
  
  
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        //setErrorMessage(error.message);
        showNotification({
          title:error.type,
          message:error.message
        })
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
    
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" fullWidth mt={10}>
        submit
      </Button>
    </form>
  );
};

export default CheckoutForm;