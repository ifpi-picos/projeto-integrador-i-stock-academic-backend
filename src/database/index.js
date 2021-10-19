const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

// Models
const { Users, Wallet, AdminAccess } = require('../models')

const connection = new Sequelize(dbConfig)

// Connections Models
Users.init(connection)
Wallet.init(connection)
AdminAccess.init(connection)

// Associations Models
Users.associate(connection.models)

module.exports = connection
