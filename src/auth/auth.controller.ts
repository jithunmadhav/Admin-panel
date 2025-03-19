import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/user/entities/user.model';
import { LoginDto } from './dto/login.dto';
interface ApiResponse {
    statusCode: HttpStatus;
    message: string;
    data: object;
  }
@Controller('auth')
export class AuthController {
    
    constructor ( private readonly authService: AuthService) {}
    @Post('register')
    async create(@Body() registerDto:RegisterDto) : Promise<ApiResponse> {
        const user = await this.authService.create(registerDto);
        return {
            statusCode: HttpStatus.OK,
            message: "User registered successfully",
            data: user
        };
    }

    @Post('login')
    async login(@Body() loginDto:LoginDto): Promise<ApiResponse> {
        const user= await this.authService.login(loginDto);
        return {
            statusCode: HttpStatus.OK,
            message: "User logged in successfully",
            data: user
        }
    }

}
