import multer from "multer";

const UploadMiddleware=multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
}).single("image");

export default UploadMiddleware;