/**
 * Very basic Pacdot class. Please add methods and variables as needed.
 */
class Pacdot {
    /**
     * @param {Object} location { latitude: number, longitude: number }
     */
    constructor(location) {
        this.location = location;
    }

    /**
     * Location validation should be implemented eventually.
     * @param {object} location { latitude: number, longitude: number }
     */
    setLocation(location) {
        this.location = location;
    }
}

module.exports = Pacdot;