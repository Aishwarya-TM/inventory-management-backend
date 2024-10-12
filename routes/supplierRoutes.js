const express = require('express')
const router = express.Router()

const { getAllSuppliers, addNewSupplier, searchSupplierById, updateSupplier, deleteSupplier } = require('../controllers/supplierController')

router.get('/',getAllSuppliers)
router.post('/add',addNewSupplier)
router.put('/update', updateSupplier)
router.delete('/delete',deleteSupplier)
router.get('/search/:id',searchSupplierById)

module.exports = router