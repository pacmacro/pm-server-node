import bodyParser from "body-parser"
import express from "express"
import game from "./game"
import play from "./play"
import config from "../config.json"

const port = process.env.PORT || config.port
const app = express()

// start core gameplay loop
setInterval(() => play(game), config.gameplayLoopTime)

const hideProperties = (entities: entity[], ...keys: KEY[]) =>
    entities.map(entity => {
        // this line makes a deep copy of the entity
        const newEntity = Object.assign({}, entity)
        for (const key of keys) {
            delete newEntity[key]
        }
        return newEntity
    })

const replaceProperties = (entities: any[], contents: {}, replacement: {}) => {
    for (const entity of entities) {
        // evaluates true if entity has matching keys and values with contents
        // prettier-ignore
        if (Object.keys(contents).reduce(
            (previous, current) => previous && entity[current] === contents[current],
            true
        )) {
            for (const key of Object.keys(replacement)) {
                entity[key] = replacement[key]
            }
        }
    }
}

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

// prettier-ignore
app.get("/player/details", (req, res) => res.status(200).send(
    game.players
))

// prettier-ignore
app.get("/player/locations", (req, res) => res.status(200).send(
    hideProperties(game.players, KEY.STATE)
))

// prettier-ignore
app.get("/player/states", (req, res) => res.status(200).send(
    hideProperties(game.players, KEY.LOCATION)
))

// prettier-ignore
app.get("/player/:name/location", (req, res) => res.status(200).send(
    hideProperties(
        game.players.filter(player => player.name === req.params.name), 
        KEY.NAME, 
        KEY.STATE
    )
))

// prettier-ignore
app.get("/player/:name", (req, res) => res.status(200).send(
    hideProperties(
        game.players.filter(player => player.name === req.params.name), 
        KEY.NAME
    )
))

// prettier-ignore
app.get("/player/:name/location", (req, res) => res.status(200).send(
    hideProperties(
        game.players.filter(player => player.name === req.params.name),
        KEY.NAME,
        KEY.LOCATION
    )
))

app.get("/pacdots", (req, res) => res.status(200).send(game.players))

// prettier-ignore
app.get("/pacdots/uneaten", (req, res) => res.status(200).send(
    hideProperties(
        game.pacdots.filter(pacdot => pacdot.eaten === false),
        KEY.EATEN
    )
))

// prettier-ignore
app.get("/pacdots/count", (req, res) => res.status(200).send({
    total: game.pacdots.length,
    eaten: game.pacdots.filter(pacdot => pacdot.eaten === true).length,
    uneaten: game.pacdots.filter(pacdot => pacdot.eaten === false).length,
    uneatenPowerdots: game.pacdots.filter(pacdot => pacdot.powerdot === true && pacdot.eaten === false).length
}))

app.post("/player/:name", (req, res) => {
    replaceProperties(
        game.players,
        { name: req.params.name },
        { location: req.body }
    )
    res.status(200).send({})
})

app.put("/player/:name/location", (req, res) => {
    replaceProperties(
        game.players,
        { name: req.params.name },
        { location: req.body }
    )
    res.status(200).send({})
})

app.delete("/player/:name", (req, res) => {
    replaceProperties(
        game.players,
        { name: req.params.name },
        { state: STATE.UNINITIALIZED }
    )
    res.status(200).send({})
})

app.post("/admin/pacdots/reset", (req, res) => {
    replaceProperties(game.pacdots, {}, { eaten: false })
    res.status(200).send({})
})

app.put("/admin/player/:name/state", (req, res) => {
    replaceProperties(
        game.players,
        { name: req.params.name },
        { state: req.body.state }
    )
    res.status(200).send({})
})

app.put("/admin/gamestate", (req, res) => {
    game.state = req.body.state.toLowerCase()
    res.status(200).send({})
})

app.listen(port, () =>
    console.log(`[INFO] Server listening on http://localhost:${port}.`)
)
