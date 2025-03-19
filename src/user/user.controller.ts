import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserAuthService } from './user.service';
import { User } from './entities/user.model';
import { UpdateUserDto } from './dto/uodate-user.dto';

@Controller('user-auth')
export class UserAuthController {
    constructor ( private readonly userAuthService: UserAuthService) {}
 
    @Get()
    async findAll(): Promise<User[]> {
      return this.userAuthService.findAll();
    }  

    @Get(':id')
    async findOne(@Param('id',ParseIntPipe) id:number): Promise<User> {
        return this.userAuthService.findOne(id);
    }

    @Patch()
    async updateUser(@Param('id',ParseIntPipe) id:number,@Body() updateUserDto:UpdateUserDto): Promise<User> {
        return this.userAuthService.updateUser(id,updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number): Promise<{message:string}> {
        return this.userAuthService.delete(id);
    }
    
}
