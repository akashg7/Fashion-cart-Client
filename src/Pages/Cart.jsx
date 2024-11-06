import { jwtDecode } from "jwt-decode";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [id, setUserId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getUserIdFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);
        } catch (err) {
          console.error("Error decoding token", err);
        }
      }
    };
    getUserIdFromToken();
  }, []);


  useEffect(() => {
    if (id) {
      const getCartItems = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            "https://fashion-cart-server.vercel.app/cart",
            { id }
          );
          const { data } = response;
          if (data && data.length > 0) {
            setProducts(data);
          } else {
            setProducts([]); 
          }
        } catch (error) {
          console.error("Error fetching cart items:", error.message);
          setProducts([]); 
        } finally {
          setLoading(false); 
        }
      };
      getCartItems();
    }
  }, [id]);

  const handleProductClick = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-yellow-600 border-t-transparent rounded-full"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-bold text-gray-700">
            Your cart is empty!
          </p>
          <Link
            to="/"
            className="mt-4 inline-block bg-yellow-600 text-white py-3 px-8 rounded-full hover:bg-yellow-700 transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      
          <div className="md:col-span-1 order-1 md:order-2">
            <div className="rounded-lg p-6 bg-white md:top-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-bold text-gray-900">Subtotal:</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  $
                  {products
                    .reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-center">
                <Link to="/checkout">
                  <button className="mt-4 inline-block bg-yellow-600 text-white py-3 px-8 rounded-full hover:bg-yellow-700 transition-all duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
              <p className="text-center mt-4 text-gray-500 text-sm">
                Secure payments & fast delivery
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="md:col-span-3 order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover object-center transition-transform transform"
                  />

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-yellow-600 transition-colors duration-300 mb-2">
                      {product.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      {/* Product Price */}
                      <p className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* Product Rating with Star Icons */}
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 fill-current ${
                              index < Math.round(product.rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 .587l3.668 7.431 8.2 1.174-5.91 5.737 1.396 8.124L12 18.897l-7.354 3.856 1.396-8.124-5.91-5.737 8.2-1.174L12 .587z" />
                          </svg>
                        ))}
                        <p className="ml-2 text-gray-500 text-sm">({product.rating})</p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <p className="text-gray-700 text-sm mb-4">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
