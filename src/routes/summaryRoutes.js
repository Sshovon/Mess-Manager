const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')

router.post('/short',auth,async(req,res)=>{
    try{
        res.send({
            messName:req.mess.messName,
            mealCost:req.mess.mealCost,
            totalExpense:req.mess.totalExpense
        })
    }catch(e){
        const error=e.message;
        res.send({error})
    }
})

router.post('/meal',auth,async(req,res)=>{
    try{
        const messID = req.mess._id;
        const [users] = await Mess.find({ _id: messID }).populate('members')
        let membersRefinedDetails=[];
        
        users.members.forEach(element => {
            const member={};
            member.name=element.name,
            member.totalMeal=element.totalMeal
            membersRefinedDetails=membersRefinedDetails.concat(member);

        }); 
        res.status(200).json({
            totalMeal:users.totalMeal,
            membersRefinedDetails
        });
        
    }catch(e){
        const error=e.message;
        res.send({error})
    }
})

router.post('/balance',auth,async(req,res)=>{
    try{
        const messID = req.mess._id;
        const [users] = await Mess.find({ _id: messID }).populate('members')
        let membersRefinedDetails=[];
        
        users.members.forEach(element => {
            const member={};
            member.name=element.name,
            member.paid=element.expense,
            member.charged=(element.totalMeal*users.mealCost),
            member.balance=(member.paid-member.charged)
            membersRefinedDetails=membersRefinedDetails.concat(member);

        });
        res.status(200).json({
            membersRefinedDetails
        });
        
    }catch(e){
        const error=e.message;
        res.send({error})
    }
})


router.post('/howtosettle',auth,async(req,res)=>{
    
})


module.exports = router;