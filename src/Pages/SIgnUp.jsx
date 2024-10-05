import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
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
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trimStart(), // Trim leading spaces in input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim values before validation
    const trimmedData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    // Validate that no field is empty or consists of only spaces
    if (!trimmedData.name || !trimmedData.email || !trimmedData.password || !trimmedData.confirmPassword) {
      setError('All fields are required and cannot contain only spaces.');
      return;
    }

    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

    // Validate if passwords match
    if (trimmedData.password !== trimmedData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Further form validation (e.g., check if email is valid)
    if (!trimmedData.email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const { name, email, password } = trimmedData;
      // Send data to the server using async/await
      const response = await axios.post('https://fashion-cart-server.vercel.app/signup', { name, email, password });
      
      // Handle success response
      console.log('Success:', response.data);
      setError('');
      setSuccess("Sign up successful!");
      
      // Redirect to Sign In page
      navigate('/signin'); // Redirect after successful signup

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      // Handle error response
      console.error('Error:', error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>
        {error && <div className="mt-3 p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}
        {success && <div className="mt-3 p-2 text-sm text-green-600 bg-green-100 rounded">{success}</div>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
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
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Confirm password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <Link to="/signin" className="text-indigo-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
