import mongoose from "mongoose";
import { DB_URL } from "./index.js";

export async function connectDatabase() {
          try {
              await mongoose.connect(DB_URL, {
                useNewUrlParser: true,
                serverSelectionTimeoutMS: 5000
              });
              console.log('Connect success');
          } catch (error) {
              console.log("Error", error);
          }
}