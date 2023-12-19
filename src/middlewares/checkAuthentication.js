const JWT = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function checkAuthentication(request, response, next) {
  const authHeader = request.headers

  if (!authHeader.cookie) {
    throw new AppError('auth/jwt-token-not-found', 401)
  }

  const [_, token] = authHeader.cookie.split('token=')

  try {
    const { role, sub: user_id } = JWT.verify(token, authConfig.jwt.secret)
    request.user = {
      id: Number(user_id),
      role,
    }
    return next()
  } catch (error) {
    console.error(error)
    throw new Error('auth/jwt-token-invalid', 401)
  }
}

module.exports = checkAuthentication
