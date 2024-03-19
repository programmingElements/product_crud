import express from "express";
import { createProduct, updateProduct } from "../controllers/product.controller.js";
import uploads from "../middlewares/multer.middleware.js";

const router = express.Router();

// create product
router.route("/").post(uploads.single("imageUrl") ,createProduct);

// update product
router.route("/:productId").put(updateProduct);

// get all products
// router.route("/").get();

// get single product
// router.route("/:productId").get();

// delete product
// router.route("/:productId").delete();

export default router;