import fs from "fs";
import path from "path";

import { getRepository } from "typeorm";
import Monster from "../models/Monster";
import World from "../models/World";

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
      monster.isBoss = false;

      await this.execute(monster);
    }
  }

  async execute(monster: Monster) {
    const repo = getRepository(Monster);

    const repoWorlds = getRepository(World);
    const worlds = await repoWorlds.find();
    monster.worlds = worlds;

    if (await repo.findOne({ race: monster.race })) {
      return new Error("Monster already registered");
    }

    const response = repo.create(monster);
    await repo.save(response);
  }
}
