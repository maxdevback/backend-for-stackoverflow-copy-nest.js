import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
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
    return this.userService.getById(+id);
  }
  @Post()
  async register(@Body() data: RegisterUserDto, @Res() res: Response) {
    const dataFromService = await this.userService.register(data);
    res.setHeader('x-auth-token', dataFromService.token);
    res.send(dataFromService.user);
  }
}
