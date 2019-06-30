/**
 * A class for querying data. It basically it basically starts with all info about entities then then filters out fields
 * @class
 */
class Query {
    /**
     *
     * @param {{ latitude: number, longitude: number }} entities
     */
    constructor(entities) {
        this.entities = entities.map(entity => entity.properties)
        this.error = undefined
        this.handler = (req, res) => res.status(200).send(this.entities)
    }

    contains(property, value) {
        this.entities = this.entities.filter(
            entity => entity[property] === value
        )
        return this
    }

    hide(...properties) {
        properties.forEach(property => {
            this.entities = this.entities.map(entity => {
                const newEntity = Object.assign({}, entity)
                delete newEntity[property]
                return newEntity
            })
        })
        return this
    }
}

module.exports = Query