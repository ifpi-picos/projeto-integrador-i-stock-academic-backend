'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.addColumn('transactions', 'responsible', {
            type: Sequelize.STRING,
            allowNull: false
        });
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.removeColumn('transactions', 'responsible')
    }
};
