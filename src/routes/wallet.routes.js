const { Router } = require('express')
const WalletController = require('../controllers/WalletController')

const routes = Router();

routes.get('/wallet', WalletController.getAllWallets)

routes.post('/wallet', WalletController.create)
routes.post('/wallet/balance', WalletController.addBalance)
routes.patch('wallet/bindUser', WalletController.bindUserWallet)

module.exports = routes;