const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const { route } = require('./membersRoutes')


router.post('/', auth, async (req, res) => {
    try {
        const overView = {}
        overView.mealCost = req.mess.mealCost;
        overView.totalMeal = req.mess.totalMeal;
        overView.totalExpense = req.mess.totalExpense;

        await req.mess.endMonthForMess();
        await User.endMonthForMembers(req.mess._id);

        res.send({
            overView
        })

    } catch (e) {
        error = e.message;
        res.send({ error });

    }
})


module.exports = router;