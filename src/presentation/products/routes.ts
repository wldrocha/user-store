import { Router } from 'express'
import { ProductController } from './controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'



export class ProductsRoutes {
  static get routes(): Router {
    const router = Router()

    const controller = new ProductController()

    router.get('/', controller.getProducts)
    router.post('/', [AuthMiddleware.validateJWT], controller.createProduct)
    // router.put('/:id', controller.updateCategory)
    // router.delete('/:id', controller.deleteCategory)

    return router
  }
}
