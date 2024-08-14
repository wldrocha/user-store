import { Request, Response } from 'express'
import { CreateCategoryDto, CustomError, PaginationDto } from '../../domain'

export class ProductController {
  constructor(
    // private readonly productService: ProductService
) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log('🚀 ~ AuthController ~ error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }

  getProducts = (req: Request, res: Response) => {
    //     const { page = 1, limit = 10 } = req.query

    //     const [error, paginationDto] = PaginationDto.create(Number(page), Number(limit))
    //     if (error)  return res.status(400).json({ error })

    //     this.categoryService
    //       .listCategories(paginationDto!)
    //       .then((categories) => res.json(categories))
    //       .catch((error) => this.handleError(error, res))
    //   }

    return res.json({ message: 'Get products' })
  }

  createProduct = (req: Request, res: Response) => {
    res.json({ message: 'Create product' })
  }
}
