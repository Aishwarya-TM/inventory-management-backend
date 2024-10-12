require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const cors = require('cors')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const supplierRoutes = require('./routes/supplierRoutes')

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully!'))

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/admin/employee', employeeRoutes)
app.use('/api/v1/admin/supplier', supplierRoutes)

app.listen(PORT, () =>
{
    console.log(`server is running at http://localhost:${PORT}`)
})