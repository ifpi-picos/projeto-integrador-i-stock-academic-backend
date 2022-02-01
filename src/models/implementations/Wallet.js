const { Model, DataTypes } = require("sequelize");

class Wallet extends Model {
    static init(sequelize) {
        super.init(
            {
                wallet_code: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Wallet",
                tableName: "wallet",
            }
        );
    }

    static associate(models) {
        this.hasOne(models.Users, {
            foreignKey: "wallet_id",
            as: "wallet",
        });
        this.hasMany(models.Transactions, {
            foreignKey: "wallet_id",
            as: "wallet_transactions",
        });
    }
}

module.exports = { Wallet };
