const express = require('express')
const router = express.Router()
const roleChecker = require('../middleware/roleChecker');
const auth = require('../middleware/auth');
const User = require('../models/userModel');


router.get('/',[auth,roleChecker],(req,res)=>{
    try{
        res.send("manager says hi")

    }catch(e){
        res.send(e);
    }
})

router.get('/addmeal',[auth,roleChecker],(req,res)=>{
    try{
        res.send('meal add page');
    }catch(e){

    }
})


router.post('/addmeal',[auth,roleChecker],async (req,res)=>{
    try{
        const user = req.user[0];
        user.lunchList = user.lunchList.concat({
            date: new Date(Date.now()).toUTCString(),
            meal: true
        })
        await user.save();
        const today = user.lunchList[user.lunchList.length-1].date
        res.send({today})

    }catch(e){
        res.send("failed")

    }
})








module.exports = router;