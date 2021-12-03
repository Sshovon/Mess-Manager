const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const roleChecker = require('../middleware/roleChecker')
const { find } = require('../models/userModel')

router.post('/create',[auth,roleChecker],async(req,res)=>{
    try{
        const {schedule}=req.body;
        req.mess.schedules = req.mess.schedules.concat({
            schedule
        });
        await req.mess.save();
        res.send({result:"success"});

    }catch(e){
        const error=e.message;
        res.send({error})
    }
})

router.post('/get',auth,async(req,res)=>{
    try{
        const {schedule}=req.body;
        console.log(schedule)
        const index=req.mess.schedules.find(element=> schedule===element.schedule);
        index.holder=req.user.name
        index.ownerID=req.user._id
        await req.mess.save()
        res.send(req.mess);

    }catch(e){

        const error=e.message;
        res.send({error})
    }
})




module.exports = router;