import { getRepository } from "typeorm";
import KillRegister from "../models/KillRegister";
import Monster from "../models/Monster";
import World from "../models/World";
import { CreateMonsterService } from "./CreateMonsterService";

export class CreateKillRegisterService {
  async populate(world: World, entries: any[]) {
    await entries.forEach(async (entry) => {
      const repo = getRepository(KillRegister);
      const killRegister = new KillRegister();
      killRegister.amount = entry["last_day_killed"];
      killRegister.registered_at = new Date();
      killRegister.world = world;

      const repoMonster = getRepository(Monster);
      let monster = await repoMonster.findOne({ race: entry.race });
      if (!monster) {
        // Create new monster
        monster = new Monster();
        monster.race = entry.race;
        const repoWorlds = getRepository(World);
        let worlds = await repoWorlds.find();
        monster.worlds = worlds;
        monster.isBoss = false;
        monster.name = "";
        await new CreateMonsterService().execute(monster);
      }
      killRegister.monster = await repoMonster.findOneOrFail({
        race: monster.race,
      });
      try {
        await repo.create(killRegister);
        await repo.save(killRegister);
      } catch (err) {
        console.log(err);
      }
    });
  }
}
