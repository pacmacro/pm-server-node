const { eatDistance } = require("../config")

class Entity {
    /**
     * @constructor
     * @param {{ latitude: number, longitude: number }} location The location of the game entity
     */
    constructor(location) {
        this.location = location
    }

    isNear(entity) {
        const distance = Math.max(
            Math.abs(this.location.latitude - entity.location.latitude),
            Math.abs(this.location.longitude - entity.location.longitude)
        )
        if (distance < eatDistance) return true
        return false
    }
}

module.exports = Entity
