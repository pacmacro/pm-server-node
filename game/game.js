const Player = require("./player")
const Pacdot = require("./pacdot")
const { burnaby } = require("../pacdotLocations")
const { STATE, NAME } = require("../enums")

const states = STATE
const names = NAME

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
        this.players = Object.values(names).map(name => new Player(name))

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
        if (states.hasOwnProperty(state.toUpperCase())) {
            this.state = state
        } else {
            console.log(`"${state}" is not a valid state.`)
        }
    }

    loop() {
        if (this.state === STATE.IN_PROGRESS) {
            console.log("looping!")
            let pacmanHasWon = true
            this.pacdots.forEach(pacdot => {
                pacmanHasWon = false
                if (this.pacman.isNear(pacdot) && pacdot.eaten === false) {
                    pacdot.eat()
                    console.log("nom! nom!")
                    if (pacdot.powerdot) {
                        this.pacman.state = STATE.POWERUP
                        setTimeout(() => (this.pacman.state = STATE.ACTIVE), 60 * 1000)
                    }
                }
            })
            if (pacmanHasWon) {
                this.setState(STATE.FINISHED_PACMAN_WIN)
            }
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
