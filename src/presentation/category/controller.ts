import { Request, Response } from 'express'
import { CreateCategoryDto } from '../../domain'

export class CategoryController {
  constructor() {}
  //   private handleError = (error: unknown, res: Response) => {
  //     if (error instanceof CustomError) {
  //       return res.status(error.statusCode).json({ error: error.message })
  //     }
  //     console.log('🚀 ~ AuthController ~ error:', error)
  //     return res.status(500).json({ error: 'Internal server error' })
  //   }

  getCategories = (req: Request, res: Response) => {
    res.json({ message: 'Get categories' })
  }
  createCategory = (req: Request, res: Response) => {
    const createCategoryDto = CreateCategoryDto.create(req.body)

    res.json({ createCategoryDto })
  }
  updateCategory = (req: Request, res: Response) => {
    res.json({ message: 'Update category' })
  }
  deleteCategory = (req: Request, res: Response) => {
    res.json({ message: 'Delete category' })
  }
}
