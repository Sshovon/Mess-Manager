
const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

/////// Instance Methods ////////

userSchema.methods.toJSON = function(){
    const user= this;
    const userObject = user.toObject(); // converting mongoose document to plain js object

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign({_id:user._id}, process.env.JWT, {expiresIn: '12h'});
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}


/////// Static Methods ////////

userSchema.statics.verifyCredentials = async function(email,password){
    const user= await User.findOne({email})
    if(!user) 
        throw new Error("Invalid credentials")
    
    const isMatch=  await bcryptjs.compare(password, user.password)
    if(!isMatch)
        throw new Error("Invalid credentials")
    return user;
}

/////// Middleware ///////

userSchema.pre('save', async function(){
    const user = this;
    if(user.isModified("password")){
        user.password=await bcryptjs.hash(user.password,8);
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;
