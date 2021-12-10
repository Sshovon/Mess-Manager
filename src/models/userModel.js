
const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const lunchSchema = new mongoose.Schema({
//     date: {
//         type: String,
//         required: true,
//     },
//     meal: {
//         type: Boolean,
//         required: true

//     }
// })

// const dinnerSchema = new mongoose.Schema({
//     date: {
//         type: String,
//         required: true,
//     },
//     meal: {
//         type: Boolean,
//         required: true

//     }

// })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,

        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not an valid one!!!");
            }
        }
    },
    mobile: {
        type: String,
        minlength: 11,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        default: 'member'
    },
    expense: {
        type: Number,
        default: 0,
    },
    totalMeal: {
        type: Number,
        default: 0
    },
    // lunchList: {
    //     type: [lunchSchema]
    // },
    // dinnerList: {
    //     type: [dinnerSchema]
    // },
    messID: {
        type: mongoose.Types.ObjectId,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    expenses: [
        {
            expense: {
                type: Number,
                required: true,
            },
            description: String,
            date: {
                type: String,
                default: new Date().toLocaleDateString()
            }
        }
    ],
    image: {
        fileName: String,
        filePath: String,
        fileType: String,
        fileSize: String,
        data: Buffer,
    },
    payments: [
        {
            moneyFromID: mongoose.Types.ObjectId,
            moneyFrom: String,
            moneyToID: mongoose.Types.ObjectId,
            moneyTo: String,
            amount: Number
        }
    ],
    schedule:String,

    
})
/////// Instance Methods ////////

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject(); // converting mongoose document to plain js object

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT, { expiresIn: '12h' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.updateExpense = async function () {
    const user = this;
    let userTotalExpense = 0;
    const userExpenses = user.expenses;

    for (let i = 0; i < userExpenses.length; i++) {
        userTotalExpense += userExpenses[i].expense;
    }
    user.expense = userTotalExpense;
    await user.save()

}


/////// Static Methods ////////

userSchema.statics.verifyCredentials = async function (email, password) {
    const user = await User.findOne({ email })
    if (!user)
        throw new Error("Invalid credentials")
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch)
        throw new Error("Invalid credentials")
    return user;
}


userSchema.statics.doCount = async function (dailyList) {
    let totalMeal = 0;
    for (const element of dailyList) {
        const user = await User.findOne({ _id: element.ownerID })
        const count = element.breakfast + element.lunch + element.dinner;
        user.totalMeal += count;
        totalMeal += count;
        await user.save();
    }
    console.log(totalMeal)
    return totalMeal;
}

userSchema.statics.updateDoCount = async function (dailyList) {
    let totalMeal = 0;
    for (const element of dailyList) {
        const user = await User.findOne({ _id: element.ownerID })
        const count = element.breakfast + element.lunch + element.dinner;
        user.totalMeal -= count;
        totalMeal += count;
        await user.save();
    }
    return totalMeal;
}

userSchema.statics.endMonthForMembers = async function (messID) {
    const members = await User.find({ messID })
    for (let member of members) {
        member.expenses = [];
        member.expense = 0;
        member.totalMeal = 0;
        delete member.schedule;
        await member.save();
    }
}

userSchema.statics.setPayment= async function(settleObject){
    
    for(settle of settleObject){
        const res1=await User.findOne({_id:settle.moneyFromID});
        const res2=await User.findOne({_id:settle.moneyToID});  
        // if(!res1.payments)
        //     res1.payments=[]
        // if(!res2.payments)
        //     res2.payments=[]
        res1.payments=res1.payments.concat(settle);
        res2.payments=res2.payments.concat(settle);
        console.log(res1);

        await res1.save();
        await res2.save();

        
    }

}

/////// Middleware ///////

userSchema.pre('save', async function () {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 8);
    }
})



const User = mongoose.model('User', userSchema)

module.exports = User;
