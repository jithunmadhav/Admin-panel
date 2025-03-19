import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/user/entities/user.model';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor ( private readonly authService: AuthService) {}
    @Post('register')
    @HttpCode(HttpStatus.OK)
    async create(@Body() registerDto:RegisterDto) : Promise<User> {
        return this.authService.create(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto:LoginDto): Promise<User> {
        return this.authService.login(loginDto);
    }

}
