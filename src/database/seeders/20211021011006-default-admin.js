'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      phone: '(99) 9 9999-9999',
      email: 'leaf.reciclagem@reci.leaf.com',
      password: bcrypt.hashSync('Lea@fadm1n', 8),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
