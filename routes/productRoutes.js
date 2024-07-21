import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { CreateProductController } from "../controllers/Product/CreateProductController.js";
import { updateProductController } from "../controllers/Product/updateProductController.js";
import { getProductController } from "../controllers/Product/getProductController.js";
import { getSingleProductController } from "../controllers/Product/getSingleProductController.js";
import { deleteProductController } from "../controllers/Product/deleteProductController.js";
import { productFiltersController } from "../controllers/Product/productFiltersController.js";
import { productCountController } from "../controllers/Product/productCountController.js";
import { productListController } from "../controllers/Product/productListController.js";
import { searchProductController } from "../controllers/Product/searchProductController.js";
import { productCategoryController } from "../controllers/Product/productCategoryController.js";
import { braintreeTokenController } from "../controllers/Product/braintreeTokenController.js";
import { brainTreePaymentController } from "../controllers/Product/brainTreePaymentController.js";
import { relatedProductController } from "../controllers/Product/relatedProductController.js";
import { productImgController } from "../controllers/Product/productImgController.js";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  CreateProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productImgController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;