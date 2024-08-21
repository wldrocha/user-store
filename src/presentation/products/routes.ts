import { Router } from 'express'
import { ProductController } from './controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { ProductService } from '../services'



export class ProductsRoutes {
  static get routes(): Router {
    const router = Router()

    const productService = new ProductService()
    const controller = new ProductController(productService)

    router.get('/', controller.getProducts)
    router.post('/', [AuthMiddleware.validateJWT], controller.createProduct)
    // router.put('/:id', controller.updateCategory)
    // router.delete('/:id', controller.deleteCategory)

    return router
  }
}
