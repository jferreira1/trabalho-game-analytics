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
createConnection().then(async () => {
  // new sqlite3.Database();
  console.log("🔗 Successfully connected to database.");
  //await new CreateWorldService().populateFromFile();
  //await new CreateMonsterService().populateFromFile();

  const repo = getRepository(World);
  const worlds = await repo.find();
  worlds.forEach((world, index) => {
    let timer = setTimeout(async () => {
      await console.log(
        `https://dev.tibiadata.com/v3/killstatistics/world/${world.name.toLocaleLowerCase()}`
      );
      await axios
        .get(
          `https://dev.tibiadata.com/v3/killstatistics/world/${world.name.toLocaleLowerCase()}`
        )
        .then(async (res) => {
          await console.log(res.data.information);
          let date = new Date();
          fs.writeFileSync(
            `./src/assets/killstatistics/${world.name}${date
              .toLocaleDateString("pt-BR")
              .replace("/", "")
              .replace("/", "")}.json`,
            JSON.stringify(res.data)
          );
          await new CreateKillRegisterService().populate(
            world,
            res.data.killstatistics.entries
          );

          clearTimeout(timer);
        });
    }, 2200 * (index + 1));
  });
});
