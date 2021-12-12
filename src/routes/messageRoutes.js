const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const Statistics = require('../models/statisticsModel')
const roleChecker = require('../middleware/roleChecker')

router.post('/add', auth, async(req, res) => {
    try {

        req.mess.messages=req.mess.messages.concat({
            message,
            ownerID:req.user._id
        })
        await req.mess.save();
        res.send({
            result:"success"
        })

    } catch (e) {   
        error=e.message;
        res.send({error});
    }
})


router.post('/show', auth, async(req, res) => {
    try {
        res.send(req.mess.messages);
        
    } catch (e) {   
        error=e.message;
        res.send({error});
    }
})

module.exports = router;