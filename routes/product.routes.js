import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";
import uploads from "../middlewares/multer.middleware.js";

const router = express.Router();

// create product
router.route("/").post(uploads.single("imageUrl"), createProduct);

// update product
router.route("/:productId").put(uploads.single("imageUrl"), updateProduct);

// get all products
router.route("/").get(getAllProducts);

// get single product
router.route("/:productId").get(getProduct);

// delete product
router.route("/:productId").delete(deleteProduct);

export default router;