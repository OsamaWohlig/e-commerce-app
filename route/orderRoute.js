const express = require('express')
const router = express.Router()

const {orderController} = require('../controller')

router.get('/:userId',orderController.getOrders)
router.post('/',orderController.createOrder)
router.put('/:orderId',orderController.cancelOrder)

module.exports = router