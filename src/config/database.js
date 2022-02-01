// Config dotenv
const pathEnvFile = process.env.NODE_ENV === 'test' ?
    '.env.test' : process.env.NODE_ENV === 'dev' ?
    '.env.dev' : '.env'

require('dotenv').config({
    path: pathEnvFile
})

module.exports = {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABSE_PASSWORD,
    database: process.env.DATABASE_NAME,
    define: {
        timestamps: true,
        underscored: true
    }
}
