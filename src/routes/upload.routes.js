const { Router } = require('express')
const UploadFileController = require('../controllers/UploadFileController')

const routes = Router()

routes.post('/file-upload', UploadFileController.upload)
routes.delete('/file-exclude/:pathFile', UploadFileController.deleteFile)

module.exports = routes