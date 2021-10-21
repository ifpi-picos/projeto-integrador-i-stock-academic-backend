const { Model, DataTypes } = require('sequelize')

class Users extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      wallet_id: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'Users',
      tableName: 'users'
    })
  }

  static associate(models) {
    this.hasOne(models.Wallet, {
      foreignKey: 'wallet_id',
      as: 'user_wallet'
    })
  }
}

module.exports = { Users }
