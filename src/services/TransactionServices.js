class TransactionServices {
    constructor(transaction) {
        this.transaction = transaction
    }

    async saveTransaction(dataTransaction = {}) {
        try {

            console.log("userId: " + dataTransaction);

            return await this.transaction.create(dataTransaction)
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = { TransactionServices }
