import { regularExp } from '../../../regular-exp'

export class RegisterUserDto {
  private constructor(public readonly name: string, public readonly email: string, public readonly password: string) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object

    if (!name) {
      return ['Missing name']
    }
    if (!email) {
      return ['Missing email']
    }
    if (!regularExp.email.test(email)) {
      return ['Invalid email']
    }
    if (!password) {
      return ['Missing password']
    }
    if (password.length < 6) {
      return ['Password must have at least 6 characters']
    }

    return [undefined, new RegisterUserDto(name, email, password)]
  }
}
