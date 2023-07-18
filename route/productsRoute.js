const express = require('express');
const router = express.Router()

const { productController } = require('../controller')

router.get('/',productController.getProducts)
router.get('/:id',productController.getProduct)
router.post('/',productController.addProduct)
router.put('/:id',productController.updateProduct)
router.put('/delete/:id',productController.deleteProduct)
router.put('/recover/:id',productController.recoverProduct)

module.exports = router