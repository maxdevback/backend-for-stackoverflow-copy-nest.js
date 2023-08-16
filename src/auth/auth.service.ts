import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sign as createJWT } from 'jsonwebtoken';
import { compare as comparePassword } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(data: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      where: { username: data.username },
    });
    if (!user)
      throw new HttpException(
        'The user with that username dose not found',
        HttpStatus.NOT_FOUND,
      );
    if (await comparePassword(data.password, user.password)) {
      return {
        token: createJWT(
          { username: user.username, id: user.id },
          process.env.JWT_SECRET,
        ),
        user,
      };
    } else {
      throw new HttpException(
        'The password is wrong',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
