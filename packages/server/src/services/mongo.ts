import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

function getMongoURI(dbname: string) {
  let connection_string = `mongodb://localhost:27017/${dbname}`;
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, MONGO_URI } = process.env;

  // If MONGO_URI is provided, use it directly
  if (MONGO_URI) {
    console.log("Connecting to MongoDB at", MONGO_URI.replace(/:[^:@]+@/, ":<password>@"));
    return MONGO_URI;
  }

  // Otherwise, construct from individual components
  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    // Check if MONGO_CLUSTER already contains mongodb:// or mongodb+srv://
    if (MONGO_CLUSTER.startsWith("mongodb://") || MONGO_CLUSTER.startsWith("mongodb+srv://")) {
      // Use the full URI from MONGO_CLUSTER, just replace credentials and ensure database name
      connection_string = MONGO_CLUSTER.replace(
        /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
        `mongodb$1://${MONGO_USER}:${MONGO_PWD}@`
      );
      // Ensure the database name is in the connection string
      // Split on ? to separate path from query string
      const [basePath, queryString] = connection_string.split('?');
      // Remove trailing slash if present
      const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
      // Check if database name is already in the path (after the last /)
      const pathParts = cleanBasePath.split('/');
      if (pathParts.length >= 4 && pathParts[3] !== '') {
        // Database name already exists, replace it
        pathParts[3] = dbname;
      } else {
        // No database name, add it
        pathParts.push(dbname);
      }
      connection_string = pathParts.join('/');
      if (queryString) {
        connection_string += '?' + queryString;
      } else {
        connection_string += '?retryWrites=true&w=majority';
      }
    } else {
      // Construct URI from components
      connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
    }
    console.log(
      "Connecting to MongoDB at",
      connection_string.replace(/:[^:@]+@/, ":<password>@")
    );
  } else {
    console.log("Connecting to MongoDB at ", connection_string);
  }
  return connection_string;
}

export function connect(dbname: string) {
  mongoose
    .connect(getMongoURI(dbname))
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
}