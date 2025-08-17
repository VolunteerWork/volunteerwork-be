import { config } from 'dotenv'

config({ path: `.env` })

// Server
export const { APP_PORT }=process.env;

// Database
export const { DB_HOST, DB_PORT,  DB_NAME, DB_USER, DB_PASS } = process.env;

// Security
export const { JWT_SECRET_KEY, JWT_EXPIRATION }=process.env;

// Email
export const { EMAIL_USER, EMAIL_PASS } = process.env;

// Cloudinary
export const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, 
  CLOUDINARY_URL, CLOUDINARY_NAME }=process.env;

// Frontend
export const FRONTEND_ORIGINS = process.env.FRONTEND_ORIGINS || "";