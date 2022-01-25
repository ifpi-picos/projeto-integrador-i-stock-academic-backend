const { Users } = require('../models')
const { AuthServices } = require('../services')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')
const yup = require('yup')

const authVendorsServices = new AuthServices(Users)
const responsesFactory = new ResponsesFactory()

module.exports = {
  async userLogin(request, response) {
    const { email, password } = request.body

    const schema = yup.object().shape({
      email: yup.string().email('Insira um email válido').required('Insira um email'),
      password: yup.string().required('Insira uma senha')
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(responsesFactory.error(response.statusCode, { ...error.errors }, error.message))
    }

    try {
      const { token, dataEntite } = await authVendorsServices.signin(email, password)
      const data = { auth: true, token, entite: dataEntite }

      return response.status(201).json(responsesFactory.success(response.statusCode, data))
    } catch (error) {
      const data = { auth: false, token: null }
      return response.status(401).json(responsesFactory.error(response.statusCode, data, error.message))
    }
  }
}
