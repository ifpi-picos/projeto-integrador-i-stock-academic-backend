const { Address } = require('../models')
const { AddressServices } = require('../services')
const yup = require('yup')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')

const addressServices = new AddressServices(Address);
const responsesFactory = new ResponsesFactory()

module.exports = {
    async saveAddress(request, response) {
        try {
            const {
                zip_code,
                state,
                city,
                district,
                public_place,
                complement,
                number,
                user_id,
                street
            } = request.body;

            const schema = yup.object().shape({
                zip_code: yup.string('CEP deve ser do tipo string!').required('O campo zip_code é requerido!'),
                state: yup.string('Estado deve ser do tipo string!').required('O campo state é requerido!'),
                city: yup.string('Cidade deve ser do tipo string!').required('O campo city é requerido!'),
                district: yup.string('Bairro deve ser do tipo string!').required('O campo district é requerido!'),
                public_place: yup.string('Rua deve ser do tipo string!').required('O campo public place é requerido!'),
                complement: yup.string('complemento deve ser do tipo string!'),
                number: yup.string('O número deve ser do tipo string!'),
                user_id: yup.number('User_id deve ser do tipo number').required('O campo user_id é requerido!'),
                street: yup.string('O campo street deve ser do tipo string!')
            })

            try {
                await schema.validate(request.body, { abortEarly: false })
            } catch (error) {
                return response.status(400).json(responsesFactory.error(response.statusCode, { errors: error.errors }, error.message))
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
                    user_id,
                    street
                })

                return response.status(201).json(responsesFactory.success(response.statusCode, address))
            } catch (error) {
                return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
            }

        } catch (error) {
            return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
        }
    }
}