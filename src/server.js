require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { UPLOADS_FOLDER } = require('./configs/upload')
const routes = require('./routes')
const AppError = require('./utils/AppError')

const api = express()
api.use(express.json())
api.use(cookieParser())

api.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)
api.use('/images', express.static(UPLOADS_FOLDER))
api.use(routes)

api.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.error(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

const PORT = process.env.PORT
api.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
