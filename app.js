const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const { productRoute,userRoute,cartRoute,orderRoute } = require('./route')


app.use('/api/product/',productRoute)
app.use('/api/user/',userRoute)
app.use('/api/cart/',cartRoute)
app.use('/api/order/',orderRoute)

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log('Connection successful'))
    .catch(err => console.log(err))


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})