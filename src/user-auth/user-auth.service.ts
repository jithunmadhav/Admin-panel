import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { UpdateUserDto } from './dto/uodate-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class UserAuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
      ) {}
    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser= await this.userModel.findOne({where:{
            [Op.or]:[{email:createUserDto.email},{mobile:createUserDto.mobile}]
        }});
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        if(existingUser){
            throw new ConflictException('User already exist')
        }

        const user=await this.userModel.create({...createUserDto,password:hashedPassword});
        return user;
      }
    
    async findAll(): Promise<User[]> {
        const users= await this.userModel.findAll();
        return users;
    }  

    async findOne(id:number): Promise<User> {
        const user= await this.userModel.findOne({where:{id}});
        if(!user) throw new NotFoundException('User not found')
        return user;
    }

    async updateUser(id:number,updateUserDto:UpdateUserDto): Promise<User> {
        const user= await this.userModel.findOne({where:{id}});
        if(!user) throw new NotFoundException('User not found')
        const updatedUser= await this.userModel.update({...updateUserDto},{where:{id},returning:true});
        return updatedUser[1][0];
    }   

    async delete(id:number) : Promise<{message:string}>{
        await this.userModel.destroy({where:{id}});
        return {message:'User deleted'}
    }

}

