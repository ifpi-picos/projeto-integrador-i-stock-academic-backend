const { Wallet, Users } = require('../models');
const { WalletServices, UsersServices } = require('../services')

const walletService = new WalletServices(Wallet);
const usersService = new UsersServices(Users);

module.exports = {
  async create (request, response) {
    try {
      const { balance, name, email, phone } = request.body

      if(!name) {
        return response.status(400).json('invalid name!')
      }
      const wallet = await walletService.create(balance);

      const user = await usersService.create({ name: name, email: email, phone: phone, wallet_id: wallet.id, is_admin: false });

      return response.status(201).json({ user, wallet });
    } catch (error) {
      return response.status(400).json({ error })
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