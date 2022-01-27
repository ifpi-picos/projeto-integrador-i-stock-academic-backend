const jwt = require('jsonwebtoken')
const authConfig = require('../config/authentication.json')
const { ResponsesFactory } = require('../helpers/ResponsesFactory')

const responsesFactory = new ResponsesFactory()

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json(responsesFactory.error(response.statusCode, null, 'No token provided'))
  }

  // Expected format token: Bearer <hash>
  const parts = authHeader.split(' ')

  if (!parts.length === 2) {
    return response.status(401).json(responsesFactory.error(response.statusCode, null, 'Token error'))
  }

  const [scheme, token] = parts

  // Verific if string init with Bearer
  if (!/^Bearer$/i.test(scheme)) {
    response.status(401).json(responsesFactory.error(response.statusCode, null, 'Token malformatted'))
  }

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) return response.status(401).json(responsesFactory.error(response.statusCode, null, 'Token invalid'))

    request.userId = decoded.id
    request.is_admin = decoded.is_admin
    return next()
  })
}
