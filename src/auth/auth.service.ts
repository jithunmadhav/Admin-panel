import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.model';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Op } from 'sequelize';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User)
        private userModel: typeof User,
    ) {}
    async create(registerDto: RegisterDto): Promise<User> {
        const existingUser= await this.userModel.findOne({where:{
            [Op.or]:[{email:registerDto.email},{mobile:registerDto.mobile}]
        }});
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        if(existingUser){
            throw new ConflictException('User already exist')
        }

        const user=await this.userModel.create({...registerDto,password:hashedPassword});
        return user;
      }

      async login(loginDto:LoginDto): Promise<User> {
        const user= await this.userModel.findOne({where:{email:loginDto.email}});
        if(!user) throw new NotFoundException('User not found')
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if(!isMatch) throw new NotFoundException('User not found')
        return user;
      }
      
}
