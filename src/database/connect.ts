import { createConnection } from "typeorm";
import sqlite3 from "sqlite3";

import { CreateWorldService } from "../services/CreateWorldService";
import { CreateMonsterService } from "../services/CreateMonsterService";

// SQLITE DB
const DATABASE_FILE = process.env.TYPEORM_DATABASE;
if (!DATABASE_FILE) {
  throw new Error("Invalid DATABASE_FILE");
}

// Typeorm Connection
createConnection().then(async () => {
  new sqlite3.Database(DATABASE_FILE);
  console.log("🔗 Successfully connected to database.");
  new CreateWorldService().populateFromFile();
  new CreateMonsterService().populateFromFile();
});
