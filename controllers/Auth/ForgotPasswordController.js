import { hashPassword } from "../../helpers/authHelper.js";
import userModel from "../../models/userModel.js";

export const ForgotPasswordController = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
    
      const user = await userModel.findOne({ email});
      
      if (!user) {
        return res.status(404).send({
          success: false,
          error:true,
          message: "Invalid Email Or Wrong Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };