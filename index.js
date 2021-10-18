const express = require('express')
require('./src/db/mongoose') /// this ensures that mongoose.js run once and connects to database
const User = require('./src/models/userModel');
const Mess= require('./src/models/messModel')

const app = express() ;
const port = process.env.PORT || 3000;

app.use(express.json()); ///this parses incoming jsons to object

app.get('/',(req,res)=>{
    const mess = new Mess({
        messID:'12345',
    })
    
    console.log(mess);
    mess.save().then(()=>{
        console.log(mess);
    }).catch(error=> console.log(error));
    
    
    
    
})

app.listen(port,()=>{
    console.log("Server running")
})

