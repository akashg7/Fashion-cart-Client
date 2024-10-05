import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Use navigate for redirection
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null); // State for payment status

  useEffect(() => {
    axios.post('https://fashion-cart-server.vercel.app/create-payment-intent', { amount: 1000, currency: 'usd' })
      .then(res => setClientSecret(res.data.clientSecret))
      .catch(err => console.error('Error fetching client secret', err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('Payment failed! Please try again.'); // Update payment status
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!', paymentIntent);
      setPaymentStatus('Payment succeeded! Thank you for your purchase.'); // Update payment status
      navigate('/confirmation'); // Redirect to confirmation page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
            <CardElement className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500" />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-700 disabled:bg-gray-300"
          >
            Pay Now
          </button>
        </form>
        {paymentStatus && (
          <div className={`mt-4 text-center ${paymentStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
            {paymentStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
