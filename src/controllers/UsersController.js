const { Users } = require('../models')
const { UsersServices } = require('../services')
const yup = require('yup')

const usersServices = new UsersServices(Users)

module.exports = {
  async save(request, response) {
    const { name, wallet_id } = request.body

    const schema = yup.object().shape({
      name: yup.string(),
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ message: error.errors })
    }

    try {
      const user = await usersServices.create(
        name,
        wallet_id
      )

      return response.status(201).json(user)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async deleteById(request, response) {
    const { id } = request.params

    try {
      const user = usersServices.deleteById(id)

      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
