import { Body, Controller, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuardLocal } from 'src/auth/guard/AuthGuardLocal.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService
  ) { }

  @UseGuards(AuthGuardLocal)
  @Post('login')
  login(@Request() req: ExpressRequest) {
    if (!req.user) throw new NotFoundException("user not found");
    return req.user;
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.signup(body);
    return user;

  }

}
