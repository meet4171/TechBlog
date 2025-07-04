import { IsEnum, IsOptional, IsString } from "class-validator";
import { Roles } from "src/enum/Roles.enum";

export class CreateUserDto {


    @IsString()
    @IsOptional()
    bio?: string

    @IsString()
    @IsOptional()
    avatar?: string

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;


    @IsEnum(Roles, { message: 'Role must be a valid enum value' })
    @IsOptional()
    role?: Roles;

}


