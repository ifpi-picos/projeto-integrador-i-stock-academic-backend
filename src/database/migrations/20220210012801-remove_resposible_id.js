'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.removeColumn('transactions', 'responsible_id')
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.addColumn('transactions', 'responsible_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    }
};
