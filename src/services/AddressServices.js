class AddressServices {
    constructor(Address) {
        this.address = Address
    }

    async saveAddress(dataAddress = {}) {
        try {

            console.log("userId: " + dataAddress.user_id);

            return await this.address.create(dataAddress)
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = { AddressServices }
