import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 22109;
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "LheydpjedyqIcWLEIKvPiJXWFObrsmNS";
const DB_DATABASE = process.env.DB_DATABASE || "railway";
const DB_HOST = process.env.DB_HOST || "caboose.proxy.rlwy.net";

export { PORT, DB_PORT, DB_USER, DB_PASS, DB_DATABASE, DB_HOST };
