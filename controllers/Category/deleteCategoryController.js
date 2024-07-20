import categoryModel from "../../models/categoryModel.js";

// Exporting the deleteCategoryController function for use in other parts of the application
export const deleteCategoryController = async (req, res) => {
  try {
    // Extracting the category ID from the request parameters
    const { id } = req.params;

    // Finding and deleting the category by its ID
    await categoryModel.findByIdAndDelete(id);

    // Sending a success response indicating that the category was deleted
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully", // Note: Fixed typo in message from "Categry" to "Category"
    });
  } catch (error) {
    // Logging any errors that occur during the process
    console.log(error);

    // Sending an error response if something goes wrong
    res.status(500).send({
      success: false,
      message: "Error while deleting category", // Note: Fixed typo in message from "error" to "Error"
      error, // Sending the error details
    });
  }
};
