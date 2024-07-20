import { hashPassword } from "../../helpers/authHelper.js";
import userModel from "../../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // Perform validations on the input data
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    
    // Check if a user with the given email already exists
    const if_user_exist = await userModel.findOne({ email });
    if (if_user_exist) {
      return res.status(200).send({
        success: false,
        error: true,
        message: "Account is Already Registered",
      });
    }

    // Hash the user's password before saving it
    const hashedPassword = await hashPassword(password);

    // Create a new user and save it to the database
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    
    // Send a success response with the newly created user information
    res.status(201).send({
      success: true,
      error: false,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    // Log the error and send an error response
    console.log(error);
    res.status(500).send({
      success: false,
      error: true,
      message: "Error in Registration",
      error,
    });
  }
};
