const { Model, DataTypes } = require('sequelize')

class Transactions extends Model {
    static init(sequelize) {
        super.init({
            type_operation: {
                type: DataTypes.ENUM('deposit', 'withdraw'),
                allowNull: false
            },
            type_material: {
                type: DataTypes.STRING,
                allowNull: true
            },
            price_kg: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            kgs: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            total_value: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            type_payment: {
                type: DataTypes.ENUM('pix', 'cash'),
                allowNull: true
            },
            responsible: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Transactions',
            tableName: 'transactions'
        })
    }

    static associate(models) {
        // this.belongsTo(models.Users, {
        //     foreignKey: 'responsible_id',
        //     as: 'user_transactions'
        // })
        this.belongsTo(models.Wallet, {
            foreignKey: 'wallet_id',
            as: 'wallet_transactions_user'
        })
    }
}

module.exports = { Transactions }
