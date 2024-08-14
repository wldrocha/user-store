export class CreateCategoryDto {
  private constructor(public readonly name: string, public available: string) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false } = object
    if (!name) {
      return ['name is required']
    }
    let availableBoolean = available
    if (typeof availableBoolean !== 'boolean') {
      availableBoolean = available === 'true'
    }
    return [undefined, new CreateCategoryDto(name, availableBoolean)]
  }
}
