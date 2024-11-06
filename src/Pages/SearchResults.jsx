import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const query = new URLSearchParams(location.search).get('q'); 

      if (!query) {
        return setError('No search query provided.');
      }

      try {
        setLoading(true); 
        const response = await fetch(`https://fashion-cart-server.vercel.app/search?q=${query}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); 
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchSearchResults();
  }, [location.search]);

  const handleProductClick = (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } else {
      navigate(`/product/${productId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Results</h2>
      
      {error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : (
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
                className="w-full h-64 object-cover object-center transition-transform transform "
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition-colors mb-2">
                  {product.title}
                </h3>
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
      )}
    </div>
  );
};

export default SearchResults;
