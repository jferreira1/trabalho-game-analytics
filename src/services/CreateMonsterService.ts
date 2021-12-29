import fs from "fs";
import path from "path";

import { getRepository } from "typeorm";
import Monster from "../models/Monster";

export class CreateMonsterService {
  async populateFromFile() {
    let rawData = fs.readFileSync(
      path.join(__dirname, "../assets/", "monsters.json")
    );
    let monstersData = JSON.parse(rawData.toString()).creatures;

    for (let monsterData of monstersData["creature_list"]) {
      let monster = new Monster();
      monster.race = monsterData.race;
      monster.name = monsterData.name;
      monster.isBoss = 0;

      await this.execute(monster);
    }
  }

  async execute(monster: Monster) {
    const repo = getRepository(Monster);

    if (await repo.findOne({ race: monster.race })) {
      return new Error("Monster already registered");
    }

    const response = repo.create(monster);
    await repo.save(response);
  }
}
