const { v4 } = require('uuid')

class WalletServices {
  constructor (Wallet) {
    this.wallet = Wallet
  }

  async create (balance) {
    try {
      const dataWallet = { wallet_id: v4(), balance };

      return await this.wallet.create(dataWallet);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllWallets() {
    try {
      const wallets = await this.wallet.findAll();

      return wallets;
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByIdOrWalletId (identify) {
    try {
      if (typeof identify === "number")
        return await this.wallet.findByPk(identify);

      return this.wallet.findOne({ where: { wallet_id: identify } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addBalance(balance, walletId) {
    try {
      const wallet = await this.wallet.findByPk(walletId);

      return await wallet.update({ balance: balance });
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { WalletServices };
