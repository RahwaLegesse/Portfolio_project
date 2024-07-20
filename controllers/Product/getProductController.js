import productModel from "../../models/productModel.js";

// Exporting the getProductController function to be used in other parts of the application
export const getProductController = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await productModel
      .find({})                     // Find all products
      .populate("category")        // Populate the 'category' field with detailed information
      .select("-photo")            // Exclude the 'photo' field from the result
      .limit(12)                   // Limit the number of products returned to 12
      .sort({ createdAt: -1 });    // Sort products by creation date in descending order

    // Respond with the fetched products and additional information
    res.status(200).send({
      success: true,               // Indicate the success of the request
      countTotal: products.length, // Send the total number of products retrieved
      message: "All Products",     // Provide a message indicating successful retrieval
      products,                    // Send the list of products
    });
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);           // Log the error to the console

    // Respond with an error message and the error details
    res.status(500).send({
      success: false,              // Indicate the failure of the request
      message: "Error in getting products", // Provide an error message
      error: error.message,        // Send the error message
    });
  }
};
