const { Users } = require('../models')
const { AuthServices } = require('../services')
const yup = require('yup')

const authVendorsServices = new AuthServices(Users)

const schema = yup.object().shape({
  name: yup.string(),
})
module.exports = {
  async userLogin (request, response) {
    const { name } = request.body

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    try {
      const { token, dataEntite } = await authVendorsServices.signin(name)
      response.status(201).json({ auth: true, token, entite: dataEntite })
    } catch (error) {
      response.status(401).json({ auth: false, token: null, error: error.message })
    }
  }
}
