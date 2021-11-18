const express = require('express')
require('./src/db/mongoose') /// this ensures that mongoose.js run once and connects to database
require('dotenv').config()
const User = require('./src/models/userModel');
const Mess = require('./src/models/messModel')
const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3000;

const auth = require('./src/middleware/auth')
const ownerChecker = require('./src/middleware/ownerChecker');
const signupRoutes = require('./src/routes/signupRoutes')
const signinRoutes = require('./src/routes/signinRoutes')
const createMessRoutes = require('./src/routes/createMessRoutes');
const managerRoutes = require('./src/routes/managerRoutes') 
const memberRoutes=require('./src/routes/memberRoutes');

app.use(express.json()); ///this parses incoming jsons to object
app.use(cookieParser()) /// parses cookie


//signup routes
app.use('/signup',signupRoutes);

//signin routes
app.use('/signin',signinRoutes);

//create mess routes
app.use('/createmess',createMessRoutes);

//manager routes
app.use('/manager',managerRoutes);

//member routes
app.use('/member',memberRoutes);



app.get('/', [auth,ownerChecker] ,(req, res) => {
    res.send(req.user)
})

app.listen(port, () => {
    console.log(`Server isn running on port ${port}`)
})

