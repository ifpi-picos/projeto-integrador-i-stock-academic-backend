const { Wallet } = require('../models');
const { WalletServices } = require('../services')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')

const walletServices = new WalletServices(Wallet);
const responsesFactory = new ResponsesFactory()

module.exports = {
    async create(request, response) {
        try {
            const wallet = await walletServices.create();

            return response.status(201).json(responsesFactory.success(response.statusCode, wallet));
        } catch (error) {
            return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
        }
    },

    async getAllWallets(request, response) {
        try {
            const wallets = await walletServices.getAllWallets();

            return response.status(200).json(responsesFactory.success(response.statusCode, wallets));
        } catch (error) {
            return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
        }
    }
}