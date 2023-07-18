const express = require('express')
const router = express.Router()

const cartController = require('../controller/cartController')

router.get('/:userId',cartController.getCart)
router.post('/',cartController.addToCart)
router.delete('/:cartId',cartController.removeFromCart)

module.exports = router