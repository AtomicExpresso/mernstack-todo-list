require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoRoute = require('./routes/todoRoute');

const app = express()

// Global Middleware
app.use(express.json())

//Connect mongoose 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and Listening to PORT: ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

//Default route
app.use('/api/todo', todoRoute)