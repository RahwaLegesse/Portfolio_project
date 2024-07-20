import { hashPassword } from "../../helpers/authHelper.js";
import userModel from "../../models/userModel.js";

// Exporting the ForgotPasswordController function for handling password reset requests
export const ForgotPasswordController = async (req, res) => {
  try {
    // Extracting the email and newPassword from the request body
    const { email, newPassword } = req.body;

    // Checking if the email is provided
    if (!email) {
      res.status(400).send({ message: "Email is required" });
      return; // Exit early if email is missing
    }
    
    // Checking if the newPassword is provided
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
      return; // Exit early if newPassword is missing
    }
  
    // Finding a user with the provided email
    const user = await userModel.findOne({ email });
    
    // If no user is found with the provided email, send an error response
    if (!user) {
      return res.status(404).send({
        success: false,
        error: true,
        message: "Invalid Email Or Wrong Answer", // Message indicating the email is not associated with any user
      });
    }

    // Hashing the new password
    const hashed = await hashPassword(newPassword);

    // Updating the user's password in the database
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    // Sending a success response indicating the password has been reset
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully", // Confirmation message for successful password reset
    });
  } catch (error) {
    // Logging the error to the console for debugging purposes
    console.log(error);

    // Sending an error response in case of any issues during password reset
    res.status(500).send({
      success: false,
      message: "Something went wrong", // Generic error message for any issues
      error, // Including the error details for debugging
    });
  }
};
