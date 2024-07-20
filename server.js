import express from "express"; // Import the Express library to create an instance of an Express application
import colors from "colors"; // Import the Colors library to add color to console log messages
import dotenv from "dotenv"; // Import the Dotenv library to load environment variables from a .env file
import morgan from "morgan"; // Import the Morgan library for HTTP request logging
import connectDB from "./config/db.js"; // Import the database connection configuration
import authRoutes from "./routes/authRoute.js"; // Import authentication routes
import categoryRoutes from "./routes/categoryRoutes.js"; // Import category routes
import productRoutes from "./routes/productRoutes.js"; // Import product routes
import cors from "cors"; // Import the CORS library to enable Cross-Origin Resource Sharing

// Configure environment variables
dotenv.config(); // Load environment variables from the .env file into process.env

// Database configuration and connection
connectDB(); // Call the function to connect to the database

// Create an Express application instance
const app = express(); // Initialize the Express app

// Middleware setup
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing) to allow requests from other domains
app.use(express.json()); // Parse incoming JSON requests and make the data available in req.body
app.use(morgan("dev")); // Log HTTP requests in development mode using Morgan

// Route handlers
app.use("/api/v1/auth", authRoutes); // Mount authentication routes at the path /api/v1/auth
app.use("/api/v1/category", categoryRoutes); // Mount category routes at the path /api/v1/category
app.use("/api/v1/product", productRoutes); // Mount product routes at the path /api/v1/product

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>"); // Send a welcome message when the root URL is accessed
});

// Define the port to listen on
const PORT = process.env.PORT || 8080; // Use the port specified in the environment variables or default to 8080

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  ); // Log a message indicating that the server is running, with color and the current environment mode
});
