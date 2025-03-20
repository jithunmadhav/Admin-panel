import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

    async listTasks(id:number): Promise<Task[]> {
        const tasks = await this.taskModel.findAll({where:{userId:id}});
        if(!tasks) throw new NotFoundException('Not found any tasks')
        return tasks;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto):Promise<Task> {
        const task=await this.taskModel.findOne({where:{id}});
        if(!task) throw new NotFoundException('Task not found');
        const updateTask = await this.taskModel.update({...updateTaskDto},{where:{id},returning:true})
        return updateTask[1][0];
    }

    async delete(id:number):Promise <{message:string}>{
        const taskExist = await this.taskModel.findOne({where:{id:id}})
        if(!taskExist) throw new NotFoundException('Task not found');
        await this.taskModel.destroy({where:{id:id}})
        return {message:'Task deleted'}
    }

}
