const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express()
const CarData = require('./src/carData.js')
const DB = require('./lib/db.js')

app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/data', function(req, res) {
    try {
        const data = DB.getData()
        res.status(200).send({
            data
        })
    } catch (err) {
        res.status(500).send(e)
    }
})

app.post('/providers/:provider', async function(req, res) {
    if (!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        })
    } else {
        const fileName = req.files.fileName
        const providerName = req.params.provider
        try {
            await CarData.addData(providerName, fileName)
            res.status(200).send({
                status: true,
                message: 'File successfully uploaded'
            })
        } catch (e) {
            res.status(500).send(e)
        }
    }
})
DB.initialize()
app.listen(3000)