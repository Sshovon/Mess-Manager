const express=  require('express');
const router = express.Router();

const Mess=require('../models/messModel');
const User=require('../models/userModel');

router.post('/',async(req,res)=>{    
    try{
        const user= await User.verifyCredentials(req.body.email,req.body.password);
        if(!user) throw new Error("Invalid credentials")
        const token = await user.generateAuthToken();
        res.cookie('token', token);
        res.send(user);
    }catch(e){
        const error=e.message;
        res.status(400).send({error})
    }

})

module.exports = router;