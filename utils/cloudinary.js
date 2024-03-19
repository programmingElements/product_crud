import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } from '../constant.js';
import fs from "fs";          

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET 
});

const uploadImageFile = async (localFile) => {
    try {
        if (!localFile) return null;
        console.log(localFile);

        // upload to the cloudinary
        const response = await cloudinary.uploader.upload(localFile,
            { resource_type: "auto" });
    
        console.log("File Upload Url: ", response.url);
        fs.unlinkSync(localFile);
        return response;
    } catch (error) {
        fs.unlinkSync(localFile);
        return null;   
    }
}

export default uploadImageFile;
