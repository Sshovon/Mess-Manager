const jwt = require("jsonwebtoken")
const User =  require('../models/userModel');
const Mess = require('../models/messModel')

const auth = async (req,res,next)=>{
    try{
        let token = req.body.token || req.cookies.token;
        if(req.headers.token)
            token=req.headers.token;
        const decoded = jwt.verify(token,process.env.JWT);
        const user = await User.find({_id:decoded._id , "tokens.token" : token })
        if(!user) throw new Error("Please Authenticate");
        const mess= await Mess.find({_id:user[0].messID});
        req.user = user[0];
        req.mess=mess[0];
        if(!mess) throw new Error("Please Authenticate");
        next()
        
    }catch(e){
        res.status(400).send({error : "Please Authenticate"});
    }
}

module.exports = auth