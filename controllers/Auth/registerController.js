import { hashPassword } from "../../helpers/authHelper.js";
import userModel from "../../models/userModel.js";

export const registerController = async (req, res) => {
    try {
      const { name, email, password, phone, address, answer } = req.body;
      //validations
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone number is Required" });
      }
      if (!address) {
        return res.send({ message: "Address is Required" });
      }
      if (!answer) {
        return res.send({ message: "Answer is Required" });
      }
      
      const if_user_exist = await userModel.findOne({ email });
    
      if (if_user_exist) {
        return res.status(200).send({
          success: false,
          error:true,
          message: "Account is Already Registered",
        });
      }

      const hashedPassword = await hashPassword(password);

      const user = await new userModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        answer,
      }).save();
  
      res.status(201).send({
        success: true,
        error:false,
        message: "User Registered Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error:true,
        message: "Errro in Registeration",
        error,
      });
    }
  };