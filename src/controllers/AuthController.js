const { Users } = require('../models')
const { AuthServices } = require('../services')
const yup = require('yup')

const authVendorsServices = new AuthServices(Users)

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
      return response.status(400).json({ error: error.errors })
    }

    try {
      const { token, dataEntite } = await authVendorsServices.signin(email, password)
      response.status(201).json({ auth: true, token, entite: dataEntite })
    } catch (error) {
      response.status(401).json({ auth: false, token: null, error: error.message })
    }
  }
}
