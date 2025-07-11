import { IsEnum, IsOptional, IsString } from "class-validator";
import { ROLES } from "src/enum/Roles.enum";

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

    @IsEnum(ROLES, { message: 'Role must be a valid enum value' })
    @IsOptional()
    role?: ROLES;

}


