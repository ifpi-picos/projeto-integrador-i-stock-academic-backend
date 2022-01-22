const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

// Models
const { Users, Wallet, Address } = require('../models')

const connection = new Sequelize(dbConfig)

// Connections Models
Users.init(connection)
Wallet.init(connection)
Address.init(connection)

// Associations Models
Users.associate(connection.models)
Wallet.associate(connection.models)
Address.associate(connection.models)

module.exports = connection
