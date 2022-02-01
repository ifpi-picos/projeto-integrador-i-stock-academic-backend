const { Transactions } = require('../models');
const { TransactionServices } = require('../services')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')

const transactionServices = new TransactionServices(Transactions);
const responsesFactory = new ResponsesFactory()

module.exports = {
    async saveTransaction(request, response) {
        try {
            const { type_operation, type_material, price_kg, kgs, type_payment, responsible_id, wallet_id } = request.body

            const wallet = await transactionServices.saveTransaction({ type_operation, type_material, price_kg, kgs, type_payment, responsible_id, wallet_id })

            return response.status(201).json(responsesFactory.success(response.statusCode, wallet))
        } catch (error) {
            return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
        }
    }
}