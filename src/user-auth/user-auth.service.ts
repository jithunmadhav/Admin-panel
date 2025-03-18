import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';


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
}

