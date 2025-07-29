import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Create the provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Configure axios to always send the token in the headers if it exists
  axios.defaults.baseURL = 'https://arvyax-wellness-api.onrender.com/api'; // Your live backend URL
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    // On initial load, check if a token exists and try to fetch user data
    const verifyUser = async () => {
      if (token) {
        try {
          // You would typically have a /me or /profile endpoint to verify the token
          // For now, we'll assume the token is valid if it exists.
          // In a real app, you'd decode the token or make an API call here.
          // For simplicity, we'll just set loading to false.
        } catch (error) {
          console.error('Token verification failed', error);
          // If token is invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [token]);
  // --- Auth Functions ---

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, ...userData } = response.data;
      
      setToken(token);
      setUser(userData);
      localStorage.setItem('token', token);
      
      return response;
    } catch (error) {
      console.error('Login failed', error.response.data);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post('/auth/register', { email, password });
      const { token, ...userData } = response.data;

      setToken(token);
      setUser(userData);
      localStorage.setItem('token', token);

      return response;
    } catch (error) {
      console.error('Registration failed', error.response.data);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };