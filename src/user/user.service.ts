import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
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
    return await this.userRepository.save(Object.assign(user, data));
  }

  async findAll() {
    return await this.userRepository.find({ select: ['id', 'username'] });
  }

  async findOne(id: number) {
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
