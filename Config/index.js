import { config } from 'dotenv'

config({ path: `.env` })

// Server
export const APP_PORT = parseInt(process.env.APP_PORT) || 8080;

// Database
export const DB_URL = process.env.DB_URL
export const DB_IS_DOCUMENTDB = (process.env.DB_IS_DOCUMENTDB === "true");

// Security
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION) || 604800;

// Email
export const { EMAIL_USER, EMAIL_PASS } = process.env;

// Cloudinary
export const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, 
  CLOUDINARY_URL, CLOUDINARY_NAME }=process.env;

// Frontend
export const FRONTEND_ORIGINS = process.env.FRONTEND_ORIGINS || "";