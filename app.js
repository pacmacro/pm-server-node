const bodyParser = require("body-parser")
const express = require("express")

const Query = require("./game/query")
const Game = require("./game/game")

const app = express()
const game = new Game()

const serverConfig = require("./config.json")

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

app.get("/player/details", new Query(game.players).handler)

app.get("/player/locations", new Query(game.players).hide("state").handler)

app.get("/player/states", new Query(game.players).hide("location").handler)

app.get("/player/:name/location", (req, res) =>
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

app.get("/pacdots", new Query(game.pacdots).handler)

app.get("/pacdots/uneaten", (req, res) =>
    new Query(game.pacdots).contains("eaten", false).handler(req, res)
)

app.listen(serverConfig.port, () =>
    console.log(
        `[INFO] Server listening on http://localhost:${serverConfig.port}.`
    )
)
