import { createContext, useContext, useState, useEffect, use } from "react";
import authServices from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const loggedIn = await authServices.isLoggedIn();
      setIsAuthenticated(loggedIn);
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  const login = async (username, password) => {
    const result = await authServices.login(username, password);
    if (result.success) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const register = async (username, password) => {
    const result = await authServices.register(username, password);
    if (result.success) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = async () => {
    const result = await authServices.logout();
    if (result.success) {
      setIsAuthenticated(false);
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);