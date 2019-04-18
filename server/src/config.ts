/* istanbul ignore file */
import * as dotenv from "dotenv";
import * as path from "path";
import * as process from "process";

// Load the .env file. Will silently fail.
dotenv.config({
  path: path.join(__dirname, "../.env")
});

const port = parseInt(process.env.LISTEN_PORT || "3000");
const NODE_ENV = process.env.NODE_ENV || "development";
const {
  MARVEL_API_URL,
  MARVEL_API_PUBLIC_KEY,
  MARVEL_API_PRIVATE_KEY
} = process.env;

export default {
  port,
  NODE_ENV,
  MARVEL_API_URL,
  MARVEL_API_PUBLIC_KEY,
  MARVEL_API_PRIVATE_KEY
};
