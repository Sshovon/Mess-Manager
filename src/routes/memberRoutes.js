const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/userModel')
const Mess = require('../models/messModel')


router.post('/showall', async (req, res) => {
    try {
        const messID = req.body.messID;
        const users = await Mess.find({ _id: messID }).populate('members')
        res.status(200).json({
            users,
            message: "success"
        })
    } catch (e) {
        res.status(400).json({
            message: "error"
        })

    }

})

router.get('/addexpense', async (req, res) => {
    try {
        res.send('render addexpense page')

    } catch (e) {

    }
})
router.post('/addexpense', auth, async (req, res) => {
    try {
        //console.log(req.mess)
        const { expense, description } = req.body;
        const spender = req.user._id;
        const newExpense = req.mess.totalExpense + expense;

        const updatedExpense = await Mess.findOneAndUpdate({ _id: req.mess._id }, {
            $push: {
                expenses: {
                    expense, description, spender
                }
            }
        })
        const _id = updatedExpense.expenses[updatedExpense.expenses.length - 1]._id

        await Mess.updateOne({ _id: req.mess._id }, { totalExpense: newExpense });
        await User.updateOne({ _id: req.user._id }, { expense: req.user.expense + expense });
        await User.updateOne({ _id: req.user._id }, {
            $push: {
                expenses: {
                    expense, description, _id
                }
            }
        })
        res.send(_id);

    } catch (e) {
        res.send("error")
    }
})

router.patch('/updateexpense/:id', auth, async (req, res) => {
    try {
        const r1 = await User.findOneAndUpdate({ "expenses._id": req.params.id },
            {
                $set: {
                    "expenses.$.description": req.body.description,
                    "expenses.$.expense": req.body.expense
                }
            }, { new: true })
        r1.updateExpense();

        const r2 = await Mess.findOneAndUpdate({ "expenses._id": req.params.id },
            {
                $set: {
                    "expenses.$.description": req.body.description,
                    "expenses.$.expense": req.body.expense
                }
            }, { new: true })

        r2.updateExpense();
        res.send({ r1, r2 })

    } catch (e) {
        res.send('error');
    }
})


router.delete("/deleteexpense/:id", auth, async (req, res) => {
    try{
        
        req.user.expenses= req.user.expenses.filter((expense)=>{
            return expense._id.toString() != req.params.id
        })
        await req.user.save()
        req.user.updateExpense()

        req.mess.expenses= req.mess.expenses.filter((expense)=>{
            return expense._id.toString() != req.params.id
        })
        await req.mess.save();
        req.mess.updateExpense();
        res.send("success")

    }catch(e){
        res.send("error");
    }
})


module.exports = router