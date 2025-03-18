import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.model';

@Controller('user-auth')
export class UserAuthController {
    constructor ( private readonly userAuthService: UserAuthService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) : Promise<User> {
        return this.userAuthService.create(createUserDto);
      }

    @Get()
    async findAll(): Promise<User[]> {
      return this.userAuthService.findAll();
    }  
}
