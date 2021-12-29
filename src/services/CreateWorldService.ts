import fs from "fs";
import path from "path";

import { getRepository } from "typeorm";
import World from "../models/World";

export class CreateWorldService {
  // Popula a tabela worlds
  async populateFromFile() {
    // Arquivo JSON da API do TibiaData 27/12/2021
    let rawData = fs.readFileSync(
      path.join(__dirname, "../assets/", "worlds.json")
    );
    let worldsData = JSON.parse(rawData.toString()).worlds;

    for (let worldData of worldsData["regular_worlds"]) {
      if (worldData["game_world_type"] === "regular") {
        let world = new World();
        world.name = worldData.name;
        world.location = worldData.location;
        world.pvp_type = worldData.pvp_type;
        world.transfer_type = worldData.transfer_type;

        await this.execute(world);
      }
    }
  }

  async execute(world: World) {
    const repo = getRepository(World);

    if (await repo.findOne({ name: world.name })) {
      return new Error("World already registered");
    }

    const response = repo.create(world);
    await repo.save(response);
  }
}
