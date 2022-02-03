const bcrypt = require('bcrypt')
const SALT = 8
const { Wallet, Transactions } = require('../models')
class UsersServices {
    constructor(Users) {
        this.users = Users
    }

    async create(dataUser = {}) {
        try {
            const userExists = await this.getByEmail(dataUser.email)

            if (userExists) throw new Error('Usuário já cadastrado!')

            if (dataUser.is_admin) {
                if (!dataUser.password || !dataUser.email) {
                    throw new Error('Admin deve ter email e senha!')
                }

                dataUser.password = bcrypt.hashSync(dataUser.password, SALT)
            } else if (!dataUser.name) {
                throw new Error('Usuário não pode ser salvo sem nome!')
            }

            return await this.users.create(dataUser)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllUsers() {
        try {
            const users = await this.users.findAll({
                attributes: ['id', 'name', 'email', 'phone'],
                where: { is_admin: false },
                include: [{
                    model: Wallet,
                    association: 'wallet',
                    attributes: ['id', 'wallet_code'],
                    include: [{
                        model: Transactions,
                        association: 'wallet_transactions',
                        attributes: ['type_operation', 'total_value']
                    }]
                }]
            });

            return users;
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateDataUser(userId, data) {
        try {
            return await this.users.update({ ...data }, {
                where: { id: userId }
            })
        } catch (error) {
            throw error
        }
    }

    async getByPk(id) {
        try {
            const user = await this.users.findByPk(id)

            if (!user) {
                throw new Error('Users does not Exists!')
            }

            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    async getByEmail(email) {
        try {
            if (!email) return

            return await this.users.findOne({ where: { email } })
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        try {
            const user = await this.getByPk(id)

            if (!user) {
                throw new Error('User does not exists!')
            }

            return await this.users.destroy({
                where: { id }
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = { UsersServices }
