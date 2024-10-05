import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="bg-black shadow-md sticky top-0 z-50">
      {/* Main Navigation Bar */}
      <nav className="container mx-auto p-4 flex justify-between items-center lg:items-stretch">
        {/* Brand */}
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-wide hover:text-gray-300 transition"
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
            className="bg-blue-600 text-white rounded-r-full px-6 py-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Search
          </button>
        </form>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Cart
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="text-white hover:text-gray-300 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black text-white p-4 space-y-4">
          <Link
            to="/"
            className="block text-white hover:text-gray-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-gray-300 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:text-gray-300 transition duration-200"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="block text-white hover:text-gray-300 transition duration-200"
          >
            Cart
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
      <div className="lg:hidden p-4 bg-black">
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
            className="bg-blue-600 text-white rounded-r-full px-6 py-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category Buttons (Mobile & Desktop View) */}
      <div className="flex flex-wrap justify-center bg-white py-4 space-x-2">
        <button
          onClick={() => navigate("products/category/men's_clothing")}
          className="text-white px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition mb-2 lg:mb-0"
        >
          Men
        </button>
        <button
          onClick={() => navigate("products/category/women's_clothing")}
          className="text-white px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition mb-2 lg:mb-0"
        >
          Women
        </button>
        <button
          onClick={() => navigate("products/category/jewelery")}
          className="text-white px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition mb-2 lg:mb-0"
        >
          Jewelry
        </button>
        <button
          onClick={() => navigate("products/category/electronics")}
          className="text-white px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition mb-2 lg:mb-0"
        >
          Electronics
        </button>
      </div>
    </header>
  );
};

export default NavBar;
