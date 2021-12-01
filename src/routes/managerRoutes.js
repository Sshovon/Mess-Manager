const express = require('express')
const router = express.Router()
const roleChecker = require('../middleware/roleChecker');
const ownerChecker = require('../middleware/ownerChecker')
const auth = require('../middleware/auth');
const User = require('../models/userModel');
const Mess = require('../models/messModel')


router.get('/', [auth, roleChecker], (req, res) => {
    try {
        res.send("manager says hi")

    } catch (e) {
        res.send(e);
    }
})

router.get('/addmeal', [auth, roleChecker], (req, res) => {
    try {
        res.send('meal add page');
    } catch (e) {

    }
})

router.post('/addmeal', [auth, roleChecker], async (req, res) => {
    try {
        const { date, dailyList } = req.body;
        const exists = await Mess.find({ "mealList.date": date });
        if (exists.length)
            throw new Error("Date already exists")
        await Mess.updateOne({ _id: req.mess._id }, {
            $push: {
                mealList: {
                    date,
                    dailyList
                }
            }
        });
        const totalMeal=await User.doCount(dailyList);
        req.mess.totalMeal += totalMeal
        await req.mess.save();
        res.send("success")

    } catch (e) {
        res.send(e.message)
    }
})

router.patch('/updatemeal',[auth,roleChecker],async (req,res)=>{
    try{
        const { date, dailyList } = req.body;
        const exists = await Mess.find({ "mealList.date": date });
        if (!exists.length)
            throw new Error("Date doesn't exists");

        const prevDailyList=exists[0].mealList.find(element => element.date===date)
        const prevTotalMeal = await User.updateDoCount(prevDailyList.dailyList);
        const newTotalMeal=await User.doCount(dailyList);
        await req.mess.updateMealList(date,dailyList,newTotalMeal-prevTotalMeal);
        res.send('success')
        
    }catch(e){
        res.send(e.message)
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

        await Mess.updateOne({ _id: req.mess._id }, {
            $push: {
                expenses: {
                    expense, description, spender
                }
            }
        })
        await Mess.updateOne({ _id: req.mess._id }, { totalExpense: newExpense });
        await User.updateOne({ _id: req.user._id }, { expense: req.user.expense + expense });
        await User.updateOne({ _id: req.user._id }, {
            $push: {
                expenses: {
                    expense, description
                }
            }
        })
        res.send("success");

    } catch (e) {
        res.send("error")
    }
})

router.patch('/updateexpense/:id', [auth, ownerChecker], async (req, res) => {
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

router.delete("/deleteexpense/:id", [auth, ownerChecker], async (req, res) => {
    try {

        req.user.expenses = req.user.expenses.filter((expense) => {
            return expense._id.toString() != req.params.id
        })
        await req.user.save()
        req.user.updateExpense()

        req.mess.expenses = req.mess.expenses.filter((expense) => {
            return expense._id.toString() != req.params.id
        })
        await req.mess.save();
        req.mess.updateExpense();
        res.send("success")

    } catch (e) {
        res.send("error");
    }
})


// for deleting u have to adjust mess member array also
// router.delete('/removemember/:id',[auth,roleChecker],async(req,res)=>{
//     try{
//         const delUser=await User.findOneAndRemove({_id:req.params.id});
//         res.send("success")
//     }catch(e){
//         res.send("failure");
//     }
// })


module.exports = router;