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
 
router.patch('/updateexpense/:id',auth, async(req,res)=>{
    // const [r1]=await User.find({"expenses._id":req.params.id})
    // const [r2]=await Mess.find({"expenses._id":req.params.id})
    
    res.send({r1,r2})

})


module.exports = router