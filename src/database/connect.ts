import { createConnection, getRepository } from "typeorm";

import { CreateWorldService } from "../services/CreateWorldService";
import { CreateMonsterService } from "../services/CreateMonsterService";
import { CreateKillRegisterService } from "../services/CreateKillRegisterService";
import World from "../models/World";

import fs from "fs";
import axios from "axios";

// SQLITE DB
// const DATABASE_FILE = process.env.TYPEORM_DATABASE;
// if (!DATABASE_FILE) {
//   throw new Error("Invalid DATABASE_FILE");
// }

// Typeorm Connection
export const connection = createConnection().then(async () => {
  // new sqlite3.Database();
  console.log("🔗 Successfully connected to database.");
  //await new CreateWorldService().populateFromFile();
  //await new CreateMonsterService().populateFromFile();
});
