import { Body, Controller, Get, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/decorators/public.decorator';
import { JwtRefreshAuthGuard } from 'src/auth/guard/JwtRefreshAuthGuard.guard';
import { LocalAuthGuard } from 'src/auth/guard/LocalAuthGuard.guard';
import { payloadExtractor } from 'src/utils/helper.function';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/enum/Roles.enum'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: ExpressRequest) {
    if (!req.user) throw new NotFoundException("user not found");
    const user = req.user;
    const payload = payloadExtractor(user as User);
    return this.authService.login(payload);
  }


  @Public()
  @Post('signup')
  async signup(@Body() userDto: CreateUserDto): Promise<LoginResTokens> {
    const user = await this.userService.signup(userDto);
    if (!user) throw new NotFoundException("user not found");
    const payload = payloadExtractor(user);
    return this.authService.login(payload);

  }

  @Get('test')
  get(@Request() req: ExpressRequest) {
    if (!req.user) throw new NotFoundException('user not found');
    const user = req.user;
    console.log(user);

  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('test-refresh')
  getref(@Request() req: ExpressRequest) {
    if (!req.user) throw new NotFoundException('user not found');
    const payload = req.user as GenerateJwtPayload;
    return this.authService.login(payload);

  }

  @Roles(ROLES.ADMIN, ROLES.USER)
  @Get('admin')
  adm() {
    console.log('admin route')
  }

}
