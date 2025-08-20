import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from "url";
import { DB_URL, DB_IS_DOCUMENTDB } from "./index.js";

function getDocumentDBCAPath(){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname,"certs/documentdb-ca.pem");
}

export async function connectDatabase() {
  try {
    const options = {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000,
    };
    console.log("DB_IS_DOCUMENTDB", DB_IS_DOCUMENTDB)
    if (DB_IS_DOCUMENTDB) {
      options.tls = true;
      options.tlsCAFile = getDocumentDBCAPath();
    }

    await mongoose.connect(DB_URL, options);
    console.log('Connect success');
  } catch (error) {
      console.log("Error", error);
    }
}