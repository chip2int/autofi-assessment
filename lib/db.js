const Database = require('better-sqlite3')
const config = require('../config/config.js')

const _ = require('lodash')

class DB {
    static initialize() {
        this._db = new Database(':memory', { verbose: console.log })
        this._db.prepare("DROP TABLE IF EXISTS CarData").run()
        const createTableStament = `CREATE TABLE IF NOT EXISTS CarData (${this._loadConfig()})`
        this._db.prepare(createTableStament).run()
    }

    static _loadConfig() {
        return _.map(config, (v, k) => `${k} ${v}`).join(', ')
    }

    static async addData(data) {
        const obj = this._lowerCase(data)
        const configArray = Object.keys(config)
        const row = _.reduce(obj, (result, value, key) => {
            if (config[key]) {
                result[key] = value
            }
            return result
        }, {})
        const rowKeys = Object.keys(row)
        const rowValues = Object.values(row)

        const insertRowStatement = `INSERT INTO CarData (${rowKeys.join(', ')}) VALUES (${_.trimEnd(_.repeat('?, ', rowKeys.length), ', ')})`
        this._db.prepare(insertRowStatement).run(...rowValues)
    }

    static getData() {
        const fetch = this._db.prepare('SELECT * FROM CarData').all()
        return fetch
    }

    static _lowerCase(o) {
        const obj = {}
        Object.entries(o).forEach(([k, v]) => obj[k.toLowerCase()] = v)
        return obj
    }
}


module.exports = DB