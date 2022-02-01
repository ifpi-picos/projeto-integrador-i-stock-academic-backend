const { Router } = require('express')
const TransactionController = require('../controllers/TransactionController')

const router = Router()

router.get('/transactions/all', TransactionController.getTransactions)

router.post('/transactions', TransactionController.saveTransaction)

module.exports = router