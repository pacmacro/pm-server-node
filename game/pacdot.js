const Entity = require("./entity")

/**
 * @class
 * Very basic Pacdot class. Please add methods and variables as needed.
 */
class Pacdot extends Entity {
    /**
     * @constructor
     * @param {{ latitude: number, longitude: number }} location
     * @param {boolean} [isPowerdot=false]
     */
    constructor(location, isPowerdot = false) {
        super(location)
        this.eaten = false
        this.powerdot = isPowerdot
    }

    /**
     * Location validation should be implemented eventually.
     * @param {{ latitude: number, longitude: number }} location
     */
    setLocation(location) {
        this.location = location
    }

    /**
     * @returns {object}
     */
    get properties() {
        return {
            location: this.location,
            eaten: this.eaten,
            powerdot: this.powerdot
        }
    }
}

module.exports = Pacdot
