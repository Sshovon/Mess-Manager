const express=  require('express');
const router = express.Router();
const User= require('../models/userModel')
const Mess=require('../models/messModel')


router.get('/',(req,res)=>{
    res.send("signup page");
})

router.post('/',async(req,res)=>{
    try{
        const name = req.body.name;
        const email= req.body.email;
        const mobile= req.body.mobile;
        const password= req.body.password;
        const messID = req.body.messID;
        const role = req.body.role;

        const user = new User({
            name,email,mobile,password,messID,role
        })
        await user.save();
        await Mess.updateOne({_id: user.messID},{
            $push:{
                members: user._id
            }
        })
        res.status(200).send(user);

    }catch(e){
        res.status(400).send(e);
    }
    
})
module.exports = router;

