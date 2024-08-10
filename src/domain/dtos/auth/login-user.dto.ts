import { regularExp } from '../../../config'

export class LoginUserDto {
  private constructor(public readonly email: string, public readonly password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object

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

    return [undefined, new LoginUserDto(email, password)]
  }
}
