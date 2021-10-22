const { Model, DataTypes } = require('sequelize')

class Wallet extends Model {
  static init (sequelize) {
    super.init({
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      wallet_id: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'Wallet',
      tableName: 'wallet'
    })
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'walletId',
      as: 'user_wallet'
    })
  }
}

module.exports = { Wallet }
