const { Router } = require('express')
const authRoutes = require('./auth.routes')
const usersRoutes = require('./users.routes')
const walletRoutes = require('./wallet.routes')
const uploadFileRoutes = require('./upload.routes')
const addressRoutes = require('./address.routes')

const router = Router()

router.get('/', function (req, res) {
    res.status(200).send('<h1 style="text-align: center">App Online!</h1>')
})

router.use(authRoutes)
router.use(usersRoutes)
router.use(walletRoutes)
router.use(uploadFileRoutes)
router.use(addressRoutes)

router.all('*', function (req, res) {
    res.status(404).json({ code: res.statusCode, data: {}, message: 'Rota não encontrada!' })
})

module.exports = router
