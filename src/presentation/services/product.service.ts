import { ProductModel } from '../../data'
import { CreateProductDto, CustomError, PaginationDto } from '../../domain'

export class ProductService {
  constructor(
    // private readonly productService: ProductService
  ) {}
  async createProduct(createProductDto: CreateProductDto) {
    const productExist = await ProductModel.findOne({ name: createProductDto.name })
    if (productExist) throw CustomError.badRequest('Category already exists')

    try {
      const product = new ProductModel(createProductDto)

      await product.save()

      return product
    } catch (error) {
      throw CustomError.internalServer('Internal server error')
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto
    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          
          // .populate('user', 'name email role')
          // Todo delete thought virtual delete _id, pass and only show id and populate category and modify category response
      ])

      return {
        page,
        limit,
        total,
        next: (page - 1) * limit + products.length < total ? `/api/products?page=${page + 1}&limit=${limit}` : null,
        prev: page - 1 > 0 ? `api/products?page=${page - 1}&limit=${limit}` : null,
        products: products
      }
    } catch (error) {
      throw CustomError.internalServer('Internal server error')
    }
  }
}
