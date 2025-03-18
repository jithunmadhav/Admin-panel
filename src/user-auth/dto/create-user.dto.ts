import { IsString, IsEmail, IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    mobile: number;

    @IsString()
    @MinLength(6)
    password: string;
}