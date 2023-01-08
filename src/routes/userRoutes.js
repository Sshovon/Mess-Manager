const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const Mess = require('../models/messModel')
const auth = require('../middleware/auth')
const roleChecker = require('../middleware/roleChecker');

const bcryptjs = require("bcryptjs")

router.post('/signin',async(req,res)=>{    
    try{
        const user= await User.verifyCredentials(req.body.email,req.body.password);
        if(!user) throw new Error("Invalid credentials")
        const token = await user.generateAuthToken();
        res.cookie('token', token);
        res.send(user);
    }catch(e){
        const error=e.message;
        res.status(400).send({error})
    }

})


router.post('/signup', async (req, res) => {
    try {
        const { name, email, mobile, password, messID, role } = req.body;
        const exists = await User.find({ email });
        if (exists.length)
            throw new Error("Email already exists");
        const messExists = await Mess.find({ _id: messID });
        if (!messExists.length)
            throw new Error("Mess doesn't exist");
        const mobileExists = await User.find({ mobile });
        if (mobileExists.length)
            throw new Error("Mobile number already exists");

        const user = new User({
            name, email, mobile, password, messID, role
        })
        await user.save();
        await Mess.updateOne({ _id: user.messID }, {
            $push: {
                members: user._id
            }
        })
        const mess=await Mess.findOne({_id:user.messID});
        const mealList=mess.mealList;

        mealList.forEach((element)=>{
            element.dailyList=element.dailyList.concat({
                name,
                breakfast:0,
                lunch:0,
                dinner:0,
                ownerID:user._id
            })
        })
        await mess.save();
        res.status(200).send(user);
        
    } catch (e) {
        const error = e.message;
        res.status(400).send({ error });
    }
})


router.post('/signout', auth, async(req, res) => {
    try {

        const [user] = await User.find({ _id: req.user._id });
        const cookieToken = req.body.token;
        user.tokens = user.tokens.filter(token => cookieToken != token.token)
        res.cookie('token',""),
        res.user=""
        res.mess=""
        await user.save();
        res.send({result:"success"})

    } catch (e) {   
        error=e.message;
        res.send({error});

    }
})

router.get('/show', auth, async(req, res) => {
    try {
        
        const profile={};
        profile.totalMeal=req.user.totalMeal;
        profile.totalExpense=req.user.totalExpense;
        //profile.image=req.user.image;
        profile.expenses=req.user.expenses;

        let myMeal=[];
        for(let meal of req.mess.mealList){
            const {date,dailyList}= meal;
            const myDailyList=dailyList.filter((daily)=>daily.ownerID.toString()==req.user._id);
            myMeal.push({date,myDailyList})
        }

        profile.myMeal=myMeal;
        res.send(profile);
       
    } catch (e) {   
        error=e.message;
        res.send({error});
    }
})

router.post('/manager/swap',[auth,roleChecker],async(req,res)=>{
    try{
        const newManagerID=req.body.newManagerID;
        const newManager=await User.findOne({_id:newManagerID});
        
        newManager.role='manager';
        await newManager.save();
        req.user.role="member";
        await req.user.save();

        res.send({
            result:"success"
        })
        

    }catch(e){
        const error=e.message;
        res.send({error});
    }
})


router.post('/member/show', auth, async (req, res) => {
    try {
        const allUser = await Mess.find({ _id: req.mess._id }).populate('members')

        const users = allUser[0].members.filter(() => true);
        const usersDetails = [];
        users.forEach(user => {
            const userDetail = {}
            userDetail._id = user._id,
            userDetail.name = user.name;
            userDetail.email=user.email;
            userDetail.mobile=user.mobile;
            userDetail.role=user.role;
            usersDetails.push(userDetail);
        })
        res.send(usersDetails);
    } catch (e) {
        const error = e.message;
        res.status(400).send({
            error
        })

    }

})

router.post('/member/delete', [auth, roleChecker], async (req, res) => {
    try {
        const _id = req.body.id;
        console.log(_id)
        if (req.mess.mealList.length)
            throw new Error("Cant remove member")
        const result= await User.findOne({_id})
        
        req.mess.members=req.mess.members.filter(member=>{ 
            return member.toString() !=_id
        })
        
        delete result.messID;
        await result.save();
        await req.mess.save();
        console.log(req.mess.members)
        
        res.send({
            result: "success is in your veins"
        })

    } catch (e) {
        const error = e.message;
        res.status(400).send({
            error
        })
    }
})




module.exports = router;