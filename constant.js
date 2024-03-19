import dotenv from "dotenv";

dotenv.config({path:"./.env"});


export const {
    PORT,
    MONGODB_URI,
    DB_NAME,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;