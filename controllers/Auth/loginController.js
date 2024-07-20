import JWT from "jsonwebtoken";
import userModel from "../../models/userModel.js";
import { comparePassword } from "../../helpers/authHelper.js";

// Exporting the loginController function to handle user login requests
export const loginController = async (req, res) => {
  try {
    // Destructuring email and password from the request body
    const { email, password } = req.body;
    
    // Validation check for email and password
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password", // Error message for missing email or password
      });
    }
    
    // Checking if the user exists in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered", // Error message for unregistered email
      });
    }
    
    // Comparing provided password with stored hashed password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password", // Error message for incorrect password
      });
    }
    
    // Generating a JSON Web Token (JWT) for authenticated user
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expiration time set to 7 days
    });
    
    // Sending successful login response with user info and token
    res.status(200).send({
      success: true,
      message: "Login successfully", // Success message for successful login
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Sending user info except the password
      },
      token, // Sending the JWT token
    });
  } catch (error) {
    // Logging error details for debugging purposes
    console.log(error);
    
    // Sending error response if something goes wrong
    res.status(500).send({
      success: false,
      message: "Error in login", // Error message indicating login failure
      error, // Including error details for debugging
    });
  }
};
