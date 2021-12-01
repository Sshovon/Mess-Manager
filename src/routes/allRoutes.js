const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')

router.get('/', async (req, res) => {
    res.send("from all")
})


router.post('/addbulletin', auth, async (req, res) => {
    try {
        const { itemName, itemQuantity } = req.body;
        req.mess.bulletinBoard = req.mess.bulletinBoard.concat({
            itemName,
            itemQuantity,
            addedBy: req.user._id
        });
        await req.mess.save();
        res.send({ result: "success" });

    } catch (e) {
        error = e.message;
        res.send({ error });
    }
})

router.patch('/donebulletin/:id', auth, async (req, res) => {
    try {
        const bulletinBoardArray = req.mess.bulletinBoard;
        const index = bulletinBoardArray.findIndex(obj => {
            return obj._id.toString() == req.params.id
        })
        req.mess.bulletinBoard[index].done = true;
        await req.mess.save();
        res.send({ result: "success" });
    } catch (e) {
        error = e.message;
        res.send({ error });
    }
})

router.delete('/deletebulletin/:id', auth, async (req, res) => {
    try {
        req.mess.bulletinBoard=req.mess.bulletinBoard.filter(obj => obj._id.toString() != req.params.id);
        await req.mess.save();
        res.send({ result: "success" });

    } catch (e) {
        error = e.message;
        res.send({ error });

    }
})

module.exports = router;