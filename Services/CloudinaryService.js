import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME, CLOUDINARY_URL } from '../Config/index.js';
import RequestError from '../Errors/RequestError.js';

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloudinary_url: CLOUDINARY_URL,
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async uploadImage(file, existsUrl) {
    try {
      if(!file) throw new RequestError("There is no uploaded image");
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;
      const options = {
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        invalidate: true,
        format: "png",
      };

      if (existsUrl && existsUrl.includes('res.cloudinary.com')) {
			options.public_id = existsUrl.split('/').slice(-1)[0].split('.')[0]
		}

      const result = await cloudinary.uploader.upload(dataURI, options);
      return result.secure_url;
    } catch (error) {
      console.error(error);
      throw new Error("Image upload failed");
    }
  }
  async deleteImage(imageUrl){
    if (imageUrl && imageUrl.includes('res.cloudinary.com')) {
      var public_id = imageUrl.split('/').slice(-1)[0].split('.')[0];
      cloudinary.uploader.destroy(public_id,(result)=>{
          console.log("delete image successfully: "+result);
      })
    }
  }
}

export default new CloudinaryService();