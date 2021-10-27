const express = require('express')
require('./src/db/mongoose') /// this ensures that mongoose.js run once and connects to database
const User = require('./src/models/userModel');
const Mess = require('./src/models/messModel')

const app = express();
const port = process.env.PORT || 3000;

const signupRoutes = require('./src/routes/signupRoutes')
const signinRoutes = require('./src/routes/signinRoutes')
const createMessRoutes = require('./src/routes/createMessRoutes');

app.use(express.json()); ///this parses incoming jsons to object
app.get('/', (req, res) => {

})

//signup routes
app.use('/signup',signupRoutes);

//signin routes
app.use('/signin',signinRoutes);

//create mess routes
app.use('/createmess',createMessRoutes);

app.listen(port, () => {
    console.log("Server running")
})

