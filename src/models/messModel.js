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

/// Instance Methods ////
messListSchema.methods.updateExpense= async function(){
    const mess= this;
    //const messObject=mess.toObject();
    let messTotalExpense=0;
    const messExpenses=mess.expenses;
    
    for(let i=0;i<messExpenses.length;i++){
        messTotalExpense+=messExpenses[i].expense;
    }
    mess.totalExpense=messTotalExpense;
    await mess.save()

}

const messList = mongoose.model('MessList', messListSchema)

module.exports = messList;