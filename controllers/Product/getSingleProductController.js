import productModel from "../../models/productModel.js";

// Exporting the getSingleProductController function to be used in other parts of the application
export const getSingleProductController = async (req, res) => {
  try {
    // Fetch a single product from the database based on the slug provided in the request parameters
    const product = await productModel
      .findOne({ slug: req.params.slug }) // Find a product with the specified slug
      .select("-photo")                   // Exclude the 'photo' field from the result
      .populate("category");              // Populate the 'category' field with details from the related category model

    // Respond with the fetched product and additional information
    res.status(200).send({
      success: true,                     // Indicate that the request was successful
      message: "Single Product Fetched", // Provide a message indicating the successful retrieval of a single product
      product,                          // Send the fetched product
    });
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);                 // Log the error to the console for debugging

    // Respond with an error message and the error details
    res.status(500).send({
      success: false,                    // Indicate that the request failed
      message: "Could not get a single product", // Provide an error message
      error,                            // Include the error details in the response
    });
  }
};
  