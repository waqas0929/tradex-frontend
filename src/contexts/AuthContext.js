// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from "../Api/api";
import '../Components/Auth/Logout.css'
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.post("validate-token", { token });
          if (response.data.valid) {
            setIsAuthenticated(true);
            const userData = JSON.parse(atob(token.split('.')[1]));
            setUser(userData);
            console.log("User Data:", userData); // Add this line
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    const userData = JSON.parse(atob(token.split('.')[1]));
    setUser(userData);
    console.log("User Data on Login:", userData); // Add this line
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Successfully logged out", { position: "top-right" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
