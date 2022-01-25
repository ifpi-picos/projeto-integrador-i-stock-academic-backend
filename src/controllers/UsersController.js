const { Users, Address } = require('../models')
const { UsersServices, AddressServices } = require('../services')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')
const yup = require('yup')
const { cpf, cnpj } = require('cpf-cnpj-validator')

const usersServices = new UsersServices(Users)
const addressServices = new AddressServices(Address);
const responsesFactory = new ResponsesFactory()

module.exports = {
  async save(request, response) {
    const { name, nickname, cpf_or_cnpj, phone, email, password, is_admin } = request.body

    const schema = yup.object().shape({
      name: yup.string('Nome deve ser do tipo string!'),
      nickname: yup.string('Apelido deve ser do tipo string!'),
      cpf_or_cnpj: yup.string('CPF deve ser do tipo string!'),
      phone: yup.string('Telefone deve ser do tipo string!'),
      email: yup.string().email('Email deve ser válido!'),
      password: yup.string('A senha deve string!'),
      is_admin: yup.boolean('Admin deve ser booleano!')
    })

    try {
      await schema.validate(request.body, { abortEarly: false })

      let cpf_or_cnpj_validate = null;

      if (cpf_or_cnpj.length > 14) {
        cpf_or_cnpj_validate = cnpj.isValid(cpf_or_cnpj)
      } else {
        cpf_or_cnpj_validate = cpf.isValid(cpf_or_cnpj)
      }

      if (cpf_or_cnpj_validate === false) {
        return response.status(403).json({ message: 'CPF/CNPJ inválido!' })
      }
    } catch (error) {
      return response.status(400).json(responsesFactory.error(response.statusCode, { ...error.errors }))
    }

    try {
      const user = await usersServices.create({
        name,
        nickname,
        cpf_or_cnpj,
        phone,
        email,
        password,
        is_admin: is_admin ? is_admin : false
      })

      delete user.password
      delete user.wallet_code

      return response.status(201).json(responsesFactory.success(response.statusCode, user))
    } catch (error) {
      return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
    }
  },

  async saveAddress(request, response) {
    try {
      const { zip_code, state, city, district, public_place, complement, number, user_id } = request.body;

      const schema = yup.object().shape({
        zip_code: yup.string('CEP deve ser do tipo string!'),
        state: yup.string('Estado deve ser do tipo string!'),
        city: yup.string('Cidade deve ser do tipo string!'),
        district: yup.string('Bairro deve ser do tipo string!'),
        public_place: yup.string('Rua deve ser do tipo string!'),
        complement: yup.string('complemento deve ser do tipo string!'),
        number: yup.string('O número deve ser do tipo string!'),
        user_id: yup.number('User_id deve ser do tipo number')
      })

      try {
        await schema.validate(request.body, { abortEarly: false })
      } catch (error) {
        return response.status(400).json(responsesFactory.error(response.statusCode, { ...error.errors }, error.message))
      }

      try {
        const address = await addressServices.saveAddress({
          zip_code,
          state,
          city,
          district,
          public_place,
          complement,
          number,
          user_id
        })

        return response.status(201).json(responsesFactory.success(response.statusCode, address))
      } catch (error) {
        return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
      }

    } catch (error) {
      return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
    }
  },

  async getAllUsers(request, response) {
    try {
      const users = await usersServices.getAllUsers();

      response.status(200).json(responsesFactory.success(response.statusCode, users));
    } catch (error) {
      return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
    }
  },

  async deleteById(request, response) {
    const { id } = request.params

    try {
      const user = usersServices.deleteById(id)

      return response.status(200).json(responsesFactory.success(response.statusCode, user))
    } catch (error) {
      return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
    }
  }
}
