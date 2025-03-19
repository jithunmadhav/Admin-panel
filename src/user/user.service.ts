import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/uodate-user.dto';

@Injectable()

export class UserAuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
      ) {}
    
    async findAll(): Promise<User[]> {
        const users= await this.userModel.findAll();
        return users;
    }  

    async findOne(id:number,userId:any): Promise<User> {
        console.log('ID',userId);
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

