const express = require('express')
const mangoose = require('mangoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3001, () => {
    console.log("Server is Running")
})