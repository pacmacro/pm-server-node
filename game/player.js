const { STATE } = require("../enums.js")
const Entity = require("./entity")

/**
 * Define any methods pertaining to a single player here.
 * For any methods used by only Pacman or a ghost, consider extending the Player class.
 */
class Player extends Entity {
    /**
     * Constructor for adding a player.
     * Currently using minimal arguments, add them as needed.
     * @param {string} name Use a name from enums.playerNames
     */
    constructor(name) {
        super({
            latitude: 0,
            longitude: 0
        })
        this.name = name
        this.state = STATE.UNINITIALIZED
    }

    get properties() {
        return {
            name: this.name,
            location: this.location,
            state: this.state
        }
    }
}

module.exports = Player
