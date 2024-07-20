import productModel from "../../models/productModel.js";

// Exporting the productListController function to be used in other parts of the application
export const productListController = async (req, res) => {
  try {
    // Define the number of products to display per page
    const perPage = 6;
    
    // Get the current page number from the request parameters or default to 1 if not provided
    const page = req.params.page ? req.params.page : 1;
    
    // Query the productModel collection for products with pagination and sorting
    const products = await productModel
      .find({})                // Find all products
      .select("-photo")        // Exclude the 'photo' field from the result
      .skip((page - 1) * perPage) // Skip products based on the current page number
      .limit(perPage)          // Limit the number of products returned per page
      .sort({ createdAt: -1 }); // Sort products by creation date in descending order
    
    // Respond with the list of products and a success status
    res.status(200).send({
      success: true,         // Indicate that the request was successful
      products,             // Send the list of products
    });
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);   // Log the error to the console for debugging
    
    // Respond with an error message and the error details
    res.status(400).send({
      success: false,      // Indicate that the request failed
      message: "error in per page ctrl", // Provide an error message
      error,              // Include the error details
    });
  }
};
  