class AddressServices {
    constructor(Address) {
        this.address = Address
    }

    async saveAddress(dataAddress = {}) {
        try {
            return await this.address.create(dataAddress)
        } catch (error) {
            throw error
        }
    }

    async getAddressByUserId(user_id) {
        try {
            return await this.address.findOne({ where: { user_id } })
        } catch (error) {
            throw error
        }
    }

    async changeAddress(user_id, data) {
        try {
            return await this.address.update({ ...data }, {
                where: { user_id }
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = { AddressServices }
