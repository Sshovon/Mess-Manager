
const mongoose = require('mongoose')
const validator = require('validator')

const lunchSchema =  new mongoose.Schema({
    date:{
        type:String,
        required:true,
}})

const dinnerSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
}})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Email is not an valid one!!!");
            }
        }
    },
    mobile:{
        type: String,
        minlength: 11,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        minlength:6,
        trim:true,
        required:true,
    },
    role:{
        type:String,
        default:'member'
    },
    expanse:{
        type:Number,
        default:0,
    },
    lunchList:{
        type: [lunchSchema]
    },
    dinnerList:{
        type:[dinnerSchema]
    },
    messID:{
        type: mongoose.Types.ObjectId
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;