const { Wallet, Users } = require('../models');
const { WalletServices, UsersServices } = require('../services')

const usersServices = new UsersServices(Users);
const walletServices = new WalletServices(Wallet, usersServices);

module.exports = {
  async create(request, response) {
    try {
      const wallet = await walletServices.create();

      return response.status(201).json({ wallet });
    } catch (error) {
      return response.status(400).json({ error })
    }
  },

  async bindUserWallet(request, response) {
    const { user_id, wallet_id } = request.body

    try {
      const user_wallet = await walletServices.bindUserWallet({ user_id, wallet_id })

      return response.status(201).json({ user_wallet })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error })
    }
  },

  async getAllWallets(request, response) {
    try {
      const wallets = await walletServices.getAllWallets();

      return response.status(200).json(wallets);
    } catch (error) {
      return response.status(400).json({ error })
    }
  },

  async addBalance(request, response) {
    try {
      const { balance, walletId } = request.body

      const wallet = await walletServices.addBalance(balance, walletId)

      return response.status(201).json(wallet)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }
}