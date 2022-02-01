const { Router } = require('express')
const WalletController = require('../controllers/WalletController')

const router = Router();

router.get('/wallet', WalletController.getAllWallets)

router.post('/wallet', WalletController.create)
router.post('/wallet/balance', WalletController.addBalance)
router.patch('/wallet/bindUser', WalletController.bindUserWallet)

module.exports = router;