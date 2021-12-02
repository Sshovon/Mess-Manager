const express = require('express')
const router = express.Router()
const roleChecker = require('../middleware/roleChecker');
const ownerChecker = require('../middleware/ownerChecker')
const auth = require('../middleware/auth');
const User = require('../models/userModel');
const Mess = require('../models/messModel')



router.post('/add', [auth, roleChecker], async (req, res) => {
    try {
        const { date, dailyList } = req.body;
        const exists = await Mess.find({ "mealList.date": date });
        if (exists.length)
            throw new Error("Date already exists")
        await Mess.updateOne({ _id: req.mess._id }, {
            $push: {
                mealList: {
                    date,
                    dailyList
                }
            }
        });
        const totalMeal=await User.doCount(dailyList);
        req.mess.totalMeal += totalMeal
        await req.mess.generateMealCost();
        res.send({result:"success"})

    } catch (e) {
        const error=e.message
        res.send({error})
    }
})



router.patch('/update',[auth,roleChecker],async (req,res)=>{
    try{
        const { date, dailyList } = req.body;
        const exists = await Mess.find({ "mealList.date": date });
        if (!exists.length)
            throw new Error("Date doesn't exists");

        const prevDailyList=exists[0].mealList.find(element => element.date===date)
        const prevTotalMeal = await User.updateDoCount(prevDailyList.dailyList);
        const newTotalMeal=await User.doCount(dailyList);
        await req.mess.updateMealList(date,dailyList,newTotalMeal-prevTotalMeal);
        await req.mess.generateMealCost();
        res.send({result:"success"})
        
    }catch(e){
        const error=e.message
        res.send({error});
    }
})




module.exports= router;