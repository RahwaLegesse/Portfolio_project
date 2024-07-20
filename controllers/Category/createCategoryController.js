import categoryModel from "../../models/categoryModel.js";
import slugify from "slugify";


// Exporting the createCategoryController function to handle the creation of new categories
export const createCategoryController = async (req, res) => {
  try {
    // Extracting 'name' from the request body
    const { name } = req.body;

    // Check if 'name' is provided; if not, respond with an error message
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    // Check if a category with the same name already exists in the database
    const existingCategory = await categoryModel.findOne({ name });

    // If a category with the same name exists, respond with a failure message
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    // Create a new category object and save it to the database
    const category = await new categoryModel({
      name, // Set the name of the category
      slug: slugify(name), // Generate a URL-friendly slug based on the category name
    }).save();

    // Respond with a success message and the details of the newly created category
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    // Log any errors that occur
    console.log(error);

    // Respond with an error message if something goes wrong
    res.status(500).send({
      success: false,
      error, // Include the error details
      message: "Error in creating category", // Provide an error message
    });
  }
};
