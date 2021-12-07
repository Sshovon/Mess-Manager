const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const Statistics = require('../models/statisticsModel')
const { route } = require('./membersRoutes')


router.post('/show', auth, async(req, res) => {
    try {
        const stats= await Statistics.find({messID: req.mess._id});
        res.send(stats);
    } catch (e) {   
        error=e.message;
        res.send({error});
    }
})



module.exports = router;