const express = require('express')
const router = express.Router()
const { getAllproducts, 
    addNewProduct, 
    updateProduct, 
    deleteProduct, 
    searchProduct, 
    searchProductByUPC, 
    filterProduct, 
    trackInventoryLevel, 
    generateReports,
    restockProduct} = require('../controllers/productController')

router.get('/', getAllproducts)
router.post('/add', addNewProduct)
router.put('/update', updateProduct)
router.delete('/delete', deleteProduct)
router.get('/search',searchProduct)
router.get('/search/productUPC/:productUPC',searchProductByUPC)
router.get('/filter',filterProduct)
router.get('/trackProduct/:quantity',trackInventoryLevel)
router.get('/reports', generateReports)
router.post('/restock',restockProduct)


module.exports = router

