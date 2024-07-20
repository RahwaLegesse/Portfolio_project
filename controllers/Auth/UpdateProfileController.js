import { hashPassword } from "../../helpers/authHelper.js";
import userModel from "../../models/userModel.js";

export const UpdateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const User = await userModel.findById(req.user._id);

    // Check password length
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and must be at least 6 characters long" });
    }

    // Hash the password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || User.name,
        password: hashedPassword || User.password,
        phone: phone || User.phone,
        address: address || User.address,
      },
      { new: true }
    );

    // Send success response
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error,
    });
  }
};
