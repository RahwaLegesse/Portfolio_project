import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3); // State to count down seconds
  const navigate = useNavigate(); // Hook for navigating programmatically
  const location = useLocation(); // Hook for getting current location

  useEffect(() => {
    // Timer to decrement count every second
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1); // Decrement count
    }, 1000);

    // Navigate to specified path when count reaches 0
    if (count === 0) {
      navigate(`/${path}`, {
        state: { from: location.pathname }, // Pass current location as state
      });
    }

    // Clean up interval timer when component unmounts or count reaches 0
    return () => clearInterval(interval);
  }, [count, navigate, location.pathname, path]);

  return (
    <>
      {/* Container with centered content */}
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }} // Full viewport height
      >
        {/* Countdown message */}
        <h1 className="Text-center">Redirecting to {path} in {count} seconds</h1>
        
        {/* Spinner animation */}
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
