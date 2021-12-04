const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const bcryptjs = require("bcryptjs")




router.post('/', async (req, res) => {
    try {
        const { name, email, mobile, password, messID, role } = req.body;
        const exists = await User.find({ email });
        if (exists.length)
            throw new Error("Email already exists");
        const messExists = await Mess.find({ _id: messID });
        if (!messExists.length)
            throw new Error("Mess doesn't exist");
        const mobileExists = await User.find({ mobile });
        if (mobileExists.length)
            throw new Error("Mobile number already exists");

        const user = new User({
            name, email, mobile, password, messID, role
        })
        await user.save();
        await Mess.updateOne({ _id: user.messID }, {
            $push: {
                members: user._id
            }
        })
        const mess=await Mess.findOne({_id:user.messID});
        const mealList=mess.mealList;

        mealList.forEach((element)=>{
            element.dailyList=element.dailyList.concat({
                name,
                breakfast:0,
                lunch:0,
                dinner:0,
                ownerID:user._id
            })
        })
        await mess.save();
        res.status(200).send(user);
        
    } catch (e) {
        const error = e.message;
        res.status(400).send({ error });
    }
})
module.exports = router;

