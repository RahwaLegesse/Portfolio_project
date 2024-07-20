import productModel from "../../models/productModel.js";

// Exporting the productFiltersController function to be used in other parts of the application
export const productFiltersController = async (req, res) => {
  try {
    // Destructure the 'checked' and 'radio' properties from the request body
    const { checked, radio } = req.body;
    
    // Initialize an empty object to store filter criteria
    let args = {};
    
    // Check if there are any categories selected (checked) and add them to the filter criteria
    if (checked.length > 0) args.category = checked;
    
    // Check if there is a price range specified (radio) and add it to the filter criteria
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    
    // Find products that match the filter criteria
    const products = await productModel.find(args);
    
    // Respond with the filtered products
    res.status(200).send({
      success: true,  // Indicate that the request was successful
      products,      // Send the list of filtered products
    });
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);   // Log the error to the console for debugging
    
    // Respond with an error message and the error details
    res.status(400).send({
      success: false,      // Indicate that the request failed
      message: "Error While Filtering Products", // Provide an error message
      error,              // Include the error details
    });
  }
};
