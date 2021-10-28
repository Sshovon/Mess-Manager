const express = require("express")
const router = express.Router();
const Mess = require('../models/messModel');


router.get('/', (req, res) => {
    res.send("mess created");
})

router.post('/', async (req, res) => {
    try {
        const mess = new Mess()

        await mess.save();
        res.status(200).send({mID: mess._id.toString()})

    }catch(e){
        res.status(400).send({e});
    }
})



module.exports = router;
