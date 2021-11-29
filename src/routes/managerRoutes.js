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
        const user = req.user;
        
    }catch(e){
        res.send("failed")

    }
})

router.get('/addexpense',async(req,res)=>{
    try{
        res.send('render addexpense page')

    }catch(e){

    }
})
 router.post('/addexpense',auth,async(req,res)=>{
    try{
        //console.log(req.mess)
        const {expense,description} = req.body;
        const spender = req.user._id;
        const newExpense=req.mess.totalExpense+expense;

        await Mess.updateOne({_id:req.mess._id},{
            $push:{
                expenses:{
                    expense,description,spender
                }
            }
        })
        await Mess.updateOne({_id:req.mess._id},{totalExpense:newExpense});
        await User.updateOne({_id:req.user._id},{expense: req.user.expense+expense});
        await User.updateOne({_id:req.user._id},{
            $push:{
                expenses:{
                    expense,description
                }
            }
        })
        res.send("success");

    }catch(e){
        res.send("error")
    }
})


module.exports = router;