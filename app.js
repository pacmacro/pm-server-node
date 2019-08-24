const bodyParser = require("body-parser")
const express = require("express")

const Query = require("./middleware/query")
const Count = require("./middleware/count")
const Update = require("./middleware/update")
const Game = require("./game/game")
const { STATE } = require("./enums")

const app = express()
let game = new Game()
game.startLoop(1000)

const serverConfig = require("./config")

app.use(bodyParser.json())
app.use(express.static("public"))

app.all("*", (req, res, next) => {
    console.log(`[INFO] Mapped ${req.method} ${req.originalUrl}`)

    res.set("Access-Control-Allow-Origin", "*")
    res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")

    res.type("json")

    try {
        next()
    } catch (except) {
        console.log(`[ERROR] ${except}`)
        res.status(500)
    }

    console.log(`[INFO] Replying to request with HTTP ${res.statusCode}`)
    res.end()
})

app.get("/player/details", (req, res) => new Query(game.players).handler(req, res))

app.get("/player/locations", (req, res) => new Query(game.players).hide("state").handler(req, res))

app.get("/player/states", (req, res) => new Query(game.players).hide("location").handler(req, res))

app.get("/player/:name/location", (req, res) =>
    new Query(game.players)
        .contains("name", req.params.name)
        .hide("name", "state")
        .handler(req, res)
)

app.get("/player/:name", (req, res) =>
    new Query(game.players)
        .contains("name", req.params.name)
        .hide("name", "state")
        .handler(req, res)
)

app.get("/player/:name/state", (req, res) =>
    new Query(game.players)
        .contains("name", req.params.name)
        .hide("name", "location")
        .handler(req, res)
)

app.get("/pacdots", (req, res) => new Query(game.pacdots).handler(req, res))

app.get("/pacdots/uneaten", (req, res) =>
    new Query(game.pacdots).contains("eaten", false).handler(req, res)
)

app.get("/pacdots/count", (req, res) =>
    new Count(game.pacdots)
        .addCount("total", () => true)
        .addCount("eaten", pacdot => pacdot.eaten)
        .addCount("uneaten", pacdot => !pacdot.eaten)
        .addCount("uneatenPowerdots", pacdot => !pacdot.eaten && pacdot.powerdot)
        .handler(req, res)
)

app.listen(serverConfig.port, () =>
    console.log(`[INFO] Server listening on http://localhost:${serverConfig.port}.`)
)

app.post("/player/:name", (req, res) =>
    new Update(game.players)
        .contains("name", req.params.name)
        .replace("location", req.body)
        .handler(req, res)
)

app.put("/player/:name/location", (req, res) =>
    new Update(game.players)
        .contains("name", req.params.name)
        .replace("location", req.body)
        .handler(req, res)
)

app.delete("/player/:name", (req, res) =>
    new Update(game.players)
        .contains("name", req.params.name)
        .replace("state", "uninitialized")
        .handler(req, res)
)

app.post("/admin/pacdots/reset", (req, res) =>
    new Update(game.pacdots).replace("uneaten", false).handler(req, res)
)

app.put("/admin/player/:name/state", (req, res) =>
    new Update(game.players)
        .contains("name", req.params.name)
        .replace("state", req.body.state)
        .handler(req, res)
)

app.put("/admin/gamestate", (req, res) => {
    game.setState(req.body.state.toLowerCase())
    if (game.state === STATE.INITIALIZING) {
        game.stopLoop()
        game = new Game()
        game.startLoop()
    }
    return (req, res) => res.status(200).send({})
})
