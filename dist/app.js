"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const game_1 = __importDefault(require("./game"));
const port = 3000;
const app = express_1.default();
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
        // evaluates true if entity has matching keys and values with contents
        // prettier-ignore
        if (Object.keys(contents).reduce((previous, current) => previous && entity[current] === contents[current], true)) {
            for (const key of Object.keys(replacement)) {
                entity[key] = replacement[key];
            }
        }
    }
};
const toRadians = (degrees) => (degrees / 180) * Math.PI;
function getDistanceBetween(location1, location2) {
    // earth
    var R = 6371; // km
    // deg2rad
    const lat1 = (location1.latitude / 180) * Math.PI;
    const lat2 = (location2.latitude / 180) * Math.PI;
    const lon1 = (location1.longitude / 180) * Math.PI;
    const lon2 = (location2.longitude / 180) * Math.PI;
    // Equirectangular approximation
    // lower accuracy, higher performance
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = lat2 - lat1;
    var d = Math.sqrt(x * x + y * y) * R;
    return Math.round(d * 1000);
}
console.log(getDistanceBetween({ latitude: 49.282365, longitude: -123.114479 }, { latitude: 49.282009, longitude: -123.120824 }));
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
// prettier-ignore
app.get("/player/details", (req, res) => res.status(200).send(game_1.default.players));
// prettier-ignore
app.get("/player/locations", (req, res) => res.status(200).send(hideProperties(game_1.default.players, "state" /* STATE */)));
// prettier-ignore
app.get("/player/states", (req, res) => res.status(200).send(hideProperties(game_1.default.players, "location" /* LOCATION */)));
// prettier-ignore
app.get("/player/:name/location", (req, res) => res.status(200).send(hideProperties(game_1.default.players.filter(player => player.name === req.params.name), "name" /* NAME */, "state" /* STATE */)));
// prettier-ignore
app.get("/player/:name", (req, res) => res.status(200).send(hideProperties(game_1.default.players.filter(player => player.name === req.params.name), "name" /* NAME */)));
// prettier-ignore
app.get("/player/:name/location", (req, res) => res.status(200).send(hideProperties(game_1.default.players.filter(player => player.name === req.params.name), "name" /* NAME */, "location" /* LOCATION */)));
app.get("/pacdots", (req, res) => res.status(200).send(game_1.default.players));
// prettier-ignore
app.get("/pacdots/uneaten", (req, res) => res.status(200).send(hideProperties(game_1.default.pacdots.filter(pacdot => pacdot.eaten === false), "eaten" /* EATEN */)));
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
app.post("/admin/pacdots/reset", (req, res) => {
    replaceProperties(game_1.default.pacdots, {}, { eaten: false });
    res.status(200).send({});
});
app.put("/admin/player/:name/state", (req, res) => {
    replaceProperties(game_1.default.players, { name: req.params.name }, { state: req.body.state });
    res.status(200).send({});
});
app.put("/admin/gamestate", (req, res) => {
    game_1.default.state = req.body.state.toLowerCase();
    res.status(200).send({});
});
app.listen(port, () => console.log(`[INFO] Server listening on http://localhost:${port}.`));
//# sourceMappingURL=app.js.map