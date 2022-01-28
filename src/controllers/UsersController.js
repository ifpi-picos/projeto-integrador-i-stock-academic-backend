const { Users } = require('../models')
const { UsersServices } = require('../services')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')
const yup = require('yup')
const { cpf, cnpj } = require('cpf-cnpj-validator')

const usersServices = new UsersServices(Users)
const responsesFactory = new ResponsesFactory()

module.exports = {
    async save(request, response) {
        const {
            name,
            nickname,
            phone,
            email,
            type_key_pix,
            key_pix,
            cpf_or_cnpj,
            password,
            wallet_id,
            is_admin
        } = request.body

        const schema = yup.object().shape({
            name: yup.string('Nome deve ser do tipo string!'),
            nickname: yup.string('Apelido deve ser do tipo string!'),
            phone: yup.string('Telefone deve ser do tipo string!'),
            email: yup.string().email('Email deve ser válido!'),
            key_pix: yup.string('key_pix deve ser do tipo string!'),
            cpf_or_cnpj: yup.string('CPF deve ser do tipo string!'),
            password: yup.string('A senha deve string!'),
            wallet_id: yup.number('wallet_id deve ser númerico!').integer('wallet_id deve ser inteiro!'),
            is_admin: yup.boolean('Admin deve ser booleano!')
        })

        try {
            const validKeyPix = ['cpf/cnpj', 'phone', 'email', 'randomKey']

            if (type_key_pix && !validKeyPix.includes(type_key_pix)) {
                throw new Error(`Os tipos de chaves válidos são ${validKeyPix}`)
            }

            await schema.validate(request.body, { abortEarly: false })

            let cpf_or_cnpj_validate = null;

            if (cpf_or_cnpj && cpf_or_cnpj.length > 14) {
                cpf_or_cnpj_validate = cnpj.isValid(cpf_or_cnpj)
            } else {
                cpf_or_cnpj_validate = cpf.isValid(cpf_or_cnpj)
            }

            if (cpf_or_cnpj_validate === false) {
                throw new Error('CPF/CNPJ inválido!')
            }
        } catch (error) {
            return response.status(400).json(responsesFactory.error(response.statusCode, { ...error.errors }, error.message))
        }

        try {
            const user = await usersServices.create({
                name,
                nickname,
                phone,
                email,
                type_key_pix,
                key_pix,
                cpf_or_cnpj,
                password,
                wallet_id,
                is_admin: is_admin || false
            })

            delete user.password
            delete user.wallet_code

            return response.status(201).json(responsesFactory.success(response.statusCode, user))
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
