import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.model';

@Injectable()
export class TaskService {

    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async create(createTaskDto:CreateTaskDto): Promise<Task> {
        const user= await this.userModel.findOne({where:{id:createTaskDto.userId}});
        if(!user) throw new NotFoundException('User not found')
        const task=await this.taskModel.create({createTaskDto});
        return task;
    }

}
