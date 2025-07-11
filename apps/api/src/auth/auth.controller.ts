import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Request as ExpressRequest } from 'express';
import { Response as ExpressResponse } from 'express';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/decorators/public.decorator';
import { JwtRefreshAuthGuard } from 'src/auth/guard/JwtRefreshAuthGuard.guard';
import { payloadExtractor } from 'src/utils/helper.function';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/enum/Roles.enum'
import { ConfigService } from '@nestjs/config';
import { OtpService } from 'src/otp/otp.service';
import { MailService } from 'src/mailer/mailer.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly mailService: MailService
  ) { }



  @Public()
  @Post('login')
  async login(
    @Body('email') email: string,
    @Res({ passthrough: true }) res: ExpressResponse

  ): Promise<void> {

    const user = await this.userService.findByEmail(email)
    if (!user) throw new NotFoundException("User with Email does not Exists");
    await this.otpService.sendOtp(user.email);

  }

  @Public()
  @Post('verify-otp')
  async verifyAngLoginUser(
    @Body() body: SendOtp,
    @Res({ passthrough: true }) res: ExpressResponse


  ) {
    const otp = String(body.otp);
    const otpIsValid = await this.otpService.verifyOtp({ email: body.email, otp });
    if (!otpIsValid) throw new BadRequestException('Invalid or expired OTP');

    const user = await this.userService.findByEmail(body.email);
    if (!user) throw new NotFoundException("user not foundl");
    const payload = { id: user.id, email: user.email, role: user.role };
    const tokens = await this.authService.login(payload);

    const cookie_expire = Number(this.configService.get<string>('COOKIE_EXPIRE_TIME'));
    const NODE_ENV = this.configService.get<string>('NODE_ENV');


    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/',
      maxAge: cookie_expire,
    });

    return { id: tokens.id, access_token: tokens.access_token }


  }

  @Public()
  @Post('signup')
  async signup(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: ExpressResponse
  ): Promise<AuthResponse> {

    const cookie_expire = Number(this.configService.get<string>('COOKIE_EXPIRE_TIME'));
    const NODE_ENV = this.configService.get<string>('NODE_ENV');


    const user = await this.userService.signup(userDto);
    if (!user) throw new NotFoundException("user not found");

    const payload = payloadExtractor(user);
    const tokens = await this.authService.login(payload);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: cookie_expire,
    });

    return { id: tokens.id, access_token: tokens.access_token }


  }

  @Get('test')
  get(@Req() req: ExpressRequest) {
    if (!req.user) throw new NotFoundException('user not found');
    const user = req.user;
    console.log(user);

  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('test-refresh')
  getref(@Req() req: ExpressRequest) {
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
