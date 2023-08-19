import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { sign as createJWT } from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async register(data: RegisterUserDto) {
    const user = new User();
    const gravatar = `https://secure.gravatar.com/avatar/${Math.ceil(
      Math.random() * 100,
    )}?s=164&d=identicon`;
    user.gravatar = gravatar;
    const userFromDb = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (userFromDb)
      throw new ConflictException('User with that username already exist');
    const newUser = await this.userRepository.save(Object.assign(user, data));
    return {
      token: createJWT(
        { id: newUser.id, username: newUser.username },
        process.env.JWT_SECRET,
      ),
      user: newUser,
    };
  }

  async findAll() {
    return await this.userRepository.find({ select: ['id', 'username'] });
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException(
        'The user with that id dose not exist',
        HttpStatus.NOT_FOUND,
      );
    delete user.password;
    return user;
  }
}
