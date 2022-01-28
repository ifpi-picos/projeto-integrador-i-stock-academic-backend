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
                type: Sequelize.STRING,
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
            type_payment: {
                type: Sequelize.STRING,
                allowNull: true
            },
            responsible_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
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
                unique: true,
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
