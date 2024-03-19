import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    imageUrl: { // cloudinary url 
        type: String
    }
}, {
    timestamps: true
});

const Product = mongoose.Model("Product", productSchema);

export default Product;

// Note: 
// Product -> products