const AppError = require('../utils/AppError')

function checkAuthorization(roleToCheck) {
  return (req, res, next) => {
    const { role } = req.user

    if (!roleToCheck.includes(role)) {
      throw new AppError('auth/unauthorized', 401)
    }

    return next()
  }
}

module.exports = checkAuthorization
