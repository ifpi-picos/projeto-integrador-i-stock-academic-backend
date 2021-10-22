const { Users } = require('../models')
const { UsersServices } = require('../services')
const yup = require('yup')

const usersServices = new UsersServices(Users)

module.exports = {
  async save(request, response) {
    const { name, wallet_id, phone, email, password, is_admin } = request.body

    const schema = yup.object().shape({
      name: yup.string('Nome deve ser do tipo string!'),
      phone: yup.string('Telefone deve ser do tipo string!'),
      wallet_id: yup.number('Id da carteira deve ser do tipo numerico!').integer('Id da carteira deve ser do tipo númerico inteiro!'),
      email: yup.string().email('Email deve ser válido!'),
      password: yup.string('A senha deve string!'),
      is_admin: yup.boolean('Admin deve ser booleano!')
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ message: error.errors })
    }

    try {
      const user = await usersServices.create({
        name,
        wallet_id,
        phone,
        email,
        password,
        is_admin
      })

      delete user.password
      delete user.wallet_id

      return response.status(201).json(user)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getAllUsers(request, response) {
    try {
      const users = await usersServices.getAllUsers();

      response.status(200).json(users);
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
