const express = require('express')
require('dotenv').config()
require('./src/db/mongoose') /// this ensures that mongoose.js run once and connects to database
const User = require('./src/models/userModel');
const Mess = require('./src/models/messModel')
const cookieParser = require('cookie-parser')
const cors= require('cors')
const path=require('path')
const multer= require('multer');
const app = express();
const port = process.env.PORT || 4004;

const auth = require('./src/middleware/auth')
const ownerChecker = require('./src/middleware/ownerChecker');
const signupRoutes = require('./src/routes/signupRoutes')
const signinRoutes = require('./src/routes/signinRoutes')
const createMessRoutes = require('./src/routes/createMessRoutes');
const managerRoutes = require('./src/routes/managerRoutes') 
const memberRoutes=require('./src/routes/membersRoutes');
const bulletinRoutes = require('./src/routes/bulletinRoutes')
const expenseRoutes = require('./src/routes/expenseRoutes');
const roleChecker = require('./src/middleware/roleChecker');
const mealRoutes=require('./src/routes/mealRoutes');
const signoutRoutes=require('./src/routes/signoutRoutes');
const scheduleRoutes= require('./src/routes/scheduleRoutes')
const summaryRoutes=require('./src/routes/summaryRoutes');
const settleExpenseRoutes=require('./src/routes/settleExpense');
const inviteRoutes=require('./src/routes/inviteRoutes');
const endMonthRoutes=require('./src/routes/endMonthRoutes');
const generateStatisticsRoutes=require('./src/routes/generateStatisticRoutes');
const uploadRoutes=require('./src/routes/uploadRoutes');
const profileRoutes=require('./src/routes/profileRoutes');
const paymentRoutes=require('./src/routes/paymentRoutes');
const messageRoutes= require('./src/routes/messageRoutes');

app.use(express.json()); ///this parses incoming jsons to object
app.use(cookieParser()) /// parses cookie
app.use(cors({
    credentials:true,
    origin:true
}))
app.use(express.static('./public'))

//signup routes
app.use('/signup',signupRoutes);

//signin routes
app.use('/signin',signinRoutes);

//create mess routes
app.use('/createmess',createMessRoutes);

//expense routes
app.use('/expense',expenseRoutes)

//bulletin routes
app.use('/bulletin',bulletinRoutes);

//meal routes
app.use('/meal',mealRoutes);

//signout routes
app.use('/signout',signoutRoutes);

//schedule routes
app.use('/schedule',scheduleRoutes);

//summary routes
app.use('/summary',summaryRoutes);

//member routes
app.use('/member',memberRoutes)

//manager routes
app.use('/manager',managerRoutes);

//settle expense routes
app.use('/settle', settleExpenseRoutes)

//invite routes
app.use('/invite',inviteRoutes);

//end month Routes
app.use('/endmonth',endMonthRoutes);

//generate statistics Routes
app.use('/generateStatistics',generateStatisticsRoutes);

//upload routes
app.use('/upload',uploadRoutes);

//profile routes
app.use('/profile',profileRoutes)

//payment routes
app.use('/payment',paymentRoutes);

//message Routes
app.use('/message' ,messageRoutes);


app.get('/', [auth,ownerChecker] ,(req, res) => {
    res.send(req.user)
})

app.listen(port, () => {
    console.log(`Server isn running on port ${port}`)
})

