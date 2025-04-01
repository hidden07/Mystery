import React, { useState } from 'react';
import IMG from '../../assets/login-page/login-image.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const API_URL = "https://mystery-4k3a.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const loginData = { email, password };
      const response = await axios.post(`${API_URL}/api/v1/login`, loginData); 

      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', role === 'user' ? 'true' : 'false');

      setError('');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="bg-[#ebd29c] min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="text-3xl font-bold mb-8">Login</div>
      <img
        src={IMG}
        alt="login illustration"
        className="border rounded-full bg-white w-[40%] max-w-[160px] h-auto mb-8"
      />
      {error && (
        <div className="text-red-500 mb-4 text-center">{error}</div>
      )}
      <div className="w-full max-w-[90%] mb-6">
        <label htmlFor="Email" className="block text-lg font-medium">Email:</label>
        <input
          type="text"
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[50px] px-3 py-2 mt-2 border rounded-lg focus:outline-none bg-[#deaf5f] border-[#deaf5f]"
          placeholder="Enter email"
        />
      </div>
      <div className="w-full max-w-[90%] mb-8 relative">
        <label htmlFor="Password" className="block text-lg font-medium">Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[50px] px-3 py-2 mt-2 border rounded-lg focus:outline-none bg-[#deaf5f] border-[#deaf5f]"
          placeholder="Enter password"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[60%] transform -translate-y-1/2 text-sm text-[#d5773f]"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button
        onClick={handleLogin}
        className="bg-[#d5773f] text-black px-6 py-3 rounded-lg w-full max-w-[160px] text-lg font-medium"
      >
        Let's go..
      </button>
    </div>
  );
};

export default Login;