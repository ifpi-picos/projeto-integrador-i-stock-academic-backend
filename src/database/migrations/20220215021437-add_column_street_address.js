'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.addColumn('address', 'street', {
            type: Sequelize.STRING,
            allowNull: true
        })
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.removeColumn('address', 'street')
    }
};
