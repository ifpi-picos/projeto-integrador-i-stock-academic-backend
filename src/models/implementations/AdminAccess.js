const { Model, DataTypes } = require('sequelize')

class AdminAccess extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Adminaccess',
      tableName: 'admin_access'
    })
  }
}

module.exports = { AdminAccess }
