const express = require('express')
require('./src/db/mongoose') /// this ensures that mongoose.js run once and connects to database
const User = require('./src/models/userModel');

const app = express() ;
const port = process.env.PORT || 3000;

app.use(express.json()); ///this parses incoming jsons to object

app.get('/',(req,res)=>{
    const user = new User({
        name: "Shovon",
        email:"Ssassasasasasaaasassasaass@gmail.com",
        mobile:'01785605682',
        password:1234567,
        messID:'5544312',
        schedule: new Date(),
        lunchList:[{date:Date()}],
        dinnerList:[{date:Date()},{date:Date()}],

    })
    
    console.log(user);
    user.save().then(()=>{
        console.log(user);
    }).catch(error=> console.log(error));
    
    
    
    
})

app.listen(port,()=>{
    console.log("Server running")
})

