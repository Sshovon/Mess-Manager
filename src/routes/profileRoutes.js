const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const Statistics = require('../models/statisticsModel')

router.get('/show', auth, async(req, res) => {
    try {
        
        const profile={};
        profile.totalMeal=req.user.totalMeal;
        profile.totalExpense=req.user.totalExpense;
        //profile.image=req.user.image;
        profile.expenses=req.user.expenses;

        let myMeal=[];
        for(let meal of req.mess.mealList){
            const {date,dailyList}= meal;
            const myDailyList=dailyList.filter((daily)=>daily.ownerID.toString()==req.user._id);
            myMeal.push({date,myDailyList})
        }

        profile.myMeal=myMeal;
        res.send(profile);
       
    } catch (e) {   
        error=e.message;
        res.send({error});
    }
})

module.exports = router;