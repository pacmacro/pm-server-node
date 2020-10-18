import config from "../config.json"
import {Game, Entity, Player, Pacdot, State} from "./types"

const getDistanceBetween = (entity1: Entity, entity2: Entity) => {
    // radius of the earth in kilometers
    const radius = 6371

    // convert from degrees to radians
    const latitude1 = (entity1.position.latitude / 180) * Math.PI
    const latitude2 = (entity2.position.latitude / 180) * Math.PI
    const longitude1 = (entity1.position.longitude / 180) * Math.PI
    const longitude2 = (entity2.position.longitude / 180) * Math.PI

    // https://en.wikipedia.org/wiki/Geographical_distance#Flat-surface_formulae
    const x = (longitude2 - longitude1) * Math.cos((latitude1 + latitude2) / 2)
    const y = latitude2 - latitude1
    const distance = Math.sqrt(x * x + y * y) * radius

    // returns integer in meters
    return Math.floor(distance * 1000)
}

const isNear = (entity1: Entity, entity2: Entity) =>
    getDistanceBetween(entity1, entity2) <= config.eatDistance

const eatPacdots = (pacman: Player, pacdots: Pacdot[]) => {
    pacdots.forEach(pacdot => {
        if (isNear(pacman, pacdot) && !pacdot.eaten) {
            console.log("🍴 nom! nom! 🍴")
            pacdot.eaten = true

            if (pacdot.powerdot) {
                pacman.state = State.Powerup
                setTimeout(
                    () => (pacman.state = State.Active),
                    config.powerupTime
                )
            }
        }
    })
}

const pacmanHasWon =(pacdots: Pacdot[]) =>
    pacdots.reduce((previous, current) => previous && current.eaten, true)

// The play function is called on an interval that gan be found in config.json
// note: please have this function be the only one that takes game as an arguement
const play =  (game: Game) => {
    if (game.state === State.InProgress) {
        eatPacdots(game.players[0], game.pacdots)

        if (pacmanHasWon(game.pacdots)) {
            game.state =State.PacmanWin
        }
    }
}

export default play
