const { Router } = require('express')
const CategoriesController = require('../controllers/CategoriesController')

const categoriesRoutes = Router()

const categoriesController = new CategoriesController()

categoriesRoutes.post('/', categoriesController.create)
categoriesRoutes.put('/:id', categoriesController.update)
categoriesRoutes.delete('/:id', categoriesController.delete)

module.exports = categoriesRoutes
