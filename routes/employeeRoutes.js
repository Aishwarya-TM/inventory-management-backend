const express = require('express');
const router = express.Router();

const { 
    getAllEmployees, 
    addNewEmployee, 
    updateEmployee, 
    deleteEmployee, 
    searchEmployeeById 
} = require('../controllers/employeeController');


router.get('/', getAllEmployees); 
router.post('/add', addNewEmployee); 
router.put('/update', updateEmployee); 
router.delete('/delete', deleteEmployee); 
router.get('/search/:id', searchEmployeeById); 



module.exports = router;
