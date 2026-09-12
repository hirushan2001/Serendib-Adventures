import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl: connectionString?.includes("sslmode=require") || process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database Pool");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
});
