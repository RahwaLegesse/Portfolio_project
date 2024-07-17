import userModel from "../../models/userModel.js";

// Controller function to get all users
export const allUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const data = await userModel.find();
    
    // Send the fetched users as a JSON response
    res.json(data);
  } catch (error) {
    // Log the error to the console
    console.log(error);
    
    // Send a 500 status code and error message if there's an issue
    res.status(500).send({
      success: false, // Indicates the failure of the operation
      message: "Error while getting users", // Error message
      error: true // Additional error flag
    });
  }
};
