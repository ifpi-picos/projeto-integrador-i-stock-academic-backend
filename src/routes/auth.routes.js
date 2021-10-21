const { Router } = require('express')
const authController = require('../controllers/AuthController')

const routes = Router()

routes.post('/admin/auth', authController.userLogin)

module.exports = routes
