const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const { route } = require('./signupRoutes')
const roleChecker = require('../middleware/roleChecker')



router.post('/show', auth, async (req, res) => {
    try {
        const allUser = await Mess.find({ _id: req.mess._id }).populate('members')

        const users = allUser[0].members.filter(() => true);
        const usersDetails = [];
        users.forEach(user => {
            const userDetail = {}
            userDetail._id = user._id,
            userDetail.name = user.name;
            userDetail.email=user.email;
            userDetail.mobile=user.mobile;
            userDetail.role=user.role;
            usersDetails.push(userDetail);
        })
        res.send(usersDetails);
    } catch (e) {
        const error = e.message;
        res.status(400).send({
            error
        })

    }

})

router.post('/delete', [auth, roleChecker], async (req, res) => {
    try {
        const _id = req.body.id;
        console.log(_id)
        if (req.mess.mealList.length)
            throw new Error("Cant remove member")
        const result= await User.findOne({_id})
        
        req.mess.members=req.mess.members.filter(member=>{ 
            return member.toString() !=_id
        })
        
        delete result.messID;
        await result.save();
        await req.mess.save();
        console.log(req.mess.members)
        
        res.send({
            result: "success is in your veins"
        })

    } catch (e) {
        const error = e.message;
        res.status(400).send({
            error
        })
    }
})


module.exports = router