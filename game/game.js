const Player = require("./player")
const Pacdot = require("./pacdot")
const enums = require("../enums")

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
        this.players = Object.values(enums.player.names).map(
            name => new Player(name)
        )

        /**
         * @type {Pacdot[]}
         */
        this.pacdots = enums.pacdot.locations.map(
            location => new Pacdot(location)
        )
    }
}

module.exports = Game
