const { Model, DataTypes } = require('sequelize')

class Transactions extends Model {
    static init(sequelize) {
        super.init({
            type_operation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type_material: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price_kg: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            kgs: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            type_payment: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            sequelize,
            modelName: 'Transactions',
            tableName: 'transactions'
        })
    }

    static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: 'responsible_id',
            as: 'user_transactions'
        })
        this.belongsTo(models.Wallet, {
            foreignKey: 'wallet_id',
            as: 'wallet_transactions_user'
        })
    }
}

module.exports = { Transactions }
