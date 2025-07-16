import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Request as ExpressRequest } from 'express';
import { Response as ExpressResponse } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/decorators/public.decorator';
import { JwtRefreshAuthGuard } from 'src/auth/guard/JwtRefreshAuthGuard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/enum/Roles.enum'
import { VerifySignupDto } from 'src/auth/dto/verify-singup.dto';
import { userLoginDto } from 'src/auth/dto/user-login.dto';
import { GoogleOauthGuard } from 'src/auth/guard/GooleAuthGuard.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }



  @Public()
  @Post('login')
  async handleLoginWithOtp(
    @Body('email') email: string,

  ): Promise<MailSent> {

    return await this.authService.login(email);

  }

  @Public()
  @Post('signup')
  async signup(
    @Body() body: {
      email: string;
      agreeToTerms: boolean;
    },
  ): Promise<MailSent> {
    if (!body.agreeToTerms) throw new InternalServerErrorException('Agree terms and conditions to go further')
    return await this.authService.signup(body.email);

  }

  @Public()
  @Post('login/resend-otp')
  async resendOtpForLogin(
    @Body('email') email: string,
  ): Promise<void> {
    await this.authService.login(email);

  }


  @Public()
  @Post('signup/verify')
  async verifyOtpAndSignup(
    @Body() user: VerifySignupDto,
    @Res({ passthrough: true }) res: ExpressResponse


  ) {
    const { otp, ...userData } = user;
    return this.authService.verifyOtpAndSignupUser(userData, user.otp, res)
  }


  @Public()
  @Post('login/verify')
  async verifyOtpAndLogin(
    @Body() cred: userLoginDto,
    @Res({ passthrough: true }) res: ExpressResponse

  ) {
    return this.authService.verifyOtpAndLoginUser(cred.email, cred.otp, res)
  }



  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  getref(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: ExpressResponse) {
    if (!req.user) throw new NotFoundException('user not found');
    const payload = req.user;
    const rawToken = req.cookies?.refresh_token;
    return this.authService.refresh(payload, rawToken, res);

  }

  @Roles(ROLES.ADMIN, ROLES.USER)
  @Get('admin')
  adm() {
    console.log('admin route')
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  async auth(@Req() req: ExpressRequest, @Res() res: ExpressResponse): Promise<void> {
    const google_token = req.cookies?.google_token;
    const is_valid_token = await this.authService.validateGoogleToken(google_token);
    if (is_valid_token) return res.redirect('/');
  }

  @Post('signout')
  signOut(@Req() req: ExpressRequest, @Res({ passthrough: true }) res: ExpressResponse) {
    const user = req.user;
    console.log(user)
    if (!user?.id) throw new NotFoundException('No user to logout');
    const userId = Number(user.id);
    return this.authService.signOut(userId, res);

  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google/redirect')
  googleRedirect(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    const user = req.user;
    if (!user) throw new NotFoundException('User not returned from Google');
    console.log('User from Google:', user);


    return res.json({ message: 'Login successful', user });
  }



}
