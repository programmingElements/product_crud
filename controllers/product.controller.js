import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Product from "../models/product.models.js";
import uploadImageFile from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, quantity, category } = req.body;

    console.log(name, description, quantity, category)

    // check product card already available
    const productExists = await Product.findOne({ name: name });

    if (productExists) {
      throw new ApiError(408, "Product Already Exists");
    }

    const imgRes = await uploadImageFile(req.file.path);

    const product = await Product.create({
      name: name,
      description: description,
      quantity: quantity,
      category: category,
      imageUrl: imgRes.url,
    });

    if (!product) {
      throw new ApiError(402, "Product Creation Failed");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product Creation Successfully"));
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log(req.params);
    const { productId } = req.params;

    if (!productId) {
      throw new ApiError(404, "productId is missing");
    }

    const { name, description, quantity, category } = req.body;

    // check product is available or not
    const productExists = await Product.findById(productId);

    if (!productExists) {
      throw new ApiError(404, "No Product Found!");
    }

    const imgRes = await uploadImageFile(req.file.path);

    // http://localhost:6774/products/6600fefed2fea0de580fd831

    // req.params = { productId: "6600fefed2fea0de580fd831"}

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name: name,
          description: description,
          quantity: quantity,
          category: category,
          imageUrl: imgRes.url,
        },
      },
      { new: true }
    );

    if (!product) {
      throw new ApiError(404, "Product Updation Failed");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product Updated Successfully"));
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Got All Products"));
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const getProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        if (!productId) {
            throw new ApiError(404, "productId is missing");
        }
        const product = await Product.findById(productId);

        if (!product) {
            throw new ApiError(404, "No Product Found");
        }
        return res.status(200).json(new ApiResponse(200, product, "Got Product"));
    } catch (error) {
        return res.status(error.status).json(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        if (!productId) {
            throw new ApiError(404, "productId is missing");
        }
        const productExists = await Product.findById(productId);
        if (!productExists) {
            throw new ApiError(404, "No Product Found");
        }
        const product = await Product.findByIdAndDelete(productId);
        return res.status(200).json(new ApiResponse(200, {}, "Product Deleted Successfully"))
    } catch (error) {
        return res.status(error.status).json(error);
    }
}

export { createProduct, updateProduct, getAllProducts, getProduct, deleteProduct };
