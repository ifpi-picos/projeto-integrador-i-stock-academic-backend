const { Router } = require('express')
const WalletController = require('../controllers/WalletController')
const TransactionController = require('../controllers/TransactionController')

const router = Router();

router.get('/wallet', WalletController.getAllWallets)
router.get('/wallet/balance/:wallet_id', TransactionController.getBalance)

router.post('/wallet', WalletController.create)

module.exports = router;