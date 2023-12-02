const AuthJWT = {
  secret: process.env.AUTH_SECRET,
  expiresIn: '1d',
}

module.exports = AuthJWT
