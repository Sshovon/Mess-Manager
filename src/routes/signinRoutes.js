const express=  require('express');
const router = express.Router();

const Mess=require('../models/messModel');
const User=require('../models/userModel');

router.get('/',(req,res)=>{
    res.send("signin page")
})


router.post('/',async(req,res)=>{
    
    try{
        const user= await User.verifyCredentials(req.body.email,req.body.password);
        res.send(user);
    }catch(e){
        res.send(e)
    }

})




module.exports = router;