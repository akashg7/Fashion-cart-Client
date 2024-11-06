import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false); 

  useEffect(() => {
    const getUserIdFromToken = () => {
      const token = localStorage.getItem("token");
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
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fashion-cart-server.vercel.app/product/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-yellow-600"></div>
      </div>
    );
  }

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const handleAddToCart = async () => {
    const quantity = 1;

    if (userId) {
      try {
        const response = await axios.post(`https://fashion-cart-server.vercel.app/product/${id}/addtocart`, {
          userId,
          quantity
        });

        if (response.status === 201) {
          alert('Product successfully added to cart!');
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart.');
      }
    } else {
      alert('Please login to add items to your cart.');
    }
  };

  const handleBuyNow = () => {
    setShowCheckout(true);
  };

  return (
    <>
      {showCheckout ? (
        <CheckoutForm />
      ) : (
        <div className="flex flex-col items-center p-5 md:flex-row md:justify-center md:gap-10">
          {product && (
            <div className=" rounded-lg overflow-hidden md:flex md:w-3/4 mx-auto transition-transform transform hover: duration-300">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-cover md:h-auto md:w-1/2 rounded-t-lg md:rounded-l-lg"
              />
              
              {/* Product Details */}
              <div className="p-6 flex flex-col space-y-4">
                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2 hover:text-yellow-500 transition-colors">
                  {product.title}
                </h1>
                
                {/* Price */}
                <p className="text-xl font-semibold text-yellow-600 mb-2">
                  <strong className="text-gray-700">Price:</strong> ${product.price}
                </p>
                
                {/* Description */}
                <div className="text-gray-700 text-sm leading-relaxed relative">
                  <strong>Description:</strong>
                  <p className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-3'}`} style={{ maxHeight: showFullDescription ? 'none' : '4.5rem' }}>
                    {product.description}
                  </p>
                  
                  {product.description.length > 150 && (
                    <button
                      className="text-blue-600 hover:underline mt-1"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                      {showFullDescription ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
                
                {/* Category and Rating */}
                <div className="flex justify-between text-gray-600 text-sm mt-4">
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Rating:</strong> ⭐{product.rating}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  {/* Add to Cart Button */}
                  <button
                    className="flex-1 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  
                  
                  <button
                    className="flex-1 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductPage;
