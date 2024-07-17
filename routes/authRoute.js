import express from "express";
import { UpdateProfileController } from "../controllers/Auth/UpdateProfileController.js";
import { orderStatusController } from "../controllers/Auth/orderStatusController.js";
import { allUsers } from "../controllers/Auth/allUsers.js";
import { loginController } from "../controllers/Auth/loginController.js";
import { registerController } from "../controllers/Auth/registerController.js";
import { ForgotPasswordController } from "../controllers/Auth/ForgotPasswordController.js";
import { getOrdersController } from "../controllers/Auth/getOrdersController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { testController } from "../controllers/Auth/testController.js";
import { getAllOrdersController } from "../controllers/Auth/getAllOrdersController.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", ForgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, UpdateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);
router.get("/users", requireSignIn, isAdmin, allUsers);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;