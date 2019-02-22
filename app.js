const bodyParser = require("body-parser");
const express = require("express");
const database = require("./database.js");
const enums = require("./enums.js");
let playerNameEnum = enums.playerNames;

const serverOptions = {
  port: 3000
};

// const playerNameEnum = {
// 	PACMAN: "pacman",
// 	BLINKY: "blinky",
// 	CLYDE: "clyde",
// 	INKY: "inky",
// 	PINKY: "pinky"
// }

function setMappings(app) {
  app.use(bodyParser.json());
  app.use(express.static("public"));
  app.get("/", function (req, res) {
    res.status(200).send("Hello World!");
  });
};

function main() {
  const app = express();
  setMappings(app);
  // app.listen(serverOptions.port, () => console.log(
  //   `[INFO] Server listening on http://localhost:${serverOptions.port}.`
  // ));

  console.log(database.getPlayerLocation(playerNameEnum.PACMAN));
};

main();