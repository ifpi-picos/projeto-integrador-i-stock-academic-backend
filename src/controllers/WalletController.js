const { Wallet, Users } = require('../models');
const { WalletServices, UsersServices } = require('../services')

const walletService = new WalletServices(Wallet);
const usersService = new UsersServices(Users);

module.exports = {
  async create(request, response) {
    try {
      const wallet = await walletService.create();

      return response.status(201).json({ wallet });
    } catch (error) {
      return response.status(400).json({ error })
    }
  },

  async bindUserWallet(request, response) {
    const { name, phone, email, wallet_id } = request.body

    try {
      const user_wallet = await usersService.create({
        name,
        phone,
        email,
        wallet_id,
        is_admin: false
      })

      return response.status(201).json({ user_wallet })
    } catch (error) {

    }
  },

  async getAllWallets(request, response) {
    try {
      const wallets = await walletService.getAllWallets();

      return response.status(200).json(wallets);
    } catch (error) {
      return response.status(400).json({ error })
    }
  },

  async addBalance(request, response) {
    try {
      const { balance, walletId } = request.body

      const wallet = await walletService.addBalance(balance, walletId)

      return response.status(201).json(wallet)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }
}