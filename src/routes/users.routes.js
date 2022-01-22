const { Router } = require('express')
const usersController = require('../controllers/UsersController')

const router = Router()

router.get('/users', usersController.getAllUsers)

router.post('/users', usersController.save)
router.post('/users/address', usersController.saveAddress)

module.exports = router
