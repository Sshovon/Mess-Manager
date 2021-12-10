const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const roleChecker = require('../middleware/roleChecker')
const { find } = require('../models/userModel')

router.post('/create', [auth, roleChecker], async (req, res) => {
    try {
        const { schedule } = req.body;
        const holderName = "";
        req.mess.schedules = req.mess.schedules.concat({
            schedule,
            holderName

        });
        await req.mess.save();
        res.send({ result: "success" });

    } catch (e) {
        const error = e.message;
        res.send({ error })
    }
})


///do unset logic 
router.post('/set', auth, async (req, res) => {
    try {
        if (req.user.schedule) {
            const prevSchedule = req.user.schedule;
            const prevIndex = req.mess.schedules.find(element => prevSchedule === element.schedule);
            prevIndex.holderName = "";
            delete prevIndex.ownerID;

        }
        const { schedule } = req.body;
        const index = req.mess.schedules.find(element => schedule === element.schedule);
        index.holderName = req.user.name
        index.ownerID = req.user._id
        req.user.schedule = schedule;

        await req.mess.save();
        await req.user.save();
        res.send({
            result:"success"
        });
    } catch (e) {
        const error = e.message;
        res.send({ error })
    }
})

router.post('/show', auth, async (req, res) => {
    try {
        res.send({ schedules: req.mess.schedules })

    } catch (e) {

        const error = e.message;
        res.send({ error })
    }
})




module.exports = router;