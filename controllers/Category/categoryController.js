import categoryModel from "../../models/categoryModel.js";

// Exporting the categoryController function to be used in other parts of the application
export const categoryController = async (req, res) => {
  try {
    // Fetch all categories from the database
    const category = await categoryModel.find({});
    
    // Respond with a success message and the list of categories
    res.status(200).send({
      success: true,  // Indicates that the request was successful
      message: "All Categories List",  // A message describing the response
      category,  // The list of categories retrieved from the database
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);

    // Respond with an error message and details if something goes wrong
    res.status(500).send({
      success: false,  // Indicates that the request failed
      error,  // Includes the error details
      message: "Error while getting all categories",  // An error message
    });
  }
};
  