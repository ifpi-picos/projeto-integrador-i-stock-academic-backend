const { Router } = require('express')
const authRoutes = require('./auth.routes')
const usersRoutes = require('./users.routes')
const walletRoutes = require('./wallet.routes')
const uploadFileRoutes = require('./upload.routes')

const router = Router()

router.get('/', function (req, res) {
  res.status(200).send('<h1 style="text-align: center">App Online!</h1>')
})

router.use(authRoutes)
router.use(usersRoutes)
router.use(walletRoutes)
router.use(uploadFileRoutes)

module.exports = router
