const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')

app.use(cors())
app.use(express.json())
app.use(multer().any())
// app.use(bodyParser.raw({limit:'100mb'}))

const { initializeApp } = require('firebase/app')
const { productRoute,userRoute,cartRoute,orderRoute } = require('./route')
const { userAuth } = require('./middleware/auth');
const firebaseConfig = require('./config/firebaseConfig')

const firebaseApp = initializeApp(firebaseConfig);

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