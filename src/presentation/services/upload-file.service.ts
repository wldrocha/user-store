import path from 'path'
import fs from 'fs'
import { UploadedFile } from 'express-fileupload'

export class FileUploadService {
  constructor() {}

  private checkFolder(folderPath: string): void {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    // validExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif']
  ) {
    try {
      const fileExtension = file.mimetype.split('/').at(1)

      const destination = path.resolve(__dirname, `../../../`, folder)
      this.checkFolder(destination)

      file.mv(`${destination}/my-file.${fileExtension}`)

      return { message: 'File uploaded successfully' }
    } catch (error) {
      console.log({ error })
    }
  }

  uploadMultiple(
    file: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif']
  ) {}
}
