// Config dotenv
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const authMiddleware = require('./middlewares/authMiddleware')
require('./database')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,PUT,POST,OPTIONS, DELETE, PATCH',
    allowedHeaders: 'Accept, Content-Type, Authorization'
}))

app.all('/api/*', (request, response, next) => {
    const publicRoutes = process.env.PUBLIC_ROUTES.split(' ')

    if (publicRoutes.includes(request.path)) {
        return next()
    }

    authMiddleware(request, response, next)
})

app.use('/api', routes)

module.exports = app
