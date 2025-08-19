import { config } from 'dotenv'

config({ path: `.env` })

// Server
export const APP_PORT = parseInt(process.env.APP_PORT) || 8080;

// Database
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = parseInt(process.env.DB_PORT);
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
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