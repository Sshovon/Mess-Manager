const express = require("express")
const router = express.Router();
const Mess = require('../models/messModel');


router.get('/', (req, res) => {
    res.send("mess created");
})

router.post('/', async (req, res) => {
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    try {
        const messID = randomColor;
        const mess = new Mess({
            messID
        })

        await mess.save();
        res.status(200).send({messID})

    }catch(e){
        res.status(400).send({e});
    }
})


module.exports = router;
