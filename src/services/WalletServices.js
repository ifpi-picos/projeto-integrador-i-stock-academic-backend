class WalletServices {
  constructor(Wallet) {
    this.wallet = Wallet
  }

  async create(balance) {
    try {
      const data_wallet = { balance }

      return await this.wallet.create(data_wallet)
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByIdOrWalletId(identify) {
    try {
      if (typeof identify === Number)
        return await this.wallet.findByPk(identify)

      return this.wallet.findOne({ where: { wallet_id: identify } })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { WalletServices }