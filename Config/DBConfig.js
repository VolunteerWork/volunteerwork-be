import mongoose from "mongoose";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./index.js";

export async function connectDatabase() {
          try {
              var dbUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
              await mongoose.connect(dbUrl, {
                useNewUrlParser: true,
                serverSelectionTimeoutMS: 5000
              });
              console.log('Connect success');
          } catch (error) {
              console.log("Error", error);
          }
}