import { CustomError, RegisterUserDto } from '../../config'
import { UserModel } from '../../data'

export class AuthService {
  constructor() {}
  registerUser = async (registerUserDto: RegisterUserDto) => {
    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) throw CustomError.badRequest('User already exists')

    return 'todo ok'
  }
}
