import categoryModel from "../../models/categoryModel.js";
import slugify from "slugify";

// Exporting the singleCategoryController function for handling requests to get a single category
export const singleCategoryController = async (req, res) => {
  try {
    // Find the category by its slug from the request parameters
    const category = await categoryModel.findOne({ slug: req.params.slug });

    // Respond with a success message and the found category
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);

    // Respond with an error message if something goes wrong
    res.status(500).send({
      success: false,
      error, // Include error details for debugging
      message: "Error While getting Single Category", // Provide a descriptive error message
    });
  }
};
  