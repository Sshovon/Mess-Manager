const express=  require('express')
const router= express.Router()
const auth = require('../middleware/auth')
const User= require('../models/userModel')
const Mess = require('../models/messModel')



router.post('/showall',async (req,res)=>{
    try{
        const messID = req.body.messID;
        const users= await Mess.find({_id: messID}).populate('members')
        res.status(200).json({
            users,
            message:"success"
        })
        
    }catch(e){
        res.status(400).json({
            message:"error"
        })
        
    }
})





module.exports = router