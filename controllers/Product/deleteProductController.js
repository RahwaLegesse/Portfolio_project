import productModel from "../../models/productModel.js";

// Exporting the deleteProductController function to be used in other parts of the application
export const deleteProductController = async (req, res) => {
  try {
    // Find and delete a product by its ID, excluding the 'photo' field from the result
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");

    // Respond with a success message if the product was deleted
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    // Catch any errors that occur and log them
    console.log(error);

    // Respond with an error message if something goes wrong
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
  