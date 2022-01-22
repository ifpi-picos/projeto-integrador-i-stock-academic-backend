const { Router } = require('express')
const UploadFileController = require('../controllers/UploadFileController')

const routes = Router()

routes.post('/file-upload', UploadFileController.upload)

module.exports = routes