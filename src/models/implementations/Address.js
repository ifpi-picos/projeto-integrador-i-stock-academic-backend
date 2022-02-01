const { Model, DataTypes } = require('sequelize')

class Address extends Model {
    static init(sequelize) {
        super.init({
            zip_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            district: {
                type: DataTypes.STRING,
                allowNull: false
            },
            public_place: {
                type: DataTypes.STRING,
                allowNull: false
            },
            complement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            number: {
                type: DataTypes.STRING,
                allowNull: true
            },
        }, {
            sequelize,
            modelName: 'Address',
            tableName: 'address'
        })
    }

    static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: 'user_id',
            as: 'user_address'
        })
    }
}

module.exports = { Address }
