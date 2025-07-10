import { Body, Controller, Get, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guard/LocalAuthGuard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { login_res_tokens } from 'types/type';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuthGuard';
import { JwtRefreshAuthGuard } from 'src/auth/guard/JwtRefreshAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: ExpressRequest) {
    if (!req.user) throw new NotFoundException("user not found");
    return this.authService.login(req.user as User);
  }


  @Post('signup')
  async signup(@Body() userDto: CreateUserDto): Promise<login_res_tokens> {
    const user = await this.userService.signup(userDto);
    if (!user) throw new NotFoundException("user not found");
    return this.authService.login(user as User);

  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  get(@Request() req: ExpressRequest) {
    if (!req.user) throw new NotFoundException('user not found');
    console.log(req.user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('test-refresh')
  getref(@Request() req: ExpressRequest) {
    if (!req.user) throw new NotFoundException('user not found');
    console.log(req.user, 'refresh');
  }

}
