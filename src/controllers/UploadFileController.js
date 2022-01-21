const multer = require('multer')
const multerConfig = require('../config/multer')

const multerMiddleware = multer(multerConfig).single('file')
module.exports = {
  upload(request, response) {
    multerMiddleware(request, response, (error) => {
      if (error) {
        return response.status(400).json({ message: 'Upload falhou' })
      }

      const { publicUrl } = request.file
      return response.status(201).json({ message: 'uploded', urlFile: publicUrl })
    })
  }
}