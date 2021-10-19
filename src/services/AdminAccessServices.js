const bcrypt = require('bcrypt')

const SALT = 8

class AdminAccessServices {
  constructor(AdminAccess) {
    this.admin = AdminAccess
  }

  async create(name, username, password) {
    try {
      const data_admin = {
        name,
        username,
        password: bcrypt.hashSync(password, SALT)
      }

      return await this.admin.create(data_admin)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findByPk(id) {
    try {
      if (!id) {
        throw new Error('O campo id não pode ser vazio!')
      }

      return await this.admin.findByPk(id)
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById(id) {
    try {
      const admin = await this.findByPk(id)

      if (!admin) {
        throw new Error('Não existe administrador com o id informado!')
      }

      const deleted = await this.admin.destroy({ where: { id } })

      return deleted
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { AdminAccessServices }