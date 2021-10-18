const { Router } = require('express')
const usersController = require('../controllers/UsersController')

const router = Router()

router.post('/users', usersController.save)

module.exports = router
