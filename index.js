const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const auth = require('./routes/userRoutes');
const product = require('./routes/productRoutes')

dotenv.config()
const app = express()

app.get('/',(req,res)=>{
    res.json({message:"Server created"})
})
app.use(express.json())

//Register and Login router
app.use('/user',auth)
//Product CRUD
app.use('/product',product)

// PORT
const PORT = process.env.PORT || 5000

// MongoDB Cloud Connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
    .then(()=>app.listen(PORT,()=>{
        console.log(`Server Running on Port ${PORT}`)
    }))
    .catch((err)=>{
        console.log(err)
    })


