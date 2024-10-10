const express = require('express')
const router = express.Router()
const { getAllproducts, addNewProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/', getAllproducts)
router.post('/add', addNewProduct)
router.put('/update', updateProduct)
router.delete('./delete', deleteProduct)

module.export = router