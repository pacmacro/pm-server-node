"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const game_1 = __importDefault(require("./game"));
const app = express_1.default();
const port = 3000;
// const serverConfig = require("../config")
const hideProperties = (entities, ...keys) => entities.map(entity => {
    // this line makes a deep copy of the entity
    const newEntity = Object.assign({}, entity);
    for (const key of keys) {
        console.log("deleting", key);
        delete newEntity[key];
    }
    console.log(newEntity);
    return newEntity;
});
const replaceProperties = (entities, contents, replacement) => {
    for (const entity of entities) {
        // prettier-ignore
        if (Object.keys(contents).reduce((previous, current) => previous && entity[current] === contents[current], true)) {
            for (const key of Object.keys(replacement)) {
                entity[key] = replacement[key];
            }
        }
    }
};
// // some test code
const obj = { greet: "hi", your: "mom" };
const obj2 = { greet: "hi", your: "father" };
const contents = { your: "mom" };
const replacement = { your: "mother", greet: "sup" };
const arr = [obj, obj2];
replaceProperties(arr, {}, replacement);
console.log(arr);
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
app.all("*", (req, res, next) => {
    console.log(`[INFO] Mapped ${req.method} ${req.originalUrl}`);
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.type("json");
    try {
        next();
    }
    catch (except) {
        console.log(`[ERROR] ${except}`);
        res.status(500);
    }
    console.log(`[INFO] Replying to request with HTTP ${res.statusCode}`);
    res.end();
});
// Desc: Show all the info about each players (include "name", "locations", and "state")
// prettier-ignore
app.get("/player/details", (req, res) => res.status(200).send(game_1.default.players));
// Desc: Show location info (latitude and longtitude) about each players
// prettier-ignore
app.get("/player/locations", (req, res) => res.status(200).send(hideProperties(game_1.default.players, "state" /* STATE */)));
// Desc: Show the current states of each players
// prettier-ignore
app.get("/player/states", (req, res) => res.status(200).send(hideProperties(game_1.default.players, "location" /* LOCATION */)));
// Desc: Show the location info of a specific player
// prettier-ignore
app.get("/player/:name/location", (req, res) => res.status(200).send(hideProperties(game_1.default.players.filter(player => player.name === req.params.name), "name" /* NAME */, "state" /* STATE */)));
// Desc: Show all the info of a specific player
// prettier-ignore
app.get("/player/:name", (req, res) => res.status(200).send(hideProperties(game_1.default.players.filter(player => player.name === req.params.name), "name" /* NAME */)));
// Desc: Show the current state of a specific player
// prettier-ignore
app.get("/player/:name/location", (req, res) => res.status(200).send(hideProperties(game_1.default.players.filter(player => player.name === req.params.name), "name" /* NAME */, "location" /* LOCATION */)));
// Desc: Show all the info about each pacdots (include: "location", "eaten", "powerdot")
app.get("/pacdots", (req, res) => res.status(200).send(game_1.default.players));
// Desc: Show all the uneaten pacdots in the game
// prettier-ignore
app.get("/pacdots/uneaten", (req, res) => res.status(200).send(hideProperties(game_1.default.pacdots.filter(pacdot => pacdot.eaten === false), "eaten" /* EATEN */)));
// Desc: show the number of pacdots (include total, eaten, uneaten, and uneatenPowerdots)
// prettier-ignore
app.get("/pacdots/count", (req, res) => res.status(200).send({
    total: game_1.default.pacdots.length,
    eaten: game_1.default.pacdots.filter(pacdot => pacdot.eaten === true).length,
    uneaten: game_1.default.pacdots.filter(pacdot => pacdot.eaten === false).length,
    uneatenPowerdots: game_1.default.pacdots.filter(pacdot => pacdot.powerdot === true && pacdot.eaten === false).length
}));
app.post("/player/:name", (req, res) => {
    replaceProperties(game_1.default.players, { name: req.params.name }, { location: req.body });
    res.status(200).send({});
});
app.put("/player/:name/location", (req, res) => {
    replaceProperties(game_1.default.players, { name: req.params.name }, { location: req.body });
    res.status(200).send({});
});
app.delete("/player/:name", (req, res) => {
    replaceProperties(game_1.default.players, { name: req.params.name }, { state: "uninitialized" /* UNINITIALIZED */ });
    res.status(200).send({});
});
// app.post("/admin/pacdots/reset", (req, res) =>
//     new Update(game.pacdots).replace("uneaten", false).handler(req, res)
// )
app.post("/admin/pacdots/reset", (req, res) => {
    replaceProperties(game_1.default.pacdots, {}, { eaten: false });
});
// app.put("/admin/player/:name/state", (req, res) =>
//     new Update(game.players)
//         .contains("name", req.params.name)
//         .replace("state", req.body.state)
//         .handler(req, res)
// )
// app.put("/admin/gamestate", (req, res) => {
//     game.setState(req.body.state.toLowerCase())
//     if (game.state === STATE.INITIALIZING) {
//         game.stopLoop()
//         game = new Game()
//         game.startLoop()
//     }
//     return (req, res) => res.status(200).send({})
// })
app.listen(port, () => console.log(`[INFO] Server listening on http://localhost:${port}.`));
//# sourceMappingURL=app.js.map