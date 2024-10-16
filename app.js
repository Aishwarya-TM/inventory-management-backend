const { DB_URI, PORT } = require('./configurations/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
 
const productRouter = require('./routes/productRoutes');
const employeeRouter = require('./routes/employeeRoutes'); 
const orderRouter = require('./routes/orderRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


mongoose.connect(DB_URI);
const db = mongoose.connection;
db.on('error', (errorMessage) => console.error(`Database connection error: ${errorMessage}`));
db.once('open', () => console.log('Connected to database successfully!'));


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/employees',  employeeRouter);
app.use('/api/v1/orders', orderRouter);  
app.use('/api/v1/suppliers', supplierRoutes);


app.use((request, response, next) => {
    response.status(404).json({ message: 'Resource not found' });
});


app.use((error, request, response, next) => {
    console.error(`Server error: ${error.message}`);
    response.status(500).json({ message: 'Internal server error' });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

