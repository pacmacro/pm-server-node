const Player = require("./player")
const Pacdot = require("./pacdot")
const { STATE, NAME } = require("../enums")
const { burnaby } = require("../pacdotLocations")

/**
 * @class
 */
class Game {
    /**
     * currently no argument for the constructor, please add one when needed
     * @constructor
     */
    constructor() {
        /**
         * @type {Player[]}
         */
        this.players = Object.values(NAME).map(name => new Player(name))

        /**
         * @type {Pacdot[]}
         */
        this.pacdots = burnaby.map(pacdot => new Pacdot(pacdot.location, pacdot.powerdot))

        this.state = STATE.INITIALIZING

        this.pacman = this.players.filter(player => player.name === NAME.PACMAN)[0]
    }

    /**
     * The input is validated before being assigned.
     * @param {string} state The string must belong to enums.STATE
     */
    setState(state) {
        if (STATE.hasOwnProperty(state.toUpperCase())) {
            this.state = state
        } else {
            console.log(`"${state}" is not a valid state.`)
        }
    }

    loop() {
        if (this.state === STATE.IN_PROGRESS) {
            console.log("looping!")
            this.pacdots.forEach(pacdot => {
                if (this.pacman.isNear(pacdot) && pacdot.eaten === false) {
                    pacdot.eat()
                    console.log("nom! nom!")
                }
            })
        }
    }

    startLoop(timing) {
        setInterval(this.loop.bind(this), timing)
    }

    stopLoop() {
        clearInterval(this.loop.bind(this))
    }
}

module.exports = Game
