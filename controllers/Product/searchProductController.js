import productModel from "../../models/productModel.js";

// Exporting the searchProductController function to be used in other parts of the application
export const searchProductController = async (req, res) => {
  try {
    // Extract the search keyword from the request parameters
    const { keyword } = req.params;
    
    // Query the productModel collection to find products matching the search keyword
    const results = await productModel
      .find({
        $or: [ 
          { name: { $regex: keyword, $options: "i" } },  // Search in the 'name' field
          { description: { $regex: keyword, $options: "i" } },  // Search in the 'description' field
        ],
      })
      .select("-photo");  // Exclude the 'photo' field from the results

    // Respond with the list of search results
    res.json(results);
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);  // Log the error to the console for debugging

    // Respond with an error message and the error details
    res.status(400).send({
      success: false,  // Indicate that the request failed
      message: "Error In Search Product API",  // Provide an error message
      error,  // Include the error details
    });
  }
};
  