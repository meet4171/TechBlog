import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class userLoginDto {
    @Transform(({ value }) => String(value))
    @IsString({ message: 'OTP must be a string' })
    otp: string;

    @IsString({ message: 'OTP must be a string' })
    @IsEmail()
    email: string;



}