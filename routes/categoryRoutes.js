import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/Category/createCategoryController.js";
import { updateCategoryController } from "../controllers/Category/updateCategoryController.js";
import { categoryController } from "../controllers/Category/categoryController.js";
import { singleCategoryController } from "../controllers/Category/singleCategoryController.js";
import { deleteCategoryController } from "../controllers/Category/deleteCategoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryController);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;