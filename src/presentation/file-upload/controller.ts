import { Request, Response } from 'express'
import { CustomError } from '../../domain'

export class FileUploadController {
  constructor() {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log('🚀 ~ AuthController ~ error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }

  uploadFile = (req: Request, res: Response) => {
    console.log("🚀 ~ FileUploadController ~ req:", req.files)
    
    res.json({ message: 'File uploaded successfully' })
  }
  uploadMultipleFile = (req: Request, res: Response) => {
    res.json({ message: 'Files uploaded successfully' })
  }
}
