import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.model';
import { Task } from './entities/task.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports:[SequelizeModule.forFeature([Task,User])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
