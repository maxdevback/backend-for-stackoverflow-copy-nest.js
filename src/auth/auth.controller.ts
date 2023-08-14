import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IRequestWihUser } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  loadUser(@Req() req: IRequestWihUser) {
    return req.user;
  }

  @Post()
  async login(@Body() data: LoginAuthDto, @Res() res: Response) {
    const token = await this.authService.login(data);
    res.setHeader('x-auth-token', token);
    res.send('');
  }
}
