class Entity {
    /**
     * @constructor
     * @param {{ latitude: number, longitude: number }} location The location of the game entity
     */
    constructor(location) {
        this.location = location
    }

    setLocation(location) {
        this.location = location
    }
}

module.exports = Entity
