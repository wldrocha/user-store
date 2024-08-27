import { Router } from 'express'
import { FileUploadController } from './controller'
import { FileUploadService } from '../services/upload-file.service'
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware'
import { TypeMiddleware } from '../middlewares/type.middleware'

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router()

    const fileUploadService = new FileUploadService()
    const controller = new FileUploadController(fileUploadService)
    // apply middleware for all routes
    router.use(FileUploadMiddleware.containFiles)
    router.use(TypeMiddleware.validTypes(['users', 'products', 'categories']))

    router.post('/single/:type', controller.uploadFile)
    router.post('/multiple/:type', controller.uploadMultipleFile)

    return router
  }
}
