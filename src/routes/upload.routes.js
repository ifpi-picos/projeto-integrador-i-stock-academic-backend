const { Router } = require('express')
const UploadFileController = require('../controllers/UploadFileController')

const router = Router()

router.post('/file-upload', UploadFileController.upload)
router.delete('/file-exclude/:pathFile', UploadFileController.deleteFile)

module.exports = router