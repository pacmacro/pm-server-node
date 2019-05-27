const bodyParser = require("body-parser");
const express = require("express");
const database = require("./database.js");
const enums = require("./enums.js");

const app = express();

const serverConfig = require("./config.json");

app.use(bodyParser.json());
app.use(express.static("public"));

app.all("*", (req, res, next) => {
  console.log(`[INFO] Mapped ${req.method} ${req.originalUrl}`);

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

  res.type("json");

  try {
    next();
  } catch (except) {
    console.log(`[ERROR] ${except}`);
    res.status(500);
  }

  console.log(`[INFO] Replying to request with HTTP ${res.statusCode}`);
  res.end();
});

app.get("/player/details", (req, res) => {
  res.status(200).send(database.getPlayersJSON())
})

app.listen(serverConfig.port, () => console.log(
  `[INFO] Server listening on http://localhost:${serverConfig.port}.`
));
