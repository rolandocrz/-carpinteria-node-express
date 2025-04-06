import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "crzpass";
const DB_DATABASE = process.env.DB_DATABASE || "sistemas";
const DB_HOST = process.env.DB_HOST || "localhost";

export { PORT, DB_PORT, DB_USER, DB_PASS, DB_DATABASE, DB_HOST };
