import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useCart } from '../contexts/CartContext'; // Import the useCart hook
import {jwtDecode} from 'jwt-decode'; // Correct import syntax
import axios from 'axios';


const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { addToCart } = useCart(); // Get the addToCart function from context
  const [userId, setUserId] = useState(null); // State to store user ID

  // Decode the JWT token and store userId in state when the component mounts
  useEffect(() => {
    const getUserIdFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Use jwt-decode to decode the token
          console.log('Decoded JWT:', decodedToken); // Log the entire decoded token once
          setUserId(decodedToken.id); // Store the user ID in the state
        } catch (err) {
          console.error('Error decoding token', err);
        }
      }
    };

    getUserIdFromToken();
  }, []); // Empty dependency array ensures it only runs once on component mount

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const handleAddToCart = async () => {
    // const userId = ;
    // const productId = product.id; // Assuming you have the product details already
    const quantity = 1; // Example: fixed quantity for now
  
    if (userId) {
      try {
        const response = await axios.post(`https://fashion-cart-server.vercel.app/product/${id}/addtocart`, {
          userId,
          quantity
        });
  
        if (response.status === 201) {
          alert('Product successfully added to cart!');
          console.log(response.data); // Check the response data
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart.');
      }
    } else {
      alert('Please login to add items to your cart.');
    }
  };
  

  return (
    <div className="flex flex-col items-center p-5 md:flex-row md:justify-center md:gap-10">
      {product && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex md:w-3/4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover md:h-auto md:w-1/2"
          />
          <div className="p-5 flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
            <p className="mt-2 text-gray-600"><strong>Price:</strong> ${product.price}</p>
            <p className="mt-2 text-gray-600"><strong>Description:</strong> {product.description}</p>
            <p className="mt-2 text-gray-600"><strong>Category:</strong> {product.category}</p>
            <p className="mt-2 text-gray-600"><strong>Rating:</strong> {product.rating}</p>
            <button
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={handleAddToCart} // Call the add to cart handler
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
