const { Model, DataTypes } = require('sequelize')

class Users extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      wallet_id: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    }, {
      sequelize,
      modelName: 'Users',
      tableName: 'users'
    })
  }

  static associate (models) {
    this.hasOne(models.Wallet, {
      foreignKey: 'wallet_id',
      as: 'user_wallet'
    })
  }
}

module.exports = { Users }
