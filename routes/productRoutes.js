const express = require('express')
const router = express.Router()
const { getAllproducts, addNewProduct, updateProduct, deleteProduct, searchProductByName, searchProductByCategory, searchProductByUPC } = require('../controllers/productController')

router.get('/', getAllproducts)
router.post('/add', addNewProduct)
router.put('/update', updateProduct)
router.delete('./delete', deleteProduct)
router.get('/search/ProductName/:productName', searchProductByName);
router.get('/search/productCategory/:productCategory',searchProductByCategory)
router.get('/search/productUPC/:productUPC',searchProductByUPC)


module.exports = router