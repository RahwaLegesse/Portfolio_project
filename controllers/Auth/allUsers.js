import userModel from "../../models/userModel.js";

export const allUsers = async (req, res) => {
    try {
      const users = await userModel.find()
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error:true
      });
    }
  };