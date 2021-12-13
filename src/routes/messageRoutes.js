const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const Statistics = require('../models/statisticsModel')
const roleChecker = require('../middleware/roleChecker')



router.post('/show', auth, async(req, res) => {
    try {
        res.send(req.mess.messages);
        
    } catch (e) {   
        error=e.message;
        res.send({error});
    }
})

module.exports = router;