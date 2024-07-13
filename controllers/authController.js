import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs"

export const SignupController = async (req, res) => {
    
  try{
    const { email, password, name, confirmpassword} = req.body

    const user = await userModel.findOne({email})

    console.log("user",user)

    if(user){
        throw new Error("Already user exits.")
    }

    if(!email){
       throw new Error("Please provide your email")
    }
    if(!password){
        throw new Error("Please provide your password")
    }
    if(!name){
        throw new Error("Please provide your name")
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if(!hashPassword){
        throw new Error("Something is wrong")
    }

    const payload = {
        ...req.body,
        role : 0,
        password : hashPassword,
        confirmpassword:hashPassword
    }

    const userData = new userModel(payload)
    const saveUser = await userData.save()

    res.status(201).json({
        data : saveUser,
        success : true,
        error : false,
        message : "User created Successfully!"
    })


}catch(err){
    res.json({
        message : err.message || err  ,
        error : true,
        success : false,
    })
}
};

  
  export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          adddress: user.address,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };
  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };


  export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };