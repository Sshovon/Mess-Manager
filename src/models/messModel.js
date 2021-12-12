const mongoose = require('mongoose')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')


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
    mealCost: {
        type: Number,
        default: 0
    },
    schedules: [
        {
            holderName: {
                type: String,
            },
            schedule: {
                type: String,
                default: ""
            },
            ownerID: mongoose.Types.ObjectId
        }
    ],
    members: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    expenses: [
        {
            expense: {
                type: Number,
                required: true,
            },
            description: String,
            spender: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
            date: {
                type: String,
                default: new Date().toLocaleDateString()
            },
            name: String,

        }
    ],
    mealList: [
        {
            date: {
                type: String,
                required: true,
            },
            dailyList: [
                {
                    name: String,
                    breakfast: Number,
                    lunch: Number,
                    dinner: Number,
                    ownerID: mongoose.Types.ObjectId
                }

            ]
        }
    ],
    bulletinBoard: [
        {
            itemName: String,
            itemQuantity: String,
            addedBy: String,
            addedByID:mongoose.Types.ObjectId,
            addedTime: {
                type: String,
                default: new Date().toLocaleString()
            },
            done: {
                type: Boolean,
                default: false
            }

        }
    ],
    messages:[
        {
            message:String,
            time:new Date().toLocaleString(),
            ownerID:mongoose.Types.ObjectId
        }
    ]


})

/// pluging////
//messListSchema.plugin(uniqueValidator);


/// Instance Methods ////
messListSchema.methods.updateExpense = async function () {
    const mess = this;
    let messTotalExpense = 0;
    const messExpenses = mess.expenses;

    for (let i = 0; i < messExpenses.length; i++) {
        messTotalExpense += messExpenses[i].expense;
    }
    mess.totalExpense = messTotalExpense;
    await mess.save()

}

messListSchema.methods.updateMealList = async function (date, dailyList, newMealCount) {
    const mess = this;
    mess.totalMeal += newMealCount;
    mess.mealList = mess.mealList.filter(element => element.date != date);
    mess.mealList = mess.mealList.concat({ date, dailyList });
    await mess.save();

}


messListSchema.methods.generateMealCost = async function () {
    const mess = this;
    mess.mealCost = (mess.totalExpense / mess.totalMeal);
    await mess.save();
}

messListSchema.methods.endMonthForMess = async function () {
    const mess = this;
    mess.totalExpense = 0;
    mess.totalMeal = 0;
    mess.mealCost = 0;
    mess.schedules = []
    mess.expenses = [];
    mess.mealList = [];
    //mess.bulletinBoard = [];
    await mess.save();

}

messListSchema.methods.generateDateList=async function(){
    const mess= this;
    let dates=[];
    for(let element of mess.mealList){
        dates.push(element.date)
      
    } 

    dates.sort(function(a,b){
        return new Date(a)-new Date(b)
    }) 
    return dates;
}   

//// statics methods 

const messList = mongoose.model('MessList', messListSchema)

module.exports = messList