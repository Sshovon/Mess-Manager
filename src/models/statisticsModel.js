const mongoose = require('mongoose')
const validator = require('validator')


const statisticsSchema = new mongoose.Schema({
    messID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    overView: {
        mealCost: Number,
        totalMeal: Number,
        totalExpense: Number,
        startDate: String,
        endDate: String
    }

})

const statistics = mongoose.model('statisticsList', statisticsSchema);
module.exports = statistics;
