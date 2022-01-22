const { v4 } = require('uuid')

class WalletServices {
  constructor (Wallet, userServices) {
    this.wallet = Wallet
    this.userServices = userServices
  }

  async bindUserWallet (props) {
    try {
      const user = await this.userServices.getByPk(props.user_id)

      if (!user) {
        throw new Error('Usuário não existe!')
      }

      return await this.wallet.update(
        { user_id: user.id },
        {
          where: { id: props.wallet_id }
        }
      )
    } catch (error) {
      throw new Error(error)
    }
  }

  async create () {
    try {
      const dataWallet = { wallet_code: v4(), balance: 0 }

      const wallet = await this.wallet.create(dataWallet)

      return wallet
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAllWallets () {
    try {
      const wallets = await this.wallet.findAll()

      return wallets
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByIdOrWalletId (identify) {
    try {
      if (typeof identify === 'number') {
        return await this.wallet.findByPk(identify)
      }

      return this.wallet.findOne({ where: { wallet_code: identify } })
    } catch (error) {
      throw new Error(error)
    }
  }

  async addBalance (balance, walletId) {
    try {
      const wallet = await this.wallet.findByPk(walletId)

      return await wallet.update({ balance: balance })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { WalletServices }
