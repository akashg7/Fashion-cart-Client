// src/Pages/Category.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Category = () => {
  const { categorytype } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fashion-cart-server.vercel.app/products/category/${categorytype}`);
        if (!response.ok) {
          throw new Error('Products not found');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [categorytype]);

  const handleProductClick = (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } else {
      navigate(`/product/${productId}`);
    }
  };

  const truncateDescription = (description) => {
    const maxLength = 100; // Set the maximum number of characters to show
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...' 
      : description;
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Category: {categorytype.replace('_' , ' ')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 cursor-pointer transition-transform duration-200"
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.image} alt={product.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800 truncate">{product.title}</h2>
              <p className="text-gray-600 text-sm">
                {truncateDescription(product.description)}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-gray-900 font-bold">${product.price}</p>
                <p className="text-gray-500 text-sm">Rating: {product.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
