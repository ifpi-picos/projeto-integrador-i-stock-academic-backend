const multer = require('multer')
const multerConfig = require('../config/multer')
const { FirebaseAdmin } = require('../services')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')

const multerMiddleware = multer(multerConfig).single('file')
const responsesFactory = new ResponsesFactory()
const firebaseAdmin = new FirebaseAdmin()

module.exports = {
  upload(request, response) {
    multerMiddleware(request, response, (error) => {
      if (error) {
        return response.status(400).json(responsesFactory.success(response.statusCode, null, 'Upload falhou!'))
      }

      const { publicUrl } = request.file
      return response.status(201).json(responsesFactory.success(response.statusCode, { urlFile: publicUrl }, 'Upload concluído com sucesso!'))
    })
  },

  async deleteFile(request, response) {
    try {
      const { pathFile } = request.params

      const successMessage = await firebaseAdmin.destroyFile(pathFile)

      return response.status(200).json(responsesFactory.success(response.statusCode, null, successMessage))
    } catch (error) {
      return response.status(400).json(responsesFactory.error(response.statusCode, null, error.message))
    }
  }
}