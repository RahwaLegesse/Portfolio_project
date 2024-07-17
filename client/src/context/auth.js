import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Create an AuthContext using createContext from React
const AuthContext = createContext();

// AuthProvider component to manage authentication state
const AuthProvider = ({ children }) => {
  // State to hold authentication information: user and token
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Set default authorization header for axios requests
  axios.defaults.headers.common["Authorization"] = auth?.token;

  // Effect to load authentication data from localStorage on component mount
  useEffect(() => {
    const data = localStorage.getItem("auth"); // Retrieve auth data from localStorage
    if (data) {
      const parseData = JSON.parse(data); // Parse stored JSON data
      // Update auth state with user and token from localStorage
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run effect only once on component mount

  // Provide auth state and setter to children components via AuthContext.Provider
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth state and setter from AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }; // Export useAuth hook and AuthProvider component
