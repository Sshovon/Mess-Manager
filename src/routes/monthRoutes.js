const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const Statistics = require('../models/statisticsModel');
const roleChecker = require('../middleware/roleChecker')


router.post('/end', [auth,roleChecker], async (req, res) => {
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

router.post('/generate-stats', auth, async(req, res) => {
    try {
        const stats= await Statistics.find({messID: req.mess._id});
        res.send(stats);
    } catch (e) {   
        error=e.message;
        res.send({error});
    }
})

router.post('/settle-expense', auth, async (req, res) => {
    try {
        const allUser = await Mess.find({ _id: req.mess._id }).populate('members')
        const users = allUser[0].members.filter(() => true);
        let positiveBalance = [];
        let negativeBalance = [];

        users.forEach((element) => {
            const user = {
                name: element.name,
                userID: element._id
            };
            user.balance = element.expense - (element.totalMeal * req.mess.mealCost)

            if (user.balance >= 0) {
                positiveBalance = positiveBalance.concat(user)

            } else {
                negativeBalance = negativeBalance.concat(user)
            }
        })
        let settleObject = []
        positiveBalance.sort((a, b) => b.balance - a.balance);
        negativeBalance.sort((a, b) => a.balance - b.balance);
        while (negativeBalance.length && positiveBalance.length) {
            const individualSettle = {};
            if (negativeBalance[0].balance * (-1) <= positiveBalance[0].balance) {
                //console.log(`${negativeBalance[0].name} should give ${negativeBalance[0].balance * -1} to ${positiveBalance[0].name}`) 

                individualSettle.moneyTo = positiveBalance[0].name;
                individualSettle.moneyToID = positiveBalance[0].userID;
                individualSettle.moneyFrom = negativeBalance[0].name;
                individualSettle.moneyFromID = negativeBalance[0].userID;
                individualSettle.amount = negativeBalance[0].balance * -1;
                settleObject.push(individualSettle);
                const u1 = negativeBalance.shift();
                const u2 = positiveBalance.shift();

                u2.balance = u2.balance + u1.balance;
                positiveBalance.push(u2);
                positiveBalance.sort((a, b) => b.balance - a.balance);
            } else {
                //console.log(`${negativeBalance[0].name} should give ${positiveBalance[0].balance} to ${positiveBalance[0].name}`)
                individualSettle.moneyTo = positiveBalance[0].name;
                individualSettle.moneyToID = positiveBalance[0].userID;
                individualSettle.moneyFrom = negativeBalance[0].name;
                individualSettle.moneyFromID = negativeBalance[0].userID;
                individualSettle.amount = positiveBalance[0].balance;
                settleObject.push(individualSettle);
                //console.log(settleObject);
                const u1 = negativeBalance.shift();
                const u2 = positiveBalance.shift();

                u1.balance = u1.balance + u2.balance;
                negativeBalance.push(u1);
                negativeBalance.sort((a, b) => a.balance - b.balance);
            }

        }
        console.log(settleObject)
        res.send(settleObject)
    } catch (e) {
        const error = e.message;
        res.send({ error })
    }
})

module.exports = router;
