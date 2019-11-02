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
        for (let i = 0; i < this.entities.length; i += 1) {
            this.entities[i][property] = value
        }
        return this
    }
}

module.exports = Update
