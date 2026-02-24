import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/isAuthenticated",
          { withCredentials: true }
        );
        setIsLoggedIn(res.data.isAuthenticated);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
     
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedin, setIsLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider}