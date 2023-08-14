import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Post()
  async register(@Body() data: RegisterUserDto) {
    return await this.userService.register(data);
  }
}
