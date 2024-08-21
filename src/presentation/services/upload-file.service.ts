export class FileUploadService {
  constructor() {}

  private checkFolder(folderPath: string): void {
    throw new Error('Method not implemented.')
  }

  uploadSingle(file: any, folder: string = 'uploads', validExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif']) {}

  uploadMultiple(file: any[], folder: string = 'uploads', validExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif']) {}
}
