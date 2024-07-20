import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    // Define an async function for authentication check
    const authCheck = async () => {
      // Send a GET request to the admin authentication endpoint
      const res = await axios.get("/api/v1/auth/admin-auth");
      // If the response data indicates success, set ok to true
      if (res.data.ok) {
        setOk(true);
      } else {
        // If not, set ok to false
        setOk(false);
      }
    };

    // If there is an authentication token, call authCheck function
    if (auth?.token) authCheck();
  }, [auth?.token]); // Dependency array with auth.token, so this effect runs when auth.token changes


  return ok ? <Outlet /> : <Spinner path="" />;
}