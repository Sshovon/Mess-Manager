const express = require('express')
const router = express.Router()
const roleChecker = require('../middleware/roleChecker');
const ownerChecker = require('../middleware/ownerChecker')
const auth = require('../middleware/auth');
const User = require('../models/userModel');
const Mess = require('../models/messModel')



router.post('/swap',[auth,roleChecker],async(req,res)=>{
    try{
        const newManagerID=req.body.newManagerID;
        const newManager=await User.findOne({_id:newManagerID});
        
        newManager.role='manager';
        await newManager.save();
        req.user.role="member";
        await req.user.save();

        res.send({
            result:"success"
        })
        

    }catch(e){
        const error=e.message;
        res.send({error});
    }
})




// for deleting u have to adjust mess member array also
// router.delete('/removemember/:id',[auth,roleChecker],async(req,res)=>{
//     try{
//         const delUser=await User.findOneAndRemove({_id:req.params.id});
//         res.send("success")
//     }catch(e){
//         res.send("failure");
//     }
// })


module.exports = router;