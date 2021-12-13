const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const Statistics = require('../models/statisticsModel');
const { route } = require('./membersRoutes')
const roleChecker = require('../middleware/roleChecker')


router.post('/', [auth,roleChecker], async (req, res) => {
    try {
        const overView = {}
        overView.mealCost = req.mess.mealCost;
        overView.totalMeal = req.mess.totalMeal;
        overView.totalExpense = req.mess.totalExpense;
        const dates=await req.mess.generateDateList();
        overView.startDate=dates[0];
        overView.endDate=dates[dates.length-1];
        await req.mess.endMonthForMess();
        await User.endMonthForMembers(req.mess._id);
        
        const stat=new Statistics({
            messID:req.mess._id,
            overView,

        })
        await stat.save();        
        res.send(
            overView
        )

    } catch (e) {
        error = e.message;
        res.send({ error });

    }
})


module.exports = router;