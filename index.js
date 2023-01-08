const express = require('express')
require('dotenv').config()
require('./src/db/mongoose') /// this ensures that mongoose.js run once and connects to database
const cookieParser = require('cookie-parser')
const cors= require('cors')
const app = express();
const port = process.env.PORT || 4004;

const auth = require('./src/middleware/auth')
const ownerChecker = require('./src/middleware/ownerChecker');
const userRoutes=require('./src/routes/userRoutes')
const messRoutes=require('./src/routes/messRoutes')
const monthRoutes=require('./src/routes/monthRoutes')
const bulletinRoutes = require('./src/routes/bulletinRoutes')
const expenseRoutes = require('./src/routes/expenseRoutes');
const mealRoutes=require('./src/routes/mealRoutes');
const scheduleRoutes= require('./src/routes/scheduleRoutes')
const summaryRoutes=require('./src/routes/summaryRoutes');
const uploadRoutes=require('./src/routes/uploadRoutes');
const paymentRoutes=require('./src/routes/paymentRoutes');
const messageRoutes= require('./src/routes/messageRoutes');
const chatServer= require('./src/routes/liveChat');
chatServer();
app.use(express.json()); ///this parses incoming jsons to object
app.use(cookieParser()) /// parses cookie
app.use(cors({
    credentials:true,
    origin:true
}))
app.use(express.static('./public'))

//user routes
app.use('/user',userRoutes)

//mess routes
app.use('/mess',messRoutes)

//month routes
app.use('/month',monthRoutes)

//expense routes
app.use('/expense',expenseRoutes)

//bulletin routes
app.use('/bulletin',bulletinRoutes);

//meal routes
app.use('/meal',mealRoutes);

//schedule routes
app.use('/schedule',scheduleRoutes);

//summary routes
app.use('/summary',summaryRoutes);

//upload routes
app.use('/upload',uploadRoutes);

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

