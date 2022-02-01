const { Router } = require('express')
const addressController = require('../controllers/AddressController')

const router = Router()

router.post('/address', addressController.saveAddress)

module.exports = router