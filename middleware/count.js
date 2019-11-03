/**
 * class for counting data. It counts pacdots for now.
 * @class
 */
class Count {
    /**
     * 
     * @param {*} entities 
     */
    constructor(entities) {
        this.entities = entities
        this.counts = {}
        this.handler = (req, res) => res.status(200).send(this.counts)
    }

    // Desc: It will count another type of data within a data
    addCount(name, counter) {
        this.counts[name] = this.entities.reduce((total, entity) => {
            if (counter(entity)) return total + 1
            return total
        }, 0)
        return this
    }
}

module.exports = Count
