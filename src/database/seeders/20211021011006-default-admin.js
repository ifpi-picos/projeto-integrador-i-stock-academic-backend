'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      phone: '(99) 9 9999-9999',
      email: 'leaf.reciclagem@reci.leaf.com',
      password: '$2b$08$ijKBxsekzUJs1DE2fWKeGuOwqCt7DkaOKKoPJD4kFmFbEyyZoLYGq', // Lea@fadm1n
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
