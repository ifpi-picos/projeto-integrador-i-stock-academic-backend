class TransactionServices {
    constructor (transaction) {
        this.transaction = transaction
    }

    async saveTransaction(dataTransaction = {}) {
        try {
            return await this.transaction.create(dataTransaction)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getTransactions(wallet_id) {
        try {
            return await this.transaction.findAll({ where: {wallet_id}})
        } catch (error) {
            throw new Error(error)
        }
    }

    async getBalance(wallet_id) {
        try {
            const transaction = await this.transaction.findAll({ where: { wallet_id } })

            var balance = 0;

            transaction.forEach((element, index, transactions) => {
                let type_operation = transactions[index].type_operation
                let value = transactions[index].price_kg * transactions[index].kgs
                switch (type_operation) {
                    case "withdraw":
                        balance -= value;
                        break;
                    case "deposit":
                        balance += value;
                        break;
                    default:
                        break;
                }
            })


            return { "balance": balance };
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = { TransactionServices }
