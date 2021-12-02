const express = require('express')
const router = express.Router()
const roleChecker = require('../middleware/roleChecker');
const ownerChecker = require('../middleware/ownerChecker')
const auth = require('../middleware/auth');
const User = require('../models/userModel');
const Mess = require('../models/messModel')








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