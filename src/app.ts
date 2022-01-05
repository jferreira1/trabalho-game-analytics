import prompt from "prompt";
import "./database/connect";

import { connection } from "./database/connect";
import { CreateKillRegisterService } from "./services/CreateKillRegisterService";

const main = () => {
  connection.then(async () => {
    const createKillRegisterService = new CreateKillRegisterService();
    await createKillRegisterService.callApi();
  });
};

main();
