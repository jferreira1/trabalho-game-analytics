import axios from "axios";
import fs from "fs";

axios.get("https://dev.tibiadata.com/v3/creatures").then((res) => {
  const data = res.data;
  fs.writeFileSync("./src/assets/monsters.json", JSON.stringify(data));
});

axios.get("https://dev.tibiadata.com/v3/worlds").then((res) => {
  const data = res.data;
  fs.writeFileSync("./src/assets/worlds.json", JSON.stringify(data));
});
