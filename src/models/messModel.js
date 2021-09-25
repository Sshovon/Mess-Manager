const mongoose = require('mongoose')
const validator = require('validator')

const messListSchema = new mongoose.Schema({

})

const messList = mongoose.model('MessList', messListSchema)

module.exports = messList;