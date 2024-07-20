import productModel from "../../models/productModel.js";

// Exporting the productCountController function to be used in other parts of the application
export const productCountController = async (req, res) => {
  try {
    // Count the total number of products in the productModel collection
    const total = await productModel.find({}).estimatedDocumentCount();
    
    // Respond with the total product count
    res.status(200).send({
      success: true,  // Indicate that the request was successful
      total,         // Send the total count of products
    });
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);   // Log the error to the console for debugging
    
    // Respond with an error message and the error details
    res.status(400).send({
      message: "Error in product count", // Provide an error message
      error,                        // Include the error details
      success: false,               // Indicate that the request failed
    });
  }
};
  