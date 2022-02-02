import axios from "axios";
import { getRepository } from "typeorm";
import KillRegister from "../models/KillRegister";
import Monster from "../models/Monster";
import World from "../models/World";
import { CreateMonsterService } from "./CreateMonsterService";

export class CreateKillRegisterService {
  async callApi() {
    const repo = getRepository(World);
    const worlds = await repo.find();
    worlds.forEach((world, index) => {
      let timer = setTimeout(async () => {
        console.log(
          `https://dev.tibiadata.com/v3/killstatistics/${world.name.toLocaleLowerCase()}`
        );

        await axios
          .get(
            `https://dev.tibiadata.com/v3/killstatistics/${world.name.toLocaleLowerCase()}`
          )
          .then(async (res) => {
            console.log(res.data.information);

            await this.populate(world, res.data.killstatistics.entries);

            clearTimeout(timer);
          });
      }, 2200 * (index + 1));
    });
  }
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
        try {
          await new CreateMonsterService().execute(monster);
        } catch (err) {
          console.log(err);
        }
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
