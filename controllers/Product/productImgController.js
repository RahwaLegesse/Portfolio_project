import productModel from "../../models/productModel.js";

// Exporting the productImgController function to be used in other parts of the application
export const productImgController = async (req, res) => {
  try {
    // Find the product by its ID and select only the 'photo' field
    const product = await productModel.findById(req.params.pid).select("photo");
    
    // Check if the product has a photo and if it has data
    if (product.photo.data) {
      // Set the content type of the response based on the photo's content type
      res.set("Content-type", product.photo.contentType);
      
      // Send the photo data as the response
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);   // Log the error to the console for debugging
    
    // Respond with an error message and the error details
    res.status(500).send({
      success: false,      // Indicate that the request failed
      message: "Error while getting photo", // Provide an error message
      error,              // Include the error details
    });
  }
};
