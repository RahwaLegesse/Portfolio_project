import productModel from "../../models/productModel.js";

// Exporting the relatedProductController function to be used in other parts of the application
export const relatedProductController = async (req, res) => {
  try {
    // Extract the product ID and category ID from the request parameters
    const { pid, cid } = req.params;
    
    // Query the productModel collection to find related products
    const products = await productModel
      .find({
        category: cid,        // Find products that belong to the specified category
        _id: { $ne: pid },    // Exclude the current product from the results
      })
      .select("-photo")        // Exclude the 'photo' field from the results to reduce data size
      .limit(3)                // Limit the number of related products returned to 3
      .populate("category");   // Populate the 'category' field with category details
    
    // Respond with the list of related products and a success status
    res.status(200).send({
      success: true,          // Indicate that the request was successful
      products,              // Send the list of related products
    });
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);     // Log the error to the console for debugging
    
    // Respond with an error message and the error details
    res.status(400).send({
      success: false,        // Indicate that the request failed
      message: "error while getting related product", // Provide an error message
      error,                // Include the error details
    });
  }
};
