const express = require('express');
const router = express.Router()

const { userController } = require('../controller')

router.get('/',userController.getUsers)
router.get('/:id',userController.getCurrentUser)
router.post('/',userController.createUser)
router.put('/:id',userController.updateUser)
router.put('/delete/:id',userController.deleteUser)
router.put('/recover/:id',userController.recoverUser)

module.exports = router