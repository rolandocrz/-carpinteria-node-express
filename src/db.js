import { createPool } from "mysql2/promise";
import { DB_PORT, DB_USER, DB_PASS, DB_DATABASE, DB_HOST } from "./config.js";

export const pool = createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
});
