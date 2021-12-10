const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')


router.post('/', auth, async (req, res) => {
    const allUser = await Mess.find({ _id: req.mess._id }).populate('members')
    const users = allUser[0].members.filter(() => true);
    let positiveBalance = [];
    let negativeBalance = [];
    

    users.forEach((element) => {
        const user = { 
            name: element.name,
            userID:element._id
         };
        if ((element.expense - (element.totalMeal * req.mess.mealCost)) >= 0) {
            user.balance = element.expense - (element.totalMeal * req.mess.mealCost)
            console.log({
                expense: element.expense,
                totalMeal: element.totalMeal,
                mealCost: req.mess.mealCost,
                balance: user.balance
            })
            positiveBalance = positiveBalance.concat(user)

        } else {

            user.balance = element.expense - (element.totalMeal * req.mess.mealCost)
            console.log({
                expense: element.expense,
                totalMeal: element.totalMeal,
                mealCost: req.mess.mealCost,
                balance: user.balance
            })
             negativeBalance = negativeBalance.concat(user)
        }
    })
    let settleObject=[]
    positiveBalance.sort((a, b) => b.balance - a.balance);
    negativeBalance.sort((a, b) => a.balance - b.balance);
    while (negativeBalance.length) {
        const individualSettle={}; 
        if (negativeBalance[0].balance * (-1) <= positiveBalance[0].balance) {
            console.log(`${negativeBalance[0].name} should give ${negativeBalance[0].balance * -1} to ${positiveBalance[0].name}`) 
            individualSettle.moneyTo=positiveBalance[0].name;
            individualSettle.moneyToID=positiveBalance[0].userID;
            individualSettle.moneyFrom=negativeBalance[0].name;
            individualSettle.moneyFromID=negativeBalance[0].userID;
            individualSettle.amount=negativeBalance[0].balance*-1;
            settleObject.push(individualSettle);
            const u1 = negativeBalance.shift();
            const u2 = positiveBalance.shift();
                
            u2.balance = u2.balance + u1.balance;
            positiveBalance.push(u2);
            positiveBalance.sort((a, b) => b.balance - a.balance);
        } else {
            console.log(`${negativeBalance[0].name} should give ${positiveBalance[0].balance} to ${positiveBalance[0].name}`)
            
            individualSettle.moneyTo=positiveBalance[0].name;
            individualSettle.moneyToID=positiveBalance[0].userID;
            individualSettle.moneyFrom=negativeBalance[0].name;
            individualSettle.moneyFromID=negativeBalance[0].userID;
            individualSettle.amount=positiveBalance[0].balance;
            settleObject.push(individualSettle);
            
            const u1 = negativeBalance.shift();
            const u2 = positiveBalance.shift();            

            u1.balance = u1.balance + u2.balance;
            negativeBalance.push(u1);
            negativeBalance.sort((a, b) => a.balance - b.balance);
        }
    }
    console.log(settleObject)
    res.send(settleObject)
})

module.exports = router;