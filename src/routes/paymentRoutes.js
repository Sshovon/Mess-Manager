const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const Statistics = require('../models/statisticsModel')
const roleChecker = require('../middleware/roleChecker')

router.post('/set', [auth,roleChecker], async(req, res) => {
    try {
        const {settleObject} = req.body;
        await User.setPayment(settleObject);
        res.send({
            result:"sucess"
        })

    } catch (e) {   
        error=e.message;
        res.send({error});
    }
})


module.exports = router;