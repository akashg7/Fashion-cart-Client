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
import CheckoutForm from './Pages/CheckoutForm'; 
import Confirmation from './Pages/Confirmation'; 
import { AuthProvider } from './contexts/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Footer from './Pages/Footer';

const stripePromise = loadStripe('pk_test_51Q5z8wFsnlbHkz80zeKJI2Oal8Iam8aP0sJkeXdYXj1GnBWtkj4OPgHjW3zchJjetrAR7VHHzDXxrGdPlTVm2tNb00PKCXaLXb');

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
            <Route path="/checkout" element={<CheckoutForm />} />  
            <Route path="/confirmation" element={<Confirmation />} /> 
          </Routes>
        </Elements>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
