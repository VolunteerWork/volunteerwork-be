import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from "url";
import { DB_HOST, DB_IS_DOCUMENTDB, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./index.js";

function getDocumentDBCAPath(){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname,"certs/documentdb-ca.pem");
}

export async function connectDatabase() {
  try {
    var dbUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    const options = {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000,
    };
    console.log("DB_IS_DOCUMENTDB", DB_IS_DOCUMENTDB)
    if (DB_IS_DOCUMENTDB === "true") {
      options.tls = true;
      options.tlsCAFile = getDocumentDBCAPath();
    }

    await mongoose.connect(dbUrl, options);
    console.log('Connect success');
  } catch (error) {
      console.log("Error", error);
    }
}