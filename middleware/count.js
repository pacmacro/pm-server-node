class Count {
    constructor(entities) {
        this.entities = entities
        this.counts = {}
        this.handler = (req, res) => res.status(200).send(this.counts)
    }

    addCount(name, counter) {
        this.counts[name] = this.entities.reduce((total, entity) => {
            if (counter(entity)) return total + 1
            return total
        }, 0)
        return this
    }
}

module.exports = Count
