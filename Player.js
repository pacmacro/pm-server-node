const enums = require("./enums.js");

/**
 * Define any methods pertaining to a single player here.
 * For any methods used by only Pacman or a ghost, consider extending the Player class
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
            lat: 0,
            lon: 0
        };
        this.state = enums.playerStates.UNINITIALIZED;
    }

    /**
     * The get and set methods are the same as the defaults and are redundant.
     * I just decided to include them for future use. They can be deleted if not used.
     * Basically, it just returns the location object from calling player.location.
     */
    get location() {
        return this.location;
    }

    /**
     * This setter could be used to validate the location when the location object is assigned.
     * I dont think it is worth implementing yet.
     * @param {object} location { lat: number, lon: number }
     */
    set location(location) {
        this.location = location;
    }

    /**
     * Default getter.
     */
    get state() {
        return this.state;
    }

    /**
     * When reassigning player.state, the input is validated before being assigned.
     * @param {string} state The string must belong to enums.playerStates
     */
    set state(state) {
        if (enums.playerStates.hasOwnProperty(state)) {
            this.state = state;
        } else {
            throw `"${state}" is not a valid player state.`;
        }
    }
}

module.exports = Player;
