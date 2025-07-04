import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreatePostDto {

    @IsString()
    slug: string;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    thumbnail?: string;

    @IsBoolean()
    published: boolean;

    @IsInt()
    authorId: number;


    @IsOptional()
    @IsArray()
    @IsString({ each: true }) 
    tags?: string[];
}


