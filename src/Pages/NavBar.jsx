import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaShoppingCart } from 'react-icons/fa';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; 

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <>
    <header className="bg-gray-900  shadow-md sticky top-0 z-50">

      <nav className="container mx-auto p-4 flex justify-between items-center lg:items-stretch">

        <Link
          to="/"
          className="text-yellow-500 text-2xl font-bold tracking-wide hover:text-yellow-700 transition"
        >
          Fashion Cart
        </Link>

        {/* Search Bar for Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center w-full max-w-lg bg-white rounded-full shadow-lg ml-8"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 pl-4 text-gray-800 rounded-l-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white rounded-r-full px-6 py-2 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
          >
            Search
     
          </button>
        </form>


        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">

        </div>

            <div className="flex items-center space-x-6">


           {isAuthenticated ? (<Link
  to="/cart" 
  className="text-white hover:text-gray-300 flex transition duration-200"
> 
  <FaShoppingCart size={24} className="text-yellow-500 hover:text-yellow-700 transition" />
</Link>) : (
  <Link
  to="/signin" 
  className="text-white hover:text-gray-300 flex transition duration-200"
> 
  <FaShoppingCart size={24} className="text-yellow-500 hover:text-yellow-700 transition" />
</Link>
)}

        {/* add cart here */}
        {isAuthenticated ? (
            <button onClick={handleLogout} className="block  text-yellow-500 hover:text-yellow-700 transition duration-200">
              <FaSignOutAlt /> 
            </button> 
          ) : ( 
            <Link to="/signin" className="block text-yellow-500 hover:text-yellow-700 transition duration-200">
              <FaSignInAlt /> 
            </Link>
          )}
          </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-900 text-white p-4 space-y-4">
          
          <Link
            to="/cart"
            className="block text-white hover:text-gray-300 transition duration-200"
          >
            {/* Cart */}
            <FaShoppingCart size={24} />
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block text-white hover:text-gray-300 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="block text-white hover:text-gray-300 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      )}

      {/* Search Bar for Mobile */}
      <div className="lg:hidden p-4 bg-gray-900">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full bg-white rounded-full shadow-lg"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 pl-4 text-gray-800 rounded-l-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white rounded-r-full px-6 py-2 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category Buttons (Mobile & Desktop View) */}
      

      <header className="bg-white  shadow-md sticky top-0 z-50">
    <div className="flex flex-wrap justify-center  py-1 space-x-2">
    <button
      onClick={() => navigate("products/category/men's_clothing")}
      className="text-black px-4 py-2 rounded-full  hover: focus:ring-2 focus:ring-yellow-500 transition mb-2 lg:mb-0"
    >
      Men
    </button>
    <button
      onClick={() => navigate("products/category/women's_clothing")}
      className="text-black px-4 py-2 rounded-full hover:  focus:ring-2 focus:ring-yellow-500 transition mb-2 lg:mb-0"
    >
      Women
    </button>
    <button
      onClick={() => navigate("products/category/jewelery")}
      className="text-black px-4 py-2 rounded-full  hover: focus:ring-2 focus:ring-yellow-500 transition mb-2 lg:mb-0"
    >
      Jewelry
    </button>
    <button
      onClick={() => navigate("products/category/electronics")}
      className="text-black px-4 py-2 rounded-full  hover: focus:ring-2 focus:ring-yellow-500 transition mb-2 lg:mb-0"
    >
      Electronics
    </button>
  </div>
  </header>

    </header>
    {/* Category : */}
    
  </>
  );
};

export default NavBar;








