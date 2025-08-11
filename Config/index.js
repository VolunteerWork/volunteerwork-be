import { config } from 'dotenv'

config({ path: `.env` })
// Server
export const {PORT, HOSTNAME}=process.env;
// Database
export const {DB_URL}=process.env;
// Security
export const {SECRET_KEY,EXPIRATION}=process.env;
// Email
export const {EMAIL_USER, EMAIL_PASS}=process.env;
// Cloudinary
export const { API_KEY, API_SECRET, CLOUDINARY_URL, CLOUD_NAME }=process.env;
// Frontend
export const {FRONTEND_ORIGIN}=process.env;