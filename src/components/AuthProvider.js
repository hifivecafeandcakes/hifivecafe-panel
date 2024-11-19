import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Check for saved token in local storage or cookie on page load
    const savedToken = localStorage.getItem('accessTokenSubAdmin');
    if (savedToken) {
      setAccessToken(savedToken);
    }
  }, []);

  const login = (token) => {
    setAccessToken(token);

    localStorage.setItem('accessTokenSubAdmin', token);
  };

  const logout = () => {
    setAccessToken(null);

    localStorage.removeItem('accessTokenSubAdmin');
  };



  const isAuthenticated = () => {
    if (!accessToken) {
      localStorage.removeItem('prevLocSubAdmin');
      return false;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      return !isTokenExpired;
    } catch (error) {
      localStorage.removeItem('prevLocSubAdmin');
      console.error("Error decoding token:", error);
      return false;
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};