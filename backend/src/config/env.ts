import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV ?? "development";

const envFilesDirectory = {
  development: "../../.env.development",
  production: "../../.env.production",
};

dotenv.config({
  path: path.resolve(__dirname, envFilesDirectory[NODE_ENV as keyof typeof envFilesDirectory]),
});

export default {
  NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
};