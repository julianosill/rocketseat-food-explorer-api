const { Router } = require('express')
const ProductsController = require('../controllers/ProductsController')

const productsRoutes = Router()

const productsController = new ProductsController()

productsRoutes.post('/', productsController.create)
productsRoutes.put('/:id', productsController.update)
productsRoutes.delete('/:id', productsController.delete)

module.exports = productsRoutes
