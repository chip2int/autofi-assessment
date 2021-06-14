const { intersection } = require("lodash");

module.exports = {
    'uuid': 'varchar(255)',
    'vin': 'varchar(17)',
    'make': 'varchar (10)',
    'model': 'varchar (10)',
    'mileage': 'int(15)',
    'year': 'tinyint(4)',
    'zipcode': 'varchar(15)',
    'createdate': 'date',
    'updatedate': 'date'
}