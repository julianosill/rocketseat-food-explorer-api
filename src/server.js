require('dotenv').config()
require('express-async-errors')

const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

const api = express()
api.use(express.json())
api.use(cookieParser)
api.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

const PORT = process.env.PORT
api.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
