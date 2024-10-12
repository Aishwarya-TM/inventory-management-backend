const express = require('express')
const router = express.Router()

const {getAllOrder, addNewOrder, searchOrderById, updateOrder, deleteOrder} = require('../controllers/orderController')

router.get('/',getAllOrder)
router.post('/add',addNewOrder)
router.put('/update',updateOrder)
router.delete('/delete',deleteOrder)
router.get('/search/:id',searchOrderById)

module.exports = router