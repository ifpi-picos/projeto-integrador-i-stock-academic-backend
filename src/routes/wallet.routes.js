const { Router } = require('express')
const WalletController = require('../controllers/WalletController')

const routes = Router();

routes.get('/wallet', WalletController.getAllWallets)

routes.post('/wallet', WalletController.create)
routes.post('/wallet/balance', WalletController.addBalance)

module.exports = routes;