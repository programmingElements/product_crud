import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import uploadImageFile from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
    try {

        console.log("Image Object: ", req.file);

        const url = await uploadImageFile(req.file.path);

        console.log("Cloudinary Object: ", url);
        
        return res.status(201).json(
            new ApiResponse(201, {name: "Mobile", description: "This is 30k mobile", quantity: 1}, "Product Creation Successfully")
        )
    } catch (error) {
        return res.status(error.status).json(error); 
    }
}

const updateProduct = (req, res) => {
    try {
        console.log(req.params);
        const {productId} = req.params;
        
        // req.params = { productId: "12203456" , customerId: "93934394343" }

        if (!productId) {
            throw new ApiError(402, "Product Id Not Found!!");
        }

        return res.status(200).json(
            new ApiResponse(200, {id: req.params.productId, name: "Mobile Redmi", description: "This is 30k mobile", quantity: 1}, "Product Updated Successfully")
        )
    } catch (error) {
        return res.status(error.status).json(error);
    }
}

export {
    createProduct,
    updateProduct
}