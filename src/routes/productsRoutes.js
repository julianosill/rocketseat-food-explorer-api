const { Router } = require('express')
const multer = require('multer')
const { MULTER } = require('../configs/upload')

const ProductsController = require('../controllers/ProductsController')

const productsRoutes = Router()
const upload = multer(MULTER)

const productsController = new ProductsController()

productsRoutes.post('/', upload.single('image'), productsController.create)
productsRoutes.put('/:id', productsController.update)
productsRoutes.delete('/:id', productsController.delete)

module.exports = productsRoutes
