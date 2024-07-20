import categoryModel from "../../models/categoryModel.js";
import slugify from "slugify";

// Exporting the updateCategoryController function for handling requests to update a category
export const updateCategoryController = async (req, res) => {
  try {
    // Extracting the new category name from the request body and category ID from the request parameters
    const { name } = req.body;
    const { id } = req.params;

    // Finding and updating the category by its ID
    const category = await categoryModel.findByIdAndUpdate(
      id, // The ID of the category to be updated
      { name, slug: slugify(name) }, // Updated fields: name and slug (generated from name)
      { new: true } // Option to return the updated document
    );

    // Responding with a success message and the updated category
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully", // Fixed typo from "messsage" to "message"
      category,
    });
  } catch (error) {
    // Logging any errors that occur during the process
    console.log(error);

    // Responding with an error message if something goes wrong
    res.status(500).send({
      success: false,
      error, // Including error details for debugging
      message: "Error while updating category", // Descriptive error message
    });
  }
};
