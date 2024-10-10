require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const cors = require('cors')
const mongoose = require('mongoose')
// const productRoutes = require('./routes/productRoutes')

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully!'))


app.listen(PORT, () =>
{
    console.log(`server is running at http://localhost:${PORT}`)
})