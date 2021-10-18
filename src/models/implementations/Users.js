const { Model, DataTypes } = require('sequelize')

class Users extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    }, {
      sequelize,
      modelName: 'Users',
      tableName: 'users'
    })
  }

  // static associate (models) {
  //   this.hasMany(models.Vendors, {
  //     foreignKey: 'pharmacy_id',
  //     as: 'parmacy_vendors'
  //   })

  //   this.hasMany(models.Sales, {
  //     foreignKey: 'pharmacy_id',
  //     as: 'pharmacy_sale'
  //   })

  //   this.hasMany(models.Medicines, {
  //     foreignKey: 'pharmacy_id',
  //     as: 'pharmacy_medicines'
  //   })
  // }
}

module.exports = { Users }
