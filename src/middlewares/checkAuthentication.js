const JWT = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const AuthJWT = require('../configs/auth')

function checkAuthentication(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token not found', 401)
  }

  const [_, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = JWT.verify(token, AuthJWT.secret)
    request.user = {
      id: Number(user_id),
    }
    return next()
  } catch (error) {
    console.error(error)
    throw new Error('JWT Token invalid', 401)
  }
}

module.exports = checkAuthentication
