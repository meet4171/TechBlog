import { IsString } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Transform } from 'class-transformer';

export class VerifySignupDto extends CreateUserDto {
    @Transform(({ value }) => String(value))
    @IsString({ message: 'OTP must be a string' })
    otp: string;
}