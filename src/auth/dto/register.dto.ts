
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsString()
    @MinLength(6)
    password: string;
}