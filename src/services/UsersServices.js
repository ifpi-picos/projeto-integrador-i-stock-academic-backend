class UsersServices {
  constructor (Users) {
    this.users = Users
  }

  async create (name, wallet_id) {
    try {
      const dataUser = {
        name,
        wallet_id
      }

      return await this.users.create(dataUser)
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByPk (id) {
    try {
      const user = await this.users.findByPk(id)

      if (!user) {
        throw new Error('Users does not Exists!')
      }

      return pharmacie
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById (id) {
    try {
      const user = await this.getByPk(id)

      if (!user) {
        throw new Error('Pharmacie does not exists!')
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
