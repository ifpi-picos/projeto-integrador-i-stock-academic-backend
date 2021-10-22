class WalletServices {
  constructor (Wallet) {
    this.wallet = Wallet
  }

  async create (balance) {
    try {
      const dataWallet = { balance };

      return await this.wallet.create(dataWallet);
    } catch (error) {
      throw new Error(error);
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
}

module.exports = { WalletServices };
