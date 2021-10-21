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
            email: {
                type: String,
                trim: true,
                unique: true,
                lowercase: true,
        
                validate(value){
                    if(!validator.isEmail(value)){
                        throw new Error ("Email is not an valid one!!!");
                    }
                }
            }

        }
    ]


})

const messList = mongoose.model('MessList', messListSchema)

module.exports = messList;