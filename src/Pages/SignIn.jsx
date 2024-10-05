import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth to access the login function

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      ...formData,
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    // Validate that no field is empty or consists of only spaces
    if (!trimmedData.email || !trimmedData.password) {
      setError('All fields are required and cannot contain only spaces.');
      return;
    }

    // Basic validation for email
    if (!trimmedData.email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }

    // Basic validation for password length
    if (trimmedData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const { email, password } = trimmedData;
      
      // Send data to the server
      const response = await axios.post('https://fashion-cart-server.vercel.app/signin', { email, password });
      
      // Handle success response
      console.log('Success:', response.data);
      setError(''); // Clear any previous errors
      setSuccess("Sign In successful!");

      // Store the JWT token in local storage
      localStorage.setItem('token', response.data.token);
      
      // Call the login function to update the AuthContext state
      login(response.data.token);

      navigate('/'); // Redirect to home after login
      // Reset form
      setFormData({
        email: '',
        password: '',
      });
      
    } catch (error) {
      // Handle error response
      if (error.response) {
        console.error('Error:', error.response.data.message);
        setError(error.response.data.message); // Display error message from the server
      } else {
        console.error('Error:', error.message);
        setError('An unexpected error occurred. Please try again.'); // Generic error message
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign In</h2>
        {error && <div className="mt-3 p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}
        {success && <div className="mt-3 p-2 text-sm text-green-600 bg-green-100 rounded">{success}</div>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
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
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-indigo-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
