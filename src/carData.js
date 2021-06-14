const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const DB = require('../lib/db.js')

class CarData {
    static async addData(providerName, fileName) {
        const uploadDir = `${__dirname}/../uploads/${providerName}`
        try {
            await fileName.mv(`${uploadDir}/${fileName.name}`)
            this._parseFile(uploadDir, fileName.name)
        } catch (err) {
            throw err
        }
    }

    static async _parseFile(filePath, fileName) {
        fs.createReadStream(path.resolve(filePath, fileName))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', async row => {
                await DB.addData(row)
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`))
    }
}


module.exports = CarData