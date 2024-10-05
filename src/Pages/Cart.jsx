import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [id, setUserId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getUserIdFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);
        } catch (err) {
          console.error('Error decoding token', err);
        }
      }
    };
    getUserIdFromToken();
  }, []);

  useEffect(() => {
    const getCartItems = async () => {
      if (id) {
        try {
          const response = await axios.post('https://fashion-cart-server.vercel.app/cart', { id });
          const { data } = response;
          if (data && data.length > 0) {
            setProducts(data);
          }
        } catch (error) {
          console.error('Error fetching cart items:', error.message);
        }
      }
    };
    getCartItems();
  }, [id]);

  const handleProductClick = (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } else {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-bold text-gray-700">Your cart is empty!</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:scale-105 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover object-center transition-transform transform hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-900">${product.price}</p>
                    <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 sticky bottom-0">
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-bold text-gray-900">Subtotal:</p>
              <p className="text-2xl font-semibold text-blue-600">${products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</p>
            </div>

            <Link to="/checkout">
              <button className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 text-xl font-semibold rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 focus:ring-4 focus:ring-blue-500 transition-all duration-300">
                Proceed to Checkout
              </button>
            </Link>

            <p className="text-center mt-4 text-gray-500 text-sm">
              Secure payments & fast delivery
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
