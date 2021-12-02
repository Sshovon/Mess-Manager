const express = require('express')
require('./src/db/mongoose') /// this ensures that mongoose.js run once and connects to database
require('dotenv').config()
const User = require('./src/models/userModel');
const Mess = require('./src/models/messModel')
const cookieParser = require('cookie-parser')
const cors= require('cors')
const app = express();
const port = process.env.PORT || 3000;

const auth = require('./src/middleware/auth')
const ownerChecker = require('./src/middleware/ownerChecker');
const signupRoutes = require('./src/routes/signupRoutes')
const signinRoutes = require('./src/routes/signinRoutes')
const createMessRoutes = require('./src/routes/createMessRoutes');
const managerRoutes = require('./src/routes/managerRoutes') 
const memberRoutes=require('./src/routes/memberRoutes');
const bulletinRoutes = require('./src/routes/bulletinRoutes')
const expenseRoutes = require('./src/routes/expenseRoutes');
const roleChecker = require('./src/middleware/roleChecker');
const mealRoutes=require('./src/routes/mealRoutes');
const signoutRoutes=require('./src/routes/signoutRoutes');
const scheduleRoutes= require('./src/routes/scheduleRoutes')
const summaryRoutes=require('./src/routes/summaryRoutes');

app.use(express.json()); ///this parses incoming jsons to object
app.use(cookieParser()) /// parses cookie
app.use(cors())

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

app.get('/', [auth,ownerChecker] ,(req, res) => {
    res.send(req.user)
})

app.listen(port, () => {
    console.log(`Server isn running on port ${port}`)
})

