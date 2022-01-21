const { Router } = require('express')
const multer = require('multer')
const multerConfig = require('../config/multer')
const UploadFileController = require('../controllers/UploadFileController')

const routes = Router()

routes.post('/file-upload', multer(multerConfig).single('file'), UploadFileController.upload)

module.exports = routes