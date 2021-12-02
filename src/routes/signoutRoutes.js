const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const { route } = require('./memberRoutes')


router.post('/', auth, async (req, res) => {
    try {

        const [user] = await User.find({ _id: req.user._id });
        const cookieToken = req.cookies.token;
        user.tokens = user.tokens.filter(token => cookieToken != token.token)
        req.cookies.token="",
        req.user=""
        req.mess=""
        await user.save();
        res.send({result:"success"})

    } catch (e) {   
        error=e.message;
        res.send({error});

    }
})


module.exports = router;