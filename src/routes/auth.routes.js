const { Router } = require('express')
const authController = require('../controllers/AuthController')

const router = Router()

router.post('/admin/auth', authController.userLogin)

module.exports = router
