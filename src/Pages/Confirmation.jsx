import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid'; // Update import for v2

const Confirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your order is being processed.
        </p>
        <p className="mt-4 text-gray-600">We will send you an email confirmation shortly.</p>

        <div className="mt-6">
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
