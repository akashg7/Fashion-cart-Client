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
      setLoading(true); 
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

  if (loading) return (
    <div className="text-center py-10">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-yellow-600 border-t-transparent rounded-full"></div>
      <p>Loading products...</p>
    </div>
  );
  
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-4xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
  <span className="capitalize">{categorytype.replace('_', ' ')}</span>
</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              className="w-full h-64 object-cover object-center transition-transform transform "
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
                        index < Math.round(product.rating) ? "text-yellow-500" : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.431 8.2 1.174-5.91 5.737 1.396 8.124L12 18.897l-7.354 3.856 1.396-8.124-5.91-5.737 8.2-1.174L12 .587z" />
                    </svg>
                  ))}
                  <p className="ml-2 text-gray-500 text-sm">({product.rating})</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
