const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const cron = require('node-cron')

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.json({limit:'5mb'}))
// app.use(bodyParser.raw({limit:'100mb'}))

// cron.schedule('*/1 * * * * *',()=>console.log('test'))

const { productRoute,userRoute,cartRoute,orderRoute } = require('./route')
const { userAuth } = require('./middleware/auth');

app.use('/api/product/',productRoute)
app.use('/api/user/',userRoute)
app.use('/api/cart/',cartRoute)
app.use('/api/order/',userAuth,orderRoute)

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log('Connection successful'))
    .catch(err => console.log(err))

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})