const { Router } = require('express')
const multer = require('multer')
const { MULTER } = require('../configs/upload')

const checkAuthorization = require('../middlewares/checkAuthorization')

const ProductsController = require('../controllers/ProductsController')
const ImageController = require('../controllers/ImageController')

const productsRoutes = Router()
const upload = multer(MULTER)

const productsController = new ProductsController()
const imageController = new ImageController()

productsRoutes.get('/', productsController.index)
productsRoutes.get('/:id', productsController.show)
productsRoutes.post(
  '/',
  checkAuthorization(['admin']),
  productsController.create
)
productsRoutes.put(
  '/:id',
  checkAuthorization(['admin']),
  productsController.update
)
productsRoutes.delete(
  '/:id',
  checkAuthorization(['admin']),
  productsController.delete
)
productsRoutes.patch(
  '/image/:product_id',
  checkAuthorization(['admin']),
  upload.single('image'),
  imageController.update
)

module.exports = productsRoutes
