const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ownerChecker = require('../middleware/ownerChecker')
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const { route } = require('./membersRoutes')
const nodemailer = require('nodemailer')

router.post('/', auth, async (req, res) => {
    try {
        const {email,url,baseUrl}=req.body;

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'devmail6199@gmail.com',
                pass: 'rzeuktcvmdfztbku'
            }
        });
        let mailDetails = {
            from: 'devmail6199@gmail.com',
            to: email,
            subject: `Invitation for joining ${req.mess.messName}`,
            text: `Dear User,
                        You are invited to join ${req.mess.name} from ${req.user.name} via ${url} or use this code ${req.user.messID} to join  on ${baseUrl}
            `,
        };

        await mailTransporter.sendMail(mailDetails);
        res.send({result:"success"});

    } catch (e) {
        error = e.message;
        res.send({ error });

    }
})


module.exports = router;