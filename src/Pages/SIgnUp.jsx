import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trimStart(), 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const trimmedData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

     if (!trimmedData.name || !trimmedData.email || !trimmedData.password || !trimmedData.confirmPassword) {
      setError('All fields are required and cannot contain only spaces.');
      return;
    }

    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

     if (trimmedData.password !== trimmedData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

     if (!trimmedData.email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true); 

    try {
      const { name, email, password } = trimmedData;
      
      const response = await axios.post('https://fashion-cart-server.vercel.app/signup', { name, email, password });
       
      console.log('Success:', response.data);
      setError('');
      setSuccess("Sign up successful!");

    
      navigate('/signin');  

      
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
 
      console.error('Error:', error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>
        {error && <div className="mt-3 p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}
        {success && <div className="mt-3 p-2 text-sm text-green-600 bg-green-100 rounded">{success}</div>}
 
        {loading ? (
          <div className="flex justify-center items-center mt-6">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-yellow-600"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Your password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Confirm password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300">
              Sign Up
            </button>
          </form>
        )}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <Link to="/signin" className="text-yellow-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
