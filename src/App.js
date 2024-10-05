import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NavBar from './Pages/NavBar';
import ProductPage from './Pages/ProductPage';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SIgnUp';
import Category from './Pages/Category';
import SearchResults from './Pages/SearchResults';
import Cart from './Pages/Cart';
import CheckoutForm from './Pages/CheckoutForm';  // Import CheckoutForm
import Confirmation from './Pages/Confirmation'; // Import your confirmation component
import { AuthProvider } from './contexts/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q5z8wFsnlbHkz80zeKJI2Oal8Iam8aP0sJkeXdYXj1GnBWtkj4OPgHjW3zchJjetrAR7VHHzDXxrGdPlTVm2tNb00PKCXaLXb'); // Replace with your actual publishable key

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/products/category/:categorytype" element={<Category />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />  {/* New route for Checkout */}
            <Route path="/confirmation" element={<Confirmation />} /> {/* Confirmation route */}
          </Routes>
        </Elements>
      </Router>
    </AuthProvider>
  );
};

export default App;
