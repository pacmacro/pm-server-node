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
     * 
     * @param {object} location { latitude: number, longitude: number }
     */
    setLocation(location) {
        // if the location is valid:
        // float, not null, long(-180, 180), lat (-90, 90)
        const checkLatitude = location.latitude;
        const checkLongitude = location.longitude;

        if (typeof checkLatitude == "number" && typeof checkLongitude == "number")
            this.location = location;
        else
            throw `"${location}" is not a valid location.`;
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
}

module.exports = Player;