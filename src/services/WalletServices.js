const { v4 } = require('uuid')

class WalletServices {
    constructor(Wallet) {
        this.wallet = Wallet
    }

    async create() {
        try {
            const dataWallet = { wallet_code: v4(), balance: 0 }

            const wallet = await this.wallet.create(dataWallet)

            return wallet
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllWallets() {
        try {
            const wallets = await this.wallet.findAll()

            return wallets
        } catch (error) {
            throw new Error(error)
        }
    }

    async getByIdOrWalletId(identify) {
        try {
            if (typeof identify === 'number') {
                return await this.wallet.findByPk(identify)
            }

            return this.wallet.findOne({ where: { wallet_code: identify } })
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = { WalletServices }
