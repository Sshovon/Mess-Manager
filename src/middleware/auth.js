const jwt = require("jsonwebtoken")
const User =  require('../models/userModel');

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token,process.env.JWT);
        const user = await User.find({_id:decoded._id , "tokens.token" : token })
        if(!user) throw new Error();
        req.user = user;
        next()

    }catch(e){
        res.status(400).send({error : "Please Authenticate"});
    }
}

module.exports = auth