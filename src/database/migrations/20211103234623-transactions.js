'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.createTable('transactions', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            type_operation: {
                type: Sequelize.ENUM('deposit', 'withdraw'),
                allowNull: false
            },
            type_material: {
                type: Sequelize.STRING,
                allowNull: true
            },
            price_kg: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },
            kgs: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },
            total_value: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            type_payment: {
                type: Sequelize.ENUM('pix', 'cash'),
                allowNull: true
            },
            responsible_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            wallet_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'wallet',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.dropTable('transactions')
    }
};
