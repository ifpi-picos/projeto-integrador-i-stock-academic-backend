const { Wallet, Users } = require('../models');
const { WalletServices, UsersServices } = require('../services')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')

const usersServices = new UsersServices(Users);
const walletServices = new WalletServices(Wallet, usersServices);
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

  async bindUserWallet(request, response) {
    const { user_id, wallet_id } = request.body

    try {
      const user_wallet = await walletServices.bindUserWallet({ user_id, wallet_id })

      return response.status(201).json(responsesFactory.success(response.statusCode, user_wallet))
    } catch (error) {
      console.log(error)
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
  },

  async addBalance(request, response) {
    try {
      const { balance, walletId } = request.body

      const wallet = await walletServices.addBalance(balance, walletId)

      return response.status(201).json(responsesFactory.success(response.statusCode, wallet))
    } catch (error) {
      return response.status(400).json(responsesFactory.error(response.statusCode, error.data, error.message))
    }
  }
}