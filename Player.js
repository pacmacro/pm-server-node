const enums = require("./enums.js");

/**
 * Define any methods pertaining to a single player here.
 * For any methods used by only Pacman or a ghost, consider extending the Player class.
 */
class Player {
    /**
     * Constructor for adding a player.
     * Currently using minimal arguments, add them as needed.
     * @param {string} name Use a name from enums.playerNames
     */
    constructor(name) {
        this.name = name;
        this.location = {
            latitude: 0,
            longitude: 0
        };
        this.state = enums.playerStates.UNINITIALIZED;
    }

    /**
     * Validation of location should eventually be implemented.
     * @param {object} location { latitude: number, longitude: number }
     */
    setLocation(location) {
        this.location = location;
    }

    /**
     * The input is validated before being assigned.
     * @param {string} state The string must belong to enums.playerStates
     */
    setState(state) {
        if (enums.playerStates.hasOwnProperty(state)) {
            this.state = state;
        } else {
            throw `"${state}" is not a valid player state.`;
        }
    }

    /**
     * Will add validator and make it better later, for now just trying to get something 
     * @param  {...string} properties Must be valid properties. No argument will return all props
     */
    getJSON(...properties) {
        if (properties.length === 0) {
            properties = ["name", "state", "location"]
        }
        return properties.reduce((acc, cur) => {
            acc[cur] = this[cur]
            return acc
        }, {})
    }
}

module.exports = Player;
