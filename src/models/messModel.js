const mongoose = require('mongoose')
const validator = require('validator')

const messListSchema = new mongoose.Schema({
    messName: {
        type: String,
        required: true
    },
    totalExpense: {
        type: Number,
        default: 0,
    },
    totalMeal: {
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
    ],
    expenses:[
        {
            expense:{
                type:Number,
                required: true,
            },
            description: String,
            spender:{
                type: mongoose.Types.ObjectId,
                required: true,
            },
            date: {
                type: String,
                default: new Date().toLocaleDateString()
            }
            
        }
    ]


})

const messList = mongoose.model('MessList', messListSchema)

module.exports = messList;