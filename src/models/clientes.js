const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {initDb} = require('../config/db');

const clientSchema = new schema({
    name: String,
    email: String,
    phone: String,
    company: String,
},
{
    versionKey: false // set to false then it wont create in mongodb
});

initDb();

const Cliente = mongoose.model('Cliente', clientSchema);

module.exports = Cliente;