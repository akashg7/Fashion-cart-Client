import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getingData = async () => {
    try {
      const response = await fetch("https://fashion-cart-server.vercel.app/products");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getingData();
  }, []);

  const handleProductClick = (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } else {
      navigate(`/product/${productId}`);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover object-center transition-transform transform hover:scale-110"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2">
                {product.title}
              </h3>
              {/* Truncate description to 2 lines if it's too long */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-gray-900">${product.price}</p>
                <p className="text-gray-500 text-sm">Rating: {product.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
