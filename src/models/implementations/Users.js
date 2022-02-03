const { Model, DataTypes } = require('sequelize')

class Users extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            type_key_pix: {
                type: DataTypes.ENUM('email', 'phone', 'cpf/cnpj', 'random'),
                allowNull: true
            },
            key_pix: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cpf_or_cnpj: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_photo: {
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
        this.belongsTo(models.Wallet, {
            foreignKey: 'wallet_id',
            as: 'wallet'
        })
        this.hasOne(models.Address, {
            foreignKey: 'user_id',
            as: 'address'
        })
        this.belongsToMany(models.Transactions, {
            through: 'transaction_responsible',
            foreignKey: 'responsible_id',
            as: 'transactions'
        })
    }
}

module.exports = { Users }
