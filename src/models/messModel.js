const mongoose = require('mongoose')
const validator = require('validator')

const messListSchema = new mongoose.Schema({
    messID: {
        type: String,
        required: true,
    },
    TotalExpanse: {
        type: Number,
        default: 0,
    },
    TotalMeal: {
        type: Number,
        default: 0,
    },



})

const messList = mongoose.model('MessList', messListSchema)

module.exports = messList;