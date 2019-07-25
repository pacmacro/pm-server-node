class Update {
    constructor(entities) {
        this.entities = entities
        this.handler = (req, res) => res.status(200).send({})
    }

    contains(property, value) {
        this.entities = this.entities.filter(
            entity => entity[property] === value
        )
        return this
    }

    replace(property, value) {
        this.entities = this.entities.map(entity =>
            Object.defineProperty(entity, property, { writable: true, value })
        )
        return this
    }
}

module.exports = Update
