import { Request, Response } from 'express'
import { CustomError } from '../../domain'
import { FileUploadService } from '../services/upload-file.service'
import { UploadedFile } from 'express-fileupload'

export class FileUploadController {
  constructor(private readonly fileUploadFileService: FileUploadService) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }

  uploadFile = (req: Request, res: Response) => {
    const type = req.params.type
    const validTypes = ['users', 'products', 'categories']

    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: `Invalid type: ${type}, valid ones ${validTypes}` })
    }

    const files = req.files

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: 'No files were selected' })
    }

    const file = req?.files?.file as UploadedFile
    this.fileUploadFileService
      .uploadSingle(file, `uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res))
  }
  uploadMultipleFile = (req: Request, res: Response) => {
    res.json({ message: 'Files uploaded successfully' })
  }
}
