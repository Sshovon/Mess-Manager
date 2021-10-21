const express=  require('express');
const router = express.Router();
const User= require('../models/userModel')


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
        res.status(200).send("success");

    }catch(e){
        res.status(400).send(e);
    }
    
})
module.exports = router;

