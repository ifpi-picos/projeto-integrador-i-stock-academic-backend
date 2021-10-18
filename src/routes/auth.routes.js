const { Router } = require('express')
const authController = require('../controllers/AuthController')

const routes = Router()

routes.post('/users/auth', authController.userLogin)

module.exports = routes
