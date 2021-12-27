import { createConnection } from "typeorm";
import sqlite3 from "sqlite3";

// SQLITE DB
const DATABASE_FILE = process.env.DATABASE_FILE;
if (!DATABASE_FILE) {
  throw new Error("Invalid DATABASE_FILE");
}

// Typeorm Connection
createConnection().then(() => {
  new sqlite3.Database(DATABASE_FILE);
  console.log("🔗 Successfully connected to database.");
});
