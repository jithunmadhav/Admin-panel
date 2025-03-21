import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.model';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Op } from 'sequelize';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Task } from 'src/task/entities/task.model';

interface verfyRes {
    statusCode: number;
    message: string;
    user: {};
     
}
@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User)
        private userModel: typeof User,

        @InjectModel(Task)
        private taskModel: typeof Task,

        private jwtService: JwtService
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

      async login(loginDto: LoginDto): Promise<any> {
        const user = await this.userModel.findOne({
          where: { email: loginDto.email },
          include: [
            {
              model: this.taskModel,
              as: 'tasks',
            },
          ],
        });
      
        if (!user) throw new NotFoundException('User not found');
      
        const userObj = user.toJSON(); // convert to plain object
      
        const isMatch = await bcrypt.compare(loginDto.password, userObj.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');
      
        const payload = { id: userObj.id, email: userObj.email };
        const token = this.jwtService.sign(payload);
      
        await this.userModel.update({ token }, { where: { id: userObj.id } });
      
        // Remove password from response
        delete userObj.password;
      
        return {
          statusCode: 200,
          message: 'User logged in successfully',
          data: {
            ...userObj,
            token,
          },
        };
      }

      async verifyToken(id:number): Promise<verfyRes> {
        const user = await this.userModel.findOne({
          where: { id: id },
          include: [
            {
              model: this.taskModel,
              as: 'tasks',
            },
          ],
        });
      
        if (!user) throw new NotFoundException('User not found');
      
        const userObj = user.toJSON();       
        // Remove password from response
        delete userObj.password;
      
        return {
          statusCode: 200,
          message: 'User logged in successfully',
          user: userObj
        };
      }
      

}
