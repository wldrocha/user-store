import { Router } from 'express'
import { FileUploadController } from './controller'
import { FileUploadService } from '../services/upload-file.service'

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router()

    const fileUploadService = new FileUploadService()
    const controller = new FileUploadController(fileUploadService)

    router.post('/single/:type', controller.uploadFile)
    router.post('/multiple/:type', controller.uploadMultipleFile)

    return router
  }
}
