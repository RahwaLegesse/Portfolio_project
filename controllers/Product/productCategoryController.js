import categoryModel from "../../models/categoryModel.js";
import productModel from "../../models/productModel.js";

// Exporting the productCategoryController function to be used in other parts of the application
export const productCategoryController = async (req, res) => {
  try {
    // Find the category based on the slug provided in the request parameters
    const category = await categoryModel.findOne({ slug: req.params.slug });
    
    // Find all products that belong to the found category and populate the 'category' field
    const products = await productModel.find({ category }).populate("category");
    
    // Respond with the fetched category and products
    res.status(200).send({
      success: true,       // Indicate that the request was successful
      category,           // Send the found category
      products,           // Send the products associated with the category
    });
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);   // Log the error to the console for debugging
    
    // Respond with an error message and the error details
    res.status(400).send({
      success: false,      // Indicate that the request failed
      error,              // Include the error details
      message: "Error While Getting products", // Provide an error message
    });
  }
};
