const express = require('express')
const router = express.Router()
const roleChecker = require('../middleware/roleChecker');
const ownerChecker = require('../middleware/ownerChecker')
const auth = require('../middleware/auth');
const User = require('../models/userModel');
const Mess = require('../models/messModel')


router.post('/show', auth, async (req, res) => {
    try {
        const expenses = req.mess.expenses;
        res.send({ expenses })

    } catch (e) {
        const error = e.message;
        res.send({ error })
    }
})


router.post('/add', auth, async (req, res) => {
    try {
        const { expense, description } = req.body;
        const spender = req.user._id;
        const name = req.user.name
        const updatedExpense = await Mess.findOneAndUpdate({ _id: req.mess._id }, {
            $push: {
                expenses: {
                    expense, description, spender, name
                }
            }
        }, { new: true })
        req.mess.totalExpense += expense;
        const _id = updatedExpense.expenses[updatedExpense.expenses.length - 1]._id
        await User.updateOne({ _id: req.user._id }, { expense: req.user.expense + expense });
        await User.updateOne({ _id: req.user._id }, {
            $push: {
                expenses: {
                    expense, description, _id
                }
            }
        })
        //checked all ok
        await req.mess.generateMealCost();
        res.send(_id);

    } catch (e) {
        res.send("error")
    }
})

router.patch('/update/:id', [auth, ownerChecker], async (req, res) => {
    try {
        const r1 = await User.findOneAndUpdate({ "expenses._id": req.params.id },
            {
                $set: {
                    "expenses.$.description": req.body.description,
                    "expenses.$.expense": req.body.expense
                }
            }, { new: true })
        await r1.updateExpense();

        const r2 = await Mess.findOneAndUpdate({ "expenses._id": req.params.id },
            {
                $set: {
                    "expenses.$.description": req.body.description,
                    "expenses.$.expense": req.body.expense
                }
            }, { new: true })

        await r2.updateExpense();
        await r2.generateMealCost();
        res.send({ r1, r2 })

    } catch (e) {
        res.send('error');
    }
    
})


router.delete("/delete/:id", [auth, ownerChecker], async (req, res) => {
    try {

        req.user.expenses = req.user.expenses.filter((expense) => {
            return expense._id.toString() != req.params.id
        })
        await req.user.save()
        req.user.updateExpense()

        req.mess.expenses = req.mess.expenses.filter((expense) => {
            return expense._id.toString() != req.params.id
        })
        //await req.mess.save();
        await req.mess.updateExpense();
        await req.mess.generateMealCost();

        res.send("success")

    } catch (e) {
        res.send("error");
    }
})


module.exports = router;