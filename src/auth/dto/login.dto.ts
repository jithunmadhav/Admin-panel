
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
 
    @IsString()
    @MinLength(6)
    password: string;
}