const { Model, DataTypes } = require('sequelize')

class Wallet extends Model {
  static init (sequelize) {
    super.init({
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      wallet_code: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.NUMBER,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Wallet',
      tableName: 'wallet'
    })
  }

  static associate (models) {
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user_wallet'
    })
  }
}

module.exports = { Wallet }
