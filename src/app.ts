import bodyParser from "body-parser"
import express from "express"
import game from "./game"
import play from "./play"
import config from "../config.json"
import { State, Entity, Property } from "./types"

const port = process.env.PORT || config.port
const app = express()

setInterval(() => play(game), config.gameplayLoopTime)

const hideProperties = (entities: Entity[], ...Properties: Property[]) =>
    entities.map((entity) => {
        // this line makes a deep copy of the entity
        const newEntity = Object.assign({}, entity)
        for (const property of Properties) {
            delete newEntity[property]
        }
        return newEntity
    })

const replaceProperties = (entities: any[], contents: {}, replacement: {}) => {
    for (const entity of entities) {
        // evaluates true if entity has matching keys and values with contents
        if (
            Object.keys(contents).reduce(
                (previous, current) =>
                    previous && entity[current] === contents[current],
                true
            )
        ) {
            for (const key of Object.keys(replacement)) {
                entity[key] = replacement[key]
            }
        }
    }
}

app.use(bodyParser.json())
app.use(express.static("public"))

/**
 * Desc: Show the GET input from the user and the HTTP request on the terminal
 * @param {any} req request from user
 * @param {any} res result from user
 * @param {any} next nextFunction
 */
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

/**
 * Desc: Show both the current locations (latitude and longitude) and current state of each player
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of both locations and states of each player
 */
app.get("/player/details", (req, res) => res.status(200).send(game.players))

/**
 * Desc: Show the current locations in latitude and longitude of each players
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of the player's locations
 */
app.get("/player/locations", (req, res) =>
    res.status(200).send(hideProperties(game.players, Property.State))
)

/**
 * Desc: Show the current state of each player (pacmans)
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of the player's states
 */
app.get("/player/states", (req, res) =>
    res.status(200).send(hideProperties(game.players, Property.Position))
)

/**
 * Desc: Show the current location of a specific player
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of a specific player's location
 */
app.get("/player/:name/location", (req, res) =>
    res.status(200).send(
        hideProperties(
            game.players.filter((player) => player.name === req.params.name),
            Property.Name,
            Property.State
        )
    )
)

/**
 * Desc: Show both the current location and state of a specific player
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of a specific player's location and state
 */
app.get("/player/:name", (req, res) =>
    res.status(200).send(
        hideProperties(
            game.players.filter((player) => player.name === req.params.name),
            Property.Name
        )
    )
)

/**
 * Desc: Show both the current location of a specific player
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of a specific player's location
 */
app.get("/player/:name/location", (req, res) =>
    res.status(200).send(
        hideProperties(
            game.players.filter((player) => player.name === req.params.name),
            Property.Name,
            Property.Position
        )
    )
)

/**
 * Desc: Show both the current locations (latitude and longitude) and current state of each player (like player/details)
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of both locations and states of each player
 */
app.get("/pacdots", (req, res) => res.status(200).send(game.players))

/**
 * Desc: Show both the current locations (latitude and longitude) of all the uneaten pacdots
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of the locations of those uneaten pacdots
 */
app.get("/pacdots/uneaten", (req, res) =>
    res.status(200).send(
        hideProperties(
            game.pacdots.filter((pacdot) => pacdot.eaten === false),
            Property.Eaten
        )
    )
)

/**
 * Desc: Show both the current locations (latitude and longitude) of all the uneaten pacdots
 * @param {any} req request from user
 * @param {any} res result from user
 * @return {entity} return the entity of the locations of those uneaten pacdots
 */
app.get("/pacdots/count", (req, res) =>
    res.status(200).send({
        total: game.pacdots.length,
        eaten: game.pacdots.filter((pacdot) => pacdot.eaten === true).length,
        uneaten: game.pacdots.filter((pacdot) => pacdot.eaten === false).length,
        uneatenPowerdots: game.pacdots.filter(
            (pacdot) => pacdot.powerdot === true && pacdot.eaten === false
        ).length,
    })
)

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
        { state: State.Uninitialized }
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

app.use((req, res) => res.status(404).send({ error: "Not found" }))

app.listen(port, () =>
    console.log(`[INFO] Server listening on http://localhost:${port}.`)
)
