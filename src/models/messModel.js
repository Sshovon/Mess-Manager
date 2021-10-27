const mongoose = require('mongoose')
const validator = require('validator')

const messListSchema = new mongoose.Schema({
    messName: String,

    TotalExpanse: {
        type: Number,
        default: 0,
    },
    TotalMeal: {
        type: Number,
        default: 0,
    },
    schedules:[{
        name:{
            type:String,
        },
        schedule:{
            type: Date,
        }

        }
    ],
    members:[
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]


})

const messList = mongoose.model('MessList', messListSchema)

module.exports = messList;