import config from "../config.json"

const getDistanceBetween = (entity1: entity, entity2: entity) => {
    // radius of the earth in kilometers
    const radius = 6371

    // convert from degrees to radians
    const latitude1 = (entity1.location.latitude / 180) * Math.PI
    const latitude2 = (entity2.location.latitude / 180) * Math.PI
    const longitude1 = (entity1.location.longitude / 180) * Math.PI
    const longitude2 = (entity2.location.longitude / 180) * Math.PI

    // https://en.wikipedia.org/wiki/Geographical_distance#Flat-surface_formulae
    const x = (longitude2 - longitude1) * Math.cos((latitude1 + latitude2) / 2)
    const y = latitude2 - latitude1
    const distance = Math.sqrt(x * x + y * y) * radius

    // returns integer in meters
    return Math.floor(distance * 1000)
}

const isNear = (entity1: entity, entity2: entity) =>
    getDistanceBetween(entity1, entity2) <= config.eatDistance

const eatPacdots = (pacman: player, pacdots: pacdot[]) => {
    pacdots.forEach(pacdot => {
        if (isNear(pacman, pacdot) && !pacdot.eaten) {
            console.log("🍴 nom! nom! 🍴")
            pacdot.eaten = true

            if (pacdot.powerdot) {
                pacman.state = STATE.POWERUP
                setTimeout(
                    () => (pacman.state = STATE.ACTIVE),
                    config.powerupTime
                )
            }
        }
    })
}

const pacmanHasWon = (pacdots: pacdot[]) =>
    pacdots.reduce((previous, current) => previous && current.eaten, true)

// The play function is called on an interval that gan be found in config.json
// note: please have this function be the only one that takes game as an arguement
const play = (game: game) => {
    if (this.state === STATE.IN_PROGRESS) {
        eatPacdots(game.players[0], game.pacdots)

        if (pacmanHasWon(game.pacdots)) {
            game.state = STATE.FINISHED_PACMAN_WIN
        }
    }
}

export default play
